import React from 'react';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <div className="container py-4">
        <h1 className="mb-4">Construction ERP Dashboard</h1>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Active Projects</h5>
                <h1 className="display-4 fw-bold text-primary">12</h1>
                <p className="card-text">You have 12 active construction projects.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Foremen</h5>
                <h1 className="display-4 fw-bold text-success">8</h1>
                <p className="card-text">8 foremen are currently assigned to projects.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Workers</h5>
                <h1 className="display-4 fw-bold text-info">45</h1>
                <p className="card-text">45 workers are currently active on various sites.</p>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <h2 className="mb-3">Responsive Sidebar</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">About This Sidebar</h5>
            <p className="card-text">
              This is a responsive collapsible sidebar inspired by Stake.com, implemented with:
            </p>
            <ul>
              <li><strong>React</strong> for the component structure</li>
              <li><strong>Framer Motion</strong> for smooth animations</li>
              <li><strong>React Icons</strong> for the icon set</li>
              <li>Responsive design that works on all screen sizes</li>
            </ul>
            <p className="card-text">
              Features:
            </p>
            <ul>
              <li>Collapsible sidebar that toggles between full and icon-only views</li>
              <li>Mobile responsive design with slide-in menu and overlay</li>
              <li>Submenu support for hierarchical navigation</li>
              <li>Smooth animations for all transitions</li>
              <li>Active state tracking for menu items</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App; 