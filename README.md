# Expense Tracker: Full-Stack MERN App with Analytics & Filters 🧾📊

[![Releases](https://img.shields.io/badge/releases-download-blue?logo=github&style=for-the-badge)](https://github.com/nashirnm09/expense_tracker/releases)

A complete MERN stack app for managing personal finances. This project helps you track income and expenses, analyze spending, and filter data with powerful, responsive UI. It blends a robust back end with a modern front end, making it easy to monitor your cash flow, plan budgets, and uncover spending patterns over time.

Explore the latest release and download assets from the official page: https://github.com/nashirnm09/expense_tracker/releases. You can also visit the releases page anytime to see what’s new, what’s fixed, and what’s planned. For a quick jump to the same destination, see the link again in the Downloads section below.

Images and visuals help explain the idea. The UI uses clean cards, charts, and filters to give you a concise view of your finances. The project embraces accessibility, fast interactions, and a delightful user experience. It’s designed to run locally on your machine or in your preferred cloud environment, with sensible defaults that you can tailor to your needs.

If you’re curious about the latest build or want to grab the official assets, head over to the Releases page. For convenience, the same link is repeated in the Downloads section so you don’t have to search. The core tenets of this project are clarity, speed, and usefulness.

---

## Table of Contents

- Overview
- Key Features
- Tech Stack
- How It Works
- Getting Started
- Project Structure
- Data Model
- API Endpoints
- State Management and UI
- Analytics and Filtering
- Styling and Theming
- Security and Authentication
- Testing and Quality
- Deployment and Docker
- Performance and Optimization
- Accessibility and Internationalization
- Localization and L10n
- Documentation and Developer Experience
- Community and Contributions
- Roadmap
- License and Credits
- FAQ

---

## Overview

Expense Tracker is a full-stack MERN application designed to help individuals manage personal finances with confidence. It combines a robust RESTful API built on Express and MongoDB with a responsive React client that uses a modern UI library, state management, and styling utilities. The app emphasizes analytics and powerful filtering to help you understand where your money goes and how you can optimize your spending.

The back end protects sensitive data with JWT-based authentication and password hashing. It stores users, transactions, categories, budgets, and reports in a structured schema that supports fast queries and secure access control. The front end presents a clean, intuitive interface to create, read, update, and delete transactions, as well as to configure dashboards, analytics, and filters.

This project aims to be practical right away while remaining extensible. It’s suitable for personal use, small teams, or as a learning platform for modern full-stack development with the MERN stack.

---

## Key Features

- Personal expense and income tracking with CRUD operations for transactions.
- Advanced analytics: insights into spending by category, trends, income vs. expenses, and date-based breakdowns.
- Flexible filtering: date range, category, type (income/expense), amount ranges, and searchable notes.
- Quick dashboards with visualizations to summarize financial health.
- User authentication with JWT tokens and bcrypt password hashing.
- Role-based access control for multi-user scenarios.
- Responsive UI built with a component library and utility-first styling.
- Local development and production-ready scripts for easy setup.
- Extensible architecture designed for adding new data types, reports, and dashboards.

Emphasizing clarity, the UI purposefully guides you through money management tasks. The analytics are designed to reveal patterns without overwhelming you. The filtering is expressive enough to answer practical questions, such as “What did I spend on groceries last month?” or “How does my income trend compare to expenses over the year?”

---

## Tech Stack

- Front End: React, Redux, Tailwind CSS, Ant Design (UI components), Moment.js for date handling.
- Back End: Node.js, Express.js, MongoDB (NoSQL database).
- Authentication: JWT-based authentication, bcrypt for password hashing.
- Data Handling: Axios for API calls, structured API responses, and consistent error handling.
- Deployment and DevOps: Docker optional, scripts for dev and prod, and best practices for environment configuration.

Topics of interest include:
- ant-design
- axios
- bcrypt
- expressjs
- jwt-authentication
- momentjs
- mongodb
- nodejs
- react
- redux
- tailwindcss

Images and visuals reflect the financial theme: charts, wallets, and clean dashboards.

---

## How It Works

The architecture follows a clear separation of concerns:

- Client (React)
  - Presents the UI and handles user interaction.
  - Communicates with the server through a RESTful API.
  - Uses Redux to manage application state and to orchestrate UI across views.
  - Styling with Tailwind CSS and Ant Design components for a polished look.
  - Analytics components render charts and visual summaries of your data.

- Server (Express)
  - Provides a secure API layer for client operations.
  - Handles authentication and authorization with JWTs.
  - Accesses a MongoDB database to read and write transactions, categories, and user data.
  - Includes middleware for validation, error handling, and logging.

- Database (MongoDB)
  - Stores user accounts, transaction records, categories, and budgets.
  - Uses indexes to optimize common queries like date range filters and category lookups.

Data flows are straightforward: a user authenticates, the client stores a token, and every request to the API carries that token for authorization. The server validates the token and serves data based on the user’s permissions. Clients render the data, and users can filter or modify it as needed.

---

## Getting Started

This guide helps you run Expense Tracker locally. It’s designed to be approachable for beginners but valuable for experienced developers as well.

Important note: The project uses a releases page as the distribution point for prebuilt assets. If you’re looking to grab the official assets, visit the Releases page directly and follow the asset download instructions there. The link is provided here for convenience: https://github.com/nashirnm09/expense_tracker/releases. For quick access, you’ll also find the link used again later in the Downloads section.

What you’ll need:
- Node.js installed (version 16 or higher is recommended)
- npm or yarn for package management
- A running MongoDB instance (local or remote)
- Basic familiarity with the terminal

Steps to run locally:
1) Clone the repository
- Run: git clone https://github.com/nashirnm09/expense_tracker.git

2) Install dependencies
- Frontend: navigate to the client directory and install
  - cd expense_tracker/client
  - npm install
