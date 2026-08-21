import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <header className="h-[118px] bg-[#17324D]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-8 lg:px-12">
        <Link
          to="/"
          className="text-[28px] font-bold tracking-wide text-white"
        >
          TALENTLOOP
        </Link>

        <div className="flex items-center gap-6">
          <p className="text-xl font-medium text-white">
            Don't have an account?
          </p>

          <Link
            to="/register/professional"
            className="rounded-2xl bg-white px-10 py-5 text-lg font-semibold text-[#17324D] transition hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}