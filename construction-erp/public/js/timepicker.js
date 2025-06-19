/**
 * Modern Time Picker Implementation
 * Converted from React to vanilla JavaScript
 */

class InfiniteTimePicker {
  constructor(options = {}) {
    // Set default values and merge with options
    this.hour = options.initialHour || 9;
    this.minute = options.initialMinute || 0;
    this.period = options.initialPeriod || 'AM';
    this.onConfirm = options.onConfirm;
    this.onCancel = options.onCancel;
    this.triggerElement = options.triggerElement;
    this.modal = null;
  }

  formatTime() {
    return `${this.hour}:${this.minute.toString().padStart(2, '0')} ${this.period}`;
  }

  format24Hour() {
    let hours24 = this.hour;
    if (this.period === 'PM' && this.hour !== 12) {
      hours24 += 12;
    } else if (this.period === 'AM' && this.hour === 12) {
      hours24 = 0;
    }
    
    return `${hours24.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}`;
  }

  createTimePickerHTML() {
    // Create hours array
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    
    // Create minutes array
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    
    // Create infinite minutes array (5 repetitions for smooth infinite scroll)
    const infiniteMinutes = [];
    for (let i = 0; i < 5; i++) {
      infiniteMinutes.push(...minutes);
    }
    
    // Create periods array
    const periods = ['AM', 'PM'];

    return `
      <div class="time-picker-modal">
        <div class="time-picker-overlay"></div>
        <div class="time-picker-container">
          <!-- Header with Clock Display -->
          <div class="time-picker-header">
            <h3 class="time-picker-title">समय चुनें</h3>
            <div class="time-picker-clock-display">
              <span class="time-picker-selected-time">${this.formatTime()}</span>
            </div>
          </div>

          <!-- Wheels Container -->
          <div class="time-picker-wheels">
            <!-- Selection Indicator -->
            <div class="time-picker-selection-indicator"></div>

            <!-- Hour Wheel -->
            <div class="time-picker-wheel">
              <div class="time-picker-wheel-scroller" id="hourWheel">
                ${hours.map(hour => `
                  <div class="time-picker-wheel-item" data-value="${hour}">${hour}</div>
                `).join('')}
              </div>
            </div>

            <!-- Colon -->
            <div class="time-picker-colon">:</div>

            <!-- Minute Wheel -->
            <div class="time-picker-wheel">
              <div class="time-picker-wheel-scroller" id="minuteWheel">
                ${infiniteMinutes.map(minute => `
                  <div class="time-picker-wheel-item" data-value="${minute}">${minute.toString().padStart(2, '0')}</div>
                `).join('')}
              </div>
            </div>

            <!-- Period Wheel -->
            <div class="time-picker-wheel">
              <div class="time-picker-wheel-scroller" id="periodWheel">
                ${periods.map(period => `
                  <div class="time-picker-wheel-item" data-value="${period}">${period}</div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="time-picker-controls">
            <button class="time-picker-btn time-picker-cancel" id="cancelBtn">Cancel</button>
            <button class="time-picker-btn time-picker-ok" id="okBtn">OK</button>
          </div>
        </div>
      </div>
    `;
  }

  createStyles() {
    const style = document.createElement('style');
    style.id = 'time-picker-styles';
    style.textContent = `
      .time-picker-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1050;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .time-picker-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
      .time-picker-container {
        position: relative;
        background-color: white;
        border-radius: 12px;
        width: 90%;
        max-width: 320px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        animation: time-picker-fade-in 0.2s ease;
      }
      @keyframes time-picker-fade-in {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      .time-picker-header {
        padding: 16px;
        text-align: center;
        background: linear-gradient(135deg, #0d6efd, #0a58ca);
        color: white;
      }
      .time-picker-title {
        margin: 0;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: 500;
        color: white;
      }
      .time-picker-clock-display {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 10px;
        margin: 8px 0;
      }
      .time-picker-selected-time {
        font-size: 28px;
        font-weight: bold;
        color: white;
      }
      .time-picker-wheels {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        background-color: #f8f9fa;
      }
      .time-picker-selection-indicator {
        position: absolute;
        left: 10%;
        right: 10%;
        top: 50%;
        height: 40px;
        transform: translateY(-50%);
        background-color: rgba(13, 110, 253, 0.15);
        border-radius: 20px;
        pointer-events: none;
        border: 1px solid rgba(13, 110, 253, 0.3);
      }
      .time-picker-wheel {
        flex: 1;
        height: 200px;
        overflow: auto;
        scroll-snap-type: y mandatory;
        position: relative;
      }
      .time-picker-wheel-scroller {
        padding: 80px 0;
      }
      .time-picker-wheel-item {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: #333;
        scroll-snap-align: center;
        cursor: pointer;
      }
      .time-picker-wheel-item:hover {
        background-color: rgba(13, 110, 253, 0.1);
      }
      .time-picker-colon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        padding: 0 4px;
        color: #333;
      }
      .time-picker-controls {
        display: flex;
        border-top: 1px solid #eee;
      }
      .time-picker-btn {
        flex: 1;
        padding: 16px;
        border: none;
        background: none;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.15s;
      }
      .time-picker-cancel {
        color: #666;
      }
      .time-picker-ok {
        color: #0d6efd;
        font-weight: 500;
      }
      .time-picker-btn:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .time-picker-wheel::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    `;
    return style;
  }

  init() {
    // Add styles if not already added
    if (!document.getElementById('time-picker-styles')) {
      document.head.appendChild(this.createStyles());
    }
  }

  open() {
    // Create and append modal
    const modalHTML = this.createTimePickerHTML();
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    this.modal = modalContainer.firstElementChild;
    document.body.appendChild(this.modal);

    // Get wheel elements
    const hourWheel = this.modal.querySelector('#hourWheel');
    const minuteWheel = this.modal.querySelector('#minuteWheel');
    const periodWheel = this.modal.querySelector('#periodWheel');
    
    // Get time display element
    const timeDisplay = this.modal.querySelector('.time-picker-selected-time');
    
    // Data arrays
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const periods = ['AM', 'PM'];
    
    // Create infinite minute array (5 repetitions)
    const infiniteMinutes = [];
    for (let i = 0; i < 5; i++) {
      infiniteMinutes.push(...minutes);
    }

    // Setup event handlers
    const handleHourScroll = () => {
      handleScroll(hourWheel, hours, (value) => {
        this.hour = value;
        updateTimeDisplay();
      });
    };

    const handleMinuteScroll = () => {
      handleScroll(minuteWheel, minutes, (value) => {
        this.minute = value;
        updateTimeDisplay();
      }, true);
    };

    const handlePeriodScroll = () => {
      handleScroll(periodWheel, periods, (value) => {
        this.period = value;
        updateTimeDisplay();
      });
    };

    // Update the time display
    const updateTimeDisplay = () => {
      if (timeDisplay) {
        timeDisplay.textContent = this.formatTime();
      }
    };

    const handleScroll = (container, items, setValue, isInfinite = false) => {
      if (!container) return;
      
      const scrollTop = container.scrollTop;
      const itemHeight = 40;
      const middleOffset = container.clientHeight / 2 - itemHeight / 2;
      
      // Calculate the index of the centered item
      let index = Math.round((scrollTop + middleOffset) / itemHeight);
      
      if (isInfinite) {
        // For infinite scrolling, get the modulo
        index = index % items.length;
        
        // Handle infinite scroll
        handleInfiniteScroll(container);
      } else {
        // Clamp index for non-infinite lists
        index = Math.max(0, Math.min(index, items.length - 1));
      }
      
      // Set the value
      setValue(items[index]);
    };

    // Handle infinite scroll for minutes
    const handleInfiniteScroll = (container) => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const itemHeight = 40;
      const totalItems = infiniteMinutes.length;
      const sectionLength = 60; // One complete cycle
      const middleSection = Math.floor(totalItems / 5) * 2; // Start of middle section

      if (scrollTop < itemHeight) {
        container.scrollTop = middleSection * itemHeight + (scrollTop % itemHeight);
      } else if (scrollTop > scrollHeight - clientHeight - itemHeight) {
        const offset = scrollHeight - clientHeight - scrollTop;
        container.scrollTop = (middleSection + sectionLength) * itemHeight - offset;
      }
    };

    // Scroll to value
    const scrollToValue = (container, items, value, isInfinite = false) => {
      let targetIndex;
      if (isInfinite) {
        const middleStart = Math.floor(infiniteMinutes.length / 5) * 2;
        targetIndex = middleStart + value;
      } else {
        targetIndex = items.indexOf(value);
      }
      
      if (targetIndex >= 0) {
        container.scrollTo({
          top: targetIndex * 40,
          behavior: 'smooth'
        });
      }
    };

    // Add click events to wheel items
    hourWheel.querySelectorAll('.time-picker-wheel-item').forEach(item => {
      item.addEventListener('click', () => {
        this.hour = parseInt(item.dataset.value);
        scrollToValue(hourWheel, hours, this.hour);
        updateTimeDisplay();
      });
    });

    minuteWheel.querySelectorAll('.time-picker-wheel-item').forEach(item => {
      item.addEventListener('click', () => {
        this.minute = parseInt(item.dataset.value);
        scrollToValue(minuteWheel, minutes, this.minute % 60, true);
        updateTimeDisplay();
      });
    });

    periodWheel.querySelectorAll('.time-picker-wheel-item').forEach(item => {
      item.addEventListener('click', () => {
        this.period = item.dataset.value;
        scrollToValue(periodWheel, periods, this.period);
        updateTimeDisplay();
      });
    });

    // Add scroll event listeners
    hourWheel.addEventListener('scroll', handleHourScroll);
    minuteWheel.addEventListener('scroll', handleMinuteScroll);
    periodWheel.addEventListener('scroll', handlePeriodScroll);
    
    // Setup buttons
    const cancelBtn = this.modal.querySelector('#cancelBtn');
    const okBtn = this.modal.querySelector('#okBtn');
    
    cancelBtn.addEventListener('click', () => this.handleCancel());
    okBtn.addEventListener('click', () => this.handleConfirm());
    
    // Close when clicking overlay
    const overlay = this.modal.querySelector('.time-picker-overlay');
    overlay.addEventListener('click', () => this.handleCancel());
    
    // Prevent closing when clicking container
    const container = this.modal.querySelector('.time-picker-container');
    container.addEventListener('click', (e) => e.stopPropagation());
    
    // Initialize wheel positions
    setTimeout(() => {
      scrollToValue(hourWheel, hours, this.hour);
      scrollToValue(minuteWheel, minutes, this.minute, true);
      scrollToValue(periodWheel, periods, this.period);
    }, 100);
  }
  
  handleConfirm() {
    if (typeof this.onConfirm === 'function') {
      const selectedTime = this.format24Hour();
      console.log('Time picker confirmed with time:', selectedTime);
      
      // If we have a trigger element, set its value directly
      if (this.triggerElement) {
        // Temporarily remove readonly to ensure value can be set
        const wasReadOnly = this.triggerElement.readOnly;
        if (wasReadOnly) {
          this.triggerElement.removeAttribute('readonly');
        }
        
        // Set the value directly
        this.triggerElement.value = selectedTime;
        console.log('Set input value directly to:', selectedTime);
        
        // Restore readonly if it was set
        if (wasReadOnly) {
          this.triggerElement.readOnly = true;
        }
      }
      
      // Call the callback with the selected time
      this.onConfirm(selectedTime);
    }
    this.close();
  }
  
  handleCancel() {
    if (typeof this.onCancel === 'function') {
      this.onCancel();
    }
    this.close();
  }
  
  close() {
    // Return focus to the trigger element before removing the modal
    if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
      try {
        this.triggerElement.focus();
      } catch (e) {
        console.warn('Could not return focus to trigger element', e);
      }
    }
    
    // Remove the modal from DOM without using aria-hidden
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
      this.modal = null;
    }
  }
}

/**
 * Show time picker for the given input element
 * @param {HTMLInputElement} inputElement - The input element
 * @param {Function} onSetCallback - Callback to call when time is set
 */
function showInfiniteTimePicker(inputElement, onSetCallback) {
  // Parse current time from input or use default
  let hours = 9;
  let minutes = 0;
  let period = 'AM';
  
  if (inputElement.value) {
    const [hoursStr, minutesStr] = inputElement.value.split(':');
    if (hoursStr && minutesStr) {
      hours = parseInt(hoursStr);
      minutes = parseInt(minutesStr);
      
      // Convert to 12-hour format
      if (hours >= 12) {
        period = 'PM';
        hours = hours === 12 ? 12 : hours - 12;
      } else {
        period = 'AM';
        hours = hours === 0 ? 12 : hours;
      }
    }
  }
  
  // Create and open time picker
  const timePicker = new InfiniteTimePicker({
    initialHour: hours,
    initialMinute: minutes,
    initialPeriod: period,
    triggerElement: inputElement,
    onConfirm: (time24) => {
      console.log('Time selected:', time24, 'for input:', inputElement.id);
      
      // The value is already set in the handleConfirm method
      // But we'll trigger the change event to notify other parts of the application
      const event = new Event('change', { bubbles: true });
      inputElement.dispatchEvent(event);
      
      // Call the callback if provided
      if (typeof onSetCallback === 'function') {
        onSetCallback(time24);
      }
    },
    onCancel: () => {
      // Optional: Do something on cancel
      console.log('Time picker cancelled');
    }
  });
  
  timePicker.init();
  timePicker.open();
} 