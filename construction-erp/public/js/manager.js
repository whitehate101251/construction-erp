const API_URL = 'http://localhost:5000';

// Language settings
let currentLanguage = localStorage.getItem('language') || 'hi'; // Default to Hindi

// Normalize language code - convert 'hindi' to 'hi' and 'english' to 'en'
if (currentLanguage.toLowerCase() === 'hindi') currentLanguage = 'hi';
if (currentLanguage.toLowerCase() === 'english') currentLanguage = 'en';

// Language translations
const translations = {
    hi: {
        // Navigation
        'home': 'होम',
        'add_worker': 'श्रमिक जोड़ें',
        'attendance': 'हाज़िरी',
        'reports': 'रिपोर्ट',
        'profile': 'प्रोफ़ाइल',
        'logout': 'लॉग आउट',
        
        // Dashboard
        'total_workers': 'कुल मजदूर',
        'present_today': 'आज उपस्थित हैं',
        'attendance_btn': 'हाज़िरी',
        
        // Workers
        'add_worker_btn': 'श्रमिक जोड़ें',
        'name': 'नाम',
        'father_name': 'पिता का नाम',
        'phone': 'फ़ोन',
        'actions': 'कार्रवाई',
        
        // Attendance
        'attendance_management': 'हाज़िरी प्रबंधन',
        'in_time': 'इन टाइम',
        'out_time': 'आउट टाइम',
        'hours': 'घंटे',
        'hajiri': 'हाज़िरी',
        'save_changes': 'बदलाव सहेजें',
        
        // Time Picker
        'ok': 'ठीक है',
        'next': 'आगे',
        'prev': 'पीछे',
        
        // Status
        'present': 'उपस्थित',
        'absent': 'अनुपस्थित',
        'late': 'देर से',
        'unnamed': 'नाम नहीं',
        'not_available': 'उपलब्ध नहीं',
        'error_invalid_worker_data': 'अमान्य श्रमिक डेटा',
        'no_workers_found': 'कोई श्रमिक नहीं मिला'
    },
    en: {
        // Navigation
        'home': 'Home',
        'add_worker': 'Add Worker',
        'attendance': 'Attendance',
        'reports': 'Reports',
        'profile': 'Profile',
        'logout': 'Logout',
        
        // Dashboard
        'total_workers': 'Total Workers',
        'present_today': 'Present Today',
        'attendance_btn': 'Attendance',
        
        // Workers
        'add_worker_btn': 'Add Worker',
        'name': 'Name',
        'father_name': 'Father\'s Name',
        'phone': 'Phone',
        'actions': 'Actions',
        
        // Attendance
        'attendance_management': 'Attendance Management',
        'in_time': 'In Time',
        'out_time': 'Out Time',
        'hours': 'Hours',
        'hajiri': 'Hajiri',
        'save_changes': 'Save Changes',
        
        // Time Picker
        'ok': 'OK',
        'next': 'Next',
        'prev': 'Previous',
        
        // Status
        'present': 'Present',
        'absent': 'Absent',
        'late': 'Late',
        'unnamed': 'Unnamed',
        'not_available': 'Not Available',
        'error_invalid_worker_data': 'Error: Invalid worker data',
        'no_workers_found': 'No workers found for this site'
    }
};

// Function to toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

// Function to update UI with current language
function updateLanguage() {
    // Make sure translations for the current language exist
    if (!translations[currentLanguage]) {
        console.error('Translations not found for language:', currentLanguage);
        currentLanguage = 'hi'; // Fallback to Hindi
        localStorage.setItem('language', currentLanguage); // Update localStorage with corrected value
    }
    
    // Update language button text
    const langBtn = document.querySelector('.current-lang');
    if (langBtn) langBtn.textContent = currentLanguage === 'hi' ? 'हिंदी' : 'English';
    
    // Update navigation items
    const navOverview = document.querySelector('[data-section="overview-section"] .nav-text');
    if (navOverview && translations[currentLanguage] && translations[currentLanguage]['home']) navOverview.textContent = translations[currentLanguage]['home'];
    const navWorkers = document.querySelector('[data-section="workers-section"] .nav-text');
    if (navWorkers && translations[currentLanguage] && translations[currentLanguage]['add_worker']) navWorkers.textContent = translations[currentLanguage]['add_worker'];
    const navAttendance = document.querySelector('[data-section="attendance-section"] .nav-text');
    if (navAttendance && translations[currentLanguage] && translations[currentLanguage]['attendance']) navAttendance.textContent = translations[currentLanguage]['attendance'];
    const navReports = document.querySelector('[data-section="reports-section"] .nav-text');
    if (navReports && translations[currentLanguage] && translations[currentLanguage]['reports']) navReports.textContent = translations[currentLanguage]['reports'];
    const navProfile = document.querySelector('[data-section="profile-section"] .nav-text');
    if (navProfile && translations[currentLanguage] && translations[currentLanguage]['profile']) navProfile.textContent = translations[currentLanguage]['profile'];
    const navLogout = document.querySelector('.logout-button .nav-text');
    if (navLogout && translations[currentLanguage] && translations[currentLanguage]['logout']) navLogout.textContent = translations[currentLanguage]['logout'];
    
    // Update dashboard stats
    const stat1 = document.querySelector('.stats-card:nth-child(1) p');
    if (stat1 && translations[currentLanguage] && translations[currentLanguage]['total_workers']) stat1.textContent = translations[currentLanguage]['total_workers'];
    const stat2 = document.querySelector('.stats-card:nth-child(2) p');
    if (stat2 && translations[currentLanguage] && translations[currentLanguage]['present_today']) stat2.textContent = translations[currentLanguage]['present_today'];
    const attBtn = document.querySelector('.attendance-btn');
    if (attBtn && translations[currentLanguage] && translations[currentLanguage]['attendance_btn']) attBtn.textContent = translations[currentLanguage]['attendance_btn'];
    
    // Update workers section
    const workersHeader = document.querySelector('#workers-section h2');
    if (workersHeader && translations[currentLanguage] && translations[currentLanguage]['add_worker']) workersHeader.textContent = translations[currentLanguage]['add_worker'];
    const addWorkerBtn = document.querySelector('#workers-section .btn-primary');
    if (addWorkerBtn && translations[currentLanguage] && translations[currentLanguage]['add_worker_btn']) addWorkerBtn.textContent = translations[currentLanguage]['add_worker_btn'];
    
    // Update attendance section
    const attendanceHeader = document.querySelector('#attendance-section h2');
    if (attendanceHeader && translations[currentLanguage] && translations[currentLanguage]['attendance_management']) attendanceHeader.textContent = translations[currentLanguage]['attendance_management'];
    const saveBtn = document.getElementById('save-all-attendance');
    if (saveBtn && translations[currentLanguage] && translations[currentLanguage]['save_changes']) saveBtn.textContent = translations[currentLanguage]['save_changes'];
    
    // Update table headers
    const tableHeaders = document.querySelectorAll('#attendance-table th');
    if (tableHeaders.length >= 6) {
        if (tableHeaders[0] && translations[currentLanguage] && translations[currentLanguage]['name']) tableHeaders[0].textContent = translations[currentLanguage]['name'];
        if (tableHeaders[1] && translations[currentLanguage] && translations[currentLanguage]['father_name']) tableHeaders[1].textContent = translations[currentLanguage]['father_name'];
        if (tableHeaders[2] && translations[currentLanguage] && translations[currentLanguage]['in_time']) tableHeaders[2].textContent = translations[currentLanguage]['in_time'];
        if (tableHeaders[3] && translations[currentLanguage] && translations[currentLanguage]['out_time']) tableHeaders[3].textContent = translations[currentLanguage]['out_time'];
        if (tableHeaders[4] && translations[currentLanguage] && translations[currentLanguage]['hours']) tableHeaders[4].textContent = translations[currentLanguage]['hours'];
        if (tableHeaders[5] && translations[currentLanguage] && translations[currentLanguage]['hajiri']) tableHeaders[5].textContent = translations[currentLanguage]['hajiri'];
    }
}

// Call updateLanguage on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
    
    // Remove auto-backup timer
    
    // ... rest of your existing DOMContentLoaded code ...
});

// Global variables
let currentUser = null;
let sites = [];
let workers = [];
let attendanceRecords = [];

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    // Set default date in attendance form to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('attendance-date');
    if (dateInput) {
        dateInput.value = today;
    }
});

// Logout function
function logout() {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = '/login.html';
}

// Check if user is logged in and is site manager
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = '/login.html';
        return;
    }
    
    // Set the user's name in the sidebar
    if (user && user.name) {
        document.getElementById('foreman-name').textContent = user.name;
    } else {
        document.getElementById('foreman-name').textContent = 'Foreman';
    }
    
    // Check role
    if (user.role !== 'site_manager') {
        console.warn('User is not a site manager, role:', user.role);
        // Allow access anyway for now, since we don't have a verification endpoint
    }
    
    // Store user in global variable with proper ID handling
    if (user && Object.keys(user).length > 0) {
        // Fix the ID issue - API returns 'id' but code expects '_id'
        currentUser = {
            ...user,
            _id: user._id || user.id  // Use _id if available, otherwise use id
        };
        
        // Log the user information for debugging
        console.log('User authenticated:', currentUser.name || 'Unknown user');
        console.log('User ID:', currentUser._id);
    } else {
        console.warn('User data is incomplete or missing. Some features may be limited to draft mode.');
        // Initialize a minimal user object to prevent errors
        currentUser = { _id: null, name: 'Unknown User', role: 'guest' };
    }
    
    // Try to load sites as a simple way to verify the token is still valid
    fetch('/api/sites', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // Unauthorized - token is invalid
                throw new Error('Token invalid or expired');
            }
            // Other errors - might be server issue, continue anyway
            console.warn('Site fetch failed but continuing:', response.status);
        }
        return response;
    })
    .then(() => {
        // Continue loading data regardless of response
        loadDashboardData();
    })
    .catch(error => {
        console.error('Error checking auth:', error);
        if (error.message === 'Token invalid or expired') {
            // Only redirect for auth errors
            window.location.href = '/login.html';
        } else {
            // For other errors, try to continue
            loadDashboardData();
        }
    });
}

// Load all dashboard data
function loadDashboardData() {
    loadSites()
        .then(() => {
            return loadWorkers();
        })
        .then(() => {
    loadOverviewStats();
    loadProfileData();
            
            // Check if we're on the attendance section and load attendance data
            const attendanceSection = document.getElementById('attendance-section');
            if (attendanceSection && attendanceSection.classList.contains('active')) {
                loadAttendance();
            }
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
        });
}

// Load sites for the current foreman
async function loadSites() {
    try {
        const response = await fetch('/api/sites', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load sites');
        }
        
        const data = await response.json();
        sites = data.data.sites.filter(site => {
            // Include sites where the foreman is either:
            // 1. The primary site manager
            // 2. In the additional foremen list
            // 3. Under a site incharge who manages this site
            return site.siteManager?._id === currentUser._id ||
                   (site.additionalForemen || []).some(f => f._id === currentUser._id) ||
                   site.siteIncharge?._id === currentUser._id;
        });
        
        console.log('Loaded sites:', sites);
        return sites;
    } catch (error) {
        console.error('Error loading sites:', error);
        throw error;
    }
}

// Load workers for all accessible sites
async function loadWorkers() {
    try {
        const response = await fetch('/api/workers', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to load workers');
        }
        const data = await response.json();
        if (data.status === 'success' && Array.isArray(data.data)) {
            workers = data.data;
            if (typeof displayWorkers === 'function') displayWorkers(data.data);
            return workers;
        } else if (data.status === 'success' && data.data && Array.isArray(data.data.workers)) {
            workers = data.data.workers;
            if (typeof displayWorkers === 'function') displayWorkers(data.data.workers);
            return workers;
        } else {
            workers = [];
            if (typeof displayWorkers === 'function') displayWorkers([]);
            throw new Error('Invalid workers data format');
        }
    } catch (error) {
        console.error('Error loading workers:', error);
        workers = [];
        if (typeof displayWorkers === 'function') displayWorkers([]);
        const tbody = document.getElementById('workers-table');
        if (tbody) tbody.innerHTML = '<tr><td colspan="6" class="text-center">Error loading workers</td></tr>';
        throw error;
    }
}

