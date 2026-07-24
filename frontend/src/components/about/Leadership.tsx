import Image from "next/image";

const leaders = [
  {
    name: "Mr. Vilaskumar Desai",
    role: "CEO & Founder",
    image: "/textures/founder.jpeg",
    description:
      "Founder of Hindustan Yatra with a vision to make exploring India easy, affordable, and memorable through technology-driven travel experiences and exceptional customer service.",
  },
  {
    name: "Mrs. Arpita Vilaskumar Desai",
    role: "Managing Director",
    image: "/textures/co-founder.jpeg",
    description:
      "Passionate about building customer-first travel experiences while driving innovation, strategic partnerships, and sustainable growth across India's tourism ecosystem.",
  },
];

export default function Leadership() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Leadership Team
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Visionary leaders committed to creating memorable travel
            experiences across India with innovation, trust, and excellence.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-orange-200 blur-xl opacity-40 group-hover:opacity-70 transition" />

                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={180}
                    height={180}
                    className="relative rounded-full border-4 border-white object-cover shadow-xl"
                  />
                </div>

                <h3 className="mt-7 text-3xl font-bold text-gray-900">
                  {leader.name}
                </h3>

                <p className="mt-2 font-semibold tracking-wide text-orange-500 uppercase">
                  {leader.role}
                </p>

                <div className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />

                <p className="text-center leading-8 text-gray-600">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}