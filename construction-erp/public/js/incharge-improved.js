// Enhanced Site Incharge Dashboard JavaScript
// Real API integration with improved UI/UX

// Configuration
const API_BASE_URL = window.location.origin + '/api';
let currentUser = null;
let currentLanguage = 'hi';
let selectedSubmissions = new Set();

// DOM Elements - will be initialized after DOM loads
let sidebar, hamburgerBtn, overlay, inchargeName;

// Stats elements - will be initialized after DOM loads
let totalSites, totalForemen, pendingApprovals, verifiedToday;

// Translations
const translations = {
    hi: {
        home: 'होम',
        approveHajiri: 'हाज़िरी स्वीकृत करें',
        submittedHajiri: 'जमा की गई हाज़िरी',
        profile: 'प्रोफ़ाइल',
        logout: 'लॉग आउट',
        totalSites: 'कुल साइट्स',
        totalForemen: 'कुल फोरमैन',
        pendingHajiri: 'लंबित हाज़िरी',
        verifiedToday: 'आज सत्यापित',
        loading: 'लोड हो रहा है...',
        error: 'त्रुटि',
        success: 'सफल',
        noData: 'कोई डेटा नहीं मिला',
        selectDate: 'दिनांक चुनें',
        approve: 'स्वीकृत करें',
        reject: 'अस्वीकार करें',
        view: 'देखें'
    },
    en: {
        home: 'Home',
        approveHajiri: 'Approve Hajiri',
        submittedHajiri: 'Submitted Hajiri',
        profile: 'Profile',
        logout: 'Logout',
        totalSites: 'Total Sites',
        totalForemen: 'Total Foremen',
        pendingHajiri: 'Pending Hajiri',
        verifiedToday: 'Verified Today',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        noData: 'No data found',
        selectDate: 'Select Date',
        approve: 'Approve',
        reject: 'Reject',
        view: 'View'
    }
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function () {
    console.log("Enhanced Incharge dashboard initializing...");

    // Initialize DOM elements
    sidebar = document.getElementById('sidebar');
    hamburgerBtn = document.getElementById('hamburgerBtn');
    overlay = document.getElementById('overlay');
    inchargeName = document.getElementById('incharge-name');
    
    // Initialize stats elements
    totalSites = document.getElementById('total-sites');
    totalForemen = document.getElementById('total-foremen');
    pendingApprovals = document.getElementById('pending-approvals');
    verifiedToday = document.getElementById('verified-today');

    console.log('DOM elements initialized:');
    console.log('Hamburger button:', hamburgerBtn);
    console.log('Sidebar:', sidebar);
    console.log('Overlay:', overlay);

    // Force show hamburger button
    if (hamburgerBtn) {
        hamburgerBtn.style.display = 'block';
        hamburgerBtn.style.position = 'fixed';
        hamburgerBtn.style.top = '20px';
        hamburgerBtn.style.left = '20px';
        hamburgerBtn.style.zIndex = '9999';
        console.log('Hamburger button forced to show');
    } else {
        console.error('Hamburger button not found!');
    }

    // Setup mobile menu
    setupMobileMenu();

    // Setup navigation
    setupNavigation();

    // Check authentication
    checkAuth();

    // Initialize dashboard
    initializeDashboard();

    // Set default dates
    setDefaultDates();
});

// Setup mobile menu
function setupMobileMenu() {
    console.log('Setting up mobile menu...');
    console.log('Hamburger button:', hamburgerBtn);
    console.log('Sidebar:', sidebar);
    console.log('Overlay:', overlay);
    
    if (hamburgerBtn && sidebar && overlay) {
        hamburgerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        overlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (sidebar && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                }
            }
        });
    } else {
        console.error('Missing elements for mobile menu setup');
    }
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            switchToSection(targetSection);
            
            // Update active states
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            if (sidebar && overlay && hamburgerBtn) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }
        });
    });
}

