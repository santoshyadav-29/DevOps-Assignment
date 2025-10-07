import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./DiaryApp.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("hero");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const pages = useMemo(
    () => [
      "hero",
      "about",
      "team",
      "design-thinking",
      "ai-session",
      "devops-session",
      "learnings",
      "reflection",
    ],
    []
  );

  // Initialize Audio Context
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContextRef.current = new AudioContextClass();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play page turn sound
  const playPageTurnSound = useCallback(() => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a subtle "whoosh" sound
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      audioContext.currentTime + 0.15
    );

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.15
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
    setActivePage(id);
  };

  const scrollToPage = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return; // Prevent multiple transitions

      const newIndex =
        direction === "next"
          ? Math.min(currentPageIndex + 1, pages.length - 1)
          : Math.max(currentPageIndex - 1, 0);

      if (newIndex !== currentPageIndex) {
        setIsTransitioning(true);
        playPageTurnSound();

        const pageId = pages[newIndex];
        const element = document.getElementById(pageId);

        // Add animation class
        if (element) {
          element.classList.add(
            direction === "next" ? "turning-left" : "turning-right"
          );
        }

        // Scroll after a brief delay to sync with animation
        setTimeout(() => {
          scrollToSection(pageId);
          setCurrentPageIndex(newIndex);
        }, 100);

        // Remove animation class and unlock transitions
        setTimeout(() => {
          if (element) {
            element.classList.remove("turning-left", "turning-right");
          }
          setIsTransitioning(false);
        }, 700);
      }
    },
    [currentPageIndex, pages, isTransitioning, playPageTurnSound]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Detect scroll position and update active page
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollLeft = contentRef.current.scrollLeft;
        const pageWidth = contentRef.current.clientWidth;
        const index = Math.round(scrollLeft / pageWidth);
        if (index !== currentPageIndex && index < pages.length) {
          setCurrentPageIndex(index);
          setActivePage(pages[index]);
        }
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
      return () => content.removeEventListener("scroll", handleScroll);
    }
  }, [currentPageIndex, pages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        scrollToPage("next");
      } else if (e.key === "ArrowLeft") {
        scrollToPage("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToPage]);

  return (
    <div className="app diary-layout">
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">📖 My Diary</h2>
          <button
            className="sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Chapters</h3>
            <ul className="sidebar-menu">
              <li className={activePage === "hero" ? "active" : ""}>
                <a onClick={() => scrollToSection("hero")}>
                  <span className="page-icon">🏠</span>
                  <span>Cover Page</span>
                </a>
              </li>
              <li className={activePage === "about" ? "active" : ""}>
                <a onClick={() => scrollToSection("about")}>
                  <span className="page-icon">✍️</span>
                  <span>Introduction</span>
                </a>
              </li>
              <li className={activePage === "team" ? "active" : ""}>
                <a onClick={() => scrollToSection("team")}>
                  <span className="page-icon">👥</span>
                  <span>Our Team</span>
                </a>
              </li>
              <li className={activePage === "design-thinking" ? "active" : ""}>
                <a onClick={() => scrollToSection("design-thinking")}>
                  <span className="page-icon">💡</span>
                  <span>Design Thinking</span>
                </a>
              </li>
              <li className={activePage === "ai-session" ? "active" : ""}>
                <a onClick={() => scrollToSection("ai-session")}>
                  <span className="page-icon">🤖</span>
                  <span>AI Session</span>
                </a>
              </li>
              <li className={activePage === "devops-session" ? "active" : ""}>
                <a onClick={() => scrollToSection("devops-session")}>
                  <span className="page-icon">⚙️</span>
                  <span>DevOps Session</span>
                </a>
              </li>
              <li className={activePage === "learnings" ? "active" : ""}>
                <a onClick={() => scrollToSection("learnings")}>
                  <span className="page-icon">📚</span>
                  <span>Key Learnings</span>
                </a>
              </li>
              <li className={activePage === "reflection" ? "active" : ""}>
                <a onClick={() => scrollToSection("reflection")}>
                  <span className="page-icon">🌟</span>
                  <span>Reflection</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className={`sidebar-toggle ${isSidebarOpen ? "hidden" : ""}`}
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        📖
      </button>

      {/* Page Navigation Guides */}
      {currentPageIndex > 0 && (
        <button
          className="page-nav-guide prev"
          onClick={() => scrollToPage("prev")}
          aria-label="Previous page"
        >
          <span>◀</span>
        </button>
      )}

      {currentPageIndex < pages.length - 1 && (
        <button
          className="page-nav-guide next"
          onClick={() => scrollToPage("next")}
          aria-label="Next page"
        >
          <span>▶</span>
        </button>
      )}

      {/* Page Counter */}
      <div className="page-counter">
        Page {currentPageIndex + 1} of {pages.length}
      </div>

      {/* Main Content - Diary Pages */}
      <main className="diary-content" ref={contentRef}>
        {/* Hero Section */}
        <section id="hero" className="diary-page hero-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-header">
              <h1 className="diary-title">My Leapfrog Journey</h1>
              <p className="diary-subtitle">
                A Diary of Growth, Innovation, and Collaboration
              </p>
              <div className="diary-meta">
                <span>📅 October 2025</span>
                <span>✏️ Student Partnership Program</span>
              </div>
            </div>
            <p className="diary-intro">
              Documenting my incredible experience in the Leapfrog Student
              Partnership Program - a journey filled with learning, innovation,
              and unforgettable moments.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">📝 About the Program</h2>
              <span className="diary-date-stamp">Entry #1</span>
            </div>
            <div className="diary-text">
              <p className="diary-paragraph">
                The Leapfrog Student Partnership Program has been a
                transformative experience that bridged the gap between academic
                learning and real-world industry practices. This program offered
                me the opportunity to work on meaningful projects, collaborate
                with talented peers, and learn from experienced mentors.
              </p>
              <p className="diary-paragraph">
                Through this journey, I've gained hands-on experience in
                software development, understood the importance of teamwork, and
                developed skills that will shape my professional career.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>12+</h3>
                <p>Weeks of Learning</p>
              </div>
              <div className="stat-card">
                <h3>5+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-card">
                <h3>∞</h3>
                <p>Memories Created</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">👥 Our Team</h2>
              <span className="diary-date-stamp">Entry #2</span>
            </div>
            <div className="diary-text">
              <p className="diary-paragraph">
                The amazing people I had the privilege to work with throughout
                this program. Our diverse and talented team brought unique
                perspectives and skills to every project.
              </p>
            </div>
            <div className="image-container diary-photo">
              <img
                src="Our Team.JPG"
                alt="Our Team"
                className="section-image"
              />
              <p className="photo-caption">📸 Our team during the program</p>
            </div>
          </div>
        </section>

        {/* Design Thinking Section */}
        <section id="design-thinking" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">💡 Design Thinking Session</h2>
              <span className="diary-date-stamp">Entry #3</span>
            </div>
            <div className="content-grid">
              <div className="diary-text">
                <h3 className="diary-subheading">The Process</h3>
                <ul className="diary-list">
                  <li>
                    <strong>Empathize:</strong> Understanding user needs and
                    challenges
                  </li>
                  <li>
                    <strong>Define:</strong> Clearly articulating the problem
                    statement
                  </li>
                  <li>
                    <strong>Ideate:</strong> Brainstorming creative solutions
                  </li>
                  <li>
                    <strong>Prototype:</strong> Building tangible
                    representations
                  </li>
                  <li>
                    <strong>Test:</strong> Gathering feedback and iterating
                  </li>
                </ul>
                <p className="diary-paragraph">
                  This session opened my eyes to the importance of user-centric
                  design and collaborative problem-solving. We learned to think
                  beyond technical solutions and consider the human element in
                  every decision.
                </p>
              </div>
              <div className="diary-photo">
                <img
                  src="Design Thinking Session.JPG"
                  alt="Design Thinking Session"
                  className="section-image"
                />
                <p className="photo-caption">📸 Design thinking workshop</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Session Section */}
        <section id="ai-session" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">🤖 AI Session</h2>
              <span className="diary-date-stamp">Entry #4</span>
            </div>
            <div className="content-grid content-grid-reverse">
              <div className="diary-photo">
                <img
                  src="AI session.JPG"
                  alt="AI Session"
                  className="section-image"
                />
                <p className="photo-caption">📸 Exploring AI technologies</p>
              </div>
              <div className="diary-text">
                <h3 className="diary-subheading">What We Explored</h3>
                <ul className="diary-list">
                  <li>
                    <strong>Fundamentals:</strong> Understanding AI and ML
                    concepts
                  </li>
                  <li>
                    <strong>Applications:</strong> Real-world use cases and
                    implementations
                  </li>
                  <li>
                    <strong>Ethics:</strong> Responsible AI development
                    practices
                  </li>
                  <li>
                    <strong>Future Trends:</strong> Where AI is heading
                  </li>
                </ul>
                <p className="diary-paragraph">
                  The AI session was particularly enlightening, showing us how
                  artificial intelligence is reshaping industries and creating
                  new possibilities. We discussed both the potential and
                  responsibilities that come with developing AI systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DevOps Session Section */}
        <section id="devops-session" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">⚙️ DevOps Session</h2>
              <span className="diary-date-stamp">Entry #5</span>
            </div>
            <div className="content-grid">
              <div className="diary-text">
                <h3 className="diary-subheading">What We Learned</h3>
                <ul className="diary-list">
                  <li>
                    <strong>Containerization:</strong> Docker and container
                    orchestration
                  </li>
                  <li>
                    <strong>CI/CD Pipelines:</strong> Automated testing and
                    deployment workflows
                  </li>
                  <li>
                    <strong>Infrastructure as Code:</strong> Managing
                    infrastructure programmatically
                  </li>
                  <li>
                    <strong>Monitoring & Logging:</strong> Application
                    observability and debugging
                  </li>
                  <li>
                    <strong>Best Practices:</strong> DevOps culture and
                    collaboration
                  </li>
                </ul>
                <p className="diary-paragraph">
                  The DevOps session provided hands-on experience with modern
                  deployment practices. We learned how to containerize
                  applications, set up automated pipelines, and understand the
                  importance of continuous integration and delivery in today's
                  software development lifecycle.
                </p>
              </div>
              <div className="diary-photo">
                <img
                  src="devops session.png"
                  alt="DevOps Session"
                  className="section-image"
                />
                <p className="photo-caption">📸 DevOps workshop and CI/CD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Learnings Section */}
        <section id="learnings" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">📚 Key Learnings</h2>
              <span className="diary-date-stamp">Entry #6</span>
            </div>
            <div className="learnings-grid">
              <div className="learning-card">
                <div className="learning-icon">💻</div>
                <h3>Technical Skills</h3>
                <p>
                  Gained proficiency in modern development tools, frameworks,
                  and best practices that are used in the industry today.
                </p>
              </div>
              <div className="learning-card">
                <div className="learning-icon">🤝</div>
                <h3>Collaboration</h3>
                <p>
                  Learned the value of teamwork, effective communication, and
                  collaborative problem-solving in real project scenarios.
                </p>
              </div>
              <div className="learning-card">
                <div className="learning-icon">🎯</div>
                <h3>Problem Solving</h3>
                <p>
                  Developed a structured approach to tackling complex problems
                  using design thinking and agile methodologies.
                </p>
              </div>
              <div className="learning-card">
                <div className="learning-icon">🚀</div>
                <h3>Innovation</h3>
                <p>
                  Cultivated a mindset of continuous learning and innovation,
                  always looking for better ways to solve challenges.
                </p>
              </div>
              <div className="learning-card">
                <div className="learning-icon">📚</div>
                <h3>Industry Insights</h3>
                <p>
                  Gained valuable insights into how the tech industry operates
                  and what it takes to succeed in a professional environment.
                </p>
              </div>
              <div className="learning-card">
                <div className="learning-icon">💡</div>
                <h3>Creative Thinking</h3>
                <p>
                  Enhanced my ability to think creatively and approach problems
                  from multiple perspectives to find optimal solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection Section */}
        <section id="reflection" className="diary-page">
          <div className="page-lines"></div>
          <div className="diary-page-content">
            <div className="diary-entry-header">
              <h2 className="diary-entry-title">🌟 Personal Reflection</h2>
              <span className="diary-date-stamp">Final Entry</span>
            </div>
            <div className="diary-text">
              <blockquote className="diary-quote">
                "The Leapfrog Student Partnership Program has been more than
                just a learning experience—it's been a journey of
                self-discovery, growth, and building lasting connections."
              </blockquote>
              <p className="diary-paragraph">
                Looking back at my time in this program, I'm amazed by how much
                I've grown both professionally and personally. From the first
                nervous day to the confident presentations we've delivered,
                every moment has contributed to shaping who I am today.
              </p>
              <p className="diary-paragraph">
                The mentorship, the challenges, the late-night debugging
                sessions, the "aha!" moments, and the friendships formed—all of
                these experiences have left an indelible mark on my journey as a
                developer and as an individual.
              </p>
              <p className="diary-paragraph">
                I'm grateful for the opportunity to be part of this program and
                excited to apply everything I've learned as I move forward in my
                career. This isn't the end; it's just the beginning of an
                incredible journey.
              </p>
              <div className="diary-signature">
                <p>With gratitude,</p>
                <p className="signature-line">~ Leapfrog Student</p>
              </div>
            </div>
          </div>
        </section>

      
      </main>
    </div>
  );
}

export default App;
