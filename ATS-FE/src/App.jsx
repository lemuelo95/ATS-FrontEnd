import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from '../components/screens/SignUpPage.jsx';
import SelectRolePage from '../components/screens/SelectRolePage.jsx';
import CompanyDetailsPage from '../components/screens/CompanyDetailsPage.jsx';
import LoginPage from '../components/screens/LoginPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/choose-role" element={<SelectRolePage />} />
        <Route path="/company-info" element={<CompanyDetailsPage />} />
        {/* Add more routes for Applicant or HR dashboard here */}
      </Routes>
    </Router>
  );
}
