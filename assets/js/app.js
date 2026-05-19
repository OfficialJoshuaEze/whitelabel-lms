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

// Batch 2 auth UI interactions

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initPasswordStrength();
  initAuthFormDemo();
  initVerificationInputs();
});

function initPasswordToggles() {
  const toggles = document.querySelectorAll('[data-password-toggle]');
  toggles.forEach((toggle) => {
    const inputId = toggle.getAttribute('data-password-toggle');
    const input = document.getElementById(inputId);
    if (!input) return;

    toggle.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.textContent = isPassword ? 'Hide' : 'Show';
    });
  });
}

function initPasswordStrength() {
  const inputs = document.querySelectorAll('[data-password-strength-input]');
  inputs.forEach((input) => {
    const targetId = input.getAttribute('data-password-strength-input');
    const target = document.getElementById(targetId);
    if (!target) return;

    const label = target.querySelector('[data-strength-text]');

    input.addEventListener('input', () => {
      const value = input.value;
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;

      target.classList.toggle('show', value.length > 0);
      target.dataset.strength = String(score);

      const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
      if (label) label.textContent = labels[score];
    });
  });
}

function initAuthFormDemo() {
  const forms = document.querySelectorAll('[data-auth-form]');
  forms.forEach((form) => {
    const message = form.querySelector('[data-auth-message]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (message) message.classList.add('show');
    });
  });
}

function initVerificationInputs() {
  const groups = document.querySelectorAll('[data-verify-code]');
  groups.forEach((group) => {
    const inputs = Array.from(group.querySelectorAll('input'));

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
        if (input.value && inputs[index + 1]) inputs[index + 1].focus();
      });

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !input.value && inputs[index - 1]) {
          inputs[index - 1].focus();
        }
      });

      input.addEventListener('paste', (event) => {
        event.preventDefault();
        const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '').slice(0, inputs.length);
        pasted.split('').forEach((char, pastedIndex) => {
          if (inputs[pastedIndex]) inputs[pastedIndex].value = char;
        });
        const next = inputs[Math.min(pasted.length, inputs.length - 1)];
        if (next) next.focus();
      });
    });
  });
}


// Batch 3 student dashboard interactions

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initDashboardFilters();
  initStudentFormDemo();
});

function initDashboardSidebar() {
  const toggles = document.querySelectorAll('[data-dashboard-toggle]');
  const backdrop = document.querySelector('[data-dashboard-backdrop]');

  function closeAll() {
    document.querySelectorAll('.dashboard-sidebar.open').forEach((sidebar) => sidebar.classList.remove('open'));
    if (backdrop) backdrop.classList.remove('open');
  }

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute('data-dashboard-toggle');
    const sidebar = document.getElementById(targetId);
    if (!sidebar) return;

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (backdrop) backdrop.classList.toggle('open', sidebar.classList.contains('open'));
    });
  });

  backdrop?.addEventListener('click', closeAll);
  document.querySelectorAll('.dashboard-sidebar a').forEach((link) => {
    link.addEventListener('click', closeAll);
  });
}

function initDashboardFilters() {
  const chips = document.querySelectorAll('[data-filter-chip]');
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const group = chip.closest('[data-filter-group]');
      if (!group) return;
      group.querySelectorAll('[data-filter-chip]').forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function initStudentFormDemo() {
  const forms = document.querySelectorAll('[data-student-form]');
  forms.forEach((form) => {
    const message = form.querySelector('[data-student-form-message]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (message) message.classList.add('show');
    });
  });
}


// Batch 4 instructor dashboard interactions

document.addEventListener('DOMContentLoaded', () => {
  initInstructorFormDemo();
  initBuilderModuleSelect();
});

function initInstructorFormDemo() {
  const forms = document.querySelectorAll('[data-instructor-form]');
  forms.forEach((form) => {
    const message = form.querySelector('[data-instructor-form-message]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (message) message.classList.add('show');
    });
  });
}

function initBuilderModuleSelect() {
  const moduleCards = document.querySelectorAll('[data-module-card]');
  if (!moduleCards.length) return;

  moduleCards.forEach((card) => {
    card.addEventListener('click', () => {
      moduleCards.forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
    });
  });
}
