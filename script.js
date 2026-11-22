const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const navigationLinks = navigation ? navigation.querySelectorAll('a') : [];

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  if (restoreFocus) menuToggle.focus();
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener('click', () => closeMenu({ restoreFocus: true })));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) closeMenu();
  });
}

const sectionNavigationLinks = [...document.querySelectorAll('.nav-link')];
const sectionNavigationTargets = [...document.querySelectorAll('#collections, #selected-works, #about, #contact')];
function updateActiveSection(targetHref) {
  sectionNavigationLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === targetHref;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else if (link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
  });
}
const sectionObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  updateActiveSection(`#${visible.target.id}`);
}, { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }) : null;
sectionNavigationTargets.forEach((section) => sectionObserver?.observe(section));
sectionNavigationLinks.forEach((link) => link.addEventListener('click', () => {
  const href = link.getAttribute('href');
  if (href?.startsWith('#')) updateActiveSection(href);
}));

const artworkData = [
  { image: 'assets/artwork/portraits-and-faces/01-graphite-portrait-study.jpg', title: 'Portrait Study', medium: 'Graphite on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/portraits-and-faces/02-color-smiling-portrait.jpg', title: 'Smiling Portrait', medium: 'Color drawing', category: 'Portraits & Faces' },
  { image: 'assets/artwork/portraits-and-faces/03-graphite-portrait-with-glasses.jpg', title: 'Portrait with Glasses', medium: 'Graphite on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/studies-and-sketches/04-child-archer-study.jpg', title: 'Child Archer Study', medium: 'Graphite on paper', category: 'Studies & Sketches' },
  { image: 'assets/artwork/color-and-traditional-art/05-meditating-figure.jpg', title: 'Meditating Figure', medium: 'Color painting', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/color-and-traditional-art/06-durga-color-painting.jpg', title: 'Durga', medium: 'Color painting', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/color-and-traditional-art/07-ganesha-warm-palette.jpg', title: 'Ganesha in Warm Tones', medium: 'Color painting', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/color-and-traditional-art/08-child-krishna-color-painting.jpg', title: 'Child Krishna', medium: 'Color drawing', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/color-and-traditional-art/09-shiva-blue-painting.jpg', title: 'Shiva in Blue', medium: 'Color drawing', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/portraits-and-faces/10-portrait-in-a-hat.jpg', title: 'Portrait in a Hat', medium: 'Color drawing', category: 'Portraits & Faces' },
  { image: 'assets/artwork/portraits-and-faces/11-blue-profile-study.jpg', title: 'Blue Profile Study', medium: 'Color painting', category: 'Portraits & Faces' },
  { image: 'assets/artwork/color-and-traditional-art/12-child-ganesha-dark-background.jpg', title: 'Child Ganesha', medium: 'Color painting', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/portraits-and-faces/13-bearded-portrait-with-sunglasses.jpg', title: 'Bearded Portrait with Sunglasses', medium: 'Ink and colored pen on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/studies-and-sketches/14-eye-expression-study.jpg', title: 'Eye Expression Study', medium: 'Graphite on paper', category: 'Studies & Sketches' },
  { image: 'assets/artwork/portraits-and-faces/15-charcoal-profile-with-pipe.jpg', title: 'Charcoal Profile with Pipe', medium: 'Charcoal on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/color-and-traditional-art/16-blue-bull-and-figure.jpg', title: 'Blue Bull and Figure', medium: 'Color painting', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/portraits-and-faces/17-expressive-portrait-study.jpg', title: 'Expressive Portrait Study', medium: 'Ink and colored pen on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/studies-and-sketches/18-blue-and-gold-abstract-study.jpg', title: 'Blue and Gold Abstract Study', medium: 'Color drawing', category: 'Studies & Sketches' },
  { image: 'assets/artwork/portraits-and-faces/19-michael-jackson-portrait-study.jpg', title: 'Michael Jackson Portrait Study', medium: 'Graphite on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/studies-and-sketches/20-rider-in-motion.jpg', title: 'Rider in Motion', medium: 'Charcoal on paper', category: 'Studies & Sketches' },
  { image: 'assets/artwork/color-and-traditional-art/21-hanuman-portrait-warm-background.jpg', title: 'Hanuman Portrait in Warm Tones', medium: 'Graphite and colored accents on paper', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/portraits-and-faces/22-portrait-with-number-seven-motif.jpg', title: 'Portrait with Number Seven Motif', medium: 'Color drawing on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/portraits-and-faces/23-bearded-side-profile-study.jpg', title: 'Bearded Side Profile Study', medium: 'Graphite on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/portraits-and-faces/24-portrait-study-orange-ground.jpg', title: 'Portrait Study on an Orange Ground', medium: 'Graphite and colored pencil on paper', category: 'Portraits & Faces' },
  { image: 'assets/artwork/color-and-traditional-art/25-tricolor-face-study.jpg', title: 'Tricolor Face Study', medium: 'Color drawing', category: 'Color & Traditional Art' },
  { image: 'assets/artwork/character-art/26-spider-mask-character-study.jpg', title: 'Spider-Man Mask and Emblem Study', medium: 'Colored pencil on paper', category: 'Character Art' },
];

const artworkGrid = document.querySelector('[data-artwork-grid]');
const filterButtons = document.querySelectorAll('[data-filter]');
const artworkStatus = document.querySelector('[data-artwork-status]');
let activeFilter = 'all';
let visibleArtworkIndices = artworkData.map((_, index) => index);

function getFilteredArtworkIndices(filter) {
  return artworkData.reduce((indices, artwork, index) => {
    if (filter === 'all' || artwork.category === filter) indices.push(index);
    return indices;
  }, []);
}

function createArtworkCard(artwork, index) {
  const card = document.createElement('article');
  card.className = 'artwork-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.dataset.artworkTrigger = String(index);
  card.dataset.category = artwork.category;
  card.setAttribute('aria-label', `Open ${artwork.title} in artwork viewer`);

  const imageArea = document.createElement('div');
  imageArea.className = 'artwork-placeholder has-image';
  const image = document.createElement('img');
  image.className = 'artwork-card-image';
  image.src = artwork.image;
  image.alt = artwork.title;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    image.hidden = true;
    imageArea.classList.remove('has-image');
    imageArea.classList.add('is-fallback');
    const fallback = document.createElement('span');
    fallback.className = 'artwork-fallback';
    fallback.textContent = `${artwork.title} image unavailable`;
    imageArea.append(fallback);
  }, { once: true });
  imageArea.append(image);

  const metadata = document.createElement('div');
  metadata.className = 'artwork-card-meta';
  const title = document.createElement('h3');
  title.className = 'artwork-card-title';
  title.textContent = artwork.title;
  metadata.append(title);

  const medium = document.createElement('p');
  medium.className = 'artwork-card-medium';
  medium.textContent = artwork.medium;

  card.append(imageArea, metadata, medium);
  return card;
}

function renderArtworkGrid(filter = activeFilter) {
  if (!artworkGrid) return;
  activeFilter = filter;
  visibleArtworkIndices = getFilteredArtworkIndices(filter);
  artworkGrid.replaceChildren(...visibleArtworkIndices.map((index) => createArtworkCard(artworkData[index], index)));
  if (artworkStatus) {
    const label = filter === 'all' ? 'all categories' : filter;
    artworkStatus.textContent = `Showing ${visibleArtworkIndices.length} ${visibleArtworkIndices.length === 1 ? 'work' : 'works'} from ${label}.`;
  }
}

const collectionGrid = document.querySelector('[data-collection-grid]');
const curatedGrid = document.querySelector('[data-curated-grid]');
const categoryOrder = ['Portraits & Faces', 'Color & Traditional Art', 'Studies & Sketches', 'Character Art'];
const categoryRepresentatives = {
  'Portraits & Faces': 0,
  'Color & Traditional Art': 4,
  'Studies & Sketches': 3,
  'Character Art': 25,
};

function setActiveFilter(filter, shouldScroll = false) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderArtworkGrid(filter);
  bindArtworkTriggers();
  if (shouldScroll) {
    document.querySelector('#works')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    document.querySelector(`[data-filter="${CSS.escape(filter)}"]`)?.focus({ preventScroll: true });
  }
}

function renderCollectionGrid() {
  if (!collectionGrid) return;
  categoryOrder.forEach((category) => {
    const index = categoryRepresentatives[category];
    const artwork = artworkData[index];
    const count = artworkData.filter((item) => item.category === category).length;
    const card = document.createElement('button');
    card.className = 'collection-card';
    card.type = 'button';
    card.dataset.collectionFilter = category;
    card.setAttribute('aria-label', `Explore ${category}, ${count} works`);
    card.innerHTML = `<span class="collection-card-image"><img src="${artwork.image}" alt="${artwork.title}" loading="lazy"></span><span class="collection-card-content"><span class="collection-card-count">${String(count).padStart(2, '0')} ${count === 1 ? 'work' : 'works'}</span><strong>${category}</strong><span class="collection-card-link">Explore collection <span aria-hidden="true">↗</span></span></span>`;
    card.addEventListener('click', () => setActiveFilter(category, true));
    collectionGrid.append(card);
  });
}

function renderCuratedGrid() {
  if (!curatedGrid) return;
  const curatedIndices = [0, 4, 5, 13, 20, 25];
  curatedGrid.replaceChildren(...curatedIndices.map((index) => createArtworkCard(artworkData[index], index)));
}

renderCollectionGrid();
renderCuratedGrid();

let bindArtworkTriggers = () => {};

const heroCarousel = document.querySelector('[data-hero-carousel]');
const carouselStage = document.querySelector('[data-carousel-stage]');
const carouselIndicators = document.querySelector('[data-carousel-indicators]');
const featuredTitle = document.querySelector('[data-featured-title]');
const featuredMedium = document.querySelector('[data-featured-medium]');
const heroSlideIndices = [0, 4, 25];
let activeHeroSlide = 0;
let heroTimer = null;

function renderHeroCarousel() {
  if (!carouselStage || !carouselIndicators) return;
  carouselStage.replaceChildren();
  carouselIndicators.replaceChildren();
  heroSlideIndices.forEach((artworkIndex, slideIndex) => {
    const artwork = artworkData[artworkIndex];
    const slide = document.createElement('button');
    slide.className = `carousel-slide${slideIndex === activeHeroSlide ? ' is-active' : ''}`;
    slide.type = 'button';
    slide.dataset.artworkTrigger = String(artworkIndex);
    slide.setAttribute('aria-label', `Open ${artwork.title} in artwork viewer`);
    slide.setAttribute('aria-hidden', String(slideIndex !== activeHeroSlide));
    slide.tabIndex = slideIndex === activeHeroSlide ? 0 : -1;
    const image = document.createElement('img');
    image.src = artwork.image;
    image.alt = artwork.title;
    image.loading = slideIndex === 0 ? 'eager' : 'lazy';
    slide.append(image);
    carouselStage.append(slide);

    const indicator = document.createElement('button');
    indicator.className = `carousel-indicator${slideIndex === activeHeroSlide ? ' is-active' : ''}`;
    indicator.type = 'button';
    indicator.setAttribute('aria-label', `Show featured artwork ${slideIndex + 1}: ${artwork.title}`);
    indicator.setAttribute('aria-pressed', String(slideIndex === activeHeroSlide));
    indicator.setAttribute('aria-current', String(slideIndex === activeHeroSlide));
    indicator.addEventListener('click', () => setHeroSlide(slideIndex));
    carouselIndicators.append(indicator);
  });
  const artwork = artworkData[heroSlideIndices[activeHeroSlide]];
  if (featuredTitle) featuredTitle.textContent = artwork.title;
  if (featuredMedium) featuredMedium.textContent = artwork.medium;
  bindArtworkTriggers();
}

function setHeroSlide(slideIndex) {
  activeHeroSlide = (slideIndex + heroSlideIndices.length) % heroSlideIndices.length;
  renderHeroCarousel();
}

function stopHeroTimer() {
  if (heroTimer) window.clearInterval(heroTimer);
  heroTimer = null;
}

function startHeroTimer() {
  if (!heroCarousel || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) return;
  stopHeroTimer();
  heroTimer = window.setInterval(() => setHeroSlide(activeHeroSlide + 1), 7000);
}

renderHeroCarousel();

if (heroCarousel) {
  heroCarousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => { setHeroSlide(activeHeroSlide - 1); startHeroTimer(); });
  heroCarousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => { setHeroSlide(activeHeroSlide + 1); startHeroTimer(); });
  heroCarousel.addEventListener('mouseenter', stopHeroTimer);
  heroCarousel.addEventListener('mouseleave', startHeroTimer);
  heroCarousel.addEventListener('focusin', stopHeroTimer);
  heroCarousel.addEventListener('focusout', (event) => { if (!heroCarousel.contains(event.relatedTarget)) startHeroTimer(); });
  let touchStartX = 0;
  heroCarousel.addEventListener('pointerdown', (event) => { touchStartX = event.clientX; });
  heroCarousel.addEventListener('pointerup', (event) => {
    const delta = event.clientX - touchStartX;
    if (Math.abs(delta) > 42) setHeroSlide(activeHeroSlide + (delta < 0 ? 1 : -1));
  });
  startHeroTimer();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopHeroTimer();
  else startHeroTimer();
});

