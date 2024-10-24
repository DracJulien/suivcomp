# 🚀 Authentication Microservice

![GitHub repo size](https://img.shields.io/github/repo-size/DracJulien/auth?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/DracJulien/auth?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/DracJulien/auth?style=flat-square)
![GitHub license](https://img.shields.io/github/license/DracJulien/auth?style=flat-square)

An easy-to-use, scalable authentication and user management microservice built with **Node.js**, **Express**, **Prisma**, and **TypeScript**. This microservice also includes role management and uses **Swagger** for API documentation.

## ✨ Features

- 📦 **CRUD User Management**: Create, Read, Update, and Delete users.
- 🔑 **JWT Authentication**: Secure authentication using **JSON Web Tokens**.
- 🛠️ **Role-Based Access Control**: Define different roles (e.g., Admin, User) and restrict access accordingly.
- 📚 **Swagger Documentation**: Interactive API documentation using Swagger UI.
- 🐳 **Dockerized**: Easy deployment using **Docker**.
- ✅ **Unit Testing**: Unit tests written using **Jest**.
- 📏 **ESLint**: Code linting for consistent and clean code.

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Running Locally](#-running-locally)
- [Running with Docker](#-running-with-docker)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Getting Started

To get started with the authentication microservice, follow these simple steps.

### 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) (optional for running in containers)
- [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/auth-microservice.git
   cd auth-microservice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   - Copy the `.env.example` file to `.env` and modify the variables accordingly.
   ```bash
   cp .env.example .env
   ```

## 💻 Running Locally

1. Run database migrations with Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## 🐳 Running with Docker

To run the microservice using Docker, use the following command:

```bash
docker-compose up --build
```

This will start the microservice along with a MySQL container.

## 📄 API Documentation

Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

![Swagger UI Screenshot](https://via.placeholder.com/600x300?text=Swagger+UI+Example)

## 🌱 Environment Variables

The `.env` file contains environment-specific variables, including:

- **`DATABASE_URL`**: The URL for your MySQL or MariaDB database.
- **`JWT_SECRET`**: Secret key for JWT token generation.
- **`NODE_ENV`**: `development` or `production`.

## 🧪 Testing

This microservice includes unit tests for the core features. To run tests:

```bash
npm run test
```

- **Watch for open handles** with Jest to detect asynchronous operations:

  ```bash
  npm run test -- --detectOpenHandles
  ```

## 🤝 Contributing

Contributions are welcome! Please fork this repository, create a feature branch, and open a Pull Request to contribute.

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m 'Add some new feature'`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Made with ❤️ by [DracJulien].

