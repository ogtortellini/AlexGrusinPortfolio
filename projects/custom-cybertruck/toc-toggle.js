\
document.addEventListener('DOMContentLoaded', function () {
  const tocToggleButton = document.getElementById('tocToggleButton');
  const tableOfContentsAside = document.getElementById('tableOfContentsAside');

  if (tocToggleButton && tableOfContentsAside) {
    tocToggleButton.addEventListener('click', function () {
      tableOfContentsAside.classList.toggle('hidden');
      // Optional: Change button icon based on state (e.g., hamburger to X)
      // This requires a bit more SVG or icon font handling
    });
  }
});
