document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
  const elementsToObserve = [];

  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      try {
        const id = href.substring(1);
        const targetElement = document.getElementById(id);
        // Ensure the target element exists and is within the main content area (if applicable)
        if (targetElement && targetElement.closest('main')) {
          elementsToObserve.push(targetElement);
        }
      } catch (e) {
        // Catch potential errors if href is not a valid selector, though getElementById is safer.
        console.warn(`Could not find element for TOC link ${href}: ${e.message}`);
      }
    }
  });

  if (elementsToObserve.length === 0 || tocLinks.length === 0) {
    return; // No TOC elements or targets to observe
  }

  const observer = new IntersectionObserver(entries => {
    const intersectingEntries = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5);

    if (intersectingEntries.length === 0) {
      tocLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    let bestEntry = null;

    if (intersectingEntries.length === 1) {
      bestEntry = intersectingEntries[0];
    } else {
      const visibleTargets = intersectingEntries.map(e => e.target);
      
      // Filter to find the "deepest" visible elements:
      // An element is considered "deepest" if it does not contain any other *visible* target.
      const deepestVisibleTargets = visibleTargets.filter(target1 => {
        return !visibleTargets.some(target2 => {
          return target1 !== target2 && target1.contains(target2);
        });
      });

      if (deepestVisibleTargets.length > 0) {
        // From these deepest elements, pick the one highest on the screen.
        deepestVisibleTargets.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const chosenTarget = deepestVisibleTargets[0];
        bestEntry = intersectingEntries.find(entry => entry.target === chosenTarget);
      } else {
        // Fallback: if somehow no "deepest" found (shouldn't happen if intersectingEntries is not empty),
        // pick the highest overall visible element.
        intersectingEntries.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        bestEntry = intersectingEntries[0];
      }
    }

    if (bestEntry) {
      const id = bestEntry.target.getAttribute('id');
      const currentTocLink = document.querySelector(`.toc-link[href="#${id}"]`);

      if (currentTocLink) {
        tocLinks.forEach(link => link.classList.remove('active')); // Clear all active states first
        currentTocLink.classList.add('active');

        // Activate parent TOC link if nested
        let parentTocLink = null;
        const listItem = currentTocLink.closest('li');
        if (listItem && listItem.parentElement) { // Check listItem.parentElement exists
          const parentUlOrOl = listItem.parentElement;
          // Check if this UL/OL is nested within another LI (the parent TOC item's LI)
          if (parentUlOrOl.parentElement && parentUlOrOl.parentElement.tagName === 'LI') {
            const parentLi = parentUlOrOl.parentElement;
            parentTocLink = parentLi.querySelector('a.toc-link');
          }
        }
        
        if (parentTocLink) {
          parentTocLink.classList.add('active');
        }
      }
    } else {
      // If no bestEntry determined (e.g., after filtering), clear all active links.
      tocLinks.forEach(link => link.classList.remove('active'));
    }
  }, {
    threshold: 0.5, // 50% of the element must be visible
    rootMargin: "0px 0px -50% 0px" // Intersection area is the top 50% of the viewport
  });

  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
});
