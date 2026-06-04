# Neramind Website

Static website for **Neramind LLP**.

This project can be hosted directly on **GitHub Pages** because it uses plain HTML, CSS, and JavaScript.

## Files

- `Neramind_website.html` - main website file
- `preview (2).html` - alternate working version

## Recommended Before Publishing

GitHub Pages looks for `index.html` by default.

For the smoothest hosting setup:

1. Choose the final version of your website.
2. Rename that file to `index.html`.
3. Keep all related assets in the same repository.

Example:

- `index.html`
- `README.md`

## Push To GitHub

If this folder is not already a Git repository:

```bash
git init
git add .
git commit -m "Initial website commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

If the repository already exists:

```bash
git add .
git commit -m "Update website"
git push
```

## Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`, choose:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
5. Click `Save`.

GitHub will generate a live website URL like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## Important Note About The Homepage

If your main file stays named `Neramind_website.html` instead of `index.html`, visitors will need to open:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/Neramind_website.html
```

That works, but `index.html` is better for normal website hosting.

## Form Submission Note

The contact form is currently connected to Formspree.

If you are hosting on GitHub Pages:

- the site itself will host fine
- Formspree submissions will continue working
- JavaScript-based success messages will also work

## Updating The Site Later

After making changes:

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages will automatically publish the updated version.

## Suggested Repository Name

A clean repo name could be:

```text
neramind-website
```

