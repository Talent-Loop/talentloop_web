import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#17324D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Brand */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-wide">
            TALENTLOOP
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Connecting trusted professionals with clients across Nigeria.
          </p>
        </div>

        {/* Links */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Company
            </h3>

            <ul className="space-y-4 text-white/70">
              <li className="cursor-pointer hover:text-white">
                About Us
              </li>
              <li className="cursor-pointer hover:text-white">
                Contact Us
              </li>
              <li className="cursor-pointer hover:text-white">
                FAQs
              </li>
              <li className="cursor-pointer hover:text-white">
                Privacy Policy
              </li>
              <li className="cursor-pointer hover:text-white">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Professionals */}
          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Professionals
            </h3>

            <ul className="space-y-4 text-white/70">
              <li className="cursor-pointer hover:text-white">
                Become a Professional
              </li>
              <li className="cursor-pointer hover:text-white">
                Verification Process
              </li>
              <li className="cursor-pointer hover:text-white">
                Success Stories
              </li>
              <li className="cursor-pointer hover:text-white">
                Professional Resources
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Services
            </h3>

            <ul className="space-y-4 text-white/70">
              <li className="cursor-pointer hover:text-white">
                Find Professionals
              </li>
              <li className="cursor-pointer hover:text-white">
                Post a Job
              </li>
              <li className="cursor-pointer hover:text-white">
                Browse Categories
              </li>
              <li className="cursor-pointer hover:text-white">
                Safety Tips
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-6 text-xl font-semibold">
              Follow Us
            </h3>

            <div className="space-y-4 text-white/70">

              <div className="flex cursor-pointer items-center gap-3 hover:text-white">
                <FaFacebookF size={18} />
                Facebook
              </div>

              <div className="flex cursor-pointer items-center gap-3 hover:text-white">
                <FaInstagram size={18} />
                Instagram
              </div>

              <div className="flex cursor-pointer items-center gap-3 hover:text-white">
                <FaLinkedinIn size={18} />
                LinkedIn
              </div>

              <div className="flex cursor-pointer items-center gap-3 hover:text-white">
                <FaXTwitter size={18} />
                X (Twitter)
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 border-t border-white/10 pt-10 text-center">

          <p className="text-white/70">
            Lagos, Nigeria
          </p>

          <p className="mt-2 text-white/70">
            support@talentloop.ng
          </p>

          <p className="mt-2 text-white/70">
            +234 XXX XXX XXXX
          </p>

          <p className="mt-10 text-sm text-white/50">
            © 2026 TalentLoop. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}