import { Routes, Route } from "react-router-dom"

// Import your pages
import JobPostings from "../sidebar menu components/job-postings.jsx"
import Candidates from "../sidebar menu components/candidates.jsx"


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/job-postings" element={<JobPostings />} />
            <Route path="/candidates" element={<Candidates />} />
        </Routes>
    )
}
