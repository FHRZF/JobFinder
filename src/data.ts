import { Job, NotificationItem, ApplicationPipelineItem, Project, WorkExperience, UserProfile } from "./types";

export const initialUserProfile: UserProfile = {
  name: "Alex Mercer",
  role: "Student",
  headline: "UX Designer",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkqPYD8AZrGoqyXjsAZ2PMiZ4PKj5O-uOvHO0O6W4fmQOIU02yM8kbVWsfhLhxxy2On36LfqGzfqH6pK6uoON9JfaBh1GO65ZBAEI9zfwbMiFn1_85YVluSpjbqXjTBXLLW6lP1W1sIHRFmeR2qX93K8IgekcM2PTXcIhAUveKGhIwGdyGFW5xNGyZcUCTm6lSIsQR7j9mP0W8YGnn4D05p1OvsN58D9m8TqWVSz3aYW7IAqmsIiZLKxls_ETGErgA1y8EyL6WW7c",
  email: "alex.mercer@example.com",
  phone: "(555) 123-4567",
  summary: "I'm a passionate product designer focused on creating intuitive, human-centered digital experiences. With a background in psychology, I approach design problems by first understanding the user's core needs. Currently seeking opportunities to build impactful products in the tech space.",
  applicationsCount: 24,
  experienceYears: 3.5,
  skills: ["Figma", "Prototyping", "User Research", "Wireframing"]
};

