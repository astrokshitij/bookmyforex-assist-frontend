# BookMyForex Assist — Next.js & Tailwind CSS Frontend

A Next.js prototype chat interface for **BookMyForex Assist**, connected directly to the live Render backend (`https://bookmyforex-rag.onrender.com`).

## Evaluation evidence — 19 October 2026

**11/12 deterministic case checks passed on the historical 12-case benchmark. This is not answer accuracy. Full answer quality remains unverified.**

The live API run missed its source-recall target (88.89% vs 90%) and HTTP p95 latency target (13.28s vs 3.5s). Judge-based quality and semantic citation support were not measured. All six expected-refusal cases passed, which does not establish general attack resistance.

Read the [product case study](docs/assist-case-study.md), [dated measurement record](docs/evaluation-evidence-2026-10-19.json), and [portfolio/resume wording](docs/portfolio-copy.md). Each reported result includes its dataset, denominator, method, date and limitations.

---

## 🌟 Key UI/UX Features

- **Answer status**: Labels model output as an AI draft requiring source review, or shows a compliance escalation. Automated checks do not certify correctness.
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

Vercel builds and publishes the connected branch. Confirm the deployment status before claiming an update is live.
