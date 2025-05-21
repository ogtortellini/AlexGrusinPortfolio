document.addEventListener('DOMContentLoaded', function () {
  const tocToggleButton = document.getElementById('tocToggleButton');
  const tocDropdownMenu = document.getElementById('tocDropdownMenu');
  // const tableOfContentsAside = document.getElementById('tableOfContentsAside'); // Keep for desktop, not directly managed by this button anymore
  // const mainContent = document.querySelector('main'); // Not needed for dropdown logic

  if (tocToggleButton && tocDropdownMenu) {
    tocToggleButton.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent click from bubbling up
      tocDropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown when a link inside it is clicked
    const tocLinksDropdown = tocDropdownMenu.querySelectorAll('a.toc-link-dropdown');
    tocLinksDropdown.forEach(link => {
      link.addEventListener('click', function() {
        tocDropdownMenu.classList.add('hidden');
      });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function(event) {
      if (!tocDropdownMenu.classList.contains('hidden') && !tocToggleButton.contains(event.target) && !tocDropdownMenu.contains(event.target)) {
        tocDropdownMenu.classList.add('hidden');
      }
    });

  } else {
    console.error('TOC toggle button or dropdown menu element not found.');
  }

  // Desktop TOC scrollspy functionality has been removed as toc-scroller.js now handles this.
});
