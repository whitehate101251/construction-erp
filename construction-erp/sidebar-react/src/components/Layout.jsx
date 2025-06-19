import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarToggle = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  return (
    <div className="app-layout">
      <Sidebar onToggle={handleSidebarToggle} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 