// mathlab/search-filter.js
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-tag');
  const simCards = document.querySelectorAll('.card');
  const emptyState = document.getElementById('empty-state');
  const resultsCount = document.getElementById('results-count');

  let activeFilter = 'all';

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    simCards.forEach((card) => {
      const title = card.querySelector('.card-title').innerText.toLowerCase();
      const category = card.getAttribute('data-category') || '';
      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = query === '' || title.includes(query);
      const show = matchesCategory && matchesSearch;

      card.classList.toggle('hide', !show);
      if (show) visible++;
    });

    if (resultsCount) {
      resultsCount.textContent = `Showing ${visible} of ${simCards.length} simulations`;
    }
    if (emptyState) {
      emptyState.style.display = visible === 0 ? 'flex' : 'none';
    }
  }

  searchInput.addEventListener('input', applyFilters);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  applyFilters();
});
