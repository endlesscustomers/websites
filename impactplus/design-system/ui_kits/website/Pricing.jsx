/* IMPACT coaching Program Pricing page recreation. */
const {
  NavBar, HelloBar, Footer, ChatWidget,
  Button, Badge, SectionHeading, PricingTable, StepCard,
} = window.IMPACTDesignSystem_9efa99;

const PLANS = [
  { name: "Guidance", caption: "For teams already in the Mastery program that need less immersive support.", price: "$5,500 Per Month" },
  { name: "Mastery", caption: "Our most immersive program — engage faster, stay aligned, and achieve mastery within 24 months.", price: "$8,000 Per Month", highlight: true },
  { name: "Mastery Accelerated", caption: "For larger departments or companies that want to fast-track their results.", price: "$10,500 Per Month" },
];
const FEATURES = [
  { label: "Price Break", values: [ "Standard Pricing", { check: true, label: "Level 1 Price Break", caption: "Get More Services For Your Investment" }, { check: true, label: "Level 2 Price Break", caption: "Maximize What You Get" } ] },
  { label: "IMPACT+ Membership", values: [true, true, true] },
  { label: "Quarterly Planning Sessions", values: [true, true, true] },
  { label: "Coaching Sessions", caption: "For Leadership", values: ["2 Per Quarter", "5 Per Quarter", "5 Per Quarter"] },
  { label: "Trainings", caption: "For Marketing & Sales Teams", values: [ { label: "Up to 2 Per Quarter", caption: "Only Content or Video Training" }, { label: "Up to 10 Per Quarter", caption: "Any Training We Offer" }, { label: "Up to 24 Per Quarter", caption: "Any Training We Offer" } ] },
  { label: "Content Training", values: [true, true, true] },
  { label: "Video Training", values: [true, true, true] },
  { label: "AI for Content & Video Training", values: [true, true, true] },
  { label: "Content & Video Review and Feedback", values: [ "Up to 2 Reviews / Month", "Up to 5 Reviews / Month", "Up to 5 Reviews / Month" ] },
  { label: "Website Strategy", values: [false, "Available If Needed", "Available If Needed"] },
  { label: "Website Optimization Training", values: [false, true, true] },
  { label: "Assignment Selling Training", values: [false, true, true] },
  { label: "AI for Sales Training", values: [false, true, true] },
  { label: "HubSpot Training", values: [false, "Available If Needed", "Available If Needed"] },
  { label: "Endless Customers Live Passes", values: ["3 Per Event", "3 Per Event", "3 Per Event"] },
];

function Pricing() {
  return (
    <div>
      <NavBar />
      <HelloBar message="Enroll in Marketing Summer School!" highlight="Next Session July 23" />

      <section style={{ background: "var(--ec-neutral-700)", color: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Badge variant="blue">Program Pricing</Badge>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 60, color: "#fff", margin: "18px 0 16px" }}>Program Pricing</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 20, color: "rgba(255,255,255,.85)", maxWidth: 620 }}>
            We believe in being radically transparent. This page explains how our pricing works, and how to choose the right plan for your business — no hidden fees.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <SectionHeading eyebrow="Monthly Launching Plans" title="Choose The Plan That's" highlight="Right for You"
          subtitle="Prices are transparent and locked in. Should the price break tiers be reached, they will apply automatically." />
        <div style={{ maxWidth: 1120, margin: "44px auto 0" }}>
          <PricingTable plans={PLANS} features={FEATURES} />
        </div>
      </section>

      <section className="ec-surface-muted" style={{ padding: "80px 24px" }}>
        <SectionHeading title="Understanding the Full Cost of Implementation"
          subtitle="In addition to coaching & training, here are a few other costs to consider when planning your rollout." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 900, margin: "44px auto 0" }}>
          <StepCard number="01" title="Key Roles" color="var(--ec-blue-600)" caption="A content manager and often a videographer are key hires for success." />
          <StepCard number="02" title="Technology" color="var(--ec-ai-primary)" caption="A CRM and marketing automation tools like HubSpot support the system." />
          <StepCard number="03" title="Video Equipment" color="var(--ec-website-primary)" caption="A modest video setup pays for itself as trust-building content." />
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Button variant="primary" size="lg" withArrow>Schedule an Initial Call</Button>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}

Object.assign(window, { Pricing });
