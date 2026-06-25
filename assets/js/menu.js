// Set theme immediately (before DOM loads)
(function () {
    const storageKey = 'mena-theme';
    let theme = localStorage.getItem(storageKey);
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        localStorage.setItem(storageKey, theme);
    }
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    // Load header
    fetch('/assets/templates/header.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initMenuInteractions();
            setActiveNavLink();
        })
        .catch(err => console.error('Header load error:', err));

    // Load footer
    fetch('/assets/templates/footer.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(err => console.error('Footer load error:', err));

    function initMenuInteractions() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');

        const updateIcons = (isDark) => {
            const sunIcons = document.querySelectorAll('#sunIcon, #mobileSunIcon');
            const moonIcons = document.querySelectorAll('#moonIcon, #mobileMoonIcon');
            sunIcons.forEach(icon => icon.style.display = isDark ? 'none' : 'inline-block');
            moonIcons.forEach(icon => icon.style.display = isDark ? 'inline-block' : 'none');
        };

        const setTheme = (isDark) => {
            if (isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('mena-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('mena-theme', 'light');
            }
            // ===== FIX: Force repaint on next frame to prevent "stuck" icons on mobile =====
            requestAnimationFrame(() => {
                updateIcons(isDark);
            });
        };

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                setTheme(!document.documentElement.classList.contains('dark'));
            });
        }
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                setTheme(!document.documentElement.classList.contains('dark'));
            });
        }

        // Initial icon state (also wrapped to be safe)
        requestAnimationFrame(() => {
            updateIcons(document.documentElement.classList.contains('dark'));
        });

        // Mobile menu toggle
        const mobileBtn = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('show');
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.remove('show'));
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (e) {
                if (mobileMenu.classList.contains('show')) {
                    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                        mobileMenu.classList.remove('show');
                    }
                }
            });

            // Close menu on Escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                }
            });
        }
    }

    function setActiveNavLink() {
        const current = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
        document.querySelectorAll('.nav-link').forEach(link => {
            let href = link.getAttribute('href');
            href = href.replace(/\/index\.html$/, '/').replace(/\/$/, '');
            if (href === '') href = '/';
            const isActive = (href === current) ||
                (href === '/' && current === '') ||
                (href === current + '/');
            link.classList.toggle('active-nav-link', isActive);
        });
    }
});