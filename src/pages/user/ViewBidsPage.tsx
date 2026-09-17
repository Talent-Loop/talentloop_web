import {
  CheckCircle,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Bid {
  id: number;
  name: string;
  amount: string;
  rating: string;
  distance: string;
}

const bids: Bid[] = [
  {
    id: 1,
    name: "Emeka Johnson",
    amount: "₦3,000",
    rating: "4.8",
    distance: "2.4km away",
  },
  {
    id: 2,
    name: "Emeka Johnson",
    amount: "₦3,000",
    rating: "4.8",
    distance: "2.4km away",
  },
  {
    id: 3,
    name: "Emeka Johnson",
    amount: "₦3,000",
    rating: "4.8",
    distance: "2.4km away",
  },
  {
    id: 4,
    name: "Emeka Johnson",
    amount: "₦3,000",
    rating: "4.8",
    distance: "2.4km away",
  },
];

export default function ViewBidsPage() {
  const navigate = useNavigate();

  return (
    <section className="w-full pb-12 pt-5 sm:pt-7">
      {/* Page title */}
      <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#1E293B] sm:text-[24px]">
        My Jobs
      </h1>

      {/* Job summary */}
      <div className="mt-7 flex w-full flex-col gap-4 rounded-[10px] bg-white p-4 shadow-[0px_4px_6px_-5px_#0000001F] sm:mt-9 sm:min-h-[75px] sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-['Montserrat'] text-[15px] font-semibold leading-5 text-[#111827] sm:text-[16px]">
            Fix Kitchen Sink
          </h2>

          <p className="mt-1 flex items-center font-['Montserrat'] text-[11px] font-normal text-[#737373]">
            <MapPin className="mr-1 h-3 w-3 shrink-0" />
            Location: Lekki Lagos
          </p>
        </div>

        <span className="flex h-[23px] w-fit items-center justify-center rounded-[22px] bg-[#FFA0421C] px-3 font-['Montserrat'] text-[10px] font-normal text-[#C78315]">
          Pending
        </span>
      </div>

      {/* Bids received */}
      <div className="mt-9 w-full sm:mt-12">
        <h2 className="font-['Montserrat'] text-[16px] font-semibold leading-[120%] text-[#111827]">
          Bids Received
        </h2>

        <div className="mt-4 flex w-full flex-col gap-4 sm:mt-5 sm:gap-5">
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="w-full rounded-[13px] border border-[#0000001A] bg-white p-4 sm:min-h-[102px] sm:px-6 sm:py-5 lg:px-8"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Worker */}
                <div className="flex min-w-0 items-center gap-4 sm:min-w-[280px] sm:gap-5 lg:w-[322px] lg:gap-7">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#164D6F] font-['Montserrat'] text-[9px] font-semibold text-white sm:h-9 sm:w-9">
                    EJ
                  </div>

                  {/* Worker information */}
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate font-['Montserrat'] text-[13px] font-semibold leading-[17px] text-[#111827] sm:text-[14px]">
                        {bid.name}
                      </span>

                      <ShieldCheck
                        className="h-[14px] w-[14px] shrink-0"
                        fill="#1267D6"
                        textAnchor="middle"
                        stroke="#1267D6"
                      />
                    </div>

                    <div className="mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-[3px] font-['Montserrat'] text-[9px] text-[#737373]">
                        <Star className="h-[9px] w-[9px] fill-[#FBBF24] text-[#FBBF24]" />
                        {bid.rating}
                      </span>

                      <span className="flex items-center gap-[3px] font-['Montserrat'] text-[9px] text-[#737373]">
                        <MapPin className="h-[9px] w-[9px]" />
                        {bid.distance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between lg:block lg:w-[100px]">
                  <span className="font-['Montserrat'] text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                    {bid.amount}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:w-auto lg:grid-cols-2 lg:gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/dashboard/messages/${bid.id}`)
                    }
                    className="flex h-[36px] w-full items-center justify-center rounded-[9px] border border-[#00000080] bg-[#F7F7F7] px-4 font-['Montserrat'] text-[11px] font-normal text-[#4B5563] transition hover:bg-[#EEEEEE] sm:h-[32px] sm:w-[158px]"
                  >
                    View profile
                  </button>

                  <button
                    type="button"
                    className="flex h-[36px] w-full items-center justify-center gap-2 rounded-[9px] border border-transparent bg-[#164D6F] px-4 font-['Montserrat'] text-[11px] font-medium text-white transition hover:bg-[#123F5B] sm:h-[32px] sm:w-[158px]"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Accept bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-12 w-[90px] items-center justify-center rounded-[8px] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-medium text-white transition hover:bg-[#164D6F]"
        >
          Back
        </button>
      </div>
    </section>
  );
}