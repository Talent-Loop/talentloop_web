
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import clientIllustration from "../assets/auth/login-illustration.png";
import providerIllustration from "../assets/auth/professional-illustration.png";

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleSelect = (role: "client" | "provider") => {
    if (role === "client") {
      navigate("/register");
    } else {
      navigate("/register/professional");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFBFC] font-sans text-[#111827]">
      <header className="relative z-50 h-[72px] w-full bg-[#173D57]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-16">
          <Link
            to="/"
            className="shrink-0 text-[20px] font-bold tracking-[-0.3px] text-white sm:text-[22px]"
          >
            TALENTLOOP
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/" className="text-[14px] font-medium text-white/90 transition hover:text-white">
              Home
            </Link>
            <Link to="/services" className="text-[14px] font-medium text-white/90 transition hover:text-white">
              Services
            </Link>
            <Link to="/how-it-works" className="text-[14px] font-medium text-white/90 transition hover:text-white">
              How it works
            </Link>
            <Link to="/become-a-professional" className="text-[14px] font-medium text-white/90 transition hover:text-white">
              Become a Professional
            </Link>
            <Link to="/about" className="text-[14px] font-medium text-white/90 transition hover:text-white">
              About Us
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex h-[40px] min-w-[82px] items-center justify-center rounded-lg border border-white/60 bg-transparent px-5 text-[14px] font-medium text-white transition hover:border-white hover:bg-white/5"
            >
              Log In
            </button>

            <button
              type="button"
              onClick={() => navigate("/role-selection")}
              className="flex h-[40px] min-w-[88px] items-center justify-center rounded-lg bg-white px-5 text-[14px] font-semibold text-[#173D57] transition hover:bg-[#F1F5F8]"
            >
              Register
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/30 text-white lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 top-full z-50 w-full border-t border-white/10 bg-[#173D57] px-4 pb-6 pt-4 shadow-lg sm:px-6 lg:hidden">
            <nav className="flex flex-col gap-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10">
                Home
              </Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10">
                Services
              </Link>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10">
                How it works
              </Link>
              <Link to="/become-a-professional" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10">
                Become a Professional
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10">
                About Us
              </Link>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="h-11 rounded-lg border border-white/50 bg-transparent text-sm font-medium text-white"
                >
                  Log In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/role-selection");
                  }}
                  className="h-11 rounded-lg bg-white text-sm font-semibold text-[#173D57]"
                >
                  Register
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex min-h-[calc(100vh-72px)] items-start justify-center px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-[115px]">
        <section className="flex w-full max-w-[500px] flex-col items-center">
          <h1 className="max-w-full text-center text-[24px] font-bold leading-[1.3] tracking-[-0.4px] text-[#252525] sm:text-[30px]">
            How will you use SkillConnect?
          </h1>

          <p className="mt-3 max-w-[430px] text-center text-[14px] font-normal leading-[1.55] text-[#667085] sm:mt-4 sm:text-[16px]">
            Select how you intend to use the platform to
            <br className="hidden sm:block" />
            personalize your experience.
          </p>

          <div className="mt-8 flex w-full flex-col gap-4 sm:mt-[38px]">
            {/* CLIENT */}
            <button
              type="button"
              onClick={() => handleRoleSelect("client")}
              className="group flex min-h-[94px] w-full items-center rounded-[13px] border border-[#E2E5E9] bg-white px-4 py-4 text-left shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition duration-200 hover:border-[#173D57]/40 hover:bg-[#FCFDFE] hover:shadow-[0_5px_14px_rgba(16,24,40,0.08)] focus:outline-none focus:ring-2 focus:ring-[#173D57]/20 sm:px-6 sm:py-0"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                <img
                  src={clientIllustration}
                  alt="Client illustration"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="ml-4 min-w-0">
                <h2 className="text-[17px] font-semibold leading-6 text-[#252525] sm:text-[18px]">
                  Client
                </h2>
                <p className="mt-1 text-[13px] font-normal leading-5 text-[#667085] sm:text-[15px]">
                  I need to hire a skilled worker
                </p>
              </div>
            </button>

            {/* SERVICE PROVIDER */}
            <button
              type="button"
              onClick={() => handleRoleSelect("provider")}
              className="group flex min-h-[94px] w-full items-center rounded-[13px] border border-[#E2E5E9] bg-white px-4 py-4 text-left shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition duration-200 hover:border-[#173D57]/40 hover:bg-[#FCFDFE] hover:shadow-[0_5px_14px_rgba(16,24,40,0.08)] focus:outline-none focus:ring-2 focus:ring-[#173D57]/20 sm:px-6 sm:py-0"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                <img
                  src={providerIllustration}
                  alt="Service provider illustration"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="ml-4 min-w-0">
                <h2 className="text-[17px] font-semibold leading-6 text-[#252525] sm:text-[18px]">
                  Service Provider
                </h2>
                <p className="mt-1 text-[13px] font-normal leading-5 text-[#667085] sm:text-[15px]">
                  I want to find jobs and earn
                </p>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
