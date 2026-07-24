import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Purnima Acharya",
    review:
      "Our 14-day Char Dham Yatra was perfectly organized. The team ensured a smooth, comfortable, and memorable journey throughout.",
  },
  {
    name: "Rahul Manerkar",
    review:
      "The entire journey was amazing. A truly memorable travel experience with excellent planning and execution.",
  },
  {
    name: "Sreedhar Arakali",
    review:
      "Excellent tour experience with detailed guidance, storytelling, and timely updates at every destination.",
  },
  {
    name: "GEETHA Krishnappa",
    review:
      "The Sri Lanka Ramayana Yatra was exceptionally well organized with comfortable stays, great food, and seamless execution.",
  },
  {
    name: "Shivakumar Chengti",
    review:
      "Wonderful Ramayana tour. Well planned, perfectly managed, and supported by a caring and professional team.",
  },
  {
    name: "Sunildutt Joshi",
    review:
      "Our Kashmir honeymoon trip was conducted smoothly exactly as planned. A wonderful experience from start to finish.",
  },
  {
    name: "Vidyarani Katigar",
    review:
      "Reliable and knowledgeable travel professionals. Our customized Dubai family trip exceeded expectations.",
  },
  {
    name: "Bhuvana K",
    review:
      "Highly responsible staff who treated us like family and supported us throughout the journey.",
  },
  {
    name: "Harsh Ghaligi",
    review:
      "From bookings to rituals, sightseeing, food, and accommodation, everything was handled beautifully.",
  },
  {
    name: "Dr. Ravindra Mujumdar",
    review:
      "Our Bhutan trip was exceptionally well managed. Every detail was thoughtfully planned and executed.",
  },
  {
    name: "Ravi Vibhuti",
    review:
      "Meticulously organized tour with personal attention and round-the-clock support. Thoroughly recommended.",
  },
  {
    name: "Ankita Hundekar",
    review:
      "A highly responsive and professional team with outstanding coordination and customer service.",
  },
];


export default function Reviews() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            ⭐ Rated 4.9/5 by 128+ Happy Travelers
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Loved by Thousands of Travelers
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Every journey is crafted with care, ensuring unforgettable
            experiences, exceptional service, and memories that last a lifetime.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((item) => (
            <div
              key={item.name}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-orange-200 transition group-hover:text-orange-500" />

              <div className="mt-4 flex text-xl text-orange-500">
                ★★★★★
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Verified Traveler
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Join thousands of satisfied travelers who trust{" "}
            <span className="font-semibold text-orange-500">
              Hindustan Yatra
            </span>{" "}
            for unforgettable journeys.
          </p>
        </div>
      </div>
    </section>
  );
}