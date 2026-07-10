"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

const photoBoothPhotos = [
  {
    id: "photo-01",
    src: "/about/photo-01.jpg",
    caption: "Hiking, camping, and weekends outdoors.",
    objectPosition: "50% 58%",
  },
  {
    id: "photo-02",
    src: "/about/photo-02.jpg",
    caption: "Monthly book club with friends.",
    objectPosition: "48% 66%",
  },
  {
    id: "photo-03",
    src: "/about/photo-03.jpg",
    caption: "Finding inspiration in art and everyday life.",
    objectPosition: "55% 30%",
  },
  {
    id: "photo-04",
    src: "/about/photo-04.jpg",
    caption: "Huawei's Best Contribution Individual Award.",
    objectPosition: "50% 56%",
  },
];

const rotations = ["-3.5deg", "2.5deg", "-1.2deg", "3.2deg"];

const hintCopy = {
  initial: "Take a picture",
  first: "Nice one!",
  second: "Take another",
  third: "Almost there",
  restart: "Start over",
};

export function PhotoBoothCamera() {
  const [printedCount, setPrintedCount] = useState(0);
  const [printCycle, setPrintCycle] = useState(0);
  const [hintText, setHintText] = useState(hintCopy.initial);
  const allPrinted = printedCount >= photoBoothPhotos.length;

  const printPhoto = () => {
    if (allPrinted) {
      setPrintCycle((cycle) => cycle + 1);
      setPrintedCount(1);
      setHintText(hintCopy.first);
      return;
    }

    const nextCount = printedCount + 1;
    setPrintedCount(nextCount);

    if (nextCount === 1) setHintText(hintCopy.first);
    if (nextCount === 2) setHintText(hintCopy.second);
    if (nextCount === 3) setHintText(hintCopy.third);
    if (nextCount === 4) setHintText(hintCopy.restart);
  };

  return (
    <div
      className={`photo-booth-stage${printedCount > 0 ? " has-printed-photos" : ""}`}
      style={{ "--printed-count": printedCount } as CSSProperties}
    >
      <button className="photo-booth-hint" type="button" onClick={printPhoto}>
        <span className="hint-bursts hint-bursts-left" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span key={hintText} className="photo-booth-hint-text">
          {hintText}
        </span>
        <span className="hint-bursts hint-bursts-right" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="printed-photo-stack" aria-live="polite">
        {photoBoothPhotos.slice(0, printedCount).map((photo, index) => (
          <article
            className="printed-polaroid"
            key={`${printCycle}-${photo.id}`}
            style={
              {
                "--photo-rotation": rotations[index],
                "--photo-index": index,
                "--photo-z": index + 1,
              } as CSSProperties
            }
          >
            <div className="polaroid-image-slot">
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(max-width: 640px) 72vw, 26rem"
                style={{ objectPosition: photo.objectPosition }}
              />
            </div>
            <p>
              <span>{photo.caption}</span>
            </p>
          </article>
        ))}
      </div>

      <button
        className="polaroid-camera-button"
        type="button"
        onClick={printPhoto}
        aria-label={allPrinted ? "Print photos again" : "Print a photo"}
      >
        <span className="polaroid-camera" aria-hidden="true">
          <span className="camera-top">
            <span className="camera-viewfinder" />
            <span className="camera-flash" />
            <span className="camera-shutter" />
          </span>
          <span className="camera-face">
            <span className="camera-counter">2000</span>
            <span className="camera-lens">
              <span />
            </span>
            <span className="camera-small-lens" />
            <span className="camera-stripes">
              <span />
              <span />
              <span />
            </span>
          </span>
          <span className="camera-printer-slot" />
        </span>
      </button>
    </div>
  );
}
