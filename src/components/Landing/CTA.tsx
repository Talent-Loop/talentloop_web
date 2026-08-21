export default function CTA() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-[44px] font-bold leading-tight text-[#17324D]">
          Ready to find the right professional?
        </h2>

        <p className="mt-6 text-[20px] text-[#667085]">
          Post a job today and receive competitive bids from trusted
          service providers near you.
        </p>

        <div className="mt-12 flex items-center justify-center gap-6">

          <button className="rounded-xl bg-[#17324D] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#20466E]">
            Post a Job
          </button>

          <button className="rounded-xl border-2 border-[#17324D] bg-white px-10 py-4 text-lg font-semibold text-[#17324D] transition hover:bg-slate-50">
            Become a Professional
          </button>

        </div>

      </div>
    </section>
  );
}