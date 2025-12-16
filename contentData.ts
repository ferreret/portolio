import { AppContent } from './types';

// Projects
import { enterpriseOrchestrator } from './data/projects/enterprise-orchestrator';
import { documentPlatform } from './data/projects/document-platform';
import { qualityPredictor } from './data/projects/quality-predictor';

// Articles
import { orchestratingAgents } from './data/articles/orchestrating-agents';
import { netToPython } from './data/articles/net-to-python';

const enContent: AppContent = {
  ui: {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact Me",
    downloadCv: "Download CV",
    viewProjects: "View Projects",
    heroTitlePrefix: "Designing Intelligent ",
    heroTitleHighlight: "Agents",
    heroTitleSuffix: " & Systems",
    experienceTitle: "Experience that counts",
    technicalProficiency: "Technical Proficiency",
    coreTechTitle: "Core Technologies",
    journeyTitle: "Professional Journey",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    featuredProjectsTitle: "Featured Projects",
    featuredProjectsSubtitle: "A selection of work demonstrating capabilities in Generative AI, Data Science, and Software Architecture.",
    blogTitle: "Technical Insights",
    blogSubtitle: "Thoughts on AI, automation, and software engineering.",
    backToBlog: "Back to Blog",
    readArticle: "Read Article",
    viewDetails: "View Details",
    available: "Available for new projects",
    yearsExp: "Years Experience",
    specialist: "Automation Specialist",
    copyright: "All rights reserved."
  },
  profile: {
    name: "Nicolás Barceló Lozano",
    title: "Senior Data Scientist & Software Engineer",
    location: "Barcelona, Spain",
    email: "nicolas.barcelo.lozano@gmail.com",
    linkedin: "https://www.linkedin.com/in/ferreret/",
    summary: `Senior Data Scientist & Software Engineer with 25+ years of experience designing and implementing high-impact solutions across enterprise systems, document management, and process automation. Currently focused on AI Agents, LLM orchestration, and intelligent automation, combining a strong foundation in .NET development with expertise in Python, NLP, and Generative AI. Passionate about rapidly prototyping, testing, and scaling AI systems that enhance decision-making, optimize workflows, and deliver measurable business impact.`,
    education: [
      {
        degree: "Master’s in AI, Data Science & ML and Big Data",
        institution: "IEBS Business School",
        period: "Nov 2022 - Sept 2023"
      },
      {
        degree: "Bachelor's Degree in Physics",
        institution: "Universitat de Barcelona",
        period: "Jun 1999"
      }
    ],
    certifications: [
      "Tensorflow Developer Certificate (2024)",
      "AZ-900 Azure Fundamentals",
      "AI-900 Azure AI Fundamentals",
      "PCEP-30-02 – Certified Entry-Level Python Programmer",
      "PCEP-31-03 – Certified Associate in Python"
    ]
  },
  experience: [
    {
      company: "Tecnomedia Sistemas",
      role: "Data and Documentation Technology Specialist",
      period: "Nov 2002 – Present",
      location: "Barcelona, Spain",
      highlights: [
        "Built and deployed AI agents for decision automation and enterprise system integration using LangChain, LangGraph, CrewAI, n8n, and Azure AI.",
        "Integrated generative AI models through the OpenAI SDK, enabling rapid prototyping and reliable LLM-based automation.",
        "Designed multi-agent orchestration pipelines for real-world use cases (document workflows, healthcare scheduling, CRM integrations).",
        "Led development of document management applications in .NET (C# / WPF / WinForms) and SQL Server.",
        "Developed content-based text classification (NLP) for knowledge management and directed quality prediction projects using ML models."
      ]
    },
    {
      company: "NexTReT",
      role: "Programmer - Analyst Programmer",
      period: "Dec 2000 - Nov 2002",
      location: "Barcelona, Spain",
      highlights: [
        "Developed enterprise applications in VB6, SQL Server, ASP (VBScript) for insurance and consultancy clients.",
        "Built HR and payroll management solutions with PowerBuilder."
      ]
    },
    {
      company: "Datasix Sistemas",
      role: "Consultant",
      period: "Oct 1999 - Dec 2000",
      location: "Barcelona, Spain",
      highlights: [
        "Designed and implemented Business Intelligence solutions (VBA, SQL Server, multidimensional analysis).",
        "Developed Data Warehouses and Data Marts and trained users in BI tools."
      ]
    }
  ],
  skillCategories: [
    {
      category: "AI & Machine Learning",
      skills: ["LLMs", "Prompt Engineering", "AI Agents", "LangChain", "LangGraph", "CrewAI", "OpenAI SDK", "NLP", "RAG Pipelines", "Scikit-learn", "TensorFlow", "YOLO"]
    },
    {
      category: "Software Development",
      skills: [".NET (C#, VB.NET)", "Python", "JavaScript/TypeScript", "WinForms", "WPF"]
    },
    {
      category: "Data & Cloud",
      skills: ["SQL Server", "NoSQL", "Azure Functions", "Azure AI", "Synapse", "Data Factory", "Docker"]
    },
    {
      category: "Automation & BI",
      skills: ["RPA Frameworks", "n8n", "REST APIs", "Power BI", "Process Mapping"]
    }
  ],
  radarSkills: [
    { name: 'Generative AI', level: 95 },
    { name: 'Python', level: 90 },
    { name: '.NET / C#', level: 95 },
    { name: 'Data Science', level: 85 },
    { name: 'Cloud / Azure', level: 80 },
    { name: 'SQL / Data', level: 90 },
  ],
  projects: [
    enterpriseOrchestrator.en,
    documentPlatform.en,
    qualityPredictor.en
  ],
  blog: [
    orchestratingAgents.en,
    netToPython.en
  ]
};

