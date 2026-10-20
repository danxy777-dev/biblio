/**
 * ============================================================================
 * BOOK CARD COMPONENTS (Grid Cards, Continue Reading Cards, Shelf Cards)
 * ============================================================================
 */

const BookCard = {
  // Star rating helper
  renderStars(rating, size = 14) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.3;
    let starsHTML = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += `<span class="star-filled" style="color: var(--color-star); font-size: ${size}px;">★</span>`;
      } else if (i === fullStars + 1 && hasHalf) {
        starsHTML += `<span class="star-half" style="color: var(--color-star); font-size: ${size}px;">★</span>`;
      } else {
        starsHTML += `<span class="star-empty" style="color: #D1D5DB; font-size: ${size}px;">★</span>`;
      }
    }
    return `<div class="stars-row" style="display: inline-flex; gap: 2px; align-items: center;">${starsHTML}</div>`;
  },

  // Standard Catalog / Search / Collection Grid Card (Matches Figma Screen 2)
  renderGridCard(book) {
    const isFav = store.isFavorite(book.id);
    const badgeHTML = book.badge 
      ? `<span class="book-cover-badge">${book.badge}</span>` 
      : (book.volume ? `<span class="book-cover-badge volume-badge">${book.volume}</span>` : '');

    const ratingBadge = `<span class="card-top-rating">★ ${book.rating.toFixed(1)}</span>`;

    return `
      <div class="book-card" data-id="${book.id}">
        <div class="book-card-cover-wrap">
          <img src="${book.cover}" alt="${book.title}" class="book-card-cover" loading="lazy" />
          ${badgeHTML}
          ${ratingBadge}
          <button class="favorite-heart-btn ${isFav ? 'active' : ''}" data-id="${book.id}" title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="book-card-details">
          <div class="book-category-row">
            <span class="category-tag-pill">${book.category}</span>
            ${book.volume ? `<span class="volume-sub">${book.volume}</span>` : ''}
          </div>

          <h3 class="book-card-title" title="${book.title}">${book.title}</h3>
          <p class="book-card-author">${book.author}</p>

          <div class="book-card-rating-wrap">
            ${this.renderStars(book.rating, 13)}
            <span class="rating-count-text">(${book.reviewsCount > 1000 ? (book.reviewsCount/1000).toFixed(1) + 'k' : book.reviewsCount} avaliações)</span>
          </div>

          <div class="book-card-actions" style="display: flex; gap: 6px; align-items: center;">
            <a href="#/book/${book.id}" class="btn-card-action" style="flex: 1;">
              <span>Ver livro</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <button class="btn-card-read-quick" onclick="ReaderModal.open('${book.id}')" title="Ler livro agora">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <span>Ler</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Compact Featured Card (Matches Home "Em destaque" row in Screen 1)
  renderFeaturedCompactCard(book) {
    return `
      <div class="featured-book-item" onclick="location.hash='#/book/${book.id}'">
        <div class="featured-cover-box">
          <img src="${book.cover}" alt="${book.title}" class="featured-cover-img" />
          ${book.badge ? `<span class="badge-pill-small">${book.badge}</span>` : ''}
        </div>
        <div class="featured-item-info">
          <h4 class="featured-item-title">${book.title}</h4>
          <span class="featured-item-author">${book.author}</span>
          <div class="featured-item-rating">
            <span class="star-icon">★</span>
            <span class="rating-val">${book.rating.toFixed(1)}</span>
            <span class="rating-count">(${book.reviewsCount > 1000 ? (book.reviewsCount/1000).toFixed(1) + 'k' : book.reviewsCount})</span>
          </div>
        </div>
      </div>
    `;
  },

  // Continue Reading Card (Matches Figma Screen 1)
  renderContinueReadingCard(item) {
    if (item.finished) {
      return `
        <div class="continue-reading-card completed-card">
          <div class="cr-cover-side">
            <img src="${item.cover}" alt="${item.title}" />
          </div>
          <div class="cr-content-side">
            <span class="cr-category-tag">${item.category.toUpperCase()}</span>
            <h4 class="cr-title">${item.title}</h4>
            <span class="cr-author">${item.author}</span>

            <div class="cr-finished-block">
              <div class="cr-stars-row">${BookCard.renderStars(5.0, 13)} <span class="score-num">5.0</span></div>
              <span class="cr-finished-text">Concluído recentemente</span>
            </div>

            <div class="cr-footer">
              <span class="cr-review-status">Revisão salva</span>
              <a href="#/book/${item.id}" class="cr-action-btn secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span>Ver livro</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    const progress = store.getProgress(item.id) || item.inProgress;

    return `
      <div class="continue-reading-card in-progress-card">
        <div class="cr-cover-side">
          <img src="${item.cover}" alt="${item.title}" />
        </div>
        <div class="cr-content-side">
          <span class="cr-category-tag">${item.category.toUpperCase()}</span>
          <h4 class="cr-title">${item.title}</h4>
          <span class="cr-author">${item.author}</span>

          <div class="cr-progress-block">
            <div class="cr-pages-row">
              <span class="page-count">Página ${progress.page} de ${progress.total}</span>
              <span class="percent-val">${progress.percent}%</span>
            </div>
            <div class="cr-progress-track">
              <div class="cr-progress-fill" style="width: ${progress.percent}%;"></div>
            </div>
          </div>

          <div class="cr-footer">
            <span class="cr-time-tag">${progress.lastRead}</span>
            <button class="cr-action-btn primary" onclick="ReaderModal.open('${item.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Shelf Card for "Meus Livros" page
  renderShelfCard(book) {
    const progress = store.getProgress(book.id);
    const isFav = store.isFavorite(book.id);
    const isBorrowed = store.isBorrowed(book.id);

    return `
      <div class="shelf-book-card" data-id="${book.id}">
        <div class="shelf-cover-wrap">
          <img src="${book.cover}" alt="${book.title}" class="shelf-cover-img" />
          <button class="favorite-heart-btn ${isFav ? 'active' : ''}" data-id="${book.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          ${isBorrowed ? '<span class="shelf-borrowed-pill">Emprestado</span>' : ''}
        </div>

        <div class="shelf-card-info">
          <span class="shelf-category">${book.category}</span>
          <h4 class="shelf-title" onclick="location.hash='#/book/${book.id}'">${book.title}</h4>
          <p class="shelf-author">${book.author}</p>

          ${progress ? `
            <div class="shelf-progress-box">
              <div class="shelf-prog-labels">
                <span>Página ${progress.page} de ${progress.total}</span>
                <span>${progress.percent}%</span>
              </div>
              <div class="shelf-prog-bar">
                <div class="shelf-prog-fill" style="width: ${progress.percent}%"></div>
              </div>
            </div>
          ` : `
            <div class="shelf-rating-row">
              ${this.renderStars(book.rating, 12)}
              <span class="shelf-rating-val">${book.rating.toFixed(1)}</span>
            </div>
          `}

          <div class="shelf-actions-row">
            <button class="shelf-read-btn" onclick="ReaderModal.open('${book.id}')">
              Ler agora
            </button>
            <a href="#/book/${book.id}" class="shelf-details-link" title="Detalhes do livro">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // Attach favorite heart click handlers globally
  bindCardEvents(parent = document) {
    parent.querySelectorAll('.favorite-heart-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const bookId = btn.getAttribute('data-id');
        const newState = store.toggleFavorite(bookId);
        btn.classList.toggle('active', newState);
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', newState ? 'currentColor' : 'none');
        }
      };
    });
  }
};

window.BookCard = BookCard;