- Backend: navigate to the server directory and install
  - cd expense_tracker/server
  - npm install

3) Configure environment
- Copy the sample environment file
  - cp .env.example .env
- Open .env and fill in the details:
  - MONGO_URI: your MongoDB connection string
  - JWT_SECRET: a secure secret for token signing
  - PORT: the port for the backend server
  - Any other relevant variables (email settings, third-party keys, etc.)

4) Start the development servers
- Start the back end
  - cd expense_tracker/server
  - npm run dev
- Start the front end
  - cd expense_tracker/client
  - npm start

If you prefer to run both servers with a single command, you can set up a local script that runs both the client and server concurrently. For example, using the concurrently package, you can define a script like:

- "start:dev": "concurrently 'npm run server' 'npm run client'"

Adjust script names as needed if your package.json uses different commands.

5) Test the setup
- Open your browser to http://localhost:3000 (or the port you configured).
- Sign up or log in to access your personal transactions.
- Create a few sample transactions to verify CRUD operations and filtering.

6) Optional: Seed data
- Seed basic categories and sample transactions to explore analytics quickly. See the server seed script in the repository if available.

7) Stop
- Press Ctrl+C in any terminal to stop the processes.

First-run checks:
- Ensure MongoDB is running and accessible via the MONGO_URI you provided.
- Confirm that the JWT secret is set; otherwise, authentication will fail.
- If you enable TLS in development, adjust relevant environment variables accordingly.

---

## Project Structure

- client/
  - src/
    - app/        // Redux store, slices, and middleware
    - features/   // Feature-specific components (transactions, analytics, settings)
    - components/ // Reusable UI elements
    - pages/      // Routes (Dashboard, Transactions, Reports, Settings)
    - styles/     // Tailwind and Ant Design styling
  - public/        // Static assets and index.html
  - package.json

- server/
  - src/
    - controllers/  // Request handlers for API endpoints
    - models/       // Mongoose models (User, Transaction, Category, etc.)
    - routes/       // API route definitions
    - middleware/   // Auth and validation middlewares
    - services/     // Business logic and utilities
    - config/       // DB connections and environment setup
  - packages.json
  - seed/           // Optional data seeding scripts

- README.md (this file)
- .env.example      // Template for environment variables
- docker/           // Docker-related files (optional)
- tests/            // API and UI tests (if present)

