import { ShieldCheckIcon, MapIcon, HeadsetIcon } from "lucide-react";

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function Features() {
  return (
    <section id="destinations" className="bg-sky-100/70 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-5xl font-medium tracking-tight text-zinc-900 md:text-6xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-base text-zinc-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white px-7 py-10 shadow-sm transition-shadow hover:shadow-lg border hover:border-[#66ebff]"
            >
              <feature.icon className="size-10 text-[#00a5bd]" strokeWidth={1.75} />
              <h3 className="mt-6 font-serif text-2xl text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
