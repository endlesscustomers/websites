# Backing Up & Sharing the Website (Plain-English Guide)

Goal: a private backup of these files on GitHub, plus a live link your team can click and view, while the open world cannot.

**What I already did for you:** This folder is now a Git repository with your first snapshot ("commit") saved. Junk files (.DS_Store, temp files) are excluded. You don't need to touch the command line for any of this. Just follow the steps below.

---

## Part 1 — Put your files on GitHub (private backup)

The easiest way, no command line:

### Use GitHub Desktop (recommended)

1. Download and install **GitHub Desktop**: https://desktop.github.com (free).
2. Open it and sign in to your GitHub account.
3. Go to **File → Add Local Repository**.
4. Choose this folder: `Documents/IMPACT/Endless Customers/Website v2`.
   (It will recognize it's already a repository, because I set that up.)
5. Click **Publish repository** (top of the window).
6. **Important:** Make sure the **"Keep this code private"** box is **checked**.
7. Click **Publish**.

Done. Your files are now backed up privately on GitHub. Any time you change files, GitHub Desktop will show what changed; type a short note and click **Commit**, then **Push** to save a new backup version.

### Sharing the code (optional)
A private repo means only people you invite can see it, and they need a GitHub account and have to log in. To invite teammates: on github.com, open the repo → **Settings → Collaborators → Add people**. This is for seeing the *files*, not the live site. The live site is Part 2.

---

## Part 2 — Publish a team-only live link (Cloudflare Pages + Access)

This gives your team a clickable link to the working site, while keeping the public out. It's free.

> Why not GitHub Pages? GitHub Pages always publishes the live site to the whole world, even from a private repo. Cloudflare lets us lock it to your team.

### Step A — Connect the site
1. Create a free account at https://dash.cloudflare.com/sign-up.
2. In the dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize Cloudflare to access your GitHub, and pick the **Website v2** repo.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** leave blank
   - **Build output directory:** `/`  (just a slash — this is a plain HTML site, nothing to compile)
5. Click **Save and Deploy**. After a minute you'll get a link like `your-site-name.pages.dev`.

### Step B — Lock it to your team
1. In Cloudflare, go to **Zero Trust** (free for up to 50 users).
2. Go to **Access → Applications → Add an application → Self-hosted**.
3. Point it at your `pages.dev` link.
4. Add a **policy**: set the rule to **Emails** and list your teammates' email addresses (or use **Emails ending in** `@impactplus.com` to allow the whole team at once).
5. Save.

Now when anyone opens the link, Cloudflare asks for their email and sends a one-time code (or Google login). Only the emails you listed get in. Everyone else is blocked.

Share the `pages.dev` link with your team and you're done.

---

## Quick reference

| Thing | Where | Who can see it |
|---|---|---|
| Your files (backup) | GitHub private repo | Only collaborators you invite (must log in) |
| Live clickable site | Cloudflare `pages.dev` link | Only the emails you allow in Cloudflare Access |

**Updating the live site later:** Just commit + push in GitHub Desktop. Cloudflare automatically rebuilds and updates the live link within a minute. No extra steps.