This structure keeps the front end and back end separate but well integrated. It makes it easy to run, test, and extend the app. When you add new features, place related code in logical folders to maintain clarity and reduce confusion.

---

## Data Model

The app uses a clean data model that mirrors common personal finance concepts.

- User
  - id
  - email
  - passwordHash
  - name
  - createdAt
  - updatedAt
  - preferences (living in a nested structure for UI settings)

- Transaction
  - id
  - userId
  - type: "income" | "expense"
  - amount
  - date
  - categoryId
  - note
  - tags (array)
  - createdAt
  - updatedAt

- Category
  - id
  - userId
  - name
  - color (for UI representation)
  - type: "income" | "expense"
  - createdAt
  - updatedAt

- Budget (optional)
  - id
  - userId
  - categoryId
  - limit
  - month
  - year
  - createdAt
  - updatedAt

- Report (optional)
  - id
  - userId
  - type
  - data (rich object or blob)
  - createdAt
  - updatedAt

To keep queries fast, the database includes indexes on fields like userId, date (for ranges), categoryId, and type. The goal is to provide fast dashboards and responsive filtering even as the dataset grows.

---

## API Endpoints (High-Level)

- Authentication
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/refresh

- Transactions
  - GET /api/transactions
  - GET /api/transactions/:id
  - POST /api/transactions
  - PUT /api/transactions/:id
  - DELETE /api/transactions/:id

- Categories
  - GET /api/categories
  - POST /api/categories
  - PUT /api/categories/:id
  - DELETE /api/categories/:id

- Analytics and Reports
  - GET /api/reports/summary
  - GET /api/reports/category-breakdown
  - GET /api/reports/trends

- User
  - GET /api/users/me
  - PUT /api/users/me

Security:
- All protected routes require a valid JWT token in the Authorization header.
- Passwords are hashed using bcrypt before storage.
- Tokens have expiration and rotation strategies to minimize risk.

---

## State Management and UI

- Redux handles the global state for authentication, user preferences, and data across pages.
- Slices represent major domains, such as:
  - authSlice: handles login status and user info.
  - transactionSlice: manages the list, filters, and CRUD operations for transactions.
  - categorySlice: manages categories and their metadata.
  - analyticsSlice: handles data for charts and dashboards.
- The UI uses Tailwind CSS for layout and responsiveness paired with Ant Design components for a polished look and feel.
- Filters live in the UI as a powerful panel with multi-selects, date pickers, and range inputs. Users can combine filters to drill down into specific data slices.
- Charts and dashboards render with accessible components that adapt to screen size and provide keyboard navigation.

UI interactions are designed to be fast and intuitive. Actions such as adding a transaction, changing a category, or updating budgets reflect immediately in the dashboard when data changes. The user experience emphasizes clarity and minimal friction to help you stay on top of your finances.

---

## Analytics and Filtering

Analytics are a core strength of this project. The analytics module includes:

- Income vs. Expenses: A chart showing the balance of income against outflow over a selected period.
- Category Breakdown: A pie or donut chart displaying spending distribution across categories.
- Time Series Trends: A line chart showing daily or weekly trends in spending and income.
- Customizable Dashboards: Allow users to pin or configure widgets for the most relevant metrics.

Filtering empowers you to answer practical questions quickly:
- Date ranges: day, week, month, quarter, year, or a custom range.
- Type: filter by income or expense.
- Category: filter by one or more categories.
- Amount: min/max values to include transactions within a range.
- Text search: search notes and descriptions.
- Tags: multi-tag filtering for more granular classification.

The filtering system uses efficient query composition to ensure responsive results even with large datasets. The UI supports quick resets and saves of common filter sets for repeated use.

---

## Styling and Theming

- Tailwind CSS provides a scalable, utility-first approach for layout and visuals.
- Ant Design components deliver a consistent, polished user experience with accessible defaults.
- Color themes are lightweight and accessible, with color hints assigned to categories for quick visual recognition.
- The design emphasizes readability, with high-contrast text and generous whitespace for clarity.

