// src/data/features.js
const features = [
  {
    id: 1,
    title: "CMD Command Line",
    description: "Convert natural language to command-line instructions with AI-powered intelligence.",
    icon: "bi-terminal",
    fullDescription: "CMD Command Line revolutionizes the way users interact with terminal interfaces.",
    actions: ["Try Now", "View Examples", "Documentation", "Settings"]
  },
  {
    id: 2,
    title: "BorderX",
    description: "Secure communication and steganography for defense operations.",
    icon: "bi-lock",
    fullDescription: "BorderX is a secure communication system designed for defense and border forces.",
    actions: ["Try StegnoChat", "Try StegEncrypt", "Documentation", "Settings"]
  },
  {
    id: 3,
    title: "LegalEase",
    description: "Analyze legal documents and privacy policies with AI-powered insights.",
    icon: "bi-file-earmark-text",
    fullDescription: "LegalEase is a smart browser extension that automatically analyzes online agreements.",
    actions: ["Analyze Document", "View History", "Settings", "Help"]
  },
  {
    id: 4,
    title: "ConvulenceAI",
    shortDesc: "Enterprise Data Intelligence & Secure Communication Platform",
    description: "A unified AI platform that allows enterprises to communicate securely, analyze data intelligently, and visualize information in real-time.",
    icon: "🚀",
    color: "#D600FF",
    modules: [
      { name: "AI Data Assistant", desc: "Conversational RAG system", icon: "🧭" },
      { name: "Dynamic Visualization Panel", desc: "Real-time charts", icon: "📊" },
      { name: "Secure Communication Layer", desc: "End-to-end encrypted chat feature", icon: "🔐" },
      { name: "StegEncrypt Tool", desc: "Steganography for hiding text", icon: "🖼️" },
      { name: "Anomaly Detection Engine", desc: "AI-based monitoring", icon: "⚠️" },
      { name: "Access Management", desc: "Role-based access control", icon: "⚙️" }
    ]
  }
];

export default features;