const welcomeOverlay = document.querySelector('#welcome-overlay');

if (welcomeOverlay) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('intro-active');
  let welcomeFinished = false;

  const finishWelcome = () => {
    if (welcomeFinished) return;
    welcomeFinished = true;
    welcomeOverlay.setAttribute('aria-hidden', 'true');
    welcomeOverlay.classList.add('is-complete');
    window.setTimeout(() => {
      document.body.classList.remove('intro-active');
    }, reducedMotion ? 40 : 900);
  };

  window.setTimeout(finishWelcome, reducedMotion ? 80 : 4100);
}

const artworkItems = artworkData;
const lightbox = document.querySelector('#artwork-lightbox');
const lightboxDialog = lightbox?.querySelector('.lightbox-dialog');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const lightboxPrevious = lightbox?.querySelector('[data-lightbox-prev]');
const lightboxNext = lightbox?.querySelector('[data-lightbox-next]');
const lightboxImage = lightbox?.querySelector('.lightbox-image');
const lightboxPlaceholder = lightbox?.querySelector('.lightbox-artwork-placeholder');
const lightboxTitle = lightbox?.querySelector('#lightbox-title');
const lightboxDetails = lightbox?.querySelector('#lightbox-details');
const lightboxCount = lightbox?.querySelector('.lightbox-count');
let activeArtworkPosition = 0;
let lightboxIndices = artworkData.map((_, index) => index);
let previousFocus = null;

