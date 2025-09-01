# Requirements Document

## Introduction

This feature involves restoring the site incharge attendance editing interface to use the exact X+Y dialog component from the foremen's interface instead of the current wheel/dial implementation. The goal is to provide a consistent user experience across different user roles while ensuring proper functionality for editing and saving attendance records.

## Requirements

### Requirement 1

**User Story:** As a site incharge, I want to edit attendance records using the same X+Y dialog interface that foremen use, so that I have a consistent and familiar editing experience.

#### Acceptance Criteria

1. WHEN a site incharge clicks to edit an attendance record THEN the system SHALL display the same X+Y dialog component used in the foremen's interface
2. WHEN the X+Y dialog is displayed THEN the system SHALL show the worker's name prominently in the dialog
3. WHEN the site incharge interacts with the X and Y input fields THEN the system SHALL calculate and display working hours in real-time
4. IF the dialog is opened THEN the system SHALL pre-populate the current hajiri X and Y values for the selected attendance record

### Requirement 2

**User Story:** As a site incharge, I want to save my attendance edits successfully, so that the changes are persisted in the system.

#### Acceptance Criteria

1. WHEN a site incharge makes changes to hajiri values and clicks save THEN the system SHALL validate the input values
2. WHEN valid hajiri values are submitted THEN the system SHALL update the attendance record in the database
3. WHEN the save operation is successful THEN the system SHALL display a success message to the user
4. IF the save operation fails THEN the system SHALL display an appropriate error message
5. WHEN saving is in progress THEN the system SHALL show a loading indicator to prevent duplicate submissions

### Requirement 3

**User Story:** As a site incharge, I want proper authorization to edit attendance records, so that I can perform my job duties without access restrictions.

#### Acceptance Criteria

1. WHEN a site incharge attempts to update an attendance record THEN the backend system SHALL verify the user has site_incharge role
2. IF the user has proper authorization THEN the system SHALL allow the attendance update operation
3. IF the user lacks proper authorization THEN the system SHALL return an appropriate error response
4. WHEN authorization fails THEN the frontend SHALL display a clear error message about insufficient permissions

### Requirement 4

**User Story:** As a site incharge, I want the attendance editing interface to work properly on mobile devices, so that I can edit attendance records from any device.

#### Acceptance Criteria

1. WHEN the X+Y dialog is displayed on a mobile device THEN the system SHALL render the interface in a mobile-friendly format
2. WHEN using touch inputs on mobile THEN the system SHALL respond appropriately to touch gestures
3. WHEN the dialog is displayed on different screen sizes THEN the system SHALL maintain usability and readability
4. IF the device orientation changes THEN the system SHALL adapt the dialog layout accordingly

### Requirement 5

**User Story:** As a site incharge, I want comprehensive error handling during attendance editing, so that I understand what went wrong if an operation fails.

#### Acceptance Criteria

1. WHEN invalid hajiri values are entered THEN the system SHALL display specific validation error messages
2. WHEN a network error occurs during save THEN the system SHALL display a network connectivity error message
3. WHEN the server returns an error THEN the system SHALL display the server error message to the user
4. WHEN any error occurs THEN the system SHALL log the error details for debugging purposes
5. IF an error occurs THEN the system SHALL allow the user to retry the operation without losing their input