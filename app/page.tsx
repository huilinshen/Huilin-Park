import { ArrowRight, Compass, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { ParkCanvas } from "@/components/park/ParkCanvas";
import { projects } from "@/data/projects";

export default function Home() {
  const firstProject = projects[0];

  return (
    <main className="min-h-screen bg-[#f8f4e8] text-[#202018]">
      <section className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <header className="z-10 flex items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3 font-medium">
            <span className="grid size-9 place-items-center rounded-full bg-[#ffcf5a] text-[#202018] shadow-[0_3px_0_#c89124]">
              <Sparkles size={18} />
            </span>
            Huilin Park
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link className="nav-link" href={firstProject.href}>
              Projects
            </Link>
            <Link className="nav-link" href="/about">
              About
            </Link>
          </nav>
        </header>

        <div className="relative min-h-[620px] overflow-hidden">
          <ParkCanvas />
          <div className="pointer-events-none absolute left-5 top-6 max-w-sm md:left-8 md:top-10">
            <p className="mb-3 w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#5d6f3b] shadow-sm">
              Playable UIUX portfolio
            </p>
            <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
              Huilin Park grows with every design story.
            </h1>
            <p className="mt-4 max-w-xs text-base leading-7 text-[#535044] md:text-lg">
              Click a ride to open a case study. Add your Figma exports and
              swap each ride with a Blender GLB model when it is ready.
            </p>
          </div>

          <aside className="absolute bottom-5 right-5 z-10 grid w-[min(330px,calc(100%-2.5rem))] gap-2 rounded-lg border border-[#ded2b3] bg-[#fffaf0]/92 p-3 shadow-[0_6px_0_#d7c99f] md:bottom-8 md:right-8">
            <p className="px-1 text-xs font-medium uppercase tracking-[0.16em] text-[#7a6b40]">
              Park map
            </p>
            {projects.map((project) => (
              <Link
                key={project.slug}
                className="group grid grid-cols-[1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition hover:bg-white"
                href={project.href}
              >
                <span>
                  <span className="block text-[#202018]">{project.title}</span>
                  <span className="block text-xs font-normal text-[#6d6758]">
                    {project.tags.slice(0, 2).join(" / ")}
                  </span>
                </span>
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </aside>
        </div>

        <footer className="z-10 grid gap-3 border-t border-[#ded2b3] bg-[#fffaf0]/90 px-5 py-4 text-sm md:grid-cols-[1fr_auto] md:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[#5c5749]">
            <span className="inline-flex items-center gap-2">
              <Compass size={16} /> Drag to orbit
            </span>
            <span>Scroll to zoom</span>
            <span>Click booths to explore</span>
          </div>
          <Link className="inline-flex items-center gap-2 font-medium" href="/about">
            <UserRound size={16} /> About Me
          </Link>
        </footer>
      </section>
    </main>
  );
}
