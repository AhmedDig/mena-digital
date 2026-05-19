# Mena Digital – Liquid Glass Portfolio

A modern, responsive portfolio website built with a **liquid glass** aesthetic. Showcases services, portfolio projects, blog, and company info with a smooth light/dark mode toggle and mobile‑first carousels.

## Live Demo
[View live site](https://yourusername.github.io/mena-digital/) – *replace with your GitHub Pages URL after deployment*

## Features

- **Liquid glass design** – translucent cards with backdrop blur, subtle borders, and smooth hover effects.
- **Light / Dark mode** – persistent user preference with `localStorage` and system theme detection.
- **Fully responsive** – desktop grid layouts transform into horizontal carousels on mobile (swipe + arrow navigation).
- **Dynamic header & footer** – loaded via fetch, so updating navigation is centralised in `assets/templates/`.
- **Scroll animations** – sections fade in as you scroll.
- **Contact form** – client‑side validation (ready to connect to a backend).
- **FAQ accordion** – smooth expand/collapse.
- **No external CSS frameworks** – pure custom CSS with CSS variables.

## Tech Stack

- HTML5
- CSS3 (flex, grid, backdrop-filter, custom properties)
- Vanilla JavaScript (ES6)
- Font Awesome Icons

## Project Structure
mena-digital/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── blog.html
├── contact.html
├── post.html
├── assets/
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ ├── menu.js
│ │ └── main.js
│ ├── img/
│ │ ├── logo.png
│ │ └── hero-light.jpg / hero-dark.jpg
│ └── templates/
│ ├── header.html
│ └── footer.html
├── .gitignore
└── README.md
