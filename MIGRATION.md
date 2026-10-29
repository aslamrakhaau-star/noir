# NOIR GitHub migration

This is the full static site, tests and vendor license. All assets use relative paths for GitHub Pages project hosting. No ChatGPT sign-in routes remain.

1. Create a separate GitHub repo named noir. Upload this directory (including .github).
2. Settings → Pages → Source: GitHub Actions. The included workflow publishes dist on pushes to main.
3. Create a Firebase project, register a Web app, and enable Authentication → Google provider. Choose your support email.
4. Add your actual GitHub Pages hostname to Firebase Authentication → Settings → Authorized domains.
5. Copy the Firebase Web configuration object into dist/auth-config.js in place of null. It contains public app identifiers. Never put a service account/private key in the site.
6. Push and check the deployment, then test Google login and logout on desktop and phone.

Google login identifies the user. This static site does not enforce private access to its files, and watchlist/history are still browser-local, not cloud synchronized. GitHub Pages and ChatGPT are different origins, so existing local lists do not automatically move. Keep the original site available until migration is verified.

Watching is a dedicated tab immediately before My list, available on mobile and desktop; tapping a card resumes the stored episode/progress where the provider supports it.
