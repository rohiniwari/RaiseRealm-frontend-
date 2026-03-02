# 🚀 Netlify Deployment Guide for RaiseRealm

## Prerequisites
- Node.js installed
- Netlify account (free sign up at https://netlify.com)
- GitHub account (optional, for Git deployment)

---

## Step 1: Rebuild the Project

The current `dist` folder needs to be rebuilt to include the new logo and video files:

```
bash
cd "c:/Users/tiwar/OneDrive/Desktop/assignment/module 4/raiserealm frontend/frontend"
npm run build
```

This will create a fresh `dist` folder with all assets.

---

## Step 2: Deploy to Netlify

### Option A: Drag & Drop (Quickest)

1. Go to https://netlify.com and sign in
2. Click on **Sites** tab
3. Locate the **Drag and drop your site output folder here** area
4. Drag the entire `dist` folder from your project
5. Drop it on the Netlify dashboard
6. Your site will be deployed instantly!
7. You'll get a random URL like `https://random-name-12345.netlify.app`

### Option B: Connect to Git (Recommended for updates)

#### 2.1: Push Code to GitHub

```
bash
cd "c:/Users/tiwar/OneDrive/Desktop/assignment/module 4/raiserealm frontend/frontend"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Ready for Netlify deployment"

# Create a new GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/raiserealm-frontend.git
git push -u origin main
```

#### 2.2: Connect to Netlify

1. Go to https://netlify.com and sign in
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** as your Git provider
4. Select your `raiserealm-frontend` repository
5. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**

---

## Step 3: Configure Environment Variables

If using Git deployment, add environment variables:

1. In Netlify dashboard, go to **Site settings**
2. Click **Environment variables**
3. Add the following:

| Key | Value |
|-----|-------|
| VITE_API_URL | https://raiserealm-backend.onrender.com/api |

4. Redeploy your site (trigger a new build)

---

## Step 4: Your Site is Live! 🎉

- You'll receive a URL like: `https://your-project-name.netlify.app`
- Share this URL with others!

---

## Important Notes

### Backend Connection
- The backend API must be running at: `https://raiserealm-backend.onrender.com`
- Make sure the backend has CORS enabled for your Netlify URL

### Updating Your Site
- **Drag & Drop**: Repeat the drag & drop process
- **Git Deployment**: Simply push new changes to GitHub, Netlify auto-deploys

### Custom Domain (Optional)
1. Go to **Domain settings** in Netlify
2. Add your custom domain
3. Update DNS records as instructed

---

## Troubleshooting

### Page Not Found on Refresh
- Ensure `_redirects` file is in the `public` folder (already configured)

### Assets Not Loading
- Check that `dist` folder contains all files
- Verify the VITE_API_URL is correct

### API Errors
- Check browser console for CORS errors
- Ensure backend is running and accessible

---

## Files Already Configured for Netlify

| File | Purpose |
|------|---------|
| netlify.toml | Build settings and redirects |
| public/_redirects | SPA routing support |
| .env | Environment variables |

---

Need help? Check Netlify docs: https://docs.netlify.com/
