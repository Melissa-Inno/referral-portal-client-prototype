import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Send, Clock, Users, Shield, Star,
  CheckCircle2, ArrowRight, ChevronRight, MapPin,
  BarChart2, FileText, Lock, Zap,
} from 'lucide-react';
import logo from '../assets/logo.png';
import ThemeToggle from '../components/ThemeToggle';

/* ── Data ─────────────────────────────────────────── */
const stats = [
  { value: '148',  label: 'Enrolled Dentists' },
  { value: '2.4K', label: 'Referrals Made' },
  { value: '99%',  label: 'Satisfaction Rate' },
  { value: '$0',   label: 'Setup Fee' },
];

const features = [
  { icon: <Send size={22} />,      title: 'Instant Referrals',    desc: 'Submit patient referrals in under 60 seconds. Upload records, select a specialist, and send — all in one flow.' },
  { icon: <Clock size={22} />,     title: 'Real-Time Tracking',   desc: 'Know exactly where every referral stands. Accepted, pending, completed — status updates in real time.' },
  { icon: <Users size={22} />,     title: 'Verified Network',     desc: 'Connect with vetted specialists across your region. Every dentist is licensed and peer-reviewed.' },
  { icon: <Shield size={22} />,    title: 'HIPAA Compliant',      desc: 'Patient data is encrypted end-to-end and stored in full compliance with HIPAA regulations.' },
  { icon: <BarChart2 size={22} />, title: 'Referral Analytics',   desc: 'Track referral volume, acceptance rates, and network growth over time with clear insights.' },
  { icon: <FileText size={22} />,  title: 'Digital Records',      desc: 'Attach X-rays, notes, and patient files directly to referrals. No fax machines. No paper trails.' },
];

const steps = [
  { num: 'Step 1', title: 'Create your account', desc: 'Sign up and complete your practice profile in minutes. No lengthy onboarding.' },
  { num: 'Step 2', title: 'Join the network',    desc: 'Browse verified specialists in your area and build your referral network.' },
  { num: 'Step 3', title: 'Send referrals',      desc: 'Upload patient records, pick a dentist, and submit. Done in seconds.' },
  { num: 'Step 4', title: 'Track outcomes',      desc: 'Follow every referral with real-time status and automated notifications.' },
];

const testimonials = [
  { name: 'Dr. James Park',    practice: 'Park Orthodontics · Houston, TX',        initials: 'JP', rating: 5, text: 'SmileRoute completely changed how we receive referrals. The process is seamless and patient records come through perfectly every time.' },
  { name: 'Dr. Lisa Chen',     practice: 'Chen Periodontal Group · Sugar Land, TX', initials: 'LC', rating: 5, text: 'I used to spend 20 minutes per referral on the phone and fax. Now it takes 2 minutes. The ROI paid for the membership in the first week.' },
  { name: 'Dr. Marcus Rivera', practice: 'Capitol Oral Surgery · The Woodlands, TX', initials: 'MR', rating: 5, text: 'The directory alone is worth it. I found three new referring dentists in the first month. My practice has grown 18% since joining.' },
];

const plans = [
  {
    name: 'Monthly', price: '$25', period: '/month', highlight: false, badge: null, savings: null,
    features: ['Unlimited referrals sent & received', 'Full specialist directory access', 'Referral history & tracking', 'Digital record attachments', 'Peer reviews & ratings', 'Priority support'],
  },
  {
    name: '1 Year', price: '$240', period: '/year', highlight: true, badge: 'Most Popular',
    savings: 'Save $60 vs monthly',
    features: ['Unlimited referrals sent & received', 'Full specialist directory access', 'Referral history & tracking', 'Digital record attachments', 'Peer reviews & ratings', 'Priority support'],
  },
  {
    name: '2 Years', price: '$460', period: '/2 years', highlight: false, badge: null,
    savings: 'Save $140 vs monthly',
    features: ['Unlimited referrals sent & received', 'Full specialist directory access', 'Referral history & tracking', 'Digital record attachments', 'Peer reviews & ratings', 'Priority support'],
  },
  {
    name: '3 Years', price: '$660', period: '/3 years', highlight: false, badge: 'Best Value',
    savings: 'Save $240 vs monthly',
    features: ['Unlimited referrals sent & received', 'Full specialist directory access', 'Referral history & tracking', 'Digital record attachments', 'Peer reviews & ratings', 'Priority support'],
  },
];

