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

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#202018]">
      <article className="mx-auto grid max-w-6xl gap-12 px-5 py-8 md:px-8 md:py-12">
        <Link className="inline-flex w-fit items-center gap-2 font-medium text-[#5c5749]" href="/">
          <ArrowLeft size={18} /> Back to park
        </Link>

        {project.details ? (
          <>
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

            {project.slug === "community-gardens" ? <CalendarFlipbook /> : null}
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
