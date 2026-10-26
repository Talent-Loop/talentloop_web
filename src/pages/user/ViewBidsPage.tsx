
import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clientApi from "../../services/clientApi";

interface Job {
  _id: string;
  title: string;
  jobLocation: string;
  budget: number;
  agreedPrice: number | null;
  status: string;
  providerId?: string | null;
}

interface Provider {
  _id?: string;
  id?: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  rating?: number | string;
  profilePhoto?: string;
  photo?: string;
}

interface Bid {
  _id: string;
  proposedPrice: number;
  estimatedDuration?: number;
  message?: string;
  status?: string;
  providerId?: string | Provider;
  provider?: Provider | string;
  providerDetails?: Provider;
  user?: Provider;
  [key: string]: unknown;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

function getProviderId(bid: Bid): string {
  const provider =
    bid.providerId ??
    bid.provider ??
    bid.providerDetails ??
    bid.user;

  if (typeof provider === "string") {
    return provider;
  }

  if (provider && typeof provider === "object") {
    return provider._id ?? provider.id ?? "";
  }

  return "";
}

function getProviderName(bid: Bid): string {
  const provider =
    bid.providerDetails ??
    (typeof bid.provider === "object" ? bid.provider : undefined) ??
    (typeof bid.providerId === "object" ? bid.providerId : undefined) ??
    bid.user;

  if (provider && typeof provider === "object") {
    const fullName =
      provider.fullName ??
      provider.name ??
      [provider.firstName, provider.lastName]
        .filter(Boolean)
        .join(" ");

    if (fullName) return fullName;
    if (provider.email) return provider.email;
  }

  const fallbackName = bid.providerName;

  return typeof fallbackName === "string"
    ? fallbackName
    : "Provider";
}

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      data?: {
        message?: string | string[];
      };
    };
    message?: string;
  };

  const message = err.response?.data?.message;

  if (Array.isArray(message)) return message.join(", ");
  if (message) return message;

  return err.message ?? "Something went wrong. Please try again.";
}

