import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, Search, Bell, CheckCircle2, Clock, Send, CreditCard, X, Settings,
  User, Lock, Palette, Globe, ExternalLink,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useNotifications } from '../context/NotificationsContext';
import { sentReferrals, receivedReferrals, dentists } from '../data/sampleData';

const typeIcon = {
  accepted:  <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />,
  received:  <Send size={14} style={{ color: 'var(--accent)' }} />,
  pending:   <Clock size={14} style={{ color: 'var(--warning)' }} />,
  completed: <CheckCircle2 size={14} style={{ color: 'var(--text-muted)' }} />,
  billing:   <CreditCard size={14} style={{ color: 'var(--info)' }} />,
};

// Group notifications into Today vs Earlier
function groupNotifs(notifs) {
  const today = [];
  const earlier = [];
  notifs.forEach(n => {
    if (n.time.includes('h ago') || n.time === 'Just now') {
      today.push(n);
    } else {
      earlier.push(n);
    }
  });
  return { today, earlier };
}

export default function TopBar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const { notifs, markAllRead, dismiss } = useNotifications();
  const ref = useRef(null);
  const settingsRef = useRef(null);
  const searchRef = useRef(null);

  const unread = notifs.filter(n => !n.read).length;
  const { today, earlier } = groupNotifs(notifs);

  // Clear search on navigation
  useEffect(() => {
    setSearchQuery('');
    setSearchOpen(false);
  }, [location.pathname]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close search on Escape
  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      setSearchOpen(false);
      e.target.blur();
    }
  }, []);

  // Compute search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const matchedSent = sentReferrals.filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.patient.toLowerCase().includes(q) ||
      r.to.toLowerCase().includes(q) ||
      r.specialty.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    ).map(r => ({ ...r, direction: 'sent' }));

    const matchedReceived = receivedReferrals.filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.patient.toLowerCase().includes(q) ||
      r.from.toLowerCase().includes(q) ||
      r.specialty.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    ).map(r => ({ ...r, direction: 'received' }));

    const matchedDentists = dentists.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.practice.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q)
    );

    return {
      referrals: [...matchedSent, ...matchedReceived],
      dentists: matchedDentists,
      total: matchedSent.length + matchedReceived.length + matchedDentists.length,
    };
  }, [searchQuery]);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
    setSearchOpen(true);
  };

  const handleResultClick = (path) => {
    setSearchQuery('');
    setSearchOpen(false);
    navigate(path);
  };

  const settingsItems = [
    { icon: <User size={14} />,    label: 'Profile',       action: () => { setSettingsOpen(false); navigate('/settings?tab=profile'); } },
    { icon: <Bell size={14} />,    label: 'Notifications', action: () => { setSettingsOpen(false); navigate('/settings?tab=notifications'); } },
    { icon: <Lock size={14} />,    label: 'Security',      action: () => { setSettingsOpen(false); navigate('/settings?tab=security'); } },
    { icon: <Palette size={14} />, label: 'Appearance',    action: () => { setSettingsOpen(false); navigate('/settings?tab=appearance'); } },
    { icon: <Globe size={14} />,   label: 'Privacy',       action: () => { setSettingsOpen(false); navigate('/settings?tab=privacy'); } },
    { divider: true },
    { icon: <ExternalLink size={14} />, label: 'All Settings', action: () => { setSettingsOpen(false); navigate('/settings'); } },
  ];

  return (
    <header className="topbar">
      <button className="topbar__toggle" onClick={onToggleSidebar} title="Toggle sidebar">
        <Menu size={18} />
      </button>

      <div className="topbar__search" ref={searchRef}>
        <Search size={14} className="topbar__search-icon" />
        <input
          placeholder="Search referrals, patients…"
          value={searchQuery}
          onChange={handleSearchInput}
          onFocus={() => { if (searchQuery.trim()) setSearchOpen(true); }}
          onKeyDown={handleSearchKeyDown}
        />

        {searchOpen && searchResults && (
          <div className="search-results">
            {searchResults.total === 0 ? (
              <div className="search-results__empty">
                <Search size={18} style={{ marginBottom: 6, opacity: 0.4 }} />
                <div>No results found</div>
              </div>
            ) : (
              <>
                {searchResults.referrals.length > 0 && (
                  <>
                    <div className="search-results__section">Referrals</div>
                    {searchResults.referrals.map(r => (
                      <button
                        key={r.id + r.direction}
                        className="search-results__item"
                        onClick={() => handleResultClick(r.direction === 'sent' ? '/history' : '/received')}
                      >
                        <div className="search-results__item-main">
                          <span className="search-results__item-name">{r.patient}</span>
                          <span className={`search-results__item-badge ${r.status.toLowerCase()}`}>{r.status}</span>
                        </div>
                        <div className="search-results__item-meta">
                          {r.id} &middot; {r.direction === 'sent' ? `To ${r.to}` : `From ${r.from}`} &middot; {r.specialty}
                        </div>
                      </button>
                    ))}
                  </>
                )}
                {searchResults.dentists.length > 0 && (
                  <>
                    <div className="search-results__section">Dentists</div>
                    {searchResults.dentists.map(d => (
                      <button
                        key={d.id}
                        className="search-results__item"
                        onClick={() => handleResultClick(`/dentist/${d.id}`)}
                      >
                        <div className="search-results__item-main">
                          <span className="search-results__item-name">{d.name}</span>
                          <span className="search-results__item-specialty">{d.specialty}</span>
                        </div>
                        <div className="search-results__item-meta">
                          {d.practice} &middot; {d.city}
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="topbar__spacer" />

      <div className="topbar__actions">
        <ThemeToggle />

        {/* Settings dropdown */}
        <div className="notif-wrap" ref={settingsRef}>
          <button
            className={`topbar__icon-btn${settingsOpen ? ' active' : ''}`}
            title="Settings"
            onClick={() => setSettingsOpen(o => !o)}
          >
            <Settings size={16} />
          </button>

          {settingsOpen && (
            <div className="settings-dropdown">
              <div className="settings-dropdown__header">Settings</div>
              <div className="user-menu__divider" />
              {settingsItems.map((item, i) =>
                item.divider ? (
                  <div className="user-menu__divider" key={i} />
                ) : (
                  <button
                    key={item.label}
                    className="user-menu__item"
                    onClick={item.action}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Notification bell */}
        <div className="notif-wrap" ref={ref}>
          <button
            className={`topbar__icon-btn${open ? ' active' : ''}`}
            title="Notifications"
            onClick={() => setOpen(o => !o)}
          >
            <Bell size={16} />
            {unread > 0 && <span className="notif-badge">{unread}</span>}
          </button>

          {open && (
            <div className="notif-menu">
              <div className="notif-menu__header">
                <span className="notif-menu__title">Notifications</span>
                {unread > 0 && (
                  <button className="notif-menu__mark-read" onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className="notif-menu__divider" />

              {notifs.length === 0 ? (
                <div className="notif-menu__empty">
                  <Bell size={20} style={{ marginBottom: 6, opacity: 0.4 }} />
                  <div>No notifications</div>
                </div>
              ) : (
                <>
                  {today.length > 0 && (
                    <>
                      <div className="notif-group-label">Today</div>
                      {today.map(n => (
                        <NotifItem key={n.id} n={n} onDismiss={dismiss} />
                      ))}
                    </>
                  )}
                  {earlier.length > 0 && (
                    <>
                      <div className="notif-group-label">Earlier</div>
                      {earlier.map(n => (
                        <NotifItem key={n.id} n={n} onDismiss={dismiss} />
                      ))}
                    </>
                  )}
                </>
              )}

              <div className="notif-menu__divider" />
              <button
                className="notif-menu__view-all"
                onClick={() => { setOpen(false); navigate('/notifications'); }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <button
          className="topbar__signout"
          onClick={() => navigate('/login')}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

function NotifItem({ n, onDismiss }) {
  return (
    <div className={`notif-item${n.read ? '' : ' unread'}`}>
      <div className="notif-item__icon">{typeIcon[n.type]}</div>
      <div className="notif-item__body">
        <div className="notif-item__title">{n.title}</div>
        <div className="notif-item__desc">{n.body}</div>
        <div className="notif-item__time">{n.time}</div>
      </div>
      <button className="notif-item__dismiss" onClick={() => onDismiss(n.id)} title="Dismiss">
        <X size={12} />
      </button>
    </div>
  );
}