function renderLightboxArtwork(position) {
  activeArtworkPosition = (position + lightboxIndices.length) % lightboxIndices.length;
  const artworkIndex = lightboxIndices[activeArtworkPosition];
  const artwork = artworkItems[artworkIndex];
  const hasImage = Boolean(artwork.image);

  lightboxTitle.textContent = artwork.title;
  lightboxDetails.textContent = [artwork.medium, artwork.year].filter(Boolean).join(' · ');
  lightboxCount.textContent = `${String(activeArtworkPosition + 1).padStart(2, '0')} / ${String(lightboxIndices.length).padStart(2, '0')}`;
  lightboxPlaceholder.hidden = hasImage;
  lightboxPlaceholder.textContent = hasImage ? '' : 'Artwork placeholder';
  lightboxPlaceholder.setAttribute('aria-label', `${artwork.title} — artwork placeholder`);
  lightboxImage.hidden = !hasImage;

  if (hasImage) {
    lightboxImage.src = artwork.image;
    lightboxImage.alt = artwork.title;
    lightboxImage.decoding = 'async';
    lightboxImage.onerror = () => {
      lightboxImage.hidden = true;
      lightboxPlaceholder.hidden = false;
      lightboxPlaceholder.textContent = `${artwork.title} image unavailable`;
      lightboxPlaceholder.setAttribute('aria-label', `${artwork.title} image unavailable`);
    };
  } else {
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
  }
}

