// Experimental Site Incharge Dashboard JavaScript
// Simple hamburger menu implementation

// Configuration
const API_BASE_URL = window.location.origin + '/api';
let currentUser = null;
let currentLanguage = 'hi';

// DOM Elements
const sidebar = document.getElementById('sidebar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const inchargeName = document.getElementById('incharge-name');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log("Experimental Site Incharge dashboard initializing...");
    
    // Check if hamburger button exists
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    console.log('Hamburger button found:', hamburgerBtn);
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup navigation
    setupNavigation();
    
    // Check authentication
    checkAuth();
    
    // Create hamburger button if it doesn't exist
    createHamburgerButton();
    
    // Force show hamburger button
    if (hamburgerBtn) {
        hamburgerBtn.style.display = 'block';
        hamburgerBtn.style.position = 'fixed';
        hamburgerBtn.style.top = '20px';
        hamburgerBtn.style.left = '20px';
        hamburgerBtn.style.zIndex = '9999';
        console.log('Hamburger button forced to show');
    }
});

// Create hamburger button (if needed)
function createHamburgerButton() {
    const existingHamburger = document.getElementById('hamburgerBtn');
    if (existingHamburger) {
        // Add event listener to existing hamburger
        existingHamburger.addEventListener('click', function() {
            toggleSidebar();
        });
    }
}

// Setup mobile menu
function setupMobileMenu() {
    // Hamburger button click
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // Overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeSidebar();
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeSidebar();
            }
        }
    });
}

// Toggle sidebar
function toggleSidebar() {
    console.log('Toggling sidebar...');
    if (sidebar) {
        sidebar.classList.toggle('active');
        console.log('Sidebar active:', sidebar.classList.contains('active'));
    }
    if (overlay) {
        overlay.classList.toggle('active');
    }
    const hamburger = document.getElementById('hamburgerBtn');
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// Close sidebar
function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    const hamburger = document.getElementById('hamburgerBtn');
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            if (targetSection) {
                switchToSection(targetSection);
                
                // Update active states
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
            
            // Close mobile menu
            closeSidebar();
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
        targetElement.classList.add('fade-in');
        
        // Load section-specific data
        switch(sectionId) {
            case 'home-section':
                // Just show hello for now
                break;
            case 'attendance-section':
                loadAttendanceSection();
                break;
            case 'approved-section':
                loadApprovedSection();
                break;
            case 'profile-section':
                loadProfileSection();
                break;
        }
    }
}

// Load attendance section
async function loadAttendanceSection() {
    console.log('Loading attendance section...');
    
    const attendanceSection = document.getElementById('attendance-section');
    if (!attendanceSection) return;
    
    // Update the content with actual attendance interface
    attendanceSection.innerHTML = `
        <div class="page-header">
            <h2 class="mb-0">Pending Attendance</h2>
            <button type="button" class="btn btn-outline-primary btn-sm" onclick="refreshAttendance()" title="Refresh Attendance">
                <i class="bi bi-arrow-clockwise me-1"></i>
                <span class="d-none d-sm-inline">Refresh</span>
            </button>
        </div>
        
        <div class="row mb-3">
            <div class="col-md-6">
                <label for="attendance-date" class="form-label">Select Date:</label>
                <input type="date" id="attendance-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" onchange="loadPendingAttendance()">
            </div>
        </div>
        
        <div id="pending-attendance-container">
            <div class="d-flex justify-content-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    `;
    
    // Load pending attendance for today
    await loadPendingAttendance();
}

// Load approved section
async function loadApprovedSection() {
    console.log('Loading approved attendance section...');
    
    const approvedSection = document.getElementById('approved-section');
    if (!approvedSection) return;
    
    // Update the content with actual approved attendance interface
    approvedSection.innerHTML = `
        <div class="page-header">
            <h2 class="mb-0">Approved Attendance</h2>
            <button type="button" class="btn btn-outline-primary btn-sm" onclick="refreshApproved()" title="Refresh Approved">
                <i class="bi bi-arrow-clockwise me-1"></i>
                <span class="d-none d-sm-inline">Refresh</span>
            </button>
        </div>
        
        <div class="row mb-3">
            <div class="col-md-6">
                <label for="approved-date" class="form-label">Select Date:</label>
                <input type="date" id="approved-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" onchange="loadApprovedAttendance()">
            </div>
        </div>
        
        <div id="approved-attendance-container">
            <div class="d-flex justify-content-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    `;
    
    // Load approved attendance for today
    await loadApprovedAttendance();
}

// Load profile section
function loadProfileSection() {
    console.log('Loading profile section...');
    // Implementation will be added later
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
            inchargeName.textContent = currentUser.name || 'site incharge1';
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

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    const langButton = document.querySelector('.current-lang');
    if (langButton) {
        langButton.textContent = currentLanguage === 'hi' ? 'हिंदी' : 'English';
    }
    console.log('Language switched to:', currentLanguage);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }
}

