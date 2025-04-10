import { useState } from "react";
import useCompanyStore from "../stores/useCompanyStore.jsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import FormContainer from '../ui-components/FormContainer';
import InputField from '../ui-components/InputField';
import Button from '../ui-components/Button';


export default function CompanyDetailsPage() {
    const { companyName, setCompanyName, companyEmail, setCompanyEmail } = useCompanyStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async () => {
        if (!companyName || !companyEmail) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!validateEmail(companyEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const API_URL = "https://applicant-tracking-system-backend-aqpr.onrender.com";
            const signUpData = JSON.parse(localStorage.getItem("signUpData"));
            
            const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...signUpData,
                    role: "HR/Recruiter",
                    companyName,
                    companyEmail
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Sign up failed");
            }

            // Clear the stored sign-up data
            localStorage.removeItem("signUpData");
            
            toast.success("Account created successfully! Please login to continue.");
            navigate("/login");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

        
                <FormContainer title="Fill HR Details">
                    <div className="space-y-6">
                        <InputField
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <InputField
                            type="email"
                            name="companyEmail"
                            placeholder="Company Email"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-8"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </FormContainer>
            </>
    );
}
