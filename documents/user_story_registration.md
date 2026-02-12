# User Registration

## User Story

As a potential new user,
I want register a new account
so that I can adminster my account
and access order inforamtion.

## Acceptance Criteria

### Scenario: User logs in with valid credentials

**Given** that I am currently logged out
**When** I enter valid credentials on the login page
**Then** I am successfully logged into my account

## Errors

### Scenario: Email and password are required

**Given** that I am currently logged out
**When** I click login without email and password
**Then** error meesages will state email and password are required

### Scenario: Email must be in correct format

**Given** that I am currently logged out
**When** I enter an invalid email
**Then** an error message will state the email format is invalid

### Scenario: User credentials must be in database

**Given** that I am currently logged out
**When** I enter a valid email but invalid password
**Then** an error message will state that email or password is invalid