// Utility functions
function showError(message) {
    console.error(message);
    alert(message); // Simple alert for now
}

function showSuccess(message) {
    console.log(message);
    alert(message); // Simple alert for now
}

// Refresh dashboard
function refreshDashboard() {
    console.log('Refreshing dashboard...');
    showSuccess('Dashboard refreshed!');
    // Add any refresh logic here
}

// Load pending attendance
async function loadPendingAttendance() {
    const container = document.getElementById('pending-attendance-container');
    const dateInput = document.getElementById('attendance-date');
    
    if (!container || !dateInput) return;
    
    const selectedDate = dateInput.value;
    
    try {
        container.innerHTML = `
            <div class="d-flex justify-content-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        // Get sites with attendance for the selected date
        const response = await fetch(`${API_BASE_URL}/attendance/sites-with-attendance?date=${selectedDate}`, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch attendance data');
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && data.data.sites.length > 0) {
            displayPendingAttendance(data.data.sites, selectedDate);
        } else {
            container.innerHTML = `
                <div class="text-center p-5">
                    <i class="bi bi-clipboard-x display-1 text-muted"></i>
                    <h4 class="mt-3">No Pending Attendance</h4>
                    <p class="text-muted">No attendance submissions found for ${selectedDate}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading pending attendance:', error);
        container.innerHTML = `
            <div class="text-center p-5 text-danger">
                <i class="bi bi-exclamation-triangle display-1"></i>
                <h4 class="mt-3">Error Loading Attendance</h4>
                <p>${error.message}</p>
                <button class="btn btn-primary" onclick="loadPendingAttendance()">Try Again</button>
            </div>
        `;
    }
}

