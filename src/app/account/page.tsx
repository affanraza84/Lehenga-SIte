"use client";
import { SignedIn, SignedOut, SignInButton, UserProfile, SignOutButton } from "@clerk/nextjs";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";

// Profile SVG Illustration - Enhanced
const ProfileIllustration = () => (
  <motion.svg
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
    viewBox="0 0 200 200"
    className="w-32 h-32 mb-6"
  >
    {[...Array(8)].map((_, i) => {
      const angle = i * 45 * (Math.PI / 180);
      const radius = 120;
      const x = 100 + Math.cos(angle) * radius;
      const y = 100 + Math.sin(angle) * radius;

      return (
        <motion.g key={i}>
          <motion.circle
            cx={x}
            cy={y}
            r="3"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              delay: 1.8 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        </motion.g>
      );
    })}
  </motion.svg>
);

// Enhanced Security Shield SVG
const SecurityShield = () => (
  <motion.svg
    initial={{ y: 30, opacity: 0, rotate: -10 }}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    viewBox="0 0 100 100"
    className="w-16 h-16"
  ></motion.svg>
);

// Enhanced Welcome Message Component
const WelcomeMessage = () => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
    className="text-center mb-12"
  >
    <motion.h1
      className="text-5xl md:text-6xl font-bold mb-4 pt-32"
      style={{
        background:
          "linear-gradient(45deg, #2C1810, #D2691E, #F4A460, #2C1810)",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    >
      Account Dashboard
    </motion.h1>
    <motion.div
      className="w-24 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460] mx-auto mb-4 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: 96 }}
      transition={{ duration: 1, delay: 0.8 }}
    />
    <motion.p
      className="text-[#2C1810]/70 text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      Manage your profile and settings with style
    </motion.p>
  </motion.div>
);

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F6F1] via-[#FDF8F3] to-[#F5F0E8] mt-20 z-0" />

      {/* Navbar - Fixed positioning */}
      <div className="relative z-50">
        <div className="sticky top-0 w-full bg-[#EDE2D4]/95 backdrop-blur-md shadow-md">
          <Navbar />
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 relative z-10 mt-12 md:mt-24">
        <SignedIn>
          <div className="w-full max-w-7xl">
            <WelcomeMessage />

            {/* Profile & Sign Out Section */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-[#E5D3B3]/50 overflow-hidden relative">
                {/* Top gradient border */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2C1810] via-[#D2691E] to-[#F4A460]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 2 }}
                />

                {/* Glowing corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D2691E]/20 to-transparent rounded-bl-3xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#F4A460]/20 to-transparent rounded-tr-3xl" />

                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  className="relative p-8 md:p-12"
                >
                  <UserProfile
                    routing="hash"
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "w-full bg-transparent shadow-none rounded-none border-none",
                        navbar: "hidden",
                        scrollBox: "p-0",
                        profileSectionPrimaryButton:
                          "bg-[#2C1810] hover:bg-[#D2691E] transition-all duration-300 shadow-lg hover:shadow-xl",
                        formButtonPrimary:
                          "bg-[#2C1810] hover:bg-[#D2691E] transition-all duration-300 shadow-lg hover:shadow-xl",
                        headerTitle: "text-3xl font-bold text-[#2C1810] mb-2",
                        headerSubtitle: "text-[#2C1810]/70 text-lg",
                        profileSection: "mb-8",
                        profileSectionContent: "bg-gray-50/50 rounded-xl p-6",
                      },
                      variables: {
                        colorPrimary: "#2C1810",
                        colorDanger: "#DC2626",
                        colorSuccess: "#059669",
                        colorWarning: "#D97706",
                        colorTextOnPrimaryBackground: "#ffffff",
                        colorTextSecondary: "#2C1810",
                        borderRadius: "0.75rem",
                        spacingUnit: "1rem",
                      },
                    }}
                  />

                  {/* Sign Out Button */}
                  <div className="mt-6 flex justify-center">
                    <SignOutButton>
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 15px 30px -10px rgba(44, 24, 16, 0.3)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-3 bg-gradient-to-r from-[#D2691E] via-[#F4A460] to-[#DEB887] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        Sign Out
                      </motion.button>
                    </SignOutButton>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </SignedIn>

        <SignedOut>
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Sign In Card */}
            <div className="bg-white/98 backdrop-blur-xl shadow-2xl rounded-3xl p-12 text-center border border-[#E5D3B3]/50 relative overflow-hidden max-w-lg mx-auto mt-12 md:mt-24">
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-[#D2691E] to-[#F4A460] rounded-3xl p-[3px]"
                animate={{
                  background: [
                    "linear-gradient(45deg, #2C1810, #D2691E, #F4A460)",
                    "linear-gradient(90deg, #D2691E, #F4A460, #2C1810)",
                    "linear-gradient(135deg, #F4A460, #2C1810, #D2691E)",
                    "linear-gradient(180deg, #2C1810, #D2691E, #F4A460)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="bg-white rounded-3xl w-full h-full" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-center">
                  <ProfileIllustration />
                </div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <h2 className="text-4xl mb-4 font-bold">
                    <span className="bg-gradient-to-r from-[#2C1810] via-[#D2691E] to-[#F4A460] bg-clip-text text-transparent">
                      Welcome Back!
                    </span>
                  </h2>
                  <p className="text-[#2C1810]/80 mb-10 text-lg leading-relaxed max-w-md mx-auto">
                    Sign in to access your personalized dashboard and manage your profile with our beautiful interface
                  </p>
                </motion.div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-center mb-10 space-x-4"
                >
                  <SecurityShield />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-[#2C1810]">256-bit Encryption</div>
                    <div className="text-xs text-[#2C1810]/60">Bank-level security</div>
                  </div>
                </motion.div>

                <SignInButton mode="modal" forceRedirectUrl="/account">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(44, 24, 16, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-10 py-5 bg-gradient-to-r from-[#2C1810] via-[#D2691E] to-[#F4A460] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform relative overflow-hidden group"
                  >
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-[#D2691E] via-[#F4A460] to-[#DEB887] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center space-x-3 cursor-pointer">
                      <span>Sign In to Continue</span>
                      <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                  </motion.button>
                </SignInButton>
              </div>
            </div>
          </motion.div>
        </SignedOut>
      </main>
    </div>
  );
}
