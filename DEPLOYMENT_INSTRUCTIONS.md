# WanderNepal — Next.js SSR Deployment Instructions

## 1. Install Dependencies
```bash
npm install
```

## 2. Run Locally
```bash
npm run dev
# Visit http://localhost:3000
```

## 3. Build for Production
```bash
npm run build
npm run start
```

## 4. Deploy to Vercel (Free)

### Option A: CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B: GitHub (Recommended — auto-deploys on every push)
1. Push this folder to your GitHub repo
2. Go to vercel.com → New Project → Import from GitHub
3. Vercel auto-detects Next.js → click Deploy
4. Done! Your site is live ✅

## 5. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: your-domain.com
3. Verify with HTML meta tag (add to src/app/layout.tsx metadata.verification.google)
4. Submit sitemap: your-domain.com/sitemap.xml

## What was changed from your original React app:
- React Router → Next.js App Router (file-based routing)
- `useParams` → `params` prop in page components
- `<Link to="">` → `<Link href="">`
- `useNavigate` → `useRouter` from 'next/navigation'
- Data fetching moved to server components (no more loading states for main data)
- SEO metadata added to every page
- Sitemap auto-generated at /sitemap.xml
- robots.txt auto-generated
- JSON-LD structured data on place and blog pages
