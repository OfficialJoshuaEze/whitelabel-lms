# Batch 2 — Authentication UI Pages

## Files Added
- `pages/login.html`
- `pages/register.html`
- `pages/forgot-password.html`
- `pages/reset-password.html`
- `pages/verify-email.html`

## Assets Updated
- `assets/css/style.css`
- `assets/js/app.js`

## UI Coverage
- Email/password sign in
- Google sign-in button placeholder
- Student/instructor registration role selection
- Password visibility toggle
- Password strength indicator
- Forgot password request screen
- Reset password screen
- Email verification code screen

## Backend Notes for Later
- Connect forms to PHP controllers.
- Hash passwords using `password_hash()`.
- Validate login with `password_verify()`.
- Store email verification tokens securely.
- Apply rate limiting on login, password reset and verification attempts.
- Add Google OAuth during the backend auth phase.
