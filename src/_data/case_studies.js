module.exports = [
  {
    title: "Secure Home Lab & Network Segmentation",
    url: "/case-study/homelab/",
    blog_url: "/blog/why-i-put-my-smart-devices-in-a-digital-cage/",
    description: "A comprehensive home lab built to reclaim data ownership and create a secure, segmented network for IoT devices and security experiments.",
    tech_stack: ["OPNsense", "UnRAID", "Docker", "VLANs", "Jellyfin", "Unbound DNS"],
    problem: "Consumer-grade networks are typically \"flat,\" meaning a single compromised IoT device can act as a beachhead for an attacker to compromise high-value targets like personal computers or file servers.",
    solution: "I implemented a multi-VLAN architecture using OPNsense to segment the network into four primary zones: Trusted, IoT, Guest, and Lab. Strict firewall rules block all inter-VLAN traffic by default, with specific exceptions for necessary communication. This containment strategy ensures that even if an IoT device is compromised, the blast radius is limited to its own isolated network segment, protecting critical assets.",
    is_placeholder: false
  },
  {
    title: "CI/CD Security Pipeline",
    description: "A complete CI/CD pipeline template using GitHub Actions that incorporates static application security testing (SAST) and software composition analysis (SCA).",
    is_placeholder: true
  },
  {
    title: "Cloud Threat Modeling Dashboard",
    description: "A web-based application that allows teams to collaboratively create and manage threat models for their software projects using the STRIDE methodology.",
    is_placeholder: true
  }
];
