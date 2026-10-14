
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Save,
} from "lucide-react";

const API_BASE_URL =
  "https://backend-talentloop.onrender.com/api/v1";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [firstName, setFirstName] = useState("Dave");
  const [lastName, setLastName] = useState("Ejike");
  const [email, setEmail] = useState("ejikedave@gmail.com");
  const [location, setLocation] = useState("State");
  const [experience, setExperience] = useState("2");

  const [about, setAbout] = useState(
    "Expert plumber with over 2 years of experience in residential and commercial plumbing systems. Specialized in leak detection, pipe installation, and emergency repairs. I pride myself on punctuality and high-quality workmanship."
  );

  // Use the uploaded profile photo instead of the old mock image
  const [profilePhoto, setProfilePhoto] = useState(
    () => localStorage.getItem("profilePhotoUrl") || ""
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");

  // Open file picker
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Upload selected photo
  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setShowSuccess(false);

    // Check file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setError("Please select a JPG, JPEG, or PNG image.");
      event.target.value = "";
      return;
    }

    // Check file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploadingPhoto(true);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Your session has expired. Please login again.");
        return;
      }

      const formData = new FormData();

      formData.append("photo", file);

      const response = await fetch(
        `${API_BASE_URL}/profile/me/photo`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to update profile photo"
        );
      }

      // Save the real Cloudinary photo URL
      if (result?.data?.photoUrl) {
        setProfilePhoto(result.data.photoUrl);

        localStorage.setItem(
          "profilePhotoUrl",
          result.data.photoUrl
        );
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Profile photo upload error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while uploading your photo."
      );
    } finally {
      setUploadingPhoto(false);

      // Allow selecting the same image again
      event.target.value = "";
    }
  };

  // Bio update
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setShowSuccess(false);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Your session has expired. Please login again.");
        return;
      }

      const formData = new FormData();

      formData.append("bio", about);

      const response = await fetch(
        `${API_BASE_URL}/profile/me`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to update profile"
        );
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Update profile error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">
            Edit Profile
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile Photo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Profile Photo
          </h2>

          <div className="flex items-center gap-5">
            <div className="relative">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#DDE3E3] flex items-center justify-center text-xl font-semibold text-[#10344A]">
                  DE
                </div>
              )}

              <button
                type="button"
                onClick={handlePhotoClick}
                disabled={uploadingPhoto}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#10344A] text-white flex items-center justify-center border-2 border-white disabled:opacity-60"
              >
                <Camera size={15} />
              </button>
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Profile Picture
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG or JPEG. Maximum size 5MB.
              </p>

              <button
                type="button"
                onClick={handlePhotoClick}
                disabled={uploadingPhoto}
                className="mt-3 text-sm font-medium text-[#10344A] hover:underline disabled:opacity-60"
              >
                {uploadingPhoto ? "Uploading..." : "Change Photo"}
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Personal Information */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#10344A]"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#10344A]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#10344A]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#10344A]"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>

                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#10344A]"
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              About Me
            </h2>

            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#10344A] resize-none"
              placeholder="Tell clients about yourself..."
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {showSuccess && (
            <div className="mb-5 flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={20} />
              <span>Profile saved successfully.</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-3 rounded-lg bg-[#10344A] text-white flex items-center gap-2 hover:bg-[#0c293a] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
