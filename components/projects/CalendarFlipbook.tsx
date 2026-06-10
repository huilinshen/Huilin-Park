"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

function buildCalendarPages() {
  const pages = [
    ["Cover", "Cover"],
    ["Jan", "January"],
    ["Feb", "February"],
    ["Mar", "March"],
    ["Apr", "April"],
    ["May", "May"],
    ["Jun", "June"],
    ["Jul", "July"],
    ["Aug", "August"],
    ["Sep", "September"],
    ["Oct", "October"],
    ["Nov", "November"],
    ["Dec", "December"],
  ];

  return pages.map(([fileName, label]) => ({
    id: fileName,
    label,
    frontSrc: `/projects/community-gardens/calendar/${fileName}-1.png`,
    backSrc: `/projects/community-gardens/calendar/${fileName}-2.png`,
  }));
}

export function CalendarFlipbook() {
  const pages = useMemo(() => buildCalendarPages(), []);
  const [pageIndex, setPageIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const currentPage = pages[pageIndex];
  const outgoingPage = outgoingIndex === null ? null : pages[outgoingIndex];

  const goToNextPage = () => {
    if (isFlipping) {
      return;
    }

    setOutgoingIndex(pageIndex);
    setPageIndex((index) => (index + 1) % pages.length);
    window.requestAnimationFrame(() => {
      setIsFlipping(true);
      window.setTimeout(() => {
        setOutgoingIndex(null);
        setIsFlipping(false);
      }, 980);
    });
  };

  const resetCalendar = () => {
    setOutgoingIndex(null);
    setIsFlipping(false);
    setPageIndex(0);
  };

  return (
    <section className="calendar-section" aria-labelledby="calendar-title">
      <div className="calendar-copy">
        <h2 id="calendar-title">Gardening Calendar</h2>
        <p>
          Calendars related to the Forres community garden.
        </p>
        <p>
          On the first Saturday of March, June, September and December, a gardening
          market will take place in the Grant Park in Forres. The calendar is one
          of the ways to publicise the event.
        </p>
      </div>

      <div className="calendar-stage">
        <button
          className="calendar-flipbook"
          type="button"
          onClick={goToNextPage}
          aria-label="Flip to the next calendar page"
        >
          <div className="calendar-sheet">
            <CalendarPageImage
              alt={`${currentPage.label} calendar front`}
              priority={pageIndex === 0}
              src={currentPage.frontSrc}
            />
          </div>

          {outgoingPage ? (
            <div className={`calendar-flipping-page${isFlipping ? " is-flipping" : ""}`}>
              <div className="calendar-face calendar-face-front">
                <CalendarPageImage
                  alt={`${outgoingPage.label} calendar front`}
                  src={outgoingPage.frontSrc}
                />
              </div>
              <div className="calendar-face calendar-face-back">
                <CalendarPageImage
                  alt={`${outgoingPage.label} calendar back`}
                  src={outgoingPage.backSrc}
                />
              </div>
            </div>
          ) : null}
        </button>

        <div className="calendar-controls">
          <span>
            Slide {pageIndex + 1} / {pages.length}
          </span>
          <button type="button" onClick={resetCalendar}>
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>
    </section>
  );
}

function CalendarPageImage({
  alt,
  priority = false,
  src,
}: {
  alt: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className="calendar-placeholder">
      <div className="calendar-image-wrap">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 960px) 520px, 90vw"
          className="calendar-image"
          priority={priority}
        />
      </div>
    </div>
  );
}
