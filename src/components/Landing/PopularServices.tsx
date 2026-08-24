import {
  Wrench,
  Paintbrush,
  Hammer,
  AirVent,
  Zap,
  Scissors,
} from "lucide-react";

const services = [
  {
    name: "Plumbing",
    icon: Wrench,
  },
  {
    name: "Painting",
    icon: Paintbrush,
  },
  {
    name: "Carpentry",
    icon: Hammer,
  },
  {
    name: "AC Repair",
    icon: AirVent,
  },
  {
    name: "Electrical",
    icon: Zap,
  },
  {
    name: "Tailoring",
    icon: Scissors,
  },
];

export default function PopularServices() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-[30px] font-bold text-[#17324D]">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.name}
                className="rounded-[24px] border border-[#E7EDF3] bg-white px-6 py-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D]">
                  <Icon size={22} strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-center text-[15px] font-medium text-[#17324D]">
                  {service.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}