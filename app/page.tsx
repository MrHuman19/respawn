'use client'

import { useState } from 'react'

const content = {
  en: {
    nav: 'RESPAWN',
    status: '[ SYSTEM LOADING... ]',
    tagline1: 'STOP BEING',
    tagline2: 'AN NPC.',
    sub: 'Find your respawn point.',
    body: 'Your life has side quests. Missions hidden in places no map shows. Spots that exist only when someone says: "bro, I know a place." We find them for you.',
    modeSolo: '[ STORY MODE ]',
    modeSoloDesc: 'Solo. Your arc. Your rules.',
    modeCoop: '[ CO-OP ]',
    modeCoopDesc: 'Find someone who says yes.',
    inputPlaceholder: 'enter_email.exe',
    cta: 'JOIN WAITLIST →',
    ctaLoading: 'SENDING...',
    ctaSuccess: 'ACCESS GRANTED. Your first sidequest incoming.',
    ctaError: 'CONNECTION FAILED. Try again.',
    hint: '// no spam · no noise · just your next mission',
    quote: '"You can leave Friday evening and return Monday morning completely changed."',
    footer: 'A new kind of adventure is loading.',
    footerSub: '© 2026 RESPAWN · joinrespawn.com',
    coords: '61.2383° N, 48.0915° W',
  },
  es: {
    nav: 'RESPAWN',
    status: '[ SISTEMA CARGANDO... ]',
    tagline1: 'DEJA DE SER',
    tagline2: 'UN NPC.',
    sub: 'Encuentra tu respawn point.',
    body: 'Tu vida tiene misiones secundarias. Lugares que no aparecen en ningún mapa. Spots que solo existen cuando alguien dice: "bro, yo sé un lugar." Nosotros los encontramos por ti.',
    modeSolo: '[ STORY MODE ]',
    modeSoloDesc: 'Solo. Tu arco. Tus reglas.',
    modeCoop: '[ CO-OP ]',
    modeCoopDesc: 'Encuentra a alguien que diga que sí.',
    inputPlaceholder: 'ingresa_email.exe',
    cta: 'UNIRSE →',
    ctaLoading: 'ENVIANDO...',
    ctaSuccess: 'ACCESO CONCEDIDO. Tu primera sidequest viene en camino.',
    ctaError: 'CONEXIÓN FALLIDA. Intenta de nuevo.',
    hint: '// sin spam · sin ruido · solo tu próxima misión',
    quote: '"Puedes salir el viernes en la noche y volver el lunes completamente diferente."',
    footer: 'Un nuevo tipo de aventura está cargando.',
    footerSub: '© 2026 RESPAWN · joinrespawn.com',
    coords: '61.2383° N, 48.0915° W',
  },
}

