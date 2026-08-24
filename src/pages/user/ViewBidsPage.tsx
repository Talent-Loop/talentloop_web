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
    <main className="relative min-h-[1117px] w-full bg-[#F0F4F2]">
      <div className="relative min-h-[1117px] w-[1179px] bg-[#F7FAF9]">
        {/* =====================================================
            PAGE TITLE
        ====================================================== */}

        <h1
          className="
            absolute
            left-[10px]
            top-[20px]
            h-[32px]
            w-[99px]
            whitespace-nowrap
            font-['Inter']
            text-[24px]
            font-bold
            leading-[32px]
            tracking-[0px]
            text-[#1E293B]
          "
        >
          My Jobs
        </h1>
  {/* =====================================================
            JOB SUMMARY
        ====================================================== */}

        <div
          className="
            absolute
            left-[10px]
            top-[120px]
            flex
            h-[75px]
            w-[1000px]
            items-center
            justify-between
            rounded-[10px]
            bg-white
            px-[16px]
            shadow-[0px_4px_6px_-5px_#0000001F]
          "
        >
          <div>
            <h1
              className="
                font-['Montserrat']
                text-[16px]
                font-semibold
                leading-[20px]
                text-[#111827]
              "
            >
              Fix Kitchen Sink
            </h1>

            <p
              className="
                mt-[5px]
                font-['Montserrat']
                text-[11px]
                font-normal
                text-[#737373]
              "
            >
              <MapPin className="mr-[4px] inline h-[12px] w-[12px]" />
              Location : Lekki Lagos
            </p>
          </div>

          <span
            className="
              flex
              h-[23px]
              w-[93px]
              items-center
              justify-center
              rounded-[22px]
              bg-[#FFA0421C]
              px-[10px]
              font-['Montserrat']
              text-[10px]
              font-normal
              text-[#C78315]
            "
          >
            Pending
          </span>
        </div>

        {/* =====================================================
            BIDS RECEIVED
        ====================================================== */}

        <div
          className="
            absolute
            left-[10px]
            top-[250px]
            w-[1095px]
          "
        >
          <h2
            className="
              h-[19px]
              font-['Montserrat']
              text-[16px]
              font-semibold
              leading-[120%]
              text-[#111827]
            "
          >
            Bids Received
          </h2>

          {/* Bid list */}
          <div className="mt-[19px] flex w-[1095px] flex-col gap-[22px]">
            {bids.map((bid) => (
              <div
                key={bid.id}
                className="
                  flex
                  h-[102px]
                  w-[1000px]
                  items-center
                  justify-between
                  rounded-[13px]
                  border
                  border-[#0000001A]
                  px-[34px]
                  py-[33px]
                "
              >
                {/* =================================================
                    WORKER
                ================================================== */}

                <div className="flex h-[36px] w-[322px] items-center gap-[36px]">
                  {/* Avatar */}
                  <div
                    className="
                      flex
                      h-[36px]
                      w-[36px]
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#164D6F]
                      text-[9px]
                      font-semibold
                      text-white
                    "
                  >
                    EJ
                  </div>

                  {/* Text */}
                  <div className="flex h-[29px] flex-col gap-[5px]">
                    <div className="flex items-center gap-[7px]">
                      <span
                        className="
                          font-['Montserrat']
                          text-[14px]
                          font-semibold
                          leading-[17px]
                          text-[#111827]
                        "
                      >
                        {bid.name}
                      </span>

                      <ShieldCheck
                        className="
                          h-[14px]
                          w-[14px]
                          fill-[#1267D6]
                          text-[#1267D6]
                        "
                      />
                    </div>

                    <div className="flex items-center gap-[10px]">
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
                <span
                  className="
                    w-[100px]
                    font-['Montserrat']
                    text-[14px]
                    font-semibold
                    text-[#111827]
                  "
                >
                  {bid.amount}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-[39px]">
                  <button
                    type="button"
                    className="
                      flex
                      h-[32px]
                      w-[158px]
                      items-center
                      justify-center
                      rounded-[9px]
                      border
                      border-[#00000080]
                      bg-[#F7F7F7]
                      px-[10px]
                      font-['Montserrat']
                      text-[11px]
                      font-normal
                      text-[#4B5563]
                    "
                  >
                    View profile
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      h-[32px]
                      w-[158px]
                      items-center
                      justify-center
                      rounded-[9px]
                      border
                      border-transparent
                      bg-[#164D6F]
                      px-[10px]
                      font-['Montserrat']
                      text-[11px]
                      font-medium
                      text-white
                    "
                  >
                    Accept bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            BACK
        ====================================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            absolute
            left-[10px]
            top-[950px]
            flex
            h-[48px]
            w-[90px]
            items-center
            justify-center
            rounded-[8px]
            bg-[#0D2E43]
            font-['Montserrat']
            text-[14px]
            font-medium
            text-white
          "
        >
          Back
        </button>
      </div>
    </main>
  );
}