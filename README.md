# Venkata Poka - Software Engineer

Backend Software Engineer at **Intuit**, building services for QuickBooks Sales & Invoicing, a tier-0 service, and now QuickBooks Risk Management. Backend engineer working in Java, Spring Boot, Kafka, Redis, GraphQL, Kubernetes, and AWS, plus LangChain agents and MCP servers.

## 👨‍💼 About Me

On QuickBooks Sales & Invoicing, a tier-0 service, I built the invoice creation APIs, migrated sales APIs out of the monolith into a standalone service, added Redis caching that cut a company-info lookup from ~700 ms to ~2 ms, and was primary on-call. I now write Drools rules for fraud, sanctions screening, and lending decisions on QuickBooks Risk Management. I also build AI tooling: a LangChain agent backed by a Splunk MCP server that cut on-call triage from 45 to 10 minutes, and an MCP server used by 250+ engineers across 10 teams.

**Key Focus Areas:**
- Microservices & Migrations - V3 API orchestration design, monolith-to-service migration with side-by-side response comparison and staged traffic shifts
- Performance - Redis (AWS ElastiCache) caching across more than a dozen slow downstream calls
- AI Tooling - LangChain agents, MCP servers, Claude Code, Cursor, Gemini
- Reliability & Incident Response - Primary on-call for a tier-0 service; P0 root-cause analysis
- Rules Engines - Drools (DRL and BPMN) for fraud, sanctions, and lending policy

**Education:**
- M.S. in Computer Science - Southeast Missouri State University (Aug 2022 - Dec 2023, GPA: 3.7/4.0)
- B.Tech in Computer Science and Engineering - Acharya Nagarjuna University, India (Jul 2018 - May 2022)

## 🛠️ Technical Skills

**Languages:** Java 11/17/21, Python, J2EE, SQL, JavaScript/TypeScript, HTML, CSS

**Backend & Frontend:** Spring Boot, Spring MVC, JPA/Hibernate, REST web services, GraphQL, FastAPI, Node.js, React

**Cloud & DevOps:** AWS (EKS, EC2, S3, SQS/SNS, DynamoDB, RDS, Lambda), Docker, Kubernetes, Git, Maven, Jenkins, CI/CD

**Data & Messaging:** Kafka, Redis, PostgreSQL, MySQL, SQL Server, MongoDB

**Practices:** Agile/Scrum, SDLC, TDD, object-oriented design, microservices, event-driven design, Saga, idempotency, code review, Karate/JUnit/TestContainers, Splunk, Prometheus, Grafana

**AI:** LangChain, MCP servers, Claude Code, Cursor, Gemini, custom agent skills and automation loops

## 💼 Professional Experience

### Intuit - Software Engineer (Mar 2025 - Present)

**QuickBooks Risk Management (Aug 2026 - Present)** · *Java, Drools, Spring Boot*
- Write and ship Drools rules (DRL and BPMN flows) for fraud, sanctions screening, and Mastercard Match, packaged as Maven KJARs, tested with JUnit, and released through Jenkins to the Risk Onboarding Service; wrote the team's rule-release guide
- Lead the policy and rule changes for Revenue-Based Financing (RBF) and New to the Franchise (NTTF) Line of Credit with risk, lending, and payments teams, including Term Loan decisioning for RBF applicants, an RBF eligibility check on the driver's-license verification decline rule, and an account-takeover BPMN flow for day-0 Line of Credit and partner traffic

**QuickBooks Sales & Invoicing (Mar 2025 - Jul 2026)** · *Java, Spring MVC, Kafka, Redis, GraphQL, AWS EKS*
- Built a Python LangChain agent backed by a 9-tool Splunk MCP server that auto-investigates on-call pages, cutting average triage time from 45 to 10 minutes (78%); built a Python MCP server that lets engineers query the sales service database from AI coding assistants, now used by 250+ engineers across 10 teams
- Built and maintained the Java REST APIs for invoice creation in the QuickBooks web and mobile apps, and moved invoice, payment, credit memo, and estimate email and printing to the new service, with Karate tests for each print path
- Designed the V3 API orchestration and wrote its design doc, then migrated QuickBooks sales APIs out of the monolith into a standalone service (Maven, Docker, Kubernetes, Jenkins), comparing old and new responses side by side, fixing a race condition in the Kafka data sync, and shifting traffic in stages
- Added Redis (AWS ElastiCache) caching to more than a dozen slow downstream calls; a company-info lookup dropped from ~700 ms to ~2 ms, and an API read that called the contacts API ~112 times now makes one call
- Scoped and built GraphQL endpoints for the QuickBooks mobile app and worked with five partner teams to move mobile traffic to the new service, including ramping 25% of Estimate traffic
- Fixed bugs across QA, pre-production, production, and post-release patches, and reviewed 380+ pull requests
- Primary on-call for a tier-0 service; in a US-East P0 that blocked invoice creation for ~50K customers, isolated the failing call in ~10 minutes, led the traffic cutover, then root-caused and fixed an unbounded cache that OOM-crashed pods

