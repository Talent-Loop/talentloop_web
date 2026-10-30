
import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <header className="min-h-[90px] bg-[#17324D] sm:h-[118px]">
      <div className="mx-auto flex min-h-[90px] h-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-[118px] sm:px-8 lg:px-12">
        <Link
          to="/"
          className="shrink-0 text-lg font-bold tracking-wide text-white sm:text-[28px]"
        >
          TALENTLOOP
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-6">
          <p className="whitespace-nowrap text-xs font-medium text-white sm:text-xl">
            Don't have an account?
          </p>

          <Link
            to="/register/professional"
            className="shrink-0 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-[#17324D] transition hover:bg-gray-100 sm:rounded-2xl sm:px-10 sm:py-5 sm:text-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
