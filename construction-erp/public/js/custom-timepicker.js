// Custom Time Picker Implementation
// This is a simplified time picker that can be used across the application

function showTimePicker(inputElement, onSetCallback) {
    // Create a popup container
    const popup = document.createElement('div');
    popup.className = 'time-picker-popup';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '9999';

    // Create picker container
    const pickerContainer = document.createElement('div');
    pickerContainer.style.backgroundColor = 'white';
    pickerContainer.style.borderRadius = '8px';
    pickerContainer.style.padding = '20px';
    pickerContainer.style.width = '300px';
    pickerContainer.style.maxWidth = '90%';
    pickerContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    pickerContainer.style.animation = 'fadeIn 0.2s ease';
    popup.appendChild(pickerContainer);

    // Add header
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '20px';
    header.style.fontSize = '18px';
    header.style.fontWeight = 'bold';
    header.textContent = 'समय चुनें';
    pickerContainer.appendChild(header);

    // Create time inputs
    const timeInputsContainer = document.createElement('div');
    timeInputsContainer.style.display = 'flex';
    timeInputsContainer.style.justifyContent = 'center';
    timeInputsContainer.style.marginBottom = '20px';
    timeInputsContainer.style.gap = '10px';
    pickerContainer.appendChild(timeInputsContainer);

    // Hours input
    const hoursContainer = document.createElement('div');
    hoursContainer.style.textAlign = 'center';
    timeInputsContainer.appendChild(hoursContainer);

    const hoursLabel = document.createElement('div');
    hoursLabel.textContent = 'घंटे';
    hoursLabel.style.marginBottom = '5px';
    hoursLabel.style.fontSize = '14px';
    hoursContainer.appendChild(hoursLabel);

    const hoursInput = document.createElement('input');
    hoursInput.type = 'number';
    hoursInput.min = '1';
    hoursInput.max = '12';
    hoursInput.value = '9';
    hoursInput.style.width = '60px';
    hoursInput.style.height = '60px';
    hoursInput.style.fontSize = '24px';
    hoursInput.style.textAlign = 'center';
    hoursInput.style.border = '1px solid #ced4da';
    hoursInput.style.borderRadius = '8px';
    hoursContainer.appendChild(hoursInput);

    // Minutes input
    const minutesContainer = document.createElement('div');
    minutesContainer.style.textAlign = 'center';
    timeInputsContainer.appendChild(minutesContainer);

    const minutesLabel = document.createElement('div');
    minutesLabel.textContent = 'मिनट';
    minutesLabel.style.marginBottom = '5px';
    minutesLabel.style.fontSize = '14px';
    minutesContainer.appendChild(minutesLabel);

    const minutesInput = document.createElement('input');
    minutesInput.type = 'number';
    minutesInput.min = '0';
    minutesInput.max = '59';
    minutesInput.value = '00';
    minutesInput.style.width = '60px';
    minutesInput.style.height = '60px';
    minutesInput.style.fontSize = '24px';
    minutesInput.style.textAlign = 'center';
    minutesInput.style.border = '1px solid #ced4da';
    minutesInput.style.borderRadius = '8px';
    minutesContainer.appendChild(minutesInput);

    // Period selector (AM/PM)
    const periodContainer = document.createElement('div');
    periodContainer.style.textAlign = 'center';
    timeInputsContainer.appendChild(periodContainer);

    const periodLabel = document.createElement('div');
    periodLabel.textContent = 'AM/PM';
    periodLabel.style.marginBottom = '5px';
    periodLabel.style.fontSize = '14px';
    periodContainer.appendChild(periodLabel);

    const periodSelect = document.createElement('select');
    periodSelect.style.width = '60px';
    periodSelect.style.height = '60px';
    periodSelect.style.fontSize = '20px';
    periodSelect.style.textAlign = 'center';
    periodSelect.style.border = '1px solid #ced4da';
    periodSelect.style.borderRadius = '8px';
    
    const amOption = document.createElement('option');
    amOption.value = 'AM';
    amOption.textContent = 'AM';
    periodSelect.appendChild(amOption);
    
    const pmOption = document.createElement('option');
    pmOption.value = 'PM';
    pmOption.textContent = 'PM';
    periodSelect.appendChild(pmOption);
    
    periodContainer.appendChild(periodSelect);

    // Set default time based on current time
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    hoursInput.value = hours;
    minutesInput.value = minutes.toString().padStart(2, '0');
    periodSelect.value = period;

    // Add buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.gap = '10px';
    pickerContainer.appendChild(buttonsContainer);

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'रद्द करें';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.backgroundColor = '#f8f9fa';
    cancelButton.style.cursor = 'pointer';
    buttonsContainer.appendChild(cancelButton);

    // OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'ठीक है';
    okButton.style.padding = '10px 20px';
    okButton.style.border = 'none';
    okButton.style.borderRadius = '4px';
    okButton.style.backgroundColor = '#0d6efd';
    okButton.style.color = 'white';
    okButton.style.cursor = 'pointer';
    buttonsContainer.appendChild(okButton);

    // Add event listeners
    cancelButton.addEventListener('click', closePopup);

    okButton.addEventListener('click', function() {
        const selectedHours = parseInt(hoursInput.value);
        const selectedMinutes = parseInt(minutesInput.value);
        const selectedPeriod = periodSelect.value;
        
        if (isNaN(selectedHours) || isNaN(selectedMinutes)) {
            alert('Please enter valid time values');
            return;
        }
        
        // Format time in 24-hour format (HH:MM)
        let hours24 = selectedHours;
        if (selectedPeriod === 'PM' && selectedHours < 12) {
            hours24 += 12;
        } else if (selectedPeriod === 'AM' && selectedHours === 12) {
            hours24 = 0;
        }
        
        const timeString = `${hours24.toString().padStart(2, '0')}:${selectedMinutes.toString().padStart(2, '0')}`;
        
        // Temporarily remove readonly to set value
        const wasReadOnly = inputElement.readOnly;
        if (wasReadOnly) {
            inputElement.removeAttribute('readonly');
        }
        
        // Set the value
        inputElement.value = timeString;
        
        // Restore readonly if needed
        if (wasReadOnly) {
            inputElement.readOnly = true;
        }
        
        // Trigger change event
        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Call callback if provided
        if (typeof onSetCallback === 'function') {
            onSetCallback(timeString);
        }
        
        closePopup();
    });

    // Close when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Function to close popup
    function closePopup() {
        document.body.removeChild(popup);
    }

    // Add to DOM
    document.body.appendChild(popup);

    // Focus hours input
    hoursInput.focus();
    hoursInput.select();
}

// Make the function globally available
window.showTimePicker = showTimePicker; 