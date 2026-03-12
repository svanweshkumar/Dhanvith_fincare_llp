# 🚀 Complete Deployment Guide: DHANVITHFINCARE.COM to Netlify

Your project is **Netlify-ready**! Follow these **exact steps** (Windows/PowerShell/cmd). Copy-paste commands.

## 1. Install Netlify CLI
```bash
npm install -g netlify-cli
netlify --version  # Verify
```

## 2. Setup Git Repo (Local)
```bash
git init
git add .
git commit -m \"Initial commit: Vite/React + Netlify functions with Resend\"
```

## 3. Create GitHub Repo & Push
- Go to [github.com/new](https://github.com/new) → Repo name: `dhanvith-fincare-llp` (or similar) → **Public** → Create.
- Copy repo URL (e.g., https://github.com/YOUR_USERNAME/dhanvith-fincare-llp.git)
```bash
git remote add origin https://github.com/YOUR_USERNAME/dhanvith-fincare-llp.git
git branch -M main
git push -u origin main
```

## 4. Connect to Netlify (Auto-Deploys)
Login:
```bash
netlify login  # Browser auth
```
New site from Git:
- Go [app.netlify.com](https://app.netlify.com) → Add new site → Git → GitHub → Authorize → Select your repo → Configure:
  - Build command: `npm run build` (auto-detected)
  - Publish dir: `dist`
- Deploy! Site gets random name, e.g., `dhanvith-fincare-llp.netlify.app`

**OR CLI**:
```bash
netlify init  # Select GitHub, create/link site
```

## 5. Set Environment Variables (Critical for Resend!)
Netlify Dashboard → Site settings → Environment variables → Add:
| Key | Value | Scope |
|----|-------|-------|
| RESEND_API_KEY | `your_resend_api_key_here` | All scopes (Production/Deploy) |

CLI:
```bash
netlify env:set RESEND_API_KEY your_resend_api_key_here
```

## 6. Test Locally
```bash
npm install  # Ensure deps
netlify dev  # Runs on localhost:8888 (frontend+functions)
# Test contact form → Check console/network for emails (demo if no key)
```

## 7. Production Deploy
```bash
netlify deploy --prod --dir=dist  # Manual
# OR push to GitHub main → Auto-deploys
```

## 8. Custom Domain: DHANVITHFINCARE.COM
Netlify Dashboard → Domain settings → Add custom domain → `DHANVITHFINCARE.COM`
- Netlify verifies → Provides DNS records.

## 9. Update GoDaddy DNS
Login [godaddy.com](https://dcc.godaddy.com/control/dhanvithfincare.com) → DNS Management:
- Delete old A/CNAME records conflicting with www or @.
- **For apex (@)**: Add **ALIAS** or **ANAME** → `dhanvithfincare.com` → Target: `<your-site>.netlify.app` (Netlify provides).
- **For www**: Add **CNAME** → `www` → Target: `<your-site>.netlify.app`
```
Type: CNAME, Name: www, Value: your-site.netlify.app, TTL: 1hr
Type: ALIAS/ANAME, Name: @, Value: your-site.netlify.app, TTL: 1hr
```
Wait 5-30min propagation → HTTPS auto-provisions (Netlify SSL).

## 10. Verify & Go Live
- Visit `https://DHANVITHFINCARE.COM`
- Test contact form → Email received at `dhanvithfincare@gmail.com` via Resend.
- Mobile responsive, functions work.
- Resend dashboard: Check emails/sends.

## Troubleshooting
| Issue | Fix |
|-------|-----|
| Build fails | `npm install`, check vite.config.ts |
| Functions 404 | Check redirects in netlify.toml |
| Emails not sending | Verify RESEND_API_KEY, domain auth in Resend |
| Domain not resolving | DNS propagation (dig/webcheck), correct records |
| CLI issues | `netlify logout`, retry login |

**Netlify site URL ready? Paste it here for domain verification help.**

**Deployment complete! 🚀** Run `npm run build && netlify deploy --prod` for quick manual test.

