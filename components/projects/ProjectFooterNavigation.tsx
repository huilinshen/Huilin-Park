import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

const navigationItems = [
  {
    key: "generative-watch-face",
    title: "Huawei Generative Watch Face",
    href: "/projects/generative-watch-face",
  },
  {
    key: "internship-projects",
    title: "Internship Projects",
    href: "/projects/internship-projects",
  },
  {
    key: "community-gardens",
    title: "Community Garden Forres",
    href: "/projects/community-gardens",
  },
  {
    key: "about",
    title: "Meet Huilin",
    href: "/about",
  },
] as const;

type NavigationKey = (typeof navigationItems)[number]["key"];

export function ProjectFooterNavigation({
  current,
  tone = "light",
}: {
  current: NavigationKey;
  tone?: "light" | "dark";
}) {
  const currentIndex = navigationItems.findIndex((item) => item.key === current);
  const previous = navigationItems[(currentIndex - 1 + navigationItems.length) % navigationItems.length];
  const next = navigationItems[(currentIndex + 1) % navigationItems.length];
  const colorClass =
    tone === "dark"
      ? "text-white/50 hover:text-white focus-visible:text-white"
      : "text-black/50 hover:text-black focus-visible:text-black";
  const projectLinkClass = `relative z-10 inline-flex min-w-0 cursor-pointer items-center gap-1.5 py-3 text-[10px] font-black leading-tight pointer-events-auto transition-colors duration-200 sm:text-[12px] md:gap-3 md:text-[16px] lg:text-[22px] xl:text-[28px] ${colorClass}`;
  const getProjectLabelClass = (title: string) =>
    title === "Huawei Generative Watch Face"
      ? "max-w-[86px] whitespace-normal sm:max-w-[112px] md:max-w-[170px] xl:max-w-[250px]"
      : "whitespace-nowrap";

  return (
    <nav className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 md:gap-6">
      <Link
        href={previous.href}
        aria-label={`Previous project: ${previous.title}`}
        className={`${projectLinkClass} justify-self-start text-left`}
      >
        <ArrowLeft className="h-7 w-7 shrink-0 md:h-12 md:w-12" strokeWidth={1.8} />
        <span className={getProjectLabelClass(previous.title)}>{previous.title}</span>
      </Link>

      <Link
        href="/"
        aria-label="Back to Huilin Park"
        className={`relative z-10 inline-flex cursor-pointer items-center justify-self-center gap-3 py-3 text-[16px] font-black pointer-events-auto transition-colors duration-200 md:text-[18px] lg:text-[22px] xl:text-[28px] ${colorClass}`}
      >
        <Home className="h-7 w-7 md:h-12 md:w-12" strokeWidth={1.8} />
        <span className="hidden whitespace-nowrap lg:inline">
          Back to Huilin Park
        </span>
      </Link>

      <Link
        href={next.href}
        aria-label={`Next project: ${next.title}`}
        className={`${projectLinkClass} justify-self-end text-right`}
      >
        <span className={getProjectLabelClass(next.title)}>{next.title}</span>
        <ArrowRight className="h-7 w-7 shrink-0 md:h-12 md:w-12" strokeWidth={1.8} />
      </Link>
    </nav>
  );
}
