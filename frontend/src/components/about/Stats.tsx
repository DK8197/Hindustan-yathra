const stats = [
  {
    number: "500+",
    title: "Happy Travelers",
  },
  {
    number: "40+",
    title: "Destinations",
  },
  {
    number: "98%",
    title: "Customer Satisfaction",
  },
  {
    number: "24×7",
    title: "Support",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-6 lg:grid-cols-4">

        {stats.map((item) => (
          <div key={item.title} className="text-center">
            <h2 className="text-5xl font-bold text-orange-400">
              {item.number}
            </h2>

            <p className="mt-4 text-gray-300">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}