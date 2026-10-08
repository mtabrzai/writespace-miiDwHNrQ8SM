# DEPLOYMENT.md

# Deployment Guide

This guide provides instructions for deploying the writespace application to various platforms. The primary deployment target is Vercel, but alternative deployment methods are also covered.

## Table of Contents

- [Vercel Deployment](#vercel-deployment)
  - [Prerequisites](#prerequisites)
  - [Deployment Steps](#deployment-steps)
  - [Environment Variables](#environment-variables)
  - [Custom Domains](#custom-domains)
  - [CI/CD Setup](#cicd-setup)
- [Alternative Deployment Methods](#alternative-deployment-methods)
  - [Netlify](#netlify)
  - [AWS Amplify](#aws-amplify)
  - [Docker](#docker)
  - [Self-Hosted](#self-hosted)
- [Post-Deployment Checks](#post-deployment-checks)
- [Troubleshooting](#troubleshooting)

## Vercel Deployment

Vercel is the recommended deployment platform for writespace. The application is pre-configured for Vercel deployment.

### Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- The writespace repository hosted on GitHub, GitLab, or Bitbucket
- Node.js (v18 or higher) installed locally for testing
- npm or yarn installed

### Deployment Steps

1. **Connect your repository to Vercel:**
   - Log in to your Vercel account
   - Click "Add New" → "Project"
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Choose the writespace repository

2. **Configure project settings:**
   - Vercel will automatically detect that this is a Vite + React project
   - Project Name: writespace (or your preferred name)
   - Framework Preset: Vite
   - Root Directory: (Leave empty, as the project is in the root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set environment variables:**
   - In the "Environment Variables" section, add all required variables from your `.env` file
   - See [Environment Variables](#environment-variables) section for details

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Once deployment is complete, you'll receive a deployment URL (e.g., `https://writespace.vercel.app`)

### Environment Variables

The following environment variables must be set in Vercel:

```env
VITE_API_BASE_URL=https://your-api-endpoint.com/api
VITE_APP_TITLE=writespace
```

To set these in Vercel:
1. Go to your project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add each variable with its corresponding value
4. Click "Save"

For production deployments, ensure `VITE_API_BASE_URL` points to your production API endpoint.

### Custom Domains

To add a custom domain to your Vercel deployment:

1. Go to your project dashboard
2. Navigate to "Settings" → "Domains"
3. Enter your domain name (e.g., `writespace.yourdomain.com`)
4. Follow the DNS configuration instructions provided by Vercel
5. Wait for DNS propagation (this may take up to 24 hours)

### CI/CD Setup

Vercel automatically sets up CI/CD when you connect your repository. Every push to the main branch will trigger a new deployment.

To configure branch deployments:
1. Go to your project dashboard
2. Navigate to "Settings" → "Git"
3. Under "Production Branch", set your production branch (typically `main` or `master`)
4. Under "Ignored Build Step", you can add a script to skip builds if needed

## Alternative Deployment Methods

### Netlify

1. **Connect your repository:**
   - Log in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Connect to your Git provider and select the writespace repository

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (Leave empty)

3. **Set environment variables:**
   - Go to "Site settings" → "Environment variables"
   - Add the same variables as for Vercel

4. **Deploy:**
   - Click "Deploy site"

### AWS Amplify

1. **Connect your repository:**
   - Log in to AWS Amplify Console
   - Click "Connect app" → "GitHub" (or your Git provider)
   - Select the writespace repository

2. **Configure build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment: `Production`

3. **Set environment variables:**
   - In the build settings, add environment variables under "Environment variables"

4. **Deploy:**
   - Click "Save and deploy"

### Docker

A Dockerfile is provided for containerized deployment:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine as production
WORKDIR /app
ENV NODE_ENV production
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 3000
CMD ["npx", "serve", "dist"]
```

To build and run the Docker container:

```bash
# Build the image
docker build -t writespace .

# Run the container
docker run -p 3000:3000 -e VITE_API_BASE_URL=https://your-api-endpoint.com/api -e VITE_APP_TITLE=writespace writespace
```

### Self-Hosted

For self-hosted deployments:

1. **Build the application:**
   ```bash
   npm install
   npm run build
   ```

2. **Serve the production files:**
   You can use any static file server to serve the contents of the `dist` directory. Some options include:

   - Using `serve`:
     ```bash
     npx serve dist
     ```

   - Using Nginx:
     Configure your Nginx server to serve the `dist` directory as the root.

   - Using Apache:
     Configure your Apache server to serve the `dist` directory as the document root.

3. **Set environment variables:**
   Ensure your server has access to the required environment variables. For Vite applications, these must be available at build time.

## Post-Deployment Checks

After deployment, verify the following:

1. **Application Accessibility:**
   - Visit the deployment URL in a web browser
   - Verify the application loads without errors
   - Test navigation between pages

2. **Authentication:**
   - Register a new user
   - Log in with the registered user
   - Verify protected routes are accessible
   - Test logout functionality

3. **Blog Functionality:**
   - Create a new blog post
   - View the created post
   - Edit the post
   - Delete the post

4. **Admin Features:**
   - Log in as an admin user
   - Access the admin dashboard
   - Test user management features
   - Test post management features

5. **Performance:**
   - Check the network tab in developer tools for any failed requests
   - Verify API requests are completing successfully
   - Test on different devices and screen sizes

## Troubleshooting

**Build fails on Vercel/Netlify:**
- Check the build logs for errors
- Ensure all environment variables are set correctly
- Verify the Node.js version matches your local environment
- Check for any missing dependencies in package.json

**Application loads but shows blank page:**
- Verify the base path in vite.config.js matches your deployment URL
- Check the browser console for errors
- Ensure all static assets are loading correctly

**API requests failing:**
- Verify the `VITE_API_BASE_URL` environment variable is set correctly
- Check CORS settings on your API server
- Ensure the API endpoint is accessible from the deployment environment

**Authentication issues:**
- Verify the auth token is being stored correctly in localStorage
- Check the network tab for failed login/register requests
- Ensure your API endpoint is correctly handling authentication

**Dark mode not working:**
- Verify Tailwind CSS is properly configured
- Check if the dark mode class is being applied to the HTML element
- Ensure your custom CSS variables are properly defined

For additional support, consult the project's README.md or open an issue on the repository.