type Lang = 'en' | 'es'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const t = content[lang]

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scan {
          0%   { top: -4px; }
          100% { top: 100%; }
        }
        @keyframes glitch {
          0%   { transform: translate(0); }
          20%  { transform: translate(-2px, 1px); }
          40%  { transform: translate(2px, -1px); }
          60%  { transform: translate(-1px, 2px); }
          80%  { transform: translate(1px, -2px); }
          100% { transform: translate(0); }
        }
        .fade-1 { animation: fadeUp 0.7s ease forwards; opacity: 0; animation-delay: 0.1s; }
        .fade-2 { animation: fadeUp 0.7s ease forwards; opacity: 0; animation-delay: 0.25s; }
        .fade-3 { animation: fadeUp 0.7s ease forwards; opacity: 0; animation-delay: 0.4s; }
        .fade-4 { animation: fadeUp 0.7s ease forwards; opacity: 0; animation-delay: 0.55s; }
        .fade-5 { animation: fadeUp 0.7s ease forwards; opacity: 0; animation-delay: 0.7s; }
        .fade-6 { animation: fadeUp 0.7s ease forwards; opacity: 0; animation-delay: 0.85s; }
        .cursor::after {
          content: '█';
          animation: blink 1s step-end infinite;
          color: var(--ember);
          margin-left: 2px;
        }
        .glitch:hover { animation: glitch 0.3s ease; }
        .lang-btn {
          background: none;
          border: 1px solid transparent;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          cursor: pointer;
          padding: 4px 10px;
          transition: all 0.15s;
          border-radius: 2px;
        }
        .lang-btn.active {
          color: var(--black);
          background: var(--ember);
          border-color: var(--ember);
        }
        .lang-btn.inactive {
          color: var(--trail);
          border-color: var(--trail);
        }
        .lang-btn.inactive:hover {
          color: var(--white);
          border-color: var(--sand);
        }
        .mode-card {
          border: 1px solid var(--trail);
          padding: 20px;
          position: relative;
          flex: 1;
          transition: border-color 0.2s;
          background: rgba(10,10,10,0.6);
        }
        .mode-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(217,123,58,0.08) 1px, transparent 1px);
          background-size: 6px 6px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .mode-card:hover { border-color: var(--ember); }
        .mode-card:hover::before { opacity: 1; }
        .mode-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: var(--ember);
          border-style: solid;
        }
        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        .email-input {
          background: rgba(10,10,10,0.8);
          border: 1px solid var(--trail);
          color: var(--white);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          padding: 13px 16px;
          outline: none;
          transition: border-color 0.15s;
          width: 100%;
          border-radius: 0;
        }
        .email-input:focus { border-color: var(--ember); }
        .email-input::placeholder { color: var(--trail); }
        .submit-btn {
          background: var(--ember);
          color: var(--black);
          border: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 13px 24px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, transform 0.1s;
          border-radius: 0;
        }
        .submit-btn:hover { background: var(--white); }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .pixel-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 32px 0;
        }
        .pixel-divider::before,
        .pixel-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: repeating-linear-gradient(
            to right,
            var(--trail) 0px,
            var(--trail) 3px,
            transparent 3px,
            transparent 6px
          );
        }
        .scanline {
          position: fixed;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(transparent, rgba(217,123,58,0.04), transparent);
          animation: scan 10s linear infinite;
          pointer-events: none;
          z-index: 200;
        }
        .dither-section {
          position: relative;
          overflow: hidden;
        }
        .dither-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(217,123,58,0.06) 1px, transparent 1px);
          background-size: 6px 6px;
        }
        @media (max-width: 640px) {
          .tagline { font-size: clamp(64px, 20vw, 120px) !important; }
          .form-row { flex-direction: column !important; }
          .modes-row { flex-direction: column !important; }
          .nav-pad { padding: 20px 20px !important; }
          .hero-pad { padding: 100px 20px 60px !important; }
        }
      `}</style>

      {/* Scanline */}
      <div className="scanline" />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>

        {/* Nav */}
        <nav className="nav-pad" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 48px',
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(10,10,10,0.92)',
          borderBottom: '1px solid rgba(74,66,56,0.3)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="glitch" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'var(--ember)',
            }}>{t.nav}</span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              color: 'var(--trail)',
              letterSpacing: '0.1em',
            }} className="cursor">{t.status}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button className={`lang-btn ${lang === 'en' ? 'active' : 'inactive'}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn ${lang === 'es' ? 'active' : 'inactive'}`} onClick={() => setLang('es')}>ES</button>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero-pad" style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '120px 48px 80px',
          maxWidth: '960px', margin: '0 auto',
        }}>

          {/* Coords */}
          <div className="fade-1" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--ember)' }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px', color: 'var(--trail)', letterSpacing: '0.2em',
            }}>◈ {t.coords}</span>
          </div>

          {/* Tagline */}
          <h1 style={{ lineHeight: 0.85, marginBottom: '40px' }}>
            <span className="fade-2 tagline" style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(72px, 15vw, 148px)',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
            }}>{t.tagline1}</span>
            <span className="fade-3 tagline" style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(72px, 15vw, 148px)',
              color: 'var(--ember)',
              letterSpacing: '-0.02em',
              WebkitTextStroke: '1px var(--ember)',
              WebkitTextFillColor: 'transparent',
            }}>{t.tagline2}</span>
          </h1>

          {/* Sub + body */}
          <div className="fade-4" style={{ marginBottom: '40px' }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'clamp(14px, 2vw, 18px)',
              color: 'var(--ember)',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}>// {t.sub}</p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              fontWeight: 300,
              color: 'var(--sand)',
              lineHeight: 1.8,
              maxWidth: '520px',
            }}>{t.body}</p>
          </div>

          {/* Modes */}
          <div className="fade-5 modes-row" style={{
            display: 'flex', gap: '16px', marginBottom: '40px',
          }}>
            <div className="mode-card">
              <div className="mode-corner corner-tl" />
              <div className="mode-corner corner-tr" />
              <div className="mode-corner corner-bl" />
              <div className="mode-corner corner-br" />
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px', color: 'var(--ember)',
                letterSpacing: '0.15em', marginBottom: '10px',
              }}>🎮 {t.modeSolo}</p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px', fontWeight: 300, color: 'var(--sand)',
              }}>{t.modeSoloDesc}</p>
            </div>
            <div className="mode-card">
              <div className="mode-corner corner-tl" />
              <div className="mode-corner corner-tr" />
              <div className="mode-corner corner-bl" />
              <div className="mode-corner corner-br" />
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px', color: 'var(--ember)',
                letterSpacing: '0.15em', marginBottom: '10px',
              }}>👾 {t.modeCoop}</p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px', fontWeight: 300, color: 'var(--sand)',
              }}>{t.modeCoopDesc}</p>
            </div>
          </div>

          {/* Waitlist */}
          <div className="fade-6">
            {status === 'success' ? (
              <div style={{
                borderLeft: '2px solid var(--ember)',
                paddingLeft: '20px',
              }}>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '14px', color: 'var(--ember)',
                  letterSpacing: '0.06em', marginBottom: '8px',
                }}>{t.ctaSuccess}</p>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px', color: 'var(--trail)',
                }}>✓ mission_accepted.log</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="form-row" style={{ display: 'flex', gap: '0', marginBottom: '12px' }}>
                    <input
                      className="email-input"
                      type="email"
                      placeholder={t.inputPlaceholder}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="submit-btn"
                      type="submit"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? t.ctaLoading : t.cta}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px', color: '#DC2626',
                    }}>{t.ctaError}</p>
                  )}
                </form>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px', color: 'var(--trail)',
                  letterSpacing: '0.06em', marginTop: '10px',
                }}>{t.hint}</p>
              </>
            )}
          </div>
        </section>

        {/* Quote */}
        <section className="dither-section" style={{
          borderTop: '1px solid var(--trail)',
          borderBottom: '1px solid var(--trail)',
          padding: '80px 48px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(18px, 3.5vw, 30px)',
            fontWeight: 300,
            color: 'var(--white)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
            position: 'relative', zIndex: 1,
          }}>
            <span style={{ color: 'var(--ember)', fontFamily: "'IBM Plex Mono', monospace" }}>"</span>
            {t.quote.replace(/"/g, '')}
            <span style={{ color: 'var(--ember)', fontFamily: "'IBM Plex Mono', monospace" }}>"</span>
          </p>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '40px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '16px',
          borderTop: '1px solid rgba(74,66,56,0.3)',
        }}>
          <div>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '14px', fontWeight: 700,
              letterSpacing: '0.3em', color: 'var(--ember)',
            }}>RESPAWN</span>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px', color: 'var(--trail)',
              marginTop: '6px', letterSpacing: '0.08em',
            }}>{t.footer}</p>
          </div>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px', color: 'var(--trail)', letterSpacing: '0.06em',
          }}>{t.footerSub}</p>
        </footer>

      </div>
    </>
  )
}