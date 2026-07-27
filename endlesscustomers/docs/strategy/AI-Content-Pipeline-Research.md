# IMPACT AI Content Production System
## Architecture, Build Guide & Operating Manual
**Last updated: June 7, 2026**

---

## What You're Building

A fully automated content production system that continuously ingests signal from your best sources — sales calls, podcasts, leadership perspectives, thought leaders, competitors — organizes it into a structured knowledge base, uses AI to generate and publish content to HubSpot CMS in the Endless Customers brand voice, and gets smarter over time as performance data feeds back into what gets created next.

Your content manager's job shifts from *creating* to *governing*: she reviews what publishes, refines voice, and manages quality — rather than starting from a blank page.

Target velocity once running: **10–30 pieces of content per week**, published directly to HubSpot CMS with Gemini-generated images, updating both new and existing content.

---

## System Architecture at a Glance

```
SOURCES                    KNOWLEDGE BASE           GENERATION            PUBLISH
──────────────────────     ──────────────────────   ──────────────────    ──────────────────
AskElephant (calls)   ─┐                            
Podcast transcripts   ─┤   GitHub Repo              n8n workflow          HubSpot CMS
Leadership LinkedIn   ─┼──▶ (plain markdown)   ────▶ reads KB       ────▶ Blog posts
Thought leaders       ─┤   organized by type        drafts content        Images (Gemini)
Competitor sites      ─┤   AI-readable directly     applies brand         Existing post
Industry RSS feeds    ─┘   version controlled       voice                 updates
                                                     stages draft     ────▶ Slack alert
                                ▲                    ────────────────      (24hr buffer)
                                │                                               │
                           Feedback loop                              ▼
                        (traffic + rankings)   ◀────────────   Content Manager
                        feeds back monthly                       reviews in HS
                                                                 refines live
```

The system has three layers: **ingestion** (raw material in), **generation** (AI drafts content), and **governance** (human review + performance feedback). Each layer is independent — you can build and test them one at a time.

---

## Prerequisites & Account Setup

Before building any pipelines, get these accounts and credentials in place. Each item takes 10–30 minutes to set up. Do this before Week 1.

### 1. n8n Account

n8n is the automation layer that connects everything. Use n8n Cloud (no server management).

