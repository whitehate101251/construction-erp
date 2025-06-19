function checkAuth() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'manager') {
        window.location.href = 'login.html';
        return;
    }

    // Fetch user profile to confirm valid token
    fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Auth failed');
        }
        return response.json();
    })
    .then(data => {
        // Set the user's name in the sidebar - we will convert to Hindi in sidebar.js
        const userName = data.name || 'Manager';
        document.getElementById('foreman-name').textContent = userName;
        
        loadDashboardData();
    })
    .catch(error => {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });
} 