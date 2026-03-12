import { useState } from 'react';
import { Eye, Download, FileSearch, X, FileText, Calendar, User, Stethoscope, Hash, ChevronDown, CheckCircle, XCircle, Inbox } from 'lucide-react';
import Badge from '../components/Badge';
import ExportButton from '../components/ExportButton';
import { receivedReferrals } from '../data/sampleData';

export default function ReceivedReferralsPage() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [drawerReferral, setDrawerReferral] = useState(null);
  const [statuses, setStatuses]         = useState(() =>
    Object.fromEntries(receivedReferrals.map(r => [r.id, r.status]))
  );

  const filtered = receivedReferrals.filter(r => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.from.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || statuses[r.id] === statusFilter;
    return matchSearch && matchStatus;
  });

  function accept(id) { setStatuses(s => ({ ...s, [id]: 'Accepted' })); }
  function decline(id) { setStatuses(s => ({ ...s, [id]: 'Declined' })); }

  const total     = receivedReferrals.length;
  const pending   = Object.values(statuses).filter(s => s === 'Pending').length;
  const accepted  = Object.values(statuses).filter(s => s === 'Accepted').length;
  const completed = Object.values(statuses).filter(s => s === 'Completed').length;

  return (
    <>
      <div className="page-header">
        <div className="page-title">Received Referrals</div>
        <div className="page-subtitle">Referrals sent to you by other dentists in your network.</div>
      </div>

      {/* Summary strip */}
      <div className="rr-summary">
        <div className="rr-summary__item">
          <span className="rr-summary__val">{total}</span>
          <span className="rr-summary__label">Total</span>
        </div>
        <div className="rr-summary__divider" />
        <div className="rr-summary__item">
          <span className="rr-summary__val" style={{ color: 'var(--warning)' }}>{pending}</span>
          <span className="rr-summary__label">Awaiting Response</span>
        </div>
        <div className="rr-summary__divider" />
        <div className="rr-summary__item">
          <span className="rr-summary__val" style={{ color: 'var(--accent)' }}>{accepted}</span>
          <span className="rr-summary__label">Accepted</span>
        </div>
        <div className="rr-summary__divider" />
        <div className="rr-summary__item">
          <span className="rr-summary__val" style={{ color: 'var(--success)' }}>{completed}</span>
          <span className="rr-summary__label">Completed</span>
        </div>
      </div>

      {/* Export + Filters */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <ExportButton
          headers={['Referral ID', 'Patient', 'From', 'Specialty', 'Date', 'Status']}
          rows={filtered.map(r => [r.id, r.patient, r.from, r.specialty, r.date, statuses[r.id]])}
          filenameBase="received-referrals"
          title="Received Referrals"
        />
      </div>
      <div className="filter-bar">
        <input
          className="input"
          placeholder="Search by ID, patient, referring dentist…"
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
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Referral ID</th>
                <th>Patient</th>
                <th>From</th>
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
                      <div className="empty-state__icon"><Inbox size={28} /></div>
                      <div className="empty-state__title">No referrals found</div>
                      <div className="empty-state__sub">
                        {search || statusFilter !== 'All'
                          ? 'Try adjusting your search or filters.'
                          : 'Referrals sent to you by other dentists will appear here.'}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(r => {
                  const status = statuses[r.id];
                  const isPending = status === 'Pending';
                  return (
                    <tr
                      key={r.id}
                      className="data-table__row--clickable"
                      onClick={() => setDrawerReferral({ ...r, status })}
                    >
                      <td><span className="mono-accent">{r.id}</span></td>
                      <td style={{ fontWeight: 500 }}>{r.patient}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.from}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.specialty}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                      <td><Badge status={status} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                          {isPending && (
                            <>
                              <button
                                className="icon-action icon-action--success"
                                title="Accept referral"
                                onClick={() => accept(r.id)}
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                className="icon-action icon-action--danger"
                                title="Decline referral"
                                onClick={() => decline(r.id)}
                              >
                                <XCircle size={14} />
                              </button>
                            </>
                          )}
                          <button
                            className="icon-action"
                            title="View details"
                            onClick={() => setDrawerReferral({ ...r, status })}
                          >
                            <Eye size={14} />
                          </button>
                          <button className="icon-action" title="Download">
                            <Download size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        {filtered.length > 0 && (
          <div className="mobile-referral-list">
            {filtered.map(r => {
              const status = statuses[r.id];
              return (
                <div
                  key={r.id}
                  className="mobile-referral-card"
                  onClick={() => setDrawerReferral({ ...r, status })}
                >
                  <div className="mobile-referral-card__top">
                    <span className="mobile-referral-card__patient">{r.patient}</span>
                    <Badge status={status} />
                  </div>
                  <div className="mobile-referral-card__meta">
                    <span className="mono-accent" style={{ fontSize: 11 }}>{r.id}</span>
                    <span>·</span>
                    <span>{r.from}</span>
                    <span>·</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {drawerReferral && (
        <ReceivedDrawer
          referral={drawerReferral}
          onClose={() => setDrawerReferral(null)}
          onAccept={() => { accept(drawerReferral.id); setDrawerReferral(r => ({ ...r, status: 'Accepted' })); }}
          onDecline={() => { decline(drawerReferral.id); setDrawerReferral(r => ({ ...r, status: 'Declined' })); }}
        />
      )}
    </>
  );
}

function ReceivedDrawer({ referral: r, onClose, onAccept, onDecline }) {
  const isPending = r.status === 'Pending';
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <div>
            <div className="drawer__title">Received Referral</div>
            <div className="mono-accent" style={{ fontSize: 12, marginTop: 3 }}>{r.id}</div>
          </div>
          <button className="drawer__close" onClick={onClose} title="Close">
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
                <span className="drawer__info-label">Referred By</span>
                <span className="drawer__info-value">{r.from}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Hash size={13} /></span>
                <span className="drawer__info-label">Specialty</span>
                <span className="drawer__info-value">{r.specialty}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Calendar size={13} /></span>
                <span className="drawer__info-label">Date Received</span>
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
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{r.notes}</p>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>No notes included.</p>
            )}
          </div>
        </div>

        <div className="drawer__footer">
          {isPending ? (
            <>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={onAccept}>
                <CheckCircle size={14} /> Accept
              </button>
              <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }} onClick={onDecline}>
                <XCircle size={14} /> Decline
              </button>
            </>
          ) : (
            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
              <Download size={14} /> Download
            </button>
          )}
        </div>
      </div>
    </>
  );
}
