import Image from "next/image";
import Link from "next/link";

interface IDestination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  currency?: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  overview?: string;
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
  includedServices?: string[];
  cancellationPolicy?: string;
  travelInsurance?: string;
  customerSupport?: string;
}

async function getDestination(id: string): Promise<IDestination> {
  const response = await fetch(
    `http://localhost:8000/all-destination/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch destination");
  }

  return response.json();
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  const date = destination.departureDate
    ? new Date(destination.departureDate + "T00:00:00")
    : null;

  const formattedDate =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "Date not available";

  const highlights = destination.highlights ?? [];
  const currency = destination.currency ?? "USD";
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(destination.price);

  return (
    <main className="min-h-screen bg-white px-5 py-8 text-gray-900 sm:px-8 lg:px-11">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <span aria-hidden="true">←</span>
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/destinations/${destination._id}/edit`}
              className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 text-xs font-medium transition hover:bg-gray-50"
            >
              <span aria-hidden="true">✎</span>
              Edit
            </Link>

            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 border border-red-300 px-4 py-2 text-xs text-red-500 transition hover:bg-red-50"
            >
              <span aria-hidden="true">♜</span>
              Cancel
            </Link>
          </div>
        </div>

        
        <div className="relative mb-6 h-56 w-full overflow-hidden sm:h-72 lg:h-[308px]">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        <div className="border-t border-gray-100 pt-6 lg:pt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-10">
            
            <section className="min-w-0">
              <p className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                <span aria-hidden="true">♧</span>
                {destination.country}
              </p>

              <h1 className="mb-3 font-serif text-3xl tracking-tight sm:text-5xl">
                {destination.destinationName}
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-md">
                <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                  <span className="text-green-600">★</span>
                  {destination.rating?.toFixed(1) ?? "New"}
                </span>

                <span className="text-gray-500">
                  ({destination.reviewCount ?? 0} reviews)
                </span>

                <span className="text-gray-300">|</span>

                <span className="flex items-center gap-1.5 text-gray-900">
                  <span aria-hidden="true">▦</span>
                  {destination.duration}
                </span>
              </div>

              
              <section className="mb-6">
                <h2 className="mb-2 font-serif text-xl font-semibold">Overview</h2>
                <p className="max-w-3xl text-md leading-6 text-gray-500">
                  {destination.overview || destination.description}
                </p>
              </section>

              
              <section className="mb-6">
                <h2 className="mb-2 font-serif text-xl font-semibold">Highlights</h2>
                <p className="mb-4 max-w-3xl text-md leading-6 text-gray-500">
                  {destination.description}
                </p>

                {highlights.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                    {highlights.map((highlight, index) => (
                      <li
                        key={`${highlight}-${index}`}
                        className="flex items-start gap-2 text-md leading-5 text-gray-600"
                      >
                        <span className="font-semibold text-green-600">
                          ✓
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-md text-gray-400">
                    Highlights will be available soon.
                  </p>
                )}
              </section>

              
              {destination.includedServices &&
                destination.includedServices.length > 0 && (
                  <section className="mt-8">
                    <h2 className="mb-3 font-serif text-xl font-semibold">
                      What&apos;s Included
                    </h2>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {destination.includedServices.map((service, index) => (
                        <li
                          key={`${service}-${index}`}
                          className="flex items-start gap-2 text-md text-gray-600"
                        >
                          <span className="text-green-600">✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
            </section>

            
            <aside className="h-fit border border-gray-100 bg-white p-3 shadow-md lg:sticky lg:top-6">
              <p className="text-[15px] text-gray-500">Starting from</p>

              <p className="text-2xl font-semibold tracking-tight text-cyan-600">
                {price}
              </p>

              <p className="mb-5 text-[12px] text-gray-500">per person</p>

              <div className="border border-gray-100 bg-gray-50 px-3 py-2.5 text-md text-gray-700">
                {formattedDate}
              </div>

              <div className="my-3 border-t border-gray-100" />

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 bg-cyan-600 px-4 py-3 text-xs font-medium text-white transition hover:bg-cyan-700"
              >
                Book Now <span aria-hidden="true">→</span>
              </button>

              <ul className="mt-5 space-y-4">
                {[
                  destination.cancellationPolicy ??
                    "Contact us for cancellation details",
                  destination.travelInsurance ??
                    "Travel insurance details available on request",
                  destination.customerSupport ??
                    "Customer support available",
                ].map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-start gap-2 text-[14px] leading-4 text-gray-500"
                  >
                    <span className="font-semibold text-green-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
