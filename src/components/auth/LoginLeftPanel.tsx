import {
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

interface LoginLeftPanelProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function LoginLeftPanel({
  title,
  subtitle,
  image,
}: LoginLeftPanelProps) {
  return (
    <section className="relative flex flex-col bg-[#F3F7FB] px-5 py-6 sm:px-8 sm:py-8 lg:justify-between lg:px-10 lg:py-10 xl:px-14">
      {/* Back */}
      <Link
        to="/"
        aria-label="Back to home"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white sm:h-12 sm:w-12"
      >
        <ArrowLeft className="h-6 w-6 text-[#17324D] sm:h-8 sm:w-8" />
      </Link>

      <div className="mx-auto mt-8 w-full max-w-md lg:mt-0">
        <h1 className="text-center text-3xl font-bold text-[#17324D] sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-[#5E6675] sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
          {subtitle}
        </p>

        {/* Features */}
        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 lg:mt-14 lg:space-y-8">
          <div className="flex items-start gap-3 sm:gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17324D] text-white sm:h-14 sm:w-14">
              <ShieldCheck size={22} />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#17324D] sm:text-xl lg:text-2xl">
                Verified Professionals
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#5E6675] sm:text-base lg:text-lg">
                All professionals are verified and background checked
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17324D] text-white sm:h-14 sm:w-14">
              <MessageSquare size={22} />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#17324D] sm:text-xl lg:text-2xl">
                Competitive Bids
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#5E6675] sm:text-base lg:text-lg">
                Receive multiple bids & choose the best offer
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17324D] text-white sm:h-14 sm:w-14">
              <BadgeCheck size={22} />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#17324D] sm:text-xl lg:text-2xl">
                Secure & Safe
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#5E6675] sm:text-base lg:text-lg">
                Your data and payments are always protected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-8 flex justify-center lg:mt-12">
        <img
          src={image}
          alt="Illustration"
          className="h-auto max-h-[280px] w-full max-w-[360px] object-contain sm:max-h-[360px] lg:max-h-[520px] lg:max-w-full"
        />
      </div>
    </section>
  );
}