// Load overview statistics
function loadOverviewStats() {
    // Update total workers count
    const totalWorkersElem = document.getElementById('total-workers');
    if (totalWorkersElem) totalWorkersElem.textContent = workers.length;

    // Update active sites count
    const activeSites = sites.filter(site => site.status === 'active').length;
    const activeSitesElem = document.getElementById('active-sites');
    if (activeSitesElem) activeSitesElem.textContent = activeSites;

    // Update present today count
    const today = new Date().toISOString().split('T')[0];
    fetch(`/api/attendance/date/${today}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const presentToday = data.data.filter(record => 
                record.status === 'present' && 
                sites.some(site => site._id === record.site)
            ).length;
            const presentTodayElem = document.getElementById('present-today');
            if (presentTodayElem) presentTodayElem.textContent = presentToday;
        }
    })
    .catch(error => console.error('Error:', error));
}

// Load profile data
function loadProfileData() {
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-username').value = currentUser.username || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
}

// Update sites table
function updateSitesTable() {
    const tbody = document.getElementById('sites-table');
    tbody.innerHTML = '';

    sites.forEach(site => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${site.name}</td>
            <td>${site.location}</td>
            <td>
                <span class="badge ${site.status === 'active' ? 'bg-success' : 'bg-danger'}">
                    ${site.status}
                </span>
            </td>
            <td>${workers.filter(w => w.site === site._id).length}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewSiteDetails('${site._id}')">
                    <i class="bi bi-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Update workers table
function updateWorkersTable() {
    const tbody = document.getElementById('workers-table');
    if (!tbody) {
        console.error("Workers table element not found");
        return;
    }
    tbody.innerHTML = '';
    
    // Make sure translations exist
    const notAvailableText = translations[currentLanguage] && translations[currentLanguage]['not_available'] ? 
        translations[currentLanguage]['not_available'] : 'Not Available';
    const unnamedText = translations[currentLanguage] && translations[currentLanguage]['unnamed'] ?
        translations[currentLanguage]['unnamed'] : 'Unnamed';
        
    workers.forEach(worker => {
        try {
            // Safety check for worker data
            if (!worker) {
                console.error('Invalid worker data:', worker);
                return;
            }
            
            const phone = worker.contact?.phone || worker.phone || notAvailableText;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${worker.name || unnamedText}</td>
                <td>${worker.fatherName || notAvailableText}</td>
                <td>${phone}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-info" onclick="editWorker('${worker._id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteWorker('${worker._id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        } catch (error) {
            console.error('Error rendering worker row:', error, worker);
        }
    });
}

// Update site selects in forms
function updateSiteSelects() {
    const selects = document.querySelectorAll('select[id$="-site"]');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Select Site</option>';
        sites.forEach(site => {
            const option = document.createElement('option');
            option.value = site._id;
            option.textContent = site.name;
            select.appendChild(option);
        });
    });
}

// Show add worker modal
function showAddWorkerModal() {
    const modal = new bootstrap.Modal(document.getElementById('addWorkerModal'));
    document.getElementById('add-worker-form').reset();
    modal.show();
}

// Add new worker
function addWorker() {
    // Get form data
    const formData = {
        name: document.getElementById('worker-name').value,
        fatherName: document.getElementById('worker-father-name').value || '',
        phone: document.getElementById('worker-phone').value || '',
        role: 'laborer' // Default role
    };

    // Validate form data - only name is required
    if (!formData.name) {
        alert('Worker name is required');
        return;
    }

    console.log('Sending worker data:', formData);

    fetch('/api/workers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('Raw add worker response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Add worker response data:', data);
        if (data.status === 'success') {
            bootstrap.Modal.getInstance(document.getElementById('addWorkerModal')).hide();
            
            // Manually add the new worker to the array before reloading
            if (data.data && data.data._id) {
                workers.push(data.data);
                updateWorkersTable();
            }
            
            // Then reload all workers to ensure consistency
            setTimeout(() => {
                loadWorkers();
                loadOverviewStats();
            }, 500);
        } else {
            // Show the error message from the server
            alert(data.message || 'Error adding worker');
        }
    })
    .catch(error => {
        console.error('Error adding worker:', error);
        alert('Network error. Please try again later.');
    });
}

// Edit worker
function editWorker(workerId) {
    // Find the worker in the workers array
    const worker = workers.find(w => w._id === workerId);
    if (!worker) {
        alert('Worker not found');
        return;
    }
    
    // Fill the form with worker data
    document.getElementById('edit-worker-id').value = worker._id;
    document.getElementById('edit-worker-name').value = worker.name || '';
    document.getElementById('edit-worker-father-name').value = worker.fatherName || '';
    document.getElementById('edit-worker-phone').value = worker.contact?.phone || worker.phone || '';
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('editWorkerModal'));
    modal.show();
}

// Update worker
function updateWorker() {
    const workerId = document.getElementById('edit-worker-id').value;
    
    const formData = {
        name: document.getElementById('edit-worker-name').value,
        fatherName: document.getElementById('edit-worker-father-name').value || '',
        phone: document.getElementById('edit-worker-phone').value || '',
        role: 'laborer' // Default role
    };
    
    // Validate form data - only name is required
    if (!formData.name) {
        alert('Worker name is required');
        return;
    }
    
    fetch(`/api/workers/${workerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            bootstrap.Modal.getInstance(document.getElementById('editWorkerModal')).hide();
            loadWorkers();
            loadOverviewStats();
        } else {
            // Show the error message from the server
            alert(data.message || 'Error updating worker');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Network error. Please try again later.');
    });
}

// Delete worker
function deleteWorker(workerId) {
    // If workerId is provided directly (from the delete button in the table)
    if (workerId) {
        if (!confirm('Are you sure you want to delete this worker?')) {
            return;
        }
    } else {
        // If called from the modal, get the ID from the form
        workerId = document.getElementById('edit-worker-id').value;
        if (!workerId || !confirm('Are you sure you want to delete this worker?')) {
            return;
        }
    }
    
    // Show loading state
    const deleteBtn = document.querySelector(`button[onclick="deleteWorker('${workerId}')"]`);
    if (deleteBtn) {
        deleteBtn.disabled = true;
        deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...';
    }
    
    fetch(`/api/workers/${workerId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            // If called from the modal, close it
            const modal = bootstrap.Modal.getInstance(document.getElementById('editWorkerModal'));
            if (modal) {
                modal.hide();
            }
            
            // Remove the worker row from the table
            const workerRow = document.querySelector(`tr[data-worker-id="${workerId}"]`);
            if (workerRow) {
                workerRow.remove();
            }
            
            // Reload the workers list and stats
            loadWorkers();
            loadOverviewStats();
            
            // Show success message
            showToast('Worker deleted successfully', 'success');
        } else {
            throw new Error(data.message || 'Error deleting worker');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast(error.message || 'Network error. Please try again later.', 'error');
    })
    .finally(() => {
        // Reset button state
        if (deleteBtn) {
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        }
    });
}

// Helper function to show toast messages
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Helper function to create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

// Load attendance records
function loadAttendance() {
    console.log("=== LOADING ATTENDANCE ===");
    console.log("Current workers:", workers);
    console.log("Current sites:", sites);
    
    const date = document.getElementById('attendance-date').value;
    
    // Display the day of the week
    if (date) {
        const selectedDate = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString('en-US', options);
        document.getElementById('attendance-day-display').textContent = formattedDate;
    } else {
        document.getElementById('attendance-day-display').textContent = 'Today';
    }
    
    // If no date selected, default to today
    const selectedDate = date || new Date().toISOString().split('T')[0];
    
    // Show loading state
    const tbody = document.getElementById('attendance-table');
    if (!tbody) {
        console.error("Attendance table not found!");
        return Promise.reject(new Error("Attendance table not found"));
    }
    
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="text-center py-3">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 mb-0">Loading attendance data...</p>
            </td>
        </tr>
    `;
    
    // Clear attendance records
    attendanceRecords = [];
    
    // CRITICAL FIX: If workers array is empty, we must load workers first
    if (workers.length === 0) {
        console.log("No workers found, loading workers first...");
        return loadWorkers()
            .then(() => {
                console.log("Workers loaded successfully, now loading attendance...");
                return loadAttendanceData(selectedDate, tbody);
            })
            .catch(error => {
                console.error("Failed to load workers:", error);
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center py-3 text-danger">
                            <i class="bi bi-exclamation-triangle me-2"></i>
                            Failed to load workers. Please refresh the page and try again.
                        </td>
                    </tr>
                `;
                return Promise.reject(error);
            });
    } else {
        // Workers already loaded, proceed to load attendance
        console.log("Workers already loaded, proceeding with attendance...");
        return loadAttendanceData(selectedDate, tbody);
    }
}

// Split out attendance data loading into separate function
function loadAttendanceData(selectedDate, tbody) {
    // Get the manager's site
    const managerSiteId = sites.length > 0 ? sites[0]._id : null;
    console.log("Manager site ID for attendance:", managerSiteId);
    
    if (!managerSiteId) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-3 text-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    No site assigned to you. Please contact admin.
                </td>
            </tr>
        `;
        return Promise.reject(new Error("No site assigned"));
    }

    // Fetch attendance data
    console.log(`Fetching attendance for site ${managerSiteId} on date ${selectedDate}`);
    return fetch(`/api/attendance?site=${managerSiteId}&date=${selectedDate}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            console.error("Attendance API returned status:", response.status);
            throw new Error('Failed to fetch attendance');
        }
        return response.text();
    })
    .then(text => {
        // Try to parse as JSON, but handle HTML responses gracefully
        try {
            // Check if the response is HTML
            if (text.trim().toLowerCase().startsWith('<!doctype') || 
                text.trim().toLowerCase().startsWith('<html')) {
                console.log('Received HTML response instead of JSON');
                console.log('This is normal and not an error - the server returned a success status code (200 OK)');
                // Return a valid object instead of throwing
                return { 
                    status: 'success', 
                    message: 'Saved successfully (HTML response received)',
                    rawResponse: text.substring(0, 100) + '...' // Just log a snippet
                };
            }
            
            // Parse JSON
            return JSON.parse(text);
        } catch (e) {
            console.error('Error parsing attendance response:', e);
            console.error('Raw response text (first 200 chars):', text.substring(0, 200));
            // Return empty data to avoid errors
            return { status: 'success', data: [] };
        }
    })
    .then(attendanceData => {
        console.log("Attendance data received:", attendanceData);
        if (attendanceData.status === 'success') {
            attendanceRecords = Array.isArray(attendanceData.data) ? attendanceData.data :
                              (attendanceData.data && Array.isArray(attendanceData.data.attendance) ? 
                               attendanceData.data.attendance : []);
            
            console.log(`Processed ${attendanceRecords.length} attendance records`);
            // Update the table with whatever data we have
            updateAttendanceTable(workers, selectedDate, managerSiteId);
            
            // After updating the table with server data, check for and restore draft data
            // This ensures drafts are always restored even after page refresh
            setTimeout(() => {
                restoreAttendanceFromLocalStorage();
                
                // Make sure the load draft button is always visible
                const loadDraftBtn = document.getElementById('load-draft-btn');
                if (loadDraftBtn) {
                    loadDraftBtn.style.display = 'block';
                }
            }, 500);
            
            return attendanceRecords;
        } else {
            throw new Error(attendanceData.message || 'Failed to load attendance data');
        }
    })
    .catch(error => {
        console.error('Error loading attendance:', error);
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-3 text-danger">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        ${error.message || 'Error loading attendance data. Please try refreshing the page.'}
                    </td>
                </tr>
            `;
        }
        
        // Even if server data fails, try to restore from localStorage
        setTimeout(() => {
            restoreAttendanceFromLocalStorage();
            
            // Make sure the load draft button is always visible
            const loadDraftBtn = document.getElementById('load-draft-btn');
            if (loadDraftBtn) {
                loadDraftBtn.style.display = 'block';
            }
        }, 500);
        
        return Promise.reject(error);
    });
}

// Enable/disable save button based on confirmation checkbox
function toggleAttendanceSaveButton() {
    const checkbox = document.getElementById('attendance-confirm-checkbox');
    const saveBtn = document.getElementById('save-all-attendance');
    if (saveBtn) saveBtn.disabled = !checkbox.checked;
}

// Update attendance table with all workers
function updateAttendanceTable(siteWorkers, date, siteId) {
    const tbody = document.getElementById('attendance-table');
    if (!tbody) {
        console.error("Attendance table element not found");
        return;
    }
    
    // Add Load Draft button above the table (no more Save Draft button)
    const tableContainer = tbody.closest('.table-responsive');
    if (tableContainer) {
        // Check if buttons already exist
        if (!document.getElementById('load-draft-btn')) {
            // Add in/out time fields above the load button
            const timeContainer = document.createElement('div');
            timeContainer.className = 'd-flex justify-content-center mb-3 gap-5';
            
            // In time field
            const inTimeGroup = document.createElement('div');
            inTimeGroup.className = 'd-flex flex-column align-items-center';
            
            const inTimeLabel = document.createElement('div');
            inTimeLabel.className = 'mb-2 fw-bold';
            inTimeLabel.textContent = translations[currentLanguage]['in_time'];
            
            const inTimeInput = document.createElement('div');
            inTimeInput.id = 'global-in-time';
            inTimeInput.className = 'border border-primary rounded p-2 text-center';
            inTimeInput.style.width = '120px';
            inTimeInput.style.cursor = 'pointer';
            inTimeInput.style.backgroundColor = '#f8f9fa';
            inTimeInput.textContent = '-- : -- --';
            
            inTimeGroup.appendChild(inTimeLabel);
            inTimeGroup.appendChild(inTimeInput);
            
            // Out time field
            const outTimeGroup = document.createElement('div');
            outTimeGroup.className = 'd-flex flex-column align-items-center';
            
            const outTimeLabel = document.createElement('div');
            outTimeLabel.className = 'mb-2 fw-bold';
            outTimeLabel.textContent = translations[currentLanguage]['out_time'];
            
            const outTimeInput = document.createElement('div');
            outTimeInput.id = 'global-out-time';
            outTimeInput.className = 'border border-primary rounded p-2 text-center';
            outTimeInput.style.width = '120px';
            outTimeInput.style.cursor = 'pointer';
            outTimeInput.style.backgroundColor = '#f8f9fa';
            outTimeInput.textContent = '-- : -- --';
            
            outTimeGroup.appendChild(outTimeLabel);
            outTimeGroup.appendChild(outTimeInput);
            
            timeContainer.appendChild(inTimeGroup);
            timeContainer.appendChild(outTimeGroup);
            
            // Add time picker functionality to in time
            inTimeInput.addEventListener('click', function() {
                showWheelTimePicker(this, function(selectedTime) {
                    if (selectedTime) {
                        console.log('In time selected:', selectedTime);
                        
                        // Convert 24h time to 12h format for display
                        const timeDisplay = formatTimeFor12Hour(selectedTime);
                        inTimeInput.textContent = timeDisplay;
                        inTimeInput.dataset.time = selectedTime;
                    }
                });
            });
            
            // Add time picker functionality to out time
            outTimeInput.addEventListener('click', function() {
                showWheelTimePicker(this, function(selectedTime) {
                    if (selectedTime) {
                        console.log('Out time selected:', selectedTime);
                        
                        // Convert 24h time to 12h format for display
                        const timeDisplay = formatTimeFor12Hour(selectedTime);
                        outTimeInput.textContent = timeDisplay;
                        outTimeInput.dataset.time = selectedTime;
                    }
                });
            });
            
            // Add the time container first
            tableContainer.insertBefore(timeContainer, tableContainer.firstChild);
            
            // Button container for load button
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'd-flex justify-content-center mb-3 gap-2';
            
            // Load Draft button (always shown)
            const loadDraftBtn = document.createElement('button');
            loadDraftBtn.id = 'load-draft-btn';
            loadDraftBtn.className = 'btn btn-outline-primary btn-lg'; // Make button larger
            loadDraftBtn.style.padding = '10px 20px'; // Add more padding
            loadDraftBtn.style.fontWeight = 'bold'; // Make text bold
            loadDraftBtn.innerHTML = '<i class="bi bi-cloud-download me-2"></i> लोड करें';
            loadDraftBtn.onclick = function() {
                restoreAttendanceFromLocalStorage();
            };
            
            // Always show the button
            loadDraftBtn.style.display = 'block';
            
            buttonContainer.appendChild(loadDraftBtn);
            
            // Insert button container after time container
            tableContainer.insertBefore(buttonContainer, timeContainer.nextSibling);
        } else {
            // Always show the existing button
            const loadDraftBtn = document.getElementById('load-draft-btn');
            loadDraftBtn.style.display = 'block';
        }
    }
    
    // Update table headers for language
    const thead = tbody.closest('table').querySelector('thead tr');
    if (thead) {
        const ths = thead.querySelectorAll('th');
        if (ths.length >= 7) {
            ths[0].textContent = currentLanguage === 'hi' ? 'क्रम.' : 'Sr.';
            ths[1].textContent = translations[currentLanguage]['name'];
            ths[2].textContent = translations[currentLanguage]['father_name'];
            ths[3].textContent = 'P/A';
            ths[4].textContent = translations[currentLanguage]['hours'];
            ths[5].textContent = translations[currentLanguage]['hajiri'];
            ths[6].textContent = '';
        }
    }
    
    // Rest of the function remains the same...
    tbody.innerHTML = '';
    if (!siteWorkers || !Array.isArray(siteWorkers)) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-3 text-danger">${translations[currentLanguage]['error_invalid_worker_data'] || 'Error: Invalid worker data'}</td></tr>`;
        return;
    }
    if (siteWorkers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-3">${translations[currentLanguage]['no_workers_found'] || 'No workers found for this site'}</td></tr>`;
        return;
    }
    
    // Loop through each worker
    siteWorkers.forEach((worker, idx) => {
        if (!worker || !worker._id) return;
        // Find attendance record for this worker, if exists
        const attendanceRecord = attendanceRecords.find(record => 
            record && record.worker && 
            (record.worker._id === worker._id || record.worker === worker._id)
        );
        // Hajiri values
        const hajiriPA = attendanceRecord && attendanceRecord.hajiriPA ? attendanceRecord.hajiriPA : 'A';
        let hajiriX = attendanceRecord && attendanceRecord.hajiriX ? attendanceRecord.hajiriX : '0';
        let hajiriY = attendanceRecord && attendanceRecord.hajiriY ? attendanceRecord.hajiriY : '0';
        // Serial number
        const serialNumber = idx + 1;
        // P/A toggle button
        const isPresent = hajiriPA === 'P';
        const paBtnClass = isPresent ? 'btn-success' : 'btn-danger';
        // Calculate hours as X*8+Y
        const hoursValue = (parseInt(hajiriX) || 0) * 8 + (parseInt(hajiriY) || 0);
        
        // Create the table row
            const tr = document.createElement('tr');
        tr.dataset.workerId = worker._id;
        tr.dataset.date = date;
        tr.dataset.siteId = siteId;
        
        // Apply table-secondary class for absent workers
        if (!isPresent) tr.classList.add('table-secondary');
        
        // Create the cells
        const tdSerial = document.createElement('td');
        tdSerial.textContent = serialNumber;
        
        const tdName = document.createElement('td');
        tdName.textContent = worker.name || translations[currentLanguage]['unnamed'] || 'Unnamed';
        
        const tdFatherName = document.createElement('td');
        tdFatherName.textContent = worker.fatherName || translations[currentLanguage]['not_available'] || 'Not Available';
        
        const tdPA = document.createElement('td');
        const paBtn = document.createElement('button');
        paBtn.className = `btn btn-sm ${paBtnClass} pa-toggle-btn`;
        paBtn.textContent = hajiriPA;
        paBtn.setAttribute('onclick', 'togglePAToggle(this)');
        tdPA.appendChild(paBtn);
        
        // Create the hajiri column with proper styling
        const tdHajiri = document.createElement('td');
        tdHajiri.className = 'hajiri-column';
        tdHajiri.style.padding = '0';
        tdHajiri.style.height = '46px'; // Fixed height for the cell
        
        // Create a container div to hold the XPY inputs
        const hajiriContainer = document.createElement('div');
        hajiriContainer.className = 'd-flex align-items-center justify-content-center gap-2 h-100';
        hajiriContainer.style.height = '100%';
        hajiriContainer.style.padding = '0';
        hajiriContainer.style.backgroundColor = isPresent ? '#fff' : '#f8f9fa';
        
        // Create X input with proper styling
        const xInput = document.createElement('input');
        xInput.type = 'text';
        xInput.className = 'form-control form-control-sm hajiri-x text-center';
        xInput.value = hajiriX;
        xInput.maxLength = 2;
        xInput.pattern = '[0-9]*';
        xInput.inputMode = 'numeric';
        xInput.readOnly = true;
        xInput.setAttribute('onclick', 'showNumberWheelX(this)');
        xInput.style.width = '55px';
        xInput.style.height = '46px';
        xInput.style.fontSize = '1.4rem';
        xInput.style.fontWeight = 'bold';
        xInput.style.margin = '0';
        xInput.style.padding = '0';
        xInput.style.border = '1px solid #dee2e6';
        xInput.style.borderRadius = '4px';
        
        // Create P label
        const pSpan = document.createElement('span');
        pSpan.className = 'fw-bold';
        pSpan.textContent = 'P';
        pSpan.style.fontSize = '1.4rem';
        pSpan.style.margin = '0 8px';
        
        // Create Y input with proper styling
        const yInput = document.createElement('input');
        yInput.type = 'text';
        yInput.className = 'form-control form-control-sm hajiri-y text-center';
        yInput.value = hajiriY;
        yInput.maxLength = 2;
        yInput.pattern = '[0-9]*';
        yInput.inputMode = 'numeric';
        yInput.readOnly = true;
        yInput.setAttribute('onclick', 'showNumberWheelY(this)');
        yInput.style.width = '55px';
        yInput.style.height = '46px';
        yInput.style.fontSize = '1.4rem';
        yInput.style.fontWeight = 'bold';
        yInput.style.margin = '0';
        yInput.style.padding = '0';
        yInput.style.border = '1px solid #dee2e6';
        yInput.style.borderRadius = '4px';
        
        // Apply disabled styling for absent workers
        if (!isPresent) {
            xInput.disabled = true;
            yInput.disabled = true;
            xInput.style.backgroundColor = '#eee';
            yInput.style.backgroundColor = '#eee';
        }
        
        // Add elements to container
        hajiriContainer.appendChild(xInput);
        hajiriContainer.appendChild(pSpan);
        hajiriContainer.appendChild(yInput);
        
        // Add container to cell
        tdHajiri.appendChild(hajiriContainer);
        
        // Create hours cell with larger size
        const tdHours = document.createElement('td');
        tdHours.className = 'text-center';
        tdHours.style.width = '70px'; // Set fixed width for hours column
        tdHours.style.minWidth = '70px';
        tdHours.style.padding = '0.5rem';
        
        const hoursSpan = document.createElement('span');
        hoursSpan.className = 'working-hours';
        hoursSpan.textContent = hoursValue;
        hoursSpan.style.fontSize = '1.4rem';
        hoursSpan.style.fontWeight = 'bold';
        tdHours.appendChild(hoursSpan);
        
        // Append cells to row in the correct order
        tr.appendChild(tdSerial);
        tr.appendChild(tdName);
        tr.appendChild(tdFatherName);
        tr.appendChild(tdPA);
        tr.appendChild(tdHours);
        tr.appendChild(tdHajiri);
        
        // Append row to table body
            tbody.appendChild(tr);
    });
}

