import type { About, Blog, Person, ProjectsPage, Social } from "@/types";

const person: Person = {
  firstName: "Matthew",
  lastName: "Shan",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "matthewshan99@gmail.com",
  location: "Grand Rapids, MI",
  timezone: "America/Detroit",
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/matthewshan",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/matthewshan99/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const about: About = {
  path: "/",
  label: "Home",
  title: `${person.name} | ${person.role}`,
  description: `Portfolio site for ${person.name}, a ${person.role} based in Grand Rapids, Michigan.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "About",
    description:
      "Experienced Software Engineer passionate about solving problems for users, businesses, and clients alike. Specialized in cloud-native backend development and microservices architectures in Azure and AWS.",
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Meijer",
        timeframe: "April 2024 - Present",
        role: "Software Engineer",
        achievements: [
          ".NET 10 APIs and event-driven services for e-commerce systems.",
          "Azure infrastructure managed with Terraform for modular, repeatable deployments.",
          "CI/CD delivery through Azure DevOps YAML pipelines and GitHub Actions.",
          "Dockerized workloads deployed to OpenShift and Azure Container Apps.",
          "Temporal and Kafka used to coordinate distributed workflows and improve service reliability.",
          "Internal web applications built with Next.js, React, Zustand, and Tailwind CSS.",
        ],
      },
      {
        company: "Vervint",
        timeframe: "April 2022 - April 2024",
        role: "IoT Consultant",
        achievements: [
          "Worked with clients on the architecture, development, and deployment of IoT platforms in Azure and AWS.",
          "Backend systems delivered in C# and Node.js with automated test coverage using xUnit, Moq, and Jest.",
          "Application and device security implemented with X.509 certificates and OAuth 2.0 JWT tokens.",
          "Improved an internal device management web application using Angular and TypeScript.",
        ],
      },
      {
        company: "Grand Valley State University",
        timeframe: "September 2019 - May 2021",
        role: "AI Research Assistant",
        achievements: [
          "Co-authored MorphWorld: A State Transition Simulator, published through MIT Press conference proceedings.",
          "Developed and trained deep learning genetic algorithms with PyTorch.",
          "Used Pandas, NumPy, Jupyter, and Matplotlib to train models and analyze performance.",
          "Awarded the P. Douglas Kindschi Undergraduate Research Fellowship in the Sciences.",
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Grand Valley State University",
        description: (
          <>
            Bachelor of Science in Computer Science. Minors in Data Science and Mathematics. 3.99
            GPA, Honors Student, and Computing Club President.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Cloud and Platform",
        description: (
          <>Building and operating cloud-native systems across Azure, AWS, and Kubernetes.</>
        ),
        tags: [
          {
            name: "Azure",
          },
          {
            name: "AWS",
          },
          {
            name: "Kubernetes",
          },
          {
            name: "Terraform",
          },
        ],
      },
      {
        title: "Backend and Application Development",
        description: (
          <>Designing APIs, services, and applications with modern .NET, TypeScript, and Python.</>
        ),
        tags: [
          {
            name: "C#",
          },
          {
            name: "TypeScript",
          },
          {
            name: "Python",
          },
          {
            name: "Next.js",
          },
        ],
      },
      {
        title: "Delivery and Operations",
        description: (
          <>
            Shipping production systems through automated pipelines, containers, and
            observability-minded workflows.
          </>
        ),
        tags: [
          {
            name: "GitHub Actions",
          },
          {
            name: "Azure DevOps",
          },
          {
            name: "Docker",
          },
        ],
      },
      {
        title: "Data and Distributed Systems",
        description: (
          <>
            Working with distributed workflows, event streaming, and both relational and
            non-relational storage.
          </>
        ),
        tags: [
          {
            name: "SQL",
          },
          {
            name: "NoSQL",
          },
          {
            name: "Temporal",
          },
          {
            name: "Kafka",
          },
        ],
      },
      {
        title: "Applied AI and Research",
        description: (
          <>Applying machine learning tools in research and practical engineering contexts.</>
        ),
        tags: [
          {
            name: "AI/ML",
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: `${person.name}'s Blog`,
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to src/app/blog/posts
  // All posts will be listed on the /blog route
};

const projects: ProjectsPage = {
  path: "/projects",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Selected software and design projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to src/app/projects/projects
  // All projects will be listed on the /projects route
};

export { person, social, about, blog, projects };
