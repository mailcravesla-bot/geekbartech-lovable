import Seo from "@/components/Seo";

const About = () => (
  <>
    <Seo
      title="About — Geek Bar Tech Shop"
      description="Learn about Geek Bar Tech Shop — our story, mission, and commitment to curated, premium tech."
    />
    <section className="border-b border-border/60 bg-muted/30">
      <div className="container py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Geek Bar Tech Shop</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We curate premium tech and accessories from trusted brands so you can shop with confidence.
        </p>
      </div>
    </section>

    <section className="container max-w-3xl space-y-6 py-12 text-base leading-relaxed text-foreground">
      <p>
        Geek Bar Tech Shop was built for people who care about the gear they use every day.
        From the latest gadgets to everyday essentials, every product in our catalog is
        hand-picked for quality, value and design.
      </p>
      <p>
        We believe great tech should be easy to discover and easy to buy. That&apos;s why we
        focus on a clean storefront, clear product information, and fast, secure checkout.
      </p>
      <p>
        Have a question or a product request? Reach out — we love hearing from fellow tech
        enthusiasts.
      </p>
    </section>
  </>
);

export default About;
