import React, { useEffect, useMemo, useState } from "react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
};

type Route =
  | {
      kind: "home";
    }
  | {
      kind: "project";
      slug: string;
    };

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

type Project = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  years: string;
  summary: string;
  homeNote: string;
  role: string;
  status: string;
  outcome: string;
  heroImage: GalleryImage;
  heroImagePosition?: string;
  cardImage?: GalleryImage;
  cardImagePosition?: string;
  focus: string[];
  story: {
    title: string;
    body: string;
  }[];
  outcomes: string[];
  gallery: GalleryImage[];
  links?: {
    label: string;
    href: string;
  }[];
};

type MusicMilestone = {
  title: string;
  year: string;
  note: string;
  image: GalleryImage;
};

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  points: string[];
};

const GITHUB_USERNAME = "kevinpchen";
const RESUME_PATH = "/Kevin_Chen_Resume.pdf";
const HOME_HASH = "#/";
const HIDDEN_HOME_REPOS = new Set([
  "rottenpotatoes",
  "kevinpchen",
  "kevinpchen.github.io",
  "CS3113",
  "kevin-p-chen",
  "NYU-AI-School",
]);
const HOME_REPO_PRIORITY = [
  "Alpha-DoMi",
  "Math-Learning-Website",
  "AI-Product-Radar",
  "NYU-AI-School",
  "gittuf",
];
const REPO_OVERRIDES: Record<
  string,
  {
    displayName?: string;
    description?: string;
  }
> = {
  gittuf: {
    description: "I am an active contributor to gittuf, a security layer for Git repositories.",
  },
  "Math-Learning-Website": {
    displayName: "Math Learning Website",
    description:
      "A math learning site that helps teachers track homework progress and give feedback.",
  },
};

const isAlphaDomiRepo = (name: string) => {
  const normalized = name.toLowerCase();
  return normalized.includes("alpha") && normalized.includes("domi");
};

