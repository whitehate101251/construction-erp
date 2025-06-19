const API_URL = 'http://localhost:5000';

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Only allow site managers and admin to access attendance page
    if (user.role !== 'site_manager' && user.role !== 'admin') {
        alert('Access denied. Only site managers and admins can access this page.');
        window.location.href = '/login.html';
    }
}

// Load sites for the dropdown
async function loadSites() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/sites`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load sites');
        }

        const data = await response.json();
        const siteSelect = document.querySelector('#siteSelect');
        
        data.sites.forEach(site => {
            const option = document.createElement('option');
            option.value = site._id;
            option.textContent = site.name;
            siteSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading sites:', error);
        alert('Error loading sites. Please try again.');
    }
}

// Load workers for the selected site
async function loadWorkers(siteId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/workers?site=${siteId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load workers');
        }

        const data = await response.json();
        const workerSelect = document.querySelector('#workerSelect');
        workerSelect.innerHTML = '<option value="">Select a worker...</option>';
        
        data.workers.forEach(worker => {
            const option = document.createElement('option');
            option.value = worker._id;
            option.textContent = worker.name;
            workerSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading workers:', error);
        alert('Error loading workers. Please try again.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadSites();

    // Add event listeners
    document.querySelector('#siteSelect').addEventListener('change', (e) => {
        if (e.target.value) {
            loadWorkers(e.target.value);
        }
    });
}); 