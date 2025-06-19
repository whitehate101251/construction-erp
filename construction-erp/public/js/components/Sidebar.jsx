import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, FaTimes, FaHome, FaUsers, FaHardHat, FaFileAlt, 
  FaChartLine, FaUserCog, FaCog, FaSignOutAlt, FaBuilding, 
  FaChevronRight, FaCalendarAlt, FaTools
} from 'react-icons/fa';

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Check window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle sidebar collapse state
  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
      if (onToggle) onToggle(!collapsed);
    }
  };

  // Toggle submenu
  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: <FaHome />, text: 'Dashboard', link: '#' },
    { 
      id: 'sites', 
      icon: <FaBuilding />, 
      text: 'Sites', 
      link: '#',
      hasSubmenu: true,
      submenu: [
        { id: 'allSites', text: 'All Sites', link: '#' },
        { id: 'addSite', text: 'Add New Site', link: '#' }
      ]
    },
    { id: 'foremen', icon: <FaUserCog />, text: 'Foremen', link: '#' },
    { id: 'incharge', icon: <FaHardHat />, text: 'Site Incharge', link: '#' },
    { id: 'workers', icon: <FaUsers />, text: 'Workers', link: '#' },
    { id: 'tools', icon: <FaTools />, text: 'Equipment', link: '#' },
    { id: 'calendar', icon: <FaCalendarAlt />, text: 'Calendar', link: '#' },
    { id: 'reports', icon: <FaChartLine />, text: 'Reports', link: '#' },
    { id: 'documents', icon: <FaFileAlt />, text: 'Documents', link: '#' },
    { id: 'settings', icon: <FaCog />, text: 'Settings', link: '#' }
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: { duration: 0.3 }
    },
    collapsed: {
      width: '70px',
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    visible: {
      opacity: 1,
      display: 'block',
      transition: { delay: 0.1, duration: 0.2 }
    },
    hidden: {
      opacity: 0,
      display: 'none',
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button className="mobile-menu-button" onClick={handleToggle}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} 
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        className={`sidebar ${isMobile ? (mobileOpen ? 'open' : '') : (collapsed ? 'sidebar-collapsed' : 'sidebar-expanded')}`}
        variants={!isMobile ? sidebarVariants : {}}
        initial={false}
        animate={collapsed ? 'collapsed' : 'expanded'}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <motion.div 
            className={`sidebar-logo ${collapsed ? 'collapsed' : ''}`}
            variants={!isMobile ? textVariants : {}}
            initial={false}
            animate={collapsed && !isMobile ? 'hidden' : 'visible'}
          >
            {collapsed && !isMobile ? 'ERP' : 'Construction ERP'}
          </motion.div>
          {!isMobile && (
            <button className="toggle-button" onClick={handleToggle}>
              {collapsed ? <FaBars /> : <FaTimes />}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="nav-items">
          {navItems.map(item => (
            <React.Fragment key={item.id}>
              <a 
                href={item.link}
                className={`nav-item ${activeItem === item.id ? 'active' : ''} ${openSubmenu === item.id ? 'open' : ''}`}
                onClick={(e) => {
                  if (item.hasSubmenu) {
                    e.preventDefault();
                    toggleSubmenu(item.id);
                  } else {
                    setActiveItem(item.id);
                  }
                }}
              >
                <div className="nav-icon">{item.icon}</div>
                <motion.span 
                  className="nav-text"
                  variants={!isMobile ? textVariants : {}}
                  initial={false}
                  animate={collapsed && !isMobile ? 'hidden' : 'visible'}
                >
                  {item.text}
                </motion.span>
                {item.hasSubmenu && !collapsed && (
                  <motion.div 
                    className="arrow"
                    variants={!isMobile ? textVariants : {}}
                    initial={false}
                    animate={collapsed && !isMobile ? 'hidden' : 'visible'}
                  >
                    <FaChevronRight />
                  </motion.div>
                )}
              </a>

              {/* Submenu */}
              {item.hasSubmenu && (
                <AnimatePresence>
                  {(openSubmenu === item.id && !collapsed) && (
                    <motion.div
                      className={`submenu ${openSubmenu === item.id ? 'open' : ''}`}
                      initial={{ maxHeight: 0 }}
                      animate={{ maxHeight: 500 }}
                      exit={{ maxHeight: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.submenu.map(subItem => (
                        <a 
                          key={subItem.id}
                          href={subItem.link}
                          className={`submenu-item ${activeItem === subItem.id ? 'active' : ''}`}
                          onClick={() => setActiveItem(subItem.id)}
                        >
                          {subItem.text}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="nav-icon">
            <FaSignOutAlt />
          </div>
          <motion.div 
            className="sidebar-footer-text"
            variants={!isMobile ? textVariants : {}}
            initial={false}
            animate={collapsed && !isMobile ? 'hidden' : 'visible'}
          >
            Logout
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar; 