/* Single source of truth — transcribed strictly from resume. No invented facts. */

export const profile = {
  name: "Leeon John",
  role: "AI Engineer",
  statement: ["Building intelligent systems", "that actually work."],
  summary:
    "AI Engineer focused on building production-grade LLM, agentic AI, and ML systems. Experienced in RAG, semantic retrieval, LLM evaluation, observability, AI APIs, and scalable Python backends.",
  email: "leeonjohn.work@gmail.com",
  phone: "+91-9499789565",
  github: "https://github.com/coderleeon",
  githubLabel: "github.com/coderleeon",
  linkedin: "https://linkedin.com/in/leeon-john",
  linkedinLabel: "linkedin.com/in/leeon-john",
};

export const pipelineStages = [
  { id: "input", label: "INPUT" },
  { id: "retrieval", label: "RETRIEVAL" },
  { id: "reasoning", label: "REASONING" },
  { id: "execution", label: "EXECUTION" },
  { id: "observability", label: "OBSERVABILITY" },
] as const;

export type ProjectId = "omnira" | "researchpilot" | "benchlytics" | "opensourcepilot";

export interface ProjectStage {
  id: string;
  label: string;
  detail: string;
}

export interface Project {
  id: ProjectId;
  index: string;
  name: string;
  subtitle: string;
  stack: string[];
  points: string[];
  stages: ProjectStage[];
  architecture: string;
}

export const projects: Project[] = [
  {
    id: "omnira",
    index: "01",
    name: "Omnira",
    subtitle: "LLM Observability Platform",
    stack: ["Python", "FastAPI", "SQLAlchemy Async", "Pydantic", "Hexagonal Architecture"],
    points: [
      "Built an LLM observability platform using Python, FastAPI, SQLAlchemy Async, Pydantic, and Hexagonal Architecture.",
      "Implemented authenticated trace ingestion and querying with pagination, advanced filtering, search, repository abstractions, and project-level isolation.",
    ],
    architecture: "API → auth → service → repository → isolated store",
    stages: [
      { id: "ingest", label: "Trace ingestion", detail: "Authenticated write path. Every trace enters through one validated door." },
      { id: "query", label: "Querying", detail: "Read path over stored traces — same repository contract, async throughout." },
      { id: "page", label: "Pagination", detail: "Bounded pages keep large trace volumes inspectable without full scans." },
      { id: "filter", label: "Filtering + Search", detail: "Advanced filtering and search narrow traces to exactly what failed." },
      { id: "isolate", label: "Isolation", detail: "Repository abstractions with project-level isolation — one tenant never sees another." },
      { id: "observe", label: "Observability", detail: "The platform itself is the observability layer: traces become the record." },
    ],
  },
  {
    id: "researchpilot",
    index: "02",
    name: "ResearchPilot-MCP",
    subtitle: "Multi-Agent Research Assistant",
    stack: ["MCP", "LangGraph", "FastAPI", "ChromaDB"],
    points: [
      "Built a multi-agent research system using MCP, LangGraph, FastAPI, and ChromaDB for paper discovery, PDF analysis, semantic retrieval, and citation-aware reports.",
      "Designed agent workflows for research planning, document analysis, retrieval, and automated report generation.",
    ],
    architecture: "planner → discovery → analysis → retrieval → cited report",
    stages: [
      { id: "plan", label: "Research planning", detail: "Planner agent scopes the question before any retrieval happens." },
      { id: "discover", label: "Paper discovery", detail: "Candidate papers are located and queued for analysis." },
      { id: "pdf", label: "PDF analysis", detail: "Documents are parsed and analyzed as structured evidence." },
      { id: "retrieve", label: "Semantic retrieval", detail: "ChromaDB retrieval grounds claims in the analyzed corpus." },
      { id: "cite", label: "Citation-aware report", detail: "Generated reports carry citations back to source passages." },
    ],
  },
  {
    id: "benchlytics",
    index: "03",
    name: "BenchLytics",
    subtitle: "LLM Evaluation & Inference Optimization",
    stack: ["Async execution", "Dynamic batching", "Multi-tier caching", "Evaluation pipelines"],
    points: [
      "Built an LLM evaluation system for measuring model quality, latency, cost, failures, and inference performance.",
      "Implemented asynchronous execution, dynamic batching, multi-tier caching, evaluation pipelines, and fallback strategies.",
    ],
    architecture: "run → measure → optimize → fall back",
    stages: [
      { id: "eval", label: "Evaluation", detail: "Model quality, latency, cost, and failures measured per run." },
      { id: "async", label: "Async execution", detail: "Runs execute asynchronously; batching is dynamic, not fixed." },
      { id: "cache", label: "Caching", detail: "Multi-tier caching absorbs repeat work before it reaches the model." },
      { id: "fallback", label: "Fallback", detail: "Fallback strategies keep the pipeline answering when a model fails." },
    ],
  },
  {
    id: "opensourcepilot",
    index: "04",
    name: "OpenSourcePilot",
    subtitle: "AI-Powered Open Source Assistant",
    stack: ["LLMs", "ChromaDB", "Transformer embeddings", "GitHub APIs"],
    points: [
      "Built an AI system that analyzes GitHub repositories and generates issue-specific contribution plans using LLMs and semantic code search.",
      "Implemented ChromaDB retrieval, transformer embeddings, automated test generation, and pull-request drafting through GitHub APIs.",
    ],
    architecture: "repo → semantic index → plan → tests → PR draft",
    stages: [
      { id: "repo", label: "Repo analysis", detail: "GitHub repositories are ingested as the working corpus." },
      { id: "search", label: "Semantic code search", detail: "Transformer embeddings + ChromaDB retrieval locate relevant code." },
      { id: "plan", label: "Contribution planning", detail: "Issue-specific plans are drafted from retrieved context." },
      { id: "test", label: "Test generation", detail: "Automated tests accompany the proposed change." },
      { id: "pr", label: "PR drafting", detail: "Pull-request drafts go out through GitHub APIs." },
    ],
  },
];

