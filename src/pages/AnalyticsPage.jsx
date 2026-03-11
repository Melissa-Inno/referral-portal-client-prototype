import { useState, useMemo } from 'react';
import {
  TrendingUp, TrendingDown, Minus,
  Send, Inbox, CheckCircle2, UserCheck,
  ArrowUpRight, ArrowDownRight,
  Users, BarChart3, PieChart, Activity, Clock,
} from 'lucide-react';
import ExportButton from '../components/ExportButton';

/* ── All data keyed by period ── */
const allData = {
  '30days': {
    monthly: [
      { month: 'Week 1', sent: 2, received: 1 },
      { month: 'Week 2', sent: 3, received: 1 },
      { month: 'Week 3', sent: 1, received: 0 },
      { month: 'Week 4', sent: 1, received: 1 },
    ],
    specialty: [
      { name: 'Orthodontics', count: 3, color: 'var(--accent)' },
      { name: 'Oral Surgery', count: 2, color: 'var(--success)' },
      { name: 'Periodontics', count: 1, color: 'var(--warning)' },
      { name: 'Endodontics', count: 1, color: 'var(--info)' },
    ],
    topDentists: [
      { name: 'Dr. James Park', specialty: 'Orthodontics', initials: 'JP', referrals: 3, trend: 'up' },
      { name: 'Dr. Marcus Rivera', specialty: 'Oral Surgery', initials: 'MR', referrals: 2, trend: 'up' },
      { name: 'Dr. Lisa Chen', specialty: 'Periodontics', initials: 'LC', referrals: 1, trend: 'neutral' },
      { name: 'Dr. Anita Gupta', specialty: 'Endodontics', initials: 'AG', referrals: 1, trend: 'neutral' },
    ],
    status: [
      { label: 'Completed', count: 3, color: 'var(--info)' },
      { label: 'Accepted', count: 2, color: 'var(--success)' },
      { label: 'Pending', count: 2, color: 'var(--warning)' },
      { label: 'Declined', count: 0, color: 'var(--danger)' },
    ],
    weekly: [
      { day: 'Mon', value: 2 },
      { day: 'Tue', value: 1 },
      { day: 'Wed', value: 0 },
      { day: 'Thu', value: 3 },
      { day: 'Fri', value: 1 },
      { day: 'Sat', value: 0 },
      { day: 'Sun', value: 0 },
    ],
    responseTime: [
      { label: '< 1 hour', pct: 40 },
      { label: '1-4 hours', pct: 30 },
      { label: '4-24 hours', pct: 20 },
      { label: '1-3 days', pct: 10 },
      { label: '3+ days', pct: 0 },
    ],
    kpi: {
      sent: 7, sentTrend: { dir: 'up', value: '+2 vs prior' },
      received: 3, receivedTrend: { dir: 'neutral', value: 'Same as prior' },
      completionRate: '86%', completionTrend: { dir: 'down', value: '-4%' },
      activePartners: 4, partnersTrend: { dir: 'neutral', value: 'No change' },
    },
  },
  '3months': {
    monthly: [
      { month: 'Jan', sent: 6, received: 2 },
      { month: 'Feb', sent: 5, received: 3 },
      { month: 'Mar', sent: 7, received: 3 },
    ],
    specialty: [
      { name: 'Orthodontics', count: 6, color: 'var(--accent)' },
      { name: 'Oral Surgery', count: 4, color: 'var(--success)' },
      { name: 'Periodontics', count: 3, color: 'var(--warning)' },
      { name: 'Endodontics', count: 3, color: 'var(--info)' },
      { name: 'Pediatric', count: 2, color: 'var(--danger)' },
    ],
    topDentists: [
      { name: 'Dr. Marcus Rivera', specialty: 'Oral Surgery', initials: 'MR', referrals: 5, trend: 'up' },
      { name: 'Dr. James Park', specialty: 'Orthodontics', initials: 'JP', referrals: 4, trend: 'up' },
      { name: 'Dr. Robert Kim', specialty: 'Pediatric Dentistry', initials: 'RK', referrals: 3, trend: 'neutral' },
      { name: 'Dr. Lisa Chen', specialty: 'Periodontics', initials: 'LC', referrals: 3, trend: 'up' },
      { name: 'Dr. Anita Gupta', specialty: 'Endodontics', initials: 'AG', referrals: 3, trend: 'up' },
    ],
    status: [
      { label: 'Completed', count: 8, color: 'var(--info)' },
      { label: 'Accepted', count: 6, color: 'var(--success)' },
      { label: 'Pending', count: 4, color: 'var(--warning)' },
      { label: 'Declined', count: 0, color: 'var(--danger)' },
    ],
    weekly: [
      { day: 'Mon', value: 3 },
      { day: 'Tue', value: 4 },
      { day: 'Wed', value: 2 },
      { day: 'Thu', value: 6 },
      { day: 'Fri', value: 3 },
      { day: 'Sat', value: 1 },
      { day: 'Sun', value: 0 },
    ],
    responseTime: [
      { label: '< 1 hour', pct: 38 },
      { label: '1-4 hours', pct: 28 },
      { label: '4-24 hours', pct: 20 },
      { label: '1-3 days', pct: 10 },
      { label: '3+ days', pct: 4 },
    ],
    kpi: {
      sent: 18, sentTrend: { dir: 'up', value: '+15%' },
      received: 8, receivedTrend: { dir: 'up', value: '+10%' },
      completionRate: '89%', completionTrend: { dir: 'up', value: '+2%' },
      activePartners: 5, partnersTrend: { dir: 'up', value: '+1 new' },
    },
  },
  '6months': {
    monthly: [
      { month: 'Oct', sent: 3, received: 1 },
      { month: 'Nov', sent: 5, received: 2 },
      { month: 'Dec', sent: 4, received: 3 },
      { month: 'Jan', sent: 6, received: 2 },
      { month: 'Feb', sent: 5, received: 3 },
      { month: 'Mar', sent: 7, received: 3 },
    ],
    specialty: [
      { name: 'Orthodontics', count: 8, color: 'var(--accent)' },
      { name: 'Oral Surgery', count: 6, color: 'var(--success)' },
      { name: 'Periodontics', count: 5, color: 'var(--warning)' },
      { name: 'Endodontics', count: 4, color: 'var(--info)' },
      { name: 'Pediatric', count: 3, color: 'var(--danger)' },
      { name: 'Prosthodontics', count: 2, color: '#8B5CF6' },
    ],
    topDentists: [
      { name: 'Dr. Marcus Rivera', specialty: 'Oral Surgery', initials: 'MR', referrals: 8, trend: 'up' },
      { name: 'Dr. James Park', specialty: 'Orthodontics', initials: 'JP', referrals: 6, trend: 'up' },
      { name: 'Dr. Robert Kim', specialty: 'Pediatric Dentistry', initials: 'RK', referrals: 5, trend: 'neutral' },
      { name: 'Dr. Lisa Chen', specialty: 'Periodontics', initials: 'LC', referrals: 4, trend: 'down' },
      { name: 'Dr. Anita Gupta', specialty: 'Endodontics', initials: 'AG', referrals: 3, trend: 'up' },
    ],
    status: [
      { label: 'Completed', count: 12, color: 'var(--info)' },
      { label: 'Accepted', count: 8, color: 'var(--success)' },
      { label: 'Pending', count: 5, color: 'var(--warning)' },
      { label: 'Declined', count: 1, color: 'var(--danger)' },
    ],
    weekly: [
      { day: 'Mon', value: 3 },
      { day: 'Tue', value: 5 },
      { day: 'Wed', value: 2 },
      { day: 'Thu', value: 7 },
      { day: 'Fri', value: 4 },
      { day: 'Sat', value: 1 },
      { day: 'Sun', value: 0 },
    ],
    responseTime: [
      { label: '< 1 hour', pct: 35 },
      { label: '1-4 hours', pct: 28 },
      { label: '4-24 hours', pct: 22 },
      { label: '1-3 days', pct: 10 },
      { label: '3+ days', pct: 5 },
    ],
    kpi: {
      sent: 30, sentTrend: { dir: 'up', value: '+12%' },
      received: 14, receivedTrend: { dir: 'up', value: '+8%' },
      completionRate: '92%', completionTrend: { dir: 'up', value: '+3%' },
      activePartners: 6, partnersTrend: { dir: 'up', value: '+2 new' },
    },
  },
  '1year': {
    monthly: [
      { month: 'Apr', sent: 2, received: 1 },
      { month: 'May', sent: 3, received: 1 },
      { month: 'Jun', sent: 4, received: 2 },
      { month: 'Jul', sent: 3, received: 1 },
      { month: 'Aug', sent: 2, received: 2 },
      { month: 'Sep', sent: 4, received: 1 },
      { month: 'Oct', sent: 3, received: 1 },
      { month: 'Nov', sent: 5, received: 2 },
      { month: 'Dec', sent: 4, received: 3 },
      { month: 'Jan', sent: 6, received: 2 },
      { month: 'Feb', sent: 5, received: 3 },
      { month: 'Mar', sent: 7, received: 3 },
    ],
    specialty: [
      { name: 'Orthodontics', count: 14, color: 'var(--accent)' },
      { name: 'Oral Surgery', count: 11, color: 'var(--success)' },
      { name: 'Periodontics', count: 9, color: 'var(--warning)' },
      { name: 'Endodontics', count: 7, color: 'var(--info)' },
      { name: 'Pediatric', count: 5, color: 'var(--danger)' },
      { name: 'Prosthodontics', count: 4, color: '#8B5CF6' },
    ],
    topDentists: [
      { name: 'Dr. Marcus Rivera', specialty: 'Oral Surgery', initials: 'MR', referrals: 14, trend: 'up' },
      { name: 'Dr. James Park', specialty: 'Orthodontics', initials: 'JP', referrals: 12, trend: 'up' },
      { name: 'Dr. Robert Kim', specialty: 'Pediatric Dentistry', initials: 'RK', referrals: 9, trend: 'up' },
      { name: 'Dr. Lisa Chen', specialty: 'Periodontics', initials: 'LC', referrals: 8, trend: 'neutral' },
      { name: 'Dr. Anita Gupta', specialty: 'Endodontics', initials: 'AG', referrals: 5, trend: 'up' },
    ],
    status: [
      { label: 'Completed', count: 28, color: 'var(--info)' },
      { label: 'Accepted', count: 14, color: 'var(--success)' },
      { label: 'Pending', count: 5, color: 'var(--warning)' },
      { label: 'Declined', count: 3, color: 'var(--danger)' },
    ],
    weekly: [
      { day: 'Mon', value: 5 },
      { day: 'Tue', value: 7 },
      { day: 'Wed', value: 4 },
      { day: 'Thu', value: 9 },
      { day: 'Fri', value: 6 },
      { day: 'Sat', value: 2 },
      { day: 'Sun', value: 1 },
    ],
    responseTime: [
      { label: '< 1 hour', pct: 32 },
      { label: '1-4 hours', pct: 26 },
      { label: '4-24 hours', pct: 24 },
      { label: '1-3 days', pct: 12 },
      { label: '3+ days', pct: 6 },
    ],
    kpi: {
      sent: 48, sentTrend: { dir: 'up', value: '+22%' },
      received: 22, receivedTrend: { dir: 'up', value: '+18%' },
      completionRate: '90%', completionTrend: { dir: 'up', value: '+5%' },
      activePartners: 6, partnersTrend: { dir: 'up', value: '+3 new' },
    },
  },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6months');

  const data = allData[period];
  const { monthly, specialty, topDentists, status, weekly, responseTime, kpi } = data;

  const totalSpecialty = useMemo(() => specialty.reduce((s, x) => s + x.count, 0), [specialty]);
  const maxMonthly = useMemo(() => Math.max(...monthly.map(m => Math.max(m.sent, m.received))), [monthly]);
  const maxWeekly = useMemo(() => Math.max(...weekly.map(d => d.value)), [weekly]);
  const totalStatus = useMemo(() => status.reduce((s, x) => s + x.count, 0), [status]);

  const kpiCards = [
    {
      label: 'Total Sent',
      value: kpi.sent,
      icon: <Send size={16} />,
      trend: kpi.sentTrend,
      color: 'var(--accent)',
      bg: 'var(--accent-light)',
    },
    {
      label: 'Total Received',
      value: kpi.received,
      icon: <Inbox size={16} />,
      trend: kpi.receivedTrend,
      color: 'var(--success)',
      bg: 'var(--success-bg)',
    },
    {
      label: 'Completion Rate',
      value: kpi.completionRate,
      icon: <CheckCircle2 size={16} />,
      trend: kpi.completionTrend,
      color: 'var(--info)',
      bg: 'var(--info-bg)',
    },
    {
      label: 'Active Partners',
      value: kpi.activePartners,
      icon: <UserCheck size={16} />,
      trend: kpi.partnersTrend,
      color: 'var(--warning)',
      bg: 'var(--warning-bg)',
    },
  ];

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="page-title">Analytics</div>
          <div className="page-subtitle">Track your referral performance and network activity.</div>
        </div>
        <div className="styled-select-wrap" style={{ marginTop: 4 }}>
          <select
            className="input"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            style={{ paddingRight: 28, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
          >
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="6months">Last 6 months</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-stats">
        {kpiCards.map(k => (
          <div className="card stat-card" key={k.label}>
            <div className="stat-card__icon" style={{ background: k.bg, color: k.color }}>
              {k.icon}
            </div>
            <div className="stat-card__value">{k.value}</div>
            <div className="stat-card__label">{k.label}</div>
            <div className={`stat-card__trend ${k.trend.dir}`}>
              {k.trend.dir === 'up' && <TrendingUp size={11} />}
              {k.trend.dir === 'down' && <TrendingDown size={11} />}
              {k.trend.dir === 'neutral' && <Minus size={11} />}
              {k.trend.value}
            </div>
          </div>
        ))}
      </div>

      {/* Row: Bar Chart + Specialty Breakdown */}
      <div className="analytics-grid">
        {/* Monthly Referrals Bar Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">
              <BarChart3 size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              {period === '30days' ? 'Weekly Referrals' : 'Monthly Referrals'}
            </span>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)' }}>
                <span className="analytics-legend-dot" style={{ background: 'var(--accent)' }} /> Sent
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)' }}>
                <span className="analytics-legend-dot" style={{ background: 'var(--success)' }} /> Received
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="analytics-bar-chart">
              {monthly.map(m => (
                <div className="analytics-bar-group" key={m.month}>
                  <div className="analytics-bar-col">
                    <span className="analytics-bar-value">{m.sent}</span>
                    <div
                      className="analytics-bar analytics-bar--sent"
                      style={{ height: `${(m.sent / maxMonthly) * 120}px` }}
                    />
                  </div>
                  <div className="analytics-bar-col">
                    <span className="analytics-bar-value">{m.received}</span>
                    <div
                      className="analytics-bar analytics-bar--received"
                      style={{ height: `${(m.received / maxMonthly) * 120}px` }}
                    />
                  </div>
                  <div className="analytics-bar-label">{m.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialty Donut */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">
              <PieChart size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Referrals by Specialty
            </span>
          </div>
          <div className="card-body">
            <div className="analytics-donut-wrap">
              <DonutChart data={specialty} total={totalSpecialty} />
              <div className="analytics-donut-legend">
                {specialty.map(s => (
                  <div className="analytics-legend-row" key={s.name}>
                    <span className="analytics-legend-dot" style={{ background: s.color }} />
                    <span className="analytics-legend-name">{s.name}</span>
                    <span className="analytics-legend-count">{s.count}</span>
                    <span className="analytics-legend-pct">
                      {Math.round((s.count / totalSpecialty) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row: Top Referral Partners + Status Breakdown */}
      <div className="analytics-grid" style={{ marginTop: 20 }}>
        {/* Top Referral Partners */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">
              <Users size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Top Referral Partners
            </span>
          </div>
          <div className="card-body-0">
            {topDentists.map((d, i) => (
              <div className="analytics-partner-row" key={d.name}>
                <span className="analytics-partner-rank">#{i + 1}</span>
                <div className="avatar" style={{ width: 30, height: 30, fontSize: 10 }}>{d.initials}</div>
                <div className="analytics-partner-info">
                  <div className="analytics-partner-name">{d.name}</div>
                  <div className="analytics-partner-spec">{d.specialty}</div>
                </div>
                <div className="analytics-partner-stats">
                  <span className="analytics-partner-count">{d.referrals}</span>
                  <span className={`analytics-partner-trend ${d.trend}`}>
                    {d.trend === 'up' && <ArrowUpRight size={12} />}
                    {d.trend === 'down' && <ArrowDownRight size={12} />}
                    {d.trend === 'neutral' && <Minus size={12} />}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">
              <Activity size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Status Breakdown
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              {totalStatus} total
            </span>
          </div>
          <div className="card-body">
            {/* Stacked bar */}
            <div className="analytics-stacked-bar">
              {status.map(s => (
                <div
                  key={s.label}
                  className="analytics-stacked-segment"
                  style={{
                    width: `${(s.count / totalStatus) * 100}%`,
                    background: s.color,
                  }}
                  title={`${s.label}: ${s.count}`}
                />
              ))}
            </div>
            <div className="analytics-status-grid">
              {status.map(s => (
                <div className="analytics-status-item" key={s.label}>
                  <div className="analytics-status-dot" style={{ background: s.color }} />
                  <div>
                    <div className="analytics-status-count">{s.count}</div>
                    <div className="analytics-status-label">{s.label}</div>
                  </div>
                  <div className="analytics-status-pct">
                    {Math.round((s.count / totalStatus) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row: Weekly Activity + Response Times */}
      <div className="analytics-grid" style={{ marginTop: 20 }}>
        {/* Weekly Activity Heatmap-style bar */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">
              <BarChart3 size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Weekly Activity
            </span>
          </div>
          <div className="card-body">
            <div className="analytics-weekly">
              {weekly.map(d => (
                <div className="analytics-weekly-col" key={d.day}>
                  <span className="analytics-bar-value">{d.value}</span>
                  <div className="analytics-weekly-bar-wrap">
                    <div
                      className="analytics-weekly-bar"
                      style={{
                        height: maxWeekly > 0 ? `${(d.value / maxWeekly) * 100}%` : '0%',
                        opacity: d.value === 0 ? 0.2 : 0.4 + (d.value / maxWeekly) * 0.6,
                      }}
                    />
                  </div>
                  <span className="analytics-weekly-label">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Time Distribution */}
        <div className="card">
          <div className="card-header">
            <span className="card-header__title">
              <Clock size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Response Time Distribution
            </span>
          </div>
          <div className="card-body">
            <div className="analytics-response-list">
              {responseTime.map(r => (
                <div className="analytics-response-row" key={r.label}>
                  <span className="analytics-response-label">{r.label}</span>
                  <div className="analytics-response-bar-wrap">
                    <div
                      className="analytics-response-bar"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="analytics-response-pct">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── SVG Donut Chart Component ── */
function DonutChart({ data, total }) {
  const size = 130;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="analytics-donut">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map(item => {
          const pct = item.count / total;
          const dashLength = pct * circumference;
          const dashOffset = -accumulated * circumference;
          accumulated += pct;
          return (
            <circle
              key={item.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          );
        })}
      </svg>
      <div className="analytics-donut-center">
        <div className="analytics-donut-total">{total}</div>
        <div className="analytics-donut-label">Total</div>
      </div>
    </div>
  );
}
