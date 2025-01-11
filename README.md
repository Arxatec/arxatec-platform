# Arxatec Platform Documentation

## Overview

Arxatec is an advanced legal services platform that goes beyond traditional CRM functionality. It leverages artificial intelligence to help clients better understand their legal rights, enables lawyers to obtain AI-powered case summaries, and fosters a vibrant legal community where clients can actively participate and engage with each other.

## Key Features

- AI-powered legal rights analysis
- Automated case summarization
- Community engagement platform
- Client portal
- Legal professional dashboard

## Tech Stack

### Core Technologies

- React.js - Frontend framework
- TypeScript - Static typing
- Vite - Build tool and development server
- Tailwind CSS - Utility-first CSS framework
- Zustand - State management

### Additional Libraries

- React Router - Client-side routing
- React Hook Form - Form handling and validation
- i18next - Internationalization
- Headless UI - Unstyled, accessible UI components
- HeroIcons - Icon library

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/arxatec-platform.git
cd arxatec-platform
```

2. Install dependencies:

```bash
npm install
```

3. Generate localization keys:

```bash
node generateLocaleKeys.js
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with hot module replacement (HMR) enabled.

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Deployment Options

### Docker Deployment

The platform includes three Dockerfile variants optimized for different package managers:

- `Dockerfile` - npm (default)
- `Dockerfile.pnpm` - pnpm
- `Dockerfile.bun` - Bun

#### Building Docker Images

Choose the appropriate command based on your package manager:

```bash
# Using npm
docker build -t arxatec-platform .

# Using pnpm
docker build -f Dockerfile.pnpm -t arxatec-platform .

# Using bun
docker build -f Dockerfile.bun -t arxatec-platform .
```

#### Running Docker Containers

```bash
docker run -p 3000:3000 arxatec-platform
```

### Cloud Deployment Options

The containerized application can be deployed to various cloud platforms:

- AWS Elastic Container Service (ECS)
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway
