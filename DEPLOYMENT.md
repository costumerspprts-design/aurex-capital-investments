# Deployment Guide

This project is built with [Next.js](https://nextjs.org/), which makes it easy to deploy to various hosting platforms.

## Deploy to Vercel (Recommended)

Vercel is the creators of Next.js and provides the best deployment experience.

1.  **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
2.  **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up/login.
3.  **Import Project**:
    *   Click "Add New..." -> "Project".
    *   Select "Continue with GitHub".
    *   Find and select your repository (`bee-ai-builder`).
4.  **Configure**:
    *   Vercel will automatically detect that it's a Next.js project.
    *   The default build settings (`next build`) and output directory are correct.
    *   Click **Deploy**.
5.  **Done**: Your site will be live in a minute!

## Deploy to Netlify

1.  **Push to GitHub**.
2.  **Create Netlify Account**: Go to [netlify.com](https://netlify.com).
3.  **Import Project**:
    *   Click "Add new site" -> "Import from existing project".
    *   Connect to GitHub.
    *   Select your repository.
4.  **Configure**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `.next` (Netlify usually detects Next.js automatically and handles this via a plugin, or you may need to set it to `out` if doing static export, but for this app the default SSR/ISR is best).
    *   *Note*: Netlify might require the `@netlify/plugin-nextjs` which is usually auto-installed.
5.  **Deploy**: Click **Deploy site**.

## Docker / Self-Hosting

You can also build a Docker image or run it on a Node.js server:

1.  Build: `npm run build`
2.  Start: `npm start`