export const experience = [
  {
    org: "Schbang Solutions",
    role: "AI Development Intern",
    period: "Jun 2025 – Sep 2025",
    points: [
      "Built scalable ML pipelines for automation and customer insight extraction.",
      "Developed GenAI-driven content solutions using transformer-based models.",
    ],
  },
  {
    org: "Bits Infotech",
    role: "AI/ML Intern",
    period: "Jan 2024 – May 2024",
    points: [
      "Developed recommendation systems and predictive ML pipelines for e-commerce data.",
      "Built supervised learning workflows using Python and scikit-learn.",
    ],
  },
];

export const research = [
  { index: "R.01", text: "Paper accepted at IEEE ICCCNT 2025 (IIT Indore).", tag: "IEEE ICCCNT" },
  {
    index: "R.02",
    text: "Top-performing model and paper accepted at SSBC 2025 (IJCB Osaka, Japan).",
    tag: "SSBC / IJCB",
  },
  { index: "R.03", text: "Paper accepted at IEEE PREMI 2025 (NIT Delhi).", tag: "IEEE PREMI" },
];

export const capabilities = [
  {
    id: "prog",
    no: "S.01",
    category: "Programming",
    items: ["Python", "C++", "SQL", "JavaScript/TypeScript"],
    note: "Working languages for backends, pipelines, and interfaces.",
  },
  {
    id: "ai",
    no: "S.02",
    category: "AI & LLM",
    items: [
      "LLMs",
      "Generative AI",
      "RAG",
      "Agentic AI",
      "NLP",
      "Transformers",
      "Deep Learning",
      "Model Evaluation",
      "Explainable AI",
    ],
    note: "Where the actual product work happens.",
  },
  {
    id: "fw",
    no: "S.03",
    category: "Frameworks",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Hugging Face",
      "LangGraph",
      "LangChain",
      "MCP",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
    ],
    note: "Training, orchestration, and serving layers.",
  },
  {
    id: "ops",
    no: "S.04",
    category: "LLMOps & Retrieval",
    items: [
      "LLM Evaluation",
      "Observability",
      "Vector Search",
      "Embeddings",
      "Semantic Search",
      "Async Processing",
      "Caching",
    ],
    note: "What keeps LLM systems reliable in production.",
  },
  {
    id: "infra",
    no: "S.05",
    category: "Infrastructure & Cloud",
    items: [
      "Docker",
      "Git",
      "CI/CD",
      "REST APIs",
      "ChromaDB",
      "Pinecone",
      "FAISS",
      "AWS",
      "Amazon Bedrock",
      "Azure",
    ],
    note: "Packaging, shipping, and running the above.",
  },
];

