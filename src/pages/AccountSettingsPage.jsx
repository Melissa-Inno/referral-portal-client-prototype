import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User, Bell, Lock, Palette, Globe, Trash2,
  CheckCircle2, Sun, Moon, Monitor, AlertTriangle, X, ChevronDown,
} from 'lucide-react';
import { currentUser } from '../data/sampleData';
import { useTheme } from '../context/ThemeContext';

const SECTIONS = [
  { id: 'profile',       icon: <User size={15} />,    label: 'Profile' },
  { id: 'notifications', icon: <Bell size={15} />,    label: 'Notifications' },
  { id: 'security',      icon: <Lock size={15} />,    label: 'Security' },
  { id: 'appearance',    icon: <Palette size={15} />, label: 'Appearance' },
  { id: 'privacy',       icon: <Globe size={15} />,   label: 'Privacy' },
  { id: 'danger',        icon: <Trash2 size={15} />,  label: 'Danger Zone' },
];

const VALID_TABS = new Set(SECTIONS.map(s => s.id));

export default function AccountSettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const active = VALID_TABS.has(tabParam) ? tabParam : 'profile';
  const [saved, setSaved] = useState(false);

  function setActive(tab) {
    setSearchParams({ tab }, { replace: true });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <div className="page-header">
        <div className="page-title">Account Settings</div>
        <div className="page-subtitle">Manage your profile, preferences, and security.</div>
      </div>

      <div className="settings-layout">
        {/* Sidebar nav */}
        <div className="settings-nav card">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`settings-nav__item${active === s.id ? ' active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {active === 'profile'       && <SectionProfile onSave={handleSave} saved={saved} />}
          {active === 'notifications' && <SectionNotifications onSave={handleSave} saved={saved} />}
          {active === 'security'      && <SectionSecurity onSave={handleSave} saved={saved} />}
          {active === 'appearance'    && <SectionAppearance />}
          {active === 'privacy'       && <SectionPrivacy onSave={handleSave} saved={saved} />}
          {active === 'danger'        && <SectionDanger />}
        </div>
      </div>
    </>
  );
}

/* ── Profile ── */
function SectionProfile({ onSave, saved }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-header__title">Profile Information</span>
      </div>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Avatar row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="avatar lg" style={{ width: 56, height: 56, fontSize: 18 }}>
            {currentUser.initials}
          </div>
          <div>
            <button className="btn btn-secondary btn-sm">Change Photo</button>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 5 }}>
              JPG, PNG · Max 2 MB
            </div>
          </div>
        </div>

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
          <input className="input" type="email" defaultValue={currentUser.email} />
        </div>

        <div className="input-row">
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="input" defaultValue={currentUser.phone} />
          </div>
          <div className="form-group">
            <label className="form-label">Specialty</label>
            <div className="styled-select-wrap" style={{ width: '100%' }}>
              <ChevronDown size={12} className="styled-select-wrap__icon" />
              <select className="styled-select" style={{ width: '100%' }}>
                <option>General Dentistry</option>
                <option>Orthodontics</option>
                <option>Periodontics</option>
                <option>Endodontics</option>
                <option>Oral Surgery</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Practice Name</label>
          <input className="input" defaultValue={currentUser.practice} />
        </div>

        <div className="form-group">
          <label className="form-label">Practice Address</label>
          <input className="input" defaultValue={currentUser.address} />
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            className="input"
            rows={3}
            style={{ resize: 'vertical' }}
            placeholder="A short bio visible on your public profile…"
          />
        </div>

        <SaveBar onSave={onSave} saved={saved} />
      </div>
    </div>
  );
}

/* ── Notifications ── */
function SectionNotifications({ onSave, saved }) {
  const prefs = [
    { label: 'New referral received',        sub: 'Get notified when a colleague sends you a referral',  def: true  },
    { label: 'Referral status updates',      sub: 'When a referral you sent is accepted or completed',    def: true  },
    { label: 'Network join requests',         sub: 'When another dentist connects with you',              def: false },
    { label: 'Membership renewal reminders', sub: '30 and 7 days before your membership renews',          def: true  },
    { label: 'Weekly summary email',          sub: 'A digest of your referral activity each Monday',      def: false },
    { label: 'Product announcements',         sub: 'New features and updates from SmileRoute',           def: false },
  ];
  const [vals, setVals] = useState(prefs.map(p => p.def));

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-header__title">Notification Preferences</span>
      </div>
      <div className="card-body-0">
        {prefs.map((p, i) => (
          <div key={p.label} className="settings-toggle-row">
            <div>
              <div className="settings-toggle-row__label">{p.label}</div>
              <div className="settings-toggle-row__sub">{p.sub}</div>
            </div>
            <Toggle value={vals[i]} onChange={v => setVals(a => a.map((x, j) => j === i ? v : x))} />
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
        <SaveBar onSave={onSave} saved={saved} />
      </div>
    </div>
  );
}

/* ── Security ── */
function SectionSecurity({ onSave, saved }) {
  const [mfa, setMfa] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Change password */}
      <div className="card">
        <div className="card-header">
          <span className="card-header__title">Change Password</span>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Must be at least 8 characters with a number and a symbol.
          </div>
          <SaveBar onSave={onSave} saved={saved} label="Update Password" />
        </div>
      </div>

      {/* MFA */}
      <div className="card">
        <div className="card-header">
          <span className="card-header__title">Two-Factor Authentication</span>
        </div>
        <div className="settings-toggle-row" style={{ padding: '16px 20px' }}>
          <div>
            <div className="settings-toggle-row__label">Enable 2FA</div>
            <div className="settings-toggle-row__sub">
              Secure your account with an authenticator app.
            </div>
          </div>
          <Toggle value={mfa} onChange={setMfa} />
        </div>
        {mfa && (
          <div style={{ padding: '0 20px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
            Scan the QR code in your authenticator app (Google Authenticator, Authy, etc.) to complete setup.
            <div style={{
              marginTop: 12, width: 100, height: 100, background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: 'var(--text-muted)',
            }}>QR Code</div>
          </div>
        )}
      </div>

      {/* Active sessions */}
      <div className="card">
        <div className="card-header">
          <span className="card-header__title">Active Sessions</span>
        </div>
        <div className="card-body-0">
          {[
            { device: 'Chrome on Windows', location: 'Austin, TX', time: 'Now — current session', current: true },
            { device: 'Safari on iPhone',  location: 'Austin, TX', time: '2 hours ago',           current: false },
          ].map(s => (
            <div key={s.device} className="settings-toggle-row">
              <div>
                <div className="settings-toggle-row__label">
                  {s.device}
                  {s.current && <span className="badge active" style={{ marginLeft: 8, fontSize: 10 }}>Current</span>}
                </div>
                <div className="settings-toggle-row__sub">{s.location} · {s.time}</div>
              </div>
              {!s.current && <button className="btn btn-danger btn-sm">Revoke</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Appearance ── */
function SectionAppearance() {
  const { theme, toggleTheme } = useTheme();
  const options = [
    { id: 'light',  icon: <Sun size={20} />,     label: 'Light' },
    { id: 'dark',   icon: <Moon size={20} />,    label: 'Dark' },
    { id: 'system', icon: <Monitor size={20} />, label: 'System' },
  ];
  const [selected, setSelected] = useState(theme);
  const [fontSize, setFontSize] = useState('Medium');

  function pick(id) {
    setSelected(id);
    if (id === 'light' && theme === 'dark') toggleTheme();
    if (id === 'dark'  && theme === 'light') toggleTheme();
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-header__title">Appearance</span>
      </div>
      <div className="card-body">
        <div className="form-label" style={{ marginBottom: 12 }}>Theme</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => pick(o.id)}
              className={`theme-option${selected === o.id ? ' selected' : ''}`}
            >
              <div className="theme-option__icon">{o.icon}</div>
              <div className="theme-option__label">{o.label}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="form-label" style={{ marginBottom: 12 }}>Font Size</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Small', 'Medium', 'Large'].map(s => (
              <button
                key={s}
                className={`btn btn-secondary btn-sm${fontSize === s ? ' active-size' : ''}`}
                style={fontSize === s ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
                onClick={() => setFontSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Privacy ── */
function SectionPrivacy({ onSave, saved }) {
  const prefs = [
    { label: 'Show profile in directory',    sub: 'Allow other SmileRoute members to find your profile',   def: true  },
    { label: 'Show referral count publicly', sub: 'Display your total referral count on your public profile', def: true  },
    { label: 'Allow connection requests',    sub: 'Let other dentists add you to their network',             def: true  },
    { label: 'Show online status',           sub: 'Display when you were last active',                       def: false },
  ];
  const [vals, setVals] = useState(prefs.map(p => p.def));

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-header__title">Privacy</span>
      </div>
      <div className="card-body-0">
        {prefs.map((p, i) => (
          <div key={p.label} className="settings-toggle-row">
            <div>
              <div className="settings-toggle-row__label">{p.label}</div>
              <div className="settings-toggle-row__sub">{p.sub}</div>
            </div>
            <Toggle value={vals[i]} onChange={v => setVals(a => a.map((x, j) => j === i ? v : x))} />
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
        <SaveBar onSave={onSave} saved={saved} />
      </div>
    </div>
  );
}

/* ── Danger Zone ── */
function SectionDanger() {
  const [confirm, setConfirm] = useState(null); // { title, body, onConfirm }

  const actions = [
    {
      title: 'Pause Membership',
      sub: 'Temporarily disable your account. You can reactivate at any time.',
      btn: 'Pause Account',
      confirmTitle: 'Pause your membership?',
      confirmBody: 'Your account will be disabled and you will lose access to the network until you reactivate. This can be reversed at any time.',
      danger: false,
    },
    {
      title: 'Export My Data',
      sub: 'Download a copy of all your referral history, profile, and account data.',
      btn: 'Export Data',
      confirmTitle: 'Export your data?',
      confirmBody: 'We\'ll prepare a full export of your account data including referral history, profile information, and invoices. You\'ll receive a download link via email.',
      danger: false,
    },
    {
      title: 'Delete Account',
      sub: 'Permanently delete your account and all associated data. This cannot be undone.',
      btn: 'Delete Account',
      confirmTitle: 'Delete your account?',
      confirmBody: 'This will permanently delete your account, all referral history, and remove you from the network. This action cannot be undone.',
      danger: true,
    },
  ];

  return (
    <>
      <div className="card">
        <div className="card-header">
          <span className="card-header__title" style={{ color: 'var(--danger)' }}>Danger Zone</span>
        </div>
        <div className="card-body-0">
          {actions.map(item => (
            <div key={item.title} className="settings-toggle-row">
              <div>
                <div className="settings-toggle-row__label">{item.title}</div>
                <div className="settings-toggle-row__sub">{item.sub}</div>
              </div>
              <button
                className={`btn btn-sm ${item.danger ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => setConfirm({
                  title: item.confirmTitle,
                  body: item.confirmBody,
                  danger: item.danger,
                  onConfirm: () => setConfirm(null),
                })}
              >
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {confirm && (
        <ConfirmModal
          title={confirm.title}
          body={confirm.body}
          danger={confirm.danger}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}

/* ── Confirm Modal ── */
function ConfirmModal({ title, body, danger, onConfirm, onCancel }) {
  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: danger ? 'var(--danger-bg)' : 'var(--warning-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: danger ? 'var(--danger)' : 'var(--warning)',
          }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="confirm-modal__title">{title}</div>
          </div>
          <button className="drawer__close" style={{ marginLeft: 'auto' }} onClick={onCancel} title="Cancel">
            <X size={15} />
          </button>
        </div>
        <div className="confirm-modal__body">{body}</div>
        <div className="confirm-modal__actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */
function Toggle({ value, onChange }) {
  return (
    <button
      className={`toggle${value ? ' on' : ''}`}
      onClick={() => onChange(!value)}
      title={value ? 'Enabled' : 'Disabled'}
    />
  );
}

function SaveBar({ onSave, saved, label = 'Save Changes' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button className="btn btn-primary" onClick={onSave}>{label}</button>
      {saved && (
        <span style={{ fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <CheckCircle2 size={14} /> Saved
        </span>
      )}
    </div>
  );
}
