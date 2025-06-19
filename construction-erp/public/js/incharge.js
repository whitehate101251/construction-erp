// Site Incharge Dashboard JavaScript
// Handles attendance verification with enhanced time formatting and features

// DOM Elements
const sidebar = document.getElementById('sidebar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const overlay = document.getElementById('overlay');
const inchargeName = document.getElementById('incharge-name');
const totalForemen = document.getElementById('total-foremen');
const pendingApprovals = document.getElementById('pending-approvals');
const foremenList = document.getElementById('foremen-list');
const submittedHajiriTable = document.getElementById('submitted-hajiri-table');

// Current language state
let currentLanguage = 'hi';

// Translations
const translations = {
    hi: {
        home: 'होम',
        approveHajiri: 'हाज़िरी स्वीकृत करें',
        submittedHajiri: 'जमा की गई हाज़िरी',
        profile: 'प्रोफ़ाइल',
        logout: 'लॉग आउट',
        totalForemen: 'कुल फोरमैन',
        pendingHajiri: 'लंबित हाज़िरी',
        yourForemen: 'आपके फोरमैन',
        submittedRecords: 'जमा की गई हाज़िरी रिकॉर्ड्स',
        date: 'दिनांक',
        foreman: 'फोरमैन',
        site: 'साइट',
        workersPresent: 'उपस्थित मजदूर',
        status: 'स्थिति',
        actions: 'कार्रवाई',
        view: 'देखें',
        approved: 'स्वीकृत',
        submitted: 'जमा किया गया',
        name: 'नाम',
        email: 'ईमेल',
        phone: 'फोन',
        role: 'भूमिका',
        siteIncharge: 'साइट इंचार्ज'
    },
    en: {
        home: 'Home',
        approveHajiri: 'Approve Hajiri',
        submittedHajiri: 'Submitted Hajiri',
        profile: 'Profile',
        logout: 'Logout',
        totalForemen: 'Total Foremen',
        pendingHajiri: 'Pending Hajiri',
        yourForemen: 'Your Foremen',
        submittedRecords: 'Submitted Hajiri Records',
        date: 'Date',
        foreman: 'Foreman',
        site: 'Site',
        workersPresent: 'Workers Present',
        status: 'Status',
        actions: 'Actions',
        view: 'View',
        approved: 'Approved',
        submitted: 'Submitted',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        role: 'Role',
        siteIncharge: 'Site Incharge'
    }
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log("Incharge dashboard initializing...");
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup event listeners for navigation
    setupNavigation();
    
    // Check authentication
    checkAuth();
    
    // Initialize the page with dummy data for now
    initializeDummyData();
});

// Setup mobile menu
function setupMobileMenu() {
    console.log("Setting up mobile menu...");
    console.log("hamburgerBtn:", hamburgerBtn);
    console.log("sidebar:", sidebar);
    console.log("overlay:", overlay);
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            console.log("Hamburger clicked");
            if (sidebar) sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            console.log("Overlay clicked");
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        });
    }
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            console.log("Navigation clicked:", targetSection);
            
            // Update active states
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            } else {
                console.warn("Target section not found:", targetSection);
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                if (sidebar) sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        // If testing locally, continue without redirection
        console.log("No auth token found, using dummy data");
        return;
    }
    
    // Check user role from localStorage
    try {
    const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'site_incharge') {
            console.log("User is not a site incharge, using dummy data");
        return;
    }
    
        // Display user name
        if (inchargeName) {
            inchargeName.textContent = user.name || 'Site Incharge';
        }
        
        // Load user profile
        loadUserProfile(user);
        
    } catch (error) {
        console.error('Error checking auth:', error);
        // Continue with dummy data for testing
    }
}

// Initialize with dummy data for now
function initializeDummyData() {
    console.log("Initializing with dummy data");
    
    // Update language content
    updateLanguageContent();
    
    // Set dummy data for stats
    if (totalForemen) totalForemen.textContent = '3';
    if (pendingApprovals) pendingApprovals.textContent = '5';
    
    // Load dummy foremen data
    loadDummyForemen();
    
    // Load dummy submitted hajiri
    loadDummySubmittedHajiri();
    
    // Set date for submission date input if it exists
    const submissionDateInput = document.getElementById('submissionDate');
    if (submissionDateInput) {
        submissionDateInput.value = new Date().toISOString().split('T')[0];
    }
}

// Load user profile
function loadUserProfile(user) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
}

// Load dummy foremen data
function loadDummyForemen() {
    if (!foremenList) {
        console.warn("Foremen list element not found");
        return;
    }
    
    const dummyForemen = [
        { id: '1', name: 'Rajesh Kumar', site: 'Delhi Site', pendingHajiri: 2 },
        { id: '2', name: 'Sunil Sharma', site: 'Mumbai Project', pendingHajiri: 1 },
        { id: '3', name: 'Amit Singh', site: 'Bangalore Construction', pendingHajiri: 2 }
    ];
    
    foremenList.innerHTML = dummyForemen.map(foreman => `
        <tr>
            <td>${foreman.name}</td>
            <td>${foreman.site}</td>
            <td>${foreman.pendingHajiri}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewForeman('${foreman.id}')">
                    ${translations[currentLanguage].view}
                </button>
            </td>
        </tr>
    `).join('');
}

