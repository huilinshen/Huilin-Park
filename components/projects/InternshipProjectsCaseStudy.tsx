"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const internshipCopy = {
  hero: {
    label: "Internship Projects",
    title: "Consumer innovation and industrial design",
    summary:
      "Two early-career projects where I worked across user research, product thinking, visual design, industrial design and interface design.",
    metadata: [
      ["Role", "Design Internships"],
      ["Timeline", "2020–2023"],
      ["Project type", "Consumer Innovation · Industrial Design"],
    ],
  },
  overview:
    "This case study brings together two projects shaped by different design contexts: consumer innovation for a beverage launch and multidisciplinary product development for a kitchen appliance.",
  projects: [
    {
      id: "illuminera-suntory",
      index: "01",
      discipline: "Consumer Innovation",
      studio: "Illuminera × Suntory",
      title: "Suntory Qingxiang Oolong Tea",
      introduction:
        "At Illuminera, I worked at the intersection of user research, product strategy and visual design. For Suntory and Tmall Innovation Center, I contributed to the positioning, packaging and launch of Qingxiang Oolong Tea, helping translate consumer and market insights into a clear product proposition.",
      details: [
        ["Role", "UI/UX Designer Intern"],
        ["Company", "Illuminera, an IQVIA business"],
        ["Client", "Suntory × Tmall Innovation Center (TMIC)"],
        ["Timeline", "Jan 2023 – Jun 2023"],
        ["Location", "Shanghai"],
      ],
      outcome: "Within six months of launch, Qingxiang Oolong Tea became Suntory’s No.1 new product by GMV.",
      roleNote:
        "I also helped establish visual identities and reusable design-system foundations for two internal data and research products.",
      navMetadata: "Consumer Research · Positioning · Packaging",
      futureSections: ["Overview", "Challenge", "My Contribution", "Insight", "Positioning", "Packaging", "Impact"],
    },
    {
      id: "fotile-range-hood",
      index: "02",
      discipline: "Industrial Design",
      studio: "GoodMatter × FOTILE",
      title: "FOTILE Refrigerated Range Hood",
      introduction:
        "At GoodMatter Design Studio, I supported the development of FOTILE’s Refrigerated Range Hood across user research, industrial design and interface design. The work moved from in-home contextual research and kitchen pain-point synthesis to product concepts, 3D form studies and the cooker’s touchscreen interface.",
      details: [
        ["Role", "UI Designer Intern"],
        ["Company", "GoodMatter Design Studio"],
        ["Client", "FOTILE Refrigerated Range Hood"],
        ["Timeline", "Jan 2020 – Sep 2020"],
        ["Location", "Shanghai"],
      ],
      outcome: "User research · Industrial design · Interface design",
      roleNote: null,
      navMetadata: "Industrial Design · Product Development",
      futureSections: ["Context", "Challenge", "My Contribution", "Insight", "Form Exploration", "3D Development", "Outcome", "Reflection"],
    },
  ],
} as const;

const chapters = [
  ["Overview", "overview"],
  ["01 · Suntory", "illuminera-suntory"],
  ["02 · FOTILE", "fotile-range-hood"],
] as const;

const sectionLabelClass =
  "font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-black/30 md:text-[12px]";
const sectionTitleClass =
  "text-[42px] font-normal leading-[0.98] tracking-[-0.055em] text-[#0a0a0a] md:text-[62px] lg:text-[72px]";
const bodyClass = "text-[17px] leading-relaxed text-black/52 md:text-[19px]";

