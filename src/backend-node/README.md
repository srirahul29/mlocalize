# Scalable Backend System (MLocalize)

A production-ready backend built with NestJS, Prisma, and PostgreSQL.

## Features
- **Auth**: JWT-based authentication with Role-Based Access Control (RBAC).
- **Users**: Profile management and activity tracking.
- **Services**: CRUD for service offerings and categorization.
- **CMS**: Page and Blog management with SEO metadata.
- **Orders**: Project tracking with workflow states and team assignments.
- **Payments**: Stripe integration for secure transactions and invoicing.
- **Security**: Hardened with Helmet, Rate limiting, and CORS.
- **Documentation**: Swagger UI available at `/api/docs`.

## Tech Stack
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Security**: Passport, JWT, Helmet, express-rate-limit
- **Integration**: Stripe (Payments), Cloudinary (Media)

## Setup

### 1. Prerequisites
- Docker & Docker Compose
- Node.js (v20+)
- npm or pnpm

### 2. Configure Environment
Create a `.env` file in the root based on `.env.example`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mlocalize?schema=public"
JWT_SECRET="your-secret"
JWT_EXPIRES_IN="1d"
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PORT=3000
```

### 3. Run with Docker
```bash
docker-compose up -d
```

### 4. Local Development
```bash
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

## API Documentation
Once running, visit `http://localhost:3000/api/docs` to view the Swagger documentation.
