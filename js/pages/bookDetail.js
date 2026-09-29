/**
 * ============================================================================
 * PAGE: DETALHES DO LIVRO (Print 5 - Exact Layout & Content)
 * ============================================================================
 */

const BookDetailPage = {
  activeBookId: 'hp-1',
  activeTab: 'about', // 'about', 'specs', 'ratings', 'reviews'

  render(bookId = 'hp-1') {
    const container = document.getElementById('page-container');
    if (!container) return;

    this.activeBookId = bookId || 'hp-1';
    const book = store.getBook(this.activeBookId) || APP_DATA.books[0];
    const isFav = store.isFavorite(book.id);
    const isWant = store.isWantToRead(book.id);
    const isBorrowed = store.isBorrowed(book.id);

    // Filter reviews related to this specific book
    const bookReviews = (store.getState().userReviews || []).filter(r => 
      r.bookId === book.id || (r.bookTitle && r.bookTitle.toLowerCase().includes(book.title.toLowerCase().slice(0, 10)))
    );

    const relatedBooks = APP_DATA.books.filter(b => b.id !== book.id && (b.categorySlug === book.categorySlug || b.author === book.author)).slice(0, 3);

    // Tab content renderer
    let tabContentHTML = '';
    if (this.activeTab === 'specs') {
      tabContentHTML = `
        <div class="detail-specs-full-card">
          <h3 class="specs-full-title">Especificações Técnicas da Edição</h3>
          <table class="specs-data-table">
            <tbody>
              <tr>
                <th>Título Original</th>
                <td>${book.title} (Edição Brasileira)</td>
              </tr>
              <tr>
                <th>Autor</th>
                <td>${book.author}</td>
              </tr>
              ${book.translator ? `
                <tr>
                  <th>Tradução</th>
                  <td>${book.translator}</td>
                </tr>
              ` : ''}
              <tr>
                <th>Editora</th>
                <td>${book.publisher || 'Editora Nacional'}</td>
              </tr>
              <tr>
                <th>Ano de Publicação</th>
                <td>${book.year || 2021}</td>
              </tr>
              <tr>
                <th>ISBN-13</th>
                <td><code>${book.isbn || '978-85-325-0342-7'}</code></td>
              </tr>
              <tr>
                <th>Idioma</th>
                <td>${book.language || 'Português (Brasil)'}</td>
              </tr>
              <tr>
                <th>Número de Páginas</th>
                <td>${book.pages || 320} páginas</td>
              </tr>
              <tr>
                <th>Formato Disponível</th>
                <td>${book.format || 'Digital (E-book) / Capa Comum / Capa Dura'}</td>
              </tr>
              <tr>
                <th>Gênero & Categoria</th>
                <td>${book.category} • ${book.categorySub || 'Literatura Geral'}</td>
              </tr>
              <tr>
                <th>Classificação Indicativa</th>
                <td>Livre para todos os públicos</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (this.activeTab === 'ratings') {
      tabContentHTML = `
        <div class="detail-ratings-breakdown-card">
          <div class="ratings-summary-top">
            <div class="score-big-column">
              <span class="score-giant">${(book.rating || 4.8).toFixed(1)}</span>
              <div class="stars-giant">
                ${BookCard.renderStars(book.rating || 4.8, 20)}
              </div>
              <span class="total-ratings-label">${book.reviewsCount || 12480} avaliações verificadas</span>
            </div>

            <div class="ratings-bars-column">
              <div class="rating-bar-row">
                <span class="star-bar-label">5 estrelas</span>
                <div class="bar-track"><div class="bar-fill" style="width: 82%;"></div></div>
                <span class="bar-pct">82%</span>
              </div>
              <div class="rating-bar-row">
                <span class="star-bar-label">4 estrelas</span>
                <div class="bar-track"><div class="bar-fill" style="width: 13%;"></div></div>
                <span class="bar-pct">13%</span>
              </div>
              <div class="rating-bar-row">
                <span class="star-bar-label">3 estrelas</span>
                <div class="bar-track"><div class="bar-fill" style="width: 3%;"></div></div>
                <span class="bar-pct">3%</span>
              </div>
              <div class="rating-bar-row">
                <span class="star-bar-label">2 estrelas</span>
                <div class="bar-track"><div class="bar-fill" style="width: 1%;"></div></div>
                <span class="bar-pct">1%</span>
              </div>
              <div class="rating-bar-row">
                <span class="star-bar-label">1 estrela</span>
                <div class="bar-track"><div class="bar-fill" style="width: 1%;"></div></div>
                <span class="bar-pct">1%</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'reviews') {
      tabContentHTML = `
        <div class="detail-reviews-tab-container">
          <div class="detail-reviews-head">
            <div class="reviews-head-left">
              <h3 class="reviews-head-title">Resenhas da Comunidade</h3>
              <span class="reviews-head-subtitle">${bookReviews.length} resenhas registradas para esta obra</span>
            </div>

            <button class="btn-write-review-pill" id="btn-write-review-detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Escrever resenha</span>
            </button>
          </div>

          <!-- New Review Form Modal/Drop -->
          <div id="detail-review-form-wrap" class="detail-review-form-wrap hidden">
            <div class="form-group">
              <label>Sua nota para "${book.title}":</label>
              <select id="detail-rating-sel" class="form-select">
                <option value="5">★★★★★ 5.0 (Obra-prima)</option>
                <option value="4.5">★★★★½ 4.5 (Excelente)</option>
                <option value="4">★★★★☆ 4.0 (Muito bom)</option>
                <option value="3.5">★★★½☆ 3.5 (Bom)</option>
                <option value="3">★★★☆☆ 3.0 (Regular)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Sua resenha crítica:</label>
              <textarea id="detail-review-txt" class="form-textarea" placeholder="Conte o que achou da trama, dos personagens e da escrita..."></textarea>
            </div>
            <div class="comm-form-actions">
              <button class="btn btn-outline" id="btn-cancel-detail-rev">Cancelar</button>
              <button class="btn btn-primary" id="btn-submit-detail-rev">Publicar Resenha</button>
            </div>
          </div>

          <!-- Reviews Feed -->
          <div class="detail-reviews-feed-list">
            ${bookReviews.length === 0 ? `
              <div class="no-reviews-box" style="padding: 24px; text-align: center; color: var(--color-text-secondary); background: #FAF9F5; border-radius: 12px;">
                <p>Nenhuma resenha escrita ainda para este livro. Seja o primeiro a opinar!</p>
              </div>
            ` : bookReviews.map(r => `
              <div class="detail-review-post-card">
                <div class="d-rev-top">
                  <div class="d-rev-user">
                    <div class="d-rev-avatar-circle mint" onclick="location.hash='#/profile?user=${encodeURIComponent(r.authorHandle)}'">
                      ${r.authorInitials || r.authorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div class="d-rev-names">
                      <span class="d-rev-name" onclick="location.hash='#/profile?user=${encodeURIComponent(r.authorHandle)}'">${r.authorName}</span>
                      <span class="d-rev-meta">${r.authorHandle} • ${r.badge || 'Leitor Ativo'}</span>
                    </div>
                  </div>
                  <div class="d-rev-stars">
                    ${BookCard.renderStars(r.rating || 5.0, 13)}
                  </div>
                </div>

                <p class="d-rev-body">
                  "${r.content}"
                </p>

                <div class="d-rev-footer">
                  <button class="d-rev-action-btn like-btn" onclick="store.toggleLikePost('${r.id}'); BookDetailPage.render('${book.id}');">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="${store.isPostLiked(r.id) ? '#E11D48' : 'none'}" stroke="${store.isPostLiked(r.id) ? '#E11D48' : 'currentColor'}" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span class="count">${r.likes || 0}</span> curtidas
                  </button>
                  <span class="d-rev-time">${r.time || 'recente'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Default: 'about' tab
      tabContentHTML = `
        <!-- Synopsis Box -->
        <div class="detail-synopsis-box">
          <div class="synopsis-box-head">
            <h3 class="synopsis-heading">Sinopse da Obra</h3>
            <span class="synopsis-rating-tag">Classificação: Livre</span>
          </div>

          <div class="synopsis-content-text">
            <p>
              ${book.synopsis || 'Uma das obras mais aclamadas da literatura mundial, repleta de aventuras, personagens inesquecíveis e reflexões profundas sobre a condição humana.'}
            </p>
          </div>

          <button class="btn-synopsis-more" id="btn-synopsis-more">
            <span>Ver mais detalhes</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <!-- Featured Quote Callout Box -->
        <div class="detail-quote-callout-card">
          <div class="quote-symbol-99">”</div>
          <div class="quote-text-col">
            <p class="quote-main-italic">"${book.quote?.text || 'Não vale a pena viver sonhando e se esquecer de viver, lembre-se.'}"</p>
            <span class="quote-author-source">— ${book.quote?.author || 'Passagem marcante da obra'}</span>
          </div>
        </div>

        <!-- Chapters / Summary Preview -->
        <div class="detail-chapters-box">
          <h3 class="chapters-title">Capítulos & Estrutura</h3>
          <div class="chapters-list">
            ${(book.chapters || [
              { number: 1, title: 'Abertura & Introdução', pages: '1-24' },
              { number: 2, title: 'O Desenvolvimento da Trama', pages: '25-78' },
              { number: 3, title: 'O Clímax e o Desfecho', pages: '79-150' }
            ]).map(c => `
              <div class="chapter-item-row" onclick="ReaderModal.open('${book.id}')" title="Ler este capítulo">
                <span class="chapter-num">${c.number}</span>
                <span class="chapter-title">${c.title}</span>
                <span class="chapter-pages">Págs. ${c.pages}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="book-detail-page-screen">
        <!-- Breadcrumbs Bar -->
        <div class="book-detail-breadcrumbs">
          <a href="#/">Início</a>
          <span class="bc-arrow">&gt;</span>
          <a href="#/search?q=${encodeURIComponent(book.category)}">${book.category}</a>
          <span class="bc-arrow">&gt;</span>
          <span class="bc-current">${book.title}</span>
        </div>

        <!-- Top Main Book Hero Section -->
        <div class="book-detail-hero-card">
          <!-- Left Cover Column -->
          <div class="detail-left-cover-box">
            <div class="detail-cover-3d-frame">
              <img src="${book.cover}" alt="${book.title}" class="detail-cover-3d-img" />
            </div>

            <!-- 3-Stats Summary Box Under Cover -->
            <div class="detail-under-cover-stats">
              <div class="stat-col">
                <span class="stat-big-num">${book.readersCount || '34.2k'}</span>
                <span class="stat-small-label">Leitores</span>
              </div>
              <div class="stat-col">
                <span class="stat-big-num">${(book.rating || 4.8).toFixed(1)}</span>
                <span class="stat-small-label">Média</span>
              </div>
              <div class="stat-col">
                <span class="stat-big-num">${bookReviews.length + 120}</span>
                <span class="stat-small-label">Resenhas</span>
              </div>
            </div>
          </div>

          <!-- Right Content Column -->
          <div class="detail-right-info-box">
            <!-- Top Availability & Edition Pill Row -->
            <div class="detail-top-badges-row">
              <span class="detail-available-pill">
                <span class="pill-green-dot"></span>
                <span>Disponível no acervo</span>
              </span>
              <span class="detail-edition-text">${book.edition || 'Edição Especial Integrada'}</span>
            </div>

            <h1 class="detail-main-book-title">${book.title}</h1>

            <div class="detail-byline-row">
              <span class="byline-author">por <strong>${book.author}</strong></span>
              ${book.translator ? `<span class="byline-trans">• Tradução de ${book.translator}</span>` : ''}
            </div>

            <div class="detail-stars-score-row">
              <div class="detail-stars-svgs">
                ${BookCard.renderStars(book.rating || 4.8, 15)}
              </div>
              <span class="detail-score-bold">${(book.rating || 4.8).toFixed(1)}</span>
              <span class="detail-ratings-count">(${book.reviewsCount || 12480} avaliações de leitores)</span>
            </div>

            <!-- Specs Grid Pills -->
            <div class="detail-specs-pills-list">
              <div class="spec-pill-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>${book.categorySub || book.category}</span>
              </div>
              <div class="spec-pill-item">
                <span>Ano: ${book.year || 2021}</span>
              </div>
              <div class="spec-pill-item">
                <span>Editora: ${book.publisher || 'Rocco'}</span>
              </div>
              <div class="spec-pill-item">
                <span>Idioma: ${book.language || 'Português'}</span>
              </div>
              <div class="spec-pill-item">
                <span>Páginas: ${book.pages || 320}</span>
              </div>
              <div class="spec-pill-item">
                <span>Formato: ${book.format || 'Digital / Capa comum'}</span>
              </div>
              <div class="spec-pill-item full-width-isbn">
                <span>ISBN: ${book.isbn || '978-85-325-0342-7'}</span>
              </div>
            </div>

            <!-- Primary Action Buttons -->
            <div class="detail-primary-actions-row">
              <button class="btn-detail-read-now" id="btn-detail-read-now">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span>Ler agora</span>
              </button>

              <button class="btn-detail-add-lib ${isBorrowed ? 'added' : ''}" id="btn-detail-add-lib">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>${isBorrowed ? '✓ Na sua Biblioteca' : '+ Pegar emprestado'}</span>
              </button>
            </div>

            <!-- Secondary Links Row -->
            <div class="detail-quick-actions-row">
              <button class="btn-quick-link ${isWant ? 'active' : ''}" id="btn-quick-want">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="${isWant ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                <span>${isWant ? '✓ Quero ler' : 'Quero ler'}</span>
              </button>

              <button class="btn-quick-link ${isFav ? 'active' : ''}" id="btn-quick-fav">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? '#E11D48' : 'none'}" stroke="${isFav ? '#E11D48' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span>${isFav ? 'Favoritado' : 'Favoritar'}</span>
              </button>

              <button class="btn-quick-link" id="btn-quick-share">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                <span>Compartilhar</span>
              </button>

              <button class="btn-quick-link" id="btn-quick-editions">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <span>Ver edições</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs Bar -->
        <div class="detail-nav-tabs-bar">
          <button class="detail-tab-btn ${this.activeTab === 'about' ? 'active' : ''}" data-tab="about">
            Sobre este livro
          </button>
          <button class="detail-tab-btn ${this.activeTab === 'specs' ? 'active' : ''}" data-tab="specs">
            Informações técnicas
          </button>
          <button class="detail-tab-btn ${this.activeTab === 'ratings' ? 'active' : ''}" data-tab="ratings">
            Avaliações <span class="tab-badge">${(book.reviewsCount > 1000 ? (book.reviewsCount/1000).toFixed(0) + 'k' : book.reviewsCount) || '12k'}</span>
          </button>
          <button class="detail-tab-btn ${this.activeTab === 'reviews' ? 'active' : ''}" data-tab="reviews">
            Resenhas da Comunidade <span class="tab-badge green">${bookReviews.length}</span>
          </button>
        </div>

        <!-- 2-Column Content Layout (Sinopse/Reviews + Sidebar Widgets) -->
        <div class="detail-bottom-2col-layout">
          <!-- Left Main Column -->
          <div class="detail-main-content-col">
            ${tabContentHTML}
          </div>

          <!-- Right Sidebar Column -->
          <div class="detail-sidebar-col">
            <!-- Widget 1: Clubes Ativos -->
            <div class="detail-side-widget-card">
              <div class="side-widget-header-row">
                <div class="side-widget-title-group">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E3932" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <h3 class="side-widget-title">Clubes de Leitura</h3>
                </div>
                <span class="side-widget-badge">Debate ativo</span>
              </div>

              <div class="active-club-card-box">
                <div class="active-club-top">
                  <div class="active-club-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  </div>
                  <div class="active-club-text">
                    <h4 class="active-club-name">Clube dos Apaixonados por Fantasia</h4>
                    <span class="active-club-sub">Debates semanais no fórum</span>
                  </div>
                </div>

                <div class="active-club-bottom-row">
                  <span class="active-club-readers-count">2.400 membros inscritos</span>
                  <button class="btn-participate-club ${store.isClubMember('club-fantasia') ? 'joined' : ''}" id="btn-join-detail-club">
                    ${store.isClubMember('club-fantasia') ? '✓ Inscrito' : 'Participar'}
                  </button>
                </div>
              </div>
            </div>

            <!-- Widget 2: Livros relacionados / continuação -->
            <div class="detail-side-widget-card">
              <div class="side-widget-header-row">
                <h3 class="side-widget-title">Obras Relacionadas</h3>
                <a href="#/search?q=${encodeURIComponent(book.category)}" class="side-widget-view-all">Ver todos</a>
              </div>

              <div class="saga-mini-list">
                ${relatedBooks.map(s => `
                  <div class="saga-mini-item" onclick="location.hash='#/book/${s.id}'" style="cursor: pointer;">
                    <div class="saga-mini-cover-wrap">
                      <img src="${s.cover}" alt="${s.title}" class="saga-mini-cover-img" />
                    </div>
                    <div class="saga-mini-info">
                      <h4 class="saga-mini-title">${s.title}</h4>
                      <span class="saga-mini-meta">${s.author} • ${s.pages || 300} págs</span>
                      <span class="saga-mini-rating">★ ${(s.rating || 4.8).toFixed(1)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container, book);
  },

  bindEvents(container, book) {
    // Read Now button -> open reader
    const readBtn = document.getElementById('btn-detail-read-now');
    if (readBtn) {
      readBtn.onclick = () => ReaderModal.open(book.id);
    }

    // Add to library / borrow button
    const addLibBtn = document.getElementById('btn-detail-add-lib');
    if (addLibBtn) {
      addLibBtn.onclick = () => {
        if (store.isBorrowed(book.id)) {
          store.returnBook(book.id);
          this.render(book.id);
        } else {
          store.borrowBook(book.id);
          this.render(book.id);
        }
      };
    }

    // Quick action buttons
    const wantBtn = document.getElementById('btn-quick-want');
    if (wantBtn) {
      wantBtn.onclick = () => {
        store.toggleWantToRead(book.id);
        this.render(book.id);
      };
    }

    const favBtn = document.getElementById('btn-quick-fav');
    if (favBtn) {
      favBtn.onclick = () => {
        store.toggleFavorite(book.id);
        this.render(book.id);
      };
    }

    const shareBtn = document.getElementById('btn-quick-share');
    if (shareBtn) {
      shareBtn.onclick = () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
        Toast.show(`Link de "${book.title}" copiado para a área de transferência! 🔗`, 'info');
      };
    }

    const editionsBtn = document.getElementById('btn-quick-editions');
    if (editionsBtn) {
      editionsBtn.onclick = () => {
        Toast.show(`Exibindo edições catalogadas para "${book.title}".`, 'info');
        this.activeTab = 'specs';
        this.render(book.id);
      };
    }

    // Tab buttons
    container.querySelectorAll('.detail-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.getAttribute('data-tab');
        this.render(book.id);
      };
    });

    // Synopsis more
    const moreBtn = document.getElementById('btn-synopsis-more');
    if (moreBtn) {
      moreBtn.onclick = () => {
        const p = container.querySelector('.synopsis-content-text p');
        if (p) {
          p.textContent = `${book.synopsis || ''} A obra destaca-se pela construção rica de mundo, arcos dramáticos bem delineados e temas universais como coragem, empatia e persistência humana.`;
          moreBtn.style.display = 'none';
        }
      };
    }

    // Write review button & form toggle
    const writeBtn = document.getElementById('btn-write-review-detail');
    const formWrap = document.getElementById('detail-review-form-wrap');
    const cancelRev = document.getElementById('btn-cancel-detail-rev');
    const submitRev = document.getElementById('btn-submit-detail-rev');

    if (writeBtn && formWrap) {
      writeBtn.onclick = () => {
        formWrap.classList.toggle('hidden');
        if (!formWrap.classList.contains('hidden')) {
          const txt = document.getElementById('detail-review-txt');
          if (txt) txt.focus();
        }
      };
    }

    if (cancelRev && formWrap) {
      cancelRev.onclick = () => formWrap.classList.add('hidden');
    }

    if (submitRev && formWrap) {
      submitRev.onclick = () => {
        const rating = parseFloat(document.getElementById('detail-rating-sel').value);
        const text = document.getElementById('detail-review-txt').value.trim();
        if (!text) {
          Toast.show('Por favor, digite sua resenha antes de enviar.', 'warning');
          return;
        }

        store.addReview({
          bookId: book.id,
          bookTitle: book.title,
          rating,
          content: text
        });

        this.render(book.id);
      };
    }

    // Detail club join
    const joinClub = document.getElementById('btn-join-detail-club');
    if (joinClub) {
      joinClub.onclick = () => {
        const isJoined = store.toggleClub('club-fantasia', 'Clube dos Apaixonados por Fantasia');
        joinClub.classList.toggle('joined', isJoined);
        joinClub.textContent = isJoined ? '✓ Inscrito' : 'Participar';
      };
    }
  }
};

window.BookDetailPage = BookDetailPage;
