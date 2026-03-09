import React, { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
};

const GITHUB_USERNAME = "kevinpchen";
const RESUME_PATH = "/Kevin_Chen_Resume.pdf";

export const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
        );
        if (!res.ok) {
          throw new Error("Failed to load GitHub repositories");
        }
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="header-left">
          <span className="logo-dot" />
          <span className="logo-text">Kevin P Chen</span>
        </div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="main">
        <section id="hero" className="hero">
          <div className="hero-text">
            <p className="eyebrow">CS @ NYU Tandon · Backend & ML</p>
            <h1>
              Backend engineer building distributed systems and applied ML
              infrastructure.
            </h1>
            <p className="hero-subtitle">
              I&apos;m Kevin, a software engineer focused on distributed systems,
              backend infrastructure, and applied machine learning. I&apos;ve built
              internal tools and research systems at Trip.com, Thermo Fisher,
              Aureka Biotechnologies, and NYU&apos;s AI for Scientific Research lab.
            </p>
            <div className="hero-actions">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                View GitHub
              </a>
              <a href="#projects" className="btn ghost">
                See projects
              </a>
              <a
                href={RESUME_PATH}
                className="btn ghost"
                target="_blank"
                rel="noreferrer"
              >
                View resume (PDF)
              </a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-inner">
              <p className="hero-card-title">Currently focused on</p>
              <ul>
                <li>Production ML pipelines for scientific research</li>
                <li>Backend performance, databases, and observability</li>
                <li>Developer tooling and CI/CD automation</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <h2>About</h2>
          <p>
            I&apos;m a computer science student at NYU Tandon (minor in Mathematics
            and Game Engineering) with experience in backend engineering and applied
            machine learning. I enjoy building systems that are measurable,
            observable, and designed to scale.
          </p>
          <p>
            Recently I&apos;ve worked on AF3-based antibody scoring pipelines,
            large-scale NLP systems for scientific research, and internal
            developer tools.
          </p>
        </section>

        <section id="experience" className="section experience">
          <h2>Experience</h2>
          <div className="experience-list">
            <article className="experience-item">
              <header>
                <div>
                  <h3>Aureka Biotechnologies — Research Intern</h3>
                  <p className="experience-meta">Shanghai · Jul 2025 – Aug 2025</p>
                </div>
              </header>
              <ul>
                <li>
                  Built an AF3-based antibody-scoring pipeline with MSA filtering and
                  pLDDT scoring, improving screening accuracy and reducing manual
                  triage.
                </li>
                <li>
                  Benchmarked models like Boltz-1, APM, MultiFlow, and ESM3 in a unified
                  evaluation harness with distributed runs and Bayesian HPO.
                </li>
              </ul>
            </article>

            <article className="experience-item">
              <header>
                <div>
                  <h3>A.I. for Scientific Research @ NYU — ML Engineer Intern</h3>
                  <p className="experience-meta">Brooklyn · Jan 2024 – Sep 2024</p>
                </div>
              </header>
              <ul>
                <li>
                  Used Llama 2 and GPT-2 to improve morpheme segmentation for linguistic
                  research, significantly boosting accuracy.
                </li>
                <li>
                  Built distributed systems with Python and Kubernetes for large-scale
                  datasets, improving processing speed and training efficiency.
                </li>
              </ul>
            </article>

            <article className="experience-item">
              <header>
                <div>
                  <h3>Trip.com Group — Backend Software Engineer Intern</h3>
                  <p className="experience-meta">Shanghai · May 2024 – Aug 2024</p>
                </div>
              </header>
              <ul>
                <li>
                  Developed and deployed an internal grammar checker used by 1,000+ employees,
                  reducing document review time by 35%.
                </li>
                <li>
                  Optimized Python-based services and MongoDB queries to reduce latency and
                  memory usage in production systems.
                </li>
              </ul>
            </article>

            <article className="experience-item">
              <header>
                <div>
                  <h3>Thermo Fisher Scientific — Backend Software Engineer Intern</h3>
                  <p className="experience-meta">Shanghai · May 2023 – Aug 2023</p>
                </div>
              </header>
              <ul>
                <li>
                  Automated SQL code generation with Python, improving standardization and
                  cutting manual coding time.
                </li>
                <li>
                  Designed RESTful APIs and worked on CI/CD pipelines to reduce deployment
                  latency and improve reliability.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section-header">
            <h2>Projects</h2>
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              All repositories on GitHub
            </a>
          </div>

          <h3 className="subsection-title">Featured</h3>
          <div className="grid">
            <article className="card project-featured">
              <div className="card-header">
                <h3>AlphaDoMi — Intelligent Musical Accompaniment</h3>
              </div>
              <p className="card-description">
                DSP-based device that detects intonation and rhythm accuracy with high
                precision by filtering string frequencies, supporting neurodiverse
                learners and music education.
              </p>
              <ul className="bullet-list">
                <li>
                  Designed and built the hardware and signal-processing pipeline,
                  achieving high-precision detection of pitch and rhythm.
                </li>
                <li>
                  Distributed devices to a local organization for autistic children,
                  improving rhythm and intonation outcomes.
                </li>
                <li>
                  Published research at the 4th International Conference on Computing
                  and Data Science (CONF-CDS 2022).
                </li>
              </ul>
              <div className="card-meta">
                <span>Python · DSP · Embedded</span>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}/Alpha-DoMi`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View code →
                </a>
              </div>
            </article>

            <article className="card project-featured">
              <div className="card-header">
                <h3>IntroBot — Conversational Social Skills Robot</h3>
              </div>
              <p className="card-description">
                Conversational agent leveraging large language models to simulate
                realistic social interactions and support people with social anxiety.
              </p>
              <ul className="bullet-list">
                <li>
                  Integrated ChatGPT APIs with sentiment analysis and emotion detection
                  to create more natural, human-like responses.
                </li>
                <li>
                  Ran user studies with 50+ participants and iterated on design to
                  increase engagement and satisfaction.
                </li>
              </ul>
              <div className="card-meta">
                <span>Python · LLMs · Applied NLP</span>
                <span>Developed at NYU Tandon</span>
              </div>
            </article>
          </div>

          <h3 className="subsection-title">Recent repositories</h3>

          {loading && <p className="muted">Loading repositories…</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && repos.length === 0 && (
            <p className="muted">
              No public repositories found yet. Check back soon!
            </p>
          )}

          <div className="grid">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="card"
              >
                <div className="card-header">
                  <h3>{repo.name}</h3>
                </div>
                {repo.description && (
                  <p className="card-description">{repo.description}</p>
                )}
                <div className="card-meta">
                  <span>{repo.language ?? "Unknown"}</span>
                  <span>★ {repo.stargazers_count}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2>Contact</h2>
          <p>
            The best way to reach me is via email. I&apos;m currently interested in
            software engineering internships focused on backend systems,
            infrastructure, or applied machine learning.
          </p>
          <p className="muted">
            Email: <span className="highlight-email">kevin.p.chen@nyu.edu</span>
          </p>
          <div className="hero-actions">
            <a
              href="mailto:kevin.p.chen@nyu.edu"
              className="btn primary"
            >
              Email me
            </a>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kevinpchen628"
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Kevin Chen</span>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

