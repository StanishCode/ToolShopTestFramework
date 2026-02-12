# TOOLSHOP Demo API Documentation

## Product Catalog

included below are the API endpoints and UI routes provided by the developers

## Features

- Product listing with detail pages
- Category tree structure and filtering
- Brand management
- Product images
- Contact form

## API Endpoints

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/brands`                | List all brands      |
| GET    | `/brands/{id}`           | Get brand by ID      |
| POST   | `/brands`                | Create brand         |
| PUT    | `/brands/{id}`           | Update brand         |
| DELETE | `/brands/{id}`           | Delete brand         |
| GET    | `/categories`            | List all categories  |
| GET    | `/categories/tree`       | Get category tree    |
| GET    | `/categories/tree/{id}`  | Get subtree by ID    |
| POST   | `/categories`            | Create category      |
| PUT    | `/categories/{id}`       | Update category      |
| DELETE | `/categories/{id}`       | Delete category      |
| GET    | `/products`              | List all products    |
| GET    | `/products/{id}`         | Get product by ID    |
| GET    | `/products/{id}/related` | Get related products |
| POST   | `/products`              | Create product       |
| PUT    | `/products/{id}`         | Update product       |
| DELETE | `/products/{id}`         | Delete product       |
| GET    | `/images`                | List product images  |

## UI Routes

| Path              | Page                 |
| ----------------- | -------------------- |
| `/`               | Product overview     |
| `/product/:id`    | Product detail       |
| `/category/:name` | Products by category |
| `/contact`        | Contact form         |

# Users & Search

Adds user authentication, invoicing, favorites, contact messaging, reports, and search capabilities.

## New Features

- User registration and JWT-based login
- Password management (change, forgot)
- Search endpoints for products, brands, and categories
- Invoice creation and management
- Favorites (save products)
- Contact messaging system with replies and file attachments
- Payment validation
- Reporting (sales, customers, top products)

## New API Endpoints

### Users

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/users/login`           | Authenticate user        |
| POST   | `/users/register`        | Register new user        |
| POST   | `/users/change-password` | Change password          |
| POST   | `/users/forgot-password` | Request password reset   |
| GET    | `/users/logout`          | Logout                   |
| GET    | `/users/me`              | Get current user profile |
| GET    | `/users/refresh`         | Refresh JWT token        |
| GET    | `/users`                 | List all users           |
| GET    | `/users/{id}`            | Get user by ID           |
| GET    | `/users/search`          | Search users             |
| PUT    | `/users/{id}`            | Update user              |
| DELETE | `/users/{id}`            | Delete user              |

### Invoices

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/invoices`             | List invoices         |
| GET    | `/invoices/{id}`        | Get invoice by ID     |
| GET    | `/invoices/search`      | Search invoices       |
| POST   | `/invoices`             | Create invoice        |
| PUT    | `/invoices/{id}`        | Update invoice        |
| PUT    | `/invoices/{id}/status` | Update invoice status |
| DELETE | `/invoices/{id}`        | Delete invoice        |

### Favorites

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/favorites`      | List user favorites |
| GET    | `/favorites/{id}` | Get favorite by ID  |
| POST   | `/favorites`      | Add favorite        |
| PUT    | `/favorites/{id}` | Update favorite     |
| DELETE | `/favorites/{id}` | Remove favorite     |

### Messages

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/messages`                  | List messages          |
| GET    | `/messages/{id}`             | Get message by ID      |
| POST   | `/messages`                  | Send message           |
| POST   | `/messages/{id}/attach-file` | Attach file to message |
| POST   | `/messages/{id}/reply`       | Reply to message       |
| PUT    | `/messages/{id}/status`      | Update message status  |

### Reports

| Method | Endpoint                                 | Description               |
| ------ | ---------------------------------------- | ------------------------- |
| GET    | `/reports/total-sales-of-years`          | Total sales by year       |
| GET    | `/reports/total-sales-per-country`       | Sales by country          |
| GET    | `/reports/top10-purchased-products`      | Top 10 purchased products |
| GET    | `/reports/top10-best-selling-categories` | Top 10 selling categories |
| GET    | `/reports/customers-by-country`          | Customer distribution     |
| GET    | `/reports/average-sales-per-month`       | Monthly average sales     |
| GET    | `/reports/average-sales-per-week`        | Weekly average sales      |

### Search & Payment

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/brands/search`     | Search brands     |
| GET    | `/categories/search` | Search categories |
| GET    | `/products/search`   | Search products   |
| POST   | `/payment/check`     | Validate payment  |

# Checkout & Rentals

Adds a checkout flow and rental product support.

## New Features

- Checkout page for completing purchases
- Rental products overview page
- Enhanced invoice line item handling

## API Changes

Same endpoints as Sprint 2. Backend improvements to invoice line item processing.

## UI Routes

| Path              | Page                     | New? |
| ----------------- | ------------------------ | ---- |
| `/`               | Product overview         |      |
| `/product/:id`    | Product detail           |      |
| `/category/:name` | Products by category     |      |
| `/rentals`        | Rental products overview | Yes  |
| `/checkout`       | Checkout                 | Yes  |
| `/contact`        | Contact form             |      |

# Auth & Accounts

Adds authenticated user areas with route protection, account management, and contract testing.

## New Features

- Login and registration pages
- Protected account area (profile, invoices, favorites, messages)
- Route guards (`UserAuthGuard`) for authenticated-only pages
- Lazy-loaded modules for auth and account sections
- PATCH support for partial updates on resources
- Database refresh endpoint for testing
- Pact contract testing integration

