import { useEffect, useRef } from 'react'

function App() {
  const progressBarRef = useRef(null)
  const navShellRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    let lastScroll = 0
    const interactiveSelectors = 'a, button, .skill-tag, .project-card'

    const updateScrollUI = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`
      }

      if (navShellRef.current) {
        if (scrollTop > lastScroll && scrollTop > 120) {
          navShellRef.current.classList.add('hide')
        } else {
          navShellRef.current.classList.remove('hide')
        }
      }

      lastScroll = scrollTop <= 0 ? 0 : scrollTop
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    const revealBlocks = document.querySelectorAll('.reveal-block')
    revealBlocks.forEach((block) => revealObserver.observe(block))

    const handleMouseMove = (event) => {
      const x = event.clientX
      const y = event.clientY

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`
        cursorDotRef.current.style.top = `${y}px`
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${x}px`
        cursorRingRef.current.style.top = `${y}px`
      }

      const target = event.target.closest(interactiveSelectors)
      if (cursorRingRef.current) {
        if (target) {
          cursorRingRef.current.style.width = '52px'
          cursorRingRef.current.style.height = '52px'
          cursorRingRef.current.style.borderColor = 'rgba(0, 245, 255, 0.95)'
        } else {
          cursorRingRef.current.style.width = '34px'
          cursorRingRef.current.style.height = '34px'
          cursorRingRef.current.style.borderColor = 'rgba(0, 245, 255, 0.55)'
        }
      }
    }

    window.addEventListener('scroll', updateScrollUI, { passive: true })
    window.addEventListener('load', updateScrollUI)
    document.addEventListener('mousemove', handleMouseMove)

    updateScrollUI()

    return () => {
      window.removeEventListener('scroll', updateScrollUI)
      window.removeEventListener('load', updateScrollUI)
      document.removeEventListener('mousemove', handleMouseMove)
      revealObserver.disconnect()
    }
  }, [])

  return (
    <>
      <div className="progress-wrap" aria-hidden="true">
        <div className="progress" id="progressBar" ref={progressBarRef}></div>
      </div>

      <div className="cursor-dot" id="cursorDot" ref={cursorDotRef} aria-hidden="true"></div>
      <div className="cursor-ring" id="cursorRing" ref={cursorRingRef} aria-hidden="true"></div>

      <header className="nav-shell" id="navShell" ref={navShellRef}>
        <nav aria-label="Primary navigation">
          <div className="nav-brand">
            <strong>Pani Chendra</strong>
            
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" aria-label="Hero section">
          <div className="hero-grid">
            <div className="hero-title">
              <p className="eyebrow hero-reveal d1">MERN x AI/ML Developer</p>
              <h1 className="name hero-reveal d2">
                P. Pani
                <span className="outline">Chendra</span>
              </h1>
            </div>

            <div className="hero-meta hero-reveal d3">
              <p>
                <b>Pre-Final Year B.Tech Information Technology Student</b> · SASTRA Deemed University,
                Thanjavur · 2023-2027 · CGPA 8.3628
              </p>
              <p>
                I design and engineer intelligent, scalable digital products where full-stack
                architecture meets practical machine intelligence.
              </p>
            </div>

            <p className="hero-tagline hero-reveal d4">I build things that think.</p>

            <aside className="hero-side hero-reveal d4" aria-label="Quick profile summary">
              <h2>Now Shipping</h2>
              <p>
                Campus and healthcare-focused systems blending deep learning pipelines with clean
                product engineering.
              </p>
              <strong>Focus: MERN Stack + AI/ML</strong>
              <p>
                From model training to deployment-ready interfaces, I care about useful intelligence,
                not just demos.
              </p>
            </aside>
          </div>
        </section>

        <section className="section-wrap reveal-block" id="about" aria-label="About section">
          <div className="section-head">
            <h2>About</h2>
            <p>Human + Technical</p>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                I am a builder first: curious about complex systems, obsessed with clean
                implementation, and happiest when code solves problems people actually feel.
              </p>
              <p>
                I move between frontend polish, backend architecture, and model-centric
                experimentation without losing product focus.
              </p>
              <p className="about-focus">
                Currently building: scalable MERN experiences with explainable AI workflows.
              </p>
            </div>

            <div className="timeline" aria-label="Education timeline">
              <article className="t-item">
                <span>2023 - 2027</span>
                <h3>B.Tech Information Technology</h3>
                <p>SASTRA Deemed University, Thanjavur · CGPA 8.3628</p>
              </article>
              <article className="t-item">
                <span>2021 - 2023</span>
                <h3>Intermediate (12th Grade - MPC)</h3>
                <p>Impulse Junior College · 98.6%</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-wrap reveal-block" id="skills" aria-label="Skills section">
          <div className="section-head">
            <h2>Skills</h2>
            <p>Toolbox</p>
          </div>

          <div className="skills-layout">
            <p className="skills-lead">
              I like systems that scale and interfaces that communicate clearly. My stack is
              full-cycle: from API contracts and authentication to model explainability and
              deployment-ready UX.
            </p>

            <div className="skills-groups">
              <article className="skill-group">
                <h3>Languages</h3>
                <div className="skill-tags">
                  <span className="skill-tag">C++</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">JavaScript</span>
                </div>
              </article>

              <article className="skill-group">
                <h3>Full-Stack</h3>
                <div className="skill-tags">
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">REST APIs</span>
                  <span className="skill-tag">JWT Auth</span>
                </div>
              </article>

              <article className="skill-group">
                <h3>AI / ML</h3>
                <div className="skill-tags">
                  <span className="skill-tag">CNNs</span>
                  <span className="skill-tag">Transfer Learning</span>
                  <span className="skill-tag">CBAM Attention</span>
                  <span className="skill-tag">Grad-CAM</span>
                  <span className="skill-tag">Scikit-learn</span>
                  <span className="skill-tag">PyTorch</span>
                </div>
              </article>

              <article className="skill-group">
                <h3>Core CS</h3>
                <div className="skill-tags">
                  <span className="skill-tag">DSA</span>
                  <span className="skill-tag">OOP</span>
                  <span className="skill-tag">DBMS</span>
                  <span className="skill-tag">Operating Systems</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="projects reveal-block" id="projects" aria-label="Projects section">
          <div className="section-wrap">
            <div className="section-head">
              <h2>Projects</h2>
              <p>Most Important Work</p>
            </div>

            <div className="project-grid">
              <article className="project-card">
                <div>
                  <h3 className="project-title">Retinal-OCT-Classification</h3>
                  <p className="project-line">
                    Retinal OCT classification pipeline with explainability overlays for clinically
                    meaningful predictions. Achieved 97% accuracy using EfficientNet-B0 + CBAM on
                    60,000+ OCT images. Integrated Grad-CAM for explainability and deployed using
                    Gradio.
                  </p>
                </div>
                <div className="stack" aria-label="Tech stack">
                  <span>Python</span>
                  <span>PyTorch</span>
                  <span>Grad-CAM</span>
                  <span>Gradio</span>
                </div>
                <div className="project-cta">
                  <a className="pill-btn" href="https://github.com/Panichendra/Retinal-OCT-Classification" aria-label="GitHub">
                    GitHub
                  </a>
                  <a className="pill-btn" href="https://huggingface.co/spaces/PaniChendra/retinal-oct-classifier" aria-label="Live Demo">
                    Live Demo
                  </a>
                </div>
              </article>

              <article className="project-card">
                <div>
                  <h3 className="project-title">CampusClaim Platform</h3>
                  <p className="project-line">
                    Campus-ready lost-and-found ecosystem with secure claims, uploads, and
                    role-driven workflows.
                  </p>
                </div>
                <div className="stack" aria-label="Tech stack">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>MongoDB</span>
                  <span>JWT</span>
                </div>
                <div className="project-cta">
                  <a className="pill-btn" href="https://github.com/Panichendra/CampusClaim" aria-label="CampusClaim GitHub">
                    GitHub
                  </a>
                  <a className="pill-btn" href="https://campus-claim-frontend-nine.vercel.app/" aria-label="CampusClaim Live Demo">
                    Live Demo
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-wrap reveal-block" id="contact" aria-label="Contact section">
          <div className="section-wrap">
            <div className="section-head">
              <h2>Contact</h2>
              <p>Open to internships & collaborations.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-lines">
                <a href="mailto:127015067@sastra.ac.in">127015067@sastra.ac.in</a>
                <a href="tel:+916301150265">+91 6301150265</a>
                <p>Thanjavur, Tamil Nadu, India</p>
              </div>

              <div className="socials" aria-label="Social links">
                <a
                  className="social-btn"
                  href="https://www.linkedin.com/in/pani-chendra-48b0442b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 .02 5 2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zm7 0h3.8v1.64h.05c.53-1 1.82-2.05 3.74-2.05C21.1 8.6 22 10.53 22 13.2V21h-4v-6.91c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.65 1.8-2.65 3.66V21h-4z" />
                  </svg>
                </a>
                <a
                  className="social-btn"
                  href="https://github.com/Panichendra"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.25.82-.57 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.8 1.28 3.48.98.11-.76.42-1.28.76-1.58-2.66-.3-5.47-1.31-5.47-5.83 0-1.28.47-2.33 1.24-3.15-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.2a11.54 11.54 0 0 1 6 0c2.29-1.52 3.3-1.2 3.3-1.2.66 1.64.24 2.86.12 3.16.77.82 1.24 1.87 1.24 3.15 0 4.53-2.81 5.53-5.49 5.82.43.37.82 1.11.82 2.24 0 1.62-.02 2.93-.02 3.33 0 .32.22.69.83.57A12 12 0 0 0 12 .5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer>Built by Pani Chandra · 2026</footer>
      </main>
    </>
  )
}

export default App