1. Sign up at [n8n.io](https://n8n.io) → choose the **Starter** plan ($20/month)
2. You'll get a workspace URL like `yourname.app.n8n.cloud`
3. Log in to your workspace — you'll see an empty "Workflows" screen
4. You don't need to build anything yet; just confirm you can log in

### 2. GitHub Personal Access Token (for n8n → GitHub commits)

This token lets n8n write files to your knowledge base repo on your behalf.

1. Go to GitHub.com → click your profile photo → **Settings**
2. Scroll to the bottom → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token (classic)**
4. Name it: `n8n-knowledge-base`
5. Expiration: set to 1 year (rotate annually)
6. Under **Select scopes**, check: `repo` (the full repo scope — grants read/write to private repos)
7. Click **Generate token** — copy it immediately (you won't see it again)
8. Store it in your password manager labeled "GitHub PAT — n8n-knowledge-base"

**In n8n:** Go to **Credentials** → **Add credential** → search "GitHub" → paste the token. Name the credential "GitHub Knowledge Base."

### 3. HubSpot Private App Token (for n8n → HubSpot CMS)

This is how n8n creates and publishes blog posts in HubSpot.

1. In HubSpot, go to **Settings** (gear icon, top right) → **Integrations** → **Private Apps**
2. Click **Create a private app**
3. Name it: `AI Content Pipeline`
4. Under **Scopes**, enable:
   - `content` → Read and Write (covers CMS Blog API)
   - `files` → Read and Write (for uploading Gemini images)
5. Click **Create app** → copy the access token
6. Store it labeled "HubSpot Private App — AI Content Pipeline"

**In n8n:** Go to **Credentials** → **Add credential** → search "HubSpot" → select **HubSpot API** → paste the token. Name it "HubSpot Content Pipeline."

The token format is a long string starting with `pat-na1-...`. Use it as a Bearer token in any manual API calls too.

### 4. Claude API Key (for content generation)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in (or create an account — use your IMPACT email)
3. Go to **API Keys** → **Create Key**
4. Name it: `impact-content-pipeline`
5. Copy the key (starts with `sk-ant-...`)
6. Add a billing method and set a monthly spend limit ($100 is safe to start)

**In n8n:** Go to **Credentials** → **Add credential** → search "Anthropic" → add as a Header Auth credential: header name `x-api-key`, value: your key. Name it "Claude API."

### 5. Slack Webhook (for `#content-pipeline` notifications)

1. In Slack, create a new channel: `#content-pipeline`
   - Invite: Ashley, Nicole, yourself (Stephanie and Carolyn optional)
2. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**
3. Name: `Content Pipeline Bot` | Workspace: IMPACT
4. Under **Features**, click **Incoming Webhooks** → toggle **Activate Incoming Webhooks** to On
5. Click **Add New Webhook to Workspace** → select `#content-pipeline`
6. Copy the webhook URL (looks like `https://hooks.slack.com/services/T.../B.../...`)
7. Store it labeled "Slack Webhook — #content-pipeline"

**In n8n:** Use an **HTTP Request** node with a POST to the webhook URL. No authentication needed — the URL is the credential.

### 6. Apify API Key (for LinkedIn scraping)

1. Sign up at [apify.com](https://apify.com) — free tier available to start
2. Go to **Settings** → **Integrations** → copy your **API token**
3. Store it labeled "Apify API Key"
4. You'll configure the LinkedIn scraper actor specifically in Pipeline 3

---

## The Knowledge Base

### Why GitHub + Markdown (Not Notion)

Notion requires API calls every time AI needs to read anything — rate limits, authentication, latency. A GitHub repo with plain markdown files is read directly by Claude, n8n Python nodes, or any script. No API overhead. Version controlled. Every change is auditable. Your content manager can edit in any text editor. It's free.

### Creating the Repo

1. Go to GitHub.com → **New repository**
2. Name: `impact-knowledge-base`
3. Visibility: **Private**
4. Initialize with a README
5. Click **Create repository**

Create the folder structure by adding a placeholder `.gitkeep` file inside each folder — GitHub doesn't display empty folders.

### Repo Structure

```
impact-knowledge-base/
│
├── /sources/
│   ├── /sales-calls/           ← AskElephant summaries (auto-ingested)
│   ├── /client-calls/          ← AskElephant summaries from coaching calls
│   ├── /podcast/               ← Episode transcripts + show notes
│   ├── /leadership-linkedin/   ← Posts from IMPACT/EC leadership (scraped weekly)
│   ├── /leadership-perspectives/ ← Raw notes/voice memos from leadership team
│   ├── /thought-leaders/       ← Posts from ~15 trusted industry voices
│   ├── /competitor/            ← Articles from 3–5 competitor sites
│   └── /industry-rss/          ← Filtered articles from industry publications
│
├── /brand/
│   ├── voice-guide.md          ← Tone, word choices, what to avoid
│   ├── messaging-pillars.md    ← Core claims, proof points, differentiators
│   ├── audience-profiles.md    ← Who you're writing for (buyer personas)
│   ├── best-examples/          ← Folder with 10–15 full-text example articles
│   └── banned-phrases.md       ← AI clichés and phrases to never use
│
├── /frameworks/
│   ├── endless-customers.md    ← The core methodology explained
│   ├── they-ask-you-answer.md  ← TAYA framework reference
│   └── [other core IP].md
│
├── /topic-clusters/
│   ├── cluster-index.md        ← Master list of topic clusters + pillar pages
│   └── [cluster-name].md       ← Keywords, existing content, gaps per cluster
│
├── /performance/
│   └── monthly-report.md       ← Traffic, rankings, top/bottom performers
│                                  (updated monthly by feedback loop)
│
└── README.md                   ← How this repo is organized, rules for agents
```

### The Brand Voice Problem — and How to Solve It

This is the most important thing to get right. AI-generated content at volume will plateau in rankings and feel inauthentic if it doesn't carry a genuine point of view. The Endless Customers brand — direct, practitioner-level, grounded in real client experience — is your differentiator. Generic AI output won't have it unless you deliberately build it in.

**The solution: leadership perspective protocol.**

Anyone on the leadership team records a 2–5 minute voice memo whenever they have a strong take on something — a client situation, a market observation, a counterintuitive opinion. Here's the full workflow:

1. Record on your phone (iPhone Voice Memos, WhatsApp voice note, any app works)
2. Share the file to a dedicated **Google Drive folder** called "EC Voice Memos"
3. A Google Drive → n8n trigger fires when a new file is added
4. n8n downloads the audio and sends it to OpenAI Whisper API for transcription
5. The transcript is saved to `/sources/leadership-perspectives/YYYY-MM-DD-[topic-slug].md`
6. The next generation run picks it up automatically

**Setting up the voice memo Google Drive trigger in n8n:**
1. Create a shared Google Drive folder: "EC Voice Memos" — share it with anyone on leadership who will contribute
2. In n8n: **Google Drive trigger** node → watch for new files in that folder
3. **HTTP Request** node → POST to OpenAI Whisper (`https://api.openai.com/v1/audio/transcriptions`) with the downloaded file and `model: whisper-1`
4. **GitHub** node → create file in `/sources/leadership-perspectives/` with the transcript as content

**Additional seeding of brand voice:**

Before running the first generation, populate `/brand/best-examples/` with 10–15 of your best existing content pieces (copy the full text of each into a `.md` file). Also populate `banned-phrases.md` immediately — "delve into," "in today's fast-paced world," "it's important to note," "game-changer," "seamlessly," "leverage," "holistic approach" are on the default banned list.

---

## Ingestion Pipelines

Each pipeline is an n8n workflow that runs on a schedule, pulls from a source, formats the content as markdown, and commits it to the GitHub repo. Build them independently — each one is self-contained.

### Pipeline 1: AskElephant → Knowledge Base
**Cadence:** Real-time (webhook trigger)
**Difficulty:** Low
**Time to build:** 2–3 hours

#### How AskElephant Works with HubSpot

AskElephant analyzes your HubSpot call recordings, generates structured summaries, and writes custom fields back into HubSpot contact/deal records. It can also fire a webhook to any external URL when processing completes. You'll use that webhook to route the call summary into your knowledge base automatically — bypassing the unreliable HubSpot transcript API entirely.

#### Step 1: Configure the AskElephant Webhook

1. Log into AskElephant at [app.askelephant.ai](https://app.askelephant.ai)
2. Go to **Settings** → **Integrations** → **Webhooks** (if you don't see this, check **Organization Settings** or contact AskElephant support — webhooks may require a specific plan)
3. Click **Add Webhook**
4. For the URL: you'll paste your n8n webhook URL after building the n8n workflow in Step 2. Come back to this.
5. Trigger event: **Meeting Completed** (fires when AskElephant finishes processing a call)
6. Save

#### What the AskElephant Webhook Payload Looks Like

When AskElephant fires, it sends a JSON payload. The structure looks approximately like this (log one real payload on first test to confirm exact field names — they may differ slightly):

```json
{
  "event": "meeting.completed",
  "meeting_id": "mtg_abc123",
  "created_at": "2026-06-07T14:30:00Z",
  "title": "Discovery Call - Acme Corp",
  "participants": [
    { "name": "Marcus Sheridan", "email": "marcus@impactplus.com" },
    { "name": "John Smith", "email": "john@acmecorp.com" }
  ],
  "summary": "Prospect is a mid-size HVAC company struggling with lead quality from their current marketing agency. They've tried content marketing before but didn't see results. Main concerns: time commitment from their team and proving ROI before committing...",
  "action_items": [
    "Send case study on similar HVAC client",
    "Schedule follow-up with their GM"
  ],
  "topics": ["lead quality", "content marketing", "ROI concerns"],
  "hubspot_contact_id": "12345678",
  "hubspot_deal_id": "87654321",
  "call_type": "sales"
}
```

Key fields: `summary` is the gold — AskElephant's structured summary of what was said. `topics` becomes the frontmatter tags. `participants` lets you detect whether it's a sales or client call.

#### Step 2: Build the n8n Workflow (Node by Node)

In n8n, create a new workflow called "AskElephant → Knowledge Base."

**Node 1: Webhook (Trigger)**
- Add a **Webhook** node
- Method: POST
- Path: `askelephant-intake`
- Your URL will be: `https://yourname.app.n8n.cloud/webhook/askelephant-intake`
- Copy this URL — paste it into AskElephant webhook settings from Step 1
- Authentication: None (if you want security, add a secret token as a query param and validate it in Node 2)

**Node 2: Code (PII Stripping)**
- Add a **Code** node (JavaScript)

```javascript
const body = $input.first().json;

let summary = body.summary || '';
let topics = body.topics || [];
let callType = body.call_type || 'sales';
let meetingDate = (body.created_at || new Date().toISOString()).substring(0, 10);

// Remove email addresses
summary = summary.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email removed]');

// Remove external participant names and company names derived from email domains
const externalParticipants = (body.participants || [])
  .filter(p => !p.email.includes('impactplus.com') && !p.email.includes('endlesscustomers.com'));

externalParticipants.forEach(participant => {
  if (participant.name) {
    summary = summary.replace(new RegExp(participant.name, 'gi'), '[prospect]');
  }
  if (participant.email) {
    const domain = participant.email.split('@')[1]?.split('.')[0];
    if (domain && domain.length > 3) {
      summary = summary.replace(new RegExp(domain, 'gi'), '[their company]');
    }
  }
});

const topicSlug = topics.length > 0
  ? topics[0].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  : 'general';

const filename = `${meetingDate}-${callType}-${topicSlug}.md`;

return [{ json: { filename, summary, topics, callType, meetingDate, originalMeetingId: body.meeting_id } }];
```

**Node 3: Code (Format Markdown)**
- Add another **Code** node

```javascript
const data = $input.first().json;

const markdown = `---
date: ${data.meetingDate}
source: askelephant
call-type: ${data.callType}
topics: [${data.topics.map(t => `"${t}"`).join(', ')}]
meeting-id: ${data.originalMeetingId}
---

## Key Themes

${data.summary}
`;

return [{
  json: {
    filename: data.filename,
    content: Buffer.from(markdown).toString('base64'),
    folder: data.callType === 'client' ? 'sources/client-calls' : 'sources/sales-calls'
  }
}];
```

**Node 4: GitHub (Create File)**
- Add a **GitHub** node
- Credential: "GitHub Knowledge Base"
- Operation: **Create File**
- Owner: `[your GitHub username or org]`
- Repository: `impact-knowledge-base`
- File Path: `{{ $json.folder }}/{{ $json.filename }}`
- File Content: `{{ $json.content }}` (already base64 encoded in Node 3)
- Commit Message: `Add AskElephant summary: {{ $json.filename }}`

**Activate the workflow** (toggle top right). Every completed call now flows into the knowledge base automatically.

#### Step 3: Test the Pipeline

1. Make a test call via HubSpot (or ask a team member to trigger one)
2. Wait for AskElephant to process it (typically 5–15 minutes after call ends)
3. Check the n8n execution log — look for a successful run
4. Check the GitHub repo — a new `.md` file should appear in `/sources/sales-calls/`
5. Open it: does the content make sense? Is PII stripped properly?

Manually review the first 10 files that come through. The regex stripping is a starting point — calibrate it against real data.

---

### Pipeline 2: Podcast Transcripts → Knowledge Base
**Cadence:** After each episode publishes
**Difficulty:** Low–Medium
**Time to build:** 2–4 hours

Determine where your podcast transcripts currently live. The simplest setup that works regardless of platform:

1. Create a Google Drive folder: "Podcast Transcripts"
2. In n8n: **Google Drive trigger** → new file in that folder
3. Download the file content
4. Format as markdown with frontmatter: date, episode title, guest name(s), topic tags
5. **GitHub** node → create file in `/sources/podcast/YYYY-MM-DD-[episode-slug].md`

If you use Descript, it has an API and export. The same pattern applies — trigger on new Descript project → export transcript → format → commit.

---

### Pipeline 3: LinkedIn Posts → Knowledge Base
**Cadence:** Daily
**Difficulty:** Medium
**Time to build:** 3–4 hours
**Tool:** Apify's LinkedIn Scraper (~$50/month) — do not build your own. LinkedIn actively blocks custom scrapers. Apify maintains theirs.

#### Setting Up the Apify LinkedIn Scraper

1. Log into [apify.com](https://apify.com)
2. In **Actors**, search "LinkedIn Profile Scraper" — use the official Apify actor
3. Open the actor → **Try for free** → in the input, add LinkedIn profile URLs:
   - Marcus Sheridan: `https://www.linkedin.com/in/marcussheridan/`
   - Other IMPACT/EC leadership
   - 10–15 thought leaders (Chris Penn, Ann Handley, Jay Baer, Rand Fishkin, Joe Pulizzi — whoever you actually read and trust)
4. Run once manually to confirm it returns posts
5. Note the **actor ID** from the URL bar — you'll use this in n8n

#### n8n Workflow

1. **Schedule trigger** → daily at 6am
2. **HTTP Request** node → POST to `https://api.apify.com/v2/acts/[actor-id]/runs?token=[key]` to kick off a new scrape run
3. **Wait** node → 3 minutes
4. **HTTP Request** → GET the run dataset: `https://api.apify.com/v2/acts/[actor-id]/runs/last/dataset/items?token=[key]`
5. **Split in Batches** → process each post
6. **Code** node → deduplicate by post ID (check if file already exists in GitHub)
7. **Code** node → format as markdown with author, date, and category frontmatter
8. **GitHub** node → create file in `/sources/leadership-linkedin/` or `/sources/thought-leaders/`

---

### Pipeline 4: Competitor Sites → Knowledge Base
**Cadence:** Weekly
**Difficulty:** Medium
**Time to build:** 3–5 hours

Build a list of 3–5 competitors. Focus on their blog/resource sections.

**n8n workflow:**
1. **Schedule trigger** → weekly (Sunday 11pm)
2. **HTTP Request** → fetch each competitor's blog listing page
3. **HTML Extract** node → parse article titles, URLs, and publish dates
4. **Split in Batches** → for each new article (deduped by URL):
5. **HTTP Request** → fetch full article text
6. **HTML Extract** → extract title + body text
7. **Code** → format as markdown with `source: competitor` and `competitor: [name]` tags
8. **GitHub** → create file in `/sources/competitor/[competitor-name]/YYYY-MM-DD-[slug].md`

This informs your content strategy — topics they're covering that you're not, and how they're framing your shared market. The generation prompt uses this to identify gaps, not to reproduce their content.

---

### Pipeline 5: Industry RSS Feeds → Knowledge Base
**Cadence:** Daily
**Difficulty:** Low
**Time to build:** 1–2 hours
**Sources:** Content Marketing Institute, Search Engine Journal, MarketingProfs, HubSpot Blog, Backlinko — 5–10 that are relevant to your topic clusters

**n8n workflow:**
1. **Schedule trigger** → daily at 7am
2. **RSS Read** node → one node per feed (or loop through a list of feed URLs)
3. **Filter** node → only pass through articles matching keywords relevant to your clusters
4. **HTTP Request** → send to Claude API to summarize in 3–5 sentences (full articles are noisy; summaries are clean)
5. **GitHub** → commit to `/sources/industry-rss/YYYY-MM-DD-[slug].md`

---

### Historical Backfill: Existing HubSpot Call Transcripts
**One-time batch job.**
**Difficulty:** Medium–High
**Time:** Plan a full weekend (4–8 hours of hands-on work; processing runs in the background)

The HubSpot transcript API is unreliable — `hs_call_transcription_id` frequently returns null. The workaround: download the audio recordings and re-transcribe with Whisper.

#### Step 1: Pull All Call Engagements

```python
import requests, json

TOKEN = 'pat-na1-...'  # your HubSpot private app token
headers = {'Authorization': f'Bearer {TOKEN}'}
calls = []
after = None

while True:
    params = {'limit': 100, 'properties': 'hs_call_recording_url,hs_call_title,hs_timestamp'}
    if after:
        params['after'] = after
    resp = requests.get('https://api.hubapi.com/crm/v3/objects/calls', headers=headers, params=params)
    data = resp.json()
    calls.extend(data['results'])
    if 'next' in data.get('paging', {}):
        after = data['paging']['next']['after']
    else:
        break

with open('all_calls.json', 'w') as f:
    json.dump(calls, f, indent=2)
print(f"Found {len(calls)} call engagements")
```

#### Step 2: Download Audio Files

```python
import os, requests, json

with open('all_calls.json') as f:
    calls = json.load(f)

calls_with_audio = [c for c in calls if c['properties'].get('hs_call_recording_url')]
print(f"{len(calls_with_audio)} calls have recordings")
os.makedirs('audio_downloads', exist_ok=True)

for i, call in enumerate(calls_with_audio):
    url = call['properties']['hs_call_recording_url']
    filename = f"audio_downloads/{call['id']}.mp4"
    if os.path.exists(filename):
        continue
    try:
        resp = requests.get(url, stream=True, timeout=60)
        with open(filename, 'wb') as f:
            for chunk in resp.iter_content(64 * 1024):
                f.write(chunk)
        print(f"[{i+1}/{len(calls_with_audio)}] Downloaded {call['id']}")
    except Exception as e:
        print(f"Failed {call['id']}: {e}")
```

#### Step 3: Transcribe with Whisper

OpenAI Whisper costs ~$0.006/minute. 100 one-hour calls = ~$36.

```python
from openai import OpenAI
import json, os

client = OpenAI(api_key='sk-...')
transcripts = {}

for filename in os.listdir('audio_downloads'):
    call_id = filename.replace('.mp4', '')
    try:
        with open(f'audio_downloads/{filename}', 'rb') as f:
            result = client.audio.transcriptions.create(model='whisper-1', file=f, response_format='text')
        transcripts[call_id] = result
        print(f"Transcribed {call_id}")
    except Exception as e:
        print(f"Failed {call_id}: {e}")

with open('transcripts.json', 'w') as f:
    json.dump(transcripts, f, indent=2)
```

#### Step 4: Format and Commit to GitHub

Apply the same PII-stripping logic from Pipeline 1 to each transcript, then commit them to `/sources/sales-calls/` using the GitHub API. Run this as a loop — one file per call. For large batches (200+ calls), let it run overnight.

**Practical scope:** Filter for calls from the last 12–18 months and skip calls under 5 minutes. 200–400 calls is a solid starting set.

---

## Content Generation Pipeline

This is the core workflow that reads the knowledge base and produces drafts. Runs nightly at midnight on a schedule, or can be triggered manually.

### How It Works

**Step 1: Topic selection**
The n8n workflow reads `/topic-clusters/cluster-index.md` and `/performance/monthly-report.md` to identify:
- Topic clusters with no recent content (publish gap > 30 days)
- High-traffic topics that could support a follow-on piece
- Topics where competitors have new content and you don't

Selects 2–5 topics for that generation run.

**Step 2: Context assembly**
For each topic, retrieve relevant files from GitHub via the GitHub Contents API:

```
GET https://api.github.com/repos/[owner]/impact-knowledge-base/contents/brand/voice-guide.md
Authorization: Bearer [GitHub PAT]
```

The response contains a `content` field with the file's base64-encoded content. Decode it in an n8n **Code** node:
```javascript
const content = Buffer.from($json.content, 'base64').toString('utf-8');
```

Retrieve: `brand/voice-guide.md`, `brand/messaging-pillars.md`, `brand/banned-phrases.md`, relevant topic cluster file, and 3–5 recent sales call excerpts tagged to the same topic.

**Step 3: Draft generation**
Send the assembled context to Claude via API:

```
POST https://api.anthropic.com/v1/messages
Headers: x-api-key: [key], anthropic-version: 2023-06-01
Body:
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 4096,
  "messages": [{ "role": "user", "content": "[assembled prompt below]" }]
}
```

**The generation prompt:**

```
You are a content writer for Endless Customers, a B2B marketing education and coaching brand by IMPACT.

BRAND VOICE: [contents of voice-guide.md]
MESSAGING PILLARS: [contents of messaging-pillars.md]
AUDIENCE: [relevant section of audience-profiles.md]
BANNED PHRASES: [contents of banned-phrases.md]

ENDLESS CUSTOMERS TEAM PERSPECTIVE ON THIS TOPIC: [leadership perspective note if available]

RELEVANT CUSTOMER LANGUAGE (from sales calls — anonymized):
[3–5 excerpts from /sources/sales-calls/ matching this topic]

TOPIC CLUSTER CONTEXT: [contents of relevant cluster file]

YOUR TASK: Write a [blog post / guide] on the topic: [topic].
Write in the Endless Customers brand voice — direct, practitioner-grounded, specific.
Use actual customer language from the sales call excerpts above.
Include a specific opinion or counterintuitive take rooted in the team's perspective.
Do not use generic AI framing. Do not use any phrases from the banned list.
Optimize for the keyword: [target keyword].
Target length: 800–1200 words.
Include a clear H1, 2–4 H2 subheadings, and a conclusion with a specific CTA.

Return as JSON:
{
  "title": "...",
  "meta_title": "... (max 60 chars)",
  "meta_description": "... (max 155 chars)",
  "url_slug": "...",
  "body_html": "..."
}
```

**Step 4: Create HubSpot Draft**

```
POST https://api.hubapi.com/cms/v3/blogs/posts
Authorization: Bearer [private app token]
Content-Type: application/json

{
  "contentGroupId": "[your blog ID — find in HubSpot: Settings → Website → Blog]",
  "title": "[title from Claude response]",
  "metaDescription": "[meta_description from Claude response]",
  "slug": "[url_slug from Claude response]",
  "postBody": "[body_html from Claude response]",
  "state": "DRAFT",
  "blogAuthorId": "[author ID — get from HubSpot: Settings → Website → Blog Authors]"
}
```

Save the `id` from the response — you'll use it for the image association and publish step.

**Step 5: Generate and Upload Header Image**

Use your existing Gemini image skill to generate a header image based on the article title. Then upload to HubSpot:

```
POST https://api.hubapi.com/files/v3/files
Authorization: Bearer [token]
Content-Type: multipart/form-data

file: [image binary]
options: {"access": "PUBLIC_INDEXABLE", "overwrite": false}
folderPath: /content-pipeline
```

Associate with the post:
```
PATCH https://api.hubapi.com/cms/v3/blogs/posts/[post-id]
{ "featuredImage": "[image url from files API response]" }
```

### The 24-Hour Staging Buffer

1. Draft is created in HubSpot with `state: DRAFT` (not live)
2. n8n sends a Slack message to `#content-pipeline`:
   ```
   📝 New draft queued: *[post title]*
   Preview: https://app.hubspot.com/content/[portal-id]/pages/blog-posts/[post-id]/edit
   Publishes automatically in 24 hours. Set Pipeline Hold = true on the post to hold indefinitely.
   ```
3. Ashley reviews in HubSpot
4. n8n checks hourly: find all drafts older than 24 hours where `pipeline_hold` is not `true` → publish them:
   ```
   PATCH https://api.hubapi.com/cms/v3/blogs/posts/[post-id]
   { "state": "PUBLISHED" }
   ```

**Setting up `pipeline_hold` in HubSpot:**
1. Settings → Properties → select "Blog Post" as the object type
2. **Create property**: Label: `Pipeline Hold` | Internal name: `pipeline_hold` | Field type: **Single checkbox**
3. Click Create

Ashley opens any draft post, finds **Pipeline Hold** in the right sidebar, checks it. The auto-publish step skips any post with that property checked.

---

## Content Update Pipeline

A separate workflow from new content creation. AI search engines reward freshness signals — updating older content is one of the highest-ROI activities you can run.

**Cadence:** Monthly audit, rolling updates

**Step 1: Identify update candidates**

```
GET https://api.hubapi.com/cms/v3/blogs/posts?limit=100&properties=title,slug,updatedAt,state
Authorization: Bearer [token]
```

Filter for: `state: PUBLISHED` and `updatedAt` older than 6 months. Cross-reference with Search Console data to flag posts with declining impressions or positions 11–20.

**Step 2: Refresh pass**

Fetch the current post body: `GET /cms/v3/blogs/posts/[id]` → use the `postBody` field. Read the relevant topic cluster file and recent KB sources tagged to the same topic. Send to Claude:

```
Here is an existing IMPACT blog post that needs updating:
[current post body]

New information to incorporate (from recent sources):
[relevant recent KB excerpts]

Update this post to:
1. Reflect any information that is now outdated
2. Add 1–2 new examples or statistics from the sources provided
3. Strengthen the introduction (first 2 sentences matter most for AI citations)
4. Ensure the conclusion has a clear, specific CTA
5. Do NOT change the overall structure or voice — this is a refresh, not a rewrite

Return: updated full post body HTML only, no commentary.
```

**Step 3: Stage and publish**

```
PATCH https://api.hubapi.com/cms/v3/blogs/posts/[id]
{ "postBody": "[updated content]", "state": "DRAFT" }
```

This creates a new draft version. Same 24-hour Slack notification + auto-publish logic as new content.

---

## Feedback Loop

**Run on the first of each month.**

**Step 1: Pull performance data**
- HubSpot CMS API: page views, CTAs per post
- Google Search Console: Enable native integration first (Settings → Tracking & Analytics → Google Search Console → Connect). For manual reporting, export a CSV from Search Console and upload to GitHub.

**Step 2: Update `/performance/monthly-report.md`**
- Top 10 posts (traffic + engagement)
- Bottom 10 posts (candidates for refresh or retirement)
- Topics gaining traction (impressions up month-over-month)
- Topics declining (candidates for consolidation)
- Best-performing content types

**Step 3: Update `/topic-clusters/cluster-index.md`**
This file is what the generation pipeline reads to decide what to write. Keeping it updated is the highest-leverage 30-minute task of the month — it shapes everything produced for the next 30 days.

---

## Team Access Map

### n8n Cloud

| Person | Access Level | Notes |
|--------|-------------|-------|
| Bob | Admin | Builds and owns all workflows |
| Nicole | Editor | Can view and edit workflows once she becomes system operator |
| Ashley | Viewer | Can see execution logs and troubleshoot; can't edit workflows |

*Invite:* n8n Cloud → Settings → Users → Invite by email.

### GitHub (`impact-knowledge-base` repo)

| Person | Access Level | Notes |
|--------|-------------|-------|
| Bob | Admin | Owns the repo |
| Nicole | Write | Can edit files; becomes operator over time |
| Ashley | Write | Edits `/brand/` files, reviews KB content, updates cluster index |
| Stephanie | Read | Can view, can't edit |
| Carolyn | Read | Can view, can't edit |

*Invite:* GitHub → repo → Settings → Collaborators → Add people → select role.

Ashley needs Write specifically so she can maintain `voice-guide.md`, `banned-phrases.md`, and `cluster-index.md` as she calibrates the system.

### HubSpot

| Person | Access Level | Notes |
|--------|-------------|-------|
| Bob | Super Admin | Existing |
| Nicole | Marketing Admin | Head of sales/marketing |
| Ashley | Marketing — Blog Write | Must be able to edit posts AND set custom properties including `pipeline_hold` |
| Stephanie | Marketing Access | Existing or add |
| Carolyn | Marketing Access | Existing or add |

The AI Content Pipeline private app token lives in n8n only — it's never shared directly. Rotate it if team members leave.

### AskElephant

| Person | Access Level | Notes |
|--------|-------------|-------|
| Bob | Admin | Configures webhooks |
| Nicole | Admin or Manager | Manages AskElephant as future system operator — walk her through webhook and HubSpot field mapping setup |

### Slack (`#content-pipeline`)

Ashley is the primary reviewer — she monitors this channel daily. Bob, Nicole on it as well. Stephanie and Carolyn optional.

### Claude Accounts (claude.ai)

Ashley and Nicole both need Claude Pro or Team accounts for ad hoc content work. They use Claude.ai directly — not the API key. The API key stays in n8n only.

---

## Operating Costs (Monthly, Once Running)

| Tool | Purpose | Monthly Cost |
|------|---------|-------------|
| n8n Cloud (Starter) | Pipeline orchestration | $20 |
| GitHub | Knowledge base repo | $0–4 |
| Apify LinkedIn scraper | LinkedIn ingestion | ~$50 |
| Gemini image generation | Header images for posts | ~$20–40 |
| OpenAI Whisper | Voice memo transcription (ongoing) | ~$5–10 |
| Claude API | Content generation | ~$30–60 |
| Slack | Already using | $0 |
| HubSpot CMS | Already paying | $0 additional |

**Estimated total: $125–185/month**

That's the operating cost of a system publishing 10–30 pieces of content per week. A single freelance blog post costs $150–300.

One-time setup: developer time to build the pipelines. Using Claude Cowork to build it yourself gets this to near $0 in cash (trading time). An agency would charge $5,000–15,000.

---

## Data Privacy Policy for Call Content

1. **Ingested call data is anonymized before it enters the knowledge base.** All proper nouns are stripped by the AskElephant → GitHub pipeline. The KB contains language patterns and insights, not identifiable client information.

2. **No client-specific details appear in published content.** Generation prompts explicitly instruct the AI not to reference specific clients, companies, or situations.

3. **Sales call data informs language, not stories.** The value is the exact words prospects use to describe their problems — not their specific situations.

4. **Coaching/client call data has a higher bar.** Use AskElephant summaries from client calls only for understanding market patterns — not as public content source material without explicit client permission.

5. **Review the first 10 AI-generated posts as a team** before the system runs autonomously. This calibrates whether the prompts and brand voice files are producing content that sounds like Endless Customers.

---

## Build Sequence

Each phase is independently functional — you get value from Phase 1 before Phase 2 is built.

### Phase 0: Accounts & Credentials (Before Week 1 — ~4 hours)
**Goal:** All accounts set up, all credentials configured in n8n.

- [ ] Sign up for n8n Cloud (Starter plan)
- [ ] Create `impact-knowledge-base` private GitHub repo with full folder structure
- [ ] Generate GitHub PAT with `repo` scope → add to n8n credentials as "GitHub Knowledge Base"
- [ ] Create HubSpot Private App with `content` + `files` scopes → add to n8n as "HubSpot Content Pipeline"
- [ ] Get Claude API key from console.anthropic.com → add to n8n credentials
- [ ] Create Slack `#content-pipeline` channel → create Slack incoming webhook app → save webhook URL
- [ ] Sign up for Apify → save API token
- [ ] Create Google Drive folder "EC Voice Memos" → share with leadership team

**Success metric:** You can log into all six platforms. n8n has all five credentials configured.

---

### Phase 1: Foundation (Week 1–2)
**Goal:** Knowledge base seeded with brand voice, first manual draft proves the concept.

- [ ] Create `voice-guide.md` by having Claude read your manuscript + 10 best articles: "Extract a structured voice guide covering tone, language patterns, what makes this writing distinctive, and phrases to avoid." Edit the output.
- [ ] Write `messaging-pillars.md` — core claims, proof points, differentiators
- [ ] Write `banned-phrases.md` — start with the default list, add your own as you review early drafts
- [ ] Write `audience-profiles.md` — 2–3 buyer personas with specific pain points (pull from sales notes)
- [ ] Copy 10–15 best existing articles into `/brand/best-examples/` as full-text `.md` files
- [ ] Write first `topic-clusters/cluster-index.md` with 5–8 priority clusters
- [ ] Add manuscript and core IP into `/frameworks/`
- [ ] Run one manual generation test with Claude Cowork: read the brand files, pick a topic, draft a post, review with Ashley
- [ ] Publish that post to HubSpot manually and calibrate

**Success metric:** The draft sounds like Endless Customers — direct, specific, grounded in real client experience — not like generic AI content.

---

### Phase 2: AskElephant Pipeline (Week 2–3)
**Goal:** AskElephant summaries flow automatically into the knowledge base.

- [ ] Log into AskElephant → locate webhook settings
- [ ] In n8n, build "AskElephant → Knowledge Base" workflow with all 4 nodes as specified in Pipeline 1 above
- [ ] Copy n8n webhook URL into AskElephant webhook settings
- [ ] Trigger a test call (or replay a past call if AskElephant allows)
- [ ] Verify n8n ran and a file appeared in `/sources/sales-calls/` in GitHub
- [ ] Review output: is PII stripped? Is frontmatter correct?
- [ ] Run a second generation test using the call insights — compare quality to Phase 1 draft
- [ ] Walk Nicole through how the AskElephant webhook works so she can troubleshoot it

**Success metric:** Real customer language appears in the AI draft without you manually putting it there.

---

### Phase 3: HubSpot Publishing Pipeline (Week 3–4)
**Goal:** AI drafts land in HubSpot as staged drafts with Slack notification.

- [ ] Create `pipeline_hold` custom blog post property in HubSpot (Settings → Properties → Blog Post → Single checkbox)
- [ ] Build the generation workflow in n8n: GitHub API reads KB context → Claude API generates draft → HubSpot API creates draft post
- [ ] Add Gemini image generation step using your existing Cowork image skill
- [ ] Upload image to HubSpot file manager via API, associate with post
- [ ] Add Slack notification step (HTTP Request node → POST to webhook URL)
- [ ] Build the hourly auto-publish check (query HubSpot for drafts > 24hr old, skip if `pipeline_hold = true`, publish otherwise)
- [ ] Test end-to-end: trigger manually, verify draft in HubSpot, verify Slack message, verify auto-publish
- [ ] Show Ashley how to find and check the `pipeline_hold` property in HubSpot

**Success metric:** A post goes from "trigger" to "live in HubSpot with image" without you touching it.

---

### Phase 4: Remaining Ingestion Pipelines (Week 4–6)
**Goal:** All source channels feeding the knowledge base automatically.

- [ ] Apify: set up LinkedIn scraper actor with Marcus + thought leaders list → build daily n8n workflow
- [ ] RSS: build ingestion workflow for 5–8 industry publications (daily)
- [ ] Podcast: identify transcript source → build ingestion workflow (Google Drive or Descript)
- [ ] Competitor: build weekly scraper for 3–5 competitor blog sections
- [ ] Voice memos: build Google Drive trigger → Whisper transcription → GitHub commit workflow
- [ ] Test each pipeline independently, verify files appear in correct KB folders

**Success metric:** You open GitHub on Monday morning and there are new files from the weekend without you doing anything.

---

### Phase 5: Schedule the Generation Pipeline (Week 6–7)
**Goal:** System runs fully autonomously on a nightly schedule.

- [ ] Set n8n generation workflow to run nightly at midnight
- [ ] Configure topic selection logic (reads cluster index, picks 2 topics per run)
- [ ] Run for one week, review all output with Ashley
- [ ] Calibrate: adjust prompts, update brand voice files, refine banned phrases
- [ ] Establish Ashley's daily rhythm: check `#content-pipeline`, review drafts, set holds when needed

**Success metric:** 10+ posts published in first full autonomous week, and Ashley's refinements are getting smaller over time.

---

### Phase 6: Historical Backfill + Content Update Pipeline (Week 7–10)
**Goal:** Historical call transcripts ingested; old content begins getting refreshed.

- [ ] Run the HubSpot call engagement pull script from the Historical Backfill section above
- [ ] Download audio files (the download script)
- [ ] Run Whisper transcription batch on downloaded audio
- [ ] Apply PII stripping; commit best historical transcripts to `/sources/sales-calls/` (last 18 months, skip calls < 5 min)
- [ ] Build the monthly content audit workflow (query HubSpot for posts older than 6 months)
- [ ] Build the content refresh generation workflow (fetch post → read KB → Claude refresh prompt → create updated draft)
- [ ] Test with 3–5 old posts: generate refreshes, review, publish the best
- [ ] Set monthly refresh workflow to run on the 1st of each month

**Success metric:** At least 5 posts from 2023–2024 are updated and showing improved rankings within 60 days.

---

### Phase 7: Feedback Loop (Month 3+)
**Goal:** Performance data feeds back into what gets created.

- [ ] Enable HubSpot Search Console integration (Settings → Tracking & Analytics → Google Search Console → Connect)
- [ ] Build monthly performance report workflow (runs on the 1st, updates `/performance/monthly-report.md`)
- [ ] Train Ashley on reading the report and updating the cluster index in response
- [ ] Review first monthly report together and adjust topic priorities
- [ ] Schedule standing monthly 30-minute review with Ashley to update the cluster index

**Success metric:** The cluster index shows clear connections between last month's performance and next month's content plan.

---

## Key Risks to Watch

**AI content quality decay.** Generic AI content without updates drops off rankings by month three. The guardrails: leadership perspective notes (add genuine POV) and the content update pipeline (add freshness). Don't skip either.

**LinkedIn scraper fragility.** Apify maintains their scrapers, but LinkedIn still occasionally blocks them. Budget for occasional downtime. Treat it as a supplement, not a dependency.

**Prompt drift.** As you update brand voice files and the banned phrases list, old prompts may conflict with new guidelines. Run a quarterly prompt audit.

**Content cannibalization.** Publishing at high volume will quickly produce posts competing on the same keywords. The topic cluster index is your protection — review monthly, retire thin overlapping content, consolidate where needed.

**Content manager burnout.** Start at 5–10 posts/week. Increase gradually as Ashley builds a rhythm. The system should free her time, not replace one kind of pressure with another.

**Brand voice drift.** The more autonomous the system becomes, the more it drifts toward generic without fresh perspective input. Someone on leadership drops 2–3 voice memos per week — even 3 minutes of real thinking is enough to anchor a piece.

---

## Resources

### Practitioners to Learn From
- **Nick Saraev** — [youtube.com/@nicksaraev](https://www.youtube.com/@nicksaraev) | Best practical n8n/Make.com content pipeline walkthroughs. Watch before building anything.
- **Matt Wolfe** — [youtube.com/@mreflow](https://www.youtube.com/@mreflow) | Automated his 810K-sub content business with AI
- **n8n workflow templates** — [n8n.io/workflows](https://n8n.io/workflows) | Start with "Automate blog creation in brand voice with AI" (template #2648)

### Key Documentation
- **HubSpot CMS Blog API** — [developers.hubspot.com/docs/api-reference/cms-posts-v3/guide](https://developers.hubspot.com/docs/api-reference/cms-posts-v3/guide)
- **HubSpot CRM Calls API (for historical transcripts)** — [developers.hubspot.com/docs/reference/api/crm/engagements](https://developers.hubspot.com/docs/reference/api/crm/engagements/engagement-details/v1)
- **AskElephant HubSpot integration** — [askelephant.ai/hubspot-integrations](https://www.askelephant.ai/hubspot-integrations)
- **OpenAI Whisper API** — [platform.openai.com/docs/guides/speech-to-text](https://platform.openai.com/docs/guides/speech-to-text)
- **Apify LinkedIn scraper** — [apify.com](https://apify.com) → search "LinkedIn Profile Scraper"
- **n8n HubSpot integration** — [n8n.io/integrations/hubspot](https://n8n.io/integrations/hubspot/)

### On the Second Brain Approach
- **Andrej Karpathy's LLM Wiki pattern** (the GitHub + markdown approach this system uses) — [MindStudio writeup](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-obsidian-ai-second-brain)

---

*Built for IMPACT / Endless Customers. Last updated June 7, 2026.*
