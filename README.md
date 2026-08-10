# Venkata Poka - Software Engineer II

Software Engineer II specializing in distributed systems, storage, and streaming infrastructure. Currently at **Intuit** on the QuickBooks Sales & Invoicing platform, operating a tier-0 service that processes 50K+ transactions/minute and $1–2B in payments annually.

## 👨‍💼 About Me

Backend SDE-2 building distributed, event-driven systems on Java, Spring Boot, Kafka, and Kubernetes (AWS). I operate a tier-0 service that processes 50,000+ transactions/minute and orchestrates 12 downstream services over multi-topic Kafka events. Deep interest in storage and streaming internals: I built MiniKV, an LSM-tree storage engine in Java, and a pluggable Kafka event-bus framework. Primary on-call for a tier-0 service, I own P0 incident response end to end and root-cause concurrency and memory failures in production.

**Key Focus Areas:**
- Distributed Systems & Microservices - Migrating APIs from a legacy monolith to a modern Spring Boot/Kubernetes stack; designing event-driven architectures with Kafka
- Storage & Streaming Internals - LSM-tree storage engines, WAL/SSTable design, Kafka event-bus frameworks with schema validation, DLQs, and idempotent producers
- Performance Optimization - Redis-backed caching, connection pool tuning, and dashboard-driven latency analysis
- Reliability & Incident Response - Primary on-call for a tier-0 service; P0 root-cause analysis and AI-assisted incident triage
- Cloud & DevOps - AWS, Docker, Kubernetes, CI/CD pipelines, and observability

**Education:**
- M.S. in Computer Science - Southeast Missouri State University (Aug 2022 - Dec 2023, GPA: 3.7/4.0)
- B.Tech in Computer Science Engineering - Acharya Nagarjuna University, India (Jul 2018 - May 2022)

## 🛠️ Technical Skills

**Languages:** Java (primary), Python, JavaScript/TypeScript, Go, SQL

**Distributed Systems & Cloud:**
- Kafka, microservices, event-driven architectures
- Circuit breakers (Resilience4j), caching
- AWS, Docker, Kubernetes, CI/CD

**Backend:**
- Spring Boot, Spring Cloud, JPA/Hibernate, Node.js

**Reliability & Practices:**
- On-call & incident response, system design
- Observability/dashboards, code review

**Data:** MySQL, Redis, MongoDB, SQL Server

**AI & LLM Tooling:** Claude Code, Cursor, Gemini (daily dev & debugging), LangChain agents, AI-assisted incident triage

**Payments & APIs:** REST, GraphQL, high-throughput transaction processing, idempotency keys, Saga orchestration, webhook signing (HMAC-SHA256), rate limiting, reconciliation

## 💼 Professional Experience

### Intuit - Software Engineer II (Mar 2025 - Present)
*QuickBooks Sales & Invoicing · Java, Spring Boot, Kafka, Kubernetes, AWS, Redis*
- Operate the tier-0 service that processes 50,000+ transactions/minute and $1–2B/fiscal year, orchestrating 12 downstream services and consuming Kafka events across multiple topics to commit a single transaction
- Owned the migration of 13 APIs (6 in the Neo domain, 7 in V3) from the legacy QuickBooks monolith to a modern Java/Spring Boot stack on Kubernetes
- Introduced a Redis-backed caching layer on the hottest read paths that reduced p90 latency from ~4x to ~1x of the SLA target, and drove the Settings domain integration into the Sales service
- Primary on-call for a tier-0 service; during a US-East regional P0, identified the broken downstream call in ~10 minutes and led the traffic cutover to restore customer functionality
- Root-caused an unbounded in-memory cache that gradually OOM-crashed pods and shipped a lifecycle-scoped fix that closed the incident and prevented recurrence
- Built an end-to-end LangChain agent that fires on an on-call page, automatically investigates the failure, and surfaces a first-pass root-cause analysis

### Humana - Software Developer (Jan 2024 - Mar 2025)
*Doctor-appointment portal & payments gateway · Java, Spring Boot, Kafka, REST APIs*
- Built and maintained backend REST APIs for Humana's doctor-appointment scheduling portal, covering appointment booking, provider availability, and patient-facing scheduling workflows
- Worked on the payment gateway behind patient billing and copay transactions, integrating a third-party payment processor and the transaction-handling logic around it
- Used Kafka for event-driven processing across services, with performance and reliability improvements as request volume grew

### Optum - Java Developer Intern (Jul 2021 - Jun 2022)
*Hyderabad, India*
- Worked on a Java/Spring MVC + Hibernate codebase: triaged and fixed assigned bugs, wrote unit tests, and shipped fixes through code review; first hands-on exposure to enterprise backend development

## 🚀 Featured Projects

### MiniKV - Write-Optimized Key-Value Store
LSM-tree key-value storage engine in Java (WAL, MemTable, SSTables) with Bloom filters, an LRU block cache, and size-tiered compaction.
- **Highlights:** 9.25M mixed-read ops/s (8 threads), sub-50ms crash recovery, 20 tests
- **Tech Stack:** Java, LSM-Tree, WAL, SSTables, Bloom Filters
- **GitHub:** [github.com/chowpawan/MiniKV](https://github.com/chowpawan/MiniKV)

### Distributed Event Bus Framework
Pluggable event bus on Kafka with publish-time schema validation, per-topic DLQ, exponential-backoff retry (1s→2s→4s), idempotent producer (acks=all), correlation-ID tracing, and Prometheus metrics.
- **Highlights:** 18 tests, order-service → inventory-service event chain demo
- **Tech Stack:** Java, Spring Boot, Kafka, Prometheus, Distributed Systems
- **GitHub:** [github.com/chowpawan/EventBus](https://github.com/chowpawan/EventBus)

### Distributed Payment Processing System
4 Spring Boot services on the Stripe sandbox with idempotency-key dedup on Redis (SETNX, 24h TTL), a crash-recoverable Saga orchestrator, a scheduled reconciliation worker, and HMAC-SHA256 signed webhooks with retry.
- **Highlights:** 27 tests, exactly-once payment semantics
- **Tech Stack:** Java, Spring Boot, Redis, Stripe API, Saga Pattern, Distributed Transactions
- **GitHub:** [github.com/chowpawan/Distributed-Payment-Processing-System](https://github.com/chowpawan/Distributed-Payment-Processing-System)

## 🏆 Certifications

- **AWS Certified Cloud Practitioner** - Cloud computing fundamentals and AWS services
- **Machine Learning** - NPTEL (IIT Madras)
- **Java Full-Stack Development** - Board Infinity

## 🔗 Connect With Me

- **GitHub:** [github.com/chowpawan](https://github.com/chowpawan)
- **LinkedIn:** [linkedin.com/in/pavankalp](https://www.linkedin.com/in/pavankalp/)
- **Email:** pawanpoka3333@gmail.com
- **Location:** Mountain View, CA, USA

## 📱 Portfolio Features

- 🎨 Multi-theme support (Red, Blue, Green, Purple, Yellow)
- 🌙 Dark mode toggle
- 📱 Fully responsive design
- ⚡ Performance optimized
- 🔍 SEO optimized with meta tags and social sharing support

---

Built with HTML, CSS, and JavaScript | Last Updated: August 2026
