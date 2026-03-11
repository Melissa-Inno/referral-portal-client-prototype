import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

export default function AuthenticatedLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handler() {
      if (window.innerWidth > 768) setMobileOpen(false);
    }
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  function toggle() {
    if (window.innerWidth <= 768) {
      setMobileOpen(o => !o);
    } else {
      setCollapsed(c => !c);
    }
  }

  return (
    <div className="auth-layout">
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} />
      <div
        className={`auth-layout__overlay${mobileOpen ? ' visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className="auth-layout__content">
        <TopBar onToggleSidebar={toggle} />
        <main className="auth-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
