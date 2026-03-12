import { Link, useNavigate } from 'react-router-dom';
import {
  Send, Inbox, Clock, Users, ChevronRight,
  FileText, BookOpen, CheckCircle2, BarChart3,
  TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import Badge from '../components/Badge';
import { stats, sentReferrals, currentUser } from '../data/sampleData';

export default function DashboardPage() {
  const navigate = useNavigate();

  const statCards = [
    {
      label: 'Sent This Month',
      value: stats.sentThisMonth,
      icon: <Send size={16} />,
      trend: { dir: 'up', value: '+2 vs last month' },
    },
    {
      label: 'Received This Month',
      value: stats.receivedThisMonth,
      icon: <Inbox size={16} />,
      trend: { dir: 'neutral', value: 'Same as last month' },
    },
    {
      label: 'Pending Review',
      value: stats.pendingReview,
      icon: <Clock size={16} />,
      trend: { dir: 'down', value: '-1 vs last month' },
    },
    {
      label: 'Network Dentists',
      value: stats.networkDentists,
      icon: <Users size={16} />,
      trend: { dir: 'up', value: '+6 new this month' },
    },
  ];

  const quickActions = [
    { to: '/submit',    icon: <Send size={16} />,     title: 'Submit New Referral',   desc: 'Upload patient file and select a dentist' },
    { to: '/history',   icon: <Clock size={16} />,    title: 'View Referral History', desc: 'Track all sent and received referrals' },
    { to: '/directory', icon: <BookOpen size={16} />, title: 'Browse Directory',      desc: 'Find specialists in your network' },
    { to: '/analytics', icon: <BarChart3 size={16} />, title: 'View Analytics',      desc: 'Track performance and referral trends' },
  ];

  const recentReferrals = sentReferrals.slice(0, 4);

  return (
    <>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-subtitle">Good morning, {currentUser.name.split(' ')[1]} — here's what's happening.</div>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        {statCards.map(s => (
          <div className="card stat-card" key={s.label}>
            <div className="stat-card__icon">{s.icon}</div>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
            <div className={`stat-card__trend ${s.trend.dir}`}>
              {s.trend.dir === 'up' && <TrendingUp size={11} />}
              {s.trend.dir === 'down' && <TrendingDown size={11} />}
              {s.trend.dir === 'neutral' && <Minus size={11} />}
              {s.trend.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions + recent */}
      <div className="dashboard-grid">
        {/* Quick actions */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">Quick Actions</span>
          </div>
          <div className="card-body-0">
            {quickActions.map(a => (
              <Link to={a.to} className="quick-action-row" key={a.to}>
                <div className="quick-action-row__icon">{a.icon}</div>
                <div className="quick-action-row__text">
                  <div className="quick-action-row__title">{a.title}</div>
                  <div className="quick-action-row__desc">{a.desc}</div>
                </div>
                <ChevronRight size={14} className="quick-action-row__chevron" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent referrals */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">Recent Referrals</span>
            <Link to="/history" className="card-header__action">View all</Link>
          </div>
          <div className="card-body-0">
            {recentReferrals.map(r => (
              <Link
                to="/history"
                className="recent-ref-row"
                key={r.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="recent-ref-row__left">
                  <div className="recent-ref-row__patient">{r.patient}</div>
                  <div className="recent-ref-row__to">→ {r.to}</div>
                </div>
                <div className="recent-ref-row__right">
                  <Badge status={r.status} />
                  <div className="recent-ref-row__date">{r.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Membership banner */}
      <div className="membership-banner">
        <CheckCircle2 size={22} className="membership-banner__icon" />
        <div className="membership-banner__text">
          <div className="membership-banner__title">Membership Active</div>
          <div className="membership-banner__sub">Renews {currentUser.renewalDate}</div>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/account')}
        >
          Manage Billing
        </button>
      </div>
    </>
  );
}
