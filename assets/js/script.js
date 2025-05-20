document.addEventListener('DOMContentLoaded', function () {
  // --- Configuration for Slideshow ---
  // const slideshowItems = [ ... ]; // This will be replaced

  const slideshowItems = []; // Initialize an empty array

  // Function to generate a URL-friendly ID from text
  function generateId(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove all non-word chars except hyphens
  }

  // Populate slideshowItems from Project cards
  const projectCards = document.querySelectorAll('#projects .bg-white.rounded-xl.shadow-md');
  projectCards.forEach(card => {
    if (card.dataset.hidden === 'true') {
      card.style.display = 'none'; // Hide card from the page
      return; // Skip adding to slideshow
    }
    // New check for slideshow inclusion
    if (card.dataset.slideshowInclude === 'false') {
      return; // Skip adding to slideshow but keep visible on page
    }
    const titleElement = card.querySelector('h4');
    const descriptionElement = card.querySelector('p');
    const imgElement = card.querySelector('img');
    const linkElement = card.querySelector('a'); // The main link for the project

    if (titleElement && descriptionElement && imgElement && linkElement) {
      slideshowItems.push({
        id: generateId(titleElement.textContent.trim()),
        title: titleElement.textContent.trim(),
        description: descriptionElement.textContent.trim(),
        imgSrc: imgElement.getAttribute('src'),
        altText: imgElement.getAttribute('alt'),
        link: linkElement.getAttribute('href'),
        type: 'project'
      });
    }
  });

  // Populate slideshowItems from Experience cards
  const experienceCards = document.querySelectorAll('#experience .bg-white.rounded-xl.shadow-md');
  experienceCards.forEach(card => {
    if (card.dataset.hidden === 'true') {
      card.style.display = 'none'; // Hide card from the page
      return; // Skip adding to slideshow
    }
    // New check for slideshow inclusion
    if (card.dataset.slideshowInclude === 'false') {
      return; // Skip adding to slideshow but keep visible on page
    }
    const titleElement = card.querySelector('h4');
    const descriptionElement = card.querySelector('p');
    const imgElement = card.querySelector('img');
    const linkElement = card.querySelector('a'); // The main link for the experience

    if (titleElement && descriptionElement && imgElement && linkElement) {
      slideshowItems.push({
        id: generateId(titleElement.textContent.trim()),
        title: titleElement.textContent.trim(),
        description: descriptionElement.textContent.trim(),
        imgSrc: imgElement.getAttribute('src'),
        altText: imgElement.getAttribute('alt'),
        link: linkElement.getAttribute('href'),
        type: 'experience'
      });
    }
  });
  // --- End Configuration ---

  const slideshowContainer = document.getElementById('slideshow-container');
  const prevButton = document.getElementById('prev-slide');
  const nextButton = document.getElementById('next-slide');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  
  let slides = [];
  let currentSlide = 0;
  let slideInterval;

  function buildSlides() {
    slideshowContainer.innerHTML = ''; 
    slides = []; 

    slideshowItems.forEach((item, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide'; 
      slideDiv.setAttribute('data-id', item.id);

      slideDiv.innerHTML = `
        <img src="${item.imgSrc}" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="${item.altText}">
        <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-end text-center p-4 pb-12">
          <h3 class="text-3xl font-bold text-white mb-2">${item.title}</h3>
          <p class="text-md text-gray-200 mb-4 max-w-lg">${item.description}</p>
          <a href="${item.link}" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            View ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </a>
        </div>
      `;
      if (idx === 0) {
        slideDiv.style.transform = 'translateX(0%)';
      } else {
        slideDiv.style.transform = 'translateX(100%)'; // Position to the right
      }
      slideshowContainer.appendChild(slideDiv);
      slides.push(slideDiv);
    });
  }

  function updateIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = ''; 
    slides.forEach((slide, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('w-3', 'h-3', 'rounded-full');
      button.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
      button.setAttribute('aria-label', 'Slide ' + (index + 1));
      button.setAttribute('data-carousel-slide-to', index);
      button.style.backgroundColor = index === currentSlide ? '#3B82F6' : '#D1D5DB';
      button.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(button);
    });
  }

  function nextSlideFn() {
    if (slides.length <= 1) return;
    const oldIndex = currentSlide;
    currentSlide = (oldIndex + 1) % slides.length;

    const oldSlide = slides[oldIndex];
    const newSlide = slides[currentSlide];

    // Stage newSlide to the right without animation
    newSlide.style.transition = 'none';
    newSlide.style.transform = 'translateX(100%)';
    void newSlide.offsetWidth; // Force reflow to apply staging position
    newSlide.style.transition = ''; // Re-enable transitions for animation

    // Animate oldSlide out and newSlide in
    oldSlide.style.transform = 'translateX(-100%)';
    newSlide.style.transform = 'translateX(0%)';
    
    updateIndicators();
  }

  function prevSlideFn() {
    if (slides.length <= 1) return;
    const oldIndex = currentSlide;
    currentSlide = (oldIndex - 1 + slides.length) % slides.length;
    
    const oldSlide = slides[oldIndex];
    const newSlide = slides[currentSlide];

    // Stage newSlide to the left without animation
    newSlide.style.transition = 'none';
    newSlide.style.transform = 'translateX(-100%)';
    void newSlide.offsetWidth; // Force reflow to apply staging position
    newSlide.style.transition = ''; // Re-enable transitions for animation

    // Animate oldSlide out and newSlide in
    oldSlide.style.transform = 'translateX(100%)';
    newSlide.style.transform = 'translateX(0%)';

    updateIndicators();
  }
  
  function goToSlide(index) {
    if (slides.length <= 1 || index === currentSlide) return;
    
    const oldIndex = currentSlide;
    const newIndex = index;

    const oldSlide = slides[oldIndex];
    const newSlide = slides[newIndex];

    let directionIsForward = newIndex > oldIndex;
    // Handle wrap-around cases for determining direction
    if (slides.length > 1) { 
      if (oldIndex === slides.length - 1 && newIndex === 0) directionIsForward = true; 
      if (oldIndex === 0 && newIndex === slides.length - 1) directionIsForward = false;
    }

    // Stage newSlide without animation
    newSlide.style.transition = 'none';
    if (directionIsForward) {
      newSlide.style.transform = 'translateX(100%)'; 
    } else {
      newSlide.style.transform = 'translateX(-100%)'; 
    }
    void newSlide.offsetWidth; // Force reflow to apply staging position
    newSlide.style.transition = ''; // Re-enable transitions for animation
    
    // Animate oldSlide out and newSlide in
    if (directionIsForward) {
      oldSlide.style.transform = 'translateX(-100%)'; 
    } else {
      oldSlide.style.transform = 'translateX(100%)'; 
    }
    newSlide.style.transform = 'translateX(0%)'; 
    
    currentSlide = newIndex;
    updateIndicators();
    resetInterval();
  }

  function startInterval() {
    if (slides.length <= 1) return; // Don't start interval if 1 or no slides
    clearInterval(slideInterval); 
    slideInterval = setInterval(nextSlideFn, 4000); 
  }

  function resetInterval() {
    if (slides.length <= 1) return;
    clearInterval(slideInterval);
    startInterval();
  }
  
  // Initialization
  buildSlides(); 

  if (slides.length > 0) {
    updateIndicators(); // Update indicators for the initial slide
    startInterval(); 

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        prevSlideFn();
        resetInterval();
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        nextSlideFn();
        resetInterval();
      });
    }
  } else {
    if(indicatorsContainer) indicatorsContainer.innerHTML = '';
    if(prevButton) prevButton.style.display = 'none';
    if(nextButton) nextButton.style.display = 'none';
  }
});
