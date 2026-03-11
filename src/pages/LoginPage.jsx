import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('s.mitchell@mitchelldental.com');
  const [password, setPassword] = useState('password123');
  const [remember, setRemember] = useState(true);

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-page__left">
        <div className="login-page__logo">
          <img src={logo} alt="SmileRoute" className="landing-logo-img" />
          <span className="login-page__logo-text">SmileRoute</span>
        </div>

        <div className="login-page__tagline">
          Streamline your<br />patient referrals.
        </div>
        <div className="login-page__desc">
          A modern platform connecting dental professionals — securely
          manage referrals, track outcomes, and grow your network.
        </div>

        <div className="login-page__stats">
          {[
            { value: '148', label: 'Enrolled Dentists' },
            { value: '2.4K', label: 'Referrals Made' },
            { value: '99%', label: 'Satisfaction Rate' },
          ].map(s => (
            <div className="login-page__stat" key={s.label}>
              <span className="login-page__stat-value">{s.value}</span>
              <span className="login-page__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="login-page__right">
        <div className="login-page__form-wrap">
          <div className="login-page__form-title">Welcome back</div>
          <div className="login-page__form-sub">
            Sign in to your SmileRoute account
          </div>

          <div className="login-page__form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@practice.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="login-page__remember">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="login-page__forgot">Forgot password?</a>
            </div>

            <button
              className="btn btn-primary w-full"
              style={{ justifyContent: 'center', padding: '10px 14px' }}
              onClick={() => navigate('/dashboard')}
            >
              Sign In
            </button>
          </div>

          <div className="login-page__register">
            New to SmileRoute?{' '}
            <Link to="/register">Register &amp; Enroll</Link>
          </div>
        </div>
      </div>

      <div className="login-page__theme-toggle">
        <ThemeToggle />
      </div>
    </div>
  );
}
