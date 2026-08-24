import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#16344E]">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-16">

        {/* Logo */}
        <Link
          to="/"
          className="text-[34px] font-bold tracking-wide text-white"
        >
          TALENTLOOP
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-12 lg:flex">
          <Link
            to="/"
            className="text-[15px] font-medium text-white transition hover:text-[#CFE7FF]"
          >
            Home
          </Link>

          <a
            href="#services"
            className="text-[15px] font-medium text-white transition hover:text-[#CFE7FF]"
          >
            Services
          </a>

          <a
            href="#how-it-works"
            className="text-[15px] font-medium text-white transition hover:text-[#CFE7FF]"
          >
            How it works
          </a>

          {/* Professional Signup */}
          <Link
            to="/register/professional"
            className="text-[15px] font-medium text-white transition hover:text-[#CFE7FF]"
          >
            Become a Professional
          </Link>

          <a
            href="#about"
            className="text-[15px] font-medium text-white transition hover:text-[#CFE7FF]"
          >
            About Us
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Login */}
          <Link
            to="/login"
            className="rounded-xl border border-white px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#16344E]"
          >
            Log In
          </Link>

          {/* Client Signup */}
          <Link
            to="/register"
            className="rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#16344E] transition hover:bg-slate-100"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}