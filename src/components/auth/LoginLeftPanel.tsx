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
    <section className="relative flex flex-col justify-between bg-[#F3F7FB] px-14 py-10">
      {/* Back */}
      <Link
        to="/"
        className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-white"
      >
        <ArrowLeft className="h-8 w-8 text-[#17324D]" />
      </Link>

      <div className="mx-auto max-w-md">
        <h1 className="text-center text-5xl font-bold text-[#17324D]">
          {title}
        </h1>

        <p className="mt-5 text-center text-lg leading-8 text-[#5E6675]">
          {subtitle}
        </p>

        {/* Features */}
        <div className="mt-14 space-y-8">
          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#17324D] text-white">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[#17324D]">
                Verified Professionals
              </h3>

              <p className="mt-1 text-lg text-[#5E6675]">
                All professionals are verified and background checked
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#17324D] text-white">
              <MessageSquare size={24} />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[#17324D]">
                Competitive Bids
              </h3>

              <p className="mt-1 text-lg text-[#5E6675]">
                Receive multiple bids & choose the best offer
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#17324D] text-white">
              <BadgeCheck size={24} />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[#17324D]">
                Secure & Safe
              </h3>

              <p className="mt-1 text-lg text-[#5E6675]">
                Your data and payments are always protected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-12 flex justify-center">
        <img
          src={image}
          alt="Illustration"
          className="max-h-[520px] object-contain"
        />
      </div>
    </section>
  );
}