export const instant = false;
import Image from "next/image";

interface IDestination {
    _id: string;
    destinationName: string;
    country: string;
    category: string;
    price: number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
}

async function getDestinations(): Promise<IDestination[]> {
    const response = await fetch(
        "http://localhost:8000/all-destination",
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch destinations");
    }

    return response.json();
}

export default async function DestinationsPage() {
    const destinations = await getDestinations();

    return (
        <main className="min-h-screen bg-white px-5 py-12 text-gray-900 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-light tracking-tight md:text-5xl">
                    Explore All Destinations
                </h1>

                <p className="mt-3 text-sm text-gray-500 md:text-base">
                    Find your perfect travel experience from our curated collection
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-medium"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            defaultValue="all"
                            className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="all">All Categories</option>
                            {[...new Set(destinations.map((d) => d.category))].map(
                                (category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="mb-2 block text-sm font-medium"
                        >
                            Price Range
                        </label>

                        <select
                            id="price"
                            defaultValue="all"
                            className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="all">All Prices</option>
                            <option value="500">Under $500</option>
                            <option value="1000">$500 – $1000</option>
                            <option value="1001">Over $1000</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="sort"
                            className="mb-2 block text-sm font-medium"
                        >
                            Sort By
                        </label>

                        <select
                            id="sort"
                            defaultValue="featured"
                            className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="featured">Featured</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                    Showing {destinations.length} destinations
                </p>

                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination) => (
                        <article
                            key={destination._id}
                            className="overflow-hidden rounded-md border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="relative h-52 w-full overflow-hidden rounded-md bg-gray-100">
                                {destination.imageUrl ? (

                                    <Image
                                        src={destination.imageUrl}
                                        alt={destination.destinationName}
                                        className="h-full w-full object-cover" width={200} height={200}
                                        loading="lazy"
                                    />

                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                        No image available
                                    </div>
                                )}

                                <span className="absolute right-3 top-3 rounded-md bg-white px-3 py-1.5 text-xs font-semibold shadow">
                                    ★ 4.8
                                </span>
                            </div>

                            <div className="px-1 pb-1 pt-4">
                                <p className="text-sm text-gray-500">
                                    {destination.country}
                                </p>

                                <div className="mt-1 flex items-start justify-between gap-3">
                                    <h2 className="text-lg font-semibold">
                                        {destination.destinationName}
                                    </h2>

                                    <p className="shrink-0 text-base font-semibold">
                                        ${destination.price}
                                        <span className="text-xs font-normal text-gray-500">
                                            /Person
                                        </span>
                                    </p>
                                </div>

                                <p className="mt-2 text-sm text-gray-500">
                                    {destination.duration}
                                </p>

                                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                    {destination.description}
                                </p>

                                <a
                                    href={`/destinations/${destination._id}`}
                                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-cyan-600"
                                >
                                    Book Now <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {destinations.length === 0 && (
                    <p className="py-16 text-center text-gray-500">
                        No destinations found.
                    </p>
                )}
            </div>
        </main>
    );
}
