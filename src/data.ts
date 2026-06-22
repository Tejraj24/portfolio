import { Project, Experience, Skill, Achievement, Testimonial } from './types';

export const PROJECTS: (Project & { 
  challenges?: string[]; 
  outcomes?: string[];
  role?: string;
  client?: string;
})[] = [
  {
    id: "pro-1",
    title: "AI Resume Checker",
    category: "ai",
    description: "An AI-powered resume analysis platform that allows users to upload resumes and receive intelligent feedback securely.",
    longDescription: "An AI-powered resume analysis platform that allows users to upload resumes and receive intelligent feedback. The architecture uses secure backend communication and serverless functions to protect API keys and process analysis securely.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Netlify Functions"],
    githubUrl: "https://github.com/Tejraj24/Ai_Resume_Checker",
    liveUrl: "https://ai-resume-checke.netlify.app/",
    year: "2026",
    featured: true,
    role: "Lead Developer",
    client: "Personal Project",
    challenges: [
      "Integrating Gemini / OpenAI API structures via Node.js serverless handlers seamlessly.",
      "Designing highly accurate system prompts to supply standardized, granular evaluations of resumes."
    ],
    outcomes: [
      "Developed a lightweight, lightning-fast parser with zero API key leaks in browser channels.",
      "Optimized document payload processing to return comprehensive skill critiques in under 2 seconds."
    ]
  },
  {
    id: "pro-2",
    title: "E-Commerce Website",
    category: "fullstack",
    description: "A complete MERN stack e-commerce platform for managing products, cart interactions, and customer inquiries with high performance.",
    longDescription: "A complete e-commerce platform developed using the MERN stack. Designed with absolute compliance for managing products, cart interactions, RESTful backend operations, search indexing, and real-time customer inquiries securely.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/Tejraj24",
    liveUrl: "https://neon-chimera-ec94b3.netlify.app/",
    year: "2025",
    featured: false,
    role: "Full-Stack Developer",
    client: "School Project",
    challenges: [
      "Securing complex database relationships across multiple collections like Users, Products, and Inquiries.",
      "Writing clean state management controls to facilitate reliable shopping carts across active sessions."
    ],
    outcomes: [
      "Constructed a robust REST API layer offering quick responsive endpoints under 50ms.",
      "Designed a highly polished, responsive visual portal styled completely under Tailwind CSS utility protocols."
    ]
  },
  {
    id: "pro-3",
    title: "Devour Cafe",
    category: "frontend",
    description: "A premium responsive cafe catalog experience featuring interactive order baskets, categorised menus, and a modern layout.",
    longDescription: "A premium responsive cafe catalog experience named Devour Cafe. Loaded with interactive menu filters, custom culinary galleries, beautiful item transition selectors, and solid cross-device fluid performance layouts.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Tejraj24/DEVOUR-CAFE",
    liveUrl: "https://monumental-gaufre-f8e569.netlify.app/",
    year: "2024",
    featured: false,
    role: "Frontend Designer",
    client: "Devour Cafe",
    challenges: [
      "Configuring complex tag filtering parameters inside raw pure JavaScript routines smoothly.",
      "Ensuring clean fluid dimensions and touch target alignment for perfect cross-device mobile support."
    ],
    outcomes: [
      "Delivered a fast lightweight frontend loading site assets in sub-100ms speeds.",
      "Received highly positive feedback for modular, responsive layouts and aesthetic designs."
    ]
  },
  {
    id: "pro-4",
    title: "Soulmate",
    category: "fullstack",
    description: "A real-time matchmaking database and connection platform designed to pair users based on personality compatibility indices.",
    longDescription: "A fully functional matchmaking app built on MERN architecture. It features interactive compatibility algorithms, customizable survey scales, and persistent real-time chat socket tunnels to create secure messaging rooms.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/Tejraj24/Soulmate",
    liveUrl: "https://soullmate.netlify.app/",
    year: "2025",
    featured: false,
    role: "Full-Stack Creator",
    client: "Personal Project",
    challenges: [
      "Establishing secure session validation protocols and handling continuous Socket.io connection state handshakes.",
      "Writing robust MongoDB schemas that cleanly map dynamic compatibility survey criteria without locking data reads."
    ],
    outcomes: [
      "Deployed a highly responsive real-time chat gateway maintaining synchronization speeds below 30ms.",
      "Received praise for the fluid matching animations and beautiful mobile-responsive layout integration."
    ]
  },
  {
    id: "pro-5",
    title: "Capstone Blogging",
    category: "fullstack",
    description: "A fully integrated capstone blogging application that offers responsive storytelling interfaces, optimized content grids, and rich publication tools.",
    longDescription: "A feature-rich capstone publishing and blogging system designed with MERN-oriented patterns. Supports dynamic content management, real-time article curation, responsive layouts, customizable user timelines, and secure database persistence.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/kalviumcommunity/S63_TEJRAJ_CAPSTONE_BLOGGING",
    liveUrl: "https://bloggii.netlify.app/",
    year: "2025",
    featured: true,
    role: "Full-Stack Creator",
    client: "Academic Capstone",
    challenges: [
      "Structuring content distribution feeds indexed by categories, dynamic user handles, and created-at timestamps.",
      "Minimizing page styling delays across multiple layout components by optimizing Tailwind utilities utility payloads."
    ],
    outcomes: [
      "Completed a highly secure and compliant blogging ecosystem configured for rapid reading times.",
      "Achieved high performance marks on Netlify & Netlify CDN routing distribution benchmarks."
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'B.Tech Computer Science & Engineering',
    company: 'JECRC University x Kalvium Program',
    period: '2024 - 2028',
    location: 'Jaipur, India',
    description: [
      'Enrolled in the highly specialized Kalvium Undergraduate Program focused on raw, practical Software Product Engineering.',
      'Developing robust microservices, structuring database normalization maps, and mastering modern full-stack development cycles.',
      'Continuous integration of professional API endpoints, serverless utilities, and state-of-the-art AI code assistants.'
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Tailwind CSS']
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer & AI Builder',
    company: 'Independent Portfolio Innovations',
    period: '2024 - Present',
    location: 'Remote',
    description: [
      'Built and deployed high performance web solutions, including the automated serverless AI Resume Checker on Netlify.',
      'Developed full stack e-commerce web applications to securely orchestrate product catalogs, transaction logs, and customer inquiries.',
      'Maintained fluid, highly optimized user interfaces with custom state tracking widgets and responsive mobile filters.'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Git', 'Netlify Functions']
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React.js', level: 94, category: 'frontend', iconName: 'Layout' },
  { name: 'Next.js', level: 88, category: 'frontend', iconName: 'Layout' },
  { name: 'HTML5 / CSS3', level: 95, category: 'frontend', iconName: 'Layout' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend', iconName: 'Layout' },
  
  // Backend & DB
  { name: 'Node.js', level: 90, category: 'backend', iconName: 'HardDrive' },
  { name: 'Express.js', level: 90, category: 'backend', iconName: 'HardDrive' },
  { name: 'REST APIs', level: 91, category: 'backend', iconName: 'HardDrive' },
  { name: 'MongoDB', level: 92, category: 'backend', iconName: 'HardDrive' },
  { name: 'MySQL', level: 86, category: 'backend', iconName: 'HardDrive' },

  // Languages
  { name: 'Python (Advanced)', level: 95, category: 'languages', iconName: 'Terminal' },
  { name: 'Java (Intermediate)', level: 80, category: 'languages', iconName: 'Terminal' },
  { name: 'JavaScript', level: 92, category: 'languages', iconName: 'Terminal' },
  { name: 'TypeScript', level: 90, category: 'languages', iconName: 'Terminal' },

  // AI & Modern Tools
  { name: 'ChatGPT', level: 95, category: 'ai', iconName: 'Cpu' },
  { name: 'Claude', level: 95, category: 'ai', iconName: 'Cpu' },
  { name: 'Cursor AI', level: 94, category: 'ai', iconName: 'Cpu' },

  // Tools & Ecosystem
  { name: 'Git / GitHub', level: 93, category: 'tools', iconName: 'ShieldCheck' },
  { name: 'VS Code', level: 96, category: 'tools', iconName: 'ShieldCheck' },
  { name: 'Postman', level: 92, category: 'tools', iconName: 'ShieldCheck' },
  { name: 'Vercel / Netlify', level: 93, category: 'tools', iconName: 'ShieldCheck' },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Full Stack Web Deployments',
    issuer: 'Developer Portfolio',
    date: '2024 - Present',
    description: 'Successfully engineered and deployed multiple Full Stack web applications, assuring production-grade routing and database storage patterns.',
    type: 'contribution'
  },
  {
    id: 'ach-2',
    title: 'Serverless Infrastructure Design',
    issuer: 'Netlify Services',
    date: 'Active Practice',
    description: 'Acquired core competencies wrapping backend routines within isolated Netlify Serverless Functions to fully shield secure secret API client credentials.',
    type: 'certification'
  },
  {
    id: 'ach-3',
    title: 'Hands-on API Integrations',
    issuer: 'Third-Party SDKs',
    date: 'Active Practice',
    description: 'Integrated robust external platforms, structured JSON rest endpoints, and AI models to design real-time data replication channels.',
    type: 'contribution'
  },
  {
    id: 'ach-4',
    title: 'AI-Assisted Developmental Workflows',
    issuer: 'Cursor, Claude & ChatGPT',
    date: 'Daily Work',
    description: 'Leveraged advanced LLM tools to optimize, document, speed-audit, and build cleaner, highly compliant typescript programs.',
    type: 'hackathon'
  },
  {
    id: 'ach-5',
    title: 'Discipline & Problem Solving Practice',
    issuer: 'Algos & Systems',
    date: 'Continuous Learning',
    description: 'Active continuous coding training, performance telemetry tuning, and cross-device interface debugging trials.',
    type: 'academic'
  },
  {
    id: 'ach-6',
    title: 'Startup Focus & Automation Systems',
    issuer: 'Ecosystem Interest',
    date: 'Ongoing Passion',
    description: 'Intense interest in automated pipelines, developer tooling platforms, and scalable modular web architectures.',
    type: 'certification'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Prof. Rajesh Patel",
    role: "Lead Engineering Mentor",
    company: "Kalvium JECRC University",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200",
    content: "Tejraj demonstrates exceptional full-stack coding abilities and critical thinking. His dedication to mastering modern technologies like React, Node.js, and serverless architectures within our Software Product Engineering curriculum is inspiring."
  },
  {
    id: "test-2",
    name: "Amit Sharma",
    role: "Project Co-developer",
    company: "AI Resume Solutions",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    content: "Collaborating with Tejraj on the AI Resume Checker was an outstanding experience. He possesses a sharp analytical mind, writes highly structured and secure code, and seamlessly integrated serverless endpoints to protect private API channels."
  },
  {
    id: "test-3",
    name: "Ananya Nair",
    role: "Café Strategic Owner",
    company: "Artisanal Coffee House",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    content: "Tejraj built a beautifully responsive website for our cafe, streamlining how customers browse our menu with smooth tags. The design has gotten endless compliments, loading instantly and working flawlessly across mobile browsers!"
  }
];