// Load dummy submitted hajiri
function loadDummySubmittedHajiri() {
    if (!submittedHajiriTable) {
        console.warn("Submitted hajiri table element not found");
        return;
    }
    
    const dummyRecords = [
        { 
            id: '1', 
            date: new Date(), 
            foreman: { name: 'Rajesh Kumar' }, 
            site: 'Delhi Site', 
            workersPresent: 15 
        },
        { 
            id: '2', 
            date: new Date(Date.now() - 86400000), // yesterday
            foreman: { name: 'Sunil Sharma' }, 
            site: 'Mumbai Project', 
            workersPresent: 12 
        },
        { 
            id: '3', 
            date: new Date(Date.now() - 86400000), // yesterday
            foreman: { name: 'Amit Singh' }, 
            site: 'Bangalore Construction', 
            workersPresent: 20 
        },
        { 
            id: '4', 
            date: new Date(Date.now() - 172800000), // 2 days ago
            foreman: { name: 'Rajesh Kumar' }, 
            site: 'Delhi Site', 
            workersPresent: 14 
        },
        { 
            id: '5', 
            date: new Date(Date.now() - 259200000), // 3 days ago
            foreman: { name: 'Sunil Sharma' }, 
            site: 'Mumbai Project', 
            workersPresent: 10 
        }
    ];
    
    submittedHajiriTable.innerHTML = dummyRecords.map(record => `
        <tr>
            <td>${record.date.toLocaleDateString()}</td>
            <td>${record.foreman.name}</td>
            <td>${record.site}</td>
            <td>${record.workersPresent}</td>
            <td>
                <span class="status-badge status-approved">
                    ${translations[currentLanguage].submitted}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewHajiriRecord('${record.id}')">
                    ${translations[currentLanguage].view}
                </button>
            </td>
        </tr>
    `).join('');
}

// View foreman's attendance records
function viewForeman(foremanId) {
    alert('Viewing foreman ID: ' + foremanId + '\nThis functionality will be implemented soon.');
}

// View specific hajiri record
function viewHajiriRecord(recordId) {
    alert('Viewing hajiri record ID: ' + recordId + '\nThis functionality will be implemented soon.');
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    const langElement = document.querySelector('.current-lang');
    if (langElement) {
        langElement.textContent = currentLanguage === 'hi' ? 'हिंदी' : 'English';
    }
    updateLanguageContent();
}

// Update language content
function updateLanguageContent() {
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = link.getAttribute('data-section');
        const navText = link.querySelector('.nav-text');
        if (!navText) return;
        
        if (section === 'overview-section') {
            navText.textContent = translations[currentLanguage].home;
        } else if (section === 'approve-hajiri-section') {
            navText.textContent = translations[currentLanguage].approveHajiri;
        } else if (section === 'submitted-hajiri-section') {
            navText.textContent = translations[currentLanguage].submittedHajiri;
        } else if (section === 'profile-section') {
            navText.textContent = translations[currentLanguage].profile;
        }
    });

    // Update section titles
    document.querySelectorAll('.section h2').forEach(title => {
        if (!title.parentElement) return;
        
        if (title.parentElement.id === 'overview-section') {
            title.textContent = translations[currentLanguage].home;
        } else if (title.parentElement.id === 'approve-hajiri-section') {
            title.textContent = translations[currentLanguage].approveHajiri;
        } else if (title.parentElement.id === 'submitted-hajiri-section') {
            title.textContent = translations[currentLanguage].submittedHajiri;
        } else if (title.parentElement.id === 'profile-section') {
            title.textContent = translations[currentLanguage].profile;
        }
    });

    // Update other text elements
    const logoutButton = document.querySelector('.logout-button .nav-text');
    if (logoutButton) {
        logoutButton.textContent = translations[currentLanguage].logout;
    }
    
    // Update table headers
    updateTableHeaders();
}

// Update table headers based on language
function updateTableHeaders() {
    // Update foremen table headers if they exist
    if (foremenList) {
        const foremenTable = foremenList.closest('table');
        if (foremenTable) {
            const headers = foremenTable.querySelectorAll('thead th');
            if (headers.length >= 4) {
                headers[0].textContent = translations[currentLanguage].name;
                headers[1].textContent = translations[currentLanguage].site;
                headers[2].textContent = translations[currentLanguage].pendingHajiri;
                headers[3].textContent = translations[currentLanguage].actions;
            }
        }
    }
    
    // Update submitted hajiri table headers if they exist
    if (submittedHajiriTable) {
        const submittedTable = submittedHajiriTable.closest('table');
        if (submittedTable) {
            const headers = submittedTable.querySelectorAll('thead th');
            if (headers.length >= 6) {
                headers[0].textContent = translations[currentLanguage].date;
                headers[1].textContent = translations[currentLanguage].foreman;
                headers[2].textContent = translations[currentLanguage].site;
                headers[3].textContent = translations[currentLanguage].workersPresent;
                headers[4].textContent = translations[currentLanguage].status;
                headers[5].textContent = translations[currentLanguage].actions;
            }
        }
    }
}

