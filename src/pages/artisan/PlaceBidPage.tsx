import { useState } from "react";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

export default function PlaceBidPage() {
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      price,
      message,
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F8]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <ArtisanHeader />

        <div className="px-8 pb-10 pt-10">
          <div className="mx-auto max-w-[900px]">
            {/* Job Information */}
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-[#111111]">
                Fix Leaking Pipe
              </h1>

              <p className="mt-2 text-[15px] text-[#667085]">
                Plumbing&nbsp;&nbsp;·&nbsp;&nbsp;Lekki Phase 1
              </p>
            </div>

            {/* Bid Form */}
            <form onSubmit={handleSubmit}>
              {/* Your Price */}
              <div className="mb-7">
                <label
                  htmlFor="price"
                  className="mb-3 block text-[15px] font-medium text-[#111111]"
                >
                  Your price
                </label>

                <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#D0D5DD] bg-white">
                  <div className="flex w-[55px] items-center justify-center border-r border-[#D0D5DD] text-[17px] text-[#667085]">
                    ₦
                  </div>

                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Eg 3000"
                    className="min-w-0 flex-1 px-4 text-[15px] text-[#111111] outline-none placeholder:text-[#98A2B3]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="mb-3 block text-[15px] font-medium text-[#111111]"
                >
                  Message <span className="font-normal text-[#667085]">(optional)</span>
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce Yourself and explain your approach"
                  rows={6}
                  className="w-full resize-none rounded-xl border border-[#D0D5DD] bg-white px-4 py-4 text-[15px] text-[#111111] outline-none placeholder:text-[#98A2B3] focus:border-[#185A7D]"
                />
              </div>

              {/* Place Bid */}
              <button
                type="submit"
                className="h-[52px] w-full rounded-xl bg-[#185A7D] text-[15px] font-medium text-white transition hover:bg-[#124B69]"
              >
                Place Bid
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}