// Toggle attendance status
function toggleStatus(btn, newStatus) {
    const row = btn.closest('tr');
    const statusBtns = row.querySelectorAll('.status-btn');
    
    // Reset all buttons to outline
    statusBtns.forEach(button => {
        button.classList.remove('btn-success', 'btn-danger');
        button.classList.add(button.dataset.status === 'present' ? 'btn-outline-success' : 'btn-outline-danger');
    });
    
    // Set active button
    btn.classList.remove(btn.dataset.status === 'present' ? 'btn-outline-success' : 'btn-outline-danger');
    btn.classList.add(btn.dataset.status === 'present' ? 'btn-success' : 'btn-danger');
    
    // Update hidden status field
    row.querySelector('.attendance-status').value = newStatus;
    
    // Mark row as changed
    row.classList.add('table-warning');
}

// Handle time input changes
function handleTimeChange(input) {
    const row = input.closest('tr');
    const inTimeInput = row.querySelector('.attendance-in-time');
    const outTimeInput = row.querySelector('.attendance-out-time');
    const workingHoursSpan = row.querySelector('.working-hours');
    
    // Update the display format for the time input
    if (input.value) {
        const formatted12Hour = formatTimeFor12Hour(input.value);
        input.dataset.display = formatted12Hour;
        
        // Update the visual display of the time input to show 12-hour format
        input.setAttribute('placeholder', formatted12Hour);
    }
    
    // If either input has changed from its original value, mark row as changed
    if (inTimeInput.value !== inTimeInput.dataset.original || 
        outTimeInput.value !== outTimeInput.dataset.original) {
        row.classList.add('table-warning');
    } else {
        row.classList.remove('table-warning');
    }
    
    // Calculate working hours if both times are set
    if (inTimeInput.value && outTimeInput.value) {
        const inTime = parseTimeInput(inTimeInput.value);
        const outTime = parseTimeInput(outTimeInput.value);
        
        if (inTime && outTime) {
            const workingHours = calculateHoursDifference(inTime, outTime);
            workingHoursSpan.textContent = formatHours(workingHours);
        }
    }
}

// Allow direct editing of time input
function enableDirectTimeEdit(input) {
    input.readOnly = true;
    
    // Remove any existing click listener
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    
    // Add click event to open time picker
    newInput.addEventListener('click', function() {
        showInfiniteTimePicker(this, function(selectedTime) {
            if (selectedTime) {
                console.log('Time selected for input:', selectedTime);
                
                // Temporarily remove readonly to ensure value can be set
                newInput.removeAttribute('readonly');
                
                // Set the value directly
                newInput.value = selectedTime;
                
                // Restore readonly
                newInput.readOnly = true;
                
            const row = newInput.closest('tr');
            if (row) {
                markRowChanged(row);
                
                // Calculate working hours if both in and out times are set
                const inTimeInput = row.querySelector('.attendance-in-time');
                const outTimeInput = row.querySelector('.attendance-out-time');
                
                if (inTimeInput && outTimeInput && 
                    inTimeInput.value && outTimeInput.value) {
                    try {
                        handleTimeChange(inTimeInput);
                    } catch (error) {
                        console.error('Error calculating hours:', error);
                        }
                    }
                }
            }
        });
    });
}

// Parse time input in HH:MM format
function parseTimeInput(timeStr) {
    if (!timeStr) return null;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) return null;
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    return date;
}

// Calculate hours difference between two Date objects
function calculateHoursDifference(startTime, endTime) {
    // If end time is earlier than start time, assume it's for the next day
    let timeDiff = endTime - startTime;
    
    if (timeDiff < 0) {
        // Add 24 hours (next day)
        timeDiff += 24 * 60 * 60 * 1000;
    }
    
    // Return hours difference with decimals (e.g. 8.5 for 8 hours 30 minutes)
    return timeDiff / (1000 * 60 * 60);
}

// Format hours as HH:MM
function formatHours(hours) {
    if (!hours) return '';
    
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    return `${wholeHours}:${minutes.toString().padStart(2, '0')}`;
}

// Convert time from HH:MM AM/PM to HH:MM for time input
function convertToTimeInputFormat(timeStr) {
    if (!timeStr) return '';
    
    try {
        const timeParts = timeStr.match(/(\d+):(\d+) (\w+)/);
        if (!timeParts) {
            // Already in 24-hour format
            return timeStr;
        }
        
        let hours = parseInt(timeParts[1]);
        const minutes = timeParts[2];
        const period = timeParts[3];
        
        if (period.toLowerCase() === 'pm' && hours < 12) {
            hours += 12;
        } else if (period.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
        } catch (error) {
        console.error('Error converting time format:', error, timeStr);
        return '';
    }
}

// Check if API endpoint is available
async function checkApiEndpoint(url) {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        console.log(`API endpoint ${url} check status:`, response.status);
        return response.ok;
    } catch (error) {
        console.error(`API endpoint ${url} check failed:`, error);
        return false;
    }
}