export const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Software Engineer, Core Systems",
    companyName: "TechNova Platforms",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjy8GbXHyUnQZ3FmQLCwnAE2ckilMb0w4OK-ITbXalKCfYTkkM27KU_aapABff7FjXFuVbBUVCgdblhrJy7cnTRYiR1nmCTYb_u5VLV-sZPQf85E_DeqWr8fjvCxYXwovCXEWT6fi_wqFCS-s-w89RjXpnlY05LeMoPJ7ej_ESRrrH5K7TvJyayS9LLaxy3BA9Vv2AFHtvTZpCxE-WhwEMAAAf75Xl6_mi5SzwB7QFFiYr_ia8CgmZqbTqc9_HeTjY9XEmX7Snstg",
    location: "San Francisco, CA (Remote Eligible)",
    salaryRange: "$150k - $190k",
    type: "Full Time",
    experienceLevel: "Senior",
    postedTime: "Posted 2h ago",
    description: "We are looking for an experienced engineer to architect and scale our core transactional systems. You will lead technical decisions, mentor juniors, and drive high-impact features...",
    tags: ["Go", "Kubernetes", "Core Systems"],
    isTopMatch: true,
    isAiMatch: true,
    benefits: [
      "100% Covered Medical/Dental/Vision Premiums",
      "Remote-First with flexible co-working pass",
      "Generous 401(k) Match up to 6%",
      "Wellness Coaching & $150 Monthly Stipend"
    ],
    requirements: [
      "5+ years development experience in Golang, Rust or C++",
      "Strong background in distributed queue structures like Kafka",
      "Experience deploying securely with Docker and Kubernetes",
      "Solid knowledge of relational database caching layers"
    ]
  },
  {
    id: "job-2",
    title: "Frontend Developer (React)",
    companyName: "FinData Analytics",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaHNBhS3GUBERtPAZx075OaKHPSx56WlEUzZKtxWRdpA7emq_3xWnPDP5EtjWt6snKfxGBeMBFRdcqlwARSMyZK3EczRPrvelKg4lxJm3yOA6sK4g6189WErmHMtKvGHGYJ5ZP9GPSMicbCFPEKjm4QG-K4mtLiYFWEdXbpQEeulDk1tBv8kfis2F_JZaCOyarWzYDSxaZhHztW01iY1NnnFP_Syu9T1CZJUZLOh44KLQJXUsG8cnI4vdjo1UzpwebCxKKgXl8Lp8",
    location: "New York, NY (Hybrid)",
    salaryRange: "$120k - $150k",
    type: "Full Time",
    experienceLevel: "Mid-Senior level",
    postedTime: "Posted 5h ago",
    description: "Join our product team to build responsive, data-heavy dashboards for institutional investors. Strong proficiency in React, TypeScript, and modern state management required...",
    tags: ["React", "TypeScript", "Data Viz"],
    benefits: [
      "Flexible hybrid model (2 days office, 3 days remote)",
      "Premium workspace in downtown Manhattan with catered lunch",
      "Unlimited Paid Time Off (PTO)",
      "Tech-stack stipend for home office customization"
    ],
    requirements: [
      "3+ years building complex web client apps in React",
      "Rich expertise with styling utilities like Tailwind CSS",
      "Experience with state management libraries (Redux or Zustand)",
      "Good comprehension of RESTful APIs & WebSocket connections"
    ]
  },
  {
    id: "job-3",
    title: "Software Engineer, Internal Tools",
    companyName: "Enterprise Solutions Inc.",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJbyG_1uZLguRDuXpwL7YuIV6kYv-gh85nfTih-isexmy7vtNDjk6MCMDM0jZoR-iulx6VkdiHsTB8hNLZQcf4rNHMc-SXq1ZZ6VAbresTO4SX2NxTi6qG-IkUwgzQwI5Xo3RXBgqVpBbsof0-C8HheOmE0xYLB34igaH8RDgns8p4Iw5vWye30BP0RLOgeuHKhXPYoy0xvjIrQqdgpGiLcezSWRosKXP691NG_qLLuDkxHMOAoFA3v8frRDKl0qGa5n1r1YqAihE",
    location: "Remote Eligible",
    salaryRange: "$110k - $135k",
    type: "Contract",
    experienceLevel: "Mid-Senior level",
    postedTime: "Posted 1d ago",
    description: "Build the tools that power our global workforce. You will work across the stack to create robust internal applications that improve efficiency across all departments...",
    tags: ["Node.js", "Javascript", "Internal Tools"],
    benefits: [
      "100% remote workspace anywhere in North America",
      "Flexible project extensions up to 18 months",
      "Supportive continuous education budget",
      "Direct guidance from premier tech leadership"
    ],
    requirements: [
      "Robust programming credentials in backends using Node.js",
      "Proficient database capability (SQL and MongoDB)",
      "Proven track record creating secure internal admin panels",
      "Detail-oriented style with strong automated testing checks"
    ]
  },
  {
    id: "job-4",
    title: "Senior UX/UI Designer",
    companyName: "Nexis AI Solutions",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAIzHIyQkewHnwM7KEUqueTt8dycUK22yM1W3Q5us3jaEJDxfN8gJcpa6ZvYwfMDYcADBU26Yxv54T3recMGAobJqtQjJssg-FCFoMxv6G6LutVnKCfqimZ5ASWpm1DOnuej6l3EwKVSYgyzVn0eqCn6O6bzec-BzFUuIXU-x2EimyAWLd8TXoqr6ba4mi6Q4bodStWEBWcapV3tAOrYskKL3B6m8VVBTpuyB_6rbxt3KSBtDy8ueZnPvv6dKaBpfgHbvCx8-HWTQ",
    location: "San Francisco, CA (Hybrid)",
    salaryRange: "$120k - $150k",
    type: "Full Time",
    experienceLevel: "Senior",
    postedTime: "Posted 2 days ago",
    description: "Nexis AI Solutions is at the forefront of combining artificial intelligence with enterprise workflow tools. We are seeking a visionary Senior UX/UI Designer to craft intuitive, compelling experiences for our next-generation platform.",
    tags: ["Figma", "Framer", "Miro", "React (Basic)"],
    isAiMatch: true,
    isTopMatch: false,
    benefits: [
      "Comprehensive medical, dental, and health coverage",
      "Remote flexibility with beautiful office hub access",
      "Competitive equity stock packages",
      "Complimentary dynamic workspace setup"
    ],
    requirements: [
      "5+ years crafting stellar UX wireframing and design maps",
      "Advanced proficiency in modern tools like Figma and Framer",
      "Strong portfolio reflecting interactive application design cases",
      "Basic frontend markup understanding (HTML/CSS/React elements)"
    ]
  },
  {
    id: "job-5",
    title: "Senior Product Designer",
    companyName: "TechFlow Inc.",
    companyLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_yR7518VD70Dl_0NU0r5sEOUP5NvXcQ7ELADXhYCwjMeusIG7z2GvCap6RPvzzjpJ66vFFSxoAbiTtGrWsU8J0ZNQ8R5b2KYF93WwIxhxZOBPxtGfrSuT1EEe6LD5liZZqlVJ-Zmv6otdoTAxlHNfWygthcMik93k4YjX011THbm0UbNFzBgwQ1Xk6qhGrlN3OTB9zp0_dMigjEvO7fhIvtd1fkEZumTfLUg7WE1jd_YperrKFoQH97UwW688iy9xWDcfcXG2Z_E",
    location: "San Francisco, CA (Hybrid)",
    salaryRange: "$120k - $150k",
    type: "Full Time",
    experienceLevel: "Mid-Senior level",
    postedTime: "Posted 3 days ago",
    description: "Focus on designing core product experiences that translate advanced AI recommendations into structured interactive widgets. You will work within our premier UX team...",
    tags: ["UI/UX Design", "Figma", "SaaS Dashboard"],
    isAiMatch: true,
    benefits: [
      "Catered daily gourmet meals in office",
      "Generous health premium coverage",
      "Direct transit stipend or parking support",
      "Annual growth learning grant"
    ],
    requirements: [
      "4+ years designing high-impact SaaS widgets or boards",
      "Detail visual mastery with Figma components system",
      "Solid soft communication skills for cross-team coordination"
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Interview Invitation",
    company: "FinTech Global",
    details: "FinTech Global has invited you to a first-round technical interview for the Junior Data Analyst position.",
    time: "2h ago",
    type: "invitation",
    isNew: true
  },
  {
    id: "notif-2",
    title: "New Strong Match",
    company: "Nova Systems",
    details: "Based on your updated resume, we found a highly relevant Product Design role at Nova Systems. You are in the top 10% of applicants.",
    time: "4h ago",
    type: "match",
    isNew: true
  },
  {
    id: "notif-3",
    title: "Application Viewed",
    company: "Apex Marketing",
    details: "Your application for Marketing Coordinator at Apex Marketing was just reviewed by the hiring team.",
    time: "1d ago",
    type: "viewed",
    isNew: false
  },
  {
    id: "notif-4",
    title: "Profile Optimization Complete",
    company: "System Optimizer",
    details: "Your profile has been successfully re-indexed. You are now visible to recruiters searching for your core skills.",
    time: "2d ago",
    type: "optimization",
    isNew: false
  }
];