const FEATURED_PROJECTS: Project[] = [
  {
    slug: "alphadomi",
    index: "01",
    eyebrow: "Assistive Music / Research / 2020-Present",
    title: "AlphaDoMi",
    years: "2020-Present",
    summary:
      "An ongoing assistive music project built to help students hear pitch, rhythm, and timing more clearly while practicing.",
    homeNote:
      "An ongoing assistive music project that grew out of performance, teaching, and a real interest in building tools that help people practice more clearly.",
    role: "Inventor, builder, and researcher",
    status: "Ongoing project",
    outcome:
      "Ongoing development with published research and classroom use behind it.",
    heroImage: {
      src: "/media/alphadomi-device.webp",
      alt: "Kevin Chen holding the AlphaDoMi device prototype.",
      caption: "The project is still evolving, but the core idea has stayed the same.",
    },
    cardImagePosition: "center 32%",
    focus: [
      "Signal-processing feedback for practice sessions",
      "A product direction shaped by special-needs teaching",
      "Research and iteration instead of one-off demo energy",
    ],
    story: [
      {
        title: "Where it started",
        body:
          "I wanted to make solo practice feel less isolating and more legible, especially for students who benefited from immediate feedback. AlphaDoMi began as a way to translate intonation and rhythm into something students could actually respond to in the moment.",
      },
      {
        title: "What I built",
        body:
          "The system combined music-domain intuition with technical experimentation: signal processing, interaction design, and repeated adjustments based on how students and teachers actually used it. The point was never novelty alone. It had to be helpful in a real room.",
      },
      {
        title: "Why it still matters",
        body:
          "AlphaDoMi is older work now, but it still says a lot about me. I like systems that sit at the edge of engineering and lived experience. I like building things that can be measured, but I also care whether they feel usable, calm, and worth returning to.",
      },
    ],
    outcomes: [
      "Published research accepted at the 4th International Conference on Computing and Data Science in 2022.",
      "Won Design for Change Shanghai Region recognition for the project.",
      "Became a bridge between my music background and the kind of technical work I do now.",
    ],
    gallery: [
      {
        src: "/media/alphadomi-paper.webp",
        alt: "Certificate of acceptance for a conference paper about the project.",
        caption: "A research paper on the system was accepted at CONF-CDS 2022.",
      },
      {
        src: "/media/alphadomi-dfc.webp",
        alt: "Design for Change certificate for the project.",
        caption: "The project also earned regional recognition outside the lab context.",
      },
      {
        src: "/media/community-music.webp",
        alt: "Kevin Chen playing bass in front of students.",
        caption: "The work stayed grounded in teaching and performance settings.",
      },
    ],
    links: [
      {
        label: "GitHub",
        href: `https://github.com/${GITHUB_USERNAME}/Alpha-DoMi`,
      },
    ],
  },
  {
    slug: "community-programs",
    index: "02",
    eyebrow: "Teaching / Community / 2018-2023",
    title: "Teaching, Coaching, and Community Programs",
    years: "2018-2023",
    summary:
      "Music and coding programs for students with special needs taught me how to make difficult ideas feel approachable without flattening them.",
    homeNote:
      "Teaching changed the way I explain systems, structure projects, and think about what useful work actually feels like to other people.",
    role: "Instructor, organizer, and curriculum lead",
    status: "Earlier chapter, still central to my voice",
    outcome:
      "Built long-term trust, taught coding and music, and kept the work concrete and human.",
    heroImage: {
      src: "/media/community-coding-2.webp",
      alt: "Kevin Chen leaning over a table to help students.",
      caption: "Most of the work was one conversation at a time.",
    },
    heroImagePosition: "100% center",
    cardImage: {
      src: "/media/community-youth-center.webp",
      alt: "Youth Center sign outside the community program space.",
      caption: "Youth Center sign outside the community program space.",
    },
    focus: [
      "Coding workshops built around patience and repetition",
      "Music sessions designed for engagement instead of performance alone",
      "A leadership style shaped by attention, not volume",
    ],
    story: [
      {
        title: "The work itself",
        body:
          "I taught coding and music in community settings where the goal was not speed. It was trust, consistency, and enough structure for students to keep coming back. That meant lesson design, pacing, improvisation, and a constant sense of where someone was getting stuck.",
      },
      {
        title: "What it taught me",
        body:
          "This was probably my first real systems-design apprenticeship, even if it did not look like one at the time. Good teaching is interface design, debugging, and observability all at once. You learn very quickly whether something makes sense to another human being.",
      },
      {
        title: "How it carries forward",
        body:
          "I still think about this work when I write technical explanations, build internal tools, or decide how much abstraction a system can tolerate. I want the people on the other side of my work to feel oriented, not punished.",
      },
    ],
    outcomes: [
      "Ran music and coding sessions for children and teens with special needs.",
      "Built a communication style that now shows up in engineering, research, and collaboration.",
      "Kept creative work, technical instruction, and community responsibility in the same frame.",
    ],
    gallery: [
      {
        src: "/media/community-coding-1.webp",
        alt: "Kevin Chen helping students with coding work at a table.",
        caption: "A lot of the work started with leaning in and working through it together.",
      },
      {
        src: "/media/community-coding-3.webp",
        alt: "Kevin Chen with a group of students after a program session.",
        caption: "The programs were about continuity, not one-off events.",
      },
      {
        src: "/media/community-stage-2.webp",
        alt: "Kevin Chen presenting in a room full of students and adults.",
        caption: "Teaching also meant leading rooms and making them feel less intimidating.",
      },
    ],
  },
  {
    slug: "music-map-of-china",
    index: "03",
    eyebrow: "Fieldwork / Documentary / 2022",
    title: "Musical Map of China",
    years: "2022",
    summary:
      "A field-recording and documentation project about folk traditions, cultural memory, and the responsibility that comes with trying to preserve them.",
    homeNote:
      "This one sits a little outside software, but it belongs here. It sharpened my instinct for documentation, narrative, and patient observation.",
    role: "Researcher and documentarian",
    status: "Personal fieldwork project",
    outcome:
      "Recorded performances, production moments, and context around local music traditions.",
    heroImage: {
      src: "/media/music-map-performer.webp",
      alt: "Performer in traditional costume.",
      caption: "Documentation starts with attention before it becomes output.",
    },
    focus: [
      "Field documentation across performance and production contexts",
      "Care for cultural preservation instead of extractive collecting",
      "Writing and recording with enough context to keep meaning intact",
    ],
    story: [
      {
        title: "What I was trying to do",
        body:
          "I wanted to document folk music traditions without treating them like scenery. The project was partly about sound and image, but it was also about context: who performs, where it lives, how it changes, and what gets flattened when people talk about preservation too casually.",
      },
      {
        title: "What the trip gave me",
        body:
          "The useful part was not just the footage. It was the practice of slowing down, listening, and noticing that documentation has to carry respect as well as detail. That instinct still shapes the way I write and present technical work now.",
      },
      {
        title: "Why it belongs on this site",
        body:
          "This project sits next to my engineering work because it comes from the same place. I care about memory, systems, and how to preserve signal without stripping out the human texture around it.",
      },
    ],
    outcomes: [
      "Recorded visual material around local performance traditions.",
      "Built a fuller narrative practice around observation and cultural context.",
      "Expanded the range of work I felt responsible enough to publish.",
    ],
    gallery: [
      {
        src: "/media/music-map-stage.webp",
        alt: "Traditional performers with drums on a stage.",
        caption: "Performance footage was only one part of the project.",
      },
      {
        src: "/media/music-map-production.webp",
        alt: "Kevin Chen sitting near cameras and production equipment.",
        caption: "A lot of the real work happened behind the camera line.",
      },
      {
        src: "/media/music-map-drums.webp",
        alt: "Traditional drummers performing with red ribbons.",
        caption: "Preservation means keeping movement and context, not just artifacts.",
      },
    ],
  },
];

