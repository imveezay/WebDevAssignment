# StockSync — Retail Inventory System Website
ICT726 Assignment 3 (Static Website)

## Pages
- `index.html` — Home
- `about.html` — About Us
- `services.html` — Features
- `gallery.html` — Media gallery (photo lightbox + demo video)
- `contact.html` — Contact form

## Structure
```
/
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## How to preview locally
Just open `index.html` in a browser — no build step or server needed.
For the best experience (so relative links behave the same as when hosted),
you can also run a tiny local server from this folder:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Hosting on GitHub Pages (free, recommended)
1. Create a new GitHub repository, e.g. `stocksync-website`.
2. Push all the files in this folder to the repository (keep the folder structure above).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/root`.
5. Save. GitHub will give you a live URL like `https://<your-username>.github.io/stocksync-website/`.
6. Paste that link into Moodle as required by the assignment.

## Notes
- This is a static prototype only — the contact form does not send data anywhere.
  It validates input in the browser and shows a success/error message with JavaScript.
- Images are royalty-free stock photos (Unsplash) and placeholder avatars (pravatar.cc),
  used for this student prototype. Swap in your own photos if your unit requires
  fully self-created media.
- Remember to add real screenshots to the assignment report before submitting.
