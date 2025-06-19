// Global variables
let currentWorker = null;
let todayAttendance = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Get current worker data
    fetch('/api/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            currentWorker = data.data;
            if (currentWorker.role !== 'worker') {
                window.location.href = '/login.html';
                return;
            }
            loadWorkerData();
        } else {
            window.location.href = '/login.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = '/login.html';
    });
});

// Load worker data
function loadWorkerData() {
    // Update worker info
    document.getElementById('worker-name').textContent = currentWorker.name;
    
    // Get site info
    fetch(`/api/sites/${currentWorker.site}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('worker-site').textContent = data.data.name;
        }
    })
    .catch(error => console.error('Error:', error));

    // Load today's attendance
    const today = new Date().toISOString().split('T')[0];
    fetch(`/api/attendance/worker/${currentWorker._id}/date/${today}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success' && data.data.length > 0) {
            todayAttendance = data.data[0];
            updateAttendanceStatus();
        }
    })
    .catch(error => console.error('Error:', error));
}

// Mark attendance
function markAttendance(type) {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    const formData = {
        worker: currentWorker._id,
        site: currentWorker.site,
        date: now.toISOString().split('T')[0],
        status: 'present'
    };

    if (type === 'checkIn') {
        formData.checkIn = time;
    } else {
        formData.checkOut = time;
    }

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
            todayAttendance = data.data;
            updateAttendanceStatus();
            alert(type === 'checkIn' ? 'Checked in successfully!' : 'Checked out successfully!');
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Update attendance status display
function updateAttendanceStatus() {
    const statusDiv = document.getElementById('attendance-status');
    if (!todayAttendance) {
        statusDiv.className = 'alert alert-info';
        statusDiv.textContent = 'Not marked';
        return;
    }

    let statusText = '';
    if (todayAttendance.checkIn && todayAttendance.checkOut) {
        statusText = `Checked in at ${todayAttendance.checkIn} and checked out at ${todayAttendance.checkOut}`;
        statusDiv.className = 'alert alert-success';
    } else if (todayAttendance.checkIn) {
        statusText = `Checked in at ${todayAttendance.checkIn}`;
        statusDiv.className = 'alert alert-warning';
    } else if (todayAttendance.checkOut) {
        statusText = `Checked out at ${todayAttendance.checkOut}`;
        statusDiv.className = 'alert alert-danger';
    }

    statusDiv.textContent = statusText;
} 