// Save all attendance changes
function saveAllAttendance() {
    const changedRows = document.querySelectorAll('#attendance-table tr.table-warning');
    if (changedRows.length === 0) {
        showToast('No changes to save', 'info');
        return;
    }

    // Check if checkbox is checked (for final submission to site incharge)
    const checkbox = document.getElementById('attendance-confirm-checkbox');
    const isSubmitToIncharge = checkbox && checkbox.checked;
    
    // If submitting to incharge, use the dedicated function
    if (isSubmitToIncharge) {
        submitToIncharge();
        return;
    }

    // Disable save button
    const saveBtn = document.getElementById('save-all-attendance');
    if (!saveBtn) return;
    
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

    // Set flag to indicate we just saved a draft
    window.justSavedDraft = true;

    // Always backup attendance to localStorage first
    backupAttendanceToLocalStorage();
    
    // Only show the Hindi message "नाम सहेजे गए" without any other popups
    showToast('नाम सहेजे गए', 'success');
    
    // Show the load draft button - always visible
    const loadDraftBtn = document.getElementById('load-draft-btn');
    if (loadDraftBtn) loadDraftBtn.style.display = 'block';

    // Check for user authentication
    let userAuthenticated = false;
    let userId = null;
    
    // First check if currentUser is already set correctly
    if (currentUser && (currentUser._id || currentUser.id)) {
        userId = currentUser._id || currentUser.id;
        userAuthenticated = true;
        console.log('Using currentUser ID:', userId);
    } else {
        // Try to get user from localStorage
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (storedUser && (storedUser._id || storedUser.id)) {
                userId = storedUser._id || storedUser.id;
                // Update currentUser with correct ID
                currentUser = {
                    ...storedUser,
                    _id: userId
                };
                console.log('Using user from localStorage:', userId);
                userAuthenticated = true;
            } else {
                // No valid user ID found - but we've already saved to localStorage
                console.log('User information not available, using draft mode only');
                saveBtn.disabled = false;
                saveBtn.innerHTML = 'Save Changes';
                return;
            }
        } catch (e) {
            console.error('Error parsing user from localStorage:', e);
            saveBtn.disabled = false;
            saveBtn.innerHTML = 'Save Changes';
            return;
        }
    }

    // If we got here, we have a user, so proceed with API call
    checkApiEndpoint('/api/attendance')
        .then(isAvailable => {
            if (!isAvailable) {
                throw new Error('Attendance API endpoint is not available. Please check your server connection.');
            }
            
            // Prepare promises and payload
            const savePromises = [];

            changedRows.forEach(row => {
                const workerId = row.dataset.workerId;
                const date = row.dataset.date;
                const siteId = row.dataset.siteId;
                const attendanceId = row.querySelector('.attendance-id')?.value || '';
                
                // Get P/A status
                const hajiriPA = row.querySelector('.pa-toggle-btn')?.textContent || 'A';
                
                // Set status based on hajiriPA value
                const status = hajiriPA === 'P' ? 'present' : 'absent';
                
                // Get X/Y values for working hours calculation
                const hajiriX = row.querySelector('.hajiri-x')?.value || '0';
                const hajiriY = row.querySelector('.hajiri-y')?.value || '0';
                
                // Calculate working hours from X and Y
                const workingHours = (parseInt(hajiriX) || 0) * 8 + (parseInt(hajiriY) || 0);
                
                // Create a date object for this attendance record (for inTime)
                const attendanceDate = new Date(date);
                
                // FIXED: Use the correct field names expected by the API (worker and site, not workerId and siteId)
                const attendanceData = {
                    worker: workerId,
                    site: siteId,
                    date: date,
                    status: status,
                    workingHours: workingHours,
                    hajiriPA: hajiriPA,
                    hajiriX: hajiriX, 
                    hajiriY: hajiriY
                };
                
                // Add the required markedBy field
                if (userId) {
                    attendanceData.markedBy = userId;
                } else {
                    // Try one more time to get user ID from localStorage as fallback
                    try {
                        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                        const backupUserId = storedUser._id || storedUser.id;
                        if (backupUserId) {
                            attendanceData.markedBy = backupUserId;
                            console.log('Using backup user ID from localStorage:', backupUserId);
                        } else {
                            // If no user found, proceed in draft mode
                            console.warn('No user information found. Proceeding in draft mode without markedBy field.');
                            // We'll continue without the markedBy field, which might be required by the server
                            // but we'll handle any errors that come back
                        }
                    } catch (e) {
                        console.warn('Error parsing user from localStorage. Proceeding in draft mode:', e);
                    }
                }
                
                // Add inTime for present workers (required by server model)
                if (status === 'present') {
                    // Set a default inTime of 9 AM
                    const inTime = new Date(attendanceDate);
                    inTime.setHours(9, 0, 0, 0);
                    attendanceData.inTime = inTime.toISOString();
                }

                // Determine HTTP method and URL
                const method = attendanceId ? 'PATCH' : 'POST';
                const url = attendanceId ? `/api/attendance/${attendanceId}` : '/api/attendance';

                // For debugging
                console.log(`Saving attendance (${method}):`, attendanceData);

                // Add to promises
                savePromises.push(
                    fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(attendanceData)
                    })
                    .then(response => {
                        // Log the response status
                        console.log(`Response for ${workerId}:`, response.status, response.statusText);
                        
                        if (!response.ok) {
                            const error = new Error(`HTTP error ${response.status}`);
                            error.response = response;
                            error.requestData = attendanceData; // Store the data that caused the error
                            throw error;
                        }
                        
                        // Try to parse JSON response safely
                        return response.text().then(text => {
                            try {
                                if (!text || text.trim() === '') {
                                    // Handle empty response
                                    return { status: 'success', message: 'Saved successfully' };
                                }
                                
                                // Check if the response starts with HTML doctype or tags
                                if (text.trim().toLowerCase().startsWith('<!doctype') || 
                                    text.trim().toLowerCase().startsWith('<html')) {
                                    console.log('Received HTML response instead of JSON');
                                    console.log('This is normal and not an error - the server returned a success status code (200 OK)');
                                    // Return a valid object instead of throwing
                                    return { 
                                        status: 'success', 
                                        message: 'Saved successfully (HTML response received)',
                                        rawResponse: text.substring(0, 100) + '...' // Just log a snippet
                                    };
                                }
                                
                                return JSON.parse(text);
                            } catch (e) {
                                console.error('Error parsing JSON response:', e);
                                console.error('Raw response text (first 200 chars):', text.substring(0, 100) + '...');
                                // Return a valid object instead of throwing
                                return { 
                                    status: 'success', 
                                    message: 'Saved successfully (non-JSON response)',
                                    rawResponse: text.substring(0, 100) + '...'
                                };
                            }
                        });
                    })
                    .then(data => {
                        if (data.status !== 'success') {
                            const error = new Error(data.message || 'Error saving attendance');
                            error.requestData = attendanceData; // Store the data that caused the error
                            throw error;
                        }
                        return data;
                    })
                    .catch(error => {
                        // Log the request data that caused the error
                        if (error.requestData) {
                            console.error('Error occurred with this request data:', error.requestData);
                        }
                        
                        if (error.response) {
                            // This is a response error, use our helper
                            return handleApiError(error, error.response)
                                .then(errorMsg => {
                                    throw new Error(errorMsg);
                                })
                                .catch(e => {
                                    // If handleApiError itself fails, provide a fallback error
                                    console.error('Error in handleApiError:', e);
                                    throw new Error('Failed to process server response');
                                });
                        }
                        // Regular error
                        throw error;
                    })
                );
            });

            // Process all save promises
            return Promise.all(savePromises);
        })
        .then(results => {
            // Don't show any additional toast messages - we already showed "नाम सहेजे गए"
            console.log(`Successfully saved ${results.length} attendance records`);
            
            // DO NOT reload attendance data or call restoreAttendanceFromLocalStorage here
            // This prevents the duplicate toast message
        })
        .catch(error => {
            console.error('Error saving attendance:', error);
            
            // Don't show any additional error messages - we already showed "नाम सहेजे गए"
            // Just log errors to console
            
                // Ensure the draft is saved
                backupAttendanceToLocalStorage();
        })
        .finally(() => {
            // Re-enable save button
            saveBtn.disabled = false;
            saveBtn.innerHTML = 'Save Changes';
        });
}

// New function for submitting to incharge (completely separate)
function submitToIncharge() {
    const changedRows = document.querySelectorAll('#attendance-table tr.table-warning');
    if (changedRows.length === 0) {
        showToast('No changes to submit', 'info');
        return;
    }

    // Disable submit button
    const saveBtn = document.getElementById('save-all-attendance');
    if (!saveBtn) return;
    
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    
    // Get current date and time for submission timestamp
    const submissionTimestamp = new Date().toISOString();
    const submissionDate = new Date().toLocaleDateString();
    const submissionTime = new Date().toLocaleTimeString();

    // Check for user authentication
    let userId = null;
    
    // First check if currentUser is already set correctly
    if (currentUser && (currentUser._id || currentUser.id)) {
        userId = currentUser._id || currentUser.id;
        console.log('Using currentUser ID for submission:', userId);
    } else {
        // Try to get user from localStorage
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (storedUser && (storedUser._id || storedUser.id)) {
                userId = storedUser._id || storedUser.id;
                // Update currentUser with correct ID
                currentUser = {
                    ...storedUser,
                    _id: userId
                };
                console.log('Using user from localStorage for submission:', userId);
            } else {
                // No valid user ID found
                console.warn('No user information found for submission. Cannot submit to incharge without user ID.');
                showToast('User login required to submit to incharge. Please log in again.', 'error');
                saveBtn.disabled = false;
                saveBtn.innerHTML = 'Save Changes';
                return;
            }
        } catch (e) {
            console.error('Error parsing user from localStorage:', e);
            showToast('Login session error. Cannot submit to incharge.', 'error');
            saveBtn.disabled = false;
            saveBtn.innerHTML = 'Save Changes';
            return;
        }
    }

    // First check if API endpoint is available
    checkApiEndpoint('/api/attendance')
        .then(isAvailable => {
            if (!isAvailable) {
                throw new Error('Attendance API endpoint is not available. Please check your server connection.');
            }
            
            // Backup attendance to localStorage first
            backupAttendanceToLocalStorage();
            
            // Prepare promises and payload
            const savePromises = [];
            const siteId = sites.length > 0 ? sites[0]._id : null;
            const date = document.getElementById('attendance-date')?.value || new Date().toISOString().split('T')[0];

            changedRows.forEach(row => {
                const workerId = row.dataset.workerId;
                const attendanceId = row.querySelector('.attendance-id')?.value || '';
                
                // Get P/A status
                const hajiriPA = row.querySelector('.pa-toggle-btn')?.textContent || 'A';
                
                // Set status based on hajiriPA value
                const status = hajiriPA === 'P' ? 'present' : 'absent';
                
                // Get X/Y values for working hours calculation
                const hajiriX = row.querySelector('.hajiri-x')?.value || '0';
                const hajiriY = row.querySelector('.hajiri-y')?.value || '0';
                
                // Calculate working hours from X and Y
                const workingHours = (parseInt(hajiriX) || 0) * 8 + (parseInt(hajiriY) || 0);
                
                // Create a date object for this attendance record (for inTime)
                const attendanceDate = new Date(date);
                
                // FIXED: Use the correct field names expected by the API (worker and site, not workerId and siteId)
                const attendanceData = {
                    worker: workerId,
                    site: siteId,
                    date: date,
                    status: status,
                    workingHours: workingHours,
                    hajiriPA: hajiriPA,
                    hajiriX: hajiriX, 
                    hajiriY: hajiriY,
                    // Add submission status for final submission to incharge
                    verified: false, // Changed from true to false - incharge needs to verify
                    submittedToIncharge: true,
                    // Add submission timestamp
                    submissionTimestamp: submissionTimestamp,
                    submissionDate: submissionDate,
                    submissionTime: submissionTime
                };
                
                // Add the required markedBy field using the userId we found
                if (userId) {
                    attendanceData.markedBy = userId;
                } else {
                    console.warn('No user ID available for markedBy field. This might cause server errors.');
                }
                
                // Add inTime for present workers (required by server model)
                if (status === 'present') {
                    // Set a default inTime of 9 AM
                    const inTime = new Date(attendanceDate);
                    inTime.setHours(9, 0, 0, 0);
                    attendanceData.inTime = inTime.toISOString();
                    
                    // Add out time if needed
                        const outTime = new Date(attendanceDate);
                    outTime.setHours(17, 0, 0, 0);  // Default to 5 PM
                        attendanceData.outTime = outTime.toISOString();
                }

                // Determine HTTP method and URL
                const method = attendanceId ? 'PATCH' : 'POST';
                const url = attendanceId ? `/api/attendance/${attendanceId}` : '/api/attendance';

                // For debugging
                console.log(`Submitting attendance to incharge (${method}):`, attendanceData);

                // Add to promises
                savePromises.push(
                    fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(attendanceData)
                    })
                    .then(response => {
                        // Log the response status
                        console.log(`Response for ${workerId}:`, response.status, response.statusText);
                        
                        if (!response.ok) {
                            const error = new Error(`HTTP error ${response.status}`);
                            error.response = response;
                            error.requestData = attendanceData; // Store the data that caused the error
                            throw error;
                        }
                        
                        // Try to parse JSON response safely
                        return response.text().then(text => {
                            try {
                                if (!text || text.trim() === '') {
                                    // Handle empty response
                                    return { status: 'success', message: 'Submitted successfully' };
                                }
                                
                                // Check if the response starts with HTML doctype or tags
                                if (text.trim().toLowerCase().startsWith('<!doctype') || 
                                    text.trim().toLowerCase().startsWith('<html')) {
                                    console.log('Received HTML response instead of JSON');
                                    console.log('Raw response text (first 200 chars):', text.substring(0, 200));
                                    // Return a valid object instead of throwing
                                    return { 
                                        status: 'success', 
                                        message: 'Submitted successfully (HTML response received)',
                                        rawResponse: text.substring(0, 100) + '...'
                                    };
                                }
                                
                                return JSON.parse(text);
                            } catch (e) {
                                console.error('Error parsing JSON response:', e);
                                console.error('Raw response text:', text.substring(0, 200));
                                // Return a valid object instead of throwing
                                return { 
                                    status: 'success', 
                                    message: 'Submitted successfully (non-JSON response)',
                                    rawResponse: text.substring(0, 100) + '...'
                                };
                            }
                        });
                    })
                    .then(data => {
                        if (data.status !== 'success') {
                            const error = new Error(data.message || 'Error submitting attendance');
                            error.requestData = attendanceData; // Store the data that caused the error
                            throw error;
                        }
                        return data;
                    })
                    .catch(error => {
                        // Log the request data that caused the error
                        if (error.requestData) {
                            console.error('Error occurred with this request data:', error.requestData);
                        }
                        
                        if (error.response) {
                            // This is a response error, use our helper
                            return handleApiError(error, error.response).then(errorMsg => {
                                throw new Error(errorMsg);
                            });
                        }
                        // Regular error
                        throw error;
                    })
                );
            });

            // Process all save promises
            return Promise.all(savePromises);
        })
        .then(results => {
            const submissionTime = new Date().toLocaleTimeString();
            const submissionDate = new Date().toLocaleDateString();
            showToast(`Successfully submitted ${results.length} attendance records to site incharge at ${submissionTime} on ${submissionDate}`, 'success');
            
            // Clear localStorage backup since it's no longer needed
            const date = document.getElementById('attendance-date')?.value || new Date().toISOString().split('T')[0];
            localStorage.removeItem(`attendance_backup_${date}`);
            console.log('Cleared localStorage backup after submitting to incharge');
            
            // Hide the load draft button since draft was cleared
            const loadDraftBtn = document.getElementById('load-draft-btn');
            if (loadDraftBtn) loadDraftBtn.style.display = 'none';
            
            // Reload attendance data
            loadAttendance();
        })
        .catch(error => {
            console.error('Error submitting attendance:', error);
            
            // Check if this is a markedBy related error
            if (error.message && (
                error.message.includes('markedBy') || 
                error.message.includes('User not found') || 
                error.message.includes('Missing required field')
            )) {
                showToast('Error: User authentication issue. Your changes have been saved as a draft locally.', 'warning');
                // Ensure the draft is saved
                backupAttendanceToLocalStorage();
            } else if (error.message && error.message.includes('500')) {
                showToast('Server Error 500: The server may be experiencing issues. Your changes have been saved as a draft locally.', 'error');
                backupAttendanceToLocalStorage();
            } else if (error.message && error.message.includes('JSON')) {
                showToast('Error: Invalid response from server. Please check your network connection and try again.', 'error');
            } else {
                showToast(`Error: ${error.message}`, 'error');
            }
        })
        .finally(() => {
            // Re-enable save button
            saveBtn.disabled = false;
            saveBtn.innerHTML = 'Submit to Incharge';
            
            // Uncheck the checkbox
            const checkbox = document.getElementById('attendance-confirm-checkbox');
            if (checkbox) checkbox.checked = false;
            toggleAttendanceSubmitButton();
        });
}

