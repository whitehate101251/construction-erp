// Wheel-based Time Picker 

document.addEventListener('DOMContentLoaded', function() {
    // Make sure we don't add styles twice
    if (!document.getElementById('wheel-time-picker-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'wheel-time-picker-styles';
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
});

// Function to show the wheel time picker
function showWheelTimePicker(inputElement, onConfirmCallback, onCancelCallback) {
    // If a popup is already open, remove it
    const existingPopup = document.querySelector('.time-picker-backdrop');
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
    `;
    
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
    container.querySelector('#timePickerCancel').addEventListener('click', () => {
        if (typeof onCancelCallback === 'function') {
            onCancelCallback();
        }
        closePopup();
    });
    
    container.querySelector('#timePickerOk').addEventListener('click', () => {
        // Format time in 24-hour format for value
        let hours24 = selectedHour;
        if (selectedPeriod === 'PM' && selectedHour < 12) {
            hours24 += 12;
        } else if (selectedPeriod === 'AM' && selectedHour === 12) {
            hours24 = 0;
        }
        
        const time24 = `${hours24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
        
        if (typeof onConfirmCallback === 'function') {
            onConfirmCallback(time24);
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

// Make it available globally
window.showWheelTimePicker = showWheelTimePicker; 