function SuntoryProjectChapter() {
  return (
    <section
      id="illuminera-suntory"
      className="scroll-mt-24 overflow-hidden bg-white px-5 py-24 md:px-10 lg:py-32"
      data-future-sections="Overview,Challenge,My Contribution,Impact"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-16 lg:gap-20">
        <header className="grid gap-10 border-t border-black/[0.08] pt-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(320px,0.44fr)] lg:items-start lg:gap-16">
          <div className="grid content-start gap-7 lg:py-4">
            <div className="grid gap-3">
              <p className={sectionLabelClass}>01 / Consumer Innovation</p>
              <p className="text-[17px] leading-relaxed text-black/42 md:text-[18px]">Illuminera × Suntory</p>
            </div>

            <div className="grid gap-5">
              <h2 className="max-w-[720px] text-[42px] font-normal leading-[0.98] tracking-[-0.055em] text-[#0a0a0a] md:text-[58px] lg:text-[64px]">
                Suntory Qingxiang Oolong Tea
              </h2>
              <p className="max-w-[680px] text-[23px] font-medium leading-tight tracking-[-0.035em] text-black/76 md:text-[30px]">
                From consumer insight to a market-ready tea proposition
              </p>
            </div>

            <div className="grid gap-2 border-y border-black/[0.08] py-6 font-mono text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-black/38 md:text-[12px]">
              <p>Illuminera, Shanghai · Design Intern</p>
              <p>Consumer Research · Product Positioning · Persona · Packaging Design</p>
            </div>

            <p className={`max-w-[700px] ${bodyClass}`}>
              Suntory wanted to identify a new growth opportunity within China&apos;s increasingly competitive ready-to-drink tea market. Working with Illuminera&apos;s innovation team, I supported the development of a new tea proposition by translating consumer and market research into a clear target audience, positioning direction and packaging concept.
            </p>
          </div>

          <figure className="grid gap-3 lg:justify-self-end">
            <div className="overflow-hidden border border-black/[0.08] bg-[#eef2e7]">
              <Image
                src="/projects/internship-projects/suntory/suntory-impact-poster.png"
                alt="Suntory Qingxiang Oolong Tea impact poster showing the product, launch process and top new-product GMV result"
                width={3342}
                height={4456}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <figcaption className="text-[13px] leading-relaxed text-black/34 md:text-[14px]">
              Suntory Qingxiang Oolong Tea launch and impact overview.
            </figcaption>
          </figure>
        </header>

        <div className="grid gap-12 border-t border-black/[0.08] pt-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="grid content-start gap-5 lg:col-span-3">
            <p className={sectionLabelClass}>The Challenge</p>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>Sugar-free tea was growing rapidly, but many products were communicating similar claims and beginning to look interchangeable.</p>
              <p>The challenge was to create a proposition that felt relevant to changing health expectations while remaining credible to Suntory&apos;s established tea heritage.</p>
            </div>
          </article>

          <article className="grid content-start gap-6 lg:col-span-5">
            <p className={sectionLabelClass}>My Contribution</p>
            <p className="border-y border-black/[0.08] py-5 text-[20px] font-medium leading-tight tracking-[-0.025em] text-black/78 md:text-[24px]">
              My focus: Positioning · Persona · Packaging
            </p>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>My focus was turning research findings into a consumer-facing product direction.</p>
              <p>I synthesised consumer needs and competitor patterns, helped define the target positioning, developed the core user persona and translated the strategy into the final packaging direction.</p>
              <p>The design aimed to communicate a tea that felt natural, light and suitable for everyday consumption—without becoming overly clinical or aggressively health-focused.</p>
            </div>
          </article>

          <article className="grid content-start gap-6 md:col-span-2 lg:col-span-4">
            <p className={sectionLabelClass}>Impact</p>
            <p className="text-[34px] font-normal leading-[1.02] tracking-[-0.05em] text-black md:text-[42px] lg:text-[46px]">
              No.1 Suntory new product by GMV within six months
            </p>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>The resulting product, Suntory Qingxiang Oolong Tea, successfully entered the market and became Suntory&apos;s highest-performing new product by GMV within six months of launch.</p>
              <p>This project showed me how consumer research, positioning and visual design can work together to turn an emerging market opportunity into a commercially successful product.</p>
            </div>
          </article>
        </div>

        <div className="grid gap-8 border-y border-black/[0.08] py-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-6">
          {[
            ["Research", "Market and consumer signals"],
            ["Positioning", "Natural everyday balance"],
            ["Design", "Persona and packaging direction"],
          ].map(([label, copy], index) => (
            <div key={label} className="contents">
              <div className="grid gap-2">
                <p className={sectionLabelClass}>{label}</p>
                <p className="text-[17px] leading-relaxed text-black/58 md:text-[18px]">{copy}</p>
              </div>
              {index < 2 ? <span className="rotate-90 text-[20px] text-black/22 md:rotate-0" aria-hidden="true">→</span> : null}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function FotileProjectChapter() {
  return (
    <section
      id="fotile-range-hood"
      className="scroll-mt-24 overflow-hidden bg-white px-5 py-24 md:px-10 lg:py-32"
      data-future-sections="Introduction,Contextual Research,Design Development,Outcome"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-24 lg:gap-32">
        <header className="grid gap-10 border-t border-black/[0.08] pt-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)] lg:items-center lg:gap-16">
          <div className="grid content-start gap-7">
            <p className={sectionLabelClass}>Good Matter Design Studio × FOTILE</p>
            <div className="grid gap-5">
              <h2 className="max-w-[720px] text-[48px] font-normal leading-[0.95] tracking-[-0.06em] text-[#0a0a0a] md:text-[68px] lg:text-[76px]">
                Where Cool Air Meets Cooking Heat
              </h2>
              <p className="max-w-[680px] text-[21px] font-medium leading-tight tracking-[-0.03em] text-black/64 md:text-[27px]">
                Research, product concept and interface design for FOTILE&apos;s A1.i Integrated Cooling Range Hood.
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-6 border-y border-black/[0.08] py-7 sm:grid-cols-2">
              {[
                ["Role", "UI/UX Design Intern"],
                ["Timeline", "Jan 2020 — Sep 2020"],
                ["Location", "Shanghai"],
                ["Scope", "Contextual Research · Product Concept · 3D Form Studies · Interface Design"],
              ].map(([label, value]) => (
                <div key={label} className="grid content-start gap-2">
                  <dt className={sectionLabelClass}>{label}</dt>
                  <dd className="text-[16px] leading-relaxed text-black/58 md:text-[17px]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="grid min-w-0 place-items-center bg-[#f4f3f1] p-4 md:p-7">
            <Image
              src="/projects/internship-projects/fotile/fotile-hero.jpg"
              alt="FOTILE A1.i Integrated Cooling Range Hood installed in a contemporary kitchen"
              width={1500}
              height={1140}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto max-h-[640px] w-full object-contain"
              priority
            />
          </figure>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] lg:gap-20">
          <p className={sectionLabelClass}>Introduction</p>
          <div className="grid max-w-[900px] gap-6 border-t border-black/[0.08] pt-8">
            <h3 className={sectionTitleClass}>Rethinking comfort in the Chinese kitchen</h3>
            <div className={`grid max-w-[820px] gap-4 ${bodyClass}`}>
              <p>Chinese stir-fry cooking creates an intense combination of heat, oil smoke and frequent cleaning.</p>
              <p>Working within Good Matter Design Studio&apos;s multidisciplinary team, I helped translate research in real family kitchens into the product and interface direction for FOTILE&apos;s A1.i — a range hood that brings cooling and smoke extraction into one integrated experience.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-t border-black/[0.08] pt-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center lg:gap-16">
          <div className="grid content-start gap-6">
            <p className={sectionLabelClass}>01 — Contextual Research</p>
            <h3 className="text-[38px] font-normal leading-[0.98] tracking-[-0.05em] text-black md:text-[54px]">Understanding the real kitchen</h3>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>We conducted contextual research in real family kitchens to understand how people cooked, cleaned and moved through limited kitchen spaces.</p>
              <p>The research revealed that heat, oil smoke, maintenance and spatial efficiency were not separate problems, but interconnected parts of the same cooking experience.</p>
              <p>I helped document user behaviour, synthesise recurring pain points and translate the findings into design opportunities.</p>
            </div>
          </div>
          <figure className="grid gap-3">
            <div className="overflow-hidden border border-black/[0.08] bg-[#f5f3f0]">
              <Image
                src="/projects/internship-projects/fotile/contextual-research.png"
                alt="Contextual research with a participant reviewing kitchen layouts and product concepts"
                width={3648}
                height={1812}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="grid gap-1">
              <span className={sectionLabelClass}>Contextual Research</span>
              <span className="text-[13px] leading-relaxed text-black/38 md:text-[14px]">Observing cooking behaviour and testing early assumptions in real homes</span>
            </figcaption>
          </figure>
        </section>

        <section className="grid gap-10 border-t border-black/[0.08] pt-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-center lg:gap-16">
          <figure className="grid gap-3 lg:order-1">
            <div className="overflow-hidden border border-black/[0.08] bg-[#f7f4f2]">
              <Image
                src="/projects/internship-projects/fotile/design-development.png"
                alt="Wall of sketches and design-development studies for the FOTILE range hood"
                width={3648}
                height={1444}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="grid gap-1">
              <span className={sectionLabelClass}>Design Development</span>
              <span className="text-[13px] leading-relaxed text-black/38 md:text-[14px]">Translating research insights into product form and interaction concepts</span>
            </figcaption>
          </figure>

          <div className="grid content-start gap-7 lg:order-2">
            <p className={sectionLabelClass}>02 — Design Development</p>
            <h3 className="text-[38px] font-normal leading-[0.98] tracking-[-0.05em] text-black md:text-[54px]">From insight to product experience</h3>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>Working with the multidisciplinary design team, I supported the development of early product concepts and 3D form studies.</p>
              <p>The research informed both the physical product and its interaction language, including a full-width oil collection solution and the touchscreen interface.</p>
            </div>
            <div className="grid gap-5 border-y border-black/[0.08] py-7">
              <h4 className="text-[28px] font-normal leading-tight tracking-[-0.04em] text-black md:text-[36px]">Designing the Skyline UI</h4>
              <div className={`grid gap-4 ${bodyClass}`}>
                <p>I developed the “Skyline” interface concept to express the product&apos;s core idea: cool airflow descending from above and cooking heat rising from below.</p>
                <p>Blue light represented cooling, while warm orange light represented the heat from the hob. Their meeting point formed a horizon — turning a complex engineering system into a simple visual identity.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-12 border-t border-black/[0.08] pt-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] lg:gap-20">
            <p className={sectionLabelClass}>Outcome</p>
            <div className="grid max-w-[900px] gap-6">
              <h3 className={sectionTitleClass}>From studio concept to commercial product</h3>
              <div className={`grid max-w-[820px] gap-4 ${bodyClass}`}>
                <p>The project developed into FOTILE&apos;s commercially launched A1.i Integrated Cooling Range Hood, combining cooling airflow and smoke extraction within one appliance.</p>
                <p>The Skyline metaphor was carried into the production interface, with its visual treatment refined for the final hidden-glass control panel.</p>
              </div>
            </div>
          </div>

          <figure className="grid place-items-center bg-[#f6f6f5] px-5 py-10 md:px-10 md:py-16">
            <Image
              src="/projects/internship-projects/fotile/fotile-product.png"
              alt="Complete FOTILE A1.i Integrated Cooling Range Hood product"
              width={800}
              height={800}
              sizes="(min-width: 1280px) 1100px, 100vw"
              className="h-auto max-h-[820px] w-full max-w-[1100px] object-contain"
            />
          </figure>

          <div className="grid gap-10 border-y border-black/[0.08] py-10 md:grid-cols-[0.38fr_0.62fr] md:items-start md:gap-16">
            <div className="grid gap-2">
              <p className="text-[48px] font-normal leading-none tracking-[-0.055em] text-black md:text-[64px]">2022</p>
              <p className={sectionLabelClass}>China Excellent Industrial Design Award</p>
              <p className="text-[22px] font-medium uppercase tracking-[0.08em] text-black/72">Gold</p>
            </div>
            <div className="grid max-w-[720px] gap-7">
              <p className={bodyClass}>The FOTILE A1.i later received Gold at the 2022 China Excellent Industrial Design Award, one of only ten Gold-winning projects that year.</p>
              <p className="border-t border-black/[0.08] pt-6 text-[14px] leading-relaxed text-black/38 md:text-[15px]">I contributed to this project as a UI/UX Design Intern within Good Matter&apos;s multidisciplinary team. The final product was developed collaboratively with FOTILE.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export function InternshipProjectsCaseStudy() {
  const [activeChapter, setActiveChapter] = useState("overview");

  useEffect(() => {
    const sections = chapters
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveChapter(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0, 0.15, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#0a0a0a]">
      <nav className="sticky top-4 z-40 mx-auto flex w-max max-w-[calc(100%-2rem)] items-center justify-center gap-1.5 overflow-x-auto rounded-full border border-black/10 bg-white/85 p-1 shadow-sm backdrop-blur-xl" aria-label="Internship projects">
        {chapters.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 font-mono text-[9px] font-semibold tracking-[0.02em] transition md:text-[10px] ${
              activeChapter === id ? "bg-black text-white" : "text-black/38 hover:bg-black/[0.05] hover:text-black/72"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      <header className="relative -mt-16 grid min-h-[calc(100vh-2rem)] overflow-hidden bg-white px-5 pb-20 pt-32 md:px-10">
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-[1280px] content-center gap-12">
          <div className="grid max-w-[1080px] gap-7">
            <p className={sectionLabelClass}>{internshipCopy.hero.label}</p>
            <h1 className="max-w-[1100px] text-[58px] font-normal leading-[0.92] tracking-[-0.075em] text-[#0a0a0a] sm:text-[72px] md:text-[96px] lg:text-[112px]">
              {internshipCopy.hero.title}
            </h1>
            <p className="max-w-[760px] text-[18px] font-medium leading-relaxed tracking-[-0.02em] text-black/42 md:text-[22px]">
              {internshipCopy.hero.summary}
            </p>
          </div>

          <dl className="grid max-w-[1080px] gap-8 border-t border-black/[0.08] pt-8 sm:grid-cols-3 sm:gap-6">
            {internshipCopy.hero.metadata.map(([label, value]) => (
              <div key={label} className="grid content-start gap-2">
                <dt className={sectionLabelClass}>{label}</dt>
                <dd className="text-[16px] leading-relaxed text-black/58 md:text-[18px]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section id="overview" className="scroll-mt-24 overflow-hidden bg-white px-5 py-24 md:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1280px] gap-16 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] lg:gap-20">
          <p className={sectionLabelClass}>Overview</p>
          <div className="grid max-w-[900px] gap-8 border-t border-black/[0.08] pt-8">
            <h2 className={sectionTitleClass}>Two projects, two design contexts.</h2>
            <p className={`max-w-[820px] ${bodyClass}`}>{internshipCopy.overview}</p>
            <nav className="grid border-y border-black/[0.08]" aria-label="Project chapter links">
              {internshipCopy.projects.map((project) => (
                <a key={project.id} href={`#${project.id}`} className="group grid gap-2 border-b border-black/[0.08] py-5 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-8">
                  <span className={sectionLabelClass}>{project.index} · {project.studio}</span>
                  <span className="text-[16px] leading-relaxed text-black/42 transition group-hover:text-black md:text-[17px]">{project.navMetadata}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {internshipCopy.projects.map((project) =>
        project.id === "illuminera-suntory" ? <SuntoryProjectChapter key={project.id} /> : <FotileProjectChapter key={project.id} />,
      )}

    </div>
  );
}
