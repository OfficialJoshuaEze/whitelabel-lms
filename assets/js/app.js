// White-label LMS - Batch 1 public UI interactions

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCourseFilters();
  initCurriculumAccordion();
  initContactFormDemo();
});

function initMobileMenu() {
  const buttons = document.querySelectorAll('[data-menu-toggle]');
  buttons.forEach((button) => {
    const targetId = button.getAttribute('data-menu-toggle');
    const menu = document.getElementById(targetId);
    if (!menu) return;

    button.addEventListener('click', () => {
      menu.classList.toggle('open');
      const expanded = menu.classList.contains('open');
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}

function initCourseFilters() {
  const grid = document.querySelector('[data-course-grid]');
  if (!grid) return;

  const searchInput = document.querySelector('[data-course-search]');
  const categoryFilter = document.querySelector('[data-category-filter]');
  const levelFilter = document.querySelector('[data-level-filter]');
  const resetButton = document.querySelector('[data-reset-filters]');
  const resultCount = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');
  const cards = Array.from(grid.querySelectorAll('[data-course-card]'));

  function updateCourses() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const category = categoryFilter?.value || 'all';
    const level = levelFilter?.value || 'all';
    let visible = 0;

    cards.forEach((card) => {
      const title = (card.dataset.title || '').toLowerCase();
      const cardCategory = card.dataset.category || '';
      const cardLevel = card.dataset.level || '';

      const matchesSearch = title.includes(query);
      const matchesCategory = category === 'all' || cardCategory === category;
      const matchesLevel = level === 'all' || cardLevel === level;
      const shouldShow = matchesSearch && matchesCategory && matchesLevel;

      card.classList.toggle('hide', !shouldShow);
      if (shouldShow) visible += 1;
    });

    if (resultCount) {
      resultCount.textContent = visible === cards.length
        ? 'Showing all courses'
        : `Showing ${visible} course${visible === 1 ? '' : 's'}`;
    }

    if (emptyState) emptyState.classList.toggle('show', visible === 0);
  }

  searchInput?.addEventListener('input', updateCourses);
  categoryFilter?.addEventListener('change', updateCourses);
  levelFilter?.addEventListener('change', updateCourses);
  resetButton?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (levelFilter) levelFilter.value = 'all';
    updateCourses();
  });

  updateCourses();
}

function initCurriculumAccordion() {
  const items = document.querySelectorAll('[data-curriculum-item]');
  items.forEach((item, index) => {
    const button = item.querySelector('[data-curriculum-toggle]');
    if (!button) return;

    if (index === 0) item.classList.add('open');

    button.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

function initContactFormDemo() {
  const form = document.querySelector('[data-contact-form]');
  const message = document.querySelector('[data-form-message]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) message.classList.add('show');
    form.reset();
  });
}
