import { useNavigate } from 'react-router-dom';
import { DollarSign, Shield, Smartphone, UserSquare2 } from 'lucide-react';
import Badge from '../components/Badge';
import ExportButton from '../components/ExportButton';
import { currentUser, invoices } from '../data/sampleData';

export default function AccountPage() {
  const navigate = useNavigate();
  const profileRows = [
    { label: 'Full Name',  value: currentUser.name },
    { label: 'Practice',   value: currentUser.practice },
    { label: 'Specialty',  value: currentUser.specialty },
    { label: 'Email',      value: currentUser.email },
    { label: 'Phone',      value: currentUser.phone },
    { label: 'Address',    value: currentUser.address },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-title">Account &amp; Billing</div>
        <div className="page-subtitle">Manage your profile, membership, and invoices.</div>
      </div>

      <div className="account-grid">
        {/* Left: Profile */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">Profile Information</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="card-header__action" onClick={() => navigate('/profile')}>
                <UserSquare2 size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                View Public Profile
              </button>
              <button className="card-header__action" onClick={() => navigate('/settings')}>Edit Profile</button>
            </div>
          </div>
          <div className="card-body">
            {profileRows.map(r => (
              <div className="profile-row" key={r.label}>
                <span className="profile-row__label">{r.label}</span>
                <span className="profile-row__value">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="account-grid__right">
          {/* Membership */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Membership</span>
              <Badge status="Active" />
            </div>
            <div className="card-body">
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Plan</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Professional Annual</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>
                $99<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>/year</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Member since <strong style={{ color: 'var(--text-primary)' }}>{currentUser.memberSince}</strong>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Renews <strong style={{ color: 'var(--text-primary)' }}>{currentUser.renewalDate}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm">Renew</button>
                <button className="btn btn-danger btn-sm">Cancel</button>
              </div>
            </div>
          </div>

          {/* Invoices */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Invoices</span>
              <ExportButton
                headers={['Invoice ID', 'Date', 'Amount', 'Status', 'Description']}
                rows={invoices.map(inv => [inv.id, inv.date, inv.amount, inv.status, inv.description])}
                filenameBase="invoices"
                title="Billing Invoices"
              />
            </div>
            <div className="card-body-0">
              {invoices.map(inv => (
                <div className="invoice-row" key={inv.id}>
                  <div className="invoice-row__icon"><DollarSign size={14} /></div>
                  <div className="invoice-row__text">
                    <div className="invoice-row__desc">{inv.description}</div>
                    <div className="invoice-row__id-date">{inv.id} · {inv.date}</div>
                  </div>
                  <div className="invoice-row__amount">{inv.amount}</div>
                  <Badge status={inv.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <div className="card-header">
          <span className="card-header__title">Security Settings</span>
        </div>
        <div className="card-body-0">
          <div className="security-row">
            <div className="security-row__text">
              <div className="security-row__title">Password</div>
              <div className="security-row__sub">Last changed 6 months ago</div>
            </div>
            <button className="btn btn-secondary btn-sm">
              <Shield size={13} />
              Change Password
            </button>
          </div>
          <div className="security-row">
            <div className="security-row__text">
              <div className="security-row__title">Two-Factor Authentication</div>
              <div className="security-row__sub">Add an extra layer of security to your account</div>
            </div>
            <button className="btn btn-secondary btn-sm">
              <Smartphone size={13} />
              Enable MFA
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