// Add function to toggle button text and action based on checkbox
function toggleAttendanceSubmitButton() {
    const checkbox = document.getElementById('attendance-confirm-checkbox');
    const saveBtn = document.getElementById('save-all-attendance');
    const confirmMsg = document.getElementById('attendance-confirm-message');
    
    if (!saveBtn) return;
    
    if (checkbox && checkbox.checked) {
        saveBtn.textContent = 'Submit to Incharge';
        saveBtn.classList.remove('btn-primary');
        saveBtn.classList.add('btn-success');
        
        // Remove confirmation message if present
        if (confirmMsg) confirmMsg.remove();
    } else {
        saveBtn.textContent = 'Save Changes';
        saveBtn.classList.remove('btn-success');
        saveBtn.classList.add('btn-primary');
        
        // Remove confirmation message
        if (confirmMsg) {
            confirmMsg.remove();
        }
    }
}

// Calculate working hours for modal forms
function calculateWorkingHours(inTimeId, outTimeId, resultId) {
    const inTimeInput = document.getElementById(inTimeId);
    const outTimeInput = document.getElementById(outTimeId);
    const resultInput = document.getElementById(resultId);
    
    if (inTimeInput.value && outTimeInput.value) {
        const inTime = parseTimeInput(inTimeInput.value);
        const outTime = parseTimeInput(outTimeInput.value);
        
        if (inTime && outTime) {
            const workingHours = calculateHoursDifference(inTime, outTime);
            resultInput.value = formatHours(workingHours);
        }
    }
}

// Helper function to get badge class based on status
function getStatusBadgeClass(status) {
    switch(status) {
        case 'present': return 'bg-success';
        case 'absent': return 'bg-danger';
        case 'late': return 'bg-warning';
        default: return 'bg-secondary';
    }
}

// Show update attendance modal
function showUpdateAttendanceModal(attendanceId) {
    // Get attendance record
    const attendanceRecord = attendanceRecords.find(record => record._id === attendanceId);
    
    if (!attendanceRecord) {
        console.error('Attendance record not found:', attendanceId);
        return;
    }
    
    // Set fields in modal
    document.getElementById('update-attendance-id').value = attendanceId;
    document.getElementById('update-worker-name').textContent = attendanceRecord.worker ? attendanceRecord.worker.name : 'Unknown';
    
    const statusSelect = document.getElementById('update-status');
    if (statusSelect) {
        for (let i = 0; i < statusSelect.options.length; i++) {
            if (statusSelect.options[i].value === attendanceRecord.status) {
                statusSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    // Parse and set time inputs
    const checkinTimeInput = document.getElementById('check-in-time');
    const checkoutTimeInput = document.getElementById('check-out-time');
    
    // Format in/out times for input (HH:MM format)
    if (checkinTimeInput && attendanceRecord.inTime) {
        const date = new Date(attendanceRecord.inTime);
        checkinTimeInput.value = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        checkinTimeInput.readOnly = true;
        
        // Remove any existing click listener and add new one
        const newCheckinInput = checkinTimeInput.cloneNode(true);
        checkinTimeInput.parentNode.replaceChild(newCheckinInput, checkinTimeInput);
        
        newCheckinInput.addEventListener('click', function() {
            showInfiniteTimePicker(this, function(selectedTime) {
                if (selectedTime) {
                    console.log('Time selected for check-in:', selectedTime);
                    
                    // Temporarily remove readonly to ensure value can be set
                    newCheckinInput.removeAttribute('readonly');
                    
                    // Set the value directly
                    newCheckinInput.value = selectedTime;
                    
                    // Restore readonly
                    newCheckinInput.readOnly = true;
                    
                // Calculate working hours if both times are set
                calculateWorkingHours('check-in-time', 'check-out-time', 'update-working-hours');
                }
            });
        });
    }
    
    if (checkoutTimeInput && attendanceRecord.outTime) {
        const date = new Date(attendanceRecord.outTime);
        checkoutTimeInput.value = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        checkoutTimeInput.readOnly = true;
        
        // Remove any existing click listener and add new one
        const newCheckoutInput = checkoutTimeInput.cloneNode(true);
        checkoutTimeInput.parentNode.replaceChild(newCheckoutInput, checkoutTimeInput);
        
        newCheckoutInput.addEventListener('click', function() {
            showInfiniteTimePicker(this, function(selectedTime) {
                if (selectedTime) {
                    console.log('Time selected for check-out:', selectedTime);
                    
                    // Temporarily remove readonly to ensure value can be set
                    newCheckoutInput.removeAttribute('readonly');
                    
                    // Set the value directly
                    newCheckoutInput.value = selectedTime;
                    
                    // Restore readonly
                    newCheckoutInput.readOnly = true;
                    
                // Calculate working hours if both times are set
        calculateWorkingHours('check-in-time', 'check-out-time', 'update-working-hours');
                }
            });
        });
    }

    // Set working hours
    document.getElementById('update-working-hours').value = attendanceRecord.workingHours || '';
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('updateAttendanceModal'));
    modal.show();
}

// Update attendance record
function updateAttendance() {
    const attendanceId = document.getElementById('attendance-id').value;
    const status = document.querySelector('input[name="update-status"]:checked').value;
    const checkIn = document.getElementById('check-in-time').value;
    const checkOut = document.getElementById('check-out-time').value;
    
    // Create date object from attendance record for ISO string
    const record = attendanceRecords.find(r => r._id === attendanceId);
    const date = record ? new Date(record.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    const formData = { status };
    
    // Add check-in time if provided
    if (checkIn) {
        formData.inTime = new Date(`${date}T${checkIn}`).toISOString();
    }
    
    // Add check-out time if provided
    if (checkOut) {
        formData.outTime = new Date(`${date}T${checkOut}`).toISOString();
    }

    fetch(`/api/attendance/${attendanceId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            bootstrap.Modal.getInstance(document.getElementById('updateAttendanceModal')).hide();
            loadAttendance();
            loadOverviewStats();
            showToast('Attendance updated successfully', 'success');
        } else {
            showToast(data.message || 'Error updating attendance', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Network error. Please try again later.', 'error');
    });
}

// Add attendance record
function addAttendance() {
    // Prepare form data
    const workerId = document.getElementById('attendance-worker').value;
    const siteId = sites.length > 0 ? sites[0]._id : null;
    const date = document.getElementById('add-attendance-date').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const checkIn = document.getElementById('add-check-in-time').value;
    const checkOut = document.getElementById('add-check-out-time').value;
    
    // Validate required fields
    if (!workerId || !date) {
        showToast('Please select worker and date', 'warning');
        return;
    }
    
    // Check if a site is available
    if (!siteId) {
        showToast('No site available for attendance', 'warning');
        return;
    }
    
    // Validate status-specific fields
    if ((status === 'present' || status === 'late') && !checkIn) {
        showToast('Check-in time is required for present or late status', 'warning');
        return;
    }
    
    // Prepare request data
    const formData = {
        workerId: workerId,
        siteId: siteId,
        date: date,
        status: status
    };
    
    // Add time fields if provided
    if (checkIn) {
        formData.inTime = new Date(`${date}T${checkIn}`).toISOString();
    }
    
    if (checkOut) {
        formData.outTime = new Date(`${date}T${checkOut}`).toISOString();
    }
    
    // Send the request
    fetch('/api/attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            bootstrap.Modal.getInstance(document.getElementById('addAttendanceModal')).hide();
            loadAttendance();
            loadOverviewStats();
            showToast('Attendance record added successfully', 'success');
        } else {
            showToast(data.message || 'Error adding attendance record', 'warning');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Network error. Please try again later.', 'error');
    });
}

// Show add attendance modal
function showAddAttendanceModal() {
    // Set site ID
    document.getElementById('add-attendance-site').value = sites.length > 0 ? sites[0]._id : '';
    
    // Set today's date
    document.getElementById('add-attendance-date').value = document.getElementById('attendance-date').value;
    
    // Populate worker select
    updateWorkerSelect();
    
    // Setup time inputs with our new time picker
    const checkinTimeInput = document.getElementById('add-check-in-time');
    const checkoutTimeInput = document.getElementById('add-check-out-time');
    
    if (checkinTimeInput) {
        checkinTimeInput.readOnly = true;
        
        // Remove any existing click listener and add new one
        const newCheckinInput = checkinTimeInput.cloneNode(true);
        checkinTimeInput.parentNode.replaceChild(newCheckinInput, checkinTimeInput);
        
        newCheckinInput.addEventListener('click', function() {
            showInfiniteTimePicker(this, function(selectedTime) {
                if (selectedTime) {
                    console.log('Time selected for add check-in:', selectedTime);
                    
                    // Temporarily remove readonly to ensure value can be set
                    newCheckinInput.removeAttribute('readonly');
                    
                    // Set the value directly
                    newCheckinInput.value = selectedTime;
                    
                    // Restore readonly
                    newCheckinInput.readOnly = true;
                    
                // Calculate working hours if both times are set
                calculateWorkingHours('add-check-in-time', 'add-check-out-time', 'add-working-hours');
                }
            });
        });
    }
    
    if (checkoutTimeInput) {
        checkoutTimeInput.readOnly = true;
        
        // Remove any existing click listener and add new one
        const newCheckoutInput = checkoutTimeInput.cloneNode(true);
        checkoutTimeInput.parentNode.replaceChild(newCheckoutInput, checkoutTimeInput);
        
        newCheckoutInput.addEventListener('click', function() {
            showInfiniteTimePicker(this, function(selectedTime) {
                if (selectedTime) {
                    console.log('Time selected for add check-out:', selectedTime);
                    
                    // Temporarily remove readonly to ensure value can be set
                    newCheckoutInput.removeAttribute('readonly');
                    
                    // Set the value directly
                    newCheckoutInput.value = selectedTime;
                    
                    // Restore readonly
                    newCheckoutInput.readOnly = true;
                    
                // Calculate working hours if both times are set
                calculateWorkingHours('add-check-in-time', 'add-check-out-time', 'add-working-hours');
                }
            });
        });
    }
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('addAttendanceModal'));
    modal.show();
}

// Populate worker select dropdown
function updateWorkerSelect() {
    const select = document.getElementById('attendance-worker');
    select.innerHTML = '<option value="">Select Worker</option>';
    
    workers.forEach(worker => {
        const option = document.createElement('option');
        option.value = worker._id;
        option.textContent = worker.name;
        select.appendChild(option);
    });
}

// Load reports
function loadReports() {
    // Monthly attendance chart
    const attendanceCtx = document.getElementById('attendance-chart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Present',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: '#28a745'
            }, {
                label: 'Absent',
                data: [28, 48, 40, 19, 86, 27],
                backgroundColor: '#dc3545'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Site performance chart
    const performanceCtx = document.getElementById('site-performance-chart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: sites.map(site => site.name),
            datasets: [{
                label: 'Attendance Rate',
                data: sites.map(site => {
                    const siteWorkers = workers.filter(w => w.site === site._id);
                    const siteAttendance = attendanceRecords.filter(a => 
                        a.site === site._id && 
                        new Date(a.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
                    );
                    return siteWorkers.length > 0 ? 
                        (siteAttendance.filter(a => a.status === 'present').length / siteWorkers.length) * 100 : 0;
                }),
                borderColor: '#007bff',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Update profile
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('profile-name').value,
        phone: document.getElementById('profile-phone').value,
        username: document.getElementById('profile-username').value
    };

    fetch(`/api/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Profile update response:', data);
        if (data.status === 'success') {
            alert('Profile updated successfully');
            // Update currentUser with the response data
            currentUser = data.data.user;
            
            // Update the user in localStorage
            localStorage.setItem('user', JSON.stringify(currentUser));
            
            // Update displayed name if applicable
            const foremanNameElement = document.getElementById('foreman-name');
            if (foremanNameElement) {
                foremanNameElement.textContent = currentUser.name || 'Foreman';
            }
        } else {
            alert(data.message || 'Error updating profile');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating profile. Please try again.');
    });
});

// Display workers data
function displayWorkers(workersData) {
    console.log('Processing workers data:', workersData);
    
    if (!workersData || !Array.isArray(workersData)) {
        console.error('Invalid workers data:', workersData);
        document.getElementById('workers-table').innerHTML = '<tr><td colspan="6" class="text-center">Error displaying workers</td></tr>';
        
        // If workersData isn't valid but we have the global workers array, use that
        if (workers && Array.isArray(workers) && workers.length > 0) {
            console.log('Using existing workers array instead');
            workersData = workers;
        } else {
        return;
        }
    }
    
    // Make sure global workers array is updated
    workers = workersData;
    
    // Check if there are any workers
    if (workers.length === 0) {
        document.getElementById('workers-table').innerHTML = '<tr><td colspan="6" class="text-center">No workers found</td></tr>';
        return;
    }
    
    updateWorkersTable();
    
    // Also update worker select for attendance
    const selectElem = document.getElementById('attendance-worker');
    if (selectElem) {
        updateWorkerSelect();
    }
    
    console.log('Workers array updated with', workers.length, 'workers');
    
    // If attendance-section is visible, reload attendance
    const attendanceSection = document.getElementById('attendance-section');
    if (attendanceSection && attendanceSection.classList.contains('active')) {
        console.log('Attendance section is visible, reloading attendance data');
        loadAttendance();
    }
}

// Initialize section specific data when sections are activated
function initializeSection(sectionId) {
    console.log(`Initializing section: ${sectionId}`);
    
    // Handle data loading for each section when it's activated
    switch(sectionId) {
        case 'overview-section':
            loadOverviewStats();
            break;
            
        case 'workers-section':
            loadWorkers();
            break;
            
        case 'attendance-section':
            // First make sure workers are loaded, then load attendance
            if (workers.length === 0) {
                console.log("Loading workers before attendance");
                loadWorkers().then(() => {
                    console.log("Workers loaded, now loading attendance");
            loadAttendance();
                });
            } else {
                loadAttendance();
            }
            break; 
            
        case 'reports-section':
            loadReports();
            break;
            
        case 'profile-section':
            loadProfileData();
            break;
    }
}

// Listen for section changes from sidebar navigation
document.addEventListener('DOMContentLoaded', function() {
    // Clean up old drafts (older than 7 days)
    cleanupOldDrafts();
    
    // Add date change event listener
    const dateInput = document.getElementById('attendance-date');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            handleDateChange();
            loadAttendance();
        });
    }
    
    // After loading attendance section, check for draft
    const loadDraftBtn = document.getElementById('load-draft-btn');
    if (dateInput && loadDraftBtn) {
        const selectedDate = dateInput.value;
        const backupJson = localStorage.getItem(`attendance_backup_${selectedDate}`);
        loadDraftBtn.style.display = backupJson ? 'block' : 'none';
    }
    
    // Add event listener for our custom event from sidebar.js
    document.addEventListener('section-changed', function(e) {
        if (e.detail && e.detail.sectionId) {
            initializeSection(e.detail.sectionId);
        }
    });
    
    // Initialize the dashboard on load
    loadDashboardData();
    
    // Add click event listener for attendance section to ensure it loads correctly
    document.querySelectorAll('.nav-link[data-section="attendance-section"], #go-to-attendance').forEach(link => {
        link.addEventListener('click', function() {
            console.log("Attendance link clicked, forcing attendance load");
            // Ensure the section is actually visible before loading
            setTimeout(() => {
                const attendanceSection = document.getElementById('attendance-section');
                if (attendanceSection && attendanceSection.classList.contains('active')) {
                    loadAttendance();
                    handleDateChange(); // Update draft button visibility
                }
            }, 200); // Add slight delay to ensure DOM is ready
        });
    });
});

