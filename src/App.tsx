import { useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <h2 className="nav-logo">Leapfrog Journey</h2>

          {/* Hamburger Icon */}
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <li>
              <a onClick={() => scrollToSection("hero")}>Home</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("about")}>About</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("team")}>Our Team</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("design-thinking")}>
                Design Thinking
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection("ai-session")}>AI Session</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("devops-session")}>
                DevOps Session
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection("learnings")}>Key Learnings</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("reflection")}>Reflection</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">My Leapfrog Journey</h1>
          <p className="hero-subtitle">
            A Diary of Growth, Innovation, and Collaboration
          </p>
          <p className="hero-description">
            Documenting my incredible experience in the Leapfrog Student
            Partnership Program
          </p>
          <button
            className="cta-button"
            onClick={() => scrollToSection("about")}
          >
            Explore My Journey
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About the Program</h2>
          <div className="about-content">
            <p>
              The Leapfrog Student Partnership Program has been a transformative
              experience that bridged the gap between academic learning and
              real-world industry practices. This program offered me the
              opportunity to work on meaningful projects, collaborate with
              talented peers, and learn from experienced mentors.
            </p>
            <p>
              Through this journey, I've gained hands-on experience in software
              development, understood the importance of teamwork, and developed
              skills that will shape my professional career.
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
      <section id="team" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            The amazing people I had the privilege to work with throughout this
            program
          </p>
          <div className="image-container">
            <img src="Our Team.JPG" alt="Our Team" className="section-image" />
          </div>
          <p className="image-caption">
            Our diverse and talented team brought unique perspectives and skills
            to every project
          </p>
        </div>
      </section>

      {/* Design Thinking Section */}
      <section id="design-thinking" className="section">
        <div className="container">
          <h2 className="section-title">Design Thinking Session</h2>
          <p className="section-description">
            Exploring innovative problem-solving methodologies
          </p>
          <div className="content-grid">
            <div className="content-text">
              <h3>The Process</h3>
              <ul className="feature-list">
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
                  <strong>Prototype:</strong> Building tangible representations
                </li>
                <li>
                  <strong>Test:</strong> Gathering feedback and iterating
                </li>
              </ul>
              <p>
                This session opened my eyes to the importance of user-centric
                design and collaborative problem-solving. We learned to think
                beyond technical solutions and consider the human element in
                every decision.
              </p>
            </div>
            <div className="content-image">
              <img
                src="/Design Thinking Session.JPG"
                alt="Design Thinking Session"
                className="section-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Session Section */}
      <section id="ai-session" className="section section-alt">
        <div className="container">
          <h2 className="section-title">AI Session</h2>
          <p className="section-description">
            Diving into the world of Artificial Intelligence and Machine
            Learning
          </p>
          <div className="content-grid content-grid-reverse">
            <div className="content-image">
              <img
                src="/AI session.JPG"
                alt="AI Session"
                className="section-image"
              />
            </div>
            <div className="content-text">
              <h3>What We Explored</h3>
              <ul className="feature-list">
                <li>
                  <strong>Fundamentals:</strong> Understanding AI and ML
                  concepts
                </li>
                <li>
                  <strong>Applications:</strong> Real-world use cases and
                  implementations
                </li>
                <li>
                  <strong>Ethics:</strong> Responsible AI development practices
                </li>
                <li>
                  <strong>Future Trends:</strong> Where AI is heading
                </li>
              </ul>
              <p>
                The AI session was particularly enlightening, showing us how
                artificial intelligence is reshaping industries and creating new
                possibilities. We discussed both the potential and
                responsibilities that come with developing AI systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DevOps Session Section */}
      <section id="devops-session" className="section">
        <div className="container">
          <h2 className="section-title">DevOps Session</h2>
          <p className="section-description">
            Exploring modern DevOps practices and CI/CD pipelines
          </p>
          <div className="content-grid">
            <div className="content-text">
              <h3>What We Learned</h3>
              <ul className="feature-list">
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
              <p>
                The DevOps session provided hands-on experience with modern
                deployment practices. We learned how to containerize
                applications, set up automated pipelines, and understand the
                importance of continuous integration and delivery in today's
                software development lifecycle.
              </p>
            </div>
            <div className="content-image">
              <img
                src="/devops session.png"
                alt="DevOps Session"
                className="section-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings Section */}
      <section id="learnings" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Key Learnings</h2>
          <div className="learnings-grid">
            <div className="learning-card">
              <div className="learning-icon">💻</div>
              <h3>Technical Skills</h3>
              <p>
                Gained proficiency in modern development tools, frameworks, and
                best practices that are used in the industry today.
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
                Gained valuable insights into how the tech industry operates and
                what it takes to succeed in a professional environment.
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
      <section id="reflection" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Personal Reflection</h2>
          <div className="reflection-content">
            <blockquote className="reflection-quote">
              "The Leapfrog Student Partnership Program has been more than just
              a learning experience—it's been a journey of self-discovery,
              growth, and building lasting connections."
            </blockquote>
            <p>
              Looking back at my time in this program, I'm amazed by how much
              I've grown both professionally and personally. From the first
              nervous day to the confident presentations we've delivered, every
              moment has contributed to shaping who I am today.
            </p>
            <p>
              The mentorship, the challenges, the late-night debugging sessions,
              the "aha!" moments, and the friendships formed—all of these
              experiences have left an indelible mark on my journey as a
              developer and as an individual.
            </p>
            <p>
              I'm grateful for the opportunity to be part of this program and
              excited to apply everything I've learned as I move forward in my
              career. This isn't the end; it's just the beginning of an
              incredible journey.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Leapfrog Student Partnership Program Journey</p>
          <p>Made with ❤️ and React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
