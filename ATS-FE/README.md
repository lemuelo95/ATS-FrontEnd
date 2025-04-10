# RydeSync ATS - Frontend (Web)

RydeSync ATS is a modern and scalable Applicant Tracking System designed to streamline the hiring process for recruiters and HR teams. This repository hosts the **frontend** for the web platform, built using **React.js**, **Tailwind CSS**, and **Shadcn UI**, with a focus on clean UI, responsive design, and seamless user experience.

---

## 📌 Features

- 📝 Job Posting Management (create/edit/delete job openings)
- 🔍 Candidate Search & Filtering (keyword, experience, skills)
- 📋 Dashboard Overview (jobs, applicants, recruitment trends)
- 👤 Role-Based Login (Admin, Recruiter, Hiring Manager)
- 📊 Reports & Analytics (time-to-hire, source effectiveness)
- 🔔 Notification System Integration
- ⚙️ Fully responsive and mobile-first design

---

## 💻 Tech Stack

| Layer        | Technology                       |
|-------------|----------------------------------|
| Framework   | React.js                         |
| Styling     | Tailwind CSS, Shadcn UI          |
| Routing     | React Router                     |
| State Mgmt  | Context API / Redux              |
| API Calls   | Axios                            |
| Auth        | JWT-based auth (via backend)     |
| Hosting     | Vercel (for Web Frontend)        |

---


 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const { fullName, email, password, passwordconfirm } = formData;
  
    if (isSignUp && password !== passwordconfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
  
    console.log("Submitted Data:", { fullName, email, password });
  
    // Simulate success - replace with real API call
    // setTimeout(() => setLoading(false), 1000);
  };