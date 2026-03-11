import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Send, Clock, Inbox, Users, MessageSquare,
  UserSquare2, Settings, CreditCard,
  LogOut, ChevronUp, BarChart3,
} from 'lucide-react';
import logo from '../assets/logo.png';
import { currentUser } from '../data/sampleData';
import { useMessages } from '../context/MessagesContext';

const baseNav = [
  { to: '/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
  { to: '/submit',    icon: <Send size={16} />,             label: 'Submit Referral' },
  { to: '/history',   icon: <Clock size={16} />,            label: 'Referral History' },
  { to: '/received',  icon: <Inbox size={16} />,            label: 'Received Referrals' },
  { to: '/directory', icon: <Users size={16} />,            label: 'Directory' },
  { to: '/analytics', icon: <BarChart3 size={16} />,        label: 'Analytics' },
  { to: '/messages',  icon: <MessageSquare size={16} />,    label: 'Messages' },
];

export default function Sidebar({ collapsed, mobileOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsedMenuBottom, setCollapsedMenuBottom] = useState(0);
  const menuRef = useRef(null);
  const userAreaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalUnread: unreadMessages } = useMessages();

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleUserClick() {
    if (collapsed && !menuOpen) {
      const rect = userAreaRef.current?.getBoundingClientRect();
      if (rect) setCollapsedMenuBottom(window.innerHeight - rect.bottom);
    }
    setMenuOpen(o => !o);
  }

  const menuItems = [
    {
      icon: <UserSquare2 size={14} />,
      label: 'Open Public Profile',
      action: () => { setMenuOpen(false); navigate('/profile'); },
    },
    {
      icon: <Settings size={14} />,
      label: 'Settings',
      action: () => { setMenuOpen(false); navigate('/settings'); },
    },
    {
      icon: <CreditCard size={14} />,
      label: 'Account & Billing',
      action: () => { setMenuOpen(false); navigate('/account'); },
    },
    { divider: true },
    {
      icon: <LogOut size={14} />,
      label: 'Sign Out',
      danger: true,
      action: () => { setMenuOpen(false); navigate('/login'); },
    },
  ];

  return (
    <nav className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
      <div className="sidebar__logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="SmileRoute" className={`sidebar__logo-img${collapsed ? ' sidebar__logo-img--collapsed' : ''}`} />
        {!collapsed && <span className="sidebar__logo-text">SmileRoute</span>}
      </div>

      <div className="sidebar__nav">
        {!collapsed && <div className="sidebar__nav-label">Menu</div>}
        {baseNav.map(item => {
          // Keep Directory active for dentist sub-pages
          const isSubActive = item.to === '/directory' && location.pathname.startsWith('/dentist/');
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar__nav-item${isActive || isSubActive ? ' active' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {item.icon}
                {item.to === '/messages' && unreadMessages > 0 && collapsed && (
                  <span className="sidebar__notif-dot" />
                )}
              </span>
              {!collapsed && <span className="sidebar__nav-item-text">{item.label}</span>}
              {!collapsed && item.to === '/messages' && unreadMessages > 0 && (
                <span className="sidebar__notif-badge">{unreadMessages}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User area with popup */}
      <div className="sidebar__user-wrap" ref={menuRef}>
        {/* Popup menu */}
        {menuOpen && (
          <div
            className={`user-menu${collapsed ? ' user-menu--collapsed' : ''}`}
            style={collapsed ? { position: 'fixed', bottom: collapsedMenuBottom, left: 68, bottom: 4 } : undefined}
          >
            <div className="user-menu__header">
              <div className="user-menu__name">{currentUser.name}</div>
              <div className="user-menu__email">{currentUser.email}</div>
            </div>
            <div className="user-menu__divider" />
            {menuItems.map((item, i) =>
              item.divider ? (
                <div className="user-menu__divider" key={i} />
              ) : (
                <button
                  key={item.label}
                  className={`user-menu__item${item.danger ? ' danger' : ''}`}
                  onClick={item.action}
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </div>
        )}

        <div
          ref={userAreaRef}
          className={`sidebar__user${menuOpen ? ' open' : ''}`}
          onClick={handleUserClick}
          title={collapsed ? currentUser.name : undefined}
        >
          <div className="avatar">{currentUser.initials}</div>
          {!collapsed && (
            <>
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">{currentUser.name}</div>
                <div className="sidebar__user-role">{currentUser.specialty}</div>
              </div>
              <ChevronUp
                size={14}
                style={{
                  color: 'var(--text-muted)',
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms',
                  flexShrink: 0,
                }}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
