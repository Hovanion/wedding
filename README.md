# Wedding Page

A simple, elegant wedding website template built with plain HTML, CSS, and JavaScript — ready for [GitHub Pages](https://pages.github.com/).

## Live preview

After publishing, your site will be available at:

```
https://<your-github-username>.github.io/weddingpage/
```

## Customize

Edit these files to make the site yours:

| File | What to change |
|------|----------------|
| `index.html` | Names, dates, locations, story text, schedule |
| `styles.css` | Colors, fonts, spacing |
| `script.js` | Wedding date for the countdown (`WEDDING_DATE`) |

Replace the hero background image URL in `styles.css` or add your own image to the repo.

## Publish on GitHub Pages

### 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `weddingpage` (or any name you prefer)
3. Leave it **public** (required for free GitHub Pages on personal accounts)
4. Do **not** initialize with a README if you already have local files
5. Click **Create repository**

### 2. Push this project

```bash
cd /Users/erzsebetficho/Documents/weddingpage
git init
git add .
git commit -m "Add wedding page template for GitHub Pages"
git branch -M main
git remote add origin https://github.com/<your-github-username>/weddingpage.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**
4. Choose branch **main** and folder **/ (root)**
5. Click **Save**

GitHub will build and publish the site. The URL appears at the top of the Pages settings page after a minute or two.

## RSVP form (optional)

The included RSVP form saves responses to the browser's local storage for demo purposes only.

For real guest responses, connect one of these:

- [Formspree](https://formspree.io) — add `action="https://formspree.io/f/your-id"` to the `<form>` tag
- [Google Forms](https://forms.google.com) — embed or link to your form
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — if you deploy elsewhere later

## Local preview

Open `index.html` in your browser, or run a simple server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
