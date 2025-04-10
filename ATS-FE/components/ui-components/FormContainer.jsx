import { motion } from "framer-motion";
import Logo from './Logo';

export default function FormContainer({ children, title, subtitle }) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Small Logo (for desktop only) */}
      <Logo type="secondary" className="hidden md:block absolute mt-10 ml-10" />

      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
        <div className="bg-white text-black p-6 md:p-8 w-full max-w-md md:w-[500px] rounded-lg shadow-md">
          <h1 className="text-3xl md:text-5xl font-bold text-black text-center mb-6 md:mb-10">
            {title}
          </h1>
          {subtitle && (
            <p className="text-center text-sm md:text-base text-black mb-4 md:mb-6">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Right Illustration Section with animation */}
      <motion.div
        className="hidden md:block w-full md:w-1/2 h-64 md:h-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Logo
          type="main"
          className="w-full h-full object-cover rounded-tl-[50px] rounded-bl-[50px]"
        />
      </motion.div>
    </div>
  );
}