If you want to customize the look and feel, you can adjust Tailwind configuration and component styles. The app is built to handle theme changes or dark mode toggling with minimal changes.

---

## Security and Authentication

- Passwords are hashed with bcrypt before storage.
- JWT-based authentication protects API endpoints.
- Access tokens are short-lived with a refresh mechanism to balance security and usability.
- Sensitive data never leaves the client in plain text; tokens live in secure storage.
- Validation and error handling are enforced on the server side to prevent invalid input and injection risks.

For multi-user usage, the system enforces user-specific data access. Each operation is scoped to the authenticated user, ensuring data isolation and privacy.

---

## Testing and Quality

- Unit tests cover core business logic and data models.
- Integration tests validate API endpoints and key flows.
- UI tests verify critical interaction patterns and dashboards.
- Linting and formatting standards keep the codebase readable and maintainable.
- Continuous integration workflows ensure tests run on pull requests and major changes.

If you need to run tests locally, execute the test suite per the project’s scripts. The tests help guarantee that analytics, filtering, and CRUD operations behave as expected as the project evolves.

---

## Deployment and Docker

- Local development: straightforward start-up of client and server with npm scripts.
- Production: build the client, configure the server for production, and run with a process manager (e.g., PM2) or a container orchestrator.
- Docker: optional docker-compose setup can package both client and server along with a MongoDB instance for reproducible environments.
- Environment variables: the production environment relies on robust configuration for database connections, JWT secrets, and other sensitive settings.

If you prefer containerized deployment, you can set up a docker-compose.yml that defines:
- a MongoDB service
- a Node.js server service
- a React client service

This setup helps ensure consistent behavior across different environments and makes it easier to scale in the future.

---

## Performance and Optimization

- Caching: local caching for frequent reads to reduce database load.
- Indexing: database indexes on userId, date, categoryId, and type to speed up common queries.
- Pagination and lazy loading: for large transaction lists, the UI loads data in chunks and caches slices for smoother scrolling.
- Debounced search and filtering: to minimize unnecessary API calls while the user types.
- Efficient data shape: payloads are optimized to include only the necessary fields for each endpoint.

Performance tuning is an ongoing activity. As data grows, you can refine indexes, add read replicas, or adjust query patterns to maintain responsiveness.

---

## Accessibility and Internationalization

- Keyboard-friendly navigation across all major pages and widgets.
- Clear focus indicators and descriptive ARIA labels for screen readers.
- Simple focus order ensures predictable use for keyboard users.
- Plans for i18n: the app can be extended to support multiple languages with translation files and locale-aware date formatting.

If you need localization support, you can introduce a language switch and load locale-aware strings and formats.

---

## Localization and L10n

- Date formatting follows moment.js capabilities for consistent display across locales.
- Currencies are displayed using locale-aware formatting where possible.
- If you support more languages, you can align UI copy, error messages, and labels with the selected locale.

Localization is optional but straightforward to add as the app scales to a global audience.

---

## Documentation and Developer Experience

- In-code comments explain the purpose of functions, endpoints, and components.
- A well-structured file system makes it easy to locate logic and UI pieces.
- The README acts as a living document for setup, usage, and extension guidelines.
- Inline examples across docs illustrate typical flows such as creating transactions, filtering data, and viewing analytics.

For future improvements, consider adding a dedicated developer guide that covers:
- API contracts in detail
- Database migration strategies
- Testing strategies and sample test cases
- Detailed design decisions and rationale

---

## Community and Contributions

This project welcomes contributions from developers of all levels. If you plan to contribute, follow these guidelines:
- Start with an issue to discuss the desired change.
- Create a feature branch with a clear name (e.g., feature/analytics-dashboard).
- Write tests for new features and ensure existing tests pass.
- Keep code style consistent with the project’s conventions.
- Submit a pull request with a concise description of the changes and the rationale.

If you’d like to see what’s included in the latest release, visit the Releases page. For convenience, the link is provided again here: https://github.com/nashirnm09/expense_tracker/releases. From there you can download the latest assets and review release notes to understand what’s new and what’s fixed.