### Humana - Software Engineer (Jan 2024 - Mar 2025)
*Atlanta, GA*
- Built and maintained 4 backend REST APIs in Java and Spring Boot for Humana's doctor-appointment scheduling portal (~190 requests/min), covering booking, provider availability, and patient scheduling workflows
- Worked on the payment gateway that processes billions of dollars in patient billing and copay payments, integrating a third-party payment processor and using Kafka and AWS SQS for event-driven processing, reducing latency by 10% and error rate by 14%

### Optum - Software Engineer Intern (Nov 2021 - May 2022)
*Hyderabad, India*
- Triaged and fixed ~40 bugs in a Java/Spring MVC + Hibernate (JPA) codebase and shipped React/JavaScript UI changes
- Raised JUnit test coverage from 70% to 85% per module, shipping all changes through code review in two-week Agile sprints

## 🚀 Featured Projects

### MiniKV - Write-Optimized Key-Value Store
LSM-tree key-value store in Java with a write-ahead log, MemTable, SSTables, Bloom filters, and compaction.
- **Highlights:** 9.25M mixed operations per second on 8 threads
- **Tech Stack:** Java, LSM-Tree, WAL, SSTables, Bloom Filters
- **GitHub:** [github.com/chowpawan/MiniKV](https://github.com/chowpawan/MiniKV)

### Distributed Payment Processing System
Four Stripe payment services in Spring Boot using Redis idempotency keys to stop duplicate charges, a Saga that recovers after crashes, a reconciliation job, and signed webhooks.
- **Highlights:** 27 JUnit tests
- **Tech Stack:** Java, Spring Boot, Redis, Stripe API, Saga Pattern
- **GitHub:** [github.com/chowpawan/Distributed-Payment-Processing-System](https://github.com/chowpawan/Distributed-Payment-Processing-System)

### CentSight - Personal Finance App
Full-stack finance app with a mobile-first React PWA and REST APIs that sync bank and card data via Plaid, with OAuth2 sign-in and encrypted tokens, deployed to AWS via Terraform.
- **Tech Stack:** Java, Spring Boot, React, PostgreSQL, Plaid, Terraform
- **GitHub:** [github.com/chowpawan/centsight](https://github.com/chowpawan/centsight)

### Distributed Event Bus Framework
Event bus on Kafka with schema validation, dead letter queues, retries, and lag metrics.
- **Tech Stack:** Java, Spring Boot, Kafka, Prometheus
- **GitHub:** [github.com/chowpawan/EventBus](https://github.com/chowpawan/EventBus)

## 🏆 Certifications

- **Claude Certified Architect, Foundations** - Anthropic
- **AWS Certified Cloud Practitioner** - Cloud computing fundamentals and AWS services
- **Machine Learning** - NPTEL (IIT Madras)
- **Java Full-Stack Development** - Board Infinity

## 🔗 Connect With Me

- **GitHub:** [github.com/chowpawan](https://github.com/chowpawan)
- **LinkedIn:** [linkedin.com/in/pavankalp](https://www.linkedin.com/in/pavankalp/)
- **Portfolio:** [chowpawan.github.io/Portfolio](https://chowpawan.github.io/Portfolio/)
- **Email:** pawanpoka3333@gmail.com
- **Location:** Mountain View, CA, USA

## 📱 Portfolio Features

- 📊 **Impact stats** - animated counters on the home page for the headline results (triage 45 to 10 min, lookups ~700 ms to ~2 ms, 250+ MCP users, 380+ PRs reviewed)
- 🚨 **P0 case study** - interactive timeline of a US-East incident, from page to fix, with play, step, and keyboard controls
- 🧩 **Skill chips** - grouped tech tags that show where each skill was used, with Intuit / Humana / Optum / Projects filters
- 💻 **Terminal mode** - press the backtick key (or the hero button) for a terminal with `whoami`, `experience`, `projects`, `stats`, `oncall`, `goto`, `theme`, and more
- 🌙 Dark mode by default, with a light mode toggle
- 🎨 Multi-theme support (Red, Blue, Green, Purple, Yellow)
- 📱 Fully responsive design, and respects reduced-motion settings
- 🔍 SEO optimized with meta tags and social sharing support

---

Built with HTML, CSS, and JavaScript | Last Updated: October 2026
