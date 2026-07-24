import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-slate-900 py-24 text-white">

      <div className="container mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Explore India?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          Let Hindustan Yatra create your next unforgettable journey.
        </p>

        <Link
          href="/destinations"
          className="mt-10 inline-flex rounded-full bg-orange-500 px-10 py-4 font-semibold hover:bg-orange-600"
        >
          Browse Tour Packages
        </Link>

      </div>

    </section>
  );
}