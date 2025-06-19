// Clear tokens on login page load
function clearInvalidTokens() {
    console.log('Login page loaded, clearing any existing tokens');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Always clear tokens when login page loads
    clearInvalidTokens();
    
    console.log('DOM loaded, initializing login form...');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent form from submitting normally
        console.log('Form submission started');
        
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const submitButton = this.querySelector('button[type="submit"]');

        if (!usernameInput || !passwordInput) {
            showError('Form inputs not found! Please refresh the page.');
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Basic validation
        if (!username || !password) {
            showError('Please enter both username and password.');
            return;
        }

        try {
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';
            
            // Construct the full URL using window.location
            const baseUrl = window.location.origin;
            const loginUrl = `${baseUrl}/api/auth/login`;
            console.log('Base URL:', baseUrl);
            console.log('Attempting login to:', loginUrl);
            console.log('Login payload:', { username });  // Don't log password
            
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            console.log('Response status:', response.status);
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
                console.log('Login response:', data);
            } else {
                const text = await response.text();
                console.error('Server response:', text);
                throw new Error('Received non-JSON response from server');
            }

            if (response.ok && data.token) {
                // Clear any previous errors
                hideError();
                
                // Store the token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                console.log('Login successful, redirecting based on role:', data.user.role);
                
                // Redirect based on user role
                switch(data.user.role) {
                    case 'admin':
                        window.location.href = '/admin.html';
                        break;
                    case 'site_manager':
                        window.location.href = '/manager.html';
                        break;
                    case 'site_incharge':
                        window.location.href = '/incharge.html';
                        break;
                    case 'worker':
                        window.location.href = '/worker.html';
                        break;
                    default:
                        showError('Invalid user role');
                }
            } else {
                // Show error message from server
                showError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('An error occurred during login. Please try again.');
        } finally {
            // Re-enable submit button and restore original text
            submitButton.disabled = false;
            submitButton.innerHTML = 'Login';
        }
    });

    // Helper function to show error message
    function showError(message) {
        console.error('Showing error:', message);
        if (loginError) {
            loginError.style.display = 'block';
            loginError.textContent = message;
        } else {
            alert(message);
        }
    }

    // Helper function to hide error message
    function hideError() {
        if (loginError) {
            loginError.style.display = 'none';
            loginError.textContent = '';
        }
    }
}); 