import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Lock, ShieldCheck, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import ThemeToggle from '../components/ThemeToggle';

const STEPS = ['Account Details', 'Practice Info', 'Membership Payment'];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <div className="register-page">
      <div className="register-page__header">
        <img src={logo} alt="SmileRoute" className="landing-logo-img" />
        <span className="register-page__logo-text">SmileRoute</span>
      </div>

      <div className="register-page__card card">
        <div className="card-body">
          {/* Step indicator */}
          <div className="steps">
            {STEPS.map((label, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : undefined }}>
                <div className="step">
                  <div className={`step__num${i < step ? ' done' : i === step ? ' active' : ''}`}>
                    {i < step ? <CheckCircle2 size={12} /> : i + 1}
                  </div>
                  <span className={`step__label${i === step ? ' active' : ''}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="step__line" />}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 0 && <StepAccount />}
          {step === 1 && <StepPractice />}
          {step === 2 && <StepPayment />}

          <div className="register-actions" style={{ marginTop: 20 }}>
            {step > 0 && (
              <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>
                Back
              </button>
            )}
            {step < 2 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>
                Continue
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => navigate('/onboarding')}>
                Pay &amp; Enroll
              </button>
            )}
          </div>

          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent-text)', textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>

      <div className="register-page__theme-toggle">
        <ThemeToggle />
      </div>
    </div>
  );
}

function StepAccount() {
  return (
    <div className="register-form">
      <div className="input-row">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input className="input" defaultValue="Sarah" />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input className="input" defaultValue="Mitchell" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input className="input" type="email" defaultValue="s.mitchell@mitchelldental.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input className="input" type="password" defaultValue="password123" />
      </div>
      <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <input className="input" type="password" defaultValue="password123" />
      </div>
    </div>
  );
}

function StepPractice() {
  return (
    <div className="register-form">
      <div className="form-group">
        <label className="form-label">Practice Name</label>
        <input className="input" defaultValue="Mitchell Family Dentistry" />
      </div>
      <div className="input-row">
        <div className="form-group">
          <label className="form-label">Specialty</label>
          <div className="styled-select-wrap" style={{ width: '100%' }}>
            <ChevronDown size={12} className="styled-select-wrap__icon" />
            <select className="styled-select" style={{ width: '100%' }}>
              <option>General Dentistry</option>
              <option>Orthodontics</option>
              <option>Periodontics</option>
              <option>Endodontics</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="input" defaultValue="(512) 555-0147" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Practice Address</label>
        <input className="input" defaultValue="4200 Medical Pkwy, Suite 310, Austin, TX" />
      </div>
      <div className="form-group">
        <label className="form-label">License Number</label>
        <input className="input" placeholder="TX-DDS-XXXXX" />
      </div>
    </div>
  );
}

function StepPayment() {
  return (
    <div className="register-form">
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--accent-text)', fontWeight: 600, marginBottom: 12 }}>
        14-day free trial — cancel anytime
      </p>
      <div className="plan-card">
        <div className="plan-card__name">Professional Annual Plan</div>
        <div className="plan-card__price">$299<span>/year</span></div>
        <div className="plan-card__features">
          {[
            'Unlimited referrals sent & received',
            'Access to full dentist directory',
            'Referral history & tracking',
            'Priority support',
          ].map(f => (
            <div className="plan-card__feature" key={f}>
              <CheckCircle2 size={12} />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Card Number</label>
        <div style={{ position: 'relative' }}>
          <input className="input" placeholder="4242 4242 4242 4242" style={{ paddingRight: 40 }} />
          <Lock size={13} style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', pointerEvents: 'none',
          }} />
        </div>
      </div>
      <div className="input-row">
        <div className="form-group">
          <label className="form-label">Expiry</label>
          <input className="input" placeholder="MM / YY" />
        </div>
        <div className="form-group">
          <label className="form-label">CVC</label>
          <input className="input" placeholder="123" />
        </div>
      </div>

      {/* Trust badge */}
      <div className="trust-badge">
        <ShieldCheck size={14} />
        <span>256-bit SSL encryption · Payments processed securely via Stripe</span>
      </div>
    </div>
  );
}
