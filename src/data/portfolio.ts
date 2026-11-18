/**
 * All website content lives here. Edit this file to update the site.
 *
 * Placeholders you can fill later:
 *  - profile.photo: put an image in /public (e.g. /public/profile.jpg) and set photo: "/profile.jpg"
 *  - project.image: put a screenshot in /public/projects (e.g. /public/projects/clv.png)
 *    and set image: "/projects/clv.png" on that project
 *
 * Privacy rules: no student ID (NIM), no phone number, and the thesis never names the company.
 */

export const profile = {
  name: "Farell Eugene",
  firstName: "Farell",
  lastName: "Eugene",
  initials: "FE",
  role: "Data Science · AI · Machine Learning · Business Intelligence",
  headline:
    "Information Systems student who likes turning messy business data into models and dashboards that people actually use to make decisions.",
  location: "Indonesia",
  current: "Marketing Data Analyst Intern at PT Adaro Andalan Indonesia",
  /** Set to "/profile.jpg" (or similar) after adding the file to /public. */
  photo: "/profile.jpg" as string | null,
  email: "maximillianfarell@gmail.com",
  github: "https://github.com/farell-eugene",
  githubHandle: "farell-eugene",
  linkedin: "https://www.linkedin.com/in/farell-eugene/",
  linkedinHandle: "in/farell-eugene",
  cv: "/cv/Farell-Eugene-CV.pdf",
};

/** Headline numbers at the top of the Projects section (GPA lives in Education). */
export const projectStats = [
  { value: "0.737", label: "Test R² on my thesis CLV model", prefix: "R²" },
  { value: "70.3%", label: "Accuracy of the tuned cloud-image CNN" },
  { value: "200,000", label: "Marketing campaigns analyzed" },
  { value: "11", label: "Projects, all public on GitHub" },
];

export const about = {
  paragraphs: [
    // paragraph 1 is written inline in components/about.tsx (it has highlighted chips)
    "I study Information Systems at Universitas Multimedia Nusantara, and most of my work sits somewhere between data science, machine learning, deep learning, AI and business intelligence. I like the messy start of a problem: a spreadsheet nobody fully trusts, or a manual task that eats a whole afternoon. I figure out what the data is saying, then build something people can actually use. At Adaro, that meant a Python script that cut contract processing time by 70%.",
    "My thesis predicts customer lifetime value with a stacking ensemble. Along the way I've classified cloud photos with a CNN, analyzed a rural bank's financial ratios, built dashboards in Tableau, Power BI and SAS Viya, and put together a small data warehouse in Pentaho. I'm also drawn to artificial intelligence and deep learning, and I'd like to grow into AI engineering, building on the CNN work I've done so far. Outside class I spend a lot of time organizing things. As supervisor of ISFEST 2025 I worked with a committee of more than 140 people, and that's where I learned to explain things clearly and keep a big team on schedule.",
  ],
  facts: [
    { label: "Based in", value: "Indonesia" },
    { label: "Currently", value: "Marketing Data Analyst Intern, PT Adaro Andalan Indonesia" },
    { label: "Studying", value: "Information Systems, UMN (2023 – 2027)" },
    { label: "Languages", value: "English, Indonesian" },
    { label: "Open to", value: "Data analyst, data scientist, AI engineer and BI roles" },
  ],
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  points: string[];
  tags?: string[];
  highlight?: { value: string; label: string };
};

export const work: ExperienceItem[] = [
  {
    role: "Marketing Data Analyst Intern",
    org: "PT Adaro Andalan Indonesia",
    period: "Sep 2026 – Present",
    current: true,
    highlight: { value: "−70%", label: "contract processing time" },
    points: [
      "Contract details were still being typed into the company system by hand, so I wrote a Python program that fills them in. Processing time dropped by 70%.",
      "Staff now only check the generated data, fix anything that looks off, and export a PDF that the system reads when it's uploaded.",
      "I also dig into the sales contracts themselves (customers, prices, volumes, contract periods) in Excel and Python, and present what I find to my supervisors.",
    ],
    tags: ["Python", "Automation", "Excel", "Data visualization"],
  },
  {
    role: "Data Analyst Intern",
    org: "BPR Cahaya (Bank Perekonomian Rakyat)",
    period: "Jan 2026 – May 2026",
    highlight: { value: "LDR · ROA · BOPO", label: "financial ratios tracked" },
    points: [
      "I tracked the bank's assets, deposits, loans and KPI targets month by month and worked out its financial ratios, mainly LDR, ROA and BOPO.",
      "I looked at year-over-year trends and risk signals, and compared the bank's growth with national BPR figures from Bank Indonesia.",
      "I turned the results into Excel and Power BI dashboards and presented them to the Board of Directors and management.",
    ],
    tags: ["Python", "pandas", "Power BI", "Excel", "Financial analysis"],
  },
];

