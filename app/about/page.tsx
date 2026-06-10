import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-8 text-[#202018] md:px-8 md:py-12">
      <section className="mx-auto grid max-w-5xl gap-10">
        <Link className="inline-flex w-fit items-center gap-2 font-medium text-[#5c5749]" href="/">
          <ArrowLeft size={18} /> Back to park
        </Link>

        <header className="grid gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#c8efcf] px-3 py-1 text-sm font-medium uppercase tracking-[0.16em]">
            <Sparkles size={14} /> About and contact
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
            Welcome to Huilin Park
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#5c5749]">
            A shared page for your bio, design approach, tools, resume, and contact links.
            The About booth and Contact booth in the 3D park both arrive here.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-[1fr_0.85fr]">
          <section className="rounded-lg border border-[#e3d6b5] bg-white p-6 shadow-[0_5px_0_#eadfca] md:p-7">
            <h2 className="text-2xl font-medium">About Me</h2>
            <p className="mt-4 leading-8 text-[#5c5749]">
              Add your short bio here: who you are as a UIUX designer, what kinds of
              digital products you enjoy making, and why this playful 3D portfolio world
              matches your design personality.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-[#5c5749]">
              <span className="rounded-full bg-[#fff3c7] px-3 py-1">UIUX</span>
              <span className="rounded-full bg-[#dff4ff] px-3 py-1">Figma</span>
              <span className="rounded-full bg-[#e7f8df] px-3 py-1">3D portfolio</span>
              <span className="rounded-full bg-[#ffe0e8] px-3 py-1">Product stories</span>
            </div>
          </section>

          <section
            id="contact"
            className="rounded-lg border border-[#e3d6b5] bg-[#202018] p-6 text-white shadow-[0_5px_0_#d7c99f] md:p-7"
          >
            <h2 className="text-2xl font-medium">Contact</h2>
            <p className="mt-4 leading-8 text-[#f3ead8]">
              Replace these with your real email, resume, LinkedIn, GitHub, or portfolio
              deck links when you are ready.
            </p>
            <div className="mt-6 grid gap-3">
              <Link className="inline-flex items-center gap-3 font-medium" href="mailto:hello@example.com">
                <Mail size={18} /> hello@example.com
              </Link>
              <Link className="inline-flex items-center gap-3 font-medium" href="/">
                <MapPin size={18} /> Huilin Park portfolio
              </Link>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
