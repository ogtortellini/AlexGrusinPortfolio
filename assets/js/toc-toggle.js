document.addEventListener('DOMContentLoaded', function () {
  const tocToggleButton = document.getElementById('tocToggleButton');
  const tableOfContentsAside = document.getElementById('tableOfContentsAside');
  const mainContent = document.querySelector('main'); // Keep for later reference

  if (tocToggleButton && tableOfContentsAside) {
    tocToggleButton.addEventListener('click', function () {
      // Only toggle the TOC's visibility by adjusting its translation
      tableOfContentsAside.classList.toggle('translate-x-full');

      // The following lines that modify mainContent are temporarily commented out for diagnosis:
      // const isTocOpen = !tableOfContentsAside.classList.contains('translate-x-full');
      // if (isTocOpen) {
      //   if(mainContent) mainContent.classList.add('opacity-50', 'pointer-events-none');
      // } else {
      //   if(mainContent) mainContent.classList.remove('opacity-50', 'pointer-events-none');
      // }
    });

    // The click listener on mainContent to close the TOC is also temporarily simplified/commented out:
    // if (mainContent) {
    //   mainContent.addEventListener('click', function() {
    //     if (!tableOfContentsAside.classList.contains('translate-x-full')) { // If TOC is open
    //       tableOfContentsAside.classList.add('translate-x-full'); // Close TOC
    //       // if(mainContent) mainContent.classList.remove('opacity-50', 'pointer-events-none'); // Remove dim
    //     }
    //   });
    // }
  }
});
