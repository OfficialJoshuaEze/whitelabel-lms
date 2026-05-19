# Batch 2 — Authentication UI Pages

This batch adds the LMS authentication interface.

## Files included

```txt
pages/login.html
pages/register.html
pages/forgot-password.html
pages/reset-password.html
pages/verify-email.html
assets/css/style.css
assets/js/app.js
docs/batch-2-auth-ui.md
```

## How to apply

Copy the contents of this folder into the root of your LMS project. Allow `assets/css/style.css` and `assets/js/app.js` to be overwritten so the new auth styles and interactions are added.

## Test these pages

```txt
pages/login.html
pages/register.html
pages/forgot-password.html
pages/reset-password.html
pages/verify-email.html
```

## Git commands

```powershell
git checkout main
git pull
git checkout -b feature/auth-pages

git status
git add .
git commit -m "Add authentication UI pages"
git push -u origin feature/auth-pages
```
