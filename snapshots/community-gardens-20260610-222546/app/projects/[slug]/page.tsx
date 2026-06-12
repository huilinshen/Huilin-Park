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

  return (
    <main className={`min-h-screen ${isCommunityGardens ? "bg-white text-black" : "bg-[#fffaf0] text-[#202018]"}`}>
      <article
        className={`mx-auto grid gap-12 px-5 py-8 md:py-12 ${
          isCommunityGardens ? "max-w-[calc(100vw-4rem)] md:px-8" : "max-w-6xl md:px-8"
        }`}
      >
        <Link className="inline-flex w-fit items-center gap-2 font-medium text-[#5c5749]" href="/">
          <ArrowLeft size={18} /> Back to park
        </Link>

        {project.details ? (
          <>
            <header className="grid gap-10 py-8 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:py-14">
              <div className="grid min-h-[360px] content-between gap-8">
                <div className="grid gap-8">
                  <h1
                    className={`max-w-3xl leading-tight ${
                      isCommunityGardens
                        ? "text-[48px] font-black text-[#75A723] md:text-[64px]"
                        : "text-4xl font-medium md:text-6xl"
                    }`}
                  >
                    {project.title} Forres
                  </h1>
                  <div
                    className={`grid gap-5 ${
                      isCommunityGardens
                        ? "text-[28px] font-normal leading-normal text-black"
                        : "text-xl leading-relaxed text-[#202018]"
                    }`}
                  >
                    <p>{project.details.workType}</p>
                    <p>{project.details.dateRange}</p>
                  </div>
                </div>

                {project.details.stakeholder ? (
                  <p
                    className={`max-w-xl italic ${
                      isCommunityGardens
                        ? "text-[28px] font-normal leading-normal text-black"
                        : "text-xl leading-relaxed text-[#202018]"
                    }`}
                  >
                    Stakeholders: {project.details.stakeholder.label}
                    <br />
                    <Link href={project.details.stakeholder.url}>
                      ({project.details.stakeholder.url})
                    </Link>
                  </p>
                ) : null}
              </div>

              <div
                className={`grid content-center gap-6 ${
                  isCommunityGardens
                    ? "text-[28px] font-normal leading-normal text-black"
                    : "text-xl leading-9 text-[#202018]"
                }`}
              >
                {project.details.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </header>

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
                    <p className="text-left text-[28px] font-normal leading-normal text-black">Map Front</p>
                    <Image
                      src="/projects/community-gardens/outputs/map-back.png"
                      alt="Community garden map back"
                      width={1684}
                      height={1190}
                      className="mt-8 h-auto w-full"
                    />
                    <div className="grid gap-2 pt-3 md:grid-cols-3">
                      <p className="text-left text-[28px] font-normal leading-normal text-black">Map Back</p>
                      <p className="text-left text-[28px] font-normal leading-normal text-black">
                        8-panel fold, pocket-sized when folded
                      </p>
                    </div>
                    <div className="grid gap-8 pb-10 pt-10 md:-mt-8 md:grid-cols-[1fr_auto] md:items-start">
                      <div className="grid gap-5">
                        <div className="grid gap-4 pt-12">
                          <h2 className="text-[40px] font-black leading-tight text-[#75A723]">Community Garden Map</h2>
                          <div className="grid gap-2">
                            <h3 className="text-[30px] font-black leading-tight text-black">A Map</h3>
                            <p className="max-w-5xl text-[28px] font-normal leading-normal text-black">
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
                        className="h-auto w-full justify-self-end md:w-[34vw] md:max-w-[760px] md:min-w-[560px]"
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
                          <h2 className="text-[40px] font-black uppercase leading-tight text-[#75A723]">
                            Street Signs
                          </h2>
                          <div className="grid max-w-3xl gap-6 text-[28px] font-normal leading-normal text-black">
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
                            <h2 className="text-[40px] font-black uppercase leading-tight text-[#75A723]">Seed Bags</h2>
                            <p className="max-w-2xl text-[28px] font-normal leading-normal text-black">
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
