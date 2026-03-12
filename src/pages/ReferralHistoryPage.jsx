import { useState } from 'react';
import { Eye, Download, FileSearch, X, FileText, Calendar, User, Stethoscope, Hash, ChevronDown } from 'lucide-react';
import Badge from '../components/Badge';
import ExportButton from '../components/ExportButton';
import { sentReferrals, receivedReferrals } from '../data/sampleData';

export default function ReferralHistoryPage() {
  const [tab, setTab] = useState('sent');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [drawerReferral, setDrawerReferral] = useState(null);

  const data = tab === 'sent' ? sentReferrals : receivedReferrals;

  const filtered = data.filter(r => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      (r.to || r.from || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="page-header">
        <div className="page-title">Referral History</div>
        <div className="page-subtitle">Track all referrals you've sent and received.</div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn${tab === 'sent' ? ' active' : ''}`}
          onClick={() => setTab('sent')}
        >
          Sent ({sentReferrals.length})
        </button>
        <button
          className={`tab-btn${tab === 'received' ? ' active' : ''}`}
          onClick={() => setTab('received')}
        >
          Received ({receivedReferrals.length})
        </button>
      </div>

      {/* Export */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <ExportButton
          headers={['Referral ID', 'Patient', tab === 'sent' ? 'To' : 'From', 'Specialty', 'Date', 'Status']}
          rows={filtered.map(r => [r.id, r.patient, tab === 'sent' ? r.to : r.from, r.specialty, r.date, r.status])}
          filenameBase={`referral-history-${tab}`}
          title={`Referral History — ${tab === 'sent' ? 'Sent' : 'Received'}`}
        />
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          className="input"
          placeholder="Search by ID, patient, dentist…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="styled-select-wrap">
          <ChevronDown size={12} className="styled-select-wrap__icon" />
          <select className="styled-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {['All', 'Pending', 'Accepted', 'Completed', 'Declined'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="styled-select-wrap">
          <ChevronDown size={12} className="styled-select-wrap__icon" />
          <select className="styled-select" value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
            {['Last 30 days', 'Last 90 days', 'This year'].map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table — desktop */}
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Referral ID</th>
                <th>Patient</th>
                <th>{tab === 'sent' ? 'To' : 'From'}</th>
                <th>Specialty</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <FileSearch size={32} />
                      <p>No referrals found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr
                    key={r.id}
                    className="data-table__row--clickable"
                    onClick={() => setDrawerReferral({ ...r, tab })}
                  >
                    <td><span className="mono-accent">{r.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{r.patient}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {tab === 'sent' ? r.to : r.from}
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.specialty}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                    <td><Badge status={r.status} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                        <button
                          className="icon-action"
                          title="View details"
                          onClick={() => setDrawerReferral({ ...r, tab })}
                        >
                          <Eye size={14} />
                        </button>
                        <button className="icon-action" title="Download">
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        {filtered.length > 0 && (
          <div className="mobile-referral-list">
            {filtered.map(r => (
              <div
                key={r.id}
                className="mobile-referral-card"
                onClick={() => setDrawerReferral({ ...r, tab })}
              >
                <div className="mobile-referral-card__top">
                  <span className="mobile-referral-card__patient">{r.patient}</span>
                  <Badge status={r.status} />
                </div>
                <div className="mobile-referral-card__meta">
                  <span className="mono-accent" style={{ fontSize: 11 }}>{r.id}</span>
                  <span>·</span>
                  <span>{tab === 'sent' ? r.to : r.from}</span>
                  <span>·</span>
                  <span>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-in Drawer */}
      {drawerReferral && (
        <ReferralDrawer
          referral={drawerReferral}
          onClose={() => setDrawerReferral(null)}
        />
      )}
    </>
  );
}

function ReferralDrawer({ referral: r, onClose }) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <div>
            <div className="drawer__title">Referral Details</div>
            <div className="mono-accent" style={{ fontSize: 12, marginTop: 3 }}>{r.id}</div>
          </div>
          <button className="drawer__close" onClick={onClose} title="Close panel">
            <X size={16} />
          </button>
        </div>

        <div className="drawer__body">
          <div className="drawer__badge-row">
            <Badge status={r.status} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.date}</span>
          </div>

          <div className="drawer__section">
            <div className="drawer__section-title">Referral Info</div>
            <div className="drawer__info-grid">
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><User size={13} /></span>
                <span className="drawer__info-label">Patient</span>
                <span className="drawer__info-value">{r.patient}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Stethoscope size={13} /></span>
                <span className="drawer__info-label">{r.tab === 'sent' ? 'Referred To' : 'Referred By'}</span>
                <span className="drawer__info-value">{r.tab === 'sent' ? r.to : r.from}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Hash size={13} /></span>
                <span className="drawer__info-label">Specialty</span>
                <span className="drawer__info-value">{r.specialty}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Calendar size={13} /></span>
                <span className="drawer__info-label">Date Sent</span>
                <span className="drawer__info-value">{r.date}</span>
              </div>
            </div>
          </div>

          <div className="drawer__section">
            <div className="drawer__section-title">Attached File</div>
            <div className="file-preview" style={{ margin: 0 }}>
              <div className="file-preview__icon"><FileText size={18} /></div>
              <div>
                <div className="file-preview__name">patient_records_2026.pdf</div>
                <div className="file-preview__size">2.4 MB</div>
              </div>
            </div>
          </div>

          <div className="drawer__section">
            <div className="drawer__section-title">Referral Notes</div>
            {r.notes ? (
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {r.notes}
              </p>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No notes included with this referral.
              </p>
            )}
          </div>
        </div>

        <div className="drawer__footer">
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </>
  );
}
