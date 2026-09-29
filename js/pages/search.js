/**
 * ============================================================================
 * PAGE: RESULTADOS DA BUSCA & EXPLORAR CATÁLOGO (Matches Figma Screen 2)
 * ============================================================================
 */

const SearchPage = {
  activeQuery: '',
  selectedCategory: 'all',
  selectedAvailability: 'all',
  selectedMinRating: 0,
  selectedSort: 'relevance',
  viewMode: 'grid', // 'grid' | 'list'
  currentPage: 1,
  pageSize: 8,

  render(query = '') {
    const container = document.getElementById('page-container');
    if (!container) return;

    this.activeQuery = query !== undefined ? query : this.activeQuery;

    const allCatalog = store.getAllBooks();
    const cleanQuery = this.activeQuery.toLowerCase().trim();

    // 1. Search Filter (Title, Author, Category, ISBN, Synopsis)
    let filteredBooks = allCatalog.filter(b => {
      if (!cleanQuery) return true;
      const matchTitle = b.title.toLowerCase().includes(cleanQuery);
      const matchAuthor = b.author.toLowerCase().includes(cleanQuery);
      const matchCat = b.category.toLowerCase().includes(cleanQuery);
      const matchIsbn = b.isbn && b.isbn.replace(/[^0-9X]/gi, '').includes(cleanQuery.replace(/[^0-9X]/gi, ''));
      const matchSyn = b.synopsis && b.synopsis.toLowerCase().includes(cleanQuery);
      return matchTitle || matchAuthor || matchCat || matchIsbn || matchSyn;
    });

    // 2. Category Filter
    if (this.selectedCategory !== 'all') {
      filteredBooks = filteredBooks.filter(b => 
        b.categorySlug === this.selectedCategory || 
        b.category.toLowerCase().includes(this.selectedCategory.toLowerCase())
      );
    }

    // 3. Availability Filter
    if (this.selectedAvailability === 'available') {
      filteredBooks = filteredBooks.filter(b => b.available !== false);
    }

    // 4. Rating Filter
    if (this.selectedMinRating > 0) {
      filteredBooks = filteredBooks.filter(b => (b.rating || 0) >= this.selectedMinRating);
    }

    // 5. Sorting
    if (this.selectedSort === 'rating') {
      filteredBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (this.selectedSort === 'recent') {
      filteredBooks.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (this.selectedSort === 'az') {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedSort === 'pages') {
      filteredBooks.sort((a, b) => (b.pages || 0) - (a.pages || 0));
    }

    // Pagination calculations
    const totalResults = filteredBooks.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / this.pageSize));
    if (this.currentPage > totalPages) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const pagedBooks = filteredBooks.slice(startIndex, startIndex + this.pageSize);

    const isCatalogHome = !cleanQuery;
    const bannerTitle = isCatalogHome ? 'Explorar Acervo da Biblioteca' : `Resultados da busca: "${this.activeQuery}"`;
    const bannerSubtitle = isCatalogHome 
      ? 'Descubra edições clássicas, contemporâneas, audiolivros e obras recomendadas pelos clubes da Livraria Viva.' 
      : `${totalResults} obra${totalResults === 1 ? '' : 's'} encontrada${totalResults === 1 ? '' : 's'} no acervo para sua pesquisa.`;

    const headerBannerHTML = `
      <div class="search-hero-banner">
        <div class="banner-left">
          <div class="banner-icon-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <div class="banner-titles">
            <div class="banner-tag-row">
              <h1 class="banner-title">${bannerTitle}</h1>
              ${isCatalogHome ? '<span class="series-badge">Catálogo Completo</span>' : ''}
            </div>
            <p class="banner-subtitle">${bannerSubtitle}</p>
          </div>
        </div>

        <div class="banner-actions">
          <button class="btn-banner-action" id="btn-save-search" title="Salvar termo de pesquisa">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            <span>Salvar Busca</span>
          </button>
          <button class="btn-banner-action primary" id="btn-share-search" title="Compartilhar catálogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    `;

    const filterBarHTML = `
      <div class="catalog-filter-bar">
        <div class="filters-row">
          <!-- Category Filter -->
          <div class="filter-dropdown">
            <select id="filter-select-category" class="filter-dropdown-select">
              <option value="all">Categoria: Todas</option>
              <option value="fantasia" ${this.selectedCategory === 'fantasia' ? 'selected' : ''}>Fantasia</option>
              <option value="ficcao" ${this.selectedCategory === 'ficcao' ? 'selected' : ''}>Ficção Científica</option>
              <option value="literatura-br" ${this.selectedCategory === 'literatura-br' ? 'selected' : ''}>Literatura Brasileira</option>
              <option value="historia" ${this.selectedCategory === 'historia' ? 'selected' : ''}>História & Não-Ficção</option>
              <option value="romance" ${this.selectedCategory === 'romance' ? 'selected' : ''}>Romance</option>
              <option value="infantil" ${this.selectedCategory === 'infantil' ? 'selected' : ''}>Infantojuvenil</option>
            </select>
          </div>

          <!-- Availability Filter -->
          <div class="filter-dropdown">
            <select id="filter-select-availability" class="filter-dropdown-select">
              <option value="all" ${this.selectedAvailability === 'all' ? 'selected' : ''}>Disponibilidade: Todas</option>
              <option value="available" ${this.selectedAvailability === 'available' ? 'selected' : ''}>Apenas disponíveis agora</option>
            </select>
          </div>

          <!-- Minimum Rating Filter -->
          <div class="filter-dropdown">
            <select id="filter-select-rating" class="filter-dropdown-select">
              <option value="0" ${this.selectedMinRating === 0 ? 'selected' : ''}>Avaliação: Todas as notas</option>
              <option value="4.8" ${this.selectedMinRating === 4.8 ? 'selected' : ''}>★★★★★ 4.8 ou mais</option>
              <option value="4.5" ${this.selectedMinRating === 4.5 ? 'selected' : ''}>★★★★☆ 4.5 ou mais</option>
              <option value="4.0" ${this.selectedMinRating === 4.0 ? 'selected' : ''}>★★★★☆ 4.0 ou mais</option>
            </select>
          </div>

          <button class="btn-clear-filters" id="btn-reset-filters">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Limpar filtros</span>
          </button>
        </div>
      </div>
    `;

    const resultsHeaderHTML = `
      <div class="search-results-header">
        <div class="results-count-wrap">
          <h2 class="search-term-heading">
            ${cleanQuery ? `Resultados para: <b>${this.activeQuery}</b>` : 'Todos os Livros do Acervo'}
          </h2>
          <span class="results-meta-count">${totalResults} livro${totalResults === 1 ? '' : 's'} catalogado${totalResults === 1 ? '' : 's'}</span>
        </div>

        <div class="search-view-and-sort">
          <div class="view-mode-toggle">
            <button class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" id="btn-view-grid" title="Visualização em Grade">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" id="btn-view-list" title="Visualização em Lista">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>

          <div class="sort-select-wrap">
            <span class="sort-label">Ordenar:</span>
            <select id="select-catalog-sort" class="sort-dropdown-native">
              <option value="relevance" ${this.selectedSort === 'relevance' ? 'selected' : ''}>Mais relevantes</option>
              <option value="rating" ${this.selectedSort === 'rating' ? 'selected' : ''}>Melhor avaliados</option>
              <option value="recent" ${this.selectedSort === 'recent' ? 'selected' : ''}>Ano de publicação</option>
              <option value="az" ${this.selectedSort === 'az' ? 'selected' : ''}>Título (A-Z)</option>
              <option value="pages" ${this.selectedSort === 'pages' ? 'selected' : ''}>Número de páginas</option>
            </select>
          </div>
        </div>
      </div>
    `;

    // Render Grid or List or Empty State
    let contentHTML = '';
    if (totalResults === 0) {
      contentHTML = `
        <div class="search-empty-state-card">
          <div class="empty-state-icon">🔍</div>
          <h3 class="empty-state-title">Nenhum livro encontrado para "${this.activeQuery}"</h3>
          <p class="empty-state-text">
            Não localizamos títulos com os filtros aplicados. Tente verificar a ortografia, remover alguns filtros ou explorar os termos mais buscados abaixo:
          </p>
          <div class="empty-suggestions-tags">
            <button class="empty-tag-btn" data-q="Harry Potter">⚡ Harry Potter</button>
            <button class="empty-tag-btn" data-q="Ficção Científica">🚀 Ficção Científica</button>
            <button class="empty-tag-btn" data-q="Literatura Brasileira">🇧🇷 Literatura Brasileira</button>
            <button class="empty-tag-btn" data-q="Sapiens">🌍 Sapiens</button>
            <button class="empty-tag-btn" data-q="1984">👁️ 1984</button>
          </div>
          <button class="btn btn-primary" id="btn-clear-empty-search" style="margin-top: 18px;">
            Ver todo o acervo da biblioteca
          </button>
        </div>
      `;
    } else if (this.viewMode === 'list') {
      contentHTML = `
        <div class="catalog-books-list-view">
          ${pagedBooks.map(b => {
            const isFav = store.isFavorite(b.id);
            const isBorrowed = store.isBorrowed(b.id);
            return `
              <div class="catalog-list-item-row" data-id="${b.id}">
                <div class="list-item-cover-wrap" onclick="location.hash='#/book/${b.id}'">
                  <img src="${b.cover}" alt="${b.title}" class="list-item-cover" />
                </div>
                <div class="list-item-info">
                  <div class="list-item-top-tags">
                    <span class="category-tag-pill">${b.category}</span>
                    <span class="list-rating-badge">★ ${(b.rating || 4.8).toFixed(1)}</span>
                  </div>
                  <h3 class="list-item-title" onclick="location.hash='#/book/${b.id}'">${b.title}</h3>
                  <p class="list-item-author">${b.author} • ${b.publisher || 'Editora'} (${b.year || 2021}) • ${b.pages || 300} págs</p>
                  <p class="list-item-synopsis">${b.synopsis ? (b.synopsis.length > 160 ? b.synopsis.slice(0, 160) + '...' : b.synopsis) : ''}</p>
                </div>
                <div class="list-item-actions">
                  <button class="btn-card-action" onclick="location.hash='#/book/${b.id}'">
                    <span>Ver detalhes</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                  <button class="btn-borrow-quick ${isBorrowed ? 'borrowed' : ''}" onclick="store.borrowBook('${b.id}'); SearchPage.render('${this.activeQuery}');">
                    ${isBorrowed ? '✓ Na Estante' : 'Emprestar'}
                  </button>
                  <button class="favorite-heart-btn ${isFav ? 'active' : ''}" data-id="${b.id}" title="Favoritar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      contentHTML = `
        <div class="catalog-books-grid">
          ${pagedBooks.map(b => BookCard.renderGridCard(b)).join('')}
        </div>
      `;
    }

    const calloutHTML = `
      <div class="catalog-curator-callout">
        <div class="callout-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div class="callout-text-content">
          <span class="callout-pill-tag">CLUBE DE LEITURA ATIVO</span>
          <p class="callout-quote">"O hábito da leitura nos permite viver milhares de vidas antes de morrer, descobrindo universos inteiros sem sair do lugar."</p>
          <span class="callout-author-cite">— Curadoria Livraria Viva • Mais de 2.400 membros debatendo no fórum da comunidade.</span>
        </div>
        <button class="callout-action-btn" onclick="location.hash='#/community'">
          Participar do debate
        </button>
      </div>
    `;

    // Pagination HTML
    let paginationHTML = '';
    if (totalPages > 1) {
      const pageButtons = [];
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(`
          <button class="page-num-btn ${this.currentPage === i ? 'active' : ''}" data-page="${i}">${i}</button>
        `);
      }

      paginationHTML = `
        <div class="pagination-wrapper">
          <button class="pagination-arrow" ${this.currentPage <= 1 ? 'disabled' : ''} id="btn-prev-pagination">&larr;</button>
          ${pageButtons.join('')}
          <button class="pagination-arrow" ${this.currentPage >= totalPages ? 'disabled' : ''} id="btn-next-pagination">&rarr;</button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="search-page-container">
        ${headerBannerHTML}
        ${filterBarHTML}
        ${resultsHeaderHTML}
        ${contentHTML}
        ${calloutHTML}
        ${paginationHTML}
      </div>
    `;

    BookCard.bindCardEvents(container);
    this.bindEvents(container);
  },

  bindEvents(container) {
    const saveBtn = document.getElementById('btn-save-search');
    const shareBtn = document.getElementById('btn-share-search');
    const resetBtn = document.getElementById('btn-reset-filters');
    const sortSelect = document.getElementById('select-catalog-sort');
    const catSelect = document.getElementById('filter-select-category');
    const availSelect = document.getElementById('filter-select-availability');
    const ratingSelect = document.getElementById('filter-select-rating');
    const gridBtn = document.getElementById('btn-view-grid');
    const listBtn = document.getElementById('btn-view-list');
    const clearEmptyBtn = document.getElementById('btn-clear-empty-search');

    if (saveBtn) {
      saveBtn.onclick = () => {
        store.saveSearch(this.activeQuery || 'Catálogo Geral');
      };
    }

    if (shareBtn) {
      shareBtn.onclick = () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
        Toast.show('Link do catálogo copiado para a área de transferência! 📋', 'info');
      };
    }

    if (catSelect) {
      catSelect.onchange = (e) => {
        this.selectedCategory = e.target.value;
        this.currentPage = 1;
        this.render(this.activeQuery);
      };
    }

    if (availSelect) {
      availSelect.onchange = (e) => {
        this.selectedAvailability = e.target.value;
        this.currentPage = 1;
        this.render(this.activeQuery);
      };
    }

    if (ratingSelect) {
      ratingSelect.onchange = (e) => {
        this.selectedMinRating = parseFloat(e.target.value) || 0;
        this.currentPage = 1;
        this.render(this.activeQuery);
      };
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        this.selectedCategory = 'all';
        this.selectedAvailability = 'all';
        this.selectedMinRating = 0;
        this.selectedSort = 'relevance';
        this.currentPage = 1;
        Toast.show('Filtros redefinidos com sucesso.', 'info');
        this.render(this.activeQuery);
      };
    }

    if (sortSelect) {
      sortSelect.onchange = (e) => {
        this.selectedSort = e.target.value;
        this.currentPage = 1;
        this.render(this.activeQuery);
      };
    }

    if (gridBtn) {
      gridBtn.onclick = () => {
        this.viewMode = 'grid';
        this.render(this.activeQuery);
      };
    }

    if (listBtn) {
      listBtn.onclick = () => {
        this.viewMode = 'list';
        this.render(this.activeQuery);
      };
    }

    if (clearEmptyBtn) {
      clearEmptyBtn.onclick = () => {
        this.selectedCategory = 'all';
        this.selectedAvailability = 'all';
        this.selectedMinRating = 0;
        location.hash = '#/catalog';
      };
    }

    // Empty suggestions
    container.querySelectorAll('.empty-tag-btn').forEach(btn => {
      btn.onclick = () => {
        const q = btn.getAttribute('data-q');
        location.hash = `#/search?q=${encodeURIComponent(q)}`;
      };
    });

    // Pagination numbers
    container.querySelectorAll('.page-num-btn').forEach(btn => {
      btn.onclick = () => {
        const page = parseInt(btn.getAttribute('data-page'));
        if (!isNaN(page)) {
          this.currentPage = page;
          this.render(this.activeQuery);
          window.scrollTo({ top: 240, behavior: 'smooth' });
        }
      };
    });

    const prevPage = document.getElementById('btn-prev-pagination');
    const nextPage = document.getElementById('btn-next-pagination');
    if (prevPage) {
      prevPage.onclick = () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.render(this.activeQuery);
          window.scrollTo({ top: 240, behavior: 'smooth' });
        }
      };
    }
    if (nextPage) {
      nextPage.onclick = () => {
        this.currentPage++;
        this.render(this.activeQuery);
        window.scrollTo({ top: 240, behavior: 'smooth' });
      };
    }
  }
};

window.SearchPage = SearchPage;
