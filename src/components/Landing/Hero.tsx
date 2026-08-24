import { Search, MapPin } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Badge from "../common/Badge";

export default function Hero() {
  return (
    <section className="bg-white">

      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 pt-14 pb-16">

        {/* Badge */}

        <Badge>
          Trusted by thousands of Nigerians
        </Badge>

        {/* Heading */}

        <h1 className="mt-8 max-w-[900px] text-center text-[68px] font-extrabold leading-[78px] text-[#17324D]">
          Find trusted technicians & skilled workers near you
        </h1>

        {/* Subtitle */}

        <p className="mt-8 max-w-[760px] text-center text-[28px] leading-[42px] text-[#667085]">
          Post your job, receive competitive bids and hire the best
          professional for the job
        </p>

        {/* Search */}

        <div className="mt-12 flex w-full max-w-[980px] gap-5">

          <div className="flex-1">
            <Input
              icon={<Search size={20} />}
              placeholder="What do you need"
            />
          </div>

          <div className="flex-1">
            <Input
              icon={<MapPin size={20} />}
              placeholder="Enter your location"
            />
          </div>

          <Button className="w-[250px]">
            FIND PROFESSIONAL
          </Button>

        </div>

      </div>

    </section>
  );
}