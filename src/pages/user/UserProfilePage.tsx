
import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import defaultAvatar from "../../assets/userHero.png";
import clientApi from "../../services/clientApi";
import {
  FiBell,
  FiCamera,
  FiChevronRight,
  FiLogOut,
  FiShield,
} from "react-icons/fi";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState(
    () => localStorage.getItem("userProfilePhotoUrl") || defaultAvatar
  );
  const [uploading, setUploading] = useState(false);

  const handlePhotoChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must not be larger than 10MB.");
      event.target.value = "";
      return;
    }

    const previousAvatar = avatar;
    const previewUrl = URL.createObjectURL(file);

    setAvatar(previewUrl);
    setUploading(true);

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await clientApi.patch(
        "/profile/me/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const photoUrl = response.data?.data?.photoUrl;

      if (!photoUrl) {
        throw new Error("Photo uploaded, but no photo URL was returned.");
      }

      setAvatar(photoUrl);
      localStorage.setItem("userProfilePhotoUrl", photoUrl);

      URL.revokeObjectURL(previewUrl);
      alert("Profile picture updated successfully!");
    } catch (error: any) {
      setAvatar(previousAvatar);
      URL.revokeObjectURL(previewUrl);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to update profile picture. Please try again."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const settingsAnimation = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-[1117px] bg-[#F7FAF9] px-0 pt-[22px]"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]"
      >
        Profile
      </motion.h1>

      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        whileHover={{
          boxShadow: "0px 8px 24px rgba(22, 77, 111, 0.07)",
        }}
        className="mt-[38px] flex h-[161px] w-[1000px] items-center gap-[240px] rounded-[10px] border border-[#D8E0DE] bg-[#F7FAF9]"
      >
        <div className="ml-[48px] flex h-[128px] w-[427px] items-center gap-[40px]">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            className="relative flex-shrink-0"
          >
            <div className="h-[128px] w-[128px] overflow-hidden rounded-full border-[4px] border-white shadow-md">
              <motion.img
                src={avatar}
                alt="Emeka Johnson"
                className="h-full w-full object-cover"
                onError={() => setAvatar(defaultAvatar)}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />

            <motion.button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              title="Change profile picture"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-3 right-[-1px] flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 border-white bg-[#164D6F] text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiCamera className="h-3.5 w-3.5" />
            </motion.button>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="font-['Inter'] text-[20px] font-bold text-[#182536]">
              Emeka Johnson
            </h2>

            <p className="mt-1 font-['Inter'] text-[14px] text-[#7B8FA3]">
              emekajohnson@gmail.com
            </p>

            <AnimatePresence>
              {uploading && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-1 text-xs text-[#164D6F]"
                >
                  Uploading picture...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Edit profile */}
        <motion.button
          type="button"
          onClick={() => navigate("edit")}
          whileHover={{
            scale: 1.03,
            backgroundColor: "#164D6F",
            color: "#FFFFFF",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="mr-[40px] h-[48px] w-[337px] rounded-[12px] border border-[#164D6F] bg-transparent font-['Inter'] text-[16px] font-semibold text-[#164D6F]"
        >
          Edit profile
        </motion.button>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.12,
          delayChildren: 0.3,
        }}
        className="mt-[32px] w-[1000px] space-y-[18px]"
      >
        {/* Notifications */}
        <motion.button
          variants={settingsAnimation}
          transition={{ duration: 0.4, ease: "easeOut" }}
          type="button"
          className="flex h-[58px] w-full items-center justify-between rounded-[16px] border border-[#F9FAFB] bg-white px-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate("/dashboard/notifications")}
        >
          <div className="flex items-center gap-4">
            <motion.span
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FiBell className="h-[22px] w-[22px] text-[#164D6F]" />
            </motion.span>

            <span className="font-['Inter'] text-[14px] text-[#182536]">
              Notifications
            </span>
          </div>

          <div className="flex items-center gap-4">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.55 }}
              className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-semibold text-white"
            >
              3
            </motion.span>

            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronRight className="h-5 w-5 text-[#9BA8B2]" />
            </motion.span>
          </div>
        </motion.button>

        {/* Privacy */}
        <motion.button
          variants={settingsAnimation}
          transition={{ duration: 0.4, ease: "easeOut" }}
          type="button"
          onClick={() => navigate("security")}
          className="flex h-[58px] w-full items-center justify-between rounded-[16px] border border-[#F9FAFB] bg-white px-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-4">
            <motion.span
              whileHover={{ rotate: -12, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FiShield className="h-[22px] w-[22px] text-[#164D6F]" />
            </motion.span>

            <span className="font-['Inter'] text-[14px] text-[#182536]">
              Privacy & Security
            </span>
          </div>

          <motion.span
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronRight className="h-5 w-5 text-[#9BA8B2]" />
          </motion.span>
        </motion.button>

        {/* Logout */}
        <motion.button
          variants={settingsAnimation}
          transition={{ duration: 0.4, ease: "easeOut" }}
          type="button"
          className="flex h-[58px] w-full items-center gap-4 rounded-[16px] border border-[#FEE2E2] bg-white px-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <motion.span
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <FiLogOut className="h-[22px] w-[22px] text-[#EF4444]" />
          </motion.span>

          <span className="font-['Montserrat'] text-[14px] font-semibold text-[#EF4444]">
            Log Out
          </span>
        </motion.button>
      </motion.div>

      {/* Back */}
      <motion.button
        type="button"
        onClick={() => navigate(-1)}
        whileHover={{
          scale: 1.04,
          backgroundColor: "#164D6F",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="mt-[427px] flex h-12 w-[90px] items-center justify-center rounded-lg border border-[#0D2E431F] bg-[#0D2E43] font-['Inter'] text-[14px] font-medium text-white"
      >
        Back
      </motion.button>
    </motion.div>
  );
}