// Format time for display
function formatTimeFor12Hour(timeStr) {
    if (!timeStr) return '';
    
    try {
        // Check if the time is already in 12-hour format
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
            return timeStr;
        }
        
        // Parse 24-hour format (HH:MM)
        const [hours, minutes] = timeStr.split(':').map(Number);
        
        if (isNaN(hours) || isNaN(minutes)) {
            return timeStr;
        }
        
        // Convert to 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (e) {
        console.error('Error formatting time:', e);
        return timeStr;
    }
}

// Handle the display of time inputs
function handleTimeForDisplay() {
    // Apply time picker to all time inputs that are not already handled
    const timeInputs = document.querySelectorAll('input[type="time"]:not([data-timepicker-applied])');
    
    timeInputs.forEach(input => {
        // Skip inputs that already have event listeners 
        if (input.getAttribute('data-timepicker-applied') === 'true') {
            return;
        }
        
        // Make input readonly
        input.readOnly = true;
        
        // Add click event to show time picker
        input.addEventListener('click', function() {
            showInfiniteTimePicker(this, (selectedTime) => {
                if (selectedTime) {
                    console.log('Time selected for input:', selectedTime);
                    
                    // Temporarily remove readonly to ensure value can be set
                    input.removeAttribute('readonly');
                    
                    // Set the value directly
                    input.value = selectedTime;
                    
                    // Restore readonly
                    input.readOnly = true;
                    
                // If input is part of an attendance row, handle the change
                const row = input.closest('tr');
                if (row) {
                    markRowChanged(row);
                    
                    // Calculate working hours if both in and out times are set
                    if (input.classList.contains('attendance-in-time') || 
                        input.classList.contains('attendance-out-time')) {
                        handleTimeChange(input);
                        }
                    }
                }
            });
        });
        
        // Mark as applied
        input.setAttribute('data-timepicker-applied', 'true');
    });
}

// Add this function to handle modal accessibility
function setupModalAccessibility(modalElement) {
    // When modal is shown
    modalElement.addEventListener('show.bs.modal', () => {
        // Remove aria-hidden when modal is visible
        modalElement.removeAttribute('aria-hidden');
        
        try {
            // Add inert to the main content outside modal
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.setAttribute('inert', '');
            }
        } catch (error) {
            console.error('Error setting inert attribute:', error);
        }
    });
    
    // When modal is hidden
    modalElement.addEventListener('hidden.bs.modal', () => {
        // Add aria-hidden back when modal is hidden
        modalElement.setAttribute('aria-hidden', 'true');
        
        try {
            // Remove inert from main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.removeAttribute('inert');
            }
        } catch (error) {
            console.error('Error removing inert attribute:', error);
        }
    });
}

// Mark the row as changed
function markRowChanged(row) {
    if (row) {
        row.classList.add('table-warning');
    }
}

// ... existing code ...
window.showNumberWheelX = function(inputElement) { showHajiriXYPoup(inputElement, 'X'); };
window.showNumberWheelY = function(inputElement) { showHajiriXYPoup(inputElement, 'Y'); };

function showHajiriXYPoup(inputElement, focusField) {
    // If a popup is already open, remove it
    const existingPopup = document.querySelector('.hajiri-xy-custom-popup');
    if (existingPopup) {
        existingPopup.parentNode.removeChild(existingPopup);
    }
    
    const row = inputElement.closest('tr');
    const workerName = row.cells[1]?.textContent || 'Unnamed';
    const paBtn = row.querySelector('.pa-toggle-btn');
    const isPresent = paBtn && paBtn.textContent === 'P';
    const statusBadge = isPresent
        ? '<span class="badge bg-success ms-2">P</span>'
        : '<span class="badge bg-danger ms-2">A</span>';
    const xInput = row.querySelector('.hajiri-x');
    const yInput = row.querySelector('.hajiri-y');
    let xValue = xInput.value || '';
    let yValue = yInput.value || '';

    // Create a custom popup without Bootstrap modal
    const popupHTML = `
        <div class="hajiri-xy-custom-popup">
            <div class="hajiri-xy-custom-container">
                <div class="hajiri-xy-custom-header">
                    <h5 class="hajiri-xy-custom-title">${workerName} ${statusBadge}</h5>
                    <button type="button" class="hajiri-xy-custom-close">&times;</button>
                </div>
                <div class="hajiri-xy-custom-body">
                    <div class="hajiri-xy-custom-inputs">
                        <input type="text" class="hajiri-x-custom" value="${xValue === '0' ? '' : xValue}" maxlength="2" pattern="[0-9]*" inputmode="numeric">
                        <span class="hajiri-xy-custom-p">P</span>
                        <input type="text" class="hajiri-y-custom" value="${yValue === '0' ? '' : yValue}" maxlength="2" pattern="[0-9]*" inputmode="numeric">
                    </div>
                </div>
                <div class="hajiri-xy-custom-footer">
                    <button type="button" class="hajiri-xy-custom-btn hajiri-xy-custom-prev">पीछे</button>
                    <button type="button" class="hajiri-xy-custom-btn hajiri-xy-custom-set">ठीक है</button>
                    <button type="button" class="hajiri-xy-custom-btn hajiri-xy-custom-next">आगे</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for the custom popup
    if (!document.getElementById('hajiri-xy-custom-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'hajiri-xy-custom-styles';
        styleElement.textContent = `
            .hajiri-xy-custom-popup {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1050;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .hajiri-xy-custom-container {
                background-color: white;
                border-radius: 12px;
                width: 95%;
                max-width: 350px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                animation: hajiri-xy-fade-in 0.2s ease;
            }
            @keyframes hajiri-xy-fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .hajiri-xy-custom-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
                background-color: #f8f9fa;
            }
            .hajiri-xy-custom-title {
                margin: 0;
                font-size: 18px;
                font-weight: 500;
            }
            .hajiri-xy-custom-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                color: #6c757d;
            }
            .hajiri-xy-custom-body {
                padding: 30px 20px;
                background-color: #ffffff;
            }
            .hajiri-xy-custom-inputs {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
            }
            .hajiri-x-custom, .hajiri-y-custom {
                width: 70px;
                height: 70px;
                font-size: 28px;
                text-align: center;
                border: 2px solid #ced4da;
                border-radius: 10px;
                padding: 10px;
                background-color: #f8f9fa;
                font-weight: bold;
            }
            .hajiri-x-custom:focus, .hajiri-y-custom:focus {
                border-color: #0d6efd;
                box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
                outline: none;
            }
            .hajiri-xy-custom-p {
                font-size: 32px;
                font-weight: bold;
                color: #212529;
            }
            .hajiri-xy-custom-footer {
                display: flex;
                gap: 10px;
                padding: 16px 20px;
                border-top: 1px solid #e5e7eb;
                background-color: #f8f9fa;
            }
            .hajiri-xy-custom-btn {
                flex: 1;
                padding: 12px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .hajiri-xy-custom-prev {
                background-color: #f1f5f9;
                color: #64748b;
            }
            .hajiri-xy-custom-set {
                background-color: #16a34a;
                color: white;
            }
            .hajiri-xy-custom-next {
                background-color: #e0f2fe;
                color: #0369a1;
            }
            .hajiri-xy-custom-prev:hover {
                background-color: #e2e8f0;
                transform: translateY(-2px);
            }
            .hajiri-xy-custom-next:hover {
                background-color: #bae6fd;
                transform: translateY(-2px);
            }
            .hajiri-xy-custom-set:hover {
                background-color: #15803d;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Append the popup to the body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Get the popup and its elements
    const popup = document.querySelector('.hajiri-xy-custom-popup');
    const xBox = popup.querySelector('.hajiri-x-custom');
    const yBox = popup.querySelector('.hajiri-y-custom');

    // Focus logic
    if (focusField === 'X') xBox.focus();
    else yBox.focus();

    // Only allow numeric input, no leading zero
    [xBox, yBox].forEach(box => {
        box.addEventListener('focus', function() {
            if (this.value === '0') this.value = '';
        });
        box.addEventListener('input', function() {
            this.value = this.value.replace(/^0+(?!$)/, '').replace(/[^0-9]/g, '');
            // Live update hours in table
            xInput.value = xBox.value || '0';
            yInput.value = yBox.value || '0';
            const hoursCell = row.querySelector('.working-hours');
            if (hoursCell) {
                const hoursValue = (parseInt(xBox.value) || 0) * 8 + (parseInt(yBox.value) || 0);
                hoursCell.textContent = hoursValue;
            }
        });
    });

    // Enter key navigation
    xBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            yBox.focus();
            e.preventDefault();
        }
    });
    yBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            closePopup();
            // Move to next present worker's X if possible
            let nextRow = row.nextElementSibling;
            while (nextRow && nextRow.querySelector('.pa-toggle-btn')?.textContent !== 'P') {
                nextRow = nextRow.nextElementSibling;
            }
            if (nextRow && nextRow.querySelector('.hajiri-x')) {
                setTimeout(() => {
                    showHajiriXYPoup(nextRow.querySelector('.hajiri-x'), 'X');
                }, 300);
            }
            e.preventDefault();
        }
    });
    
    // Close popup function
    function closePopup() {
        if (popup && popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
        
        // Return focus to the input element
        if (inputElement && typeof inputElement.focus === 'function') {
            try {
                setTimeout(() => {
                    inputElement.focus();
                }, 100);
            } catch (e) {
                console.warn('Could not return focus to input element', e);
            }
        }
    }

    // Button handlers
    popup.querySelector('.hajiri-xy-custom-close').addEventListener('click', closePopup);
    
    popup.querySelector('.hajiri-xy-custom-set').addEventListener('click', function() {
        xInput.value = xBox.value || '0';
        yInput.value = yBox.value || '0';
        markRowChanged(row);
        closePopup();
    });
    
    popup.querySelector('.hajiri-xy-custom-prev').addEventListener('click', function() {
        closePopup();
        // Move to previous present worker's Y if possible
        let prevRow = row.previousElementSibling;
        while (prevRow && prevRow.querySelector('.pa-toggle-btn')?.textContent !== 'P') {
            prevRow = prevRow.previousElementSibling;
        }
        if (prevRow && prevRow.querySelector('.hajiri-y')) {
            setTimeout(() => {
                showHajiriXYPoup(prevRow.querySelector('.hajiri-y'), 'Y');
            }, 300);
        }
    });
    
    popup.querySelector('.hajiri-xy-custom-next').addEventListener('click', function() {
        closePopup();
        // Move to next present worker's X if possible
        let nextRow = row.nextElementSibling;
        while (nextRow && nextRow.querySelector('.pa-toggle-btn')?.textContent !== 'P') {
            nextRow = nextRow.nextElementSibling;
        }
        if (nextRow && nextRow.querySelector('.hajiri-x')) {
            setTimeout(() => {
                showHajiriXYPoup(nextRow.querySelector('.hajiri-x'), 'X');
            }, 300);
        }
    });
    
    // Close when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
}

