/**
 * Sidebar functionality for the Construction ERP application
 */

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const contentWrapper = document.getElementById('content-wrapper');
    const goToAttendanceBtn = document.getElementById('go-to-attendance');
    
    // Set sidebar to be visible by default
    sidebar.classList.remove('collapsed');
    
    // Toggle sidebar on hamburger click
    hamburgerBtn?.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('open');
        
        if (window.innerWidth <= 768) {
            // Mobile behavior - show/hide with overlay
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
            } else {
                document.body.style.overflow = ''; // Allow scrolling when sidebar is closed
            }
        } else {
            // Desktop behavior
            sidebar.classList.toggle('collapsed');
        }
    });
    
    // Close sidebar when clicking on overlay (mobile only)
    overlay?.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        hamburgerBtn.classList.remove('open');
        document.body.style.overflow = ''; // Allow scrolling
    });
    
    // Handle navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip processing for logout link
            if (this.getAttribute('onclick') === 'logout()') return;
            
            // Set active class
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('data-section');
            if (targetId) {
                // Hide all sections
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show target section
                document.getElementById(targetId).classList.add('active');
            }
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                hamburgerBtn.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Handle direct link to attendance from dashboard
    goToAttendanceBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Set active class on attendance nav link
        navLinks.forEach(item => item.classList.remove('active'));
        document.querySelector('.nav-link[data-section="attendance-section"]').classList.add('active');
        
        // Show attendance section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('attendance-section').classList.add('active');
    });
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobile view
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            // Desktop view - ensure overlay is hidden
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Make sure sidebar is always visible on desktop
            sidebar.classList.remove('collapsed');
        }
    });
    
    // Initialize the sidebar state for mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    } else {
        // On desktop, sidebar is always visible
        sidebar.classList.remove('collapsed');
    }
    
    // Function to convert English names to Hindi
    function translateToHindi(name) {
        // Common English names and their Hindi translations
        const nameMap = {
            'ram': 'राम',
            'ramram': 'राम राम',
            'shyam': 'श्याम',
            'mohan': 'मोहन',
            'sohan': 'सोहन',
            'suresh': 'सुरेश',
            'ramesh': 'रमेश',
            'rajesh': 'राजेश',
            'mahesh': 'महेश',
            'dinesh': 'दिनेश',
            'hitesh': 'हितेश',
            'mukesh': 'मुकेश',
            'kamal': 'कमल',
            'vimal': 'विमल',
            'sunil': 'सुनील',
            'anil': 'अनिल',
            'arun': 'अरुण',
            'varun': 'वरुण',
            'tarun': 'तरुण',
            'vijay': 'विजय',
            'sanjay': 'संजय',
            'ajay': 'अजय',
            'vinod': 'विनोद',
            'pramod': 'प्रमोद',
            'ravi': 'रवि',
            'kavi': 'कवि',
            'amit': 'अमित',
            'sumit': 'सुमित',
            'rohit': 'रोहित',
            'mohit': 'मोहित',
            'deepak': 'दीपक',
            'dilip': 'दिलीप',
            'kuldeep': 'कुलदीप',
            'mandeep': 'मनदीप',
            'manager': 'प्रबंधक',
            'foreman': 'फोरमैन',
            'incharge': 'इनचार्ज',
            'supervisor': 'सुपरवाइजर',
            'worker': 'मजदूर',
            'laborer': 'मजदूर',
            'mason': 'राजमिस्त्री',
            'carpenter': 'बढ़ई',
            'electrician': 'बिजली मिस्त्री',
            'plumber': 'प्लम्बर'
        };
        
        // Try to match the full name or parts of it
        const lowerName = name.toLowerCase();
        
        // First try exact match
        if (nameMap[lowerName]) {
            return nameMap[lowerName];
        }
        
        // Try to match parts of the name (for compound names)
        const nameParts = lowerName.split(' ');
        if (nameParts.length > 1) {
            const translatedParts = nameParts.map(part => nameMap[part] || part);
            return translatedParts.join(' ');
        }
        
        // If no match found, use the original name
        return name;
    }
    
    // Function to update foreman name in Hindi
    function updateForemanNameInHindi() {
        const foremanElement = document.getElementById('foreman-name');
        if (foremanElement && foremanElement.textContent) {
            const originalName = foremanElement.textContent;
            if (!originalName.match(/[\u0900-\u097F]/)) { // Only translate if not already Hindi
                foremanElement.textContent = translateToHindi(originalName);
            }
        }
    }
    
    // Set foreman name in Hindi on page load
    updateForemanNameInHindi();
    
    // Export the function to be used by other scripts
    window.updateForemanNameInHindi = updateForemanNameInHindi;
}); 