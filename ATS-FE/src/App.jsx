import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from '../components/screens/SignUpPage.jsx';
import SelectRolePage from '../components/screens/SelectRolePage.jsx';
import CompanyDetailsPage from '../components/screens/CompanyDetailsPage.jsx';
import LoginPage from '../components/screens/LoginPage.jsx';
import { Toaster } from 'react-hot-toast';
import RecruiterDashboard from "@/recruiter-dashboard.jsx";
export default function App() {
  return (
    <Router>
      {/* Global Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/choose-role" element={<SelectRolePage />} />
        <Route path="/company-info" element={<CompanyDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        {/* Add more routes for Applicant or HR dashboard here */}
      </Routes>
    </Router>
  );
}
