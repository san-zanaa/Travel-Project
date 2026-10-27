"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { cn } from "cn";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image:"/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image:"/images/person1.png",
  },
  {
    quote:
      '"The Kyoto Tour Was A Dream. Every Temple Visit And Tea Ceremony Was Arranged With Such Care. We Felt Like The Only Tourists In The City."',
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db9af6?auto=format&fit=crop&w=600&h=600&q=80",
  },
];

const VISIBLE = 2;

export function Testimonials() {
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(testimonials.length / VISIBLE) - 1;

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(maxPage, p + 1));
  const visible = testimonials.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading + controls */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <h2 className="font-serif text-5xl font-medium tracking-tight text-zinc-900 md:text-6xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-base text-zinc-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={page === 0}
              aria-label="Previous testimonials"
              className="flex size-14 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors enabled:hover:border-zinc-300 enabled:hover:text-zinc-600 disabled:opacity-50"
            >
              <ArrowLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={page === maxPage}
              aria-label="Next testimonials"
              className="flex size-14 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors enabled:hover:border-zinc-300 enabled:hover:text-zinc-700 disabled:opacity-50"
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {visible.map((t) => (
            <div
              key={t.name}
              className={cn(
                "grid grid-rows-1 gap-6 border border-zinc-100 bg-white p-7 shadow-sm sm:grid-cols-[1fr_200px]",
                // fade in on page change
                "transition-opacity duration-300",
              )}
            >
              <div className="flex flex-col">
                <blockquote className="font-serif text-xl leading-snug text-zinc-900 sm:text-2xl">
                  {t.quote}
                </blockquote>
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-2">
                    <ArrowUpRightIcon className="size-3.5 rotate-45 text-zinc-400" />
                    <span className="text-lg text-[#0e7a8a]">{t.name}</span>
                  </div>
                  <p className="pl-6 text-sm text-zinc-500">{t.location}</p>
                </div>
              </div>
              <Image
                src={t.image}
                alt={`Portrait of ${t.name}`}
                width={200}
                height={220}
                className="h-56 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
