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

  // Desktop TOC scrollspy (existing functionality, can be kept separate or integrated if preferred)
  const sections = document.querySelectorAll('main section[id]');
  const tocLinksDesktop = document.querySelectorAll('#tableOfContentsAside a.toc-link');

  function activateTocLink() {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      // Check if section is in viewport, considering a small offset for the sticky nav
      if (pageYOffset >= (sectionTop - sectionHeight / 3 - 70)) { // Adjusted offset for nav
        currentSectionId = section.getAttribute('id');
      }
    });

    tocLinksDesktop.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  if (sections.length && tocLinksDesktop.length) {
    window.addEventListener('scroll', activateTocLink);
    activateTocLink(); // Initial call to set active link on page load
  }
});
