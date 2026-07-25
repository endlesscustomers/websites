/* IMPACT marketing homepage — high-fidelity recreation composed from the
   design-system components. Loaded by index.html after the bundle. */
const {
  NavBar, HelloBar, Footer, ChatWidget,
  Button, Badge, Callout, SectionHeading, CheckItem,
  ProgramCard, FeatureCard, TestimonialCard,
  FaqAccordion, NewsletterForm,
} = window.IMPACTDesignSystem_9efa99;

const A = {
  hero: "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/Homepage_Featured_image.jpg",
  ec: "https://www.impactplus.com/hubfs/Imported%20sitepage%20images/Endless%20Customers%20Logo%20-%20Black.svg",
  ecProgram: "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/Book_EC-Program.svg",
  ecLive: "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/EC_Homepage_EC-Live.svg",
  ecWhite: "https://www.impactplus.com/hubfs/Endless%20Customers/Logo/Endess_Customers_Logo_White__NoIcon.svg",
  book: "https://www.impactplus.com/hs-fs/hubfs/Endless%20Customers/Assets/Book/EC-Minibook-Best-Seller-Framed.png",
};

const dot = { fontFamily: "var(--font-body)" };

function Hero() {
  return (
    <section style={{ position: "relative", background: "var(--ec-neutral-700)", overflow: "hidden" }}>
      <img src={A.hero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(29,29,31,.55), rgba(29,29,31,.75))" }} />
      <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "80px 24px 0", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 76, lineHeight: 1.02, color: "#fff", margin: "0 0 22px" }}>Win More Customers</h1>
        <p style={{ ...dot, fontSize: 22, lineHeight: 1.5, maxWidth: 760, margin: "0 auto 8px", color: "rgba(255,255,255,.92)" }}>
          IMPACT Helps Great Businesses Become The Most Known, Trusted and Recommended Company In Their Market With The Endless Customers System.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignItems: "end", marginTop: 40, paddingBottom: 0 }}>
          {[["1. Learn the System", "down-right"], ["2. Get Coaching", "down"], ["3. Experience the Conference", "down-left"]].map(([t, a], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
              <Callout arrow={a} size="md" color="#fff">{t}</Callout>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, transform: "translateY(40px)" }}>
          <ProgramCard logoSrc={A.ec} logoAlt="Endless Customers" ctaHref="#" linkLabel="Get a Free Chapter of the Book" linkHref="#" />
          <ProgramCard logoSrc={A.ecProgram} logoAlt="EC Coaching & Training" ctaHref="#" linkLabel="Book a Call to See if We're a Fit" linkHref="#" />
          <ProgramCard logoSrc={A.ecLive} logoAlt="Endless Customers LIVE" ctaHref="#" linkLabel="Register for Hartford, Oct 5-7" linkHref="#" />
        </div>
      </div>
      <div style={{ height: 70 }} />
    </section>
  );
}

function Millionaire() {
  return (
    <section style={{ background: "#fff", padding: "64px 24px 40px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--ec-neutral-700)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>▶</span>
        <span style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: 34, color: "var(--text-heading)" }}>"IMPACT &amp; The Endless Customers System made me a millionaire"</span>
      </div>
      <p style={{ ...dot, fontWeight: 700, color: "var(--text-heading)", marginTop: 14 }}>Ed McKnight, Opes Partners</p>
    </section>
  );
}

const CLIENTS = ["Yale", "La-Z-Boy", "Berry Insurance", "RoePaint", "RetroFoam", "Fire & Ice"];
function Clients() {
  return (
    <section className="ec-surface-muted" style={{ padding: "80px 24px" }}>
      <SectionHeading title="Companies Growing With IMPACT & Endless Customers…"
        subtitle="Many of the companies we work with are in construction, home improvement, retail, business services, and manufacturing." />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 56, marginTop: 44 }}>
        {CLIENTS.map((c, i) => (
          <span key={i} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, color: "var(--ec-neutral-500)", opacity: 0.7, letterSpacing: "0.02em" }}>{c}</span>
        ))}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { title: "Clarity That Drove Growth", quote: "We had a great product, but IMPACT helped us clarify our message and show our value through transparency. By educating instead of selling, we built trust, increased awareness, and accelerated growth in a way that felt authentic and sustainable.", name: "Jeffery Linta, CEO", company: "Linta Roofing" },
  { title: "Faster Sales Conversations, and Consistent Growth", quote: "IMPACT's coaching gave us the accountability and structure we needed to apply what we believed in. They challenged us, helped us build the right content systems, and kept us focused.", name: "Kaitlyn Pintarich, President", company: "Berry Insurance" },
  { title: "From One to Six Stores", quote: "From one store to six stores, that didn't happen by accident. Working with IMPACT and Endless Customers gave us guidance early on. Having coaching helped us adapt as the company continued to grow.", name: "Steve Sheinkopf, CEO", company: "Yale Appliance" },
  { title: "7x Revenue Growth", quote: "In three years, we saw 4x more sales qualified leads in our pipeline and 7x revenue growth. IMPACT's coaching gave us the clarity and accountability to align our content and become a trusted authority.", name: "Patrick Moorhead, Former CMO", company: "Pricefx" },
  { title: "A True Partner Through a Complex Build", quote: "IMPACT guided us through a complex website project with clarity and care. They brought value far beyond design by helping refine our message and story.", name: "Dana Svilar, Marketing Comms", company: "Bird Technologies" },
];
function Reviews() {
  return (
    <section style={{ background: "#fff", padding: "20px 24px 90px" }}>
      <SectionHeading title="…And Here's What They Have to Say" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1200, margin: "44px auto 0", alignItems: "stretch" }}>
        {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} />)}
      </div>
    </section>
  );
}

