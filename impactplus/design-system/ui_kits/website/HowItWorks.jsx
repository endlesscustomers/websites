/* IMPACT "How it Works" page recreation — showcases SplitFeature, VideoFeature,
   TeamCard, StatCallout and BlogCard composed together. */
const {
  NavBar, HelloBar, Footer, ChatWidget,
  Button, Badge, SectionHeading, SplitFeature, VideoFeature,
  TeamCard, StatCallout, BlogCard,
} = window.IMPACTDesignSystem_9efa99;

const PHOTO = "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/Homepage_Featured_image.jpg";

const STEPS = [
  { eyebrow: "Step 1", title: "Kicking Off With Alignment Day", reverse: false, body: "Success depends on getting everyone on the same page from the start. That's why we begin with Alignment Day — a company-wide training plus your first planning session, so sales, marketing, and leadership all work from the same playbook." },
  { eyebrow: "Step 2", title: "Your First 90 Days: Building the Foundation", reverse: true, body: "Coming out of Alignment Day, you have a clear 90-day Game Plan. A key hire is your content manager; if you already have one, we help you onboard them for success and review the questions your buyers are already asking." },
  { eyebrow: "Step 3", title: "On-Going 90-Day Cycles", reverse: false, body: "At the end of each 90 days we regroup for your next planning session. We review what worked, what needs improvement, and where to focus next — building lasting mastery of the Endless Customers System." },
  { eyebrow: "Step 4", title: "Achieve Mastery & Scale", reverse: true, body: "Within 24 months your team will be self-sufficient and fully equipped to run the Endless Customers System at the highest level. Most IMPACT clients achieve mastery around 80% at this point." },
];

const TEAM = [
  ["Coaches", "You get a coach who holds your team accountable and guides you through implementation, every step of the journey."],
  ["Trainers", "Skill-building sessions across content, video, website, and sales — tailored to where your team needs to grow most."],
  ["Website Strategists", "Turn your website into your most powerful sales asset with strategy, optimization, and self-service tools."],
];

const INSIGHTS = [
  ["AEO in Action: Tracking Your Brand's Visibility with HubSpot", "July 28, 2026", "Jess Palmeri"],
  ["How Do You Get AI to Recommend Your Business?", "July 21, 2026", "Bob Ruffolo"],
  ["Can Endless Customers Help Me Get Recommended by AI?", "July 20, 2026", "Allison Riggs"],
];

function HowItWorks() {
  return (
    <div>
      <NavBar />
      <HelloBar message="Enroll in Marketing Summer School!" highlight="Next Session July 23" />

      <section style={{ background: "var(--ec-neutral-700)", color: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Badge variant="blue">Endless Customers Coaching & Training</Badge>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 60, color: "#fff", margin: "18px 0 16px" }}>How it Works</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 20, color: "rgba(255,255,255,.85)", maxWidth: 640 }}>
            The Endless Customers Coaching & Training Program is a structured, strategic system. This page breaks down exactly how the program works, step by step.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto 8px" }}>
          <VideoFeature poster={PHOTO} label="What is the Endless Customers Program?" sublabel="A 2-minute overview" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 72, marginTop: 48, flexWrap: "wrap" }}>
          <StatCallout value="24 mo." label="typical time to full mastery" />
          <StatCallout value="3–5x" color="var(--ec-green-600)" label="more qualified opportunities" />
          <StatCallout value="80%" script label="mastery most clients reach" />
        </div>
      </section>

      <section className="ec-surface-muted" style={{ padding: "80px 24px", display: "flex", flexDirection: "column", gap: 72 }}>
        {STEPS.map((s, i) => (
          <SplitFeature key={i} eyebrow={s.eyebrow} title={s.title} reverse={s.reverse} imageSrc={PHOTO}>
            <p>{s.body}</p>
          </SplitFeature>
        ))}
      </section>

      <section style={{ background: "#fff", padding: "88px 24px" }}>
        <SectionHeading title="Meet Your Team"
          subtitle="With the Endless Customers Coaching & Training Program, you get an entire team dedicated to guiding you through implementation." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1000, margin: "44px auto 0", alignItems: "stretch" }}>
          {TEAM.map(([role, desc], i) => <TeamCard key={i} role={role}>{desc}</TeamCard>)}
        </div>
      </section>

      <section className="ec-surface-muted" style={{ padding: "80px 24px" }}>
        <SectionHeading align="left" title="Recent Insights From Our Learning Center" style={{ maxWidth: 1120, marginInline: "auto" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1120, margin: "36px auto 0", alignItems: "stretch" }}>
          {INSIGHTS.map(([t, d, a], i) => <BlogCard key={i} image={PHOTO} title={t} date={d} author={{ name: a }} />)}
        </div>
      </section>

      <section style={{ background: "var(--ec-neutral-700)", color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 40, color: "#fff", margin: "0 0 24px" }}>Ready to take control?</h2>
        <Button variant="primary" size="lg" withArrow>Schedule an Initial Call</Button>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}

Object.assign(window, { HowItWorks });
