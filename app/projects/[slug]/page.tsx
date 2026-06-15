import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { CalendarFlipbook } from "@/components/projects/CalendarFlipbook";
import { CaseStudySubAccordion } from "@/components/projects/CaseStudySubAccordion";
import { ResearchProcessAccordion } from "@/components/projects/ResearchProcessAccordion";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Huilin Park",
    };
  }

  return {
    title: `${project.title} | Huilin Park`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isCommunityGardens = project.slug === "community-gardens";
  const communityProjectTitleClass =
    "max-w-5xl text-[38px] font-black leading-tight text-[#75A723] md:text-[52px] xl:text-[64px]";
  const communityBodyClass =
    "text-[18px] font-normal leading-relaxed text-black md:text-[22px] xl:text-[28px]";
  const communityMetaClass =
    "text-[16px] font-normal leading-relaxed text-neutral-500 md:text-[18px] xl:text-[20px]";
  const communityH1Class =
    "text-[28px] font-black uppercase leading-tight text-[#75A723] md:text-[34px] xl:text-[40px]";
  const communityH3Class =
    "text-[22px] font-black leading-tight text-black md:text-[26px] xl:text-[30px]";

  return (
    <main className={`min-h-screen ${isCommunityGardens ? "bg-white text-black" : "bg-[#fffaf0] text-[#202018]"}`}>
      <article
        className={`mx-auto grid w-full gap-12 px-5 py-8 md:px-8 md:py-12 lg:px-10 xl:px-12 ${
          isCommunityGardens ? "max-w-[1440px]" : "max-w-6xl"
        }`}
      >
        <Link className="inline-flex w-fit items-center gap-2 font-medium text-[#5c5749]" href="/">
          <ArrowLeft size={18} /> Back to park
        </Link>

        {project.details ? (
          <>
            {isCommunityGardens ? (
              <header className="grid gap-10 py-8 md:py-14">
                <div className="grid gap-8">
                  <h1 className={communityProjectTitleClass}>
                    Community Gardens Forres
                  </h1>
                  <dl className={`grid gap-y-3 md:grid-cols-[90px_auto_1fr] md:gap-x-4 ${communityMetaClass}`}>
                    <dt>Duration</dt>
                    <dd className="hidden md:block">|</dd>
                    <dd>Jun-Aug 2024</dd>
                    <dt>Role</dt>
                    <dd className="hidden md:block">|</dd>
                    <dd>Individual Master&apos;s Graduation Project</dd>
                    <dt>Focus</dt>
                    <dd className="hidden md:block">|</dd>
                    <dd>UX Research · Stakeholder Mapping · Community Engagement</dd>
                  </dl>
                </div>

                <section className={`grid max-w-5xl gap-2 ${communityBodyClass}`}>
                  <h2 className={communityH3Class}>Overview</h2>
                  <p>
                    A UX project that helps community gardens attract young volunteers and address long-term funding and
                    labour challenges.
                  </p>
                </section>

                <div className="border-t border-[#75A723]" />

                <section className={`grid gap-10 md:grid-cols-3 md:gap-20 ${communityBodyClass}`}>
                  <div className="grid content-start gap-3">
                    <h2 className={communityH3Class}>Challenge</h2>
                    <p>Lack of funding, volunteers, and youth engagement.</p>
                  </div>
                  <div className="grid content-start gap-3">
                    <h2 className={communityH3Class}>Goal</h2>
                    <p>Bring more young people into community gardening.</p>
                  </div>
                  <div className="grid content-start gap-3">
                    <h2 className={communityH3Class}>Impact</h2>
                    <p>More volunteers, stronger communities, and a more sustainable future.</p>
                  </div>
                </section>

                <div className="border-t border-[#75A723]" />

                <section className={`grid gap-3 ${communityBodyClass}`}>
                  <h2 className={communityH3Class}>Solution</h2>
                  <div>
                    <p>
                      A multi-touchpoint experience designed to make gardening more accessible and engaging for young
                      people:
                    </p>
                    <ul className="mt-2 list-disc pl-8">
                      <li>Home Gardening Toolkit</li>
                      <li>Redesigned Community Signage</li>
                      <li>AR Gardening Experience</li>
                    </ul>
                  </div>
                </section>
              </header>
            ) : (
              <header className="grid gap-10 py-8 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:py-14">
                <div className="grid min-h-[360px] content-between gap-8">
                  <div className="grid gap-8">
                    <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
                      {project.title} Forres
                    </h1>
                    <div className="grid gap-5 text-xl leading-relaxed text-[#202018]">
                      <p>{project.details.workType}</p>
                      <p>{project.details.dateRange}</p>
                    </div>
                  </div>

                  {project.details.stakeholder ? (
                    <p className="max-w-xl text-xl italic leading-relaxed text-[#202018]">
                      Stakeholders: {project.details.stakeholder.label}
                      <br />
                      <Link href={project.details.stakeholder.url}>
                        ({project.details.stakeholder.url})
                      </Link>
                    </p>
                  ) : null}
                </div>

                <div className="grid content-center gap-6 text-xl leading-9 text-[#202018]">
                  {project.details.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </header>
            )}

            <section className="overflow-hidden rounded-lg border border-[#e3d6b5] bg-white shadow-[0_6px_0_#eadfca]">
              <Image
                src={project.cover}
                alt={`${project.title} final product cover`}
                width={1754}
                height={1241}
                className="h-auto w-full"
                priority
              />
            </section>

            {isCommunityGardens ? (
              <>
                <CalendarFlipbook />

                <section className="grid justify-items-start border-t border-neutral-200 py-14" aria-label="Map front">
                  <div className="grid w-full gap-3 overflow-hidden bg-white">
                    <Image
                      src="/projects/community-gardens/outputs/map-front.png"
                      alt="Community garden map front"
                      width={1684}
                      height={1190}
                      className="h-auto w-full"
                    />
                    <p className={`text-left ${communityBodyClass}`}>Map Front</p>
                    <Image
                      src="/projects/community-gardens/outputs/map-back.png"
                      alt="Community garden map back"
                      width={1684}
                      height={1190}
                      className="mt-8 h-auto w-full"
                    />
                    <div className="grid gap-2 pt-3 md:grid-cols-3">
                      <p className={`text-left ${communityBodyClass}`}>Map Back</p>
                      <p className={`text-left ${communityBodyClass}`}>
                        8-panel fold, pocket-sized when folded
                      </p>
                    </div>
                    <div className="grid gap-8 pb-10 pt-10 md:-mt-8 md:grid-cols-[1fr_auto] md:items-start">
                      <div className="grid gap-5">
                        <div className="grid gap-4 pt-12">
                          <h2 className={communityH1Class}>COMMUNITY GARDEN MAP</h2>
                          <div className="grid gap-2">
                            <h3 className={communityH3Class}>A Map</h3>
                            <p className={`max-w-5xl ${communityBodyClass}`}>
                              on the theme of Forres community garden, which shows the general location and gives the
                              contact information of the community garden.
                            </p>
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/projects/community-gardens/outputs/physical-map.png"
                        alt="Folded physical community garden map"
                        width={521}
                        height={463}
                        className="h-auto w-full justify-self-end md:w-[34vw] md:min-w-[420px] md:max-w-[560px] xl:max-w-[640px]"
                      />
                    </div>
                    <div className="grid gap-14 pt-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
                      <section className="grid content-start gap-10" aria-label="Street signs">
                        <div className="flex items-end md:aspect-[758/560]">
                          <Image
                            src="/projects/community-gardens/outputs/street-sign.png"
                            alt="Making and installing wooden street signs for community garden plants"
                            width={842}
                            height={534}
                            className="h-auto w-full"
                          />
                        </div>
                        <div className="grid gap-4">
                          <h2 className={communityH1Class}>
                            Street Signs
                          </h2>
                          <div className={`grid max-w-3xl gap-6 ${communityBodyClass}`}>
                            <p>
                              let passers-by to learn about the plant and information about related community gardens
                            </p>
                            <p>e.g. this rose bed is managed and maintained by Forres in Bloom.</p>
                          </div>
                        </div>
                      </section>

                      <section className="grid content-start gap-10" aria-label="Seed bags">
                        <div className="flex items-end md:aspect-[758/560]">
                          <Image
                            src="/projects/community-gardens/outputs/seed-bags.png"
                            alt="Front and back seed bag tag designs with QR codes"
                            width={758}
                            height={560}
                            className="h-auto w-full"
                          />
                        </div>
                        <div className="grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-start">
                          <div className="grid gap-4">
                            <h2 className={communityH1Class}>Seed Bags</h2>
                            <p className={`max-w-2xl ${communityBodyClass}`}>
                              Scan the QR code on the back to learn the growing instructions for that plant.
                            </p>
                          </div>
                          <Image
                            src="/projects/community-gardens/outputs/seed-bag-single.png"
                            alt="Folded carrot seed bag tag with ribbon"
                            width={602}
                            height={660}
                            className="-mt-6 h-auto w-full justify-self-end md:-mt-16 md:w-[92%]"
                          />
                        </div>
                      </section>
                    </div>
                    <section className="grid gap-5 pt-16" aria-labelledby="ar-gardening-market-title">
                      <div className="grid gap-2">
                        <h2
                          id="ar-gardening-market-title"
                          className={communityH1Class}
                        >
                          AR Gardening Market
                        </h2>
                        <p className={communityBodyClass}>
                          <strong className="font-black">Youtube link:</strong>{" "}
                          <em>https://youtu.be/mA_cTKQcZcg</em>
                        </p>
                      </div>
                      <Image
                        src="/projects/community-gardens/outputs/ar-gardening-market.png"
                        alt="AR gardening market poster and augmented garden scene collage"
                        width={1614}
                        height={898}
                        className="h-auto w-full"
                      />
                      <div className={`grid gap-x-12 gap-y-2 md:w-fit md:grid-cols-2 ${communityBodyClass}`}>
                        <div className="grid gap-2">
                          <p>☀️ Saturday, June 7th 2025</p>
                          <p>⏰ 10:00 AM - 1:00 PM</p>
                        </div>
                        <div className="grid gap-2">
                          <p>📍 Grant Park, Forres</p>
                          <p>💰 FREE to everyone</p>
                        </div>
                      </div>
                    </section>
                    <section className="grid gap-5 pt-16" aria-labelledby="storyboard-title">
                      <h2
                        id="storyboard-title"
                        className={communityH1Class}
                      >
                        Storyboard
                      </h2>
                      <Image
                        src="/projects/community-gardens/outputs/storyboard.png"
                        alt="Storyboard showing the community garden journey from scanning QR codes to joining the market"
                        width={1638}
                        height={1028}
                        className="h-auto w-full"
                      />
                    </section>
                  </div>
                </section>
              </>
            ) : null}
          </>
        ) : (
          <>
            <header className="grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-end">
              <div className="grid gap-5">
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ffe29a] px-3 py-1 text-sm font-medium uppercase tracking-[0.16em]">
                  <Sparkles size={14} /> UIUX case study
                </p>
                <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#5c5749]">{project.summary}</p>
                <div className="flex flex-wrap gap-2 text-sm font-medium text-[#5c5749]">
                  <span>{project.year}</span>
                  <span>/</span>
                  <span>{project.role}</span>
                  <span>/</span>
                  <span>{project.tags.join(", ")}</span>
                </div>
              </div>

              <section className="case-hero-visual" aria-label={`${project.title} visual preview`}>
                <div className="watch-face">
                  <div className="watch-time">10:42</div>
                  <div className="watch-rings">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="watch-complications">
                    <span>Move</span>
                    <span>Focus</span>
                    <span>Mood</span>
                  </div>
                </div>
                <div className="generator-panel">
                  <span>Intent</span>
                  <strong>Calm morning</strong>
                  <div />
                  <div />
                  <div />
                </div>
              </section>
            </header>

            <section className="grid gap-4 border-y border-[#e3d6b5] py-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7a6b40]">Format</p>
                <p className="mt-2 text-xl font-medium">Scrolling product story</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7a6b40]">Entry</p>
                <p className="mt-2 text-xl font-medium">Park ride in Huilin Park</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7a6b40]">Next asset</p>
                <p className="mt-2 text-xl font-medium">Replace preview with Figma exports</p>
              </div>
            </section>
          </>
        )}

        {isCommunityGardens ? (
          <ResearchProcessAccordion>
            <div className="grid gap-16">
              <section className="w-full bg-white" aria-label="Research overview">
                <Image
                  src="/projects/community-gardens/outputs/research-bg.png?v=2"
                  alt="Community garden research overview for Forres Friends of Woods and Fields"
                  width={1684}
                  height={1152}
                  sizes="(min-width: 1440px) 1440px, 100vw"
                  unoptimized
                  className="h-auto w-full"
                />
              </section>

              <CaseStudySubAccordion title="Stage1 Desk Research">
                <section
                  className="grid gap-16 bg-white text-[14px] font-normal leading-normal text-black md:text-[16px] xl:text-[18px]"
                  aria-label="Stage 1 desk research"
                >
                  <section className="grid max-w-5xl gap-5">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      About Forres
                    </h3>
                    <div className="grid gap-5">
                      <p>
                        Forres is a small town in northeastern Scotland, near the coast of the Moray Firth, known for
                        its beautiful scenery and nicknamed the &quot;flower of Scotland&quot;.
                      </p>
                      <p>
                        It has won a number of awards for its proliferation of floral displays, including Scotland in
                        Bloom and Keep Scotland Beautiful, not to mention the Queen&apos;s Award for Voluntary Service for
                        the teams who plant some 20,000 flowers each year. (Thackray, 2024)
                      </p>
                      <div className="grid gap-2">
                        <p>Meanwhile, Forres has a number of community gardens</p>
                        <ul className="list-disc pl-6">
                          <li>Forres in Bloom</li>
                          <li>Forres Friends of Woods and Fields</li>
                          <li>Transition Town Forres</li>
                          <li>Forres Community Garden and Allotments</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-5">
                    <div className="grid gap-3">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        Field Research
                      </h3>
                      <p>These are all gardening and growing I found in Forres</p>
                    </div>
                    <Image
                      src="/projects/community-gardens/outputs/field-research.png?v=1"
                      alt="Field research strip showing gardens and floral displays in Forres"
                      width={1558}
                      height={168}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      unoptimized
                      className="h-auto w-full"
                    />
                    <div className="grid gap-6 md:grid-cols-5 md:gap-5">
                      <p>
                        <strong>Community Gardens</strong>
                        <br />
                        Forres Friends &amp; Transition Town Forres
                      </p>
                      <p>
                        <strong>Grant Park</strong>
                        <br />
                        peacock, ladybird or butterfly-shaped creations
                      </p>
                      <p>
                        <strong>High Street</strong>
                        <br />
                        hanging baskets decorating &amp; flowers beds
                      </p>
                      <p>
                        <strong>Roadside</strong>
                        <br />
                        flowers beds
                      </p>
                      <p>
                        <strong>Residents&apos; Gardens</strong>
                        <br />
                        Magnolia &amp; Apple Trees
                      </p>
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Gardening Trends
                    </h3>
                    <p>
                      Through the desktop research, I learnt that gardening has been used as a form of healing and a
                      way to <strong>socialise</strong>, especially after the epidemic, the need for mental health and
                      socialising is stronger, and <strong>more and more people</strong> are into and starting to learn
                      to garden.
                    </p>
                    <ul className="grid gap-6 pt-3">
                      <li className="grid gap-1">
                        <p className="font-black">
                          Gardens functioned as therapeutic landscapes during and after COVID-19
                        </p>
                        <p>
                        Gardens have long been considered as refuges into which we retreat to{" "}
                        <strong>escape various struggles and challenges.</strong> There is positive potential for
                        therapeutic garden landscapes beyond COVID-19. (Marsh et al, 2021)
                        </p>
                      </li>
                      <li className="grid gap-1">
                        <p className="font-black">
                          High levels of knowledge and interest in gardening among young people in the UK
                        </p>
                        <p>
                        As a hobby, gardening is seen positively. <strong>72%</strong> of millennials have already
                        helped with gardening, <strong>79%</strong> have grown a plant and 75% enjoy growing plants.
                        (Evelegh, 2016)
                        </p>
                      </li>
                      <li className="grid gap-1">
                        <p className="font-black">
                          Global trends in the growth of consumer demand for organic food
                        </p>
                        <p>
                        A gradual, yet, extensive growth has been witnessed worldwide in{" "}
                        <strong>demand for organic food</strong> (Sultan et al, 2020) with global sales posited to have
                        crossed USD <strong>90 billion</strong> in the past twenty years. (Willer et al, 2020)
                        </p>
                      </li>
                    </ul>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion title="Stage2 Interview with Stakeholder" defaultOpen>
                <section
                  className="grid gap-8 bg-white text-[14px] font-normal leading-normal text-black md:text-[16px] xl:text-[18px]"
                  aria-label="Stage 2 interview with stakeholder"
                >
                  <Image
                    src="/projects/community-gardens/outputs/forres-friends-introduction.png?v=1"
                    alt="Forres Friends of Woods and Fields introduction over a site boundary map"
                    width={1684}
                    height={1214}
                    sizes="(min-width: 1440px) 1440px, 100vw"
                    unoptimized
                    className="h-auto w-full"
                  />

                  <p className="max-w-5xl">
                    After contacting Nick, the founder of Forres Friend, by email, I went to Forres Friend on 15 June
                    for a 40-minute interview and participated in a 3-hour gardening session on the same day.
                  </p>

                  <div className="grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:items-start">
                    <Image
                      src="/projects/community-gardens/outputs/participatory-observation.png?v=1"
                      alt="Participatory observation collage showing weekly gardening events and open day festival"
                      width={1230}
                      height={692}
                      sizes="(min-width: 1024px) 65vw, 100vw"
                      unoptimized
                      className="h-auto w-full"
                    />
                    <div className="grid gap-5">
                      <p>
                        Every Wednesday and every other Saturday, Forres Friends of Woods and Fields is hosting an event
                        at Sanquhar Woods &amp; Chapleton Fields from 10am to 1pm with founder Nick organising and
                        guiding volunteers in organic gardening.
                      </p>
                      <p>
                        In addition to the weekly gardening events, Forres Friends has organised an Open Day Festival to
                        celebrate a beautiful year and abundance of harvest for two years in a row. Around 250 people
                        attended an open day focused on the work of a local environmental charity in 2023.
                      </p>
                    </div>
                  </div>
                </section>
              </CaseStudySubAccordion>
            </div>
          </ResearchProcessAccordion>
        ) : (
          <section className="grid gap-5">
            {project.sections.map((section) => (
              <section
                key={section.title}
                className="grid gap-4 rounded-lg border border-[#e3d6b5] bg-white p-5 shadow-[0_4px_0_#eadfca] md:grid-cols-[0.34fr_1fr] md:p-7"
              >
                <h2 className="text-2xl font-medium">{section.title}</h2>
                <p className="leading-8 text-[#5c5749]">
                  {section.body}
                </p>
              </section>
            ))}
          </section>
        )}

        <Link className="inline-flex w-fit items-center gap-2 rounded-full bg-[#202018] px-5 py-3 font-medium text-white" href="/">
          Open the 3D park <ExternalLink size={18} />
        </Link>
      </article>
    </main>
  );
}

