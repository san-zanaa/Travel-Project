import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "cn";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[640px] flex-col justify-center">
      <Image
        src="/images/Banner.png"
        alt="Coastal bay with turquoise water seen from above"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/15" />

      <div className="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center text-white">
        <h1 className="font-serif text-6xl leading-tight font-medium tracking-tight md:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#explore"
            className="inline-flex h-14 items-center gap-3 bg-[#00a5bd] px-8 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#0091a6]"
          >
            Explore Now
            <ArrowRightIcon className="size-4" />
          </a>
          <a
            href="#destinations"
            className="inline-flex h-14 items-center border border-white/60 bg-white/20 px-8 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </a>
        </div>
      </div>

      <form className="relative mt-auto flex flex-col border-t border-white/40 bg-black/20 backdrop-blur-sm sm:flex-row sm:items-stretch">
        {searchFields.map((field, i) => (
          <button
            type="button"
            key={field.label}
            className={cn(
              "flex flex-1 flex-col items-start gap-0.5 px-6 py-4 text-left text-white transition-colors hover:bg-white/10 cursor-pointer",
              i > 0 && "border-t border-white/30 sm:border-t-0 sm:border-l",
            )}
          >
            <span className="text-lg font-semibold">{field.label}</span>
            <span className="text-sm text-white/80">{field.value}</span>
          </button>
        ))}
        <button
          type="submit"
          className="bg-[#00a5bd] px-12 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#0091a6] cursor-pointer"
        >
          Search
        </button>
      </form>
    </section>
  );
}
