document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = document.querySelectorAll('.toc-link');
  const elementsToObserve = [];

  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const id = href.substring(1);
      const targetElement = document.getElementById(id);
      // Ensure the target element exists and is within the main content area of the page
      if (targetElement && targetElement.closest('main')) { 
        elementsToObserve.push(targetElement);
      }
    }
  });

  // If no TOC links or corresponding elements to observe are found, exit.
  if (elementsToObserve.length === 0 || tocLinks.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(entries => {
    let bestCandidateEntry = null;

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // Determine the best candidate: the one whose top is highest in the viewport.
        if (!bestCandidateEntry || entry.target.getBoundingClientRect().top < bestCandidateEntry.target.getBoundingClientRect().top) {
          bestCandidateEntry = entry;
        }
      }
    });

    if (bestCandidateEntry) {
      const id = bestCandidateEntry.target.getAttribute('id');
      const currentTocLink = document.querySelector(`.toc-link[href="#${id}"]`);
      
      if (currentTocLink) {
        let parentTocLink = null;
        // Find parent TOC link for nested structures
        const listItem = currentTocLink.closest('li');
        if (listItem) {
            const parentUl = listItem.parentElement; // This is the UL/OL containing the current LI
            if (parentUl) {
                const parentLi = parentUl.closest('li'); // This is the LI that contains parentUl (if nested)
                if (parentLi) {
                    // Find the 'a.toc-link' that is a direct child or main link of parentLi
                    parentTocLink = parentLi.querySelector('a.toc-link'); 
                }
            }
        }
        
        // Update active classes
        tocLinks.forEach(link => link.classList.remove('active')); // Clear all active states
        
        currentTocLink.classList.add('active'); // Activate current link
        if (parentTocLink) {
          parentTocLink.classList.add('active'); // Activate parent link
        }
      }
    }
    // If no bestCandidateEntry, current active links remain.
  }, { 
    threshold: 0.5, // 50% of the element must be visible
    rootMargin: "0px 0px -50% 0px" // Considers top 50% of the viewport for intersection
  });

  elementsToObserve.forEach(element => { 
    observer.observe(element); 
  });
});
