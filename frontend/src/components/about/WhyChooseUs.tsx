const features = [
  "Trusted Travel Experts",
  "Customized Packages",
  "Verified Hotels",
  "Affordable Pricing",
  "24×7 Customer Support",
  "Secure Booking",
  "Comfortable Transportation",
  "Transparent Pricing",
];

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">

        <h2 className="mb-14 text-center text-4xl font-bold">
          Why Choose Hindustan Yatra
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (
            <div
              key={item}
              className="rounded-2xl border p-8 shadow-sm transition hover:shadow-lg"
            >
              <h3 className="font-semibold text-xl">
                ✓ {item}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}