const FEATURES = [
  ["A Team of Coaches", "Guidance across strategy, content, sales, and video from IMPACT's experts."],
  ["Alignment Day", "Get leadership, sales, and marketing aligned on one methodology."],
  ["Content & Video Training", "Learn to create content and video buyers actually trust and use."],
  ["Website Strategy", "Turn your site into your most powerful sales asset."],
  ["AI Implementation", "Use AI to create better content faster and boost your AI-search visibility."],
  ["Sales Enablement", "Assignment selling, 1:1 video, and conversations that close faster."],
];
function WhatYouGet() {
  return (
    <section className="ec-surface-muted" style={{ padding: "90px 24px" }}>
      <SectionHeading eyebrow="The Program" title="What You'll Get"
        subtitle="Everything your team needs to master the Endless Customers System." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1120, margin: "44px auto 0", alignItems: "stretch" }}>
        {FEATURES.map(([t, d], i) => <FeatureCard key={i} title={t}>{d}</FeatureCard>)}
      </div>
    </section>
  );
}

function BookCta() {
  return (
    <section style={{ background: "var(--ec-neutral-700)", color: "#fff", padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr .8fr", gap: 40, alignItems: "center" }}>
        <div>
          <Badge>National Bestseller</Badge>
          <div style={{ margin: "16px 0" }}><img src={A.ecWhite} alt="Endless Customers" style={{ height: 46 }} /></div>
          <p style={{ ...dot, color: "rgba(255,255,255,.85)", fontSize: 18, maxWidth: 460, marginBottom: 22 }}>
            Get a taste of the book that brings you a proven system to build trust, drive sales, and become the market leader. Enter your email and we'll send it right over.
          </p>
          <NewsletterForm buttonLabel="Get My Copy" onDark placeholder="you@company.com" />
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={A.book} alt="Endless Customers book" style={{ maxHeight: 260 }} />
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "Who is IMPACT?", a: "IMPACT is the team behind the Endless Customers System. We help companies become the most known, trusted, and recommended brand in their market through our Endless Customers Coaching & Training Program." },
  { q: "What is The Endless Customers System?", a: "A proven approach to growth built for how buyers make decisions today — educate buyers early, earn trust faster, and position yourself as the most credible brand in your market." },
  { q: "Does IMPACT & Endless Customers Help Our Business With AI?", a: "Yes. We help you use AI to create better content more efficiently, increase your visibility in AI-driven search, and train your team to use AI safely and responsibly." },
  { q: "How Is IMPACT Different From a Marketing Agency?", a: "We're a coaching and training company. Companies see the strongest, most lasting results when they own their growth and use us to guide, coach, and train their teams rather than outsource the work." },
  { q: "What Kind of ROI Can We Expect?", a: "Most companies we work with see a 3–5x increase in qualified opportunities entering their pipeline, and those opportunities convert at a much higher rate. Results can begin almost immediately." },
];
function Faq() {
  return (
    <section style={{ background: "#fff", padding: "90px 24px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "300px 1fr", gap: 40, alignItems: "start" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 40, color: "var(--text-heading)", lineHeight: 1.1 }}>Frequently Asked Questions</h2>
        <FaqAccordion defaultOpen={0} items={FAQ} />
      </div>
    </section>
  );
}

function ReadyCta() {
  return (
    <section className="ec-surface-muted" style={{ padding: "72px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "left" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 40, color: "var(--text-heading)", marginBottom: 16 }}>Ready to take control?</h2>
        <p style={{ ...dot, fontSize: 18, color: "var(--text-body)", maxWidth: 640, marginBottom: 24 }}>
          If you're ready to control your growth, stop relying on agencies, and become the most known and trusted brand in your market, it's time to start your Endless Customers Mastery journey.
        </p>
        <Button variant="primary" size="lg" withArrow>Schedule an Initial Call</Button>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div>
      <NavBar />
      <HelloBar message="Enroll in Marketing Summer School!" highlight="Next Session July 23" />
      <Hero />
      <Millionaire />
      <Clients />
      <Reviews />
      <WhatYouGet />
      <BookCta />
      <Faq />
      <ReadyCta />
      <Footer />
      <ChatWidget />
    </div>
  );
}

Object.assign(window, { Home });
