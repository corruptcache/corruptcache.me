---
layout: layouts/post.njk
title: "More Than Packets: How Network+ Transformed My Approach to Application Security"
description: "Discover how mastering networking fundamentals through the CompTIA Network+ certification can revolutionize your approach to application security and vulnerability assessment."
date: 2025-07-08
image: /assets/images/more-than-packets-hero.webp
image_alt: "An abstract network grid with glowing data packets and security shields, representing the intersection of networking and security."
permalink: /blog/more-than-packets/
tags:
  - network-security
  - application-security
  - comptia-network-plus
  - cybersecurity-certifications
  - networking-fundamentals
  - appsec
  - web-application-security
  - penetration-testing
  - network-forensics
  - security-best-practices
---

The emergency Slack channel explodes. The application is lagging, alerts are firing, and the finger pointing commences. The developers **swear** the build is solid: "It worked in staging! It has to be the network." The network admins clap back from their own dashboards: "Our metrics are green. It has to be the code."

This back and fouth is an industry cliché for a reason. I remember the struggle well from [my own start in tech](/about). When I was building MVPs earning my full-stack certificate in 2018, deploying an application was an exercise in faith. I knew enough to regurgitate the steps  to deploy on Heroku, but the actual mechanics were a mystery. It’s a common rite of passage for developers to treat the network as a utility. A black box that just works. In Application Security, that black box isn't just a gap in knowledge. **It's a gaping hole in our defenses.**

Tired of what felt like guessing, I decided it was time to fill that gap. I challenged myself with the CompTIA Network+ certification. After weeks of studying and applying the concepts by rebuilding [my own home network from scratch](/my_work), I passed it on my first try. The real prize wasn't the certificate, though. It was the powerful new lens it gave me to see risk. It taught me that the roots of many application vulnerabilities aren't in the code, but in the network it trusts.

let's go over the some concepts I stole from the Net+ syllabus, and how you can use them to become a more effective [Application Security Engineer](/resume).

---

## The OSI Model: Your Practical Troubleshooting Map

Most developers remember the **OSI model** as a useless mnemonic from a computer science class. We memorized the 7 layers for a test and promptly forgot them. In Application Security, this is a oversight. The **OSI model** is one of the most powerful diagnostic tools you can have.

The key is to use it as a map to answer one critical question: **Where is the problem?**

### The Scenario: An Unreachable API

Imagine your application can't reach a critical API. Instead of guessing, you use the **OSI model** to troubleshoot logically from top to bottom.

![A diagram of the 7 layers of the OSI model, from Application down to Physical.](/assets/images/osi-model.webp)

#### Step 1:  Check Your Own House First  (Layer 7 - Application)
* **Action:** Use a tool like `curl` to make a direct request to the API endpoint.
    ```bash
    curl https://api.example.com/v1/status
    ```
* **Analysis:** If you get back **any HTTP response** (like a `404 Not Found`), the network connection is likely fine. The problem is at the **application layer**: a bad code deployment, a Web Application Firewall (WAF) rule, or a server misconfiguration.

#### Step 2: Are the Doors Unlocked? (Layer 4 - Transport)
* **Action:** If your `curl` request times out, try to make a basic TCP connection using a tool like `telnet`.
    ```bash
    telnet api.example.com 443
    ```
* **Analysis:** If the connection is `refused` or `times out`, the application is never even seeing your request. The problem is at the **transport layer**: a **firewall**, an AWS **security group**, or another network access control is blocking the port.

#### Step 3: Does This Address Even Exist? (Layer 3 - Network)
* **Action:** If you can't even make a TCP connection, check basic connectivity with `ping`.
* **Analysis:** If `ping` fails, you can't even find a path to the server. The problem is at the **network layer**: a routing issue.

> **The AppSec Takeaway:** The **OSI model** turns you from a developer who guesses ("The server is down!") into a security professional who diagnoses ("It looks like the firewall is blocking TCP port 443."). It provides a systematic way to isolate application issues from network issues—a critical skill in any security incident investigation.

---

## DNS: The Internet's Vulnerable Phonebook

To most developers, **DNS** is an enigma. You register a domain, point an ‘A’ record to your server’s IP, and you’re done. It's the "set and forget" service. Studying for the Network+ forces you to see **DNS** for what it is: a complex, globally distributed database full of security weaknesses.

For an AppSec pro, understanding that "phonebook" is not just for reading—it's for exploiting.

### Vulnerability 1: Your TXT Records are Spilling Secrets
Your public `TXT` and `SPF` records often announce which third-party services your company trusts (e.g., Google, Salesforce). An attacker queries these records to get a cheat sheet for planning a sophisticated phishing attack. An attacker can craft a fake email that looks like it's from a service you *actually use*.

### Vulnerability 2: Subdomain Takeover via Dangling CNAMEs
A `CNAME` record pointing to a decommissioned service (like an old GitHub Page or Heroku instance) is a "dangling" pointer. An attacker can claim your old address on that service and instantly host malicious content on your official subdomain. This high-impact vulnerability is called subdomain takeover, and knowing how `CNAME` records work makes you paranoid enough to look for it.

![A diagram showing a malicious user exploiting a dangling CNAME record to take over a subdomain.](/assets/images/dangling-cname.png)

### Vulnerability 3: The Threat of DNS Cache Poisoning
An attacker can "poison" a DNS server's cache to redirect users from your legitimate site to a phishing site. While you can't always prevent this, *understanding* the threat is critical. If users report that your site looks "phishy" but you can't reproduce it, a security-aware pro would add DNS poisoning to their list of possible causes.

> **The AppSec Takeaway:** To a developer, **DNS** is a simple signpost. To a security professional, it’s a public announcement of your tech stack, a map of potential attack surfaces, and a vector for misdirection. Knowing its weaknesses is fundamental to seeing the bigger security picture.

---

## From Developer to Defender

Ultimately, learning these networking concepts does more than add tools to your kit; it changes your perspective. Seeing how the **OSI model** pinpoints failure and how **DNS** can be a roadmap for an attacker is fundamental to the daily work of securing applications.

Your developer background isn't a past life; it's your primary advantage in the trenches of application security. It gives you the unique ability to see systems as both a builder and a breaker. Keep that builder's mindset, stay hands-on, and never stop inspecting the layers underneath the code.
