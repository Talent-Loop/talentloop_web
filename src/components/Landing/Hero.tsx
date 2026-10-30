
import { Search, MapPin } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Badge from "../common/Badge";

export default function Hero() {
  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:pt-14">

        {/* Badge */}
        <div className="max-w-full">
          <Badge>Trusted by thousands of Nigerians</Badge>
        </div>

        {/* Heading */}
        <h1 className="mt-6 w-full max-w-[900px] text-center text-[34px] font-extrabold leading-[1.15] text-[#17324D] sm:mt-8 sm:text-[44px] md:text-[54px] md:leading-[1.2] lg:text-[68px] lg:leading-[78px]">
          Find trusted technicians &amp; skilled workers near you
        </h1>

        {/* Subtitle */}
        <p className="mt-5 w-full max-w-[760px] text-center text-[16px] leading-7 text-[#667085] sm:mt-7 sm:text-[20px] sm:leading-8 lg:mt-8 lg:text-[28px] lg:leading-[42px]">
          Post your job, receive competitive bids and hire the best
          professional for the job
        </p>

        {/* Search fields */}
        <div className="mt-8 flex w-full max-w-[980px] flex-col gap-3 sm:mt-10 sm:gap-4 md:flex-row md:gap-5">
          <div className="w-full min-w-0 md:flex-1">
            <Input
              icon={<Search size={20} />}
              placeholder="What do you need"
            />
          </div>

          <div className="w-full min-w-0 md:flex-1">
            <Input
              icon={<MapPin size={20} />}
              placeholder="Enter your location"
            />
          </div>

          <div className="w-full md:w-auto md:flex-shrink-0">
            <Button className="w-full md:w-[200px] lg:w-[250px]">
              FIND PROFESSIONAL
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
