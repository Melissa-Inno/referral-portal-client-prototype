import { useState, useRef, useEffect } from 'react';
import { Search, Send, Plus, X, MessageSquare, ArrowLeft, ChevronRight, User, Stethoscope, Hash, Calendar, FileText, Download } from 'lucide-react';
import { dentists, sentReferrals, receivedReferrals } from '../data/sampleData';
import Badge from '../components/Badge';
import { useMessages } from '../context/MessagesContext';

const REF_PATTERN = /\b(REF-\d{4}-\d{4})\b/g;

function linkifyRefs(text, onRefClick) {
  const parts = [];
  let lastIndex = 0;
  let match;
  REF_PATTERN.lastIndex = 0;
  while ((match = REF_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const refId = match[1];
    parts.push(
      <button key={match.index} className="msg-ref-link" onClick={() => onRefClick(refId)}>
        {refId}
      </button>
    );
    lastIndex = REF_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function MessagesPage() {
  const { convos, markRead, addMessage, totalUnread } = useMessages();
  const [activeId, setActiveId] = useState(null);
  const [refModal, setRefModal] = useState(null);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'thread'
  const messagesEndRef = useRef(null);

  const activeConvo = convos.find(c => c.id === activeId);
  const filtered = convos.filter(c =>
    c.with.name.toLowerCase().includes(search.toLowerCase()) ||
    c.with.practice.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, convos]);

  function openConvo(id) {
    setActiveId(id);
    setMobileView('thread');
    markRead(id);
  }

  function handleRefClick(refId) {
    const sent = sentReferrals.find(r => r.id === refId);
    if (sent) { setRefModal({ ...sent, direction: 'sent' }); return; }
    const received = receivedReferrals.find(r => r.id === refId);
    if (received) setRefModal({ ...received, direction: 'received' });
  }

  function sendMessage() {
    if (!input.trim() || !activeId) return;
    const newMsg = {
      id: Date.now(),
      from: 'me',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
    };
    addMessage(activeId, newMsg);
    setInput('');
  }

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          Messages
        </div>
        <div className="page-subtitle">Communicate directly with dentists in your network.</div>
      </div>

      <div className="messages-layout card">
        {/* Left: conversation list */}
        <div className={`messages-list${mobileView === 'thread' ? ' messages-list--hidden-mobile' : ''}`}>
          <div className="messages-list__header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Conversations</span>
              <button className="btn btn-primary btn-sm" onClick={() => setShowCompose(true)}>
                <Plus size={13} /> New
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                className="input"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 32, width: '100%' }}
              />
            </div>
          </div>

          <div className="messages-list__items">
            {filtered.length === 0 ? (
              <div className="empty-state" style={{ padding: '32px 0' }}>
                <MessageSquare size={28} />
                <p>No conversations found.</p>
              </div>
            ) : (
              filtered.map(c => {
                const lastMsg = c.messages[c.messages.length - 1];
                return (
                  <div
                    key={c.id}
                    className={`convo-item${c.id === activeId ? ' active' : ''}${c.unread > 0 ? ' unread' : ''}`}
                    onClick={() => openConvo(c.id)}
                  >
                    <div className="avatar convo-item__avatar">{c.with.initials}</div>
                    <div className="convo-item__body">
                      <div className="convo-item__top">
                        <span className="convo-item__name">{c.with.name}</span>
                        <span className="convo-item__time">{lastMsg.time}</span>
                      </div>
                      <div className="convo-item__preview">
                        {lastMsg.from === 'me' ? 'You: ' : ''}{lastMsg.text}
                      </div>
                    </div>
                    {c.unread > 0 && <span className="convo-item__badge">{c.unread}</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="messages-divider" />

        {/* Right: thread */}
        <div className={`messages-thread${mobileView === 'list' ? ' messages-thread--hidden-mobile' : ''}`}>
          {activeConvo ? (
            <>
              <div className="messages-thread__header">
                <button className="messages-thread__back" onClick={() => setMobileView('list')}>
                  <ArrowLeft size={16} />
                </button>
                <div className="avatar">{activeConvo.with.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="messages-thread__name">{activeConvo.with.name}</div>
                  <div className="messages-thread__sub">{activeConvo.with.specialty} · {activeConvo.with.practice}</div>
                </div>
              </div>

              <div className="messages-thread__body">
                {activeConvo.messages.map((msg, i) => {
                  const showDate = i === 0 || activeConvo.messages[i - 1].date !== msg.date;
                  const isMe = msg.from === 'me';
                  return (
                    <div key={msg.id}>
                      {showDate && <div className="msg-date-divider">{msg.date}</div>}
                      <div className={`msg-bubble-wrap${isMe ? ' me' : ' them'}`}>
                        {!isMe && (
                          <div className="avatar msg-avatar">{activeConvo.with.initials}</div>
                        )}
                        <div className={`msg-bubble${isMe ? ' msg-bubble--me' : ' msg-bubble--them'}`}>
                          <div className="msg-bubble__text">{linkifyRefs(msg.text, handleRefClick)}</div>
                          <div className="msg-bubble__time">{msg.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="messages-thread__footer">
                <input
                  className="input"
                  placeholder={`Message ${activeConvo.with.name}…`}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  style={{ flex: 1 }}
                />
                <button
                  className="btn btn-primary"
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  style={{ flexShrink: 0 }}
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state messages-thread__empty">
              <MessageSquare size={36} style={{ opacity: 0.25 }} />
              <p>Select a conversation to start messaging.</p>
            </div>
          )}
        </div>
      </div>

      {showCompose && <ComposeDrawer onClose={() => setShowCompose(false)} />}
      {refModal && <RefDrawer referral={refModal} onClose={() => setRefModal(null)} />}
    </>
  );
}

function RefDrawer({ referral: r, onClose }) {
  const isSent = r.direction === 'sent';
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <div>
            <div className="drawer__title">Referral Details</div>
            <div className="mono-accent" style={{ fontSize: 12, marginTop: 3 }}>{r.id}</div>
          </div>
          <button className="drawer__close" onClick={onClose} title="Close"><X size={16} /></button>
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
                <span className="drawer__info-label">{isSent ? 'Referred To' : 'Referred By'}</span>
                <span className="drawer__info-value">{isSent ? r.to : r.from}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Hash size={13} /></span>
                <span className="drawer__info-label">Specialty</span>
                <span className="drawer__info-value">{r.specialty}</span>
              </div>
              <div className="drawer__info-row">
                <span className="drawer__info-icon"><Calendar size={13} /></span>
                <span className="drawer__info-label">Date</span>
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
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </>
  );
}

function ComposeDrawer({ onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const results = query.length > 0
    ? dentists.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.practice.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  function selectDentist(d) {
    setSelected(d);
    setQuery(d.name);
    setShowDropdown(false);
    inputRef.current?.blur();
  }

  function clearSelected() {
    setSelected(null);
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer compose-drawer">
        <div className="drawer__header">
          <div className="drawer__title">New Message</div>
          <button className="drawer__close" onClick={onClose} title="Close"><X size={16} /></button>
        </div>

        <div className="drawer__body">
          {/* To field */}
          <div className="form-group">
            <label className="form-label">To</label>
            <div className="compose-to-wrap">
              {selected ? (
                <div className="compose-selected-dentist">
                  <div className="avatar" style={{ width: 26, height: 26, fontSize: 10, flexShrink: 0 }}>
                    {selected.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{selected.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.specialty} · {selected.practice}</div>
                  </div>
                  <button className="compose-selected-clear" onClick={clearSelected} title="Remove">
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input
                    ref={inputRef}
                    className="input"
                    placeholder="Search by name, practice, or specialty…"
                    value={query}
                    onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    autoFocus
                    style={{ paddingLeft: 32 }}
                  />
                  {showDropdown && results.length > 0 && (
                    <div className="compose-dropdown">
                      {results.map(d => (
                        <div key={d.id} className="compose-dropdown__item" onMouseDown={() => selectDentist(d)}>
                          <div className="avatar" style={{ width: 30, height: 30, fontSize: 11, flexShrink: 0 }}>
                            {d.initials}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.specialty} · {d.practice}</div>
                          </div>
                          {!d.acceptingReferrals && (
                            <span className="badge declined" style={{ fontSize: 10, flexShrink: 0 }}>Away</span>
                          )}
                          <ChevronRight size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {showDropdown && query.length > 0 && results.length === 0 && (
                    <div className="compose-dropdown">
                      <div style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
                        No dentists found matching "{query}"
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Message field */}
          <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label className="form-label">Message</label>
            <textarea
              className="input compose-textarea"
              placeholder={selected ? `Write a message to ${selected.name}…` : 'Select a recipient first…'}
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={!selected}
              style={{ flex: 1, resize: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.65, minHeight: 180 }}
            />
          </div>
        </div>

        <div className="drawer__footer">
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 2, justifyContent: 'center' }}
            disabled={!selected || !message.trim()}
            onClick={onClose}
          >
            <Send size={14} /> Send Message
          </button>
        </div>
      </div>
    </>
  );
}