// Update P/A toggle button styling
function togglePAToggle(btn) {
    const isPresent = btn.textContent === 'P';
    const row = btn.closest('tr');
    if (isPresent) {
        btn.textContent = 'A';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-danger');
        row.classList.add('table-secondary');
        row.style.background = '';
        row.querySelectorAll('.hajiri-x, .hajiri-y').forEach(input => {
            input.setAttribute('disabled', '');
            input.style.background = '#eee';
        });
    } else {
        btn.textContent = 'P';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-success');
        row.classList.remove('table-secondary');
        row.style.background = '#fff';
        row.querySelectorAll('.hajiri-x, .hajiri-y').forEach(input => {
            input.removeAttribute('disabled');
            input.style.background = '';
        });
    }
    row.classList.add('table-warning');
}
window.togglePAToggle = togglePAToggle;

// Add localStorage backup/restore functionality with 7-day expiration
function backupAttendanceToLocalStorage() {
    try {
        const attendanceRows = document.querySelectorAll('#attendance-table tr');
        if (!attendanceRows.length) return;

        const date = document.getElementById('attendance-date')?.value || new Date().toISOString().split('T')[0];
        const backupData = [];

        attendanceRows.forEach(row => {
            if (!row.dataset.workerId) return;
            // Make sure to capture P/A status properly
            const paBtn = row.querySelector('.pa-toggle-btn');
            const hajiriPA = paBtn ? paBtn.textContent : 'A';
            
            const backup = {
                workerId: row.dataset.workerId,
                hajiriPA: hajiriPA,
                hajiriX: row.querySelector('.hajiri-x')?.value || '0',
                hajiriY: row.querySelector('.hajiri-y')?.value || '0',
                isChanged: row.classList.contains('table-warning'),
                isPresent: hajiriPA === 'P' // Explicitly store present status
            };
            backupData.push(backup);
        });

        // Save with timestamp for 7-day expiration
        const draftObj = {
            data: backupData,
            savedAt: Date.now()
        };
        localStorage.setItem(`attendance_backup_${date}`, JSON.stringify(draftObj));
        console.log('Attendance state backed up to localStorage');
        
        // Show the load draft button since we now have a draft
        const loadDraftBtn = document.getElementById('load-draft-btn');
        if (loadDraftBtn) loadDraftBtn.style.display = 'block';
    } catch (error) {
        console.error('Error backing up attendance state:', error);
    }
}

function restoreAttendanceFromLocalStorage() {
    try {
        const date = document.getElementById('attendance-date')?.value || new Date().toISOString().split('T')[0];
        const backupJson = localStorage.getItem(`attendance_backup_${date}`);
        
        // Update the load draft button visibility - always show it
        const loadDraftBtn = document.getElementById('load-draft-btn');
        if (loadDraftBtn) {
            loadDraftBtn.style.display = 'block';
        }
        
        if (!backupJson) return false;

        // Parse the backup, handling both old and new format
        let backupData = [];
        try {
            const parsed = JSON.parse(backupJson);
            // Check if it's the new format with timestamp
            if (parsed.data && Array.isArray(parsed.data)) {
                backupData = parsed.data;
            } else if (Array.isArray(parsed)) {
                // Old format (just array)
                backupData = parsed;
            }
        } catch (e) {
            console.error('Error parsing backup JSON:', e);
            return false;
        }

        if (!backupData.length) return false;

        const rows = document.querySelectorAll('#attendance-table tr');
        let restoredCount = 0;

        rows.forEach(row => {
            if (!row.dataset.workerId) return;
            const backup = backupData.find(b => b.workerId === row.dataset.workerId);
            if (!backup) return;

            // Restore P/A status with proper styling
            const paBtn = row.querySelector('.pa-toggle-btn');
            if (paBtn && paBtn.textContent !== backup.hajiriPA) {
                paBtn.textContent = backup.hajiriPA;
                
                // Apply proper styling based on P/A status
                if (backup.hajiriPA === 'P') {
                    paBtn.classList.remove('btn-danger');
                    paBtn.classList.add('btn-success');
                    row.classList.remove('table-secondary');
                    row.style.background = '#fff';
                    
                    // Enable hajiri inputs
                    row.querySelectorAll('.hajiri-x, .hajiri-y').forEach(input => {
                        input.removeAttribute('disabled');
                        input.style.background = '';
                    });
                } else {
                    paBtn.classList.remove('btn-success');
                    paBtn.classList.add('btn-danger');
                    row.classList.add('table-secondary');
                    row.style.background = '';
                    
                    // Disable hajiri inputs
                    row.querySelectorAll('.hajiri-x, .hajiri-y').forEach(input => {
                        input.setAttribute('disabled', '');
                        input.style.background = '#eee';
                    });
                }
                
                row.classList.add('table-warning');
                restoredCount++;
            }

            // Restore X value
            const xInput = row.querySelector('.hajiri-x');
            if (xInput && xInput.value !== backup.hajiriX) {
                xInput.value = backup.hajiriX;
                row.classList.add('table-warning');
                restoredCount++;
            }

            // Restore Y value
            const yInput = row.querySelector('.hajiri-y');
            if (yInput && yInput.value !== backup.hajiriY) {
                yInput.value = backup.hajiriY;
                row.classList.add('table-warning');
                restoredCount++;
            }

            // Update hours calculation
            const hoursCell = row.querySelector('.working-hours');
            if (hoursCell) {
                const hoursValue = (parseInt(backup.hajiriX) || 0) * 8 + (parseInt(backup.hajiriY) || 0);
                hoursCell.textContent = hoursValue;
            }

            if (backup.isChanged) {
                row.classList.add('table-warning');
            }
        });

        if (restoredCount > 0) {
            showToast(`Restored ${restoredCount} attendance entries from your last session`, 'info');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error restoring attendance state:', error);
        return false;
    }
}

// Remove the beforeunload event listener - no auto-save
// window.addEventListener('beforeunload', backupAttendanceToLocalStorage);

// Function to clean up drafts older than 7 days
function cleanupOldDrafts() {
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('attendance_backup_')) {
            try {
                const item = localStorage.getItem(key);
                if (!item) continue;
                
                const parsed = JSON.parse(item);
                // Check if it's the new format with timestamp
                if (parsed && parsed.savedAt && (now - parsed.savedAt > sevenDays)) {
                    localStorage.removeItem(key);
                    console.log(`Removed expired draft: ${key}`);
                }
            } catch (e) {
                console.error(`Error processing draft ${key}:`, e);
            }
        }
    }
}

// Call cleanup on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add this line at the beginning of your existing DOMContentLoaded handler
    cleanupOldDrafts();
    
    // ... rest of your existing DOMContentLoaded code ...
});

// Update the load attendance function to still restore on page load but not right after saving
const originalLoadAttendance = loadAttendance;
loadAttendance = function() {
    try {
        // Call the original function but handle the case where it might not return a Promise
        const result = originalLoadAttendance();
        
        // If it returns a Promise, chain our restore function
        if (result && typeof result.then === 'function') {
            // We'll check if we just saved a draft before attempting to restore
            if (!window.justSavedDraft) {
            return result.then(() => {
                // After loading attendance from server, try to restore any local changes
                setTimeout(() => {
                    restoreAttendanceFromLocalStorage();
                }, 500); // Give time for the table to render
            })
            .catch(error => {
                console.error('Error in loadAttendance:', error);
                // Still try to restore from localStorage even if server load fails
                setTimeout(() => {
                    restoreAttendanceFromLocalStorage();
                }, 500);
            });
        } else {
                console.log('Skipping auto-restoration because we just saved a draft');
                // Reset the flag after a short delay
                setTimeout(() => {
                    window.justSavedDraft = false;
                }, 2000);
                return result;
            }
        } else {
            // If it doesn't return a Promise, only restore if we didn't just save
            if (!window.justSavedDraft) {
            setTimeout(() => {
                restoreAttendanceFromLocalStorage();
            }, 1000);
            } else {
                console.log('Skipping auto-restoration because we just saved a draft');
                // Reset the flag after a short delay
                setTimeout(() => {
                    window.justSavedDraft = false;
                }, 2000);
            }
            
            // Return a resolved Promise to maintain the interface
            return Promise.resolve();
        }
    } catch (error) {
        console.error('Error in loadAttendance wrapper:', error);
        // Return a resolved Promise to prevent further errors
        return Promise.resolve();
    }
};

// Remove the beforeunload event listener - no auto-save
// window.addEventListener('beforeunload', backupAttendanceToLocalStorage);

// Improved error catch for saveAllAttendance function
function handleApiError(error, response) {
    console.error('API Error:', error);
    
    // If we have a response object, try to extract more info
    if (response) {
        console.error('Response status:', response.status);
        
        try {
            console.error('Response headers:', response.headers);
        } catch (e) {
            console.error('Could not log response headers:', e);
        }
        
        // Try to get the response body
        return response.text()
            .then(text => {
                let errorMessage = '';
                
                try {
                    // Check if the response is HTML
                    if (text.trim().toLowerCase().startsWith('<!doctype') || 
                        text.trim().toLowerCase().startsWith('<html')) {
                        console.log('Received HTML response instead of JSON');
                        
                        // Try to extract error message from HTML if possible
                        let errorMsg = 'HTML response received instead of JSON';
                        
                        // Try to extract error from various HTML elements
                        const errorMatches = [
                            text.match(/<title[^>]*>(.*?)<\/title>/i),
                            text.match(/<h1[^>]*>(.*?)<\/h1>/i),
                            text.match(/<p class="error"[^>]*>(.*?)<\/p>/i),
                            text.match(/<div class="error"[^>]*>(.*?)<\/div>/i)
                        ];
                        
                        for (const match of errorMatches) {
                            if (match && match[1]) {
                                errorMsg = match[1].trim();
                                break;
                            }
                        }
                        
                        return `Server Error (${response.status}): ${errorMsg}`;
                    }
                    
                    // Try to parse as JSON
                    const json = JSON.parse(text);
                    console.error('Response body (JSON):', json);
                    
                    // Build a more detailed error message
                    errorMessage = json.message || 'Unknown server error';
                    
                    // Add additional details if available
                    if (json.errors && Array.isArray(json.errors)) {
                        errorMessage += ': ' + json.errors.map(e => e.message || e).join(', ');
                    } else if (json.details) {
                        errorMessage += ': ' + json.details;
                    } else if (json.error) {
                        errorMessage += ': ' + json.error;
                    }
                    
                    return `Server Error (${response.status}): ${errorMessage}`;
                } catch (e) {
                    // Not JSON, show as text
                    console.error('Response is not valid JSON:', e);
                    console.error('Raw response text (first 200 chars):', text.substring(0, 200));
                    
                    // If text is short enough, just use it directly
                    if (text.length < 100) {
                        return `Server Error (${response.status}): ${text.trim()}`;
                    } else {
                        return `Server Error (${response.status}): Non-JSON response received`;
                    }
                }
            })
            .catch(e => {
                console.error('Error reading response:', e);
                return `Server Error (${response.status}): Failed to read response body`;
            });
    }
    
    return Promise.resolve(error.message || 'Unknown error');
}

// Handle date change to update draft button visibility
function handleDateChange() {
    const dateInput = document.getElementById('attendance-date');
    const loadDraftBtn = document.getElementById('load-draft-btn');
    
    if (dateInput && loadDraftBtn) {
        // Always show the load draft button
        loadDraftBtn.style.display = 'block';
    }
}

// Add event listener to date input
// Removed duplicate DOMContentLoaded event listener - functionality already exists at line 1725

