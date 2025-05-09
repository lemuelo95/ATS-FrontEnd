import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from '../ui-components/FormContainer';
import Button from '../ui-components/Button';
import toast, {Toaster} from 'react-hot-toast';

export default function SelectRolePage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!role) {
      toast.error("Please select a role to proceed.");
      return;
    }

    if (role === "Applicant") {
      try {
        const API_URL = "https://applicant-tracking-system-backend-aqpr.onrender.com";
        const signUpData = JSON.parse(localStorage.getItem("signUpData"));
        
        const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...signUpData,
            role: "Applicant"
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Sign up failed");
        }

        localStorage.removeItem("signUpData");
        toast.success("Account created successfully! Please login to continue.");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Wait 3 seconds before navigating
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      navigate("/company-info");
    }
  };

    //   if (role === "Applicant") {
  //     try {
  //       const API_URL = "https://applicant-tracking-system-backend-aqpr.onrender.com";
  //       const signUpData = JSON.parse(localStorage.getItem("signUpData"));
        
  //       const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           ...signUpData,
  //           role: "Applicant"
  //         }),
  //       });

  //       const data = await response.json();
        
  //       if (!response.ok) {
  //         throw new Error(data.message || "Sign up failed");
  //       }

  //       // Clear the stored sign-up data
  //       localStorage.removeItem("signUpData");
        
  //       toast.success("Account created successfully! Please login to continue.");
  //       navigate("/login");
  //     } catch (err) {
  //       toast.error(err.message);
  //     }
  //   } else {
  //     // For HR/Recruiter, just navigate to company details
  //     navigate("/company-info");
  //   }
  // };

  return (
    <>
    {/* <Toaster position="top-center" reverseOrder={false} /> */}
          <FormContainer title="Choose your role">
            <div className="space-y-6">
              {["Applicant", "HR/Recruiter"].map((item) => (
                <label
                  key={item}
                  className={`flex items-center justify-between border rounded-md px-4 py-3 cursor-pointer transition-all duration-300 ${
                    role === item ? "border-gray-500 bg-green-50" : "hover:border-green-400"
                  }`}
                  onClick={() => setRole(item)}
                >
                  <span className="text-lg font-medium">{item}</span>
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      role === item ? "bg-green-500 border-green-500" : "border-gray-400 group-hover:border-green-400"
                    }`}
                  >
                    {role === item && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </label>
              ))}
            </div>

            <Button onClick={handleNext} className="mt-8">
              Next
            </Button>
          </FormContainer>
          </>
  );
}
