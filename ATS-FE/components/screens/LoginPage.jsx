import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from '../ui-components/FormContainer';
import InputField from '../ui-components/InputField';
import Button from '../ui-components/Button';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = "https://applicant-tracking-system-backend-aqpr.onrender.com";
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("userRole", data.role);

      // Navigate based on user role
      if (data.role === "Recruiter") {
        navigate("/recruiter-dashboard");
      } else if (data.role === "applicant") {
        navigate("/applicant-dashboard"); // if implemented
      } else {
        navigate("/not-authorized");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Login">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Don't have an account?
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="ml-3 px-3 py-1 text-sm"
        >
          Sign Up
        </Button>
      </p>
    </FormContainer>
  );
}