// Display pending attendance
function displayPendingAttendance(sites, date) {
    const container = document.getElementById('pending-attendance-container');
    
    let html = '';
    
    sites.forEach(site => {
        const pendingCount = site.attendanceCount - site.verifiedCount;
        if (pendingCount > 0) {
            html += `
                <div class="card mb-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">${site.name}</h5>
                        <span class="badge bg-warning">${pendingCount} Pending</span>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-2">${site.location}</p>
                        <p class="mb-2">Total Records: ${site.attendanceCount} | Verified: ${site.verifiedCount}</p>
                        <button class="btn btn-primary btn-sm" onclick="viewSiteAttendance('${site._id}', '${date}')">
                            <i class="bi bi-eye me-1"></i>Review Attendance
                        </button>
                    </div>
                </div>
            `;
        }
    });
    
    if (html === '') {
        html = `
            <div class="text-center p-5">
                <i class="bi bi-check-circle display-1 text-success"></i>
                <h4 class="mt-3">All Attendance Verified</h4>
                <p class="text-muted">All attendance records for ${date} have been verified</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Load approved attendance
async function loadApprovedAttendance() {
    const container = document.getElementById('approved-attendance-container');
    const dateInput = document.getElementById('approved-date');
    
    if (!container || !dateInput) return;
    
    const selectedDate = dateInput.value;
    
    try {
        container.innerHTML = `
            <div class="d-flex justify-content-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        // Get verified attendance for the selected date
        const response = await fetch(`${API_BASE_URL}/attendance?verified=true&date=${selectedDate}`, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch approved attendance');
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && data.data.attendance.length > 0) {
            displayApprovedAttendance(data.data.attendance);
        } else {
            container.innerHTML = `
                <div class="text-center p-5">
                    <i class="bi bi-clipboard-check display-1 text-muted"></i>
                    <h4 class="mt-3">No Approved Attendance</h4>
                    <p class="text-muted">No approved attendance records found for ${selectedDate}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading approved attendance:', error);
        container.innerHTML = `
            <div class="text-center p-5 text-danger">
                <i class="bi bi-exclamation-triangle display-1"></i>
                <h4 class="mt-3">Error Loading Approved Attendance</h4>
                <p>${error.message}</p>
                <button class="btn btn-primary" onclick="loadApprovedAttendance()">Try Again</button>
            </div>
        `;
    }
}

// Display approved attendance
function displayApprovedAttendance(attendanceRecords) {
    const container = document.getElementById('approved-attendance-container');
    
    let html = `
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Worker</th>
                        <th>Site</th>
                        <th>Status</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                        <th>Hours</th>
                        <th>Verified By</th>
                        <th>Verified At</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    attendanceRecords.forEach(record => {
        const inTime = record.inTime ? new Date(record.inTime).toLocaleTimeString() : '-';
        const outTime = record.outTime ? new Date(record.outTime).toLocaleTimeString() : '-';
        const verifiedAt = record.verifiedAt ? new Date(record.verifiedAt).toLocaleString() : '-';
        
        html += `
            <tr>
                <td>${record.worker?.name || 'Unknown'}</td>
                <td>${record.site?.name || 'Unknown'}</td>
                <td>
                    <span class="badge bg-${record.status === 'present' ? 'success' : record.status === 'late' ? 'warning' : 'danger'}">
                        ${record.status}
                    </span>
                </td>
                <td>${inTime}</td>
                <td>${outTime}</td>
                <td>${record.workingHours || 0}</td>
                <td>${record.verifiedBy?.name || 'System'}</td>
                <td>${verifiedAt}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// View site attendance details
async function viewSiteAttendance(siteId, date) {
    try {
        // Get attendance records for the site and date
        const response = await fetch(`${API_BASE_URL}/attendance?site=${siteId}&date=${date}&submittedToIncharge=true&verified=false`, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch site attendance');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showAttendanceModal(data.data.attendance, siteId, date);
        } else {
            showError('No pending attendance found for this site');
        }
    } catch (error) {
        console.error('Error fetching site attendance:', error);
        showError('Failed to load attendance details');
    }
}

// Show attendance modal
function showAttendanceModal(attendanceRecords, siteId, date) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('attendanceModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'attendanceModal';
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Attendance Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="attendanceModalBody">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="approveAllAttendance()">
                            <i class="bi bi-check-circle me-1"></i>Approve All
                        </button>
                        <button type="button" class="btn btn-danger" onclick="rejectAllAttendance()">
                            <i class="bi bi-x-circle me-1"></i>Reject All
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Populate modal body
    const modalBody = document.getElementById('attendanceModalBody');
    let html = `
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="selectAll" onchange="toggleSelectAll()"></th>
                        <th>Worker</th>
                        <th>Status</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                        <th>Hours</th>
                        <th>Marked By</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    attendanceRecords.forEach(record => {
        const inTime = record.inTime ? new Date(record.inTime).toLocaleTimeString() : '-';
        const outTime = record.outTime ? new Date(record.outTime).toLocaleTimeString() : '-';
        
        html += `
            <tr>
                <td><input type="checkbox" class="attendance-checkbox" value="${record._id}"></td>
                <td>${record.worker?.name || 'Unknown'}</td>
                <td>
                    <span class="badge bg-${record.status === 'present' ? 'success' : record.status === 'late' ? 'warning' : 'danger'}">
                        ${record.status}
                    </span>
                </td>
                <td>${inTime}</td>
                <td>${outTime}</td>
                <td>${record.workingHours || 0}</td>
                <td>${record.markedBy?.name || 'Unknown'}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    modalBody.innerHTML = html;
    
    // Store current site and date for approval/rejection
    window.currentSiteId = siteId;
    window.currentDate = date;
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Toggle select all checkboxes
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.attendance-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

// Approve all selected attendance
async function approveAllAttendance() {
    const checkboxes = document.querySelectorAll('.attendance-checkbox:checked');
    const attendanceIds = Array.from(checkboxes).map(cb => cb.value);
    
    if (attendanceIds.length === 0) {
        showError('Please select attendance records to approve');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/attendance/verify`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                attendanceIds,
                note: 'Approved by site incharge'
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to approve attendance');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showSuccess(`${data.modifiedCount} attendance records approved successfully`);
            
            // Close modal and refresh
            const modal = bootstrap.Modal.getInstance(document.getElementById('attendanceModal'));
            modal.hide();
            
            // Refresh the attendance data
            loadPendingAttendance();
        } else {
            throw new Error(data.message || 'Failed to approve attendance');
        }
    } catch (error) {
        console.error('Error approving attendance:', error);
        showError('Failed to approve attendance: ' + error.message);
    }
}

// Reject all selected attendance
async function rejectAllAttendance() {
    const checkboxes = document.querySelectorAll('.attendance-checkbox:checked');
    const attendanceIds = Array.from(checkboxes).map(cb => cb.value);
    
    if (attendanceIds.length === 0) {
        showError('Please select attendance records to reject');
        return;
    }
    
    if (!confirm('Are you sure you want to reject the selected attendance records? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/attendance/reject`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                attendanceIds,
                note: 'Rejected by site incharge'
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to reject attendance');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showSuccess(`${data.deletedCount} attendance records rejected successfully`);
            
            // Close modal and refresh
            const modal = bootstrap.Modal.getInstance(document.getElementById('attendanceModal'));
            modal.hide();
            
            // Refresh the attendance data
            loadPendingAttendance();
        } else {
            throw new Error(data.message || 'Failed to reject attendance');
        }
    } catch (error) {
        console.error('Error rejecting attendance:', error);
        showError('Failed to reject attendance: ' + error.message);
    }
}

// Refresh functions
function refreshAttendance() {
    loadPendingAttendance();
}

function refreshApproved() {
    loadApprovedAttendance();
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Close mobile menu on desktop
        closeSidebar();
    }
});