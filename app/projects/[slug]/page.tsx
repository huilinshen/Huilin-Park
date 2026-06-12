import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { CalendarFlipbook } from "@/components/projects/CalendarFlipbook";

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
                    <div
                      className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 py-16 text-[#75A723]"
                      aria-label="Research and design process divider"
                    >
                      <span className="border-t-2 border-dashed border-[#75A723]" />
                      <p className="text-center text-[18px] font-normal leading-relaxed md:text-[22px] xl:text-[28px]">
                        Research &amp; Design Process
                      </p>
                      <span className="border-t-2 border-dashed border-[#75A723]" />
                    </div>
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

        <Link className="inline-flex w-fit items-center gap-2 rounded-full bg-[#202018] px-5 py-3 font-medium text-white" href="/">
          Open the 3D park <ExternalLink size={18} />
        </Link>
      </article>
    </main>
  );
}

