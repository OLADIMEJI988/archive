"use client";
import { useState } from "react";
export type Collection = { title: string; description: string; image: string };
// Default: image + title + plus. Overlay and description animate in on hover (or keyboard focus). No click handling.
export function CollectionCard({ title, description, image }: Collection) {
  return (
    <article
      tabIndex={0}
      aria-label={`${title}. ${description}`}
      data-collection={title.toLowerCase()}
      className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink-850"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`${title} collection`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-ink-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="flex items-center justify-between text-[18px] font-medium uppercase leading-[18px] tracking-display">
          {title}
          <span className="relative h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
            <i className="absolute left-[9.5px] top-0 h-5 w-px bg-white transition-transform duration-300 ease-in-out group-hover:scale-y-0 group-focus-visible:scale-y-0" />
            <i className="absolute left-0 top-[9.5px] h-px w-5 bg-white" />
          </span>
        </span>
        <span className="max-w-[28ch] translate-y-2 text-[16px] leading-[19px] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {description}
        </span>
      </span>
    </article>
  );
}
