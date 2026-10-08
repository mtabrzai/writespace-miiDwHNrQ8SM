# writespace

A modern platform for writers to create, share, and collaborate on their work.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Testing**: Vitest + Testing Library
- **Build Tool**: Vite
- **Deployment**: Vercel

## Features

- **User Authentication**: Secure login and registration system
- **Blog Management**: Create, edit, publish, and delete blog posts
- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Built-in dark mode support
- **Admin Dashboard**: Manage users and posts
- **Markdown Support**: Rich text editing capabilities
- **Real-time Collaboration**: (Planned feature)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/writespace.git
cd writespace
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=writespace
```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
writespace/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── blog/          # Blog-related components
│   │   ├── layout/        # Layout components
│   │   ├── ui/            # UI primitives
│   │   └── __tests__/     # Component tests
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   └── *.jsx          # Application pages
│   ├── stores/            # Zustand stores
│   ├── constants.js       # Application constants
│   ├── routes.jsx         # Application routes
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vercel.json            # Vercel deployment configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report

## Testing

The project uses Vitest for testing with the following setup:

```bash
npm run test
# or for watch mode
npm run test:watch
```

Test files are colocated with components in `__tests__` directories.

## Deployment

The application is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

To deploy:

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite project and deploy it

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.