// Load submissions for a specific date
function loadSubmissionsForDate() {
    const submissionDateInput = document.getElementById('submissionDate');
    if (!submissionDateInput) return;
    
    const submissionDate = submissionDateInput.value;
    alert('Loading submissions for date: ' + submissionDate + '\nThis functionality will be implemented with real API calls soon.');
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Format time in 12-hour format with AM/PM
function formatTime(timeString) {
    if (!timeString || timeString === '-') return '-';
    
    try {
        const date = new Date(timeString);
        if (isNaN(date.getTime())) return '-';
        
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error('Error formatting time:', error);
        return '-';
    }
}

// Format working hours with proper decimal places
function formatHours(hours) {
    if (!hours || hours === '-') return '-';
    
    try {
        const numHours = parseFloat(hours);
        if (isNaN(numHours)) return '-';
        
        return numHours.toFixed(1);
    } catch (error) {
        console.error('Error formatting hours:', error);
        return '-';
    }
}

// Format date in a user-friendly format
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
}

// Load Sites
async function loadSites() {
    try {
        const sitesList = document.getElementById('sitesList');
        sitesList.innerHTML = '<tr><td colspan="5" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div> Loading sites...</td></tr>';
        
        const response = await fetch(`${API_URL}/sites`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load sites');
        }
        
        const data = await response.json();
        sitesList.innerHTML = '';
        
        if (data.data.sites.length === 0) {
            sitesList.innerHTML = '<tr><td colspan="5" class="text-center py-4"><i class="bi bi-exclamation-circle text-muted me-2"></i>No sites found.</td></tr>';
            return;
        }
        
        // Loop through sites and add to table
        data.data.sites.forEach(async (site) => {
            const row = document.createElement('tr');
            
            // Get pending verification count for each site
            const pendingCount = await getPendingVerificationCount(site._id);
            
            // Format foremen list
            let foremenList = site.siteManager ? site.siteManager.name : 'No primary foreman';
            if (site.additionalForemen && site.additionalForemen.length > 0) {
                const additionalNames = site.additionalForemen.map(f => f.name).join(', ');
                foremenList += `, ${additionalNames}`;
            }
            
            row.innerHTML = `
                <td>${site.name}</td>
                <td><i class="bi bi-geo-alt me-1 text-secondary"></i>${site.location}</td>
                <td><i class="bi bi-person-badge me-2 text-primary"></i>${foremenList}</td>
                <td class="text-center">
                    <span class="badge rounded-pill ${pendingCount > 0 ? 'bg-warning' : 'bg-secondary'}">${pendingCount}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewSiteAttendance('${site._id}', '${site.name}')">
                        <i class="bi bi-check2-all me-1"></i> Verify Attendance
                    </button>
                </td>
            `;
            
            sitesList.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error loading sites:', error);
        document.getElementById('sitesList').innerHTML = `
            <tr><td colspan="5" class="text-center text-danger">Error loading sites: ${error.message}</td></tr>
        `;
    }
}

// Get pending verification count for a site
async function getPendingVerificationCount(siteId) {
    try {
        const response = await fetch(`${API_URL}/attendance/pending-verification?site=${siteId}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            console.error('Error fetching pending verification count');
            return 0;
        }
        
        const data = await response.json();
        return data.count || 0;
    } catch (error) {
        console.error('Error fetching pending verification count:', error);
        return 0;
    }
}

// View Site Attendance for Verification
function viewSiteAttendance(siteId, siteName) {
    document.getElementById('verification-site-id').value = siteId;
    document.getElementById('verification-site-name').textContent = siteName;
    
    // Get selected date or use today's date
    const selectedDate = document.getElementById('attendanceDate').value || 
                        new Date().toISOString().slice(0, 10);
    document.getElementById('verification-date').value = selectedDate;
    document.getElementById('display-verification-date').textContent = formatDate(selectedDate);
    
    // Load attendance records for the site and date
    loadAttendanceForVerification(siteId, selectedDate);
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('verificationModal'));
    modal.show();
}

// Load Attendance for Verification
async function loadAttendanceForVerification(siteId, date) {
    try {
        const verificationList = document.getElementById('verificationList');
        verificationList.innerHTML = '<tr><td colspan="7" class="text-center"><div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div> Loading attendance records...</td></tr>';
        
        const response = await fetch(`${API_URL}/attendance?site=${siteId}&date=${date}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load attendance records');
        }
        
        const data = await response.json();
        verificationList.innerHTML = '';
        
        if (!data.data || !data.data.attendance || data.data.attendance.length === 0) {
            verificationList.innerHTML = '<tr><td colspan="7" class="text-center">No attendance records found for this date.</td></tr>';
            return;
        }
        
        // Get submission details
        let submissionTime = '-';
        let globalInTime = '-';
        let globalOutTime = '-';
        
        // Check if any record has submission details
        const firstRecord = data.data.attendance[0];
        if (firstRecord.submissionTimestamp) {
            submissionTime = formatDate(firstRecord.submissionTimestamp) + ' at ' + 
                formatTime(firstRecord.submissionTimestamp);
        }
        
        if (firstRecord.globalInTime) {
            globalInTime = formatTime(firstRecord.globalInTime);
        }
        
        if (firstRecord.globalOutTime) {
            globalOutTime = formatTime(firstRecord.globalOutTime);
        }
        
        // Show foreman name who recorded the attendance
        if (firstRecord.markedBy) {
            document.getElementById('display-foreman-name').textContent = 
                firstRecord.markedBy.name || 'Unknown';
        } else {
            document.getElementById('display-foreman-name').textContent = 'Unknown';
        }
        
        // Add submission details to modal
        const modalBody = document.querySelector('#verificationModal .modal-body');
        
        // Check if submission details section already exists
        let submissionDetails = document.getElementById('submission-details');
        if (!submissionDetails) {
            submissionDetails = document.createElement('div');
            submissionDetails.id = 'submission-details';
            submissionDetails.className = 'submission-details mb-4 p-3 bg-light rounded';
            modalBody.insertBefore(submissionDetails, modalBody.firstChild.nextSibling);
        }
        
        submissionDetails.innerHTML = `
            <h6 class="mb-3"><i class="bi bi-info-circle me-2"></i>Submission Details</h6>
            <div class="row">
                <div class="col-md-4 mb-2">
                    <small class="text-muted d-block">Submitted On</small>
                    <span class="badge bg-info text-white">${submissionTime}</span>
                </div>
                <div class="col-md-4 mb-2">
                    <small class="text-muted d-block">Global In Time</small>
                    <span class="badge bg-primary text-white">${globalInTime}</span>
                </div>
                <div class="col-md-4 mb-2">
                    <small class="text-muted d-block">Global Out Time</small>
                    <span class="badge bg-primary text-white">${globalOutTime}</span>
                </div>
            </div>
        `;
        
        // Add attendance records to table
        data.data.attendance.forEach((record, index) => {
            const timeIn = record.inTime ? formatTime(record.inTime) : '-';
            const timeOut = record.outTime ? formatTime(record.outTime) : '-';
            const hours = formatHours(record.workingHours) || '-';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${record.worker.name}</td>
                <td>
                    <span class="badge ${getStatusBadgeClass(record.status)}">
                        ${record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                </td>
                <td>${timeIn}</td>
                <td>${timeOut}</td>
                <td>${hours}</td>
                <td class="text-center">
                    <div class="form-check">
                        <input class="form-check-input verification-checkbox" type="checkbox" 
                            value="${record._id}" id="verify-${record._id}"
                            ${record.verified ? 'checked disabled' : ''}>
                    </div>
                </td>
            `;
            
            if (record.verified) {
                row.classList.add('table-success', 'opacity-75');
            }
            
            verificationList.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error loading attendance for verification:', error);
        document.getElementById('verificationList').innerHTML = `
            <tr><td colspan="7" class="text-center text-danger">Error loading attendance: ${error.message}</td></tr>
        `;
    }
}

// Load Attendance for Date
async function loadAttendanceForDate() {
    const selectedDate = document.getElementById('attendanceDate').value;
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    try {
        const container = document.getElementById('attendanceVerificationContainer');
        container.innerHTML = '<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';
        
        const response = await fetch(`${API_URL}/sites/with-attendance?date=${selectedDate}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load attendance data');
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.sites.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    No attendance records found for ${formatDate(selectedDate)}.
                </div>
            `;
            return;
        }
        
        let html = `
            <div class="row mb-4">
                <div class="col-12">
                    <div class="alert alert-light border">
                        <i class="bi bi-calendar3 me-2"></i>
                        Attendance for <strong>${formatDate(selectedDate)}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
        `;
        
        data.data.sites.forEach(site => {
            // Count verified and total records
            const totalRecords = site.attendanceCount || 0;
            const verifiedRecords = site.verifiedCount || 0;
            const percentVerified = totalRecords > 0 ? Math.round((verifiedRecords / totalRecords) * 100) : 0;
            
            // Get submission timestamp if available
            let submissionBadge = '';
            if (site.submissionTimestamp) {
                const submissionTime = formatTime(site.submissionTimestamp);
                submissionBadge = `
                    <div class="mt-2">
                        <span class="badge bg-info text-white">
                            <i class="bi bi-clock-history me-1"></i>
                            Submitted at ${submissionTime}
                        </span>
                    </div>
                `;
            }
            
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 ${percentVerified === 100 ? 'border-success' : percentVerified > 0 ? 'border-warning' : ''}">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">${site.name}</h5>
                            <span class="badge ${percentVerified === 100 ? 'bg-success' : percentVerified > 0 ? 'bg-warning' : 'bg-secondary'}">
                                ${percentVerified}% Verified
                            </span>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                <i class="bi bi-geo-alt me-2 text-muted"></i>${site.location}
                            </p>
                            <p class="card-text">
                                <i class="bi bi-person-check me-2 text-muted"></i>
                                ${verifiedRecords} of ${totalRecords} records verified
                            </p>
                            <div class="progress mb-3">
                                <div class="progress-bar ${percentVerified === 100 ? 'bg-success' : 'bg-warning'}" 
                                     role="progressbar" 
                                     style="width: ${percentVerified}%" 
                                     aria-valuenow="${percentVerified}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                </div>
                            </div>
                            ${submissionBadge}
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary w-100" onclick="viewSiteAttendance('${site._id}', '${site.name}')">
                                <i class="bi bi-check2-square me-2"></i>Verify Attendance
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading attendance for date:', error);
        document.getElementById('attendanceVerificationContainer').innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Error loading attendance data: ${error.message}
            </div>
        `;
    }
}

// Verify All Attendance
async function verifyAllAttendance() {
    try {
        const siteId = document.getElementById('verification-site-id').value;
        const date = document.getElementById('verification-date').value;
        const note = document.getElementById('verification-note').value;
        
        // Get all checked checkboxes
        const checkedBoxes = document.querySelectorAll('.verification-checkbox:checked:not(:disabled)');
        
        if (checkedBoxes.length === 0) {
            alert('Please select at least one attendance record to verify');
            return;
        }
        
        // Disable verify button and show loading state
        const verifyBtn = document.getElementById('verifyAllBtn');
        const originalText = verifyBtn.innerHTML;
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Verifying...';
        
        const attendanceIds = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        
        const response = await fetch(`${API_URL}/attendance/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify({
                attendanceIds,
                note,
                siteId,
                date
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to verify attendance');
        }
        
        // Hide modal
        bootstrap.Modal.getInstance(document.getElementById('verificationModal')).hide();
        
        // Show success message with toast
        showToast('Success', `${attendanceIds.length} attendance records verified successfully.`, 'success');
        
        // Reload sites to update counts
        loadSites();
        
    } catch (error) {
        console.error('Error verifying attendance:', error);
        showToast('Error', error.message, 'danger');
    } finally {
        // Reset button state
        const verifyBtn = document.getElementById('verifyAllBtn');
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = '<i class="bi bi-check2-all me-2"></i>Verify All';
    }
}

// Reject All Attendance
async function rejectAllAttendance() {
    if (!confirm('Are you sure you want to reject these attendance records? This will require the foreman to resubmit them.')) {
        return;
    }
    
    try {
        const siteId = document.getElementById('verification-site-id').value;
        const date = document.getElementById('verification-date').value;
        const note = document.getElementById('verification-note').value || 'Rejected by site incharge';
        
        // Get all selected checkboxes
        const checkedBoxes = document.querySelectorAll('.verification-checkbox:checked:not(:disabled)');
        
        if (checkedBoxes.length === 0) {
            alert('Please select at least one attendance record to reject');
            return;
        }
        
        // Disable reject button and show loading state
        const rejectBtn = document.getElementById('rejectBtn');
        const originalText = rejectBtn.innerHTML;
        rejectBtn.disabled = true;
        rejectBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Rejecting...';
        
        const attendanceIds = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        
        const response = await fetch(`${API_URL}/attendance/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify({
                attendanceIds,
                note,
                siteId,
                date
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to reject attendance');
        }
        
        // Hide modal
        bootstrap.Modal.getInstance(document.getElementById('verificationModal')).hide();
        
        // Show success message with toast
        showToast('Success', `${attendanceIds.length} attendance records rejected successfully.`, 'warning');
        
        // Reload sites to update counts
        loadSites();
        
    } catch (error) {
        console.error('Error rejecting attendance:', error);
        showToast('Error', error.message, 'danger');
    } finally {
        // Reset button state
        const rejectBtn = document.getElementById('rejectBtn');
        rejectBtn.disabled = false;
        rejectBtn.innerHTML = 'Reject';
    }
}

// Show toast notification
function showToast(title, message, type = 'info') {
    // Check if toast container exists, if not create it
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '5';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.id = toastId;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}:</strong> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 5000
    });
    toast.show();
    
    // Remove toast from DOM after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

// Helper function to get status badge class
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

// Load submissions for a specific date
async function loadSubmissionsForDate() {
    try {
        const date = document.getElementById('submissionDate').value;
        if (!date) {
            showToast('Please select a date', 'Please select a date to view submissions', 'warning');
            return;
        }

        const submissionsList = document.getElementById('submissionsList');
        submissionsList.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div> 
                    Loading submissions...
                </td>
            </tr>
        `;

        // Fetch attendance submissions for the selected date
        const response = await fetch(`${API_URL}/attendance/submissions?date=${date}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load submissions');
        }

        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            submissionsList.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        <i class="bi bi-info-circle me-2"></i>
                        No submissions found for this date.
                    </td>
                </tr>
            `;
            return;
        }

        // Group submissions by site and foreman
        const groupedSubmissions = {};
        data.data.forEach(submission => {
            const key = `${submission.site._id}-${submission.markedBy._id}`;
            if (!groupedSubmissions[key]) {
                groupedSubmissions[key] = {
                    site: submission.site,
                    foreman: submission.markedBy,
                    date: submission.date,
                    submissionTime: submission.submissionTime || 'Unknown',
                    submissionDate: submission.submissionDate || formatDate(submission.date),
                    records: []
                };
            }
            groupedSubmissions[key].records.push(submission);
        });

        // Clear and populate the submissions list
        submissionsList.innerHTML = '';
        
        // Convert grouped submissions to array and sort by submission time
        const submissionsArray = Object.values(groupedSubmissions);
        submissionsArray.sort((a, b) => {
            return new Date(b.submissionDate + ' ' + b.submissionTime) - 
                   new Date(a.submissionDate + ' ' + a.submissionTime);
        });

        submissionsArray.forEach(submission => {
            const row = document.createElement('tr');
            
            // Determine status badge
            let statusBadge = '';
            const allVerified = submission.records.every(record => record.verified);
            const someVerified = submission.records.some(record => record.verified);
            
            if (allVerified) {
                statusBadge = '<span class="badge bg-success">Approved</span>';
            } else if (someVerified) {
                statusBadge = '<span class="badge bg-warning">Partially Approved</span>';
            } else {
                statusBadge = '<span class="badge bg-info">Pending</span>';
            }
            
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar avatar-sm me-2 bg-primary-subtle rounded-circle">
                            <span class="avatar-text">${submission.foreman.name.charAt(0)}</span>
                        </div>
                        <div>
                            <div class="fw-medium">${submission.foreman.name}</div>
                            <div class="small text-muted">${submission.foreman.phone || 'No phone'}</div>
                        </div>
                    </div>
                </td>
                <td>${submission.site.name}</td>
                <td>${submission.submissionDate}</td>
                <td>${submission.submissionTime}</td>
                <td class="text-center">${submission.records.length}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewSubmission('${submission.site._id}', '${submission.foreman._id}', '${submission.date}')">
                        <i class="bi bi-eye me-1"></i> View
                    </button>
                </td>
            `;
            
            submissionsList.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading submissions:', error);
        document.getElementById('submissionsList').innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Error loading submissions: ${error.message}
                </td>
            </tr>
        `;
    }
}

// View submission details
async function viewSubmission(siteId, foremanId, date) {
    try {
        // Set loading state
        document.getElementById('submission-attendance-table').innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-3">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2 mb-0">Loading attendance data...</p>
                </td>
            </tr>
        `;
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('approveSubmissionModal'));
        modal.show();
        
        // Fetch submission details
        const response = await fetch(`${API_URL}/attendance?site=${siteId}&date=${date}&markedBy=${foremanId}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load submission details');
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            document.getElementById('submission-attendance-table').innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">
                        <i class="bi bi-info-circle me-2"></i>
                        No attendance records found.
                    </td>
                </tr>
            `;
            return;
        }
        
        // Set submission metadata
        const records = Array.isArray(data.data) ? data.data : [];
        const firstRecord = records[0];
        
        document.getElementById('submission-id').value = `${siteId}-${foremanId}-${date}`;
        document.getElementById('submission-foreman').textContent = firstRecord.markedBy ? firstRecord.markedBy.name : 'Unknown';
        document.getElementById('submission-site').textContent = firstRecord.site ? firstRecord.site.name : 'Unknown';
        document.getElementById('submission-date').textContent = formatDate(date);
        document.getElementById('submission-time').textContent = firstRecord.submissionTime || 'Unknown';
        
        // Populate attendance table
        const tbody = document.getElementById('submission-attendance-table');
        tbody.innerHTML = '';
        
        records.forEach((record, index) => {
            const worker = record.worker || { name: 'Unknown', fatherName: 'Unknown' };
            const isPresent = record.status === 'present' || record.hajiriPA === 'P';
            const hajiriX = record.hajiriX || '0';
            const hajiriY = record.hajiriY || '0';
            const workingHours = (parseInt(hajiriX) || 0) * 8 + (parseInt(hajiriY) || 0);
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${worker.name}</td>
                <td>${worker.fatherName || 'N/A'}</td>
                <td>
                    <span class="badge ${isPresent ? 'bg-success' : 'bg-danger'}">
                        ${isPresent ? 'P' : 'A'}
                    </span>
                </td>
                <td>
                    ${isPresent ? `${hajiriX}P${hajiriY}` : '-'}
                </td>
                <td>${isPresent ? workingHours : '0'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editAttendanceRecord('${record._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading submission details:', error);
        document.getElementById('submission-attendance-table').innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Error loading details: ${error.message}
                </td>
            </tr>
        `;
    }
}

// Edit attendance record
async function editAttendanceRecord(recordId) {
    try {
        // Show loading state
        const editModal = new bootstrap.Modal(document.getElementById('editAttendanceModal'));
        editModal.show();
        
        // Fetch record details
        const response = await fetch(`${API_URL}/attendance/${recordId}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load attendance record');
        }
        
        const data = await response.json();
        
        if (!data.data) {
            showToast('Error', 'Failed to load attendance record', 'error');
            return;
        }
        
        const record = data.data;
        const worker = record.worker || { name: 'Unknown' };
        
        // Populate form
        document.getElementById('edit-attendance-id').value = record._id;
        document.getElementById('edit-worker-id').value = worker._id;
        document.getElementById('edit-worker-name').value = worker.name;
        
        // Set status
        const isPresent = record.status === 'present' || record.hajiriPA === 'P';
        document.getElementById('edit-status-present').checked = isPresent;
        document.getElementById('edit-status-absent').checked = !isPresent;
        
        // Set hajiri values
        document.getElementById('edit-hajiri-x').value = record.hajiriX || '0';
        document.getElementById('edit-hajiri-y').value = record.hajiriY || '0';
        
        // Calculate working hours
        updateWorkingHours();
    } catch (error) {
        console.error('Error loading attendance record:', error);
        showToast('Error', `Failed to load attendance record: ${error.message}`, 'error');
    }
}

// Update working hours calculation
function updateWorkingHours() {
    const hajiriX = parseInt(document.getElementById('edit-hajiri-x').value) || 0;
    const hajiriY = parseInt(document.getElementById('edit-hajiri-y').value) || 0;
    const workingHours = (hajiriX * 8) + hajiriY;
    
    document.getElementById('edit-working-hours').value = workingHours;
}

// Save attendance edit
async function saveAttendanceEdit() {
    try {
        const recordId = document.getElementById('edit-attendance-id').value;
        const status = document.getElementById('edit-status-present').checked ? 'present' : 'absent';
        const hajiriPA = status === 'present' ? 'P' : 'A';
        const hajiriX = document.getElementById('edit-hajiri-x').value;
        const hajiriY = document.getElementById('edit-hajiri-y').value;
        const workingHours = document.getElementById('edit-working-hours').value;
        
        // Prepare data
        const updateData = {
            status,
            hajiriPA,
            hajiriX,
            hajiriY,
            workingHours: parseInt(workingHours),
            modifiedBy: JSON.parse(localStorage.getItem('user'))._id,
            modifiedAt: new Date().toISOString()
        };
        
        // Update record
        const response = await fetch(`${API_URL}/attendance/${recordId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify(updateData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update attendance record');
        }
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('editAttendanceModal')).hide();
        
        // Refresh submission view
        const submissionId = document.getElementById('submission-id').value;
        const [siteId, foremanId, date] = submissionId.split('-');
        await viewSubmission(siteId, foremanId, date);
        
        showToast('Success', 'Attendance record updated successfully', 'success');
    } catch (error) {
        console.error('Error updating attendance record:', error);
        showToast('Error', `Failed to update attendance record: ${error.message}`, 'error');
    }
}

// Approve submission
async function approveSubmission() {
    try {
        const submissionId = document.getElementById('submission-id').value;
        const [siteId, foremanId, date] = submissionId.split('-');
        const comments = document.getElementById('approval-comments').value;
        
        // Show loading state
        const approveBtn = document.querySelector('#approveSubmissionModal .btn-success');
        approveBtn.disabled = true;
        approveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Approving...';
        
        // Fetch all records for this submission
        const response = await fetch(`${API_URL}/attendance?site=${siteId}&date=${date}&markedBy=${foremanId}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load attendance records');
        }
        
        const data = await response.json();
        const records = Array.isArray(data.data) ? data.data : [];
        
        if (records.length === 0) {
            throw new Error('No attendance records found');
        }
        
        // Update all records
        const updatePromises = records.map(record => {
            const updateData = {
                verified: true,
                verifiedBy: JSON.parse(localStorage.getItem('user'))._id,
                verifiedAt: new Date().toISOString(),
                verificationComments: comments
            };
            
            return fetch(`${API_URL}/attendance/${record._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthHeader()
                },
                body: JSON.stringify(updateData)
            });
        });
        
        await Promise.all(updatePromises);
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('approveSubmissionModal')).hide();
        
        // Refresh submissions list
        loadSubmissionsForDate();
        
        showToast('Success', 'Attendance submission approved successfully', 'success');
    } catch (error) {
        console.error('Error approving submission:', error);
        showToast('Error', `Failed to approve submission: ${error.message}`, 'error');
    } finally {
        // Reset button state
        const approveBtn = document.querySelector('#approveSubmissionModal .btn-success');
        approveBtn.disabled = false;
        approveBtn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Approve';
    }
}

// Reject submission
async function rejectSubmission() {
    try {
        const submissionId = document.getElementById('submission-id').value;
        const [siteId, foremanId, date] = submissionId.split('-');
        const comments = document.getElementById('approval-comments').value;
        
        if (!comments) {
            showToast('Warning', 'Please add comments explaining why the submission is being returned', 'warning');
            document.getElementById('approval-comments').focus();
            return;
        }
        
        // Show loading state
        const rejectBtn = document.querySelector('#approveSubmissionModal .btn-warning');
        rejectBtn.disabled = true;
        rejectBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Returning...';
        
        // Fetch all records for this submission
        const response = await fetch(`${API_URL}/attendance?site=${siteId}&date=${date}&markedBy=${foremanId}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load attendance records');
        }
        
        const data = await response.json();
        const records = Array.isArray(data.data) ? data.data : [];
        
        if (records.length === 0) {
            throw new Error('No attendance records found');
        }
        
        // Update all records
        const updatePromises = records.map(record => {
            const updateData = {
                verified: false,
                submittedToIncharge: false, // Reset submission status
                rejectedBy: JSON.parse(localStorage.getItem('user'))._id,
                rejectedAt: new Date().toISOString(),
                rejectionComments: comments
            };
            
            return fetch(`${API_URL}/attendance/${record._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthHeader()
                },
                body: JSON.stringify(updateData)
            });
        });
        
        await Promise.all(updatePromises);
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('approveSubmissionModal')).hide();
        
        // Refresh submissions list
        loadSubmissionsForDate();
        
        showToast('Success', 'Attendance submission returned to foreman for corrections', 'success');
    } catch (error) {
        console.error('Error rejecting submission:', error);
        showToast('Error', `Failed to return submission: ${error.message}`, 'error');
    } finally {
        // Reset button state
        const rejectBtn = document.querySelector('#approveSubmissionModal .btn-warning');
        rejectBtn.disabled = false;
        rejectBtn.innerHTML = '<i class="bi bi-arrow-return-left me-1"></i> Return to Foreman';
    }
}

// Initialize page
async function initializePage() {
    const user = await getCurrentUser();
    if (user) {
        inchargeName.textContent = user.name || 'Site Incharge';
        loadUserProfile(user);
    }
    updateLanguageContent();
}

// Get current user
async function getCurrentUser() {
    try {
        const response = await fetch('/api/auth/current-user');
        if (!response.ok) throw new Error('Failed to fetch current user');
        return await response.json();
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

// Load user profile
function loadUserProfile(user) {
    document.getElementById('name').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
}

// Load foremen
async function loadForemen() {
    try {
        const response = await fetch('/api/incharge/foremen');
        if (!response.ok) throw new Error('Failed to fetch foremen');
        const data = await response.json();
        
        totalForemen.textContent = data.length;
        let pendingCount = 0;
        
        foremenList.innerHTML = data.map(foreman => {
            pendingCount += foreman.pendingHajiri || 0;
            return `
                <tr>
                    <td>${foreman.name}</td>
                    <td>${foreman.site}</td>
                    <td>${foreman.pendingHajiri || 0}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="viewForeman('${foreman._id}')">
                            ${translations[currentLanguage].view}
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        pendingApprovals.textContent = pendingCount;
    } catch (error) {
        console.error('Error loading foremen:', error);
        foremenList.innerHTML = '<tr><td colspan="4" class="text-center">Failed to load foremen data</td></tr>';
    }
}

// Load approved hajiri records
async function loadApprovedHajiri() {
    try {
        const response = await fetch('/api/incharge/approved-hajiri?limit=5');
        if (!response.ok) throw new Error('Failed to fetch approved hajiri');
        const data = await response.json();
        
        const submittedHajiriTable = document.getElementById('submitted-hajiri-table');
        if (!submittedHajiriTable) {
            console.error('Submitted hajiri table not found in the DOM');
            return;
        }
        
        submittedHajiriTable.innerHTML = data.map(record => `
            <tr>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.foreman.name}</td>
                <td>${record.site}</td>
                <td>${record.workersPresent}</td>
                <td>
                    <span class="status-badge status-approved">
                        ${translations[currentLanguage].submitted}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewHajiriRecord('${record._id}')">
                        ${translations[currentLanguage].view}
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading approved hajiri:', error);
        const submittedHajiriTable = document.getElementById('submitted-hajiri-table');
        if (submittedHajiriTable) {
            submittedHajiriTable.innerHTML = '<tr><td colspan="6" class="text-center">Failed to load submitted hajiri data</td></tr>';
        }
    }
}

// View foreman's attendance records
async function viewForeman(foremanId) {
    try {
        const response = await fetch(`/api/incharge/foreman/${foremanId}/attendance`);
        if (!response.ok) throw new Error('Failed to fetch foreman attendance');
        const data = await response.json();
        // Handle the foreman's attendance data display
        // This will be implemented based on the specific requirements
    } catch (error) {
        console.error('Error viewing foreman:', error);
    }
}

// View specific hajiri record
async function viewHajiriRecord(recordId) {
    try {
        const response = await fetch(`/api/incharge/hajiri/${recordId}`);
        if (!response.ok) throw new Error('Failed to fetch hajiri record');
        const data = await response.json();
        // Handle the hajiri record display
        // This will be implemented based on the specific requirements
    } catch (error) {
        console.error('Error viewing hajiri record:', error);
    }
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    document.querySelector('.current-lang').textContent = currentLanguage === 'hi' ? 'हिंदी' : 'English';
    updateLanguageContent();
}

// Update language content
function updateLanguageContent() {
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === 'overview-section') {
            link.querySelector('.nav-text').textContent = translations[currentLanguage].home;
        } else if (section === 'approve-hajiri-section') {
            link.querySelector('.nav-text').textContent = translations[currentLanguage].approveHajiri;
        } else if (section === 'submitted-hajiri-section') {
            link.querySelector('.nav-text').textContent = translations[currentLanguage].submittedHajiri;
        } else if (section === 'profile-section') {
            link.querySelector('.nav-text').textContent = translations[currentLanguage].profile;
        }
    });

    // Update section titles
    document.querySelectorAll('.section h2').forEach(title => {
        if (title.parentElement.id === 'overview-section') {
            title.textContent = translations[currentLanguage].home;
        } else if (title.parentElement.id === 'approve-hajiri-section') {
            title.textContent = translations[currentLanguage].approveHajiri;
        } else if (title.parentElement.id === 'submitted-hajiri-section') {
            title.textContent = translations[currentLanguage].submittedHajiri;
        } else if (title.parentElement.id === 'profile-section') {
            title.textContent = translations[currentLanguage].profile;
        }
    });

    // Update other text elements
    document.querySelector('.logout-button .nav-text').textContent = translations[currentLanguage].logout;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
} 