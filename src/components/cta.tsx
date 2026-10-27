import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden text-center">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1516216628859-52bc11b91853?auto=format&fit=crop&w=1900&q=80"
        alt="Aerial view of a seaplane over a tropical island"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />

      <div className="px-6 py-24 text-white">
        <h2 className="font-serif text-4xl font-medium tracking-tight md:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/85 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="#booking"
          className="mt-10 inline-flex h-14 items-center gap-3 bg-white px-8 text-sm font-semibold tracking-wide text-zinc-900 uppercase transition-colors hover:bg-zinc-100"
        >
          Book Your Trip Today
          <ArrowRightIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
