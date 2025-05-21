document.addEventListener('DOMContentLoaded', function () {
  // Consider all types of TOC links you might have.
  // If your project pages use different selectors for TOC links (e.g., for a mobile dropdown), add them here.
  // For now, sticking to '.toc-link' as per the current file, but extendable.
  const allTocLinksQuery = '.toc-link'; // General selector for TOC links
  // If you have specific selectors for different TOCs (e.g., main page vs. project page sidebars)
  // you might use: '#tableOfContentsAside .toc-link, #tocDropdownMenu .toc-link-dropdown, .navbar .toc-link'
  // For the current index.html, '.toc-link' targets the main navbar links.

  const tocLinks = Array.from(document.querySelectorAll(allTocLinksQuery));
  const elementsToObserve = [];

  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      try {
        const id = href.substring(1);
        const targetElement = document.getElementById(id);
        // Ensure the target element exists and is within the main content area (if applicable)
        // For index.html, sections are direct children of <main>
        if (targetElement && targetElement.closest('main')) {
          elementsToObserve.push(targetElement);
        }
      } catch (e) {
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
      // No section is prominently visible, clear all active states
      tocLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    let bestEntry = null;

    if (intersectingEntries.length === 1) {
      bestEntry = intersectingEntries[0];
    } else {
      // Multiple sections are visible, determine the "best" one.
      const visibleTargets = intersectingEntries.map(e => e.target);
      
      // Prioritize "deepest" visible elements that don't contain other visible targets.
      const deepestVisibleTargets = visibleTargets.filter(target1 => {
        return !visibleTargets.some(target2 => {
          return target1 !== target2 && target1.contains(target2);
        });
      });

      if (deepestVisibleTargets.length > 0) {
        // From these deepest elements, pick the one highest on the screen.
        deepestVisibleTargets.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        bestEntry = intersectingEntries.find(entry => entry.target === deepestVisibleTargets[0]);
      } else {
        // Fallback: if no "deepest" found, pick the highest overall visible element.
        intersectingEntries.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        bestEntry = intersectingEntries[0];
      }
    }

    if (bestEntry) {
      const id = bestEntry.target.getAttribute('id');
      
      // Clear all previous active states from all TOC links
      tocLinks.forEach(link => link.classList.remove('active'));

      // Find all TOC links (could be multiple if you have e.g. desktop and mobile TOCs) that point to this ID
      const currentActiveLinks = tocLinks.filter(link => link.getAttribute('href') === `#${id}`);
      
      currentActiveLinks.forEach(currentTocLink => {
        currentTocLink.classList.add('active');

        // Activate parent TOC link if nested
        // This logic assumes a structure like: <li><a class="toc-link">Parent</a><ul><li><a class="toc-link">Child</a></li></ul></li>
        let parentTocLink = null;
        const listItem = currentTocLink.closest('li'); // li containing the current link

        if (listItem && listItem.parentElement) {
          const parentUlOrOl = listItem.parentElement; // ul/ol containing this li
          
          // Check if this ul/ol is a child of another li (the parent TOC item's li)
          if (parentUlOrOl.parentElement && parentUlOrOl.parentElement.tagName === 'LI') {
            const parentLi = parentUlOrOl.parentElement; // The li of the parent TOC item
            // Find the link within this parentLi. It should also have the 'toc-link' class (or your general selector).
            parentTocLink = parentLi.querySelector(':scope > ' + allTocLinksQuery);
          }
        }
        
        if (parentTocLink) {
          parentTocLink.classList.add('active');
        }
      });
    } else {
      // Fallback if no bestEntry determined, clear all active links.
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
