import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const FILTERS = {
    status: ["Applied", "Phone Screening", "Technical Assessment", "Interview", "Offer"],
    role: ["Frontend Developer", "UIUX Designer"],
    location: ["Onsite", "Hybrid", "Remote"],
};

const CandidateRow = ({ candidate }) => (
    <tr className="border-t text-sm">
        <td className="p-4 font-medium text-gray-900">{candidate.fullName}</td>
        <td className="p-4">{candidate.location}</td>
        <td className="p-4">{candidate.jobTitle}</td>
        <td className="p-4">{new Date(candidate.createdAt).toLocaleDateString()}</td>
        <td className="p-4 text-right">...</td>
    </tr>
);

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [filters, setFilters] = useState({ status: [], role: [], location: [] });
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCandidates = async () => {
        try {
            const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE4YjQxNTk5NzMwMDU3ZTI1OTgyZjUiLCJlbWFpbCI6ImhyQHJ5ZGVzeW5jLmNvbSIsInJvbGUiOiJSZWNydWl0ZXIiLCJpYXQiOjE3NDY3MTA2NDIsImV4cCI6MTc0NjcxMTU0Mn0.KS6b4eNpQL4etKSh6Ue3KDdEaW37DGPH6zO-UP-FhmA'; // manually insert token here
            const res = await axios.get('https://applicant-tracking-system-backend-aqpr.onrender.com/api/v1/candidates', {
                headers: { Authorization: token },
                params: {
                    search,
                    page,
                    status: filters.status.join(','),
                    role: filters.role.join(','),
                    location: filters.location.join(',')
                }
            });
            setCandidates(res.data.data);
            console.log('Candidates fetched successfully:', res.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error('Failed to fetch candidates:', err);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [filters, search, page]);

    const handleCheckbox = (group, value) => {
        setFilters(prev => {
            const isChecked = prev[group].includes(value);
            return {
                ...prev,
                [group]: isChecked ? prev[group].filter(v => v !== value) : [...prev[group], value]
            };
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-green-800">All Candidates</h1>
                <Button className="bg-green-700 text-white">View all Roles</Button>
            </div>

            <div className="flex items-center gap-4">
                <Input
                    type="text"
                    placeholder="Search"
                    className="max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline" onClick={() => setFiltersVisible(!filtersVisible)}>
                    <Filter className="w-4 h-4 mr-1" /> Filter
                </Button>
            </div>

            {filtersVisible && (
                <div className="border p-4 rounded shadow-sm bg-white">
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(FILTERS).map(([key, options]) => (
                            <div key={key}>
                                <h3 className="font-semibold mb-2 capitalize">{key}</h3>
                                {options.map(option => (
                                    <label key={option} className="block">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={filters[key].includes(option)}
                                            onChange={() => handleCheckbox(key, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-xl shadow-sm">
                <table className="min-w-full text-sm text-left border rounded-xl">
                    <thead className="bg-green-100 text-green-900">
                    <tr>
                        <th className="p-4 font-semibold">Name</th>
                        <th className="p-4 font-semibold">Location</th>
                        <th className="p-4 font-semibold">Job position</th>
                        <th className="p-4 font-semibold">Applied Date</th>
                        <th className="p-4"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {candidates.map(candidate => (
                        <CandidateRow key={candidate._id} candidate={candidate} />
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                >
                    <ChevronLeft className="w-4 h-4" /> Previous
                </Button>
                <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                >
                    Next <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default Candidates;