const MUSIC_MILESTONES: MusicMilestone[] = [
  {
    title: "Shanghai Youth Cello Competition",
    year: "2017",
    note: "First prize with the Shanghai Cello United Orchestra.",
    image: {
      src: "/media/music-cello-certificate.webp",
      alt: "Certificate from the 2017 Shanghai Youth Cello Competition.",
      caption: "",
    },
  },
  {
    title: "Grand Prize Virtuoso Rome",
    year: "2021",
    note: "First Prize in the advanced category.",
    image: {
      src: "/media/music-rome-prize.webp",
      alt: "Grand Prize Virtuoso Rome first prize certificate.",
      caption: "",
    },
  },
  {
    title: "Global Genius Music Competition",
    year: "2022",
    note: "Gold Prize in the 15-17 age group.",
    image: {
      src: "/media/music-global-genius.webp",
      alt: "Global Genius Music Competition award portrait.",
      caption: "",
    },
  },
  {
    title: "UK International Music Competition",
    year: "2022",
    note: "First Prize winner in the 2022 Season 1 competition.",
    image: {
      src: "/media/music-uk-first-prize.webp",
      alt: "UK International Music Competition first prize winner graphic.",
      caption: "",
    },
  },
  {
    title: "Best Classical Musicians Awards",
    year: "2022",
    note: "Gold Award for composition.",
    image: {
      src: "/media/music-composition-award.webp",
      alt: "Best Classical Musicians Awards gold award graphic.",
      caption: "",
    },
  },
  {
    title: "London Classical Music Competition",
    year: "2021",
    note: "Special Mention for double bass.",
    image: {
      src: "/media/music-lcmc-special-mention.webp",
      alt: "London Classical Music Competition special mention graphic.",
      caption: "",
    },
  },
  {
    title: "New York Golden Classical Music Awards",
    year: "2022",
    note: "First Prize at the international competition.",
    image: {
      src: "/media/music-nygcma-plaque.webp",
      alt: "New York Golden Classical Music Awards plaque.",
      caption: "",
    },
  },
];

