import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send, Clock, Users, MessageSquare, ArrowRight,
  LayoutDashboard, BookOpen, Sparkles, Rocket,
} from 'lucide-react';
import logo from '../assets/logo.png';
import ThemeToggle from '../components/ThemeToggle';

const FEATURES = [
  { icon: Send, title: 'Submit Referrals', desc: 'Quickly refer patients to trusted specialists with all the details they need.' },
  { icon: Clock, title: 'Track History', desc: 'Monitor every referral from submission to completion in real time.' },
  { icon: Users, title: 'Browse Directory', desc: 'Find and connect with verified dental professionals in your area.' },
  { icon: MessageSquare, title: 'Message Dentists', desc: 'Communicate directly with colleagues about shared patients.' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const next = () => {
    if (step < totalSteps - 1) setStep(s => s + 1);
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">

        {/* Step 0: Welcome */}
        <div className={`onboarding-step${step === 0 ? ' active' : ''}`}>
          <div className="onboarding-icon-area">
            <div className="onboarding-icon-circle">
              <Sparkles size={32} />
            </div>
          </div>
          <img src={logo} alt="SmileRoute" className="landing-logo-img" style={{ margin: '0 auto 8px' }} />
          <h1 className="onboarding-title">Welcome to SmileRoute, Dr. Mitchell!</h1>
          <p className="onboarding-subtitle">
            Your account is ready. Let us show you around so you can get the most out of your new referral platform.
          </p>
          <button className="btn btn-primary onboarding-next-btn" onClick={next}>
            Let's Go <ArrowRight size={15} />
          </button>
        </div>

        {/* Step 1: Quick Tour */}
        <div className={`onboarding-step${step === 1 ? ' active' : ''}`}>
          <div className="onboarding-icon-area">
            <div className="onboarding-icon-circle">
              <BookOpen size={28} />
            </div>
          </div>
          <h2 className="onboarding-title">Here's what you can do</h2>
          <p className="onboarding-subtitle">
            SmileRoute makes referral management simple and efficient.
          </p>
          <div className="onboarding-features">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div className="onboarding-feature-card" key={title}>
                <div className="onboarding-feature-icon">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="onboarding-feature-title">{title}</div>
                  <div className="onboarding-feature-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary onboarding-next-btn" onClick={next}>
            Continue <ArrowRight size={15} />
          </button>
        </div>

        {/* Step 2: Get Started */}
        <div className={`onboarding-step${step === 2 ? ' active' : ''}`}>
          <div className="onboarding-icon-area">
            <div className="onboarding-icon-circle">
              <Rocket size={28} />
            </div>
          </div>
          <h2 className="onboarding-title">You're all set!</h2>
          <p className="onboarding-subtitle">
            Choose where you'd like to start. You can always access everything from the sidebar.
          </p>
          <div className="onboarding-actions">
            <button className="btn btn-primary onboarding-action-btn" onClick={() => navigate('/dashboard')}>
              <LayoutDashboard size={16} /> Go to Dashboard
            </button>
            <button className="btn btn-secondary onboarding-action-btn" onClick={() => navigate('/submit')}>
              <Send size={16} /> Submit First Referral
            </button>
            <button className="btn btn-secondary onboarding-action-btn" onClick={() => navigate('/directory')}>
              <Users size={16} /> Browse Directory
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="onboarding-dots">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              className={`onboarding-dot${i === step ? ' active' : ''}`}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="onboarding-theme-toggle">
        <ThemeToggle />
      </div>
    </div>
  );
}
