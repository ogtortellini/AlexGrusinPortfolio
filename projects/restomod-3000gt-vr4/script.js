const sections = document.querySelectorAll('main section[id]');
const tocLinks = document.querySelectorAll('.toc-link');
const tocMenuButton = document.getElementById('toc-menu-button');
const tocMobileMenu = document.getElementById('toc-mobile-menu');

// Toggle mobile TOC menu
if (tocMenuButton && tocMobileMenu) {
  tocMenuButton.addEventListener('click', () => {
    tocMobileMenu.classList.toggle('hidden');
    const isExpanded = tocMenuButton.getAttribute('aria-expanded') === 'true' || false;
    tocMenuButton.setAttribute('aria-expanded', !isExpanded);
  });
}

// Intersection Observer for highlighting active TOC link
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    // Query within all toc links containers
    const correspondingLinks = document.querySelectorAll(`.toc-links-container .toc-link[href="#${id}"]`);
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      tocLinks.forEach(link => link.classList.remove('active'));
      correspondingLinks.forEach(link => {
        if (link) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5, rootMargin: "0px 0px -50% 0px" });

sections.forEach(section => {
  observer.observe(section);
});

// Close mobile TOC if a link is clicked
if (tocMobileMenu) {
  tocMobileMenu.querySelectorAll('a.toc-link').forEach(link => {
    link.addEventListener('click', () => {
      tocMobileMenu.classList.add('hidden');
      if (tocMenuButton) {
        tocMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
