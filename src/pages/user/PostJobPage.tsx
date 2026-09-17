import { useEffect, useRef, useState } from "react";
import { Camera, ChevronDown, LocateFixed, MapPin } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const categories = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Cleaning",
  "Painting",
  "Mechanic",
  "Gardening",
  "Other",
];

export default function PostJobPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [photos, setPhotos] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhotoChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPhotos((current) => {
      const updated = [...current];

      if (updated[index]) {
        URL.revokeObjectURL(updated[index]!);
      }

      updated[index] = imageUrl;

      return updated;
    });

    event.target.value = "";
  };

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo) {
          URL.revokeObjectURL(photo);
        }
      });
    };
  }, [photos]);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    toast.loading("Getting your location...", {
      id: "location-loading",
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

        toast.success("Location detected.", {
          id: "location-loading",
        });
      },
      () => {
        toast.error("Unable to get your current location.", {
          id: "location-loading",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleNext = () => {
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    if (!jobTitle.trim()) {
      toast.error("Please enter a job title.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please describe the job.");
      return;
    }

    if (!location.trim()) {
      toast.error("Please enter the service location.");
      return;
    }

    console.log({
      category,
      jobTitle,
      description,
      photos,
      location,
    });

    toast.success("Job details saved.");

    // Add your next-step navigation / API submission here.
  };

  return (
    <section className="w-full pb-10 pt-6 sm:pt-7">
      <div className="w-full">
        {/* Page title */}
        <h1
          className="
            font-['Inter']
            text-[22px]
            font-bold
            leading-8
            text-[#1E293B]
            sm:text-[24px]
          "
        >
          Post a Job
        </h1>

        {/* Job details heading */}
        <section className="mt-8 sm:mt-10">
          <h2
            className="
              font-['Montserrat']
              text-[18px]
              font-semibold
              leading-[120%]
              text-[#1E293B]
              sm:text-[20px]
            "
          >
            Job Details
          </h2>

          <p
            className="
              mt-1
              font-['Montserrat']
              text-[13px]
              font-normal
              leading-[140%]
              text-[#1E293B]
              sm:text-[14px]
            "
          >
            Tell us more about your job
          </p>
        </section>

        {/* Form */}
        <div className="mt-7 w-full space-y-6 sm:mt-8 sm:space-y-7">
          {/* Category */}
          <div className="w-full max-w-[531px]">
            <label
              htmlFor="category"
              className="
                mb-2
                block
                font-['Montserrat']
                text-[13px]
                font-semibold
                leading-5
                text-[#64748B]
                sm:text-[14px]
              "
            >
              Category
            </label>

            <div className="relative w-full">
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="
                  h-14
                  w-full
                  appearance-none
                  rounded-[10px]
                  border
                  border-[#D9E2EA]
                  bg-[#F8FAFC]
                  px-4
                  pr-12
                  font-['Montserrat']
                  text-[14px]
                  font-normal
                  text-[#334155]
                  outline-none
                  transition
                  focus:border-[#8FA8B9]
                "
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  h-[18px]
                  w-[18px]
                  -translate-y-1/2
                  text-[#64748B]
                "
              />
            </div>
          </div>

          {/* Job title */}
          <div className="w-full max-w-[532px]">
            <label
              htmlFor="job-title"
              className="
                mb-2
                block
                font-['Montserrat']
                text-[13px]
                font-semibold
                leading-5
                text-[#64748B]
                sm:text-[14px]
              "
            >
              Job Title
            </label>

            <input
              id="job-title"
              type="text"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              placeholder="e.g. Fix leaking kitchen pipe"
              className="
                h-14
                w-full
                rounded-[10px]
                border
                border-[#D9E2EA]
                bg-[#F8FAFC]
                px-4
                font-['Montserrat']
                text-[14px]
                font-normal
                text-[#334155]
                outline-none
                placeholder:text-[#9AAEC4]
                focus:border-[#8FA8B9]
              "
            />
          </div>

          {/* Description */}
          <div className="w-full max-w-[1055px]">
            <label
              htmlFor="description"
              className="
                mb-2
                block
                font-['Montserrat']
                text-[13px]
                font-semibold
                leading-5
                text-[#64748B]
                sm:text-[14px]
              "
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the job details in depth..."
              className="
                min-h-[124px]
                w-full
                resize-y
                rounded-[10px]
                border
                border-[#D9E2EA]
                bg-[#F8FAFC]
                px-4
                py-4
                font-['Montserrat']
                text-[14px]
                font-normal
                leading-[140%]
                text-[#334155]
                outline-none
                placeholder:text-[#9AAEC4]
                focus:border-[#8FA8B9]
              "
            />
          </div>

          {/* Photos */}
          <div className="w-full">
            <p
              className="
                mb-3
                font-['Montserrat']
                text-[13px]
                font-semibold
                leading-5
                text-[#64748B]
                sm:text-[14px]
              "
            >
              Photos
            </p>

            <div
              className="
                grid
                grid-cols-3
                gap-3
                sm:flex
                sm:flex-wrap
              "
            >
              {photos.map((photo, index) => (
                <div key={index}>
                  <input
                    ref={(element) => {
                      fileInputRefs.current[index] = element;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handlePhotoChange(index, event)
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRefs.current[index]?.click()
                    }
                    className="
                      relative
                      flex
                      h-[80px]
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-[10px]
                      border-2
                      border-dashed
                      border-[#C7D6E5]
                      bg-[#F8FAFC]
                      transition
                      hover:bg-[#F1F5F9]
                      sm:w-[80px]
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
                        className="h-6 w-6 text-[#91A6BE]"
                        strokeWidth={1.8}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="w-full max-w-[1000px]">
            <label
              htmlFor="location"
              className="
                mb-2
                block
                font-['Montserrat']
                text-[13px]
                font-semibold
                leading-5
                text-[#64748B]
                sm:text-[14px]
              "
            >
              Location
            </label>

            {/* Location input */}
            <div className="relative w-full">
              <MapPin
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-[21px]
                  w-[21px]
                  -translate-y-1/2
                  text-[#91A6BE]
                "
                strokeWidth={2}
              />

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter service location"
                className="
                  h-14
                  w-full
                  rounded-[10px]
                  border
                  border-[#D9E2EA]
                  bg-[#F8FAFC]
                  pl-12
                  pr-4
                  font-['Montserrat']
                  text-[14px]
                  font-normal
                  text-[#334155]
                  outline-none
                  placeholder:text-[#9AAEC4]
                  focus:border-[#8FA8B9]
                "
              />
            </div>

            {/* Current location */}
            <button
              type="button"
              onClick={handleCurrentLocation}
              className="
                mt-2
                flex
                min-h-14
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-[10px]
                border
                border-[#D9E2EA]
                bg-[#F1F5F9]
                px-4
                font-['Montserrat']
                text-[14px]
                font-semibold
                text-[#15516F]
                transition
                hover:bg-[#E8EEF3]
              "
            >
              <LocateFixed
                className="h-5 w-5 shrink-0"
                strokeWidth={2}
              />

              <span>Use current location</span>
            </button>
          </div>
        </div>

        {/* Bottom actions */}
        <div
          className="
            mt-12
            flex
            w-full
            flex-col-reverse
            gap-3
            sm:mt-16
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-[8px]
              border
              border-[#0D2E431F]
              bg-[#E8EDF1]
              px-5
              font-['Montserrat']
              text-[14px]
              font-medium
              text-[#294B60]
              transition
              hover:bg-[#DDE4E9]
              sm:w-[90px]
            "
          >
            Cancel
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-[8px]
              border
              border-[#0D2E431F]
              bg-[#0D2E43]
              px-5
              font-['Montserrat']
              text-[14px]
              font-semibold
              text-white
              transition
              hover:bg-[#123B54]
              sm:w-[90px]
            "
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}