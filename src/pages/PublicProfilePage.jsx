import { MapPin, Phone, Mail, Star, Award, Users, Send, CheckCircle2, Globe, Calendar } from 'lucide-react';
import { currentUser, sentReferrals, receivedReferrals, dentists } from '../data/sampleData';
import Badge from '../components/Badge';

const totalReferrals = sentReferrals.length + receivedReferrals.length;

const reviews = [
  { author: 'Dr. James Park',    initials: 'JP', rating: 5, date: 'Feb 2026', text: 'Dr. Mitchell provides thorough referral notes and her patients always arrive well-prepared. A pleasure to work with.' },
  { author: 'Dr. Marcus Rivera', initials: 'MR', rating: 5, date: 'Jan 2026', text: 'Excellent communication and follow-up. One of the most professional referral partners in our network.' },
  { author: 'Dr. Nina Patel',    initials: 'NP', rating: 4, date: 'Dec 2025', text: 'Reliable, detailed referrals. Patients speak highly of Dr. Mitchell\'s practice.' },
];

const specialties = ['Orthodontics', 'Periodontics', 'Oral Surgery', 'Endodontics', 'Pediatric Dentistry'];

export default function PublicProfilePage() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      {/* Hero card */}
      <div className="card profile-hero">
        <div className="profile-hero__bg" />
        <div className="profile-hero__body">
          <div className="profile-hero__avatar-wrap">
            <div className="profile-hero__avatar">
              {currentUser.initials}
            </div>
            <span className="badge active profile-hero__status">Accepting Referrals</span>
          </div>

          <div className="profile-hero__info">
            <div className="profile-hero__name">{currentUser.name}</div>
            <div className="profile-hero__practice">{currentUser.practice}</div>
            <div className="profile-hero__specialty">{currentUser.specialty}</div>

            <div className="profile-hero__meta">
              <span className="profile-meta-item"><MapPin size={13} /> {currentUser.address}</span>
              <span className="profile-meta-item"><Phone size={13} /> {currentUser.phone}</span>
              <span className="profile-meta-item"><Mail size={13} /> {currentUser.email}</span>
            </div>

            <div className="profile-hero__actions">
              <button className="btn btn-primary"><Send size={13} /> Send Referral</button>
              <button className="btn btn-secondary"><Globe size={13} /> Visit Website</button>
            </div>
          </div>

          <div className="profile-hero__stats">
            <div className="profile-stat">
              <div className="profile-stat__value">{totalReferrals}</div>
              <div className="profile-stat__label">Total Referrals</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat__value">{avgRating}</div>
              <div className="profile-stat__label">Avg Rating</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat__value">3+</div>
              <div className="profile-stat__label">Years Active</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* About */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">About</span>
            </div>
            <div className="card-body">
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Dr. Sarah Mitchell is a general dentist with over a decade of experience serving
                the Austin, TX community. She completed her DDS at the University of Texas School
                of Dentistry and has been an active member of the SmileRoute network since
                March 2024.
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 10 }}>
                Her practice focuses on comprehensive preventive care, restorations, and
                patient-centered treatment planning. She actively collaborates with specialists
                across Central Texas and prides herself on detailed, timely referral communication.
              </p>
            </div>
          </div>

          {/* Referral specialties */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Refers To</span>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {specialties.map(s => (
                  <span className="specialty-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Credentials</span>
            </div>
            <div className="card-body">
              {[
                { icon: <Award size={14} />,    label: 'DDS — University of Texas School of Dentistry' },
                { icon: <CheckCircle2 size={14} />, label: 'Texas State Board of Dental Examiners — Active License' },
                { icon: <Users size={14} />,    label: 'American Dental Association — Member' },
                { icon: <Calendar size={14} />, label: `SmileRoute Member since ${currentUser.memberSince}` },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{c.icon}</span>
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Rating summary */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Peer Reviews</span>
            </div>
            <div className="card-body">
              <div className="rating-summary">
                <div className="rating-summary__score">{avgRating}</div>
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
                    Based on {reviews.length} peer reviews
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                {reviews.map(r => (
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
                          <Star
                            key={i}
                            size={12}
                            fill={i <= r.rating ? 'currentColor' : 'none'}
                            style={{ color: 'var(--warning)' }}
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 8 }}>
                      "{r.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Network connections */}
          <div className="card">
            <div className="card-header">
              <span className="card-header__title">Network Connections</span>
            </div>
            <div className="card-body-0">
              {dentists.slice(0, 4).map(d => (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--border)', transition: 'background-color 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div className="avatar">{d.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{d.specialty} · {d.city}</div>
                  </div>
                  <span className="specialty-pill" style={{ fontSize: 10 }}>{d.referrals} refs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
