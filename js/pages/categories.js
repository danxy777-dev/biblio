/**
 * ============================================================================
 * PAGE: EXPLORAR POR CATEGORIA (Print 4 - Exact Layout & Content)
 * ============================================================================
 */

const CategoriesPage = {
  searchTerm: '',
  sortMode: 'popular', // 'popular' | 'alpha'

  render() {
    const container = document.getElementById('page-container');
    if (!container) return;

    let filteredCats = [...APP_DATA.categories];
    if (this.searchTerm.trim()) {
      const q = this.searchTerm.toLowerCase();
      filteredCats = filteredCats.filter(c => c.name.toLowerCase().includes(q));
    }

    if (this.sortMode === 'alpha') {
      filteredCats.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Helper to render category icon SVGs
    const getCatSvg = (catId, iconBg) => {
      switch (catId) {
        case 'romance':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="#E11D48" stroke="#E11D48" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
        case 'ficcao':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
        case 'fantasia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        case 'misterio':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        case 'suspense':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
        case 'terror':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="#334155" stroke="#334155" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        case 'aventura':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
        case 'biografia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        case 'historia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57534E" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="6" y1="21" x2="6" y2="7"></line><line x1="18" y1="21" x2="18" y2="7"></line><line x1="12" y1="21" x2="12" y2="7"></line><polygon points="3 7 12 2 21 7 3 7"></polygon></svg>`;
        case 'filosofia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
        case 'religiao':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2"><path d="M18 10h-4V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6H6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-6h4a2 2 0 0 0 2-2 2 2 0 0 0-2-2z"></path></svg>`;
        case 'ciencia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891B2" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line></svg>`;
        case 'tecnologia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
        case 'educacao':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`;
        case 'literatura-br':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`;
        case 'literatura-est':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        case 'infantil':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`;
        case 'juvenil':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        case 'poesia':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`;
        case 'quadrinhos':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`;
        case 'desenvolvimento':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`;
        case 'negocios':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
        case 'culinaria':
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`;
        default:
          return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
      }
    };

    container.innerHTML = `
      <div class="categories-page-container">
        <!-- Top Title & Search Controls -->
        <div class="categories-top-header">
          <div class="cat-header-left">
            <div class="cat-subtitle-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>CATÁLOGO & CLASSIFICAÇÃO</span>
            </div>
            <h1 class="cat-main-title">Explorar por categoria</h1>
            <p class="cat-main-desc">
              Navegue pelas dimensões literárias da nossa biblioteca coletiva. Selecione um gênero para encontrar obras catalogadas, resenhas comunitárias e listas temáticas.
            </p>
          </div>

          <div class="cat-header-right">
            <div class="cat-search-pill-box">
              <span class="cat-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input 
                type="text" 
                id="input-filter-category" 
                class="cat-search-field" 
                placeholder="Pesquise categorias..." 
                value="${this.searchTerm}"
              />
            </div>

            <div class="cat-sort-toggle-pill">
              <button class="cat-sort-tab ${this.sortMode === 'popular' ? 'active' : ''}" id="btn-sort-pop">Populares</button>
              <span class="cat-sort-sep">|</span>
              <button class="cat-sort-tab ${this.sortMode === 'alpha' ? 'active' : ''}" id="btn-sort-az">A-Z</button>
            </div>
          </div>
        </div>

        <!-- 4-Chip Stats Overview Bar -->
        <div class="cat-stats-row">
          <div class="cat-stat-card">
            <div class="cat-stat-icon-square green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <div class="cat-stat-data">
              <span class="cat-stat-value">16.482</span>
              <span class="cat-stat-subtitle">Livros catalogados</span>
            </div>
          </div>

          <div class="cat-stat-card">
            <div class="cat-stat-icon-square light-green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div class="cat-stat-data">
              <span class="cat-stat-value">23 Gêneros</span>
              <span class="cat-stat-subtitle">Seções principais</span>
            </div>
          </div>

          <div class="cat-stat-card">
            <div class="cat-stat-icon-square mint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <div class="cat-stat-data">
              <span class="cat-stat-value">100%</span>
              <span class="cat-stat-subtitle">Curadoria editorial</span>
            </div>
          </div>

          <div class="cat-stat-card">
            <div class="cat-stat-icon-square sage">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="cat-stat-data">
              <span class="cat-stat-value">4.8k</span>
              <span class="cat-stat-subtitle">Leitores ativos</span>
            </div>
          </div>
        </div>

        <!-- 23 Categories 4-Column Grid -->
        <div class="categories-4col-grid">
          ${filteredCats.map(cat => `
            <div class="cat-cell-card" onclick="location.hash='#/search?q=${encodeURIComponent(cat.name)}'">
              <div class="cat-cell-icon-wrap" style="background: ${cat.iconBg || '#F5F5F0'};">
                ${getCatSvg(cat.id, cat.iconBg)}
              </div>
              <div class="cat-cell-text">
                <h3 class="cat-cell-title">${cat.name}</h3>
                <span class="cat-cell-count">${cat.count}</span>
              </div>
              <span class="cat-cell-chevron">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          `).join('')}
        </div>

        <!-- Curated Editorial Collections Section -->
        <section class="curated-editorial-section">
          <div class="editorial-section-header">
            <div class="editorial-title-box">
              <span class="editorial-sub-tag">CURADORIA EDITORIAL VIVA</span>
              <h2 class="editorial-main-title">Coleções em Destaque nesta Semana</h2>
            </div>
            <a href="#/catalog" class="editorial-link-all">
              <span>Ver todas as listas</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div class="editorial-3col-cards">
            ${APP_DATA.curatedCollections.map(col => `
              <div class="editorial-card" onclick="location.hash='#/search?q=${encodeURIComponent(col.tag.split('•')[0].trim())}'">
                <div class="editorial-banner-frame">
                  <img src="${col.image}" alt="${col.title}" class="editorial-banner-img" />
                  <span class="editorial-badge-pill">${col.badge}</span>
                </div>
                <div class="editorial-card-body">
                  <span class="editorial-genre-tag">${col.tag}</span>
                  <h3 class="editorial-card-title">${col.title}</h3>
                  <p class="editorial-card-desc">${col.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    this.bindEvents(container);
  },

  bindEvents(container) {
    const input = document.getElementById('input-filter-category');
    if (input) {
      input.oninput = (e) => {
        this.searchTerm = e.target.value;
        this.render();
        const freshInput = document.getElementById('input-filter-category');
        if (freshInput) {
          freshInput.focus();
          freshInput.setSelectionRange(this.searchTerm.length, this.searchTerm.length);
        }
      };
    }

    const sortPop = document.getElementById('btn-sort-pop');
    const sortAz = document.getElementById('btn-sort-az');
    if (sortPop) {
      sortPop.onclick = () => {
        this.sortMode = 'popular';
        this.render();
      };
    }
    if (sortAz) {
      sortAz.onclick = () => {
        this.sortMode = 'alpha';
        this.render();
      };
    }
  }
};

window.CategoriesPage = CategoriesPage;
