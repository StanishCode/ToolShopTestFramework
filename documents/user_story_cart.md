# Cart

## User Story

As a user, I want to inspect my cart so I can review order before I checkout.

## Acceptance Criteria

### Scenario: Products are displayed in cart

**Given** that I currently have products in my cart
**When** I navigate to the cart checkout page
**Then** every product that I added to the cart willl be displayed

### Scenario: Update product quantity

**Given** that I currently have products in my cart and on cart checkout page
**When** I enter a valid quanity in the quantity textbox
**Then** the updated quantity and total price will be displayed

### Scenario: Remove product from cart

**Given** that I currently have products in my cart and on cart checkout page
**When** I click the red "X" button for a product
**Then** the product will be removed form the art and product deleted message will be displayed