const MUSIC_JOURNEY_PARAGRAPHS = [
  "I started learning cello at the age of six. My mother is a cellist and professor, so music was part of daily life from the beginning.",
  "At Shanghai American School, I was the principal cellist before switching to double bass because the orchestra needed a bass player to complete Beethoven's First Symphony. Giving up that chair was a real struggle, but the change stayed with me.",
  "Learning bass from the beginning meant rebuilding technique, especially with the German bow grip that my teacher preferred for its more articulated sound. I ended up loving the instrument's deeper and darker voice, and especially the way it opens up melodically in high positions.",
  "That switch led to becoming the first bass player to win the SAS Concerto Competition and perform with the orchestra. It made my musical life much more dimensional and colorful.",
];

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    title: "Research Intern",
    company: "Aureka Biotechnologies",
    location: "Shanghai",
    period: "Jul 2025 - Aug 2025",
    points: [
      "Built an AF3-based antibody-scoring pipeline with MSA filtering and pLDDT scoring.",
      "Benchmarked Boltz-1, APM, MultiFlow, and ESM3 in a unified evaluation harness with distributed runs and Bayesian HPO.",
    ],
  },
  {
    title: "ML Engineer Intern",
    company: "A.I. for Scientific Research @ NYU",
    location: "Brooklyn",
    period: "Jan 2024 - Sep 2024",
    points: [
      "Used Llama 2 and GPT-2 to improve morpheme segmentation for linguistic research.",
      "Built distributed systems with Python and Kubernetes for large-scale datasets and training jobs.",
    ],
  },
  {
    title: "Backend Software Engineer Intern",
    company: "Trip.com Group",
    location: "Shanghai",
    period: "May 2024 - Aug 2024",
    points: [
      "Developed an internal grammar checker used by more than 1,000 employees.",
      "Optimized Python services and MongoDB queries to reduce latency and memory use in production.",
    ],
  },
  {
    title: "Backend Software Engineer Intern",
    company: "Thermo Fisher Scientific",
    location: "Shanghai",
    period: "May 2023 - Aug 2023",
    points: [
      "Automated SQL code generation workflows with Python.",
      "Designed RESTful APIs and worked on CI/CD pipelines to improve deployment reliability.",
    ],
  },
];

