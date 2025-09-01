const API_URL = 'http://localhost:3000';

// Logout function
function logout() {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = '/login.html';
}

// Check if user is logged in and is admin
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'admin') {
        window.location.href = '/login.html';
    }
}

// Load site managers
async function loadSiteManagers() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/users?role=site_manager`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load site managers');
        }

        const data = await response.json();
        const managers = data.data.users;

        const managersList = document.getElementById('managersList');
        managersList.innerHTML = managers.map(manager => `
            <tr>
                <td>${manager.name}</td>
                <td>${manager.email}</td>
                <td>${manager.phone}</td>
                <td>
                    <span class="badge ${manager.status === 'active' ? 'bg-success' : 'bg-danger'} status-badge">
                        ${manager.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editManager('${manager._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteManager('${manager._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading site managers:', error);
        alert('Error loading site managers. Please try again.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadSiteManagers();
}); 