export const organizations: ExperienceItem[] = [
  {
    role: "Secretary",
    org: "HIMSI UMN (Information Systems Student Association)",
    period: "Dec 2024 – Present",
    current: true,
    points: [
      "Project Lead, Company Visit to Kawan Lama Group (2025).",
      "I keep the association's paperwork in order and help the Academic, Non-Academic and Student Affairs divisions plan their work together.",
      "A big part of the job is passing information between lecturers, student affairs, alumni and our own committees, so everyone works from the same plan.",
    ],
  },
  {
    role: "Supervisor",
    org: "Information System Festival (ISFEST) 2025",
    period: "Dec 2024 – Oct 2025",
    highlight: { value: "140+", label: "committee members led" },
    points: [
      "I held the top role in ISFEST 2025, one level above the committee heads. When a division needed a decision, it usually landed on my desk.",
      "The festival ran a talkshow plus academic and non-academic competitions, and more than 300 participants came through.",
    ],
  },
  {
    role: "Chairman",
    org: "Learn Empower Act Develop (LEAD) 2024",
    period: "Aug 2024 – Dec 2024",
    points: [
      "I chaired LEAD 2024, a leadership program for high school student council members. We planned the workshops from scratch, looked after the facilitators and ran the activities on the day.",
    ],
  },
];

export type ProjectCategory = "ml" | "bi" | "desktop";

export const categories: { id: ProjectCategory; label: string; short: string }[] = [
  { id: "ml", label: "ML & Data Science", short: "ML & DS" },
  { id: "bi", label: "BI & Data Engineering", short: "BI & DE" },
  { id: "desktop", label: "Desktop Apps", short: "Desktop" },
];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  context: string;
  year: string;
  description: string;
  result: { value: string; label: string };
  extra?: string;
  tools: string[];
  repo: string;
  featured?: boolean;
  /** Optional screenshot path in /public, e.g. "/projects/clv.png" */
  image?: string;
  /** Shape of the decorative mini chart on the card cover */
  chart: "bars" | "line" | "scatter" | "grid";
};

const gh = (repo: string) => `https://github.com/farell-eugene/${repo}`;