/* ── Scroll animation hook ───────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Smooth scroll handler ───────────────────────── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Component ───────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div className="landing">

      {/* ── Nav ───────────────────────────────────── */}
      <header className="landing-nav">
        <div className="landing-nav__inner">
          <div className="landing-nav__logo">
            <img src={logo} alt="SmileRoute" className="landing-logo-img" />
            <span className="landing-nav__logo-text">SmileRoute</span>
          </div>

          <nav className="landing-nav__links">
            {[['features','Features'],['how-it-works','How It Works'],['pricing','Pricing'],['testimonials','Reviews']].map(([id, label]) => (
              <button key={id} className="landing-nav__link" onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>

          <div className="landing-nav__actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-ghost" style={{ fontSize: 13 }}>Sign In</Link>
            <button className="btn btn-primary" onClick={() => navigate('/register')}>
              Get Started <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="landing-hero">
        {/* Background mesh */}
        <div className="landing-hero__mesh" aria-hidden />

        <div className="landing-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="landing-hero__eyebrow hero-anim-1">
            <Zap size={12} style={{ color: 'var(--accent)' }} />
            <span>Now available in Houston, TX</span>
          </div>

          <h1 className="landing-hero__title hero-anim-2">
            The modern way to<br />
            <span className="landing-hero__title-gradient">manage dental referrals</span>
          </h1>

          <p className="landing-hero__sub hero-anim-3">
            SmileRoute connects general dentists with specialists — streamlining referrals,
            eliminating paperwork, and improving patient outcomes across your network.
          </p>

          <div className="landing-hero__ctas hero-anim-4">
            <button className="btn landing-hero__btn-primary" onClick={() => navigate('/register')}>
              Start Free Trial <ArrowRight size={14} />
            </button>
            <button className="btn landing-hero__btn-secondary" onClick={() => navigate('/login')}>
              View Demo
            </button>
          </div>

          {/* Floating stat chips */}
          <div className="landing-stats hero-anim-5">
            {stats.map((s, i) => (
              <div key={s.label} className="landing-stat">
                <div className="landing-stat__value">{s.value}</div>
                <div className="landing-stat__label">{s.label}</div>
                {i < stats.length - 1 && <div className="landing-stat__divider" />}
              </div>
            ))}
          </div>

          {/* App mockup */}
          <div className="landing-preview hero-anim-6">
            <div className="landing-preview__bar">
              <div className="landing-preview__dot" style={{ background: '#FF5F57' }} />
              <div className="landing-preview__dot" style={{ background: '#FFBD2E' }} />
              <div className="landing-preview__dot" style={{ background: '#28C840' }} />
              <span className="landing-preview__url">app.smileroute.com/dashboard</span>
            </div>
            <div className="landing-preview__body">
              <div className="landing-preview__sidebar">
                {['Dashboard','Submit Referral','Referral History','Received','Directory','Analytics','Messages'].map(item => (
                  <div key={item} className={`landing-preview__nav-item${item === 'Dashboard' ? ' active' : ''}`}>{item}</div>
                ))}
              </div>
              <div className="landing-preview__content">
                <div className="landing-preview__page-header">
                  <div className="landing-preview__page-title">Dashboard</div>
                  <div className="landing-preview__page-sub">Good morning — here's what's happening.</div>
                </div>
                <div className="landing-preview__stat-row">
                  {[
                    {v:'7',  l:'Sent This Month'},
                    {v:'3',  l:'Received'},
                    {v:'2',  l:'Pending Review'},
                    {v:'148',l:'Network'},
                  ].map(s => (
                    <div key={s.l} className="landing-preview__stat-card">
                      <div className="landing-preview__stat-val">{s.v}</div>
                      <div className="landing-preview__stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="landing-preview__row-list">
                  {[
                    { patient: 'M. Johnson',  to: 'Dr. James Park',    status: 'accepted',  label: 'Accepted' },
                    { patient: 'K. Williams', to: 'Dr. Lisa Chen',     status: 'pending',   label: 'Pending' },
                    { patient: 'A. Brown',    to: 'Dr. Marcus Rivera', status: 'completed', label: 'Completed' },
                  ].map(r => (
                    <div key={r.patient} className="landing-preview__row">
                      <div className="landing-preview__row-text">
                        <span style={{ filter: 'blur(3.5px)', userSelect: 'none' }}>{r.patient}</span>
                        {' → '}
                        <span style={{ filter: 'blur(3.5px)', userSelect: 'none' }}>{r.to}</span>
                      </div>
                      <div className={`landing-preview__row-badge ${r.status}`}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted by bar ────────────────────────── */}
      <div className="landing-trust-bar reveal">
        <div className="landing-container">
          <span className="landing-trust-bar__label">Trusted by professionals across Houston & Greater Texas</span>
          <div className="landing-trust-bar__avatars">
            {[['JP','#3B82F6'],['LC','#8B5CF6'],['MR','#EF4444'],['AG','#10B981'],['RK','#F59E0B'],['EV','#EC4899']].map(([i, c]) => (
              <div key={i} className="landing-trust-avatar" style={{ background: c }}>{i}</div>
            ))}
            <span className="landing-trust-bar__count">+142 more</span>
          </div>
        </div>
      </div>

      {/* ── Features ──────────────────────────────── */}
      <section id="features" className="landing-section">
        <div className="landing-container">
          <div className="landing-section__header reveal">
            <div className="landing-eyebrow">Features</div>
            <h2 className="landing-section__title">Everything your practice needs</h2>
            <p className="landing-section__sub">Built specifically for dental professionals who value their time and their patients.</p>
          </div>
          <div className="landing-features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="landing-feature-card card reveal" style={{ '--delay': `${i * 60}ms` }}>
                <div className="landing-feature-card__icon">{f.icon}</div>
                <div className="landing-feature-card__title">{f.title}</div>
                <div className="landing-feature-card__desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────── */}
      <section id="how-it-works" className="landing-section landing-section--alt">
        <div className="landing-container">
          <div className="landing-section__header reveal">
            <div className="landing-eyebrow">How It Works</div>
            <h2 className="landing-section__title">Up and running in minutes</h2>
            <p className="landing-section__sub">No complicated setup. No training sessions. Just sign up and start sending referrals.</p>
          </div>
          <div className="landing-steps">
            {steps.flatMap((s, i) => {
              const step = (
                <div key={s.num} className="landing-step reveal" style={{ '--delay': `${i * 80}ms` }}>
                  <div className="landing-step__num">{s.num}</div>
                  <div className="landing-step__title">{s.title}</div>
                  <div className="landing-step__desc">{s.desc}</div>
                </div>
              );
              if (i < steps.length - 1) {
                return [step, <div key={`arrow-${i}`} className="landing-step__arrow"><ArrowRight size={20} /></div>];
              }
              return [step];
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────── */}
      <section id="pricing" className="landing-section landing-section--alt">
        <div className="landing-container">
          <div className="landing-section__header reveal">
            <div className="landing-eyebrow">Pricing</div>
            <h2 className="landing-section__title">Simple, transparent pricing</h2>
            <p className="landing-section__sub">One plan, everything included. No hidden fees, no per-referral charges.</p>
          </div>
          <div className="landing-pricing">
            {plans.map((plan, i) => (
              <div key={plan.name} className={`landing-plan card reveal${plan.highlight ? ' highlight' : ''}`} style={{ '--delay': `${i * 100}ms` }}>
                {plan.badge && <div className="landing-plan__badge">{plan.badge}</div>}
                <div className="landing-plan__name">{plan.name}</div>
                <div className="landing-plan__price">{plan.price}<span>{plan.period}</span></div>
                {plan.savings && <div className="landing-plan__savings">{plan.savings}</div>}
                <div className="landing-plan__divider" />
                <div className="landing-plan__features">
                  {plan.features.map(f => (
                    <div key={f} className="landing-plan__feature">
                      <CheckCircle2 size={13} style={{ color: 'var(--success)', flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
                <button
                  className={`btn w-full ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'center', marginTop: 8 }}
                  onClick={() => navigate('/register')}
                >
                  Get Started <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
          <p className="landing-pricing__note reveal">
            <Lock size={12} /> 14-day free trial · Credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section id="testimonials" className="landing-section">
        <div className="landing-container">
          <div className="landing-section__header reveal">
            <div className="landing-eyebrow">Reviews</div>
            <h2 className="landing-section__title">Trusted by dental professionals</h2>
            <p className="landing-section__sub">Here's what members say about SmileRoute.</p>
          </div>
          <div className="landing-testimonials">
            {testimonials.map((t, i) => (
              <div key={t.name} className="landing-testimonial card reveal" style={{ '--delay': `${i * 80}ms` }}>
                <div className="landing-testimonial__stars">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" style={{ color: 'var(--warning)' }} />)}
                </div>
                <p className="landing-testimonial__text">"{t.text}"</p>
                <div className="landing-testimonial__author">
                  <div className="avatar">{t.initials}</div>
                  <div>
                    <div className="landing-testimonial__name">{t.name}</div>
                    <div className="landing-testimonial__practice">{t.practice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="landing-cta-section reveal">
        <div className="landing-cta-section__bg" aria-hidden />
        <div className="landing-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="landing-cta">
            <div className="landing-cta__text">
              <h2 className="landing-cta__title">Ready to modernize your referral workflow?</h2>
              <p className="landing-cta__sub">Join 148 dental professionals already using SmileRoute.</p>
            </div>
            <div className="landing-cta__actions">
              <button className="btn landing-cta__btn-primary" onClick={() => navigate('/register')}>
                Start Free Trial <ArrowRight size={14} />
              </button>
              <Link to="/login" className="btn landing-cta__btn-secondary">Sign In</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer__inner">
            <div className="landing-footer__brand">
              <div className="landing-nav__logo">
                <img src={logo} alt="SmileRoute" className="landing-logo-img" />
                <span className="landing-nav__logo-text">SmileRoute</span>
              </div>
              <p className="landing-footer__desc">The modern referral platform built for dental professionals.</p>
            </div>
            <div className="landing-footer__links">
              <div className="landing-footer__col">
                <div className="landing-footer__col-title">Product</div>
                <button className="landing-footer__link" onClick={() => scrollTo('features')}>Features</button>
                <button className="landing-footer__link" onClick={() => scrollTo('pricing')}>Pricing</button>
                <button className="landing-footer__link" onClick={() => scrollTo('how-it-works')}>How It Works</button>
              </div>
              <div className="landing-footer__col">
                <div className="landing-footer__col-title">Account</div>
                <Link to="/login"    className="landing-footer__link">Sign In</Link>
                <Link to="/register" className="landing-footer__link">Register</Link>
              </div>
              <div className="landing-footer__col">
                <div className="landing-footer__col-title">Legal</div>
                <a href="#" className="landing-footer__link">Privacy Policy</a>
                <a href="#" className="landing-footer__link">Terms of Service</a>
                <a href="#" className="landing-footer__link">HIPAA Compliance</a>
              </div>
            </div>
          </div>
          <div className="landing-footer__bottom">
            <span>© 2026 Innovonyx, Inc. All rights reserved.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 12 }}>
              <MapPin size={11} /> Houston, TX
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
