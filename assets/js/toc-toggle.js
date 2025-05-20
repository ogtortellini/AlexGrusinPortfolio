document.addEventListener('DOMContentLoaded', function () {
  const tocToggleButton = document.getElementById('tocToggleButton');
  const tableOfContentsAside = document.getElementById('tableOfContentsAside');
  const mainContent = document.querySelector('main');

  if (tocToggleButton && tableOfContentsAside) {
    tocToggleButton.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent click from bubbling up, just in case
      tableOfContentsAside.classList.toggle('translate-x-full');

      const isTocOpen = !tableOfContentsAside.classList.contains('translate-x-full');

      if (mainContent) {
        if (isTocOpen) {
          mainContent.classList.add('opacity-50', 'pointer-events-none');
        } else {
          mainContent.classList.remove('opacity-50', 'pointer-events-none');
        }
      }
    });

    if (mainContent) {
      mainContent.addEventListener('click', function() {
        // If TOC is open and user clicks on main content, close TOC
        if (!tableOfContentsAside.classList.contains('translate-x-full')) {
          tableOfContentsAside.classList.add('translate-x-full'); // Close TOC
          mainContent.classList.remove('opacity-50', 'pointer-events-none'); // Undim main content
        }
      });
    }

    // Close TOC on mobile when a TOC link is clicked
    const tocLinks = tableOfContentsAside.querySelectorAll('a.toc-link');
    tocLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Check if on mobile view (mimicking Tailwind's lg breakpoint) and TOC is open
        if (window.innerWidth < 1024 && !tableOfContentsAside.classList.contains('translate-x-full')) {
          tableOfContentsAside.classList.add('translate-x-full'); // Close TOC
          if (mainContent) {
            mainContent.classList.remove('opacity-50', 'pointer-events-none'); // Undim main content
          }
        }
      });
    });

  } else {
    console.error('TOC toggle button or aside element not found.');
  }
});