export const projects: Project[] = [
  {
    slug: "clv",
    title: "Customer Lifetime Value Prediction & Segmentation",
    category: "ml",
    context: "Undergraduate thesis",
    year: "2026",
    featured: true,
    description:
      "My undergraduate thesis. I group B2B coal-sales customers with K-Means, then predict what each one will be worth over the next six months using a stacking ensemble: Random Forest, XGBoost, LightGBM and an MLP, combined by a Ridge meta-learner. All the data is synthetic. The train and test sets are split by time with a gap in between, so the model never gets a peek at the future. The predictions and segment profiles live in a small Streamlit app.",
    result: { value: "R² 0.737", label: "Test set, stacking ensemble" },
    extra: "Silhouette 0.357 · 2 stable segments · 25k synthetic transactions",
    tools: ["Python", "scikit-learn", "XGBoost", "LightGBM", "Streamlit"],
    repo: gh("customer-lifetime-value-segmentation"),
    chart: "scatter",
  },
  {
    slug: "cloud",
    title: "Cloud Type Image Classification",
    category: "ml",
    context: "Data Modeling course",
    year: "2025",
    description:
      "Seven cloud types, 960 sky photos and three models. SVM and Random Forest worked on pixels compressed with PCA, while the CNN learned straight from the images. I tuned all three, and the CNN came out on top. The results later became a research article.",
    result: { value: "70.3%", label: "Accuracy, tuned CNN" },
    extra: "7 classes · SVM F1 0.58 · RF F1 0.55",
    tools: ["TensorFlow/Keras", "scikit-learn", "PCA", "Python"],
    repo: gh("cloud-type-image-classification"),
    chart: "bars",
  },
  {
    slug: "emotion",
    title: "Facial Emotion Recognition",
    category: "ml",
    context: "Deep Learning course · group",
    year: "2025",
    description:
      "Our group built its own dataset by scraping face images from the web. We threw out duplicates and broken files, boosted the contrast with CLAHE, and trained a CNN to tell angry, happy and sad faces apart. Batch Normalization, Dropout and L2 regularization kept it from overfitting too quickly.",
    result: { value: "1,252", label: "Self-collected images, 3 classes" },
    tools: ["TensorFlow/Keras", "OpenCV", "Web scraping", "Python"],
    repo: gh("facial-emotion-recognition"),
    chart: "grid",
  },
  {
    slug: "marketing",
    title: "Marketing Campaign Analysis",
    category: "ml",
    context: "Data Analysis course · group",
    year: "2025",
    description:
      "We went through 200,000 digital marketing campaigns looking for what drives ROI and conversion rate across campaign types, channels and audiences. The honest answer was: not much that this dataset records. Linear and polynomial regression both landed close to R² 0, so ROI must depend on things the data doesn't capture.",
    result: { value: "200k", label: "Campaigns analyzed" },
    tools: ["pandas", "scikit-learn", "Seaborn", "Python"],
    repo: gh("marketing-campaign-analysis"),
    chart: "line",
  },
  {
    slug: "bank",
    title: "Bank Financial Performance Analysis",
    category: "ml",
    context: "Work project",
    year: "2026",
    description:
      "Built from my data analyst work at a rural bank. I reshaped years of monthly financial reports into a clean time series, then tracked growth, liquidity, profitability and efficiency, added a simple early-warning index for stress, and compared everything with national BPR statistics. The output feeds a Power BI dashboard. The bank's figures are confidential, so the repository only holds the code.",
    result: { value: "LDR · ROA · BOPO", label: "Ratios tracked, 2020 – 2025" },
    tools: ["Python", "pandas", "Matplotlib", "Power BI"],
    repo: gh("bank-financial-data-analysis"),
    chart: "line",
  },
  {
    slug: "earthquake",
    title: "Earthquake Impact Dashboard",
    category: "bi",
    context: "Data Visualization course · group",
    year: "2025",
    description:
      "A Tableau story about 25 years of earthquakes in Indonesia, built on the national disaster database (DIBI). It shows where the damage happened, how many people died or were displaced, which schools, places of worship and public buildings were hit, and a forecast of damage by province.",
    result: { value: "~790", label: "Earthquake records visualized" },
    extra: "9 worksheets · forecast · year highlight parameter",
    tools: ["Tableau", "Excel"],
    repo: gh("earthquake-impact-dashboard"),
    chart: "bars",
  },
  {
    slug: "sas",
    title: "Business Intelligence with SAS Viya",
    category: "bi",
    context: "Advanced Big Data Analytics course",
    year: "2025",
    description:
      "A BI case study for a made-up car company. I built sales dashboards in SAS Viya to compare brands, prices and dealers, then ran sentiment analysis on customer reviews to see how people felt about each model. One clear pattern: the cheaper cars sold in higher volumes.",
    result: { value: "157", label: "Car models with sentiment analysis" },
    tools: ["SAS Viya", "SAS Visual Analytics", "Text analytics", "Power BI"],
    repo: gh("sas-viya-business-intelligence"),
    chart: "scatter",
  },
  {
    slug: "dwh",
    title: "Data Warehouse & ETL with Pentaho",
    category: "bi",
    context: "Data Warehouse course",
    year: "2025",
    description:
      "A small data warehouse for a minimarket chain. Pentaho moves the sales data out of MySQL and into a star schema, with product, branch and date dimensions around one fact table. I then explored the warehouse with Python charts.",
    result: { value: "Star schema", label: "3 dimensions + 1 fact ETL" },
    tools: ["Pentaho PDI", "MySQL", "SQL", "Python"],
    repo: gh("data-warehouse-etl-pentaho"),
    chart: "grid",
  },
  {
    slug: "warung",
    title: "Warung POS Desktop App",
    category: "desktop",
    context: "Visual Programming course · team of 5",
    year: "2024",
    description:
      "A cashier app for a small warung, built by a team of five. The owner logs in, rings up a cart, and the stock count goes down on its own. The app warns when something is running low and prints transaction reports with Crystal Reports.",
    result: { value: "5 modules", label: "Login, stock, sales, reports, alerts" },
    tools: ["C#", "WinForms", "SQL Server", "Crystal Reports"],
    repo: gh("warung-pos-desktop-app"),
    chart: "bars",
  },
  {
    slug: "sparepart",
    title: "Sparepart Inventory System",
    category: "desktop",
    context: "Visual Programming course",
    year: "2024",
    description:
      "Inventory and sales software for an auto spare-parts store. It handles user roles, suppliers, sales, purchase orders and every stock movement in and out of the shop, all stored in SQL Server, with Crystal Reports for the printouts.",
    result: { value: "11 tables", label: "Relational SQL Server schema" },
    tools: ["C#", ".NET Framework", "SQL Server", "ADO.NET"],
    repo: gh("sparepart-inventory-system"),
    chart: "grid",
  },
  {
    slug: "winforms",
    title: "C# WinForms Exercises",
    category: "desktop",
    context: "Visual Programming course",
    year: "2024",
    description:
      "Five small apps from my Visual Programming course: a number guessing game, a library lending tool, grade and salary calculators, and a student registration form that saves to SQL Server. Each one added something new, from basic events and input checks to classes and finally a real database.",
    result: { value: "5 apps", label: "OOP, validation, ADO.NET" },
    tools: ["C#", "WinForms", "ADO.NET", "SQL Server"],
    repo: gh("csharp-winforms-exercises"),
    chart: "line",
  },
];

