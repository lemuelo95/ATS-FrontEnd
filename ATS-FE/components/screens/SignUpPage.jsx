import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FormContainer from '../ui-components/FormContainer';
import InputField from '../ui-components/InputField';
import Button from '../ui-components/Button';

export default function SignUpPage() {
  const [formData, setFormData] = useState({ email: "", fullName: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Store the form data in localStorage for the next steps
    localStorage.setItem("signUpData", JSON.stringify({
      email: formData.email,
      fullName: formData.fullName,
      password: formData.password
    }));
    
    // Navigate to role selection
    navigate("/choose-role");
  };

  return (
    <FormContainer
      title="Sign Up"
      subtitle="It's our great pleasure to have you on board!"
    >
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
          type="text"
          name="fullName"
          placeholder="Enter full name"
          value={formData.fullName}
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

        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Next"}
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          className="ml-3 px-3 py-1 text-sm"
        >
          Login
        </Button>
      </p>
    </FormContainer>
  );
}