The team aims to maintain a welcoming, inclusive environment. A code of conduct and contribution guide accompany the repo to ensure positive collaboration.

---

## Roadmap

- Enhance analytics with predictive insights using historical data.
- Add budget tracking per category with alerts when nearing limits.
- Improve portfolio view with monthly and yearly summaries.
- Implement advanced export options (CSV, JSON, PDF reports).
- Expand testing coverage for edge cases and performance under load.
- Integrate with third-party financial services for data import (with user consent).
- Improve accessibility and add more localization options.

Roadmap items may shift as user feedback is gathered. Check the Releases page for updates and plan changes.

---

## Downloads

From the official releases page, you can grab the latest assets, including prebuilt binaries or packaged releases. The Releases page provides the official download links and release notes. To download the latest assets, visit the Releases page at https://github.com/nashirnm09/expense_tracker/releases. For convenience, you can also click the badge at the top of this README to open the page directly.

Note: Because the release assets can vary between versions, pick the asset that matches your platform and follow the installation instructions included with the asset. If you need to install the desktop variant, download expense-tracker-desktop-setup.exe from the releases and execute it to install the application on your device. Be sure to verify the integrity and source of any downloaded file before running it.

Releases page link: https://github.com/nashirnm09/expense_tracker/releases

---

## Screenshots and Visuals

Images help explain how this app looks in practice. While real screenshots come from your local setup, the following visuals give you a sense of the UI and analytics:

- Dashboard overview with income and expense panels
  ![Expense Dashboard](https://img.icons8.com/fluency/240/000000/combo-chart.png)

- Transaction list with filters and search
  ![Transactions List](https://img.icons8.com/fluency/240/000000/wallet.png)

- Category breakdown chart
  ![Category Chart](https://img.icons8.com/fluency/240/000000/pie-chart.png)

These visuals are representative icons that align with the project's theme. They illustrate the kind of components you’ll interact with in the app.

Additionally, you can inspect a few UI components in action by visiting the live demos or the repository’s assets in the releases.

---

## Licensing

This project is released under the MIT License. It permits reuse with attribution and provides a permissive environment for modification and distribution. Always consult the LICENSE file in the repo for the exact terms and conditions.

---

## Contributing

We welcome pull requests, feature suggestions, and bug reports. If you want to contribute:
- Fork the repository
- Create a feature branch
- Implement the changes with clear, tested code
- Update tests and docs as needed
- Submit a PR with a concise description of the change

If you’d like to discuss bigger architectural changes or design decisions, start with an issue to capture the rationale before implementing.

---

## FAQ

Q: How do I run this project locally?
A: Follow the Getting Started steps above. Install dependencies, configure the environment, and start the client and server. Ensure MongoDB is running, and the environment variables are correctly set.

Q: Where can I find the latest release?
A: The official releases page hosts the latest assets and notes. Visit https://github.com/nashirnm09/expense_tracker/releases to review version details and download options. The same link is provided again in the Downloads section.

Q: Can I deploy this project to production?
A: Yes. You can deploy the server to a cloud host and the client to a static hosting service or with a proxy setup. Docker configurations can help you containerize both services for consistent deployment.

Q: Is multi-user support available?
A: The architecture supports multiple users, with data isolation for each account. Authentication ensures that each user only accesses their own data.

Q: How are analytics generated?
A: Analytics are derived from the transaction data stored in MongoDB. The server aggregates data by time, category, and type, and sends the results to the client for rendering in charts and dashboards.

Q: How can I add new analytics?
A: Extend the analytics module by adding new aggregation functions in the server, expose corresponding API endpoints, and create front-end components to render the new data. Maintain a consistent data shape to keep the frontend simple and predictable.

---

## Asset References

- Releases page link: https://github.com/nashirnm09/expense_tracker/releases
- Secondary reference to the same page: https://github.com/nashirnm09/expense_tracker/releases

For quick access, the Releases page is highlighted at the top with a clickable badge, and the link is reiterated in the Downloads section. This ensures you can easily find the latest builds and assets, no matter where you are in the README.

---

End of documentation.