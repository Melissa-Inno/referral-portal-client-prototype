import { useState } from 'react';
import { Bell, CheckCircle2, Clock, Send, CreditCard, X, Check } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';

const typeIcon = {
  accepted:  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />,
  received:  <Send size={16} style={{ color: 'var(--accent)' }} />,
  pending:   <Clock size={16} style={{ color: 'var(--warning)' }} />,
  completed: <CheckCircle2 size={16} style={{ color: 'var(--text-muted)' }} />,
  billing:   <CreditCard size={16} style={{ color: 'var(--info)' }} />,
};

function groupNotifs(notifs) {
  const today = [];
  const earlier = [];
  notifs.forEach(n => {
    if (n.time.includes('h ago') || n.time === 'Just now') today.push(n);
    else earlier.push(n);
  });
  return { today, earlier };
}

export default function NotificationsPage() {
  const { notifs, markRead, markAllRead, dismiss } = useNotifications();
  const [tab, setTab] = useState('all');

  const displayed = tab === 'unread' ? notifs.filter(n => !n.read) : notifs;
  const { today, earlier } = groupNotifs(displayed);
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <>
      <div className="page-header">
        <div className="page-title">Notifications</div>
        <div className="page-subtitle">Stay up to date with your referral activity.</div>
      </div>

      <div className="notif-page-toolbar">
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button
            className={`tab-btn${tab === 'all' ? ' active' : ''}`}
            onClick={() => setTab('all')}
          >
            All ({notifs.length})
          </button>
          <button
            className={`tab-btn${tab === 'unread' ? ' active' : ''}`}
            onClick={() => setTab('unread')}
          >
            Unread {unreadCount > 0 && <span className="notif-page-count">{unreadCount}</span>}
          </button>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={markAllRead}>
            <Check size={13} /> Mark all read
          </button>
        )}
      </div>

      {displayed.length === 0 ? (
        <div className="card">
          <div className="empty-state" style={{ padding: '48px 0' }}>
            <Bell size={36} style={{ opacity: 0.3 }} />
            <p>{tab === 'unread' ? 'No unread notifications.' : 'No notifications yet.'}</p>
          </div>
        </div>
      ) : (
        <div className="card notif-page-list">
          {today.length > 0 && (
            <>
              <div className="notif-page-group-label">Today</div>
              {today.map(n => (
                <NotifRow key={n.id} n={n} onMarkRead={markRead} onDismiss={dismiss} />
              ))}
            </>
          )}
          {earlier.length > 0 && (
            <>
              <div className="notif-page-group-label">Earlier</div>
              {earlier.map(n => (
                <NotifRow key={n.id} n={n} onMarkRead={markRead} onDismiss={dismiss} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}

function NotifRow({ n, onMarkRead, onDismiss }) {
  return (
    <div className={`notif-page-row${n.read ? '' : ' unread'}`}>
      <div className="notif-page-row__icon">{typeIcon[n.type]}</div>
      <div className="notif-page-row__body">
        <div className="notif-page-row__title">{n.title}</div>
        <div className="notif-page-row__desc">{n.body}</div>
        <div className="notif-page-row__time">{n.time}</div>
      </div>
      <div className="notif-page-row__actions">
        {!n.read && (
          <button
            className="icon-action"
            title="Mark as read"
            onClick={() => onMarkRead(n.id)}
          >
            <Check size={13} />
          </button>
        )}
        <button
          className="icon-action"
          title="Dismiss"
          onClick={() => onDismiss(n.id)}
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
