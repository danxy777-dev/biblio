/**
 * ============================================================================
 * PAGE: INÍCIO (Home Screen - Matches Figma Screen 1)
 * ============================================================================
 */

const HomePage = {
  activeCategoryFilter: 'all',

  render() {
    const container = document.getElementById('page-container');
    if (!container) return;

    // Dynamically retrieve continue reading books from store
    const storeState = store.getState();
    const readingProgressMap = storeState.readingProgress || {};
    const borrowedList = storeState.borrowedBooks || [];

    // Collect all books with active progress or borrowed status
    const continueBookIds = new Set([
      ...Object.keys(readingProgressMap),
      ...borrowedList.map(b => b.bookId)
    ]);

    let continueItems = Array.from(continueBookIds)
      .map(id => store.getBook(id))
      .filter(Boolean);

    if (continueItems.length === 0) {
      continueItems = [
        APP_DATA.books.find(b => b.id === '1984'),
        APP_DATA.books.find(b => b.id === 'sapiens'),
        APP_DATA.books.find(b => b.id === 'pequeno-principe')
      ].filter(Boolean);
    } else {
      // Limit to 3 on home view
      continueItems = continueItems.slice(0, 3);
    }

    // Featured books
    let featuredBooks = APP_DATA.books.filter(b => 
      ['hp-1', 'nome-do-vento', 'dom-casmurro', 'duna', 'cem-anos-solidao', 'torto-arado'].includes(b.id)
    );

    if (this.activeCategoryFilter !== 'all') {
      featuredBooks = APP_DATA.books.filter(b => b.categorySlug === this.activeCategoryFilter);
    }

    // Top community discussion snippet from store
    const latestReview = (storeState.userReviews && storeState.userReviews[0]) || APP_DATA.communityReviews[0];
    const reviewBook = latestReview.bookId ? store.getBook(latestReview.bookId) : null;

    const heroHTML = `
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-pill-badge">
            <span class="hero-pill-icon">📖</span>
            <span>ACERVO & COMUNIDADE VIVA</span>
          </div>

          <h1 class="hero-title">Descubra sua próxima história</h1>
          <p class="hero-subtitle">Encontre livros, compartilhe opiniões e conecte-se com pessoas que amam ler.</p>

          <div class="hero-search-container">
            <div class="hero-search-box">
              <span class="hero-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                id="hero-search-input" 
                class="hero-search-input" 
                placeholder="Pesquise por título, autor, ISBN ou assunto..."
                autocomplete="off"
              />
              <button class="hero-camera-btn" id="hero-btn-camera" title="Escanear pela câmera">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <span>Escanear pela câmera</span>
              </button>
            </div>

            <div class="hero-quick-tags">
              <span class="quick-tags-label">Mais buscados:</span>
              <button class="quick-tag-chip" data-search="Ficção Científica">Ficção Científica</button>
              <button class="quick-tag-chip" data-search="Distopias">Distopias</button>
              <button class="quick-tag-chip" data-search="Literatura Brasileira">Literatura Brasileira</button>
              <button class="quick-tag-chip" data-search="Harry Potter">Harry Potter</button>
            </div>
          </div>
        </div>

        <div class="hero-illustration">
          <svg width="280" height="220" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 40C30 40 70 25 120 40C170 25 210 40 210 40V140C210 140 170 125 120 140C70 125 30 140 30 140V40Z" stroke="rgba(255,255,255,0.15)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="120" y1="40" x2="120" y2="140" stroke="rgba(255,255,255,0.18)" stroke-width="14" stroke-linecap="round"/>
            <path d="M48 65C68 55 95 62 108 68" stroke="rgba(244, 187, 144, 0.35)" stroke-width="6" stroke-linecap="round"/>
            <path d="M48 90C68 80 95 87 108 93" stroke="rgba(244, 187, 144, 0.25)" stroke-width="6" stroke-linecap="round"/>
            <path d="M132 68C145 62 172 55 192 65" stroke="rgba(244, 187, 144, 0.35)" stroke-width="6" stroke-linecap="round"/>
            <path d="M132 93C145 87 172 80 192 90" stroke="rgba(244, 187, 144, 0.25)" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>
      </section>
    `;

    const continueReadingHTML = `
      <section class="home-section continue-reading-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-decorator"></span>
            <h2 class="section-title">Continue lendo</h2>
          </div>
          <a href="#/my-books" class="section-link-more">
            <span>Ver todos</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        <div class="continue-reading-grid">
          ${continueItems.map(item => BookCard.renderContinueReadingCard(item)).join('')}
        </div>
      </section>
    `;

    const featuredHTML = `
      <section class="home-section featured-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-decorator"></span>
            <h2 class="section-title">Em destaque</h2>
            <span class="section-subtitle">Seleções curadas pelo clube Livraria Viva</span>
          </div>
          <a href="#/catalog" class="section-link-more">
            <span>Ver catálogo completo</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        <!-- Filter Chips -->
        <div class="filter-chips-row">
          <button class="filter-chip ${this.activeCategoryFilter === 'all' ? 'active' : ''}" data-cat="all">Todos</button>
          <button class="filter-chip ${this.activeCategoryFilter === 'fantasia' ? 'active' : ''}" data-cat="fantasia">Fantasia & Ficção</button>
          <button class="filter-chip ${this.activeCategoryFilter === 'literatura-br' ? 'active' : ''}" data-cat="literatura-br">Literatura Brasileira</button>
          <button class="filter-chip ${this.activeCategoryFilter === 'ficcao' ? 'active' : ''}" data-cat="ficcao">Ficção Científica</button>
          <button class="filter-chip ${this.activeCategoryFilter === 'historia' ? 'active' : ''}" data-cat="historia">História & Sociedade</button>
        </div>

        <div class="featured-books-row">
          ${featuredBooks.map(book => BookCard.renderFeaturedCompactCard(book)).join('')}
        </div>
      </section>
    `;

    const isMember = store.isClubMember('club-fantasia');

    const bottomRowHTML = `
      <section class="home-section home-bottom-grid">
        <!-- Left: Community Discussion Snippet -->
        <div class="community-discussion-card">
          <div class="card-inner-header">
            <div class="title-with-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <h3>Discussões da Comunidade</h3>
            </div>
            <a href="#/community" class="link-small">Explorar feed &rarr;</a>
          </div>

          <div class="discussion-snippet-box">
            <div class="snippet-author-row">
              <div class="author-avatar-badge" onclick="location.hash='#/profile?user=${encodeURIComponent(latestReview.authorHandle)}'" style="cursor: pointer;">
                ${latestReview.authorInitials || latestReview.authorName.slice(0, 2).toUpperCase()}
              </div>
              <div class="author-meta-text">
                <span class="author-name" onclick="location.hash='#/profile?user=${encodeURIComponent(latestReview.authorHandle)}'" style="cursor: pointer;">
                  ${latestReview.authorName}
                </span>
                <span class="action-desc">${latestReview.action || 'Publicou no feed'} • ${latestReview.time}</span>
              </div>
              ${latestReview.rating ? `
                <div class="snippet-stars">
                  ${BookCard.renderStars(latestReview.rating, 13)}
                </div>
              ` : ''}
            </div>
            <blockquote class="snippet-quote-text" onclick="location.hash='#/community'" style="cursor: pointer;">
              "${latestReview.content.length > 180 ? latestReview.content.slice(0, 180) + '...' : latestReview.content}"
            </blockquote>
            <div class="snippet-engagement">
              <span>❤️ ${latestReview.likes || 0} curtidas</span>
              <span>💬 ${(latestReview.comments || []).length} comentários</span>
              ${reviewBook ? `<span style="color: var(--color-primary); font-weight: 600;" onclick="location.hash='#/book/${reviewBook.id}'">📖 ${reviewBook.title}</span>` : ''}
            </div>
          </div>

          <div class="discussion-footer-calendar">
            <span>Participe das leituras coletivas e debates do mês.</span>
            <a href="#/community" class="calendar-link">Ver calendário</a>
          </div>
        </div>

        <!-- Right: Active Club Card -->
        <div class="active-club-card">
          <div class="club-badge-top">
            <span class="club-status-dot"></span>
            <span>Clube em Andamento</span>
          </div>

          <h3 class="club-card-title">Clube dos Apaixonados por Fantasia</h3>
          <p class="club-activity-desc">
            2.4k membros estão debatendo os primeiros 10 capítulos de Harry Potter e Duna nesta semana.
          </p>

          <div class="club-members-avatars-row">
            <span class="member-bubble">CL</span>
            <span class="member-bubble">AB</span>
            <span class="member-bubble">RF</span>
            <span class="member-bubble more">+120</span>
          </div>

          <button class="btn-club-action ${isMember ? 'joined' : ''}" id="btn-toggle-home-club">
            ${isMember ? '✓ Inscrito no Clube' : 'Entrar no Clube'}
          </button>
        </div>
      </section>
    `;

    container.innerHTML = `
      <div class="home-page-container">
        ${heroHTML}
        ${continueReadingHTML}
        ${featuredHTML}
        ${bottomRowHTML}
      </div>
    `;

    this.bindEvents(container);
  },

  bindEvents(container) {
    // Hero Search
    const heroInput = document.getElementById('hero-search-input');
    const heroCamera = document.getElementById('hero-btn-camera');

    if (heroInput) {
      heroInput.onkeydown = (e) => {
        if (e.key === 'Enter' && heroInput.value.trim()) {
          location.hash = `#/search?q=${encodeURIComponent(heroInput.value.trim())}`;
        }
      };
    }

    if (heroCamera) {
      heroCamera.onclick = () => {
        location.hash = '#/scanner';
      };
    }

    // Quick tag chips
    container.querySelectorAll('.quick-tag-chip').forEach(chip => {
      chip.onclick = () => {
        const query = chip.getAttribute('data-search');
        location.hash = `#/search?q=${encodeURIComponent(query)}`;
      };
    });

    // Category filter chips
    container.querySelectorAll('.filter-chips-row .filter-chip').forEach(btn => {
      btn.onclick = () => {
        this.activeCategoryFilter = btn.getAttribute('data-cat');
        this.render();
      };
    });

    // Club join button
    const clubBtn = document.getElementById('btn-toggle-home-club');
    if (clubBtn) {
      clubBtn.onclick = () => {
        const joined = store.toggleClub('club-fantasia', 'Clube dos Apaixonados por Fantasia');
        clubBtn.classList.toggle('joined', joined);
        clubBtn.textContent = joined ? '✓ Inscrito no Clube' : 'Entrar no Clube';
      };
    }
  }
};

window.HomePage = HomePage;
