# Product Search

## User Story

As a user, I want to keyword search for a product so that I can find the product(s) I want to purchase.

## Acceptance Criteria

### Scenario: User enters valid keyword

**Given** that I have selected the product search bar on homepage/product overview page
**When** I enter a valid full or partial keyword
**Then** the page will load and display relevant results

## Errors

### Scenario: User enters less than minimum length

**Given** that I have selected the product search bar on homepage/product overview page
**When** I enter fewer than 3 characters in search bar and submit
**Then** the search will not be executed and an error message will be displayed

### Scenario: User enters more than maximum length

**Given** that I have selected the product search bar on homepage/product overview page
**When** I enter more than 40 characters in the search bar and submit
**Then** the search will not be executed and an error message will be displayed