function formatMoney(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function ViewBidsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const jobId = (
    location.state as { jobId?: string } | null
  )?.jobId;

  const [job, setJob] = useState<Job | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [acceptingBidId, setAcceptingBidId] = useState<string | null>(
    null
  );
  const [accepted, setAccepted] = useState(false);

  const loadData = useCallback(async () => {
    if (!jobId) {
      setJob(null);
      setBids([]);
      setPageError(
        "No job was selected. Please open this page from a job or notification."
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError("");

    try {
      // Fetch the job first. If it doesn't exist, don't request its bids.
      const jobResponse = await clientApi.get<ApiResponse<Job>>(
        `/jobs/${jobId}`
      );

      const fetchedJob = jobResponse.data.data;
      setJob(fetchedJob);

      const bidsResponse = await clientApi.get<ApiResponse<Bid[]>>(
        `/jobs/${jobId}/bids`
      );

      const bidsData = bidsResponse.data.data;
      setBids(Array.isArray(bidsData) ? bidsData : []);
    } catch (error) {
      const err = error as {
        response?: { status?: number };
      };

      if (err.response?.status === 404) {
        setJob(null);
        setBids([]);
        setPageError(
          "This job could not be found. It may have been removed, or the notification may contain an outdated job link."
        );
      } else if (err.response?.status === 429) {
        setPageError(
          "The server is receiving too many requests. Please wait about a minute before trying again."
        );
      } else {
        setPageError(getErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleAcceptBid = async (bid: Bid) => {
    if (!jobId) {
      toast.error("Job ID is missing.");
      return;
    }

    const providerId = getProviderId(bid);

    if (!providerId) {
      toast.error(
        "The provider ID is missing from this bid. Please check the bid response."
      );
      return;
    }

    if (job?.status !== "open") {
      toast.error("This job is no longer open for assignment.");
      return;
    }

    const providerName = getProviderName(bid);

    const confirmed = window.confirm(
      `Accept ${providerName}'s bid for ${formatMoney(
        bid.proposedPrice
      )}? Other bids will be rejected automatically.`
    );

    if (!confirmed) return;

    setAcceptingBidId(bid._id);

    try {
      await clientApi.patch(
        `/jobs/${jobId}/assign-provider`,
        { providerId }
      );

      setAccepted(true);

      setJob((current) =>
        current
          ? {
              ...current,
              providerId,
              agreedPrice: bid.proposedPrice,
              status: "in_progress",
            }
          : current
      );

      setBids((current) =>
        current.map((item) =>
          item._id === bid._id
            ? { ...item, status: "accepted" }
            : { ...item, status: "rejected" }
        )
      );

      toast.success("Bid accepted and provider assigned!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setAcceptingBidId(null);
    }
  };

  const formatStatus = (status: string) =>
    status.replace(/_/g, " ");

  return (
    <main className="relative min-h-[1117px] w-full bg-[#F0F4F2]">
      <div className="relative min-h-[1117px] w-[1179px] max-w-full bg-[#F7FAF9]">
        <h1 className="absolute left-[10px] top-[20px] h-[32px] w-[99px] whitespace-nowrap font-['Inter'] text-[24px] font-bold leading-[32px] tracking-[0px] text-[#1E293B]">
          My Jobs
        </h1>

        {/* Job summary */}
        <div className="absolute left-[10px] top-[120px] flex min-h-[75px] w-[min(1000px,calc(100%-20px))] items-center justify-between rounded-[10px] bg-white px-[16px] py-3 shadow-[0px_4px_6px_-5px_#0000001F]">
          <div className="min-w-0 pr-3">
            <h2 className="font-['Montserrat'] text-[16px] font-semibold leading-[20px] text-[#111827]">
              {loading
                ? "Loading job..."
                : job?.title ?? "Job unavailable"}
            </h2>

            <p className="mt-[5px] font-['Montserrat'] text-[11px] font-normal text-[#737373]">
              <MapPin className="mr-[4px] inline h-[12px] w-[12px]" />
              Location: {job?.jobLocation ?? "—"}
            </p>

            {job && (
              <p className="mt-1 font-['Montserrat'] text-[11px] text-[#737373]">
                Budget: {formatMoney(job.budget)}
              </p>
            )}
          </div>

          {job && (
            <span className="flex min-h-[23px] shrink-0 items-center justify-center rounded-[22px] bg-[#FFA0421C] px-[10px] py-1 font-['Montserrat'] text-[10px] capitalize text-[#C78315]">
              {formatStatus(job.status)}
            </span>
          )}
        </div>

        {/* Bids received */}
        <section className="absolute left-[10px] top-[250px] w-[min(1095px,calc(100%-20px))]">
          <h2 className="h-[19px] font-['Montserrat'] text-[16px] font-semibold leading-[120%] text-[#111827]">
            Bids Received
          </h2>

          {loading && (
            <p className="mt-6 text-sm text-[#737373]">
              Loading job and bids...
            </p>
          )}

          {!loading && pageError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{pageError}</p>

              {pageError.includes("could not be found") ? (
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/notifications")}
                  className="mt-3 rounded-md bg-[#164D6F] px-4 py-2 text-white"
                >
                  Back to notifications
                </button>
              ) : pageError.includes("too many requests") ? (
                <p className="mt-3 text-xs">
                  Please wait before reopening this page. Avoid repeated retries.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => void loadData()}
                  className="mt-3 rounded-md bg-[#164D6F] px-4 py-2 text-white"
                >
                  Try again
                </button>
              )}
            </div>
          )}

          {!loading && !pageError && bids.length === 0 && (
            <div className="mt-[19px] w-[min(1000px,100%)] rounded-[13px] border border-[#0000001A] bg-white px-6 py-10 text-center">
              <p className="font-['Montserrat'] text-[15px] font-semibold text-[#111827]">
                No bids received yet
              </p>
              <p className="mt-2 text-sm text-[#737373]">
                Providers' bids for this job will appear here.
              </p>
            </div>
          )}

          {!loading && !pageError && bids.length > 0 && (
            <div className="mt-[19px] flex w-full flex-col gap-[22px]">
              {bids.map((bid) => {
                const providerId = getProviderId(bid);
                const providerName = getProviderName(bid);

                const providerObject =
                  bid.providerDetails ??
                  (typeof bid.provider === "object"
                    ? bid.provider
                    : undefined) ??
                  (typeof bid.providerId === "object"
                    ? bid.providerId
                    : undefined) ??
                  bid.user;

                const initials = providerName
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase();

                const isPending =
                  !bid.status ||
                  ["pending", "submitted"].includes(
                    bid.status.toLowerCase()
                  );

                const isAccepting = acceptingBidId === bid._id;

                const canAccept =
                  job?.status === "open" &&
                  isPending &&
                  !acceptingBidId &&
                  !accepted;

                return (
                  <article
                    key={bid._id}
                    className="flex min-h-[102px] w-full flex-wrap items-center justify-between gap-4 rounded-[13px] border border-[#0000001A] px-4 py-5 sm:px-[34px]"
                  >
                    {/* Provider */}
                    <div className="flex min-h-[36px] min-w-0 items-center gap-4 sm:w-[322px] sm:gap-[36px]">
                      {providerObject?.profilePhoto ||
                      providerObject?.photo ? (
                        <img
                          src={
                            providerObject.profilePhoto ??
                            providerObject.photo
                          }
                          alt={providerName}
                          className="h-[36px] w-[36px] shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#164D6F] text-[9px] font-semibold text-white">
                          {initials || "P"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-[7px]">
                          <span className="break-words font-['Montserrat'] text-[14px] font-semibold leading-[17px] text-[#111827]">
                            {providerName}
                          </span>

                          <ShieldCheck className="h-[14px] w-[14px] shrink-0 fill-[#1267D6] text-[#1267D6]" />
                        </div>

                        <div className="mt-[5px] flex flex-wrap items-center gap-[10px]">
                          <span className="flex items-center gap-[3px] font-['Montserrat'] text-[9px] text-[#737373]">
                            <Star className="h-[9px] w-[9px] fill-[#FBBF24] text-[#FBBF24]" />
                            {providerObject?.rating ?? "N/A"}
                          </span>

                          <span className="flex items-center gap-[3px] font-['Montserrat'] text-[9px] text-[#737373]">
                            <MapPin className="h-[9px] w-[9px]" />
                            {job?.jobLocation ?? "Location unavailable"}
                          </span>
                        </div>

                        {typeof bid.estimatedDuration === "number" && (
                          <p className="mt-1 text-[10px] text-[#737373]">
                            Estimated duration: {bid.estimatedDuration}{" "}
                            {bid.estimatedDuration === 1 ? "day" : "days"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bid amount */}
                    <span className="w-[100px] shrink-0 font-['Montserrat'] text-[14px] font-semibold text-[#111827]">
                      {formatMoney(bid.proposedPrice)}
                    </span>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-[20px]">
                      <button
                        type="button"
                        disabled={!providerId}
                        onClick={() => {
                          if (!providerId) {
                            toast.error(
                              "This bid doesn't contain a provider ID yet."
                            );
                            return;
                          }

                          navigate(
                            `/dashboard/messages/${providerId}/profile`
                          );
                        }}
                        className="flex h-[32px] w-[130px] items-center justify-center rounded-[9px] border border-[#00000080] bg-[#F7F7F7] px-[10px] font-['Montserrat'] text-[11px] font-normal text-[#4B5563] disabled:cursor-not-allowed disabled:opacity-50 sm:w-[158px]"
                      >
                        View profile
                      </button>

                      <button
                        type="button"
                        disabled={!canAccept}
                        onClick={() => void handleAcceptBid(bid)}
                        className="flex h-[32px] w-[130px] items-center justify-center gap-2 rounded-[9px] border border-transparent bg-[#164D6F] px-[10px] font-['Montserrat'] text-[11px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-[158px]"
                      >
                        {isAccepting ? (
                          "Accepting..."
                        ) : bid.status?.toLowerCase() === "accepted" ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Accepted
                          </>
                        ) : (
                          "Accept bid"
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-[10px] top-[950px] flex h-[48px] w-[90px] items-center justify-center rounded-[8px] bg-[#0D2E43] font-['Montserrat'] text-[14px] font-medium text-white"
        >
          Back
        </button>
      </div>
    </main>
  );
}
