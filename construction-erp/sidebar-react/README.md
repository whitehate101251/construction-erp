# Construction ERP Sidebar

This is a responsive collapsible sidebar inspired by Stake.com, built with React, Framer Motion, and React Icons.

## Features

- Toggle between expanded and collapsed states
- Smooth animations using Framer Motion
- Mobile-responsive design
- Submenu support
- Clean, modern UI design
- Icon-based navigation with labels

## Technology Stack

- **React**: For component-based UI
- **Framer Motion**: For smooth animations
- **React Icons**: For the icon set
- **CSS**: For styling

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd construction-erp/sidebar-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

To use the sidebar in your project:

1. Import the Sidebar component:
```jsx
import Sidebar from './components/Sidebar';
```

2. Use the component in your layout:
```jsx
const YourComponent = () => {
  const handleSidebarToggle = (isCollapsed) => {
    // Logic to handle sidebar state
  };

  return (
    <div className="app-layout">
      <Sidebar onToggle={handleSidebarToggle} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        {/* Your content here */}
      </main>
    </div>
  );
};
```

## Customization

### Navigation Items

Edit the `navItems` array in the `Sidebar.jsx` file to customize the navigation items:

```jsx
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
  // Add more items as needed
];
```

### Styling

Modify the CSS in `sidebar.css` to change the colors, spacing, and other styles.

## Building for Production

To build the project for production:

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

## License

MIT 