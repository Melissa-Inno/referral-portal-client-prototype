import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Star, Award, Users, Send,
  CheckCircle2, Globe, Calendar, ArrowLeft, AlertCircle,
} from 'lucide-react';
import { dentists, currentUser } from '../data/sampleData';

export default function DentistProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dentist = dentists.find(d => d.id === Number(id));

  if (!dentist) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 32px' }}>
        <AlertCircle size={32} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Dentist not found</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
          This profile doesn't exist or may have been removed.
        </p>
        <Link to="/directory" className="btn btn-secondary">Back to Directory</Link>
      </div>
    );
  }

  const avgRating = dentist.reviews.reduce((s, r) => s + r.rating, 0) / dentist.reviews.length;
  const otherDentists = dentists.filter(d => d.id !== dentist.id).slice(0, 4);

  return (
    <>
      {/* Back nav */}
      <button
        className="btn btn-ghost"
        style={{ marginBottom: 16, paddingLeft: 4 }}
        onClick={() => navigate('/directory')}
      >
        <ArrowLeft size={15} /> Back to Directory
      </button>

      {/* Hero card */}
      <div className="card profile-hero" style={{ marginBottom: 24 }}>
        <div className="profile-hero__bg" style={{ background: dentist.acceptingReferrals ? 'var(--accent)' : 'var(--border-strong)' }} />
        <div className="profile-hero__body">
          <div className="profile-hero__avatar-wrap">
            <div className="profile-hero__avatar">{dentist.initials}</div>
            <span className={`badge ${dentist.acceptingReferrals ? 'active' : 'declined'} profile-hero__status`}>
              {dentist.acceptingReferrals ? 'Accepting Referrals' : 'Not Accepting'}
            </span>
          </div>

          <div className="profile-hero__info">
            <div className="profile-hero__name">{dentist.name}</div>
            <div className="profile-hero__practice">{dentist.practice}</div>
            <div className="profile-hero__specialty">{dentist.specialty}</div>

            <div className="profile-hero__meta">
              <span className="profile-meta-item"><MapPin size={13} /> {dentist.address}</span>
              <span className="profile-meta-item"><Phone size={13} /> {dentist.phone}</span>
              <span className="profile-meta-item"><Mail size={13} /> {dentist.email}</span>
            </div>

            <div className="profile-hero__actions">
              <button
                className="btn btn-primary"
                disabled={!dentist.acceptingReferrals}
                title={dentist.acceptingReferrals ? undefined : 'This dentist is not currently accepting referrals'}
                onClick={() => navigate('/submit', { state: { dentist } })}
              >
                <Send size={13} /> Send Referral
              </button>
              <button className="btn btn-secondary">
                <Globe size={13} /> Visit Website
              </button>
            </div>
          </div>

          <div className="profile-hero__stats">
            <div className="profile-stat">
              <div className="profile-stat__value">{dentist.referrals}</div>
              <div className="profile-stat__label">Total Referrals</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat__value">{avgRating.toFixed(1)}</div>
              <div className="profile-stat__label">Avg Rating</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat__value">{dentist.yearsActive}+</div>
              <div className="profile-stat__label">Years Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Not accepting banner */}
      {!dentist.acceptingReferrals && (
        <div className="dentist-profile__unavailable-banner">
          <AlertCircle size={16} />
          <span>{dentist.name} is not currently accepting new referrals. You can still view their profile or check back later.</span>
        </div>
      )}

      <div className="profile-grid">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* About */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">About</span>
            </div>
            <div className="card-body">
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {dentist.bio}
              </p>
            </div>
          </div>

          {/* Credentials */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Credentials</span>
            </div>
            <div className="card-body" style={{ padding: '8px 20px' }}>
              {dentist.credentials.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 0', borderBottom: '1px solid var(--border)',
                  fontSize: 13, color: 'var(--text-secondary)',
                }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>
                    {i === 0 ? <Award size={14} /> : <CheckCircle2 size={14} />}
                  </span>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Practice info */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Practice Info</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <MapPin size={14} />,    label: 'Address',   value: dentist.address },
                { icon: <Phone size={14} />,     label: 'Phone',     value: dentist.phone },
                { icon: <Mail size={14} />,      label: 'Email',     value: dentist.email },
                { icon: <Calendar size={14} />,  label: 'On SmileRoute', value: `${dentist.yearsActive} years active` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{row.label}</div>
                    <div style={{ color: 'var(--text-primary)' }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Reviews */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Peer Reviews</span>
            </div>
            <div className="card-body">
              <div className="rating-summary" style={{ marginBottom: 20 }}>
                <div className="rating-summary__score">{avgRating.toFixed(1)}</div>
                <div>
                  <div className="rating-summary__stars">
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        size={18}
                        fill={i <= Math.round(avgRating) ? 'currentColor' : 'none'}
                        style={{ color: 'var(--warning)' }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    Based on {dentist.reviews.length} peer review{dentist.reviews.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {dentist.reviews.map(r => (
                  <div key={r.author} className="review-card">
                    <div className="review-card__header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar">{r.initials}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.author}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.date}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={12}
                            fill={i <= r.rating ? 'currentColor' : 'none'}
                            style={{ color: 'var(--warning)' }}
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: 8 }}>
                      "{r.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other dentists in network */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Others in Your Network</span>
              <Link to="/directory" className="card-header__action">View all</Link>
            </div>
            <div className="card-body-0">
              {otherDentists.map(d => (
                <div
                  key={d.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 16px', borderBottom: '1px solid var(--border)',
                    cursor: 'pointer', transition: 'background-color 150ms',
                  }}
                  onClick={() => navigate(`/dentist/${d.id}`)}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div className="avatar">{d.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{d.specialty} · {d.city}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: 'var(--warning)', fontWeight: 600 }}>
                    <Star size={11} fill="currentColor" /> {d.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
