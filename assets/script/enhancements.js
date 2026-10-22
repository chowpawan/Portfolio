// Enhancements: hero stats, skill chips, P0 case study, terminal mode
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RESUME_URL = "https://pavan-poka-resume.tiiny.site";
  const EMAIL = "pawanpoka3333@gmail.com";

  // Switch sections through the existing nav handler so state stays in sync
  function goTo(id) {
    const link = document.querySelector(`.nav a[href="#${id}"]`);
    if (!link) return false;
    const aside = document.querySelector(".aside");
    const wasOpen = aside && aside.classList.contains("open");
    link.click();
    // On small screens the nav handler toggles the aside; undo it if it was closed
    if (aside && !wasOpen && aside.classList.contains("open") && typeof asideSectionTogglerBtn === "function") {
      asideSectionTogglerBtn();
    }
    return true;
  }

  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(el.dataset.goto);
    });
  });

  // ---------- Hero: rotating role ----------
  const rotator = document.querySelector(".role-rotator");
  if (rotator && !reduceMotion) {
    const words = ["Distributed Systems", "Microservices", "Kafka & Redis", "AI Tooling & MCP", "Rules Engines"];
    let i = 0;
    setInterval(() => {
      rotator.classList.add("out");
      setTimeout(() => {
        i = (i + 1) % words.length;
        rotator.textContent = words[i];
        rotator.classList.remove("out");
      }, 300);
    }, 2600);
  }

  // ---------- Hero: impact counters ----------
  function runCounters() {
    document.querySelectorAll(".impact-stats .count").forEach((el) => {
      const from = Number(el.dataset.from);
      const to = Number(el.dataset.to);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        // rAF timestamps can predate `start`, so clamp to keep progress in [0, 1]
        const t = Math.max(0, Math.min((now - start) / duration, 1));
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(from + (to - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  if (!reduceMotion) {
    window.addEventListener("load", () => setTimeout(runCounters, 700));
  }

  // ---------- Skill chips ----------
  const where = document.querySelector(".stack-where");
  const chips = document.querySelectorAll(".chip");
  const defaultWhere = where ? where.textContent : "";

  function showWhere(chip) {
    if (!where) return;
    chips.forEach((c) => c.classList.remove("selected"));
    chip.classList.add("selected");
    where.textContent = "";
    const name = document.createElement("strong");
    name.textContent = chip.textContent;
    where.append(name, ": " + chip.dataset.where);
  }
  chips.forEach((chip) => {
    chip.addEventListener("mouseenter", () => showWhere(chip));
    chip.addEventListener("focus", () => showWhere(chip));
    chip.addEventListener("click", () => showWhere(chip));
  });

  const filterLabels = { intuit: "Intuit", humana: "Humana", optum: "Optum", projects: "my projects" };
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      chips.forEach((chip) => {
        const tags = (chip.dataset.tags || "").split(" ");
        chip.classList.toggle("dim", f !== "all" && !tags.includes(f));
        chip.classList.remove("selected");
      });
      if (where) where.textContent = f === "all" ? defaultWhere : `Highlighting what I used at ${filterLabels[f]}.`;
    });
  });

  // ---------- P0 case study ----------
  const steps = Array.from(document.querySelectorAll(".incident-steps .step"));
  const panels = Array.from(document.querySelectorAll(".incident-panels .panel"));
  const status = document.querySelector(".incident-status");
  const statusText = status && status.querySelector(".status-text");
  const playBtn = document.querySelector('.ctrl[data-ctrl="play"]');
  let current = 0;
  let timer = null;

  function setStep(n, focus) {
    current = Math.max(0, Math.min(n, steps.length - 1));
    steps.forEach((s, i) => {
      s.classList.toggle("active", i === current);
      s.classList.toggle("done", i < current);
      s.setAttribute("aria-selected", i === current ? "true" : "false");
      s.tabIndex = i === current ? 0 : -1;
    });
    panels.forEach((p, i) => {
      p.hidden = i !== current;
      p.classList.toggle("active", i === current);
    });
    const step = steps[current];
    if (status) status.dataset.state = step.dataset.state;
    if (statusText) statusText.textContent = step.dataset.status;
    if (focus) step.focus();
    // Keep the active step visible when the strip scrolls sideways on phones
    const strip = step.closest(".incident-steps");
    if (strip && strip.scrollWidth > strip.clientWidth) {
      const li = step.parentElement;
      strip.scrollLeft = li.offsetLeft - (strip.clientWidth - li.offsetWidth) / 2;
    }
  }

  function setPlaying(on) {
    if (!playBtn) return;
    clearInterval(timer);
    timer = null;
    playBtn.innerHTML = on ? '<i class="fa fa-pause"></i> <span>Pause</span>' : '<i class="fa fa-play"></i> <span>Play</span>';
    if (!on) return;
    if (current === steps.length - 1) setStep(0);
    timer = setInterval(() => {
      if (current >= steps.length - 1) return setPlaying(false);
      setStep(current + 1);
    }, 4500);
  }

  if (steps.length) {
    steps.forEach((s, i) => {
      s.addEventListener("click", () => { setPlaying(false); setStep(i); });
      s.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); setStep(current + 1, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); setStep(current - 1, true); }
      });
    });
    document.querySelectorAll(".incident-controls .ctrl").forEach((c) => {
      c.addEventListener("click", () => {
        const action = c.dataset.ctrl;
        if (action === "play") return setPlaying(!timer);
        setPlaying(false);
        setStep(current + (action === "next" ? 1 : -1));
      });
    });
    setStep(0);
  }

  // ---------- Terminal mode ----------
  const SECTIONS = ["home", "about", "case-study", "projects", "awards", "testimonials", "contact"];
  const THEMES = ["red", "blue", "green", "purple", "yellow"];

  const data = {
    whoami: [
      ["accent", "Venkata Pavan Poka"],
      ["", "Backend Software Engineer at Intuit · Mountain View, CA"],
      ["muted", "Java, Spring, Kafka, Redis, GraphQL, AWS EKS · LangChain agents & MCP servers"],
    ],
    experience: [
      ["accent", "Intuit · Software Engineer · Mar 2025 - Present"],
      ["", "  QuickBooks Sales & Invoicing (Mar 2025 - Jul 2026)"],
      ["muted", "    - Invoice creation REST APIs for QuickBooks web and mobile"],
      ["muted", "    - Designed V3 API orchestration; migrated sales APIs out of the monolith"],
      ["muted", "    - Redis caching: company-info lookup ~700 ms -> ~2 ms"],
      ["muted", "    - LangChain + Splunk MCP agent: on-call triage 45 -> 10 min"],
      ["muted", "    - Primary on-call for a tier-0 service; 380+ PRs reviewed"],
      ["", "  QuickBooks Risk Management (Aug 2026 - Present)"],
      ["muted", "    - Drools rules (DRL, BPMN) for fraud, sanctions, and lending decisions"],
      ["accent", "Humana · Software Engineer · Jan 2024 - Mar 2025"],
      ["muted", "    - Scheduling portal APIs (~190 req/min); payment gateway on Kafka + SQS"],
      ["accent", "Optum · Software Engineer Intern · Nov 2021 - May 2022"],
      ["muted", "    - ~40 bugs fixed; JUnit coverage 70% -> 85%"],
    ],
    projects: [
      ["accent", "MiniKV", "https://github.com/chowpawan/MiniKV"],
      ["muted", "  LSM-tree KV store · WAL, SSTables, Bloom filters · 9.25M ops/s on 8 threads"],
      ["accent", "Distributed Payment Processing", "https://github.com/chowpawan/Distributed-Payment-Processing-System"],
      ["muted", "  Stripe services · Redis idempotency keys · crash-safe Saga · 27 JUnit tests"],
      ["accent", "CentSight", "https://github.com/chowpawan/centsight"],
      ["muted", "  React PWA + Spring Boot · Plaid sync · OAuth2 · AWS via Terraform"],
      ["accent", "Distributed Event Bus", "https://github.com/chowpawan/EventBus"],
      ["muted", "  Kafka · schema validation · DLQs · retries · lag metrics"],
      ["accent", "PassKey", "https://github.com/chowpawan/PassKey"],
      ["muted", "  Passwordless vault · WebAuthn · AES-GCM"],
      ["accent", "API Gateway", "https://github.com/chowpawan/APIGateWay"],
      ["muted", "  Redis rate limiting · Resilience4j · JWT"],
    ],
    skills: [
      ["", "  languages   Java 11/17/21, Python, SQL, JavaScript/TypeScript"],
      ["", "  backend     Spring Boot, Spring MVC, GraphQL, REST, Drools, FastAPI, React"],
      ["", "  cloud       AWS (EKS, ElastiCache, SQS, S3, Lambda), Docker, Kubernetes, Jenkins, Terraform"],
      ["", "  data        Kafka, Redis, PostgreSQL, MySQL, SQL Server, MongoDB"],
      ["", "  ai          LangChain, MCP servers, Claude Code, Cursor, Gemini"],
    ],
    stats: [
      ["ok", "  45 -> 10 min   on-call triage with my LangChain agent (78% faster)"],
      ["ok", " 700 -> 2 ms     company-info lookup with Redis caching"],
      ["ok", " 112 -> 1        contacts API calls per read after caching"],
      ["ok", "     250+        engineers across 10 teams on my MCP server"],
      ["ok", "     380+        pull requests reviewed"],
    ],
    oncall: [
      ["err", "[P0] US-East outage blocked invoice creation for ~50K customers"],
      ["", "  T+0      page fires; I'm primary on-call"],
      ["", "  ~10 min  traced it to one downstream call behind an open circuit breaker"],
      ["", "  cutover  led the traffic cutover; invoicing restored"],
      ["", "  ~2 days  root cause: unbounded in-memory cache OOM-crashing pods"],
      ["ok", "  15 min   shipped the lifecycle-scoped cache fix; resolved"],
      ["muted", "Type 'goto case-study' for the interactive version."],
    ],
  };

  const help = [
    ["whoami", "who I am"],
    ["experience", "where I've worked"],
    ["projects", "things I've built"],
    ["skills", "my stack"],
    ["stats", "numbers I'm proud of"],
    ["oncall", "the P0 story, short version"],
    ["resume", "open my resume"],
    ["contact", "how to reach me"],
    ["github / linkedin", "open my profiles"],
    ["goto <section>", SECTIONS.join(", ")],
    ["theme <color>", THEMES.join(", ")],
    ["mode <light|dark>", "switch light or dark mode"],
    ["clear / exit", "clear the screen or close the terminal"],
  ];

  let overlay, body, input, opener;
  const history = [];
  let histIndex = 0;

  function line(text, cls, href) {
    const div = document.createElement("div");
    div.className = "line" + (cls ? " " + cls : "");
    if (href) {
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = text;
      div.appendChild(a);
    } else {
      div.textContent = text;
    }
    body.insertBefore(div, body.lastElementChild);
  }

  function print(rows) {
    rows.forEach(([cls, text, href]) => line(text, cls, href));
  }

  function openUrl(url, label) {
    line(`Opening ${label}...`, "muted");
    window.open(url, "_blank", "noopener");
  }

  function setMode(mode) {
    const radio = document.querySelector(`.mode-switch[value="${mode}"]`);
    if (!radio) return false;
    radio.checked = true;
    radio.dispatchEvent(new Event("change"));
    return true;
  }

  function run(raw) {
    const text = raw.trim();
    const echo = document.createElement("div");
    echo.className = "line";
    const p = document.createElement("span");
    p.className = "ok";
    p.textContent = "visitor@pavan:~$ ";
    const c = document.createElement("span");
    c.className = "cmd";
    c.textContent = text;
    echo.append(p, c);
    body.insertBefore(echo, body.lastElementChild);
    if (!text) return;

    history.push(text);
    histIndex = history.length;
    const [cmd, ...args] = text.split(/\s+/);
    const arg = (args[0] || "").toLowerCase();

    switch (cmd.toLowerCase()) {
      case "help":
      case "ls":
        help.forEach(([k, v]) => line(`  ${k.padEnd(20)} ${v}`));
        break;
      case "whoami":
      case "experience":
      case "projects":
      case "skills":
      case "stats":
      case "oncall":
        print(data[cmd.toLowerCase()]);
        break;
      case "p0":
        print(data.oncall);
        break;
      case "resume":
        openUrl(RESUME_URL, "resume");
        break;
      case "cat":
        if (arg === "resume.pdf") openUrl(RESUME_URL, "resume");
        else line(`cat: ${args[0] || ""}: No such file. Try 'cat resume.pdf'.`, "err");
        break;
      case "contact":
      case "email":
        line(`Email: ${EMAIL}`);
        line(`mailto:${EMAIL}`, "", `mailto:${EMAIL}`);
        line("Based in Mountain View, CA", "muted");
        break;
      case "github":
        openUrl("https://github.com/chowpawan", "GitHub");
        break;
      case "linkedin":
        openUrl("https://www.linkedin.com/in/pavankalp/", "LinkedIn");
        break;
      case "goto":
      case "cd":
        if (SECTIONS.includes(arg)) {
          closeTerminal();
          goTo(arg);
        } else {
          line(`Unknown section. Try: ${SECTIONS.join(", ")}`, "err");
        }
        break;
      case "theme":
        if (THEMES.includes(arg) && typeof setActiveStyle === "function") {
          setActiveStyle(arg);
          line(`Theme set to ${arg}.`, "ok");
        } else {
          line(`Usage: theme <${THEMES.join("|")}>`, "err");
        }
        break;
      case "mode":
        if ((arg === "light" || arg === "dark") && setMode(arg)) line(`Switched to ${arg} mode.`, "ok");
        else line("Usage: mode <light|dark>", "err");
        break;
      case "history":
        history.forEach((h, i) => line(`  ${String(i + 1).padStart(3)}  ${h}`, "muted"));
        break;
      case "sudo":
        if (arg === "hire-pavan" || arg === "hire") {
          line("[sudo] permission granted.", "ok");
          line("Drafting an email to Pavan...", "muted");
          window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's talk")}`;
        } else {
          line("Nice try. Maybe 'sudo hire-pavan'?", "err");
        }
        break;
      case "clear":
        while (body.children.length > 1) body.removeChild(body.firstElementChild);
        break;
      case "exit":
      case "quit":
        closeTerminal();
        break;
      default:
        line(`command not found: ${cmd}. Type 'help' to see what I can do.`, "err");
    }
  }

  const COMMANDS = ["help", "whoami", "experience", "projects", "skills", "stats", "oncall", "resume", "contact", "github", "linkedin", "goto", "theme", "mode", "history", "clear", "exit"];

  function complete() {
    const val = input.value;
    const parts = val.split(/\s+/);
    let pool, prefix;
    if (parts.length === 1) { pool = COMMANDS; prefix = ""; }
    else if (parts[0] === "goto" || parts[0] === "cd") { pool = SECTIONS; prefix = parts[0] + " "; }
    else if (parts[0] === "theme") { pool = THEMES; prefix = "theme "; }
    else if (parts[0] === "mode") { pool = ["light", "dark"]; prefix = "mode "; }
    else return;
    const last = parts[parts.length - 1];
    const matches = pool.filter((w) => w.startsWith(last));
    if (matches.length === 1) input.value = prefix + matches[0] + (prefix ? "" : " ");
    else if (matches.length > 1) line(matches.join("   "), "muted");
  }

  function build() {
    overlay = document.createElement("div");
    overlay.className = "terminal-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="terminal" role="dialog" aria-modal="true" aria-label="Terminal">
        <div class="terminal-bar">
          <button type="button" class="dot red" aria-label="Close terminal"></button>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="title">visitor@pavan: ~</span>
        </div>
        <div class="terminal-body">
          <label class="terminal-input-row">
            <span class="prompt"><span class="host">visitor@pavan</span>:~$</span>
            <input class="terminal-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal command">
          </label>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    body = overlay.querySelector(".terminal-body");
    input = overlay.querySelector(".terminal-input");

    print([
      ["accent", "Welcome to Pavan's terminal."],
      ["muted", "Type 'help' to see commands, or try 'stats', 'oncall', or 'sudo hire-pavan'."],
      ["muted", "Tab completes, arrow keys walk history, Esc closes."],
      ["", " "],
    ]);

    overlay.querySelector(".dot.red").addEventListener("click", closeTerminal);
    overlay.addEventListener("mousedown", (e) => { if (e.target === overlay) closeTerminal(); });
    body.addEventListener("click", (e) => { if (e.target.tagName !== "A") input.focus(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        run(input.value);
        input.value = "";
        body.scrollTop = body.scrollHeight;
      } else if (e.key === "Tab") {
        e.preventDefault();
        complete();
        body.scrollTop = body.scrollHeight;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (histIndex > 0) input.value = history[--histIndex];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        histIndex = Math.min(histIndex + 1, history.length);
        input.value = history[histIndex] || "";
      } else if (e.key === "Escape") {
        closeTerminal();
      }
    });
  }

  function openTerminal() {
    if (!overlay) build();
    opener = document.activeElement;
    overlay.hidden = false;
    input.focus();
  }

  function closeTerminal() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    if (opener && typeof opener.focus === "function") opener.focus();
  }

  document.querySelectorAll("[data-terminal-open]").forEach((b) => b.addEventListener("click", openTerminal));
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === "`" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      openTerminal();
    } else if (e.key === "Escape") {
      closeTerminal();
    }
  });
})();
