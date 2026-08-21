import { ArrowLeft, LockKeyhole, MessageSquare, ShieldCheck } from "lucide-react";
import professionalIllustration from "../../assets/auth/professional-illustration.png";
import { Link } from "react-router-dom";

export default function RegisterProfessionalLeftPanel() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#F1F4F6] px-8 py-8 lg:px-12">
      {/* Back button */}
      <Link
        to="/"
        className="absolute left-8 top-8 z-10 flex items-center justify-center text-black transition hover:opacity-60 lg:left-10"
      >
        <ArrowLeft size={42} strokeWidth={2.5} />
      </Link>

      {/* Content */}
      <div className="mx-auto flex h-full max-w-[620px] flex-col pt-24">
        {/* Heading */}
        <div className="ml-auto mr-auto w-full max-w-[390px]">
          <h1 className="text-center text-3xl font-bold text-black lg:text-[32px]">
            Create your account
          </h1>

          <p className="mt-3 text-center text-lg leading-6 text-[#252525]">
            Join thousands of clients and
            <br />
            professionals across Nigeria
          </p>
        </div>

        {/* Benefits */}
        <div className="mx-auto mt-10 w-full max-w-[390px] space-y-7">
          {/* Verified */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#173D57] text-white">
              <LockKeyhole size={23} />
            </div>

            <div>
              <h3 className="text-lg font-medium text-black">
                Verified Professionals
              </h3>

              <p className="mt-1 text-base leading-5 text-[#252525]">
                All professionals are verified
                <br />
                and background checked
              </p>
            </div>
          </div>

          {/* Competitive Bids */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#173D57] text-white">
              <MessageSquare size={23} />
            </div>

            <div>
              <h3 className="text-lg font-medium text-black">
                Competitive Bids
              </h3>

              <p className="mt-1 text-base leading-5 text-[#252525]">
                Receive multiple bids & choose
                <br />
                the best offer
              </p>
            </div>
          </div>

          {/* Secure */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#173D57] text-white">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3 className="text-lg font-medium text-black">
                Secure & Safe
              </h3>

              <p className="mt-1 text-base leading-5 text-[#252525]">
                Your data and payments
                <br />
                are always protected
              </p>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-auto flex justify-center pt-8">
          <img
  src={professionalIllustration}
  alt="Professional artisan"
  className="max-h-[500px] w-auto object-contain"
/>
        </div>
      </div>
    </section>
  );
}