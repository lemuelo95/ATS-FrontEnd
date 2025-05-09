import React, { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
import { FilterIcon, MoreHorizontal } from "lucide-react"

export function JobPostings() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE4YjQxNTk5NzMwMDU3ZTI1OTgyZjUiLCJlbWFpbCI6ImhyQHJ5ZGVzeW5jLmNvbSIsInJvbGUiOiJSZWNydWl0ZXIiLCJpYXQiOjE3NDY3MDY1MDEsImV4cCI6MTc0NjcwNzQwMX0.RApz4u6GCXyFn0F6YjN8RQraFeuXvYdMVMZmkKxzCuk" // <-- Paste your JWT token here

                const response = await fetch(
                    "https://applicant-tracking-system-backend-aqpr.onrender.com/api/v1/jobs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )

                if (!response.ok) throw new Error("Failed to fetch jobs")
                const data = await response.json()
                setJobs(data.data || [])
                console.log("Jobs fetched successfully:", data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-green-800">Job Postings</h1>
                <Button className="bg-green-700 hover:bg-green-800 text-white">Create Job</Button>
            </div>

            <div className="flex justify-between items-center">
                <Button variant="outline" className="flex items-center gap-1 text-green-800 border-green-200">
                    <FilterIcon className="w-4 h-4" />
                    Filter
                </Button>
            </div>

            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-sm">
                    <table className="min-w-full text-sm text-left border rounded-xl">
                        <thead className="bg-green-100 text-green-900">
                        <tr>
                            <th className="p-4 font-semibold">Job Title</th>
                            <th className="p-4 font-semibold">Department</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Application count</th>
                            <th className="p-4 font-semibold">Date Posted</th>
                            <th className="p-4"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {jobs.map((job, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">{job.title}</td>
                                <td className="p-4">{job.department || "—"}</td>
                                <td className={`p-4 font-semibold ${job.status === "Open" ? "text-green-600" : "text-red-600"}`}>
                                    {job.status}
                                </td>
                                <td className="p-4">{job.applicationCount || "—"}</td>
                                <td className="p-4">{job.createdAt?.slice(0, 10)}</td>
                                <td className="p-4 text-right">
                                    <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default JobPostings
