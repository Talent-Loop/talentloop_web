
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  ChevronDown,
  LocateFixed,
  MapPin,
} from "lucide-react";
import clientApi from "../../services/clientApi";

interface Service {
  _id: string;
  name: string;
  category: string;
  isActive: boolean;
}

interface ServicesResponse {
  success: boolean;
  data: Service[];
}

interface CreateJobResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    status: string;
  };
}

export default function PostJobPage() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [serviceId, setServiceId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const [photos, setPhotos] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [photoFiles, setPhotoFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const submitLock = useRef(false);

  // Load active services from the backend.
  useEffect(() => {
    let cancelled = false;

    const loadServices = async () => {
      try {
        const response =
          await clientApi.get<ServicesResponse>("/services");

        if (!cancelled) {
          setServices(
            (response.data.data ?? []).filter(
              (service) => service.isActive,
            ),
          );
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load services. Please refresh the page and try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    };

    void loadServices();

    return () => {
      cancelled = true;
    };
  }, []);

  // Release temporary image preview URLs when the page unmounts.
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo) URL.revokeObjectURL(photo);
      });
    };
  }, []);

  const handlePhotoChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Please select an image smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setError("");

    const imageUrl = URL.createObjectURL(file);

    setPhotos((current) => {
      const updated = [...current];

      if (updated[index]) {
        URL.revokeObjectURL(updated[index]!);
      }

      updated[index] = imageUrl;
      return updated;
    });

    setPhotoFiles((current) => {
      const updated = [...current];
      updated[index] = file;
      return updated;
    });
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        );
        setError("");
      },
      () => {
        setError(
          "Unable to get your current location. Please enter it manually.",
        );
      },
    );
  };

  const handleNext = async () => {
    // Prevent accidental duplicate submissions.
    if (submitLock.current) return;

    setError("");

    if (!serviceId) {
      setError("Please select a service.");
      return;
    }

    if (!jobTitle.trim()) {
      setError("Please enter a job title.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe the job.");
      return;
    }

    const numericBudget = Number(budget);

    if (
      !budget.trim() ||
      !Number.isFinite(numericBudget) ||
      numericBudget <= 0
    ) {
      setError("Please enter a valid budget greater than zero.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter the job location.");
      return;
    }

    // The backend requires one actual image file.
    const photo = photoFiles.find(
      (file): file is File => file !== null,
    );

    if (!photo) {
      setError("Please upload at least one job photo.");
      return;
    }

    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("title", jobTitle.trim());
    formData.append("serviceId", serviceId);
    formData.append("description", description.trim());
    formData.append("budget", String(numericBudget));
    formData.append("jobLocation", location.trim());
    formData.append("milestones", JSON.stringify([]));

    submitLock.current = true;
    setSubmitting(true);

    try {
      const response = await clientApi.post<CreateJobResponse>(
        "/jobs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 90000,
        },
      );

      // Only navigate after the job creation request succeeds.
      if (response.data?.success === false) {
        throw new Error(
          response.data.message || "The job could not be created.",
        );
      }

      navigate("/dashboard/jobs", { replace: true });
    } catch (err: unknown) {
      console.error("JOB CREATION ERROR:", err);

      const axiosError = err as {
        code?: string;
        message?: string;
        response?: {
          status?: number;
          data?: {
            message?: string | string[];
          };
        };
      };

      const message = axiosError.response?.data?.message;

      if (
        axiosError.code === "ECONNABORTED" ||
        axiosError.code === "ETIMEDOUT"
      ) {
        setError(
          "The request timed out. Please check your jobs dashboard before trying again, because the job may already have been created.",
        );
      } else {
        setError(
          Array.isArray(message)
            ? message.join(", ")
            : message ||
                "Unable to confirm job creation. Please check your jobs dashboard before trying again.",
        );
      }
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-[1200px] w-full overflow-x-hidden bg-[#F8FAFA] lg:min-h-[1117px]">
      <div className="relative min-h-[1200px] w-full max-w-[1179px] lg:min-h-[1117px]">

        <h1
          className="
            absolute left-[10px] top-[22px]
            h-[32px] w-[180px] whitespace-nowrap
            font-['Inter'] text-[24px] font-bold
            leading-[32px] tracking-[0px] text-[#1E293B]
          "
        >
          Post a Job
        </h1>

        <section className="absolute left-[10px] top-[84px]">
          <h2
            className="
              h-[24px] w-[160px] whitespace-nowrap
              font-['Montserrat'] text-[20px]
              font-semibold leading-[120%] text-[#1E293B]
            "
          >
            Job Details
          </h2>

          <p
            className="
              mt-0 h-[20px] w-[260px] whitespace-nowrap
              font-['Montserrat'] text-[14px]
              font-normal leading-[140%] text-[#1E293B]
            "
          >
            Tell us more about your job
          </p>
        </section>

        {/* SERVICE */}
        <div className="absolute left-[10px] right-[10px] top-[160px] w-auto lg:left-[10px] lg:right-auto lg:w-[531px]">
          <label
            htmlFor="category"
            className="
              mb-[8px] block font-['Montserrat']
              text-[14px] font-semibold leading-[20px]
              text-[#64748B]
            "
          >
            Category / Service
          </label>

          <div className="relative h-[56px] w-full">
            <select
              id="category"
              value={serviceId}
              disabled={servicesLoading || submitting}
              onChange={(event) => setServiceId(event.target.value)}
              className="
                h-[56px] w-full appearance-none rounded-[10px]
                border border-[#D9E2EA] bg-[#F8FAFC]
                px-[16px] pr-[48px] font-['Montserrat']
                text-[14px] text-[#334155] outline-none
                focus:border-[#8FA8B9] disabled:opacity-60
              "
            >
              <option value="">
                {servicesLoading
                  ? "Loading services..."
                  : "Select a service"}
              </option>

              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name} — {service.category}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                pointer-events-none absolute right-[18px]
                top-1/2 h-[18px] w-[18px]
                -translate-y-1/2 text-[#64748B]
              "
            />
          </div>
        </div>

        {/* BUDGET */}
        <div className="absolute left-[10px] right-[10px] top-[266px] w-auto lg:left-[570px] lg:right-auto lg:top-[160px] lg:w-[300px]">
          <label
            htmlFor="budget"
            className="
              mb-[8px] block font-['Montserrat']
              text-[14px] font-semibold leading-[20px]
              text-[#64748B]
            "
          >
            Budget (₦)
          </label>

          <input
            id="budget"
            type="number"
            min="1"
            step="any"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            disabled={submitting}
            placeholder="e.g. 20000"
            className="
              h-[56px] w-full rounded-[10px]
              border border-[#D9E2EA] bg-[#F8FAFC]
              px-[16px] font-['Montserrat'] text-[14px]
              text-[#334155] outline-none
              placeholder:text-[#9AAEC4]
              focus:border-[#8FA8B9]
            "
          />
        </div>

        {/* JOB TITLE */}
        <div className="absolute left-[10px] right-[10px] top-[372px] w-auto lg:left-[10px] lg:right-auto lg:top-[266px] lg:w-[532px]">
          <label
            htmlFor="job-title"
            className="
              mb-[8px] block h-[20px] font-['Montserrat']
              text-[14px] font-semibold leading-[20px]
              text-[#64748B]
            "
          >
            Job Title
          </label>

          <input
            id="job-title"
            type="text"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            disabled={submitting}
            placeholder="e.g. Fix leaking kitchen pipe"
            className="
              h-[56px] w-full rounded-[10px]
              border border-[#D9E2EA] bg-[#F8FAFC]
              px-[16px] font-['Montserrat'] text-[14px]
              text-[#334155] outline-none
              placeholder:text-[#9AAEC4]
              focus:border-[#8FA8B9]
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div className="absolute left-[10px] right-[10px] top-[480px] w-auto lg:left-[10px] lg:right-auto lg:top-[374px] lg:w-[min(1055px,calc(100%-20px))]">
          <label
            htmlFor="description"
            className="
              mb-[8px] block h-[20px] font-['Montserrat']
              text-[14px] font-semibold leading-[20px]
              text-[#64748B]
            "
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={submitting}
            placeholder="Describe the job details in depth..."
            className="
              h-[124px] w-full resize-none rounded-[10px]
              border border-[#D9E2EA] bg-[#F8FAFC]
              px-[16px] py-[16px] font-['Montserrat']
              text-[14px] font-normal leading-[140%]
              text-[#334155] outline-none
              placeholder:text-[#9AAEC4]
              focus:border-[#8FA8B9]
            "
          />
        </div>

        {/* PHOTOS */}
        <div className="absolute left-[10px] right-[10px] top-[656px] w-auto lg:left-[10px] lg:right-auto lg:top-[550px] lg:w-[681px]">
          <p
            className="
              mb-[12px] font-['Montserrat'] text-[14px]
              font-semibold leading-[20px] text-[#64748B]
            "
          >
            Photos{" "}
            <span className="font-normal">
              (at least one required)
            </span>
          </p>

          <div className="flex min-h-[80px] flex-wrap items-center gap-[12px]">
            {photos.map((photo, index) => (
              <div key={index}>
                <input
                  ref={(element) => {
                    fileInputRefs.current[index] = element;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={submitting}
                  onChange={(event) =>
                    handlePhotoChange(index, event)
                  }
                />

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    fileInputRefs.current[index]?.click()
                  }
                  aria-label={`Upload job photo ${index + 1}`}
                  className="
                    relative flex h-[80px] w-[80px]
                    items-center justify-center overflow-hidden
                    rounded-[10px] border-[2px] border-dashed
                    border-[#C7D6E5] bg-[#F8FAFC]
                    disabled:opacity-60
                  "
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={`Uploaded job photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera
                      className="h-[24px] w-[24px] text-[#91A6BE]"
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LOCATION */}
        <div className="absolute left-[10px] right-[10px] top-[890px] w-auto lg:left-[10px] lg:right-auto lg:top-[700px] lg:w-[min(980px,calc(100%-20px))]">
          <label
            htmlFor="location"
            className="
              mb-[8px] block font-['Montserrat']
              text-[14px] font-semibold leading-[20px]
              text-[#64748B]
            "
          >
            Location
          </label>

          <div className="relative h-[56px] w-full">
            <MapPin
              className="
                pointer-events-none absolute left-[16px]
                top-1/2 h-[21px] w-[21px]
                -translate-y-1/2 text-[#91A6BE]
              "
              strokeWidth={2}
            />

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              disabled={submitting}
              placeholder="Enter service location"
              className="
                h-[56px] w-full rounded-[10px]
                border border-[#D9E2EA] bg-[#F8FAFC]
                pl-[48px] pr-[16px] font-['Montserrat']
                text-[14px] text-[#334155] outline-none
                placeholder:text-[#9AAEC4]
                focus:border-[#8FA8B9]
              "
            />
          </div>

          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={submitting}
            className="
              mt-[8px] flex h-[56px] w-full
              items-center justify-center gap-[10px]
              rounded-[10px] border border-[#D9E2EA]
              bg-[#F1F5F9] font-['Montserrat']
              text-[14px] font-semibold text-[#15516F]
              disabled:opacity-60
            "
          >
            <LocateFixed
              className="h-[20px] w-[20px]"
              strokeWidth={2}
            />
            <span>Use current location</span>
          </button>
        </div>

        {/* FEEDBACK */}
        {error && (
          <p
            role="alert"
            className="
              absolute left-[10px] right-[10px] top-[986px]
              max-w-[850px] font-['Montserrat']
              text-[14px] font-medium text-red-600
              lg:top-[880px]
            "
          >
            {error}
          </p>
        )}

        {/* CANCEL */}
        <button
          type="button"
          disabled={submitting}
          onClick={() => navigate(-1)}
          className="
            absolute left-[10px] top-[1090px]
            flex h-[48px] w-[90px] items-center
            justify-center gap-[10px] rounded-[8px]
            border border-[#0D2E431F] bg-[#E8EDF1]
            px-[10px] font-['Montserrat'] text-[14px]
            font-medium text-[#294B60]
            disabled:opacity-60
            lg:top-[990px]
          "
        >
          Cancel
        </button>

        {/* SUBMIT JOB */}
        <button
          type="button"
          disabled={
            submitting ||
            servicesLoading ||
            services.length === 0
          }
          onClick={handleNext}
          className="
            absolute right-[10px] top-[1090px]
            flex h-[48px] w-[90px]
            items-center justify-center gap-[10px]
            rounded-[8px] border border-[#0D2E431F]
            bg-[#0D2E43] px-[10px] font-['Montserrat']
            text-[14px] font-semibold text-white
            disabled:cursor-not-allowed disabled:opacity-60
            lg:left-[min(900px,calc(100%-100px))]
            lg:right-auto lg:top-[1003px]
          "
        >
          {submitting ? "Sending..." : "Next"}
        </button>
      </div>
    </main>
  );
}
