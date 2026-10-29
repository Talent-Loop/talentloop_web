import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#16344E]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 xl:px-16">
        {/* Logo */}
        <div className="flex h-12 items-center justify-center sm:h-20">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold tracking-wide text-white sm:text-2xl lg:text-[34px]"
          >
            TALENTLOOP
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 xl:flex xl:gap-8">
          <Link to="/" className="whitespace-nowrap text-sm font-medium text-white hover:text-[#CFE7FF]">
            Home
          </Link>
          <a href="/#services" className="whitespace-nowrap text-sm font-medium text-white hover:text-[#CFE7FF]">
            Services
          </a>
          <a href="/#how-it-works" className="whitespace-nowrap text-sm font-medium text-white hover:text-[#CFE7FF]">
            How it works
          </a>
          <Link to="/register/professional" className="whitespace-nowrap text-sm font-medium text-white hover:text-[#CFE7FF]">
            Become a Professional
          </Link>
          <a href="/#about" className="whitespace-nowrap text-sm font-medium text-white hover:text-[#CFE7FF]">
            About Us
          </a>
        </nav>

        {/* Login and Register */}
        <div className="flex h-12 w-full items-center justify-center gap-3 sm:hidden">
          <Link
            to="/login"
            className="flex min-h-9 min-w-[100px] items-center justify-center rounded-lg border border-white px-4 text-sm font-semibold text-white"
          >
            Log In
          </Link>

          <Link
            to="/role-selection"
            className="flex min-h-9 min-w-[100px] items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-[#16344E]"
          >
            Register
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white hover:bg-white/10"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop buttons */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex lg:gap-4">
          <Link
            to="/login"
            className="whitespace-nowrap rounded-xl border border-white px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#16344E] lg:px-7 lg:py-3"
          >
            Log In
          </Link>
          <Link
            to="/role-selection"
            className="whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#16344E] transition hover:bg-slate-100 lg:px-7 lg:py-3"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#16344E] px-4 pb-4 pt-2 shadow-lg sm:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-white hover:bg-white/10">
              Home
            </Link>
            <a href="/#services" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-white hover:bg-white/10">
              Services
            </a>
            <a href="/#how-it-works" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-white hover:bg-white/10">
              How it works
            </a>
            <Link to="/register/professional" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-white hover:bg-white/10">
              Become a Professional
            </Link>
            <a href="/#about" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-white hover:bg-white/10">
              About Us
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}