## New API Endpoints

| Method | Endpoint           | Description                     |
| ------ | ------------------ | ------------------------------- |
| POST   | `/refresh`         | Reset database (migrate + seed) |
| PATCH  | `/brands/{id}`     | Partial update brand            |
| PATCH  | `/categories/{id}` | Partial update category         |
| PATCH  | `/invoices/{id}`   | Partial update invoice          |
| PATCH  | `/products/{id}`   | Partial update product          |
| PATCH  | `/users/{id}`      | Partial update user             |

## UI Routes

| Path              | Page                     | New? |
| ----------------- | ------------------------ | ---- |
| `/`               | Product overview         |      |
| `/product/:id`    | Product detail           |      |
| `/category/:name` | Products by category     |      |
| `/rentals`        | Rental products overview |      |
| `/checkout`       | Checkout                 |      |
| `/contact`        | Contact form             |      |
| `/auth`           | Login / Register (lazy)  | Yes  |
| `/account`        | Account panel (lazy)     | Yes  |

### Account Panel Pages

- Profile management
- Invoice history and details
- Favorites list
- Messages / contact requests

# Full Platform

The complete production version with shopping cart, admin dashboard, social auth, 2FA, PDF invoices, multiple payment methods, and multi-language support.

## New Features

- **Shopping Cart** - Add/remove items, update quantities
- **Social Login** - Google and GitHub OAuth
- **Two-Factor Authentication** - TOTP setup and verification
- **PDF Invoices** - Generate and download invoice PDFs
- **Multiple Payment Methods** - Credit card, bank transfer, buy-now-pay-later, gift card, cash on delivery
- **Admin Dashboard** - Full management of products, invoices, users, categories, brands, and reports
- **Chat Widget** - In-app support chat
- **Multi-language** - Transloco i18n support
- **Privacy Policy** page

### Platform Upgrades

- Laravel 11 &rarr; Laravel 12
- PHP 8.1 &rarr; PHP 8.3
- PHPUnit &rarr; Pest testing framework
- Hash routing &rarr; clean URLs with scroll restoration
- Full lazy-loading for all route modules

## New API Endpoints

### Cart

| Method | Endpoint                              | Description           |
| ------ | ------------------------------------- | --------------------- |
| POST   | `/carts`                              | Create cart           |
| POST   | `/carts/{id}`                         | Add item to cart      |
| GET    | `/carts/{id}`                         | Get cart contents     |
| PUT    | `/carts/{id}/product/quantity`        | Update item quantity  |
| DELETE | `/carts/{cartId}/product/{productId}` | Remove item from cart |
| DELETE | `/carts/{cartId}`                     | Delete cart           |

### Invoice Downloads

| Method | Endpoint                             | Description                 |
| ------ | ------------------------------------ | --------------------------- |
| GET    | `/invoices/{id}/download-pdf`        | Download invoice PDF        |
| GET    | `/invoices/{id}/download-pdf-status` | Check PDF generation status |

### Social Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/auth/social-login` | Initiate social login |
| GET    | `/auth/cb/google`    | Google OAuth callback |
| GET    | `/auth/cb/github`    | GitHub OAuth callback |

### TOTP (Two-Factor Auth)

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/totp/setup`      | Set up 2FA       |
| POST   | `/totp/verify`     | Verify TOTP code |
| POST   | `/totp/login/totp` | Login with TOTP  |

## UI Routes

| Path        | Module         | Description               |
| ----------- | -------------- | ------------------------- |
| `/`         | ProductsModule | Product browsing (lazy)   |
| `/privacy`  | PrivacyModule  | Privacy policy (lazy)     |
| `/checkout` | CheckoutModule | Checkout flow (lazy)      |
| `/contact`  | ContactModule  | Contact form (lazy)       |
| `/auth`     | AuthModule     | Login / Register (lazy)   |
| `/account`  | AccountModule  | User account panel (lazy) |
| `/admin`    | AdminModule    | Admin dashboard (lazy)    |

## Feature Comparison Across Sprints

| Feature                | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 |
| ---------------------- | :------: | :------: | :------: | :------: | :------: |
| Products / Categories  |    x     |    x     |    x     |    x     |    x     |
| Brands                 |    x     |    x     |    x     |    x     |    x     |
| Contact Form           |    x     |    x     |    x     |    x     |    x     |
| User Auth (JWT)        |          |    x     |    x     |    x     |    x     |
| Search                 |          |    x     |    x     |    x     |    x     |
| Invoices               |          |    x     |    x     |    x     |    x     |
| Favorites              |          |    x     |    x     |    x     |    x     |
| Reports                |          |    x     |    x     |    x     |    x     |
| Checkout               |          |          |    x     |    x     |    x     |
| Rentals                |          |          |    x     |    x     |    x     |
| Login / Register Pages |          |          |          |    x     |    x     |
| Account Panel          |          |          |          |    x     |    x     |
| Route Guards           |          |          |          |    x     |    x     |
| PATCH Endpoints        |          |          |          |    x     |    x     |
| Shopping Cart          |          |          |          |          |    x     |
| Social Login           |          |          |          |          |    x     |
| 2FA / TOTP             |          |          |          |          |    x     |
| PDF Invoices           |          |          |          |          |    x     |
| Multiple Payments      |          |          |          |          |    x     |
| Admin Dashboard        |          |          |          |          |    x     |
| Chat Widget            |          |          |          |          |    x     |
| Multi-language         |          |          |          |          |    x     |