const esContent: AppContent = {
  ui: {
    home: "Inicio",
    projects: "Proyectos",
    blog: "Blog",
    contact: "Contáctame",
    downloadCv: "Descargar CV",
    viewProjects: "Ver Proyectos",
    heroTitlePrefix: "Diseñando ",
    heroTitleHighlight: "Agentes Inteligentes",
    heroTitleSuffix: " y Sistemas",
    experienceTitle: "Experiencia que cuenta",
    technicalProficiency: "Competencia Técnica",
    coreTechTitle: "Tecnologías Principales",
    journeyTitle: "Trayectoria Profesional",
    educationTitle: "Educación",
    certificationsTitle: "Certificaciones",
    featuredProjectsTitle: "Proyectos Destacados",
    featuredProjectsSubtitle: "Una selección de trabajos que demuestran capacidades en IA Generativa, Ciencia de Datos y Arquitectura de Software.",
    blogTitle: "Insights Técnicos",
    blogSubtitle: "Reflexiones sobre IA, automatización e ingeniería de software.",
    backToBlog: "Volver al Blog",
    readArticle: "Leer Artículo",
    viewDetails: "Ver Detalles",
    available: "Disponible para nuevos proyectos",
    yearsExp: "Años de Experiencia",
    specialist: "Especialista en Automatización",
    copyright: "Todos los derechos reservados."
  },
  profile: {
    name: "Nicolás Barceló Lozano",
    title: "Senior Data Scientist & Software Engineer",
    location: "Barcelona, España",
    email: "nicolas.barcelo.lozano@gmail.com",
    linkedin: "https://www.linkedin.com/in/ferreret/",
    summary: `Senior Data Scientist & Software Engineer con más de 25 años de experiencia diseñando e implementando soluciones de alto impacto en sistemas empresariales, gestión documental y automatización de procesos. Actualmente enfocado en Agentes de IA, orquestación de LLMs y automatización inteligente, combinando una sólida base en desarrollo .NET con experiencia en Python, NLP e IA Generativa. Apasionado por prototipar, probar y escalar rápidamente sistemas de IA que mejoren la toma de decisiones, optimicen flujos de trabajo y entreguen valor comercial medible.`,
    education: [
      {
        degree: "Máster en IA, Data Science & ML y Big Data",
        institution: "IEBS Business School",
        period: "Nov 2022 - Sept 2023"
      },
      {
        degree: "Licenciatura en Física",
        institution: "Universitat de Barcelona",
        period: "Jun 1999"
      }
    ],
    certifications: [
      "Tensorflow Developer Certificate (2024)",
      "AZ-900 Azure Fundamentals",
      "AI-900 Azure AI Fundamentals",
      "PCEP-30-02 – Certified Entry-Level Python Programmer",
      "PCEP-31-03 – Certified Associate in Python"
    ]
  },
  experience: [
    {
      company: "Tecnomedia Sistemas",
      role: "Especialista en Tecnología de Datos y Documentación",
      period: "Nov 2002 – Actualidad",
      location: "Barcelona, España",
      highlights: [
        "Construcción y despliegue de agentes de IA para automatización de decisiones e integración de sistemas empresariales usando LangChain, LangGraph, CrewAI, n8n y Azure AI.",
        "Integración de modelos de IA generativa a través del SDK de OpenAI, permitiendo prototipado rápido y automatización confiable basada en LLMs.",
        "Diseño de pipelines de orquestación multi-agente para casos de uso reales (flujos de trabajo documentales, programación sanitaria, integraciones CRM).",
        "Liderazgo en el desarrollo de aplicaciones de gestión documental en .NET (C# / WPF / WinForms) y SQL Server.",
        "Desarrollo de clasificación de texto basada en contenido (NLP) para gestión del conocimiento y proyectos de predicción de calidad utilizando modelos de ML."
      ]
    },
    {
      company: "NexTReT",
      role: "Programador - Analista Programador",
      period: "Dic 2000 - Nov 2002",
      location: "Barcelona, España",
      highlights: [
        "Desarrollo de aplicaciones empresariales en VB6, SQL Server, ASP (VBScript) para clientes de seguros y consultoría.",
        "Construcción de soluciones de gestión de RRHH y nóminas con PowerBuilder."
      ]
    },
    {
      company: "Datasix Sistemas",
      role: "Consultor",
      period: "Oct 1999 - Dic 2000",
      location: "Barcelona, España",
      highlights: [
        "Diseño e implementación de soluciones de Business Intelligence (VBA, SQL Server, análisis multidimensional).",
        "Desarrollo de Data Warehouses y Data Marts y formación de usuarios en herramientas de BI."
      ]
    }
  ],
  skillCategories: [
    {
      category: "IA y Machine Learning",
      skills: ["LLMs", "Prompt Engineering", "AI Agents", "LangChain", "LangGraph", "CrewAI", "OpenAI SDK", "NLP", "RAG Pipelines", "Scikit-learn", "TensorFlow", "YOLO"]
    },
    {
      category: "Desarrollo de Software",
      skills: [".NET (C#, VB.NET)", "Python", "JavaScript/TypeScript", "WinForms", "WPF"]
    },
    {
      category: "Datos y Cloud",
      skills: ["SQL Server", "NoSQL", "Azure Functions", "Azure AI", "Synapse", "Data Factory", "Docker"]
    },
    {
      category: "Automatización y BI",
      skills: ["RPA Frameworks", "n8n", "REST APIs", "Power BI", "Mapeo de Procesos"]
    }
  ],
  radarSkills: [
    { name: 'IA Generativa', level: 95 },
    { name: 'Python', level: 90 },
    { name: '.NET / C#', level: 95 },
    { name: 'Data Science', level: 85 },
    { name: 'Cloud / Azure', level: 80 },
    { name: 'SQL / Data', level: 90 },
  ],
  projects: [
    enterpriseOrchestrator.es,
    documentPlatform.es,
    qualityPredictor.es
  ],
  blog: [
    orchestratingAgents.es,
    netToPython.es
  ]
};

export const content = {
  en: enContent,
  es: esContent
};