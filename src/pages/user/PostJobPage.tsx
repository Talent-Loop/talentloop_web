import { useRef, useState } from "react";
import {
  Camera,
  ChevronDown,
  LocateFixed,
  MapPin,
} from "lucide-react";

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
      updated[index] = imageUrl;
      return updated;
    });
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      },
      () => {
        alert("Unable to get your current location.");
      },
    );
  };

  const handleNext = () => {
    console.log({
      category,
      jobTitle,
      description,
      photos,
      location,
    });

    // Add your next-step navigation / API submission here.
  };

  return (
    <main className="relative min-h-[1117px] w-full bg-[#F8FAFA]">
      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}

      <div className="relative min-h-[1117px] w-[1179px]">
        {/* PAGE TITLE */}
        <h1
          className="
            absolute
            left-[10px]
            top-[22px]
            h-[32px]
            w-[122px]
            whitespace-nowrap
            font-['Inter']
            text-[24px]
            font-bold
            leading-[32px]
            tracking-[0px]
            text-[#1E293B]
          "
        >
          Post a Job
        </h1>

        {/* =====================================================
            JOB DETAILS
        ====================================================== */}

        <section className="absolute left-[10px] top-[84px]">
          {/* Job Details */}
          <h2
            className="
              h-[24px]
              w-[114px]
              whitespace-nowrap
              font-['Montserrat']
              text-[20px]
              font-semibold
              leading-[120%]
              text-[#1E293B]
            "
          >
            Job Details
          </h2>

          {/* Subtitle */}
          <p
            className="
              mt-0
              h-[20px]
              w-[191px]
              whitespace-nowrap
              font-['Montserrat']
              text-[14px]
              font-normal
              leading-[140%]
              text-[#1E293B]
            "
          >
            Tell us more about your job
          </p>
        </section>

        {/* =====================================================
            CATEGORY
        ====================================================== */}

        <div className="absolute left-[10px] top-[160px] w-[531px]">
          <label
            htmlFor="category"
            className="
              mb-[8px]
              block
              font-['Montserrat']
              text-[14px]
              font-semibold
              leading-[20px]
              text-[#64748B]
            "
          >
            Category
          </label>

          <div className="relative h-[56px] w-[531px]">
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="
                h-[56px]
                w-[531px]
                appearance-none
                rounded-[10px]
                border
                border-[#D9E2EA]
                bg-[#F8FAFC]
                px-[16px]
                pr-[48px]
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
                right-[18px]
                top-1/2
                h-[18px]
                w-[18px]
                -translate-y-1/2
                text-[#64748B]
              "
            />
          </div>
        </div>

        {/* =====================================================
            JOB TITLE
        ====================================================== */}

        <div className="absolute left-[10px] top-[266px] w-[532px]">
          <label
            htmlFor="job-title"
            className="
              mb-[8px]
              block
              h-[20px]
              font-['Montserrat']
              text-[14px]
              font-semibold
              leading-[20px]
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
            placeholder="e.g. Fix leaking kitchen pipe"
            className="
              h-[56px]
              w-[532px]
              rounded-[10px]
              border
              border-[#D9E2EA]
              bg-[#F8FAFC]
              px-[16px]
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

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <div className="absolute left-[10px] top-[374px] w-[1055px]">
          <label
            htmlFor="description"
            className="
              mb-[8px]
              block
              h-[20px]
              font-['Montserrat']
              text-[14px]
              font-semibold
              leading-[20px]
              text-[#64748B]
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
              h-[124px]
              w-[980px]
              resize-none
              rounded-[10px]
              border
              border-[#D9E2EA]
              bg-[#F8FAFC]
              px-[16px]
              py-[16px]
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

        {/* =====================================================
            PHOTOS
        ====================================================== */}

        <div className="absolute left-[10px] top-[550px] w-[681px]">
          <p
            className="
              mb-[12px]
              font-['Montserrat']
              text-[14px]
              font-semibold
              leading-[20px]
              text-[#64748B]
            "
          >
            Photos
          </p>

          <div className="flex h-[80px] items-center gap-[12px]">
            {photos.map((photo, index) => (
              <div key={index}>
                <input
                  ref={(element) => {
                    fileInputRefs.current[index] = element;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handlePhotoChange(index, event)}
                />

                <button
                  type="button"
                  onClick={() => fileInputRefs.current[index]?.click()}
                  className="
                    relative
                    flex
                    h-[80px]
                    w-[80px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[10px]
                    border-[2px]
                    border-dashed
                    border-[#C7D6E5]
                    bg-[#F8FAFC]
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
                      className="
                        h-[24px]
                        w-[24px]
                        text-[#91A6BE]
                      "
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            LOCATION
        ====================================================== */}

        <div className="absolute left-[10px] top-[700px] w-[980px]">
          <label
            htmlFor="location"
            className="
              mb-[8px]
              block
              font-['Montserrat']
              text-[14px]
              font-semibold
              leading-[20px]
              text-[#64748B]
            "
          >
            Location
          </label>

          {/* Location input */}
          <div className="relative h-[56px] w-[1000px]">
            <MapPin
              className="
                pointer-events-none
                absolute
                left-[16px]
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
                h-[56px]
                w-[980px]
                rounded-[10px]
                border
                border-[#D9E2EA]
                bg-[#F8FAFC]
                pl-[48px]
                pr-[16px]
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

          {/* Use current location */}
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="
              mt-[8px]
              flex
              h-[56px]
              w-[980px]
              items-center
              justify-center
              gap-[10px]
              rounded-[10px]
              border
              border-[#D9E2EA]
              bg-[#F1F5F9]
              font-['Montserrat']
              text-[14px]
              font-semibold
              text-[#15516F]
            "
          >
            <LocateFixed
              className="h-[20px] w-[20px]"
              strokeWidth={2}
            />

            <span>Use current location</span>
          </button>
        </div>

        {/* =====================================================
            BOTTOM ACTIONS
        ====================================================== */}

        {/* Cancel */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            absolute
            left-[10px]
            top-[990px]
            flex
            h-[48px]
            w-[90px]
            items-center
            justify-center
            gap-[10px]
            rounded-[8px]
            border
            border-[#0D2E431F]
            bg-[#E8EDF1]
            px-[10px]
            font-['Montserrat']
            text-[14px]
            font-medium
            text-[#294B60]
          "
        >
          Cancel
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={handleNext}
          className="
            absolute
            left-[900px]
            top-[1003px]
            flex
            h-[48px]
            w-[90px]
            items-center
            justify-center
            gap-[10px]
            rounded-[8px]
            border
            border-[#0D2E431F]
            bg-[#0D2E43]
            px-[10px]
            font-['Montserrat']
            text-[14px]
            font-semibold
            text-white
          "
        >
          Next
        </button>
      </div>
    </main>
  );
}