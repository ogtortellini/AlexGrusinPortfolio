document.addEventListener('DOMContentLoaded', function () {
  // Consider all types of TOC links you might have.
  // If your project pages use different selectors for TOC links (e.g., for a mobile dropdown), add them here.
  // For now, sticking to '.toc-link' as per the current file, but extendable.
  const allTocLinksQuery = '.toc-link, .toc-link-dropdown'; // Updated to include mobile dropdown links
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
    let activeId = null;

    // Filter for entries that are currently intersecting
    const intersectingEntries = entries.filter(entry => entry.isIntersecting);

    if (intersectingEntries.length > 0) {
      // Sort them by their position on the screen (topmost first)
      intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      
      // The "best" entry is the one that is highest on the screen.
      activeId = intersectingEntries[0].target.id;
    }

    // Clear all previous active states
    tocLinks.forEach(link => link.classList.remove('active'));

    if (activeId) {
      // Find all TOC links (could be multiple if you have e.g. desktop and mobile TOCs) that point to this ID
      const currentActiveLinks = tocLinks.filter(link => link.getAttribute('href') === `#${activeId}`);
      
      currentActiveLinks.forEach(currentTocLink => {
        currentTocLink.classList.add('active');

        // Activate all parent TOC links iteratively
        let currentActiveListItem = currentTocLink.closest('li');
        while (currentActiveListItem) {
          const parentList = currentActiveListItem.parentElement; // This is a UL or OL
          // Check if this list is nested within a parent LI
          if (parentList && parentList.parentElement && parentList.parentElement.tagName === 'LI') {
            const grandParentListItem = parentList.parentElement; // This is the LI of the parent TOC item
            
            // Find the link that is a direct child of grandParentListItem and matches our general TOC link selectors
            const parentTocLink = Array.from(grandParentListItem.children).find(child => 
              child.tagName === 'A' && child.matches(allTocLinksQuery)
            );

            if (parentTocLink) {
              parentTocLink.classList.add('active');
              currentActiveListItem = grandParentListItem; // Move up to continue the loop from the grandparent's LI
            } else {
              currentActiveListItem = null; // No matching parent link found, stop iteration
            }
          } else {
            currentActiveListItem = null; // No more parents in the expected <li><ul><li>... structure, stop iteration
          }
        }
      });
    }
  }, {
    // Sticky nav height is assumed to be around 80px.
    // rootMargin: top margin for sticky nav, right, bottom, left.
    // An element is intersecting if it's visible below the sticky nav.
    rootMargin: "-80px 0px 0px 0px", 
    threshold: 0.01 // Trigger if at least 1% of the element is visible in the adjusted viewport
  });

  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
});