export const skillGroups = [
  {
    title: "Python & Machine Learning",
    icon: "brain",
    items: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "TensorFlow / Keras",
      "OpenCV",
      "Streamlit",
      "Matplotlib / Seaborn",
    ],
  },
  {
    title: "SQL & Databases",
    icon: "database",
    items: ["SQL", "MySQL", "SQL Server", "Star schema design", "ADO.NET"],
  },
  {
    title: "BI & Visualization",
    icon: "chart",
    items: ["Power BI", "Tableau", "SAS Viya", "SAP Analytics Cloud", "Excel", "Google Sheets"],
  },
  {
    title: "ETL & Data Engineering",
    icon: "workflow",
    items: ["Pentaho Data Integration", "Data cleaning & validation", "Python automation"],
  },
  {
    title: "C# / .NET",
    icon: "code",
    items: ["C#", ".NET Framework", "Windows Forms", "Crystal Reports"],
  },
  {
    title: "Ways of working",
    icon: "users",
    items: [
      "CRISP-DM",
      "Project management",
      "Leadership",
      "Public speaking",
      "Analytical thinking",
    ],
  },
] as const;


export const education = {
  school: "Universitas Multimedia Nusantara (UMN)",
  degree: "Bachelor of Information Systems",
  period: "2023 – 2027 (expected)",
  gpa: "3.65 / 4.00",
  thesis: "Customer lifetime value prediction and segmentation with a stacking ensemble",
  interests: [
    "Data analytics",
    "Data visualization",
    "Machine learning",
    "Deep learning",
    "Artificial intelligence",
    "Business analysis",
  ],
};

export const certifications = [
  { name: "Cisco Data Analytics Essentials", issuer: "Cisco", date: "Nov 2026" },
  { name: "Cisco Data Science", issuer: "Cisco", date: "Nov 2026" },
  { name: "Cisco Modern AI", issuer: "Cisco", date: "Nov 2026" },
  { name: "Summarizing & Classifying Data Using IBM Granite", issuer: "IBM", date: "Jun 2025" },
  { name: "SAP Analytics Cloud", issuer: "SAP", date: "Apr 2025" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