// Switch to section
function switchToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.classList.add('active');
        
        // Load section-specific data
        switch(sectionId) {
            case 'overview-section':
                loadDashboardData();
                break;
            case 'approve-hajiri-section':
                loadSiteFilters();
                break;
            case 'submitted-hajiri-section':
                loadSubmittedHajiri();
                break;
        }
    }
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        console.log("No authentication found, redirecting to login");
        window.location.href = '/login.html';
        return;
    }
    
    try {
        currentUser = JSON.parse(userStr);
        if (currentUser.role !== 'site_incharge') {
            console.log("User is not a site incharge");
            alert('Access denied. You must be a site incharge to access this page.');
            window.location.href = '/login.html';
            return;
        }
        
        // Display user name
        if (inchargeName) {
            inchargeName.textContent = currentUser.name || 'साइट इंचार्ज';
        }
        
    } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/login.html';
    }
}

// Get auth headers
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

// Initialize dashboard
async function initializeDashboard() {
    showLoading();
    try {
        await loadDashboardData();
        await loadSitesOverview();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Failed to load dashboard data');
    } finally {
        hideLoading();
    }
}

// Load dashboard statistics
async function loadDashboardData() {
    try {
        // Load sites assigned to this incharge
        const sitesResponse = await fetch(`${API_BASE_URL}/sites`, {
            headers: getAuthHeaders()
        });
        
        if (sitesResponse.ok) {
            const sitesData = await sitesResponse.json();
            const sites = sitesData.data.sites || [];
            
            // Update stats
            if (totalSites) totalSites.textContent = sites.length;
            
            // Count total foremen across all sites
            let foremenCount = 0;
            sites.forEach(site => {
                if (site.siteManager) foremenCount++;
                if (site.additionalForemen) foremenCount += site.additionalForemen.length;
            });
            if (totalForemen) totalForemen.textContent = foremenCount;
            
            // Get pending approvals count
            let totalPending = 0;
            for (const site of sites) {
                try {
                    const pendingResponse = await fetch(`${API_BASE_URL}/attendance/pending-verification?site=${site._id}`, {
                        headers: getAuthHeaders()
                    });
                    if (pendingResponse.ok) {
                        const pendingData = await pendingResponse.json();
                        totalPending += pendingData.count || 0;
                    }
                } catch (error) {
                    console.error('Error fetching pending count for site:', site._id, error);
                }
            }
            if (pendingApprovals) pendingApprovals.textContent = totalPending;
            
            // Get today's verified count
            const today = new Date().toISOString().split('T')[0];
            const verifiedResponse = await fetch(`${API_BASE_URL}/attendance?verified=true&date=${today}`, {
                headers: getAuthHeaders()
            });
            
            if (verifiedResponse.ok) {
                const verifiedData = await verifiedResponse.json();
                const verifiedCount = verifiedData.data?.attendance?.length || 0;
                if (verifiedToday) verifiedToday.textContent = verifiedCount;
            }
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard statistics');
    }
}

// Load sites overview
async function loadSitesOverview() {
    const container = document.getElementById('sites-overview-container');
    if (!container) return;
    
    const selectedDate = document.getElementById('overview-date')?.value || new Date().toISOString().split('T')[0];
    
    try {
        container.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 mb-0">Loading sites overview...</p>
            </div>
        `;
        
        const response = await fetch(`${API_BASE_URL}/sites/with-attendance?date=${selectedDate}`, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to load sites with attendance');
        }
        
        const data = await response.json();
        const sites = data.data?.sites || [];
        
        if (sites.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    No attendance records found for ${formatDate(selectedDate)}.
                </div>
            `;
            return;
        }
        
        let html = '<div class="row">';
        
        sites.forEach(site => {
            const totalRecords = parseInt(site.attendanceCount) || 0;
            const verifiedRecords = parseInt(site.verifiedCount) || 0;
            const percentVerified = totalRecords > 0 ? Math.round((verifiedRecords / totalRecords) * 100) : 0;
            
            // Ensure safe values for template
            const safeSiteName = (site.name || 'Unknown Site').replace(/'/g, "\\'");
            const safeSiteLocation = (site.location || 'Unknown Location').replace(/'/g, "\\'");
            const safeSiteId = site._id || '';
            
            // Get badge class based on verification percentage
            const badgeClass = percentVerified === 100 ? 'bg-success' : 
                              percentVerified > 0 ? 'bg-warning' : 'bg-secondary';
            const borderClass = percentVerified === 100 ? 'border-success' : 
                               percentVerified > 0 ? 'border-warning' : 'border-secondary';
            const progressClass = percentVerified === 100 ? 'bg-success' : 'bg-warning';
            
            html += `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card h-100 ${borderClass}">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 text-white">${safeSiteName}</h6>
                            <span class="badge ${badgeClass}">
                                ${percentVerified}%
                            </span>
                        </div>
                        <div class="card-body">
                            <p class="card-text small">
                                <i class="bi bi-geo-alt me-1 text-muted"></i>${safeSiteLocation}
                            </p>
                            <p class="card-text small">
                                <i class="bi bi-person-check me-1 text-muted"></i>
                                ${verifiedRecords} of ${totalRecords} verified
                            </p>
                            <div class="progress mb-2" style="height: 6px;">
                                <div class="progress-bar ${progressClass}" 
                                     style="width: ${percentVerified}%"></div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-sm w-100" onclick="viewSiteAttendance('${safeSiteId}', '${safeSiteName}')">
                                <i class="bi bi-check2-square me-1"></i>Review
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading sites overview:', error);
        container.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Error loading sites overview: ${error.message}
            </div>
        `;
    }
}

// Load site filters for approval section
async function loadSiteFilters() {
    const siteFilter = document.getElementById('site-filter');
    if (!siteFilter) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/sites`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            const sites = data.data.sites || [];
            
            siteFilter.innerHTML = '<option value="">All Sites</option>';
            sites.forEach(site => {
                siteFilter.innerHTML += `<option value="${site._id}">${site.name}</option>`;
            });
        }
    } catch (error) {
        console.error('Error loading site filters:', error);
    }
}

// Load submitted hajiri
async function loadSubmittedHajiri() {
    console.log('Loading submitted hajiri...');
    // Implementation will be added later
}

// Set default dates
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    
    const overviewDate = document.getElementById('overview-date');
    const submissionDate = document.getElementById('submissionDate');
    
    if (overviewDate) overviewDate.value = today;
    if (submissionDate) submissionDate.value = today;
}

// Utility functions
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch (error) {
        return dateString;
    }
}

function formatTime(timeString) {
    try {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        return '-';
    }
}

function showLoading(message = 'Loading...') {
    let loadingOverlay = document.getElementById('global-loading-overlay');
    
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'global-loading-overlay';
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mb-0 fw-bold">${message}</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
    
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    const loadingOverlay = document.getElementById('global-loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Enhanced notification system
function showError(message) {
    console.error(message);
    showNotification(message, 'error');
}

function showSuccess(message) {
    console.log(message);
    showNotification(message, 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    const icon = type === 'error' ? 'exclamation-triangle' : 
                 type === 'success' ? 'check-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="bi bi-${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Refresh dashboard
function refreshDashboard() {
    initializeDashboard();
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    const langButton = document.querySelector('.current-lang');
    if (langButton) {
        langButton.textContent = currentLanguage === 'hi' ? 'हिंदी' : 'English';
    }
    console.log('Language switched to:', currentLanguage);
}

// Get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'present':
            return 'bg-success';
        case 'absent':
            return 'bg-danger';
        case 'late':
            return 'bg-warning';
        default:
            return 'bg-secondary';
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }
}

// Simple toggle function for hamburger menu
function toggleSidebar() {
    console.log('toggleSidebar called');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (sidebar && overlay && hamburgerBtn) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
        console.log('Sidebar toggled, active:', sidebar.classList.contains('active'));
    } else {
        console.error('Elements not found:', { sidebar, overlay, hamburgerBtn });
    }
}

// View site attendance function
function viewSiteAttendance(siteId, siteName) {
    console.log('Viewing attendance for site:', siteName, siteId);
    
    // Switch to approve hajiri section
    switchToSection('approve-hajiri-section');
    
    // Set the site filter
    const siteFilter = document.getElementById('site-filter');
    if (siteFilter) {
        siteFilter.value = siteId;
        // Trigger change event to load attendance for this site
        siteFilter.dispatchEvent(new Event('change'));
    }
    
    showSuccess(`Switched to ${siteName} attendance review`);
}

// Report generation functions
function generateWeeklyReport() {
    showSuccess('Weekly report generation started...');
    console.log('Generating weekly report...');
    // Implementation will be added later
}

function generateMonthlyReport() {
    showSuccess('Monthly report generation started...');
    console.log('Generating monthly report...');
    // Implementation will be added later
}

function exportToExcel() {
    showSuccess('Excel export started...');
    console.log('Exporting to Excel...');
    // Implementation will be added later
}