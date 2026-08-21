const stats = [
  {
    number: "10,000+",
    title: "Registered Professionals",
  },
  {
    number: "50,000+",
    title: "Jobs Completed",
  },
  {
    number: "4.8/5",
    title: "Average Rating",
  },
  {
    number: "36 States",
    title: "Coverage",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <h3 className="text-[38px] font-bold leading-none text-[#17324D]">
                {item.number}
              </h3>

              <p className="mt-3 text-[17px] font-medium leading-7 text-[#22324A]">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}