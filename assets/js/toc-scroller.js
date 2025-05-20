document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('main section[id]');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (sections.length === 0 || tocLinks.length === 0) {
    // No TOC elements found, so no need to set up the observer
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
      
      if (tocLink) { // Ensure tocLink exists
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          tocLinks.forEach(link => link.classList.remove('active'));
          tocLink.classList.add('active');
          // Optional: If nested, also activate parent
          const parentUl = tocLink.closest('ul');
          if (parentUl && parentUl.previousElementSibling && parentUl.previousElementSibling.matches('a.toc-link')) {
            parentUl.previousElementSibling.classList.add('active');
          }
        } else {
          // Optional: Remove active class if not intersecting enough or scrolling past
          // tocLink.classList.remove('active');
        }
      }
    });
  }, { threshold: 0.5, rootMargin: "0px 0px -50% 0px" });

  sections.forEach(section => { 
    observer.observe(section); 
  });
});
