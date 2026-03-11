import { useState } from 'react';
import { MapPin, Star, Users, User, Send, ChevronDown } from 'lucide-react';
import { dentists } from '../data/sampleData';
import { useNavigate } from 'react-router-dom';
import ExportButton from '../components/ExportButton';

const specialties = ['All', ...new Set(dentists.map(d => d.specialty))];
const SORT_OPTIONS = [
  { value: 'name',      label: 'Name' },
  { value: 'rating',    label: 'Rating' },
  { value: 'referrals', label: 'Most Referrals' },
];

export default function DirectoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [sort, setSort] = useState('rating');

  const filtered = dentists
    .filter(d => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.practice.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase());
      const matchSpecialty = specialty === 'All' || d.specialty === specialty;
      return matchSearch && matchSpecialty;
    })
    .sort((a, b) => {
      if (sort === 'rating')    return b.rating - a.rating;
      if (sort === 'referrals') return b.referrals - a.referrals;
      return a.name.localeCompare(b.name);
    });

  return (
    <>
      <div className="page-header">
        <div className="page-title">Dentist Directory</div>
        <div className="page-subtitle">
          {dentists.length} dental professionals in your network.
        </div>
      </div>

      {/* Filters + Sort */}
      <div className="filter-bar">
        <input
          className="input"
          placeholder="Search by name, practice, city…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="styled-select-wrap">
          <ChevronDown size={13} className="styled-select-wrap__icon" />
          <select
            className="styled-select"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
          >
            {specialties.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="sort-toggle-group">
          <span className="sort-toggle-group__label">Sort:</span>
          {SORT_OPTIONS.map(o => (
            <button
              key={o.value}
              className={`sort-toggle-btn${sort === o.value ? ' active' : ''}`}
              onClick={() => setSort(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <Users size={32} />
            <p>No dentists match your search.</p>
          </div>
        </div>
      ) : (
        <div className="directory-grid">
          {filtered.map(d => (
            <div key={d.id} className="card directory-card">
              <div className="directory-card__header">
                <div className="avatar lg">{d.initials}</div>
                <div className="directory-card__info">
                  <div className="directory-card__name">{d.name}</div>
                  <div className="directory-card__practice">{d.practice}</div>
                </div>
              </div>

              <div className="directory-card__meta">
                <div className="directory-card__loc">
                  <MapPin size={12} /> {d.city}
                </div>
                <div className="directory-card__rating">
                  <Star size={13} fill="currentColor" /> {d.rating}
                </div>
              </div>

              <div className="directory-card__footer">
                <span className="directory-card__refs">{d.referrals} referrals</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {!d.acceptingReferrals && (
                    <span className="badge declined" style={{ fontSize: 10 }}>Not Accepting</span>
                  )}
                  <span className="specialty-pill">{d.specialty}</span>
                </div>
              </div>

              <div className="directory-card__actions" style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => navigate(`/dentist/${d.id}`)}
                >
                  <User size={13} /> View Profile
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={!d.acceptingReferrals}
                  title={!d.acceptingReferrals ? 'Not currently accepting referrals' : undefined}
                  onClick={() => navigate('/submit', { state: { dentist: d } })}
                >
                  <Send size={13} /> Send Referral
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
