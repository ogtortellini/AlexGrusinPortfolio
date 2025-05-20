document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('main section[id]');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (sections.length === 0 || tocLinks.length === 0) {
    // No TOC elements found, so no need to set up the observer
    return;
  }

  const observer = new IntersectionObserver(entries => {
    let bestCandidateEntry = null;

    // Find the best candidate from the current batch of entries
    entries.forEach(entry => {
      // Condition for a section to be considered for active state:
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        if (!bestCandidateEntry || entry.target.offsetTop < bestCandidateEntry.target.offsetTop) {
          bestCandidateEntry = entry;
        }
      }
    });

    if (bestCandidateEntry) {
      const id = bestCandidateEntry.target.getAttribute('id');
      const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
      
      if (tocLink && !tocLink.classList.contains('active')) { // Only update if not already active
        tocLinks.forEach(link => link.classList.remove('active'));
        tocLink.classList.add('active');
        
        // Optional: If nested, also activate parent
        const parentUl = tocLink.closest('ul');
        if (parentUl && parentUl.previousElementSibling && parentUl.previousElementSibling.matches('a.toc-link')) {
          parentUl.previousElementSibling.classList.add('active');
        }
      }
    }
    // If no bestCandidateEntry was found in this batch (e.g., sections became non-intersecting 
    // or their intersectionRatio dropped below 0.5), the currently active link remains active. 
    // This prevents flickering.
  }, { threshold: 0.5, rootMargin: "0px 0px -50% 0px" }); // Original IntersectionObserver options

  sections.forEach(section => { 
    observer.observe(section); 
  });
});
