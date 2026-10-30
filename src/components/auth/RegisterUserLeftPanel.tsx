import {
  ArrowLeft,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import clientIllustration from "../../assets/auth/login-illustration.png";

export default function RegisterUserLeftPanel() {
  return (
    <section className="relative flex min-h-[auto] flex-col overflow-hidden bg-[#F1F4F6] px-5 py-8 sm:px-8 lg:min-h-[calc(100vh-80px)] lg:px-12">
      {/* Back button */}
      <Link
        to="/"
        className="absolute left-5 top-6 z-10 flex items-center justify-center text-black transition hover:opacity-60 sm:left-8 lg:left-10 lg:top-8"
      >
        <ArrowLeft size={32} strokeWidth={2.5} className="lg:h-[42px] lg:w-[42px]" />
      </Link>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[620px] flex-1 flex-col pt-16 sm:pt-20 lg:pt-24">
        {/* Heading */}
        <div className="mx-auto w-full max-w-[390px]">
          <h1 className="text-center text-2xl font-bold text-black sm:text-3xl lg:text-[32px]">
            Create your account
          </h1>

          <p className="mt-3 text-center text-base leading-6 text-[#252525] sm:text-lg">
            Join thousands of clients and
            <br />
            professionals across Nigeria
          </p>
        </div>

        {/* Benefits */}
        <div className="mx-auto mt-8 w-full max-w-[390px] space-y-6 sm:mt-10 sm:space-y-7">
          {/* Verified */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#173D57] text-white sm:h-12 sm:w-12">
              <LockKeyhole size={23} />
            </div>

            <div>
              <h3 className="text-base font-medium text-black sm:text-lg">
                Verified Professionals
              </h3>
              <p className="mt-1 text-sm leading-5 text-[#252525] sm:text-base">
                All professionals are verified
                <br />
                and background checked
              </p>
            </div>
          </div>

          {/* Competitive Bids */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#173D57] text-white sm:h-12 sm:w-12">
              <MessageSquare size={23} />
            </div>

            <div>
              <h3 className="text-base font-medium text-black sm:text-lg">
                Competitive Bids
              </h3>
              <p className="mt-1 text-sm leading-5 text-[#252525] sm:text-base">
                Receive multiple bids & choose
                <br />
                the best offer
              </p>
            </div>
          </div>

          {/* Secure */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#173D57] text-white sm:h-12 sm:w-12">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3 className="text-base font-medium text-black sm:text-lg">
                Secure & Safe
              </h3>
              <p className="mt-1 text-sm leading-5 text-[#252525] sm:text-base">
                Your data and payments
                <br />
                are always protected
              </p>
            </div>
          </div>
        </div>

        {/* Client illustration */}
        <div className="mt-8 flex justify-center pt-2 sm:mt-10 lg:mt-auto lg:pt-8">
          <img
            src={clientIllustration}
            alt="TalentLoop client illustration"
            className="h-auto max-h-[220px] w-full max-w-[280px] object-contain sm:max-h-[260px] sm:max-w-[340px] lg:max-h-[300px]"
          />
        </div>
      </div>
    </section>
  );
}