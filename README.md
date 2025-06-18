# README: TLS and UAV Campaigns – Single-Page Website Setup

## Purpose

This README provides detailed, AI-executable instructions to generate a single-page JavaScript-based website. The goal is to present and communicate scientific work involving Terrestrial Laser Scanning (TLS) and UAV laser data collection. The final product must be clean, modern, visually engaging, and usable during conferences and scientific talks. It will also act as a metadata repository for current and future research sites. The Website has to be able to see through phone screens and computer screens.

The website will eventually be published via **Netlify**, so the output must be compatible with standard static hosting.

---

## Technical Requirements

* Use **HTML, CSS (Tailwind preferred)**, and **JavaScript**.
* Use **Roboto** or another modern sans-serif font.
* Ensure mobile responsiveness.
* One-page scrolling structure (anchor-linked sections).
* Accessible color scheme and semantic HTML.
* All scripts and assets must be self-contained (or CDN-loaded).

---

## Website Sections

### 1. Hero Section (Headline and Introduction)

* Full-width background image (use `hero.jpg` as placeholder).
* Large title: `Terrestrial Laser Scanning & UAV Lidar Campaigns`
* Subtitle: `Advanced Forest Structure Monitoring with GFZ`
* One-sentence description: `We collect and process high-resolution 3D laser data from natural forests to analyze structural changes and carbon sinks.`

### 2. Map Section: Scan Locations

* Section title: **"Scan Locations"**
* Subtitle: `Global overview of our TLS and UAV data campaigns.`
* Use interactive **Leaflet.js** map.
* Load data from `locations.csv` containing columns: `status`, `Plot_name`, `lat`, `lon`, `Forest_type`, `Date`, `Data_type`, `Area`, `Scanpositions`, `Scannertype`
* Marker behavior:

  * Position based on `lat` and `lon`
  * Marker color:

    * Green: `status = done`
    * Orange: `status = planned`
  * Tooltip on hover: `Plot_name`
  * Popup on click: Show other columns in a clean list (excluding  `status`,`Data_type`, `Scannertype`,`Forest_type`)
* Include a legend at the bottom right.

### 3. Section: Work Description

* Title: **"What We Do"**
* Three content blocks with icons/images:

  * **Terrestrial Laser Scanning (TLS)**: Explain ground-based scanning.
  * **UAV Lidar**: Describe airborne data collection.
  * **Postprocessing**: Summarize data fusion, alignment, and structural metric extraction.

### 4. Section: Site Gallery & Details

* Title: **"Field Sites"**
* Each field site is displayed as a block/card in a responsive grid layout.
* Responsive image grid layout.
* Each block shows:

  * A slideshow or image carousel that can be clicked or navigated to show multiple images per site.
  * Site name as the block title.
  * A basic description paragraph with key site characteristics, campaign purpose, or notable results.
  * Optionally, a button or link to related publications, data access requests, or external resources.

* Ensure the layout adapts well to desktop and mobile views.
* Use clean transitions and navigation icons for the image carousel.

### 5. Section: Partners and Contact

* Title: **"Collaborators & Contact"**
* Logos of collaborating institutions (placeholder images acceptable)
* Contact information:

  * Name
  * Email address
  * Optionally embed a contact form

---

## Deployment Instructions (for AI)

1. Generate all required HTML, CSS, and JS files.
2. Use `map.js` for Leaflet map implementation.
3. Use Tailwind CSS (via CDN) or custom CSS with minimal style.
4. Store assets in a folder named `assets/` (e.g., `assets/images/hero.jpg`, `assets/data/locations.csv`).
5. Ensure proper `<meta>` tags in `<head>` for mobile support.
6. Prepare the project for publishing on Netlify (i.e., all static files in root or `public/` folder).

---

## Final Notes

* Keep design light and professional.
* Ensure clear code comments.
* Focus on visual hierarchy, consistency, and ease of navigation.
* Website must be easy to extend and update.

This README should guide any AI system or human developer in generating a coherent and compelling one-page scientific portfolio site.
