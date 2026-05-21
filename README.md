# ToolShop Automation Framework - Test Strategy and Risk Analysis

## Overview

This repository contains an automated testing framework validate the core functionality , reliability, and user experience of the ToolShop website. The approach prioritizes high-risk areas, business-critical flows, and maintainable automation practices over exhaustive UI testing.

## Test Approach

### 1.Risk-Based Testing

Testing is focused on areas that would have high likelyhood and impact if they fail:

- Core user flows
- Data integrity between UI and backend
- Features with frequent changes or known instability
  Rather than automating everything, tests are designed to maximize confidence with minimal redundancy.

### 2.Test Pryamid Strategy

- API Tests
  - Validate response status codes
  - Schema validation
  - Business logic verification

- UI Tests
  - Validate critical user journeys
  - Ensure correct data rendering
  - Catch integration issues between frontend and backend

- Visual Testing
  - Detect layout regressions
  - Ensure UI consistency across updates

### 3.Deterministic Testing

To reduce flakiness:

- Network responses are mocked where appropriate
- Test data is controlled and predictable
- Dynamic elements are handled with proper waits and assertions

### 4. Isolation and Independence

Each test:

- Runs independently
- Does not rely on a shared state
- Can be executed in parallel

## Areas of Risk

### 1.Cart/Checkout

- User is unable to review or edit selected products
- User is unable to complete checkout process and pay for products
- Order and/or payment failures during checkout process affect user and/or admin

### 2.Sign In/Register

- User locked out of account
- Admin unable to access dashboard
- API authentacting and registration issues

### 3.Product Search

- User is unable to search for desired product to buy
- Admin is unable to convieniently find and edit products
- API sends incorrect product search results

### 4.Product Page

- Product page displays incorrect price
- Product page displays incorrect availability status
- Product page display incorrect name and/or image

### Tools and Technologies

- Playwright
- Typescript
- API testing via Playwright and Postman
- Docker
- CI intergration GitHub Actions

### Future Improvements

- Increase API test coverage for edge cases
- Expand visual regression scenarios
- Introduce performance testing for critical endpoints
- Enhance reporting and test analytics
