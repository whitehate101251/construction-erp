function showHajiriXYPoup(inputElement, focusField) {
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

    // Create the modal HTML
    const modalId = 'hajiri-xpy-modal';
    let modal = document.getElementById(modalId);
    if (modal) {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    // No aria-hidden or inert attributes

    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${workerName} ${statusBadge}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <input type="text" class="form-control form-control-lg text-center hajiri-x-modal" value="${xValue === '0' ? '' : xValue}" maxlength="2" pattern="[0-9]*" inputmode="numeric" style="width:60px;" autocomplete="off">
                        <span class="fs-3 fw-bold">P</span>
                        <input type="text" class="form-control form-control-lg text-center hajiri-y-modal" value="${yValue === '0' ? '' : yValue}" maxlength="2" pattern="[0-9]*" inputmode="numeric" style="width:60px;" autocomplete="off">
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between flex-wrap gap-2">
                    <button type="button" class="btn btn-secondary flex-fill" id="hajiri-xpy-prev">पीछे</button>
                    <button type="button" class="btn btn-primary flex-fill" id="hajiri-xpy-next">आगे</button>
                    <button type="button" class="btn btn-success flex-fill" id="hajiri-xpy-set">ठीक है</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);

    // Store reference to the input element
    modal.dataset.triggerElement = inputElement.id || '';

    // Add event listeners for modal show/hide with proper focus management
    modal.addEventListener('shown.bs.modal', function() {
        // Set focus after modal is fully shown
        const xBox = modal.querySelector('.hajiri-x-modal');
        const yBox = modal.querySelector('.hajiri-y-modal');
        if (focusField === 'X') xBox.focus();
        else yBox.focus();
    });

    modal.addEventListener('hide.bs.modal', function() {
        // Move focus back to the trigger element BEFORE hiding
        try {
            inputElement.focus();
        } catch (e) {
            console.warn('Could not return focus to trigger element', e);
        }
    });

    modal.addEventListener('hidden.bs.modal', function() {
        // Remove from DOM after hidden without setting aria-hidden or inert
        setTimeout(() => {
            if (modal && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 100);
    });

    // Attach button event listeners after modal is in DOM
    setTimeout(() => {
        const xBox = modal.querySelector('.hajiri-x-modal');
        const yBox = modal.querySelector('.hajiri-y-modal');
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
                // Save values before hiding
                xInput.value = xBox.value || '0';
                yInput.value = yBox.value || '0';
                markRowChanged(row);
                
                // Move focus back to input element before hiding modal
                inputElement.focus();
                bsModal.hide();
                
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
        
        // Button handlers
        modal.querySelector('#hajiri-xpy-set').onclick = function() {
            // Save values
            xInput.value = xBox.value || '0';
            yInput.value = yBox.value || '0';
            markRowChanged(row);
            
            // Move focus back to input element before hiding modal
            inputElement.focus();
            bsModal.hide();
        };
        
        modal.querySelector('#hajiri-xpy-prev').onclick = function() {
            // Save values
            xInput.value = xBox.value || '0';
            yInput.value = yBox.value || '0';
            markRowChanged(row);
            
            // Move focus back to input element before hiding modal
            inputElement.focus();
            bsModal.hide();
            
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
        };
        
        modal.querySelector('#hajiri-xpy-next').onclick = function() {
            // Save values
            xInput.value = xBox.value || '0';
            yInput.value = yBox.value || '0';
            markRowChanged(row);
            
            // Move focus back to input element before hiding modal
            inputElement.focus();
            bsModal.hide();
            
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
        };
    }, 0);

    // Show modal
    bsModal.show();
} 