export const education = [
  {
    school: "Pandit Deendayal Energy University (PDEU)",
    degree: "M.Tech in Artificial Intelligence",
    period: "Aug 2024 – May 2026",
  },
  {
    school: "Parul University",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Jul 2020 – May 2024",
  },
];

export const navNodes = [
  { id: "work", no: "01", label: "WORK", href: "#work", desc: "4 systems" },
  { id: "research", no: "02", label: "RESEARCH", href: "#research", desc: "3 papers" },
  { id: "experience", no: "03", label: "EXPERIENCE", href: "#experience", desc: "2 roles" },
  { id: "systems", no: "04", label: "SYSTEMS", href: "#systems", desc: "5 capabilities" },
  { id: "about", no: "05", label: "ABOUT", href: "#about", desc: "contact" },
] as const;

/* Demonstration copy. Clearly labelled illustrative examples used only
   inside the interactive walkthroughs — not resume facts. */
export const demoStrings = {
  researchQuestion: "Example: How is retrieval quality measured in RAG systems?",
  benchNote:
    "Visual demonstration — all lanes and values are illustrative animation, not measured results.",
  issueExample: {
    title: "Example issue · illustration",
    body: "Search returns stale results after re-indexing.",
  },
};

/* Resume-supported technology relationships, derived from shared
   categories and the workflows described in the resume. Symmetric. */
export const capabilityLinks: Record<string, string[]> = {
  RAG: ["Semantic Search", "Embeddings", "Vector Search", "ChromaDB", "Pinecone", "FAISS"],
  "Agentic AI": ["LangGraph", "LangChain", "MCP"],
  NLP: ["Transformers", "Deep Learning", "Hugging Face"],
  Transformers: ["NLP", "Deep Learning", "Hugging Face"],
  "Deep Learning": ["PyTorch", "TensorFlow", "Transformers", "NLP"],
  "Model Evaluation": ["LLM Evaluation", "Observability"],
  "Explainable AI": ["Model Evaluation"],
  PyTorch: ["Deep Learning", "Hugging Face"],
  TensorFlow: ["Deep Learning"],
  "scikit-learn": ["Python", "Model Evaluation"],
  "Hugging Face": ["Transformers", "PyTorch", "NLP"],
  LangGraph: ["Agentic AI", "LangChain", "MCP"],
  LangChain: ["Agentic AI", "LangGraph"],
  MCP: ["Agentic AI", "LangGraph"],
  FastAPI: ["REST APIs", "Pydantic", "Python"],
  Pydantic: ["FastAPI", "Python"],
  SQLAlchemy: ["Python", "SQL"],
  "LLM Evaluation": ["Model Evaluation", "Observability"],
  Observability: ["LLM Evaluation", "Model Evaluation"],
  "Vector Search": ["Embeddings", "Semantic Search", "ChromaDB", "Pinecone", "FAISS", "RAG"],
  Embeddings: ["Semantic Search", "Vector Search", "ChromaDB", "RAG"],
  "Semantic Search": ["Embeddings", "Vector Search", "ChromaDB", "Pinecone", "FAISS", "RAG"],
  "Async Processing": ["Caching"],
  Caching: ["Async Processing"],
  Python: ["FastAPI", "Pydantic", "scikit-learn"],
  SQL: ["SQLAlchemy"],
  "JavaScript/TypeScript": ["REST APIs"],
  "REST APIs": ["FastAPI"],
  ChromaDB: ["Embeddings", "Semantic Search", "Vector Search", "RAG"],
  Pinecone: ["Vector Search", "Semantic Search", "RAG"],
  FAISS: ["Vector Search", "Semantic Search", "RAG"],
};