function openLightbox(index, trigger, sequence = visibleArtworkIndices) {
  if (!lightbox) return;
  previousFocus = trigger || document.activeElement;
  lightboxIndices = sequence.includes(index) ? sequence : [index, ...sequence];
  renderLightboxArtwork(lightboxIndices.indexOf(index));
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
}

if (lightbox) {
  bindArtworkTriggers = () => {
    document.querySelectorAll('[data-artwork-trigger]').forEach((trigger) => {
      const openFromTrigger = () => openLightbox(Number(trigger.dataset.artworkTrigger), trigger);
      trigger.onclick = openFromTrigger;
      trigger.onkeydown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openFromTrigger();
        }
      };
    });
  };

  renderArtworkGrid();
  bindArtworkTriggers();

  lightbox.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.matches('[data-lightbox-close]')) closeLightbox();
  });
  lightboxPrevious.addEventListener('click', () => renderLightboxArtwork(activeArtworkPosition - 1));
  lightboxNext.addEventListener('click', () => renderLightboxArtwork(activeArtworkPosition + 1));

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') renderLightboxArtwork(activeArtworkPosition - 1);
    if (event.key === 'ArrowRight') renderLightboxArtwork(activeArtworkPosition + 1);
    if (event.key === 'Tab') {
      const focusable = [lightboxClose, lightboxPrevious, lightboxNext];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveFilter(button.dataset.filter));
});

const cursorFollower = document.querySelector('.cursor-follower');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cursorFollower && hasFinePointer && !prefersReducedMotion) {
  let pointerX = -100;
  let pointerY = -100;
  let cursorX = pointerX;
  let cursorY = pointerY;
  let cursorFrame = null;

  const moveCursor = () => {
    cursorX += (pointerX - cursorX) * 0.18;
    cursorY += (pointerY - cursorY) * 0.18;
    cursorFollower.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorFrame = window.requestAnimationFrame(moveCursor);
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorFollower.classList.add('is-visible');
    const target = event.target instanceof Element ? event.target.closest('a, button, [role="button"]') : null;
    cursorFollower.classList.toggle('is-hovering', Boolean(target));
  }, { passive: true });
  window.addEventListener('pointerleave', () => cursorFollower.classList.remove('is-visible'));
  cursorFrame = window.requestAnimationFrame(moveCursor);
}
