import PostJobImg from "../../assets/how-it-works/post-job.png";
import ReceiveBidsImg from "../../assets/how-it-works/receive-bids.png";
import HireRelaxImg from "../../assets/how-it-works/hire-relax.png";

const steps = [
  {
    number: "1.",
    title: "Post a job",
    description: "Tell us what you need done in a few simple steps.",
    image: PostJobImg,
  },
  {
    number: "2.",
    title: "Receive bids",
    description:
      "Verified professionals send you their best offers.",
    image: ReceiveBidsImg,
  },
  {
    number: "3.",
    title: "Hire & relax",
    description:
      "Choose the best offer and get your job done.",
    image: HireRelaxImg,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-[34px] font-bold text-[#17324D]">
            How it Works
          </h2>

          <p className="mt-3 text-lg text-[#6B7280]">
            Simple stage to get your job done
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <img
                src={step.image}
                alt={step.title}
                className="mx-auto h-[240px] object-contain"
              />

              <h3 className="mt-6 text-[32px] font-bold text-[#17324D]">
                <span className="mr-2">{step.number}</span>
                {step.title}
              </h3>

              <p className="mx-auto mt-4 max-w-[280px] text-lg leading-8 text-[#6B7280]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}