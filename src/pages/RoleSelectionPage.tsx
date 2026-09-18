
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, Wrench, Menu, X } from "lucide-react";

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
    <div className="min-h-screen bg-[#FAFBFC] font-sans text-[#111827]">
      <header className="h-[72px] w-full bg-[#173D57]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-12 xl:px-16">
          <Link
            to="/"
            className="shrink-0 text-[22px] font-bold tracking-[-0.3px] text-white"
          >
            TALENTLOOP
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              to="/"
              className="text-[14px] font-medium text-white/90 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="text-[14px] font-medium text-white/90 transition hover:text-white"
            >
              Services
            </Link>

            <Link
              to="/how-it-works"
              className="text-[14px] font-medium text-white/90 transition hover:text-white"
            >
              How it works
            </Link>

            <Link
              to="/become-a-professional"
              className="text-[14px] font-medium text-white/90 transition hover:text-white"
            >
              Become a Professional
            </Link>

            <Link
              to="/about"
              className="text-[14px] font-medium text-white/90 transition hover:text-white"
            >
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="relative z-50 border-t border-white/10 bg-[#173D57] px-6 pb-6 pt-4 shadow-lg lg:hidden">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Home
              </Link>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Services
              </Link>

              <Link
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                How it works
              </Link>

              <Link
                to="/become-a-professional"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Become a Professional
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
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

      <main className="flex min-h-[calc(100vh-72px)] items-start justify-center px-5 pb-16 pt-[105px] sm:px-6 sm:pt-[115px]">
        <section className="flex w-full max-w-[500px] flex-col items-center">
          <h1 className="text-center text-[28px] font-bold leading-[1.25] tracking-[-0.4px] text-[#252525] sm:text-[30px]">
            How will you use SkillConnect?
          </h1>

          <p className="mt-4 max-w-[430px] text-center text-[16px] font-normal leading-[1.55] text-[#667085]">
            Select how you intend to use the platform to
            <br className="hidden sm:block" />
            personalize your experience.
          </p>

          <div className="mt-[38px] flex w-full flex-col gap-4">
            {/* CLIENT */}
            <button
              type="button"
              onClick={() => handleRoleSelect("client")}
              className="group flex h-[94px] w-full items-center rounded-[13px] border border-[#E2E5E9] bg-white px-6 text-left shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition duration-200 hover:border-[#173D57]/40 hover:bg-[#FCFDFE] hover:shadow-[0_5px_14px_rgba(16,24,40,0.08)] focus:outline-none focus:ring-2 focus:ring-[#173D57]/20"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1F4F6]">
                <UserRound
                  size={21}
                  strokeWidth={1.9}
                  className="text-[#173D57]"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-[18px] font-semibold leading-6 text-[#252525]">
                  Client
                </h2>

                <p className="mt-1 text-[15px] font-normal leading-5 text-[#667085]">
                  I need to hire a skilled worker
                </p>
              </div>
            </button>

            {/* SERVICE PROVIDER */}
            <button
              type="button"
              onClick={() => handleRoleSelect("provider")}
              className="group flex h-[94px] w-full items-center rounded-[13px] border border-[#E2E5E9] bg-white px-6 text-left shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition duration-200 hover:border-[#173D57]/40 hover:bg-[#FCFDFE] hover:shadow-[0_5px_14px_rgba(16,24,40,0.08)] focus:outline-none focus:ring-2 focus:ring-[#173D57]/20"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1F4F6]">
                <Wrench
                  size={21}
                  strokeWidth={1.9}
                  className="text-[#173D57]"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-[18px] font-semibold leading-6 text-[#252525]">
                  Service Provider
                </h2>

                <p className="mt-1 text-[15px] font-normal leading-5 text-[#667085]">
                  I want to find jobs nad earn
                </p>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
