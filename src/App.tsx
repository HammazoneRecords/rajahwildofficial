import { useState, useEffect, useRef } from 'react';
import { Menu, X, Play, ExternalLink, Instagram, Youtube, Rocket } from 'lucide-react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

/* ─── Palette ───────────────────────────────────────────────────────────── */
const C = {
  void:     '#060606',
  night:    '#0A0A0A',
  card:     '#181818',
  wire:     '#222222',
  volt:     '#00FF5A',
  voltDim:  'rgba(0,255,90,0.10)',
  voltGlow: 'rgba(0,255,90,0.30)',
  cream:    '#F0F0F0',
  muted:    'rgba(240,240,240,0.50)',
  dim:      'rgba(240,240,240,0.25)',
} as const;

const FF = {
  display: "'Bebas Neue', Impact, sans-serif",
  ui:      "'Barlow Condensed', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

/* ─── Data ──────────────────────────────────────────────────────────────── */
const TRACKS = [
  { id: 1, title: 'Hit Song',       duration: '2:31', videoId: '_Pydq0t4oHc' },
  { id: 2, title: 'Member Good',    duration: '3:21', videoId: 'r379Bx52wC8' },
  { id: 3, title: 'Go Go',          duration: '2:41', videoId: 'WqwrIFzIpBg' },
  { id: 4, title: 'Wild Out',       duration: '2:35', videoId: 'Yx3iBT49o3g' },
  { id: 5, title: 'Show Me A Sign', duration: '2:33', videoId: 'wq0-cvTPyIw' },
  { id: 6, title: 'Blizzard',       duration: '2:28', videoId: 'z8y_wcQEOiM' },
];

const NAV_LINKS = ['Music', 'Videos', 'About', 'Merch'];

/* ─── Nav ───────────────────────────────────────────────────────────────── */
function Nav({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById('scroll-root');
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const go = (id: string) => { onNav(id); setOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(6,6,6,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s, backdrop-filter 0.3s',
      borderBottom: scrolled ? `1px solid ${C.wire}` : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button onClick={() => go('hero')} style={{ fontFamily: FF.display, fontSize: 22, letterSpacing: 2, color: C.cream, background: 'none', border: 'none', cursor: 'pointer' }}>
          RAJAH<span style={{ color: C.volt }}>WILD</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: 32 }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.volt)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.cream }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: C.night, borderTop: `1px solid ${C.wire}`, padding: '16px 24px 24px' }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: FF.display, fontSize: 28, letterSpacing: 2, color: C.cream, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', borderBottom: `1px solid ${C.wire}` }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', padding: '120px 24px 80px', overflow: 'hidden' }}>
      {/* BG gradient orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,90,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,90,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* EP badge — sideways rocket */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, padding: '18px 48px', overflow: 'hidden' }}>
        {/* border frame */}
        <div style={{ position: 'absolute', inset: 0, border: `1px solid rgba(0,255,90,0.22)` }} />
        {/* corner accents */}
        <div style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: `2px solid ${C.volt}`, borderLeft: `2px solid ${C.volt}` }} />
        <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderTop: `2px solid ${C.volt}`, borderRight: `2px solid ${C.volt}` }} />
        <div style={{ position: 'absolute', bottom: -1, left: -1, width: 10, height: 10, borderBottom: `2px solid ${C.volt}`, borderLeft: `2px solid ${C.volt}` }} />
        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: `2px solid ${C.volt}`, borderRight: `2px solid ${C.volt}` }} />
        {/* big sideways rocket behind text */}
        <Rocket size={88} style={{ position: 'absolute', transform: 'rotate(90deg)', color: C.volt, opacity: 0.07 }} />
        {/* text */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <span style={{ fontFamily: FF.display, fontSize: 26, letterSpacing: 6, color: C.volt, textShadow: '0 0 24px rgba(0,255,90,0.45)', lineHeight: 1 }}>ROCKET SCIENCE</span>
          <span style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 600, letterSpacing: 5, textTransform: 'uppercase', color: C.muted }}>EP · Out Now</span>
        </div>
      </div>

      {/* Name */}
      <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(72px, 18vw, 180px)', lineHeight: 0.88, letterSpacing: 4, color: C.cream, marginBottom: 8 }}>
        RAJAH
      </h1>
      <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(72px, 18vw, 180px)', lineHeight: 0.88, letterSpacing: 4, color: C.volt, marginBottom: 32, textShadow: '0 0 60px rgba(0,255,90,0.4)' }}>
        WILD
      </h1>

      <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, maxWidth: 480, lineHeight: 1.7, marginBottom: 40 }}>
        Dancehall. Rockstar energy. From Kingston to the world.
      </p>

      {/* CTA row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
        <button onClick={() => onNav('music')} style={{
          fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
          background: C.volt, color: C.void, border: 'none', padding: '14px 32px', cursor: 'pointer',
          transition: 'opacity 0.2s',
        }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Stream Now
        </button>
        <button onClick={() => onNav('videos')} style={{
          fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
          background: 'transparent', color: C.cream, border: `1px solid ${C.wire}`, padding: '14px 32px', cursor: 'pointer',
          transition: 'border-color 0.2s',
        }} onMouseEnter={e => (e.currentTarget.style.borderColor = C.volt)} onMouseLeave={e => (e.currentTarget.style.borderColor = C.wire)}>
          Watch Videos
        </button>
      </div>

      {/* Socials */}
      <div style={{ display: 'flex', gap: 20 }}>
        <a href="https://www.instagram.com/rajahwild/" target="_blank" rel="noopener noreferrer"
          style={{ color: C.dim, transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.volt)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
          <Instagram size={20} />
        </a>
        <a href="https://www.youtube.com/@RajahWild" target="_blank" rel="noopener noreferrer"
          style={{ color: C.dim, transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.volt)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
          <Youtube size={20} />
        </a>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: C.dim }}>
        <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.volt}, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── Music (Track List) ────────────────────────────────────────────────── */
function MusicSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="music" style={{ padding: '100px 24px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.volt }}>Discography</span>
        <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>MUSIC</h2>
      </div>

      {/* Rocket Science EP card */}
      <div style={{ background: C.card, border: `1px solid ${C.wire}`, borderLeft: `3px solid ${C.volt}`, padding: '20px 24px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.volt, marginBottom: 4 }}>EP · 2025</p>
          <p style={{ fontFamily: FF.display, fontSize: 28, letterSpacing: 2, color: C.cream }}>ROCKET SCIENCE</p>
        </div>
        <a href="https://www.youtube.com/@RajahWild" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FF.ui, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.volt, textDecoration: 'none' }}>
          Stream <ExternalLink size={12} />
        </a>
      </div>

      {/* Track list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TRACKS.map((t, i) => (
          <button key={t.id} onClick={() => setActiveVideo(activeVideo === t.videoId ? null : t.videoId)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
              background: activeVideo === t.videoId ? C.voltDim : 'transparent',
              border: `1px solid ${activeVideo === t.videoId ? 'rgba(0,255,90,0.2)' : 'transparent'}`,
              cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s',
              width: '100%',
            }}
            onMouseEnter={e => { if (activeVideo !== t.videoId) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}
            onMouseLeave={e => { if (activeVideo !== t.videoId) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
            <span style={{ fontFamily: FF.ui, fontSize: 12, color: activeVideo === t.videoId ? C.volt : C.dim, width: 20, textAlign: 'right', letterSpacing: 1 }}>
              {activeVideo === t.videoId ? <Play size={14} fill={C.volt} color={C.volt} /> : String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ flex: 1, fontFamily: FF.ui, fontSize: 17, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: activeVideo === t.videoId ? C.volt : C.cream }}>
              {t.title}
            </span>
            <span style={{ fontFamily: FF.body, fontSize: 13, color: C.dim }}>{t.duration}</span>
          </button>
        ))}
      </div>

      {/* Inline YouTube embed */}
      {activeVideo && (
        <div style={{ marginTop: 16, position: 'relative', paddingBottom: '56.25%', background: C.void, border: `1px solid ${C.wire}` }}>
          <iframe
            key={activeVideo}
            src={`https://www.youtube.com/embed/${activeVideo}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      )}
    </section>
  );
}

/* ─── Videos Grid ───────────────────────────────────────────────────────── */
function VideosSection() {
  const featured = TRACKS.slice(0, 4);

  return (
    <section id="videos" style={{ padding: '100px 24px', background: C.night }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.volt }}>Watch</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>VIDEOS</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {featured.map(t => (
            <div key={t.id} style={{ background: C.card, border: `1px solid ${C.wire}`, overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <div style={{ padding: '12px 16px' }}>
                <p style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.cream }}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="https://www.youtube.com/@RajahWild" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.volt, textDecoration: 'none', padding: '12px 28px', border: `1px solid rgba(0,255,90,0.25)` }}>
            <Youtube size={16} /> More on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.volt }}>The Artist</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>ABOUT</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="[&>*]:col-span-2 md:[&>*]:col-span-1">
          <div>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
              RajahWild is a Jamaican dancehall artist carving a distinct lane — melodic, precise, and built for international reach. With 500K+ YouTube subscribers and a growing international fanbase, he's one of the most exciting voices in modern dancehall.
            </p>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
              His 2025 debut EP <em style={{ color: C.cream }}>Rocket Science</em> signals where dancehall is going — first-listen hooks, breath control that turns every bar into a moment, and a stage presence that commands attention without chasing it.
            </p>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.8 }}>
              Kingston bred. World ready.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'YouTube Subscribers', value: '500K+' },
              { label: 'Instagram Followers', value: '337K' },
              { label: 'Debut EP', value: 'Rocket Science (2025)' },
              { label: 'Genre', value: 'Dancehall / Afrodancehall' },
            ].map(stat => (
              <div key={stat.label} style={{ borderLeft: `2px solid ${C.volt}`, paddingLeft: 20 }}>
                <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginBottom: 4 }}>{stat.label}</p>
                <p style={{ fontFamily: FF.display, fontSize: 22, letterSpacing: 1, color: C.cream }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Merch ─────────────────────────────────────────────────────────────── */
function MerchSection() {
  return (
    <section id="merch" style={{ padding: '100px 24px', background: C.night }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.volt }}>Store</span>
        <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1, marginBottom: 24 }}>MERCH</h2>
        <p style={{ fontFamily: FF.body, fontSize: 15, color: C.muted, marginBottom: 40 }}>Official merchandise coming soon.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.voltDim, border: `1px solid rgba(0,255,90,0.2)`, padding: '12px 24px' }}>
          <span style={{ fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.volt }}>Coming Soon</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: '60px 24px 100px', borderTop: `1px solid ${C.wire}`, textAlign: 'center' }}>
      <p style={{ fontFamily: FF.display, fontSize: 32, letterSpacing: 4, color: C.cream, marginBottom: 4 }}>
        RAJAH<span style={{ color: C.volt }}>WILD</span>
      </p>
      <p style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginBottom: 24 }}>
        rajahwildofficial.com
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
        <a href="https://www.instagram.com/rajahwild/" target="_blank" rel="noopener noreferrer"
          style={{ color: C.dim, transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.volt)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
          <Instagram size={18} />
        </a>
        <a href="https://www.youtube.com/@RajahWild" target="_blank" rel="noopener noreferrer"
          style={{ color: C.dim, transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.volt)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
          <Youtube size={18} />
        </a>
      </div>
      <p style={{ fontFamily: FF.body, fontSize: 11, color: C.dim }}>
        © 2025 RajahWild. All rights reserved. Built by{' '}
        <a href="https://mindwaveja.com" target="_blank" rel="noopener noreferrer" style={{ color: C.volt, textDecoration: 'none' }}>MindWave JA</a>.
      </p>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────────────────── */
export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={scrollRef} id="scroll-root" style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 40 }}>
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <MusicSection />
      <VideosSection />
      <AboutSection />
      <MerchSection />
      <Footer />
      <WorkingDraftBanner artist="RajahWild" />
    </div>
  );
}
