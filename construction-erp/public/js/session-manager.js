/**
 * Session Manager
 * Handles session management, token validation, and multiple tab detection
 */
const sessionManager = {
    // Storage key for the session ID
    SESSION_ID_KEY: 'erp_session_id',
    
    // Tab counts in localStorage
    TAB_COUNT_KEY: 'erp_tab_count',
    
    // Last active timestamp
    LAST_ACTIVE_KEY: 'erp_last_active',
    
    // Session timeout (30 minutes)
    SESSION_TIMEOUT: 30 * 60 * 1000,
    
    // Initialize the session manager
    init: function() {
        console.log('Initializing session manager');
        
        // Generate or retrieve session ID
        this.sessionId = this.getSessionId();
        
        // Increment tab count
        this.incrementTabCount();
        
        // Set up listeners
        this.setupListeners();
        
        // Set up periodic checks
        this.setupPeriodicChecks();
        
        // Update last active timestamp
        this.updateLastActive();
    },
    
    // Get or create a session ID
    getSessionId: function() {
        let sessionId = localStorage.getItem(this.SESSION_ID_KEY);
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem(this.SESSION_ID_KEY, sessionId);
        }
        return sessionId;
    },
    
    // Increment tab count
    incrementTabCount: function() {
        let count = parseInt(localStorage.getItem(this.TAB_COUNT_KEY) || '0', 10);
        count++;
        localStorage.setItem(this.TAB_COUNT_KEY, count.toString());
        console.log(`Tab count incremented to ${count}`);
    },
    
    // Decrement tab count
    decrementTabCount: function() {
        let count = parseInt(localStorage.getItem(this.TAB_COUNT_KEY) || '1', 10);
        count = Math.max(0, count - 1);
        localStorage.setItem(this.TAB_COUNT_KEY, count.toString());
        console.log(`Tab count decremented to ${count}`);
    },
    
    // Validate token expiration
    validateToken: function() {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        
        try {
            // Split the token and get the payload part (second part)
            const payload = token.split('.')[1];
            // Base64 decode and parse as JSON
            const decoded = JSON.parse(atob(payload));
            // Check expiration (exp is in seconds, Date.now() is milliseconds)
            if (decoded.exp * 1000 < Date.now()) {
                console.log('Token expired, clearing session');
                this.clearSession();
                return false;
            }
            return true;
        } catch (e) {
            console.error('Error validating token:', e);
            this.clearSession();
            return false;
        }
    },
    
    // Clear the session data
    clearSession: function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem(this.SESSION_ID_KEY);
        localStorage.removeItem(this.LAST_ACTIVE_KEY);
        // We don't clear the tab count here
    },
    
    // Setup event listeners
    setupListeners: function() {
        // Handle beforeunload (tab closing)
        window.addEventListener('beforeunload', () => {
            this.decrementTabCount();
        });
        
        // Handle user activity
        ['click', 'keypress', 'scroll', 'mousemove'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                this.updateLastActive();
            });
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.updateLastActive();
                // Validate token when tab becomes visible
                if (!this.validateToken()) {
                    window.location.href = '/login.html';
                }
            }
        });
    },
    
    // Set up periodic checks
    setupPeriodicChecks: function() {
        // Check session validity every minute
        setInterval(() => {
            if (!this.validateToken()) {
                window.location.href = '/login.html';
                return;
            }
            
            // Check for inactivity timeout
            const lastActive = parseInt(localStorage.getItem(this.LAST_ACTIVE_KEY) || '0', 10);
            const now = Date.now();
            
            if (now - lastActive > this.SESSION_TIMEOUT) {
                console.log('Session timeout due to inactivity');
                this.clearSession();
                window.location.href = '/login.html';
            }
        }, 60000); // Check every minute
    },
    
    // Update last active timestamp
    updateLastActive: function() {
        localStorage.setItem(this.LAST_ACTIVE_KEY, Date.now().toString());
    },
    
    // Notify about multiple tabs (if more than one is open)
    notifyMultipleTabs: function() {
        const count = parseInt(localStorage.getItem(this.TAB_COUNT_KEY) || '0', 10);
        if (count > 1) {
            console.log(`Application is open in ${count} tabs`);
            return count;
        }
        return 0;
    }
};

// Export the session manager
window.sessionManager = sessionManager; 