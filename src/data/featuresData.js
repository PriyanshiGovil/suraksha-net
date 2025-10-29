// src/data/featuresData.js
const featuresData = [
  {
   id: 1,
    title: "Universal Command Line",
    description: "Convert natural language to command-line instructions with AI-powered intelligence.",
    icon: "bi-terminal",
    fullDescription: "Universal Command Line revolutionizes the way users interact with terminal interfaces by converting natural language queries into precise command-line instructions. This powerful tool uses advanced Natural Language Processing (NLP) to understand user intent and provide accurate command translations with confidence scores. Whether you're a beginner learning command-line basics or an experienced user looking for efficiency, Universal Command Line bridges the gap between human language and technical commands, making terminal interactions more intuitive and accessible.",
    actions: ["Try Now", "View Examples", "Documentation", "Settings"]
  },
  {
    id: 2,
    title: "Endpoint Protection",
    description: "Advanced security for all your devices including laptops, mobiles, and servers.",
    icon: "bi-laptop",
    fullDescription: "Endpoint Protection ensures that all devices connected to your network are secure. This solution includes antivirus, anti-malware, host-based firewall, device control, and application control. It uses behavioral analysis to detect and block zero-day threats before they can compromise your systems.",
    actions: ["Scan Device", "Update Definitions", "View Quarantine", "Generate Report"]
  },
  {
    id: 3,
    title: "LegalEase",
    description: "Analyze legal documents and privacy policies with AI-powered insights.",
    icon: "bi-file-earmark-text",
    fullDescription: "LegalEase is a smart browser extension that automatically analyzes online agreements and privacy policies. It scans the visible content and highlights key clauses using a keyword-based detection system. LegalEase generates easy-to-understand summaries that point out positive aspects like transparency and user rights, as well as negative aspects like data collection and sharing practices. The tool provides an Issues section showing exact sentences that might be risky, enabling users to make informed decisions.",
    actions: ["Analyze Document", "View History", "Settings", "Help"]
  },
  
  {
    id: 4,
    title: "Web Application Firewall",
    description: "Protect your web applications from common vulnerabilities and attacks.",
    icon: "bi-shield-lock",
    fullDescription: "Our Web Application Firewall (WAF) protects your web applications from OWASP Top 10 threats such as SQL injection, cross-site scripting (XSS), and other common vulnerabilities. It uses machine learning to adapt to new threats and provides detailed reporting on blocked attacks and attempted exploits.",
    actions: ["Configure Rules", "Run Scan", "View Traffic", "Generate Report"]
  },
  {
    id: 5,
    title: "Identity and Access Management",
    description: "Manage user identities and control access to your resources securely.",
    icon: "bi-person-badge",
    fullDescription: "Identity and Access Management (IAM) provides centralized control over user access to critical resources. Features include single sign-on (SSO), multi-factor authentication (MFA), privileged access management, and user lifecycle management. Ensure that only authorized users have access to sensitive data and systems.",
    actions: ["Manage Users", "Configure MFA", "Review Access", "Audit Logs"]
  },
  {
    id: 6,
    title: "Threat Intelligence",
    description: "Stay ahead of cyber threats with real-time intelligence and predictive analytics.",
    icon: "bi-bug",
    fullDescription: "Our Threat Intelligence solution aggregates data from global sources to provide real-time insights into emerging threats. It uses AI to analyze patterns and predict potential attacks, allowing you to proactively strengthen your defenses. Customizable alerts ensure you're notified of threats relevant to your organization.",
    actions: ["View Feeds", "Analyze Threats", "Configure Alerts", "Generate Report"]
  },
  {
    id: 7,
    title: "Security Information and Event Management",
    description: "Centralized logging and real-time analysis of security events across your organization.",
    icon: "bi-journal-text",
    fullDescription: "Security Information and Event Management (SIEM) collects and analyzes log data from across your organization to detect and respond to security threats. With correlation rules and machine learning, it identifies suspicious activities that might indicate a security incident, enabling rapid response.",
    actions: ["View Logs", "Create Rules", "Run Analysis", "Generate Report"]
  },
  {
    id: 8,
    title: "Vulnerability Management",
    description: "Identify, evaluate, and remediate security vulnerabilities in your systems.",
    icon: "bi-exclamation-triangle",
    fullDescription: "Our Vulnerability Management solution continuously scans your systems for security weaknesses. It prioritizes vulnerabilities based on risk and provides guidance for remediation. Integration with your existing systems allows for automated patching and configuration management to close security gaps.",
    actions: ["Run Scan", "View Results", "Prioritize Issues", "Generate Report"]
  },
  {
    id: 9,
    title: "Data Loss Prevention",
    description: "Prevent unauthorized exfiltration of sensitive data from your organization.",
    icon: "bi-file-lock",
    fullDescription: "Data Loss Prevention (DLP) monitors and controls data transfers to prevent sensitive information from leaving your organization. It uses content inspection, contextual analysis, and user behavior analytics to identify and block potential data breaches. Custom policies ensure compliance with data protection regulations.",
    actions: ["Configure Policies", "Monitor Activity", "View Incidents", "Generate Report"]
  },
  {
    id: 10,
    title: "Email Security",
    description: "Protect against phishing, malware, and other email-based threats.",
    icon: "bi-envelope",
    fullDescription: "Our Email Security solution filters incoming and outgoing emails to block spam, phishing attempts, and malware. It uses advanced threat detection techniques including sandboxing, URL rewriting, and attachment analysis to protect your organization from email-based attacks.",
    actions: ["Configure Filters", "View Quarantine", "Run Analysis", "Generate Report"]
  },
  {
    id: 11,
    title: "Security Orchestration, Automation and Response",
    description: "Automate security operations and accelerate incident response.",
    icon: "bi-gear",
    fullDescription: "Security Orchestration, Automation and Response (SOAR) integrates your security tools to streamline operations. It automates routine tasks, orchestrates incident response workflows, and provides a centralized platform for managing security operations, reducing response times and improving efficiency.",
    actions: ["Create Playbook", "Run Automation", "View Incidents", "Generate Report"]
  },
  {
    id: 12,
    title: "Mobile Security",
    description: "Secure mobile devices and applications against evolving threats.",
    icon: "bi-phone",
    fullDescription: "Our Mobile Security solution protects corporate and personal mobile devices used in your organization. It includes mobile threat defense, app vulnerability scanning, secure container for corporate data, and compliance management to ensure mobile devices do not become a weak point in your security posture.",
    actions: ["Enroll Device", "Run Scan", "View Policies", "Generate Report"]
  },
  {
    id: 13,
    title: "IoT Security",
    description: "Secure your Internet of Things devices and networks from cyber threats.",
    icon: "bi-cpu",
    fullDescription: "IoT Security provides visibility and control over all IoT devices connected to your network. It discovers and profiles devices, monitors for anomalous behavior, and segments IoT devices to prevent lateral movement of threats. Protect your smart devices from becoming entry points for attackers.",
    actions: ["Discover Devices", "Run Scan", "Configure Policies", "Generate Report"]
  },
  {
    id: 14,
    title: "Security Awareness Training",
    description: "Educate your employees on security best practices and threat awareness.",
    icon: "bi-mortarboard",
    fullDescription: "Our Security Awareness Training program educates employees on recognizing and responding to security threats. It includes interactive training modules, simulated phishing attacks, and regular assessments to build a security-conscious culture within your organization.",
    actions: ["Launch Training", "Simulate Phishing", "View Results", "Generate Report"]
  },
  {
    id: 15,
    title: "Penetration Testing",
    description: "Identify security weaknesses through controlled simulated attacks.",
    icon: "bi-bug-fill",
    fullDescription: "Our Penetration Testing service simulates real-world attacks to identify vulnerabilities in your systems, applications, and networks. Our ethical hackers use the same techniques as malicious actors to uncover security weaknesses before they can be exploited, providing detailed reports and remediation guidance.",
    actions: ["Schedule Test", "View Scope", "Monitor Progress", "View Report"]
  },
  {
    id: 16,
    title: "Compliance Management",
    description: "Ensure adherence to regulatory requirements and industry standards.",
    icon: "bi-clipboard-check",
    fullDescription: "Compliance Management helps you meet regulatory requirements such as GDPR, HIPAA, PCI DSS, and more. It provides automated compliance checks, gap analysis, and evidence collection to simplify audits and demonstrate compliance to regulators and stakeholders.",
    actions: ["Assess Compliance", "Configure Policies", "Run Audit", "Generate Report"]
  }
]

export default featuresData