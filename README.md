# BookMyForex Assist — Next.js & Tailwind CSS Frontend

A modern, production-grade Next.js chat interface for **BookMyForex Assist**, connected directly to the live Render backend (`https://bookmyforex-rag.onrender.com`).

---

## 🌟 Key UI/UX Features

- **Strict Grounding Status Badges**: Displays 🛡️ *Verified Policy Grounding* for grounded answers or ⚠️ *Compliance Escalation Required* when policies are missing.
- **Collapsible Policy Sources Drawer**: Cleanly presents official document titles, sections, and excerpts — **with zero percentage scores, similarity metrics, or match badges**.
- **Quick Action Chips**: One-click prompts for cashback slabs, emergency ATM SOPs, insurance claim FIR rules, PIN blocks, and remittance offers.
- **Scope Filters**: Select document scopes (Campaigns, SOPs, Product Guides, Company Profile).
- **Vercel-Ready**: Built with Next.js 14, Tailwind CSS, TypeScript, and Lucide React icons.

---

## 🚀 Quick Deployment to Vercel (3 Steps)

### Step 1: Create a New GitHub Repository for Frontend

1. Go to **[github.com/new](https://github.com/new)**
2. Name the repository: **`bookmyforex-assist-frontend`**
3. Select **Public** or **Private**, and click **Create repository** (do NOT add a README or .gitignore).

### Step 2: Push the Frontend Code to GitHub

Open terminal inside the `frontend` folder:
```bash
cd frontend
git init
git add .
git commit -m "BookMyForex Assist Next.js Frontend"
git branch -M main
git remote add origin https://github.com/astrokshitij/bookmyforex-assist-frontend.git
git push -u origin main
```

*(Note: Replace `astrokshitij` with your GitHub username if creating under a different account).*

### Step 3: Deploy Live on Vercel

1. Log in to **[vercel.com](https://vercel.com)**
2. Click **Add New...** → **Project**
3. Select your repository **`bookmyforex-assist-frontend`** and click **Import**
4. Set **Environment Variables** (Optional, defaults to live Render URL):
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://bookmyforex-rag.onrender.com`
5. Click **Deploy**!

Vercel will build and publish your app in ~1 minute at a custom URL (e.g. `https://bookmyforex-assist-frontend.vercel.app`).
