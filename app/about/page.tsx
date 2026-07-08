import Link from "next/link";
import Image from "next/image";
import { PortraitEyeTrack } from "@/components/about/PortraitEyeTrack";

const currentWork = [
  {
    label: "Studio",
    title: "Building my own narrative-driven game studio",
    tone: "studio",
  },
  {
    label: "AI",
    title: "Building AI-native products with vibe coding",
    tone: "ai",
  },
  {
    label: "Coaching",
    title: "Coaching clients as a certified personal trainer",
    tone: "fitness",
  },
  {
    label: "Coffee",
    title: "Always open for coffee chats",
    tone: "coffee-current",
  },
];

export default function AboutPage() {
  return (
    <main className="editorial-about">
      <header className="editorial-about-nav">
        <Link href="/" className="editorial-brand" aria-label="Back to Huilin Park homepage">
          Huilin Park
        </Link>
        <Link href="/" className="editorial-back-link">
          Back to park
        </Link>
      </header>

      <section className="editorial-hero" aria-labelledby="about-hero-title">
        <div className="hero-editorial-copy">
          <p className="section-label">Welcome Plaza / About</p>
          <h1 id="about-hero-title">Meet Huilin</h1>
          <p>
            A Product & UX Designer in London working across AI-native products, future
            interaction concepts and thoughtful digital experiences.
          </p>
        </div>

        <PortraitEyeTrack />
      </section>

      <section className="about-quote-section" aria-labelledby="philosophy-title">
        <div className="quote-meta">
          <p className="section-label">01 / Philosophy</p>
        </div>
        <h2 id="philosophy-title" className="belief-title">
          I believe AI should make technology feel more human, not more complicated.
        </h2>
        <figure className="fastpass-graphic" aria-hidden="true">
          <Image
            src="/about/fastpass.png"
            alt=""
            fill
            sizes="(max-width: 980px) 72vw, 34vw"
          />
        </figure>
      </section>

      <section className="editorial-section about-profile-section" aria-labelledby="about-title">
        <p className="section-label">02 / About</p>

        <div className="profile-layout">
          <figure className="about-image-frame">
            <Image
              src="/about/about-huawei-team.png"
              alt="Huawei innovation lab team in a warm retro office illustration"
              fill
              sizes="(max-width: 980px) 100vw, 60vw"
            />
          </figure>

          <div className="about-copy-column">
            <div className="editorial-section-heading">
              <h2 id="about-title">Designing between people, technology and business.</h2>
            </div>

            <article className="editorial-copy">
              <p>
                I enjoy turning early ideas into products that people can actually use. My
                work sits between user needs, emerging technology and business goals, with
                a strong interest in AI-native product design.
              </p>
              <p>
                During my year at Huawei R&amp;D Innovation Labs (May 2025-June 2026), I
                designed AI wearables, future interaction concepts and design systems.
                Working in a fast-paced innovation environment taught me to learn quickly,
                prototype rapidly, and turn complex ideas into products that people can
                actually use.
              </p>
              <p>
                My background combines traditional industrial design with digital product
                design, so I&apos;m comfortable moving between research, UX, UI,
                prototyping, visual design and 3D. Recently, I&apos;ve also been embracing
                AI tools and vibe coding to prototype ideas faster and iterate products in
                entirely new ways.
              </p>
              <p>
                For me, good design isn&apos;t just about making things look beautiful. It
                should solve real problems, create value for users, and help businesses
                build better products.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="editorial-section beyond-section" aria-labelledby="beyond-title">
        <article className="editorial-copy beyond-copy">
          <p className="section-label">03 / Beyond Design</p>
          <h2 id="beyond-title">Conversation is part of the craft.</h2>
          <p>
            Outside of design, I&apos;m also a certified Level 3 Personal Trainer in the
            UK.
          </p>
          <p>
            Coaching has reinforced something I already believed: great products&mdash;and
            great relationships&mdash;both start with understanding people.
          </p>
          <p>
            I enjoy building genuine, long-term relationships rather than one-off
            conversations. Whether it&apos;s discussing AI, product design, fitness, or
            simply exchanging ideas, I&apos;m always happy to meet new people over coffee.
          </p>
        </article>

        <figure className="beyond-image-frame">
          <Image
            src="/about/beyond-design-workshop.png"
            alt="Two designers discussing ideas in a warm retro workshop illustration"
            fill
            sizes="(max-width: 980px) 100vw, 60vw"
          />
        </figure>
      </section>

      <section className="editorial-section currently-editorial-section" aria-labelledby="currently-title">
        <div className="editorial-section-heading">
          <p className="section-label">04 / Currently</p>
          <h2 id="currently-title">Current coordinates</h2>
        </div>

        <div className="current-layout">
          <figure className="currently-image-frame">
            <Image
              src="/about/currently-friends-park.png"
              alt="Friends in a warm retro amusement park illustration"
              fill
              sizes="(max-width: 980px) 100vw, 62vw"
            />
          </figure>
          <div className="current-list">
            {currentWork.map((item, index) => (
              <article className={`current-item ${item.tone}`} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="connect-editorial-section" aria-labelledby="connect-title">
        <div className="connect-copy">
          <p className="section-label">05 / Let&apos;s Connect</p>
          <h2 id="connect-title">Say Hello.</h2>
          <p>
            If you&apos;re working on AI, product design, future technology, or simply
            enjoy thoughtful conversations, I&apos;d love to hear from you.
          </p>
        </div>

        <address className="contact-editorial-list">
          <a href="mailto:huilinshen1109@gmail.com">
            <span>Email</span>
            huilinshen1109@gmail.com
          </a>
          <a href="tel:+447419206893">
            <span>Phone</span>
            +44 7419 206893
          </a>
          <a href="https://www.linkedin.com/in/huilinshen" target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            www.linkedin.com/in/huilinshen
          </a>
        </address>
      </section>
    </main>
  );
}