export const initialPipeline: ApplicationPipelineItem[] = [
  {
    id: "pipe-1",
    jobTitle: "Product Designer",
    companyName: "TechNova Solutions",
    location: "San Francisco, CA",
    status: "Interview",
    appliedDate: "Oct 12, 2023",
    interviewDate: "Tomorrow • 2:00 PM EST"
  },
  {
    id: "pipe-2",
    jobTitle: "Data Analyst",
    companyName: "FinServe Inc.",
    location: "New York, NY",
    status: "Reviewing",
    appliedDate: "Applied 1w ago"
  },
  {
    id: "pipe-3",
    jobTitle: "UX Researcher",
    companyName: "Creative Cloud Co.",
    location: "Remote Eligible",
    status: "Submitted",
    appliedDate: "Applied 2d ago"
  },
  {
    id: "pipe-4",
    jobTitle: "Frontend Engineer",
    companyName: "StartupX",
    location: "San Francisco, CA",
    status: "Closed",
    appliedDate: "Archived"
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "FinTech Dashboard Redesign",
    description: "A complete UX/UI overhaul of a legacy financial application, resulting in a 40% increase in user engagement and streamlined transaction flows.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYlq80gXonlqy1GHLCu9t8vrg0BxPZSYvZBdDnEUBAiiIXFCvrntteLTsgd9c-ukXm7cxK87O1liPQ-E_53d9SjjzYc57sYitQXzmlfIc72hNK2P8UeNTUJfWOJXuTu5fIB6A_wFcayF50x0qmUhR2VVc4eWtUYGTeuMVyTooXlILJAISu2Ap1p8vjgBErR6IwyJ3Rcy1KTUF55oCC_VF4griDecoNI2hsvXRPecrGqdxEK0_BO32VzFTb4oRjmkEjDcA4zcJAIo8",
    tags: ["UX Design", "Figma", "Data Viz"],
    isFeatured: true
  },
  {
    id: "proj-2",
    title: "Eco-Brand Identity",
    description: "Comprehensive branding package for a sustainable startup, including logo, packaging, and digital assets.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXMbs9VvJkL1iRsbUHesvw38SsRcZ7QJeLfLgVKOHpegetR8jIQxArvqDdaWd21dIq0eNGIwf9PGHY7-VDR9ThE4pWI-4LGNsNsWeOykojNMVQDEzudLlkiYfwglZQHnX3M234RyNXjxG22skWhSdeZuTjNLthuL3ZB4AnetRMNlKfGWAj6MLL5WvEpFwEUh8uQEf3IysMez0OzJ9pEBUk5dyhIpVf_qW4QQVYSSE4nqc-zc_cTtLVeZlnkRvjOyJx0hFfyZhhgBg",
    tags: ["Branding", "Illustrator"]
  },
  {
    id: "proj-3",
    title: "Habit Tracker App",
    description: "A React Native application designed to help users build positive daily routines with gamified rewards.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0z63OQ9py12DT0O09DJqS-tA1zPl4TdulT-teSSCU44pUoR2ZwYD2K1DjgjTeRMegTwDT0Cjxwur3yImIyK2dgBJ-jhJFEIFO1v0jTk6JOfkwA8whMJMDzkPvPJKt3J7bsNb2RJHouHCAKQ3GM32BH4g1jxe2ycFfUebZvdmgWfjxK8dLpocuv1HI7XkIwkdTKQJ9jVVd-7q6hNn89JDE1NGjDPe2yqGmNzONPSx9YHI3PR4PxXIR77VDox7gTvIRuBq2zbUc1MM",
    tags: ["Mobile Dev", "React"]
  }
];

export const initialWorkExperiences: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Junior UX Designer",
    company: "Creative Agency Inc.",
    duration: "2022 - Present"
  },
  {
    id: "exp-2",
    role: "Design Intern",
    company: "Tech Startup XYZ",
    duration: "Summer 2021"
  }
];