// Create a custom time picker interface similar to the X/Y popup
function showCustomTimePicker(inputElement, onSetCallback) {
    // Create a popup container
    const popup = document.createElement('div');
    popup.className = 'time-picker-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    popup.style.zIndex = '9999';
    popup.style.width = '300px';
    popup.style.textAlign = 'center';

    // Add header
    const header = document.createElement('div');
    header.style.marginBottom = '15px';
    header.style.fontWeight = 'bold';
    header.style.fontSize = '18px';
    header.textContent = 'समय चुनें';
    popup.appendChild(header);

    // Create time selection wheels container
    const wheelsContainer = document.createElement('div');
    wheelsContainer.style.display = 'flex';
    wheelsContainer.style.justifyContent = 'center';
    wheelsContainer.style.marginBottom = '20px';
    popup.appendChild(wheelsContainer);

    // Hour wheel
    const hourWheel = createNumberWheel(1, 12, 'घंटे');
    wheelsContainer.appendChild(hourWheel);

    // Minute wheel
    const minuteWheel = createNumberWheel(0, 59, 'मिनट', true);
    wheelsContainer.appendChild(minuteWheel);

    // AM/PM wheel
    const periodWheel = document.createElement('div');
    periodWheel.className = 'wheel period-wheel';
    periodWheel.style.width = '80px';
    periodWheel.style.overflow = 'hidden';
    periodWheel.style.position = 'relative';
    periodWheel.style.height = '120px';
    periodWheel.style.margin = '0 5px';

    const periodLabel = document.createElement('div');
    periodLabel.style.textAlign = 'center';
    periodLabel.style.fontSize = '14px';
    periodLabel.style.marginBottom = '5px';
    periodLabel.textContent = 'AM/PM';
    periodWheel.appendChild(periodLabel);

    const periodSelector = document.createElement('div');
    periodSelector.className = 'wheel-selector';
    periodSelector.style.height = '80px';
    periodSelector.style.overflowY = 'auto';
    periodSelector.style.scrollbarWidth = 'none';
    periodSelector.style.msOverflowStyle = 'none';
    periodSelector.style.position = 'relative';
    periodWheel.appendChild(periodSelector);

    // Add AM/PM options
    const periods = ['AM', 'PM'];
    periods.forEach(period => {
        const option = document.createElement('div');
        option.className = 'wheel-option';
        option.style.height = '40px';
        option.style.display = 'flex';
        option.style.alignItems = 'center';
        option.style.justifyContent = 'center';
        option.style.cursor = 'pointer';
        option.textContent = period;
        option.dataset.value = period;
        periodSelector.appendChild(option);
    });
    wheelsContainer.appendChild(periodWheel);

    // Add selection indicator
    const indicator = document.createElement('div');
    indicator.style.position = 'absolute';
    indicator.style.left = '0';
    indicator.style.right = '0';
    indicator.style.top = '50%';
    indicator.style.transform = 'translateY(-50%)';
    indicator.style.height = '40px';
    indicator.style.borderTop = '1px solid #ccc';
    indicator.style.borderBottom = '1px solid #ccc';
    indicator.style.pointerEvents = 'none';
    popup.appendChild(indicator);

    // Add buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'space-between';
    buttonsContainer.style.marginTop = '20px';
    popup.appendChild(buttonsContainer);

    // Add OK button
    const okButton = document.createElement('button');
    okButton.className = 'btn btn-primary time-picker-custom-ok';
    okButton.style.flexGrow = '1';
    okButton.style.margin = '0 5px';
    okButton.textContent = 'ठीक है';
    buttonsContainer.appendChild(okButton);

    // Add popup to body
    document.body.appendChild(popup);

    // Initialize wheel positions
    let now = new Date();
    let currentHour = now.getHours();
    let selectedHour = currentHour > 12 ? currentHour - 12 : (currentHour === 0 ? 12 : currentHour);
    let selectedMinute = now.getMinutes();
    let selectedPeriod = currentHour >= 12 ? 'PM' : 'AM';

    // Set initial wheel positions
    scrollToValue(hourWheel.querySelector('.wheel-selector'), selectedHour);
    scrollToValue(minuteWheel.querySelector('.wheel-selector'), selectedMinute);
    scrollToValue(periodSelector, selectedPeriod);

    // Add event listeners for wheel scrolling
    setupWheelScrolling(hourWheel.querySelector('.wheel-selector'), value => {
        selectedHour = parseInt(value);
    });

    setupWheelScrolling(minuteWheel.querySelector('.wheel-selector'), value => {
        selectedMinute = parseInt(value);
    });

    setupWheelScrolling(periodSelector, value => {
        selectedPeriod = value;
    });

    // Function to close popup
    function closePopup() {
        document.body.removeChild(popup);
    }

    // Add click event for OK button
    popup.querySelector('.time-picker-custom-ok').addEventListener('click', () => {
        const time24 = format24Hour(selectedHour, selectedMinute, selectedPeriod);
        console.log('Time selected:', time24, 'for input:', inputElement.id);
        
        // Temporarily remove readonly to ensure value can be set
        const wasReadOnly = inputElement.readOnly;
        if (wasReadOnly) {
            inputElement.removeAttribute('readonly');
        }
        
        // Set the value directly using both property and attribute
        inputElement.value = time24;
        inputElement.setAttribute('value', time24);
        console.log('Set input value directly to:', time24);
        
        // Force the input to visually update by triggering a focus and blur
        inputElement.focus();
        inputElement.blur();
        
        // Restore readonly if it was set
        if (wasReadOnly) {
            inputElement.readOnly = true;
        }
        
        // Trigger change event to notify other parts of the application
        const event = new Event('change', { bubbles: true });
        inputElement.dispatchEvent(event);
        
        // Call the callback if provided
        if (typeof onSetCallback === 'function') {
            onSetCallback(time24);
        }
        
        closePopup();
    });

    // Add click event for backdrop to close popup
    document.addEventListener('click', function onClickOutside(e) {
        if (!popup.contains(e.target) && e.target !== inputElement) {
            document.removeEventListener('click', onClickOutside);
            closePopup();
        }
    });
}

// Override the existing showInfiniteTimePicker function to use our custom implementation
window.showInfiniteTimePicker = function(inputElement, onSetCallback) {
    // Use our new wheel-based time picker
    showWheelTimePicker(inputElement, onSetCallback);
};

// Create a custom time picker for the in/out time fields
function showHajiriTimePicker(inputElement, onSetCallback) {
    // If a popup is already open, remove it
    const existingPopup = document.querySelector('.time-picker');
    if (existingPopup) {
        existingPopup.parentNode.removeChild(existingPopup);
    }
    
    // Create a custom popup without Bootstrap modal
    const popupHTML = `
        <div class="time-picker">
            <!-- Header -->
            <div class="header">
                <h3>समय चुनें</h3>
                <div class="time-display" id="timeDisplay">12:00 AM</div>
            </div>

            <!-- Wheels Container -->
            <div class="wheels-container">
                <!-- Selection Indicator -->
                <div class="selection-indicator"></div>

                <!-- Hour Wheel -->
                <div class="wheel">
                    <div class="wheel-scroller" id="hourWheel">
                        ${Array.from({ length: 12 }, (_, i) => `<div class="wheel-item">${i+1}</div>`).join('')}
                    </div>
                </div>

                <!-- Colon -->
                <div class="colon">:</div>

                <!-- Minute Wheel -->
                <div class="wheel">
                    <div class="wheel-scroller" id="minuteWheel">
                        ${Array.from({ length: 60 * 5 }, (_, i) => `<div class="wheel-item">${(i % 60).toString().padStart(2, '0')}</div>`).join('')}
                    </div>
                </div>

                <!-- Period Wheel -->
                <div class="wheel">
                    <div class="wheel-scroller" id="periodWheel">
                        <div class="wheel-item period-item">AM</div>
                        <div class="wheel-item period-item">PM</div>
                    </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="buttons">
                <button class="btn btn-cancel" id="timePickerCancel">रद्द करें</button>
                <button class="btn btn-ok" id="timePickerOk">ठीक है</button>
            </div>
        </div>
        <div class="time-picker-backdrop"></div>
    `;
    
    // Add styles for the custom popup
    if (!document.getElementById('hajiri-time-custom-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'hajiri-time-custom-styles';
        styleElement.textContent = `
            .time-picker-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1050;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .time-picker {
                width: 280px;
                background-color: white;
                border-radius: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                padding: 24px;
                z-index: 1051;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .header {
                text-align: center;
                margin-bottom: 24px;
            }
            .header h3 {
                margin: 0 0 12px 0;
                font-size: 16px;
                color: #6b7280;
                font-weight: 500;
            }
            .time-display {
                font-size: 32px;
                font-weight: 700;
                color: #1f2937;
                font-family: ui-monospace, "SF Mono", Consolas, monospace;
                letter-spacing: 0.5px;
            }
            .wheels-container {
                display: flex;
                height: 135px;
                background-color: #f8fafc;
                border-radius: 16px;
                position: relative;
                overflow: hidden;
            }
            .selection-indicator {
                position: absolute;
                top: 45px;
                left: 8px;
                right: 8px;
                height: 45px;
                background-color: rgba(59, 130, 246, 0.08);
                border: 1px solid rgba(59, 130, 246, 0.15);
                border-radius: 12px;
                z-index: 1;
                pointer-events: none;
            }
            .wheel {
                flex: 1;
                position: relative;
            }
            .wheel-scroller {
                height: 100%;
                overflow-y: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
                padding: 45px 0;
                scroll-behavior: smooth;
                scroll-snap-type: y mandatory;
            }
            .wheel-scroller::-webkit-scrollbar {
                display: none;
            }
            .wheel-item {
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                color: #9ca3af;
                cursor: pointer;
                transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                user-select: none;
                scroll-snap-align: center;
                scroll-snap-stop: always;
            }
            .colon {
                width: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                font-weight: 600;
                color: #d1d5db;
            }
            .period-item {
                font-size: 16px;
                font-weight: 500;
            }
            .buttons {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }
            .btn {
                flex: 1;
                padding: 14px;
                border: none;
                border-radius: 12px;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s ease;
            }
            .btn-cancel {
                background-color: #f1f5f9;
                color: #64748b;
            }
            .btn-cancel:hover {
                background-color: #e2e8f0;
                transform: translateY(-1px);
            }
            .btn-ok {
                background-color: #3b82f6;
                color: white;
            }
            .btn-ok:hover {
                background-color: #2563eb;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Create container for the popup
    const container = document.createElement('div');
    container.className = 'time-picker-backdrop';
    container.innerHTML = popupHTML;
    
    // Append the popup to the body
    document.body.appendChild(container);
    
    // Get the popup and its elements
    const timeDisplay = container.querySelector('#timeDisplay');
    const hourWheel = container.querySelector('#hourWheel');
    const minuteWheel = container.querySelector('#minuteWheel');
    const periodWheel = container.querySelector('#periodWheel');
    
    // Initialize with current time or parsed time from input
    let currentTime;
    if (inputElement && inputElement.value) {
        currentTime = parseTimeInput(inputElement.value);
    }
    
    if (!currentTime) {
        currentTime = new Date();
    }
    
    let selectedHour = currentTime.getHours() > 12 ? currentTime.getHours() - 12 : (currentTime.getHours() === 0 ? 12 : currentTime.getHours());
    let selectedMinute = currentTime.getMinutes();
    let selectedPeriod = currentTime.getHours() >= 12 ? 'PM' : 'AM';
    
    // Update time display
    function updateTimeDisplay() {
        timeDisplay.textContent = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    }
    
    // Function to parse time input
    function parseTimeInput(timeStr) {
        if (!timeStr) return new Date();
        
        try {
            // Check if it's in 24-hour format (HH:MM)
            const [hours, minutes] = timeStr.split(':').map(Number);
            
            if (isNaN(hours) || isNaN(minutes)) return new Date();
            
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            
            return date;
        } catch (e) {
            console.error('Error parsing time:', e);
            return new Date();
        }
    }
    
    // Function to handle infinite scroll for minutes
    function handleInfiniteScroll(container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const itemHeight = 45;
        const totalItems = 60 * 5;
        const sectionLength = 60;
        const middleSection = Math.floor(totalItems / 5) * 2;

        if (scrollTop < itemHeight) {
            container.scrollTop = middleSection * itemHeight + (scrollTop % itemHeight);
        } else if (scrollTop > scrollHeight - clientHeight - itemHeight) {
            const offset = scrollHeight - clientHeight - scrollTop;
            container.scrollTop = (middleSection + sectionLength) * itemHeight - offset;
        }
    }
    
    // Function to handle wheel scrolling
    function handleScroll(container, isHour = false, isMinute = false, isPeriod = false) {
        const scrollTop = container.scrollTop;
        const itemHeight = 45;
        
        // Calculate selected index
        const selectedIndex = Math.round(scrollTop / itemHeight);
        
        if (isHour) {
            selectedHour = selectedIndex + 1;
        } else if (isMinute) {
            handleInfiniteScroll(container);
            selectedMinute = selectedIndex % 60;
        } else if (isPeriod) {
            selectedPeriod = selectedIndex === 0 ? 'AM' : 'PM';
        }
        
        // Visual updates for all items
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const distance = Math.abs(i - selectedIndex);
            
            if (distance === 0) {
                child.style.color = '#3b82f6';
                child.style.fontWeight = '600';
                child.style.transform = 'scale(1.05)';
                child.style.opacity = '1';
            } else if (distance === 1) {
                child.style.color = '#6b7280';
                child.style.fontWeight = '500';
                child.style.transform = 'scale(0.95)';
                child.style.opacity = '0.8';
            } else {
                child.style.color = '#9ca3af';
                child.style.fontWeight = '400';
                child.style.transform = 'scale(0.9)';
                child.style.opacity = '0.5';
            }
        }
        
        // Update time display
        updateTimeDisplay();
        
        // Snap to nearest item after scrolling stops
        clearTimeout(container.snapTimeout);
        container.snapTimeout = setTimeout(() => {
            const targetScroll = selectedIndex * itemHeight;
            if (Math.abs(scrollTop - targetScroll) > 2) {
                container.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }
        }, 150);
    }
    
    // Function to scroll to a specific value
    function scrollToValue(container, value, isHour = false, isMinute = false, isPeriod = false) {
        let targetIndex;
        
        if (isHour) {
            targetIndex = value - 1;
        } else if (isMinute) {
            const middleStart = Math.floor(60 * 5 / 5) * 2;
            targetIndex = middleStart + value;
        } else if (isPeriod) {
            targetIndex = value === 'AM' ? 0 : 1;
        }
        
        if (targetIndex !== undefined) {
            container.scrollTo({
                top: targetIndex * 45,
                behavior: 'smooth'
            });
        }
    }
    
    // Set initial wheel positions
    scrollToValue(hourWheel, selectedHour, true, false, false);
    scrollToValue(minuteWheel, selectedMinute, false, true, false);
    scrollToValue(periodWheel, selectedPeriod, false, false, true);
    updateTimeDisplay();
    
    // Add scroll event listeners
    let scrollTimeout;
    
    hourWheel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleScroll(hourWheel, true, false, false);
        }, 10);
    });
    
    minuteWheel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleScroll(minuteWheel, false, true, false);
        }, 10);
    });
    
    periodWheel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleScroll(periodWheel, false, false, true);
        }, 10);
    });
    
    // Add click listeners for wheel items
    hourWheel.querySelectorAll('.wheel-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            selectedHour = index + 1;
            scrollToValue(hourWheel, selectedHour, true, false, false);
            updateTimeDisplay();
        });
    });
    
    minuteWheel.querySelectorAll('.wheel-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            selectedMinute = index % 60;
            scrollToValue(minuteWheel, selectedMinute, false, true, false);
            updateTimeDisplay();
        });
    });
    
    periodWheel.querySelectorAll('.wheel-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            selectedPeriod = index === 0 ? 'AM' : 'PM';
            scrollToValue(periodWheel, selectedPeriod, false, false, true);
            updateTimeDisplay();
        });
    });
    
    // Close popup function
    function closePopup() {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }
    
    // Button handlers
    container.querySelector('#timePickerCancel').addEventListener('click', closePopup);
    
    container.querySelector('#timePickerOk').addEventListener('click', function() {
        // Format time in 24-hour format for value
        let hours24 = selectedHour;
        if (selectedPeriod === 'PM' && selectedHour < 12) {
            hours24 += 12;
        } else if (selectedPeriod === 'AM' && selectedHour === 12) {
            hours24 = 0;
        }
        
        const time24 = `${hours24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
        
        if (typeof onSetCallback === 'function') {
            onSetCallback(time24);
        }
        
        closePopup();
    });
    
    // Close when clicking outside
    container.addEventListener('click', function(e) {
        if (e.target === container) {
            closePopup();
        }
    });
}