const parseRoute = (hash: string): Route => {
  const raw = hash.replace(/^#/, "").trim();
  const normalized = raw === "" ? "/" : raw.startsWith("/") ? raw : `/${raw}`;

  if (normalized.startsWith("/projects/")) {
    const slug = normalized.replace("/projects/", "");
    const exists = FEATURED_PROJECTS.some((project) => project.slug === slug);
    if (exists) {
      return { kind: "project", slug };
    }
  }

  return { kind: "home" };
};

const scrollToSection = (sectionId: string) => {
  const node = document.getElementById(sectionId);
  if (node) {
    const header = document.querySelector(".site-header");
    const headerOffset =
      header instanceof HTMLElement ? header.offsetHeight + 16 : 96;
    const targetTop =
      node.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  }
};

const HomeButton: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => (
  <button type="button" className="nav-button" onClick={onClick}>
    {label}
  </button>
);

const ProjectLink: React.FC<{
  label: string;
  slug: string;
}> = ({ label, slug }) => (
  <a className="button-link" href={`#/projects/${slug}`}>
    {label}
  </a>
);

const SiteChrome: React.FC<{
  route: Route;
}> = ({ route }) => {
  const project =
    route.kind === "project"
      ? FEATURED_PROJECTS.find((entry) => entry.slug === route.slug)
      : null;

  return (
    <header className="site-header">
      <a className="brand" href={HOME_HASH}>
        Kevin P. Chen
      </a>

      {route.kind === "home" ? (
        <nav className="site-nav" aria-label="Primary">
          <HomeButton label="Projects" onClick={() => scrollToSection("work")} />
          <HomeButton
            label="Experience"
            onClick={() => scrollToSection("experience")}
          />
          <HomeButton
            label="Music Journey"
            onClick={() => scrollToSection("music-journey")}
          />
          <HomeButton label="Contact" onClick={() => scrollToSection("contact")} />
        </nav>
      ) : (
        <nav className="site-nav" aria-label="Project navigation">
          <a className="nav-link" href={HOME_HASH}>
            Home
          </a>
          <HomeButton label="Story" onClick={() => scrollToSection("story")} />
          <HomeButton label="Gallery" onClick={() => scrollToSection("gallery")} />
          <span className="project-chip">{project?.index}</span>
        </nav>
      )}
    </header>
  );
};

const HomePage: React.FC<{
  repos: Repo[];
  loading: boolean;
  error: string | null;
}> = ({ repos, loading, error }) => {
  const [showMusicAwards, setShowMusicAwards] = useState(false);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-copy">
          <h1>
            Building backend and ML systems with the precision and discipline shaped by over a decade of music
          </h1>
          <p className="hero-body">
            Focused on backend infrastructure, distributed systems, and applied machine learning.
          </p>
          <div className="hero-actions">
            <a className="button-link" href={RESUME_PATH} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a
              className="button-link button-link-muted"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="button-link button-link-muted" href="#/projects/alphadomi">
              Featured projects
            </a>
          </div>
        </div>

        <figure className="hero-media hero-portrait-frame">
          <img
            className="hero-portrait-image"
            src="/media/hero-portrait.webp"
            alt="Portrait of Kevin Chen."
          />
        </figure>
      </section>

      <section className="intro-band" aria-label="Current focus">
        <div>
          <p className="eyebrow">NOW</p>
          <p className="body-copy">
            I care most about systems that are measurable, calm under load, and
            usable by the people who depend on them.
          </p>
        </div>
        <ul className="fact-list">
          <li>Computer Science at NYU Tandon, with minors in Mathematics and Game Engineering.</li>
          <li>Experience across biotech, travel, internal tools, and research infrastructure.</li>
          <li>Looking for work that values technical depth and clear communication in equal measure.</li>
        </ul>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected Projects</p>
          <h2>Three projects that explain how I think.</h2>
        </div>

        <div className="project-list">
          {FEATURED_PROJECTS.map((project) => (
            <article className="project-row" key={project.slug}>
              <div className="project-number">{project.index}</div>
              <div className="project-thumb">
                <img
                  src={(project.cardImage ?? project.heroImage).src}
                  alt={(project.cardImage ?? project.heroImage).alt}
                  style={
                    project.cardImagePosition
                      ? { objectPosition: project.cardImagePosition }
                      : undefined
                  }
                />
              </div>
              <div className="project-copy">
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="body-copy">{project.homeNote}</p>
                <div className="project-meta">
                  <span>{project.role}</span>
                  <span>{project.outcome}</span>
                </div>
              </div>
              <div className="project-action">
                <ProjectLink label="Open project" slug={project.slug} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-split" id="experience">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Internships and research in backend and ML.</h2>
        </div>

        <div className="timeline">
          {EXPERIENCE_ITEMS.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <div className="timeline-meta">
                <p>{item.period}</p>
                <span>{item.location}</span>
              </div>
              <div className="timeline-copy">
                <h3>
                  {item.title}
                  <span>@ {item.company}</span>
                </h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-split">
        <div className="section-heading">
          <p className="eyebrow">Projects on GitHub</p>
          <h2>Selected repositories from GitHub.</h2>
        </div>

        {loading && <p className="body-copy muted-copy">Loading repositories.</p>}
        {error && <p className="body-copy muted-copy">{error}</p>}

        {!loading && !error && (
          <div className="repo-list">
            {repos.map((repo) => {
              const override = REPO_OVERRIDES[repo.name];
              const displayName = override?.displayName ?? repo.name;
              const description = override?.description ?? repo.description;

              return (
                <a
                  className="repo-row"
                  href={repo.html_url}
                  key={repo.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <h3>{displayName}</h3>
                    {description && <p>{description}</p>}
                  </div>
                  <div className="repo-meta">
                    <span>{repo.language ?? "Unknown"}</span>
                    <span>Star {repo.stargazers_count}</span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <section className="section" id="music-journey">
        <div className="section-heading">
          <p className="eyebrow">Music Journey</p>
          <h2>Before code, there was music.</h2>
        </div>

        <div className="music-journey-layout">
          <figure className="music-journey-media">
            <img src="/media/hero-award.webp" alt="Kevin Chen receiving a music award." />
          </figure>

          <div className="music-journey-copy">
            {MUSIC_JOURNEY_PARAGRAPHS.map((paragraph) => (
              <p className="body-copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <p className="body-copy">
              I have also been composing since high school. One piece,{" "}
              <a
                className="inline-link"
                href="https://youtu.be/RlcAyMlH_Yk"
                target="_blank"
                rel="noreferrer"
              >
                Rhapsody by Kevin P Chen
              </a>
              , won first prize in a UK international competition.
            </p>
            <p className="body-copy">
              I also performed{" "}
              <a
                className="inline-link"
                href="https://youtu.be/4kc013im1gA"
                target="_blank"
                rel="noreferrer"
              >
                Vaclav Pichl Double Bass Concerto in C Major, I. Allegro moderato
              </a>{" "}
              at the Shanghai Oriental Art Center.
            </p>
          </div>
        </div>

        <div className="awards-toggle-row">
          <button
            type="button"
            className="button-link button-link-muted awards-toggle"
            aria-expanded={showMusicAwards}
            aria-controls="music-awards-panel"
            onClick={() => setShowMusicAwards((current) => !current)}
          >
            {showMusicAwards ? "Hide Awards ▴" : "View Awards ▾"}
          </button>
        </div>

        <div
          id="music-awards-panel"
          className={`awards-panel ${showMusicAwards ? "is-open" : ""}`}
          aria-hidden={!showMusicAwards}
        >
          <div className="awards-panel-inner">
            <div className="archive-grid awards-grid">
              {MUSIC_MILESTONES.map((item) => (
                <article className="archive-item" key={`${item.title}-${item.year}`}>
                  <img src={item.image.src} alt={item.image.alt} />
                  <div className="archive-copy">
                    <p className="archive-year">{item.year}</p>
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>
            Whether it’s backend, ML, research,
            <br />
            or something unconventional, I’d love to hear about it.
          </h2>
        </div>

        <div className="contact-grid">
          <p className="body-copy">
            The easiest way to reach me is by email. I&apos;m especially interested
            in software engineering internships and research-adjacent work where
            strong infrastructure and thoughtful product thinking overlap.
          </p>

          <div className="contact-links">
            <a className="button-link" href="mailto:kevin.p.chen@nyu.edu">
              kevin.p.chen@nyu.edu
            </a>
            <a
              className="button-link button-link-muted"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="button-link button-link-muted"
              href="https://www.linkedin.com/in/kevinpchen628"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

const ProjectPage: React.FC<{
  project: Project;
}> = ({ project }) => {
  const projectIndex = FEATURED_PROJECTS.findIndex((entry) => entry.slug === project.slug);
  const nextProject = FEATURED_PROJECTS[(projectIndex + 1) % FEATURED_PROJECTS.length];

  return (
    <>
      <section className="project-hero">
        <div className="project-hero-copy">
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="hero-body">{project.summary}</p>
        </div>

        <figure className="project-lead-media">
          <img
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            style={project.heroImagePosition ? { objectPosition: project.heroImagePosition } : undefined}
          />
          <figcaption>{project.heroImage.caption}</figcaption>
        </figure>
      </section>

      <section className="section project-summary-band">
        <div className="summary-item">
          <span>Years</span>
          <strong>{project.years}</strong>
        </div>
        <div className="summary-item">
          <span>Role</span>
          <strong>{project.role}</strong>
        </div>
        <div className="summary-item">
          <span>Status</span>
          <strong>{project.status}</strong>
        </div>
        <div className="summary-item">
          <span>Outcome</span>
          <strong>{project.outcome}</strong>
        </div>
      </section>

      <section className="section detail-section" id="story">
        <div className="section-heading">
          <p className="eyebrow">Story</p>
          <h2>What mattered, what I built, and what stayed with me.</h2>
        </div>

        <div className="detail-columns">
          {project.story.map((entry) => (
            <article className="detail-column" key={entry.title}>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section detail-section">
        <div className="section-heading">
          <p className="eyebrow">Focus</p>
          <h2>The parts that stayed with me.</h2>
        </div>

        <ul className="focus-list">
          {project.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section detail-section">
        <div className="section-heading">
          <p className="eyebrow">Outcomes</p>
          <h2>What came out of it.</h2>
        </div>

        <ul className="outcome-list">
          {project.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {project.links && project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => (
              <a
                className="button-link"
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="section detail-section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Gallery</p>
          <h2>{`Some moments from ${project.title}.`}</h2>
        </div>

        <div className="gallery-grid">
          {project.gallery.map((image) => (
            <figure className="gallery-item" key={image.src}>
              <img src={image.src} alt={image.alt} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section next-project">
        <div>
          <p className="eyebrow">Next</p>
          <h2>{nextProject.title}</h2>
          <p className="body-copy">{nextProject.homeNote}</p>
        </div>
        <div className="hero-actions">
          <a className="button-link" href={`#/projects/${nextProject.slug}`}>
            Open next project
          </a>
          <a className="button-link button-link-muted" href={HOME_HASH}>
            Back to home
          </a>
        </div>
      </section>
    </>
  );
};

export const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!res.ok) {
          throw new Error("Failed to load GitHub repositories.");
        }
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch (entry) {
        setError((entry as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const activeProject = useMemo(() => {
    if (route.kind !== "project") {
      return null;
    }

    return (
      FEATURED_PROJECTS.find((project) => project.slug === route.slug) ??
      FEATURED_PROJECTS[0]
    );
  }, [route]);

  const curatedRepos = useMemo(() => {
    const visibleRepos = repos.filter((repo) => !HIDDEN_HOME_REPOS.has(repo.name));

    const orderedRepos = [...visibleRepos].sort((left, right) => {
      const leftPriority = HOME_REPO_PRIORITY.indexOf(left.name);
      const rightPriority = HOME_REPO_PRIORITY.indexOf(right.name);
      const normalizedLeft = leftPriority === -1 ? Number.MAX_SAFE_INTEGER : leftPriority;
      const normalizedRight =
        rightPriority === -1 ? Number.MAX_SAFE_INTEGER : rightPriority;

      if (normalizedLeft !== normalizedRight) {
        return normalizedLeft - normalizedRight;
      }

      if (isAlphaDomiRepo(left.name) !== isAlphaDomiRepo(right.name)) {
        return isAlphaDomiRepo(left.name) ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    });

    return orderedRepos.slice(0, 6);
  }, [repos]);

  return (
    <div className="page">
      <SiteChrome route={route} />

      <main className="main">
        {route.kind === "home" || !activeProject ? (
          <HomePage repos={curatedRepos} loading={loading} error={error} />
        ) : (
          <ProjectPage project={activeProject} />
        )}
      </main>

      <footer className="site-footer">
        <span>Kevin P. Chen</span>
        <span>New York / Shanghai</span>
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
