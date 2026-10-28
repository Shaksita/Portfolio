# Shaksita BK — Portfolio

UI/UX designer portfolio built with **React 18**, **Vite 5** and **Tailwind CSS 3.4**.
All content lives in one data file; the UI is assembled from a small set of reusable
components.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  data/profile.js            All content: bio, facts, experience, skills, projects, links
  lib/cn.js                  Class-name joiner
  hooks/
    useInView.js             Fires once when an element scrolls into view
    useScrollSpy.js          Reports which section is on screen (drives the nav)
  components/
    ui/                      The reusable layer — no page content inside
      Primitives.jsx         Eyebrow, Display, Accent, Prose, Lede,
                             Section, SectionHeading, Container, TextLink
      Button.jsx             Solid / ghost action links
      DetailList.jsx         Label-value rows on a shared left axis
      RecordList.jsx         Title / issuer / period rows
      SubHeading.jsx         Ruled divider heading inside a section
      Reveal.jsx             Scroll-reveal wrapper
    layout/
      Navbar.jsx             Sticky nav with scroll-tracked active link
      Footer.jsx
    sections/                One file per page section
      Hero.jsx  About.jsx  Experience.jsx  Stack.jsx  Work.jsx  Contact.jsx
  App.jsx                    Page composition and order
  index.css                  Theme tokens + base styles
tailwind.config.js           Design tokens exposed to Tailwind
public/
  images/                    Behance project covers
  resume.pdf                 CV served by the download links
```

## Editing content

Everything readable on the page comes from `src/data/profile.js` — no component
needs touching:

| What | Where |
| --- | --- |
| Name, role, headline, bio | `profile` |
| About facts | `profile.facts` |
| Portrait | `profile.portrait.src` — set to `'images/portrait.jpg'` after adding the file |
| Jobs | `experience[]` |
| Skills, tools, languages | `stack` |
| Degree | `education[]` |
| Certificates | `certifications[]` |
| Projects | `projects[]` |
| Email, phone, links | `contact` |
| Nav links and page order | `navLinks` + the order in `App.jsx` |

### Adding a project

Append to `projects` in `profile.js`, drop its cover in `public/images/`, and the
row renders itself:

```js
{
  id: 'new-project',
  title: 'Project name',
  discipline: 'Mobile app · UI/UX case study',
  summary: 'One line about it.',   // optional — renders under the discipline
  cover: 'images/new-project.png',
  href: 'https://www.behance.net/gallery/...',
}
```

## Theming

Colours are CSS custom properties in `src/index.css`, declared as RGB channels so
Tailwind can apply opacity (`bg-paper/90`). Tailwind maps them to names in
`tailwind.config.js`: `paper`, `paper-2`, `ink`, `ink-2`, `ink-3`, `accent`,
`rule`, `rule-2`.

Three theme states are handled:

- `:root` — light palette
- `@media (prefers-color-scheme: dark)` — dark when the OS asks, unless
  `data-theme="light"` is set
- `[data-theme="dark"]` — explicit override always wins

To add a theme toggle, set `document.documentElement.dataset.theme` to
`'dark'` / `'light'`. No component changes are needed.

Type uses two faces loaded from Google Fonts in `index.html`:
**Cormorant Garamond** for display, **Karla** for body and labels.

## Accessibility & motion

- Visible focus ring on every interactive element (`:focus-visible` in `index.css`)
- `prefers-reduced-motion` disables scroll reveals and smooth scrolling
- Nav links expose `aria-current` on the active section
- Images carry real `alt` text and intrinsic `width`/`height`

## Deploying

The build uses relative asset paths (`base: './'`), so `dist/` works at a domain
root, in a subfolder, or on GitHub Pages as-is.

- **Netlify / Vercel** — build command `npm run build`, publish directory `dist`
- **GitHub Pages** — push the contents of `dist/`, or use an action that does
- **Any static host** — upload `dist/`

## Content sources

Text is taken from the CV (`public/resume.pdf`); projects, titles and cover images
come from [behance.net/shaksitarajan](https://www.behance.net/shaksitarajan).
Behance blocks automated access to individual project pages, so per-project
descriptions are not included — add them as `summary` fields in `projects[]`.
