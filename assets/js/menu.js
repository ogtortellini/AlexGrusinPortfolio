document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menuLinks = document.getElementById('menu-links');

  if (menuBtn && menuLinks) {
    const mobileMenuLayoutClasses = ['flex-col', 'absolute', 'top-full', 'right-0', 'bg-white', 'shadow-md', 'p-4', 'w-full'];

    menuBtn.addEventListener('click', () => {
      // Toggle visibility by adding/removing 'hidden'
      const isNowHidden = menuLinks.classList.toggle('hidden');

      // Adjust classes based on visibility
      if (!isNowHidden) { // If menu is now visible
        menuLinks.classList.add('flex'); // Ensure it's a flex container for mobile dropdown
        menuLinks.classList.add(...mobileMenuLayoutClasses);
      } else { // If menu is now hidden
        menuLinks.classList.remove('flex'); // Remove mobile-specific flex display
        menuLinks.classList.remove(...mobileMenuLayoutClasses);
      }
    });
  }
});
