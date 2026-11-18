# Farell Eugene · Portfolio

Personal portfolio built with Next.js 16, Tailwind CSS 4 and shadcn/ui. Light and dark mode, responsive, fully static.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

All text, projects, experience and skills live in [`src/data/portfolio.ts`](src/data/portfolio.ts).

### Add a profile photo

1. Put the image in `public/`, e.g. `public/profile.jpg` (portrait, around 800×1000 px).
2. In `src/data/portfolio.ts`, set `photo: "/profile.jpg"` in `profile`.

### Add project screenshots

1. Put images in `public/projects/`, e.g. `public/projects/clv.png` (16:10 works best).
2. Add `image: "/projects/clv.png"` to that project in `projects`.

Without an image, each card shows a generated mini dashboard with the project's key result.

### Update the CV

Replace `public/cv/Farell-Eugene-CV.pdf` (keep the same filename). Keep the phone number out of the public version.

## Privacy rules

- No student ID (NIM) or phone number anywhere on the site or in the CV PDF.
- The thesis project never names the company: "B2B coal sales" with synthetic data.
- No accuracy figure for the facial-emotion project.

## Design

iOS-style liquid glass on a dark base (ui-ux-pro-max "Liquid Glass" style), with spring physics in `src/lib/spring.ts`, smooth scrolling via Lenis, and two accent palettes (Warm / Blue) that visitors can switch in the navbar. Fira Sans and Fira Code, with Instrument Serif italics as accents.

## Credits

Tool logos in `public/logos/` come from [devicon](https://github.com/devicons/devicon) (MIT) and [simple-icons](https://github.com/simple-icons/simple-icons) (CC0). The Power BI, Excel and Tableau marks are simplified versions drawn for this site. All logos are trademarks of their owners and are shown only to name the tools used.
