document.addEventListener('DOMContentLoaded', function () {
  const tocToggleButton = document.getElementById('tocToggleButton');
  const tableOfContentsAside = document.getElementById('tableOfContentsAside');
  const mainContent = document.querySelector('main'); // Or a more specific selector for your main content area

  if (tocToggleButton && tableOfContentsAside) {
    tocToggleButton.addEventListener('click', function () {
      tableOfContentsAside.classList.toggle('translate-x-full');
      // Optional: Add a class to the main content to dim it or prevent interaction when TOC is open
      if (!tableOfContentsAside.classList.contains('translate-x-full')) {
        // TOC is open
        mainContent.classList.add('opacity-50', 'pointer-events-none'); // Example classes
      } else {
        // TOC is closed
        mainContent.classList.remove('opacity-50', 'pointer-events-none');
      }
    });

    // Optional: Close TOC when clicking outside of it (on the dimmed main content)
    mainContent.addEventListener('click', function() {
      if (!tableOfContentsAside.classList.contains('translate-x-full')) {
        tableOfContentsAside.classList.add('translate-x-full');
        mainContent.classList.remove('opacity-50', 'pointer-events-none');
      }
    });
  }
});
