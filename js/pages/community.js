/**
 * ============================================================================
 * PAGE: COMUNIDADE DE LEITORES (Full Interactive & Social Experience)
 * ============================================================================
 */

const CommunityPage = {
  activeTab: 'for-you', // 'for-you', 'following', 'popular', 'discussions', 'reviews', 'recommendations'
  searchQuery: '',
  selectedType: 'review', // 'review', 'discussion', 'recommendation', 'quote'
  selectedBookId: 'hp-1',
  selectedRating: 5.0,
  expandedComments: new Set(['rev-1']), // default expand first post for immediate interactivity

  render() {
    const container = document.getElementById('page-container');
    if (!container) return;

    let allPosts = store.getState().userReviews || [];

    // Filter by Tab
    if (this.activeTab === 'following') {
      const following = store.getState().following || [];
      allPosts = allPosts.filter(p => following.includes(p.authorHandle));
    } else if (this.activeTab === 'popular') {
      allPosts = allPosts.filter(p => (p.likes || 0) >= 50);
    } else if (this.activeTab === 'discussions') {
      allPosts = allPosts.filter(p => p.type === 'discussion' || p.topicTitle);
    } else if (this.activeTab === 'reviews') {
      allPosts = allPosts.filter(p => p.type === 'review' || p.rating);
    } else if (this.activeTab === 'recommendations') {
      allPosts = allPosts.filter(p => p.type === 'recommendation' || p.type === 'quote');
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      allPosts = allPosts.filter(p => 
        (p.authorName && p.authorName.toLowerCase().includes(q)) ||
        (p.authorHandle && p.authorHandle.toLowerCase().includes(q)) ||
        (p.bookTitle && p.bookTitle.toLowerCase().includes(q)) ||
        (p.content && p.content.toLowerCase().includes(q)) ||
        (p.topicTitle && p.topicTitle.toLowerCase().includes(q))
      );
    }

    const clubs = APP_DATA.clubs;
    const readers = APP_DATA.readersToFollow;
    const trending = APP_DATA.trendingTopics;
    const allBooks = store.getAllBooks();
    const selectedBook = store.getBook(this.selectedBookId) || allBooks[0];
    const currentUser = store.getState().currentUser;

    container.innerHTML = `
      <div class="community-screen">
        <!-- Community Header Banner & Live Search -->
        <div class="community-hero-header">
          <div class="comm-hero-titles">
            <div class="comm-badge-tag">
              <span class="comm-sparkle">✨</span>
              <span>COMUNIDADE LITERÁRIA VIVA</span>
            </div>
            <h1 class="comm-main-title">Encontros, Debates & Leituras</h1>
            <p class="comm-main-desc">
              Conecte-se com outros leitores, compartilhe resenhas honestas, descubra novos livros e participe dos clubes de leitura.
            </p>
          </div>

          <div class="comm-header-search-wrap">
            <div class="comm-search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                id="comm-search-input" 
                class="comm-search-input" 
                placeholder="Buscar por livro, leitor, resenha ou assunto..."
                value="${this.searchQuery}"
              />
              ${this.searchQuery ? `
                <button class="comm-search-clear" id="btn-clear-comm-search" title="Limpar busca">&times;</button>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Navigation Filter Tabs & Action Button -->
        <div class="community-top-bar">
          <div class="community-tabs-nav">
            <button class="comm-nav-tab ${this.activeTab === 'for-you' ? 'active' : ''}" data-tab="for-you">
              Para você
            </button>
            <button class="comm-nav-tab ${this.activeTab === 'following' ? 'active' : ''}" data-tab="following">
              Seguindo
            </button>
            <button class="comm-nav-tab ${this.activeTab === 'popular' ? 'active' : ''}" data-tab="popular">
              Mais populares
            </button>
            <button class="comm-nav-tab ${this.activeTab === 'discussions' ? 'active' : ''}" data-tab="discussions">
              Discussões
            </button>
            <button class="comm-nav-tab ${this.activeTab === 'reviews' ? 'active' : ''}" data-tab="reviews">
              Resenhas
            </button>
            <button class="comm-nav-tab ${this.activeTab === 'recommendations' ? 'active' : ''}" data-tab="recommendations">
              Recomendações
            </button>
          </div>

          <button class="btn-new-review-pill" id="btn-open-new-review">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Criar publicação</span>
          </button>
        </div>

        <!-- Main 2-Column Community Layout -->
        <div class="community-columns-layout">
          <!-- Left Column: Feed Stream -->
          <div class="community-feed-column">
            <!-- Inline Quick Post Composer Card -->
            <div class="quick-composer-card">
              <div class="quick-composer-top">
                <div class="quick-user-avatar">
                  <span>${currentUser.initials || 'HD'}</span>
                </div>
                <div class="quick-composer-trigger" id="btn-trigger-composer">
                  <span>O que você está lendo ou pensando hoje, ${currentUser.name.split(' ')[0]}?</span>
                </div>
              </div>
              <div class="quick-composer-actions">
                <button class="quick-action-btn" data-type="review">
                  <span>⭐</span> Escrever Resenha
                </button>
                <button class="quick-action-btn" data-type="discussion">
                  <span>💬</span> Iniciar Discussão
                </button>
                <button class="quick-action-btn" data-type="recommendation">
                  <span>💡</span> Recomendar Obra
                </button>
              </div>
            </div>

            <!-- Full Interactive Post Composer Modal (Toggled) -->
            <div id="new-review-modal" class="comm-new-post-form hidden">
              <div class="comm-form-head">
                <div class="form-head-title-group">
                  <h4>Criar Publicação na Comunidade</h4>
                  <span class="form-head-sub">Compartilhe sua jornada literária com outros membros</span>
                </div>
                <button class="close-form-btn" id="btn-close-review-form" title="Fechar">&times;</button>
              </div>

              <!-- Post Type Picker Chips -->
              <div class="composer-type-chips">
                <button class="type-chip ${this.selectedType === 'review' ? 'active' : ''}" data-type="review">
                  <span>⭐</span> Resenha com Nota
                </button>
                <button class="type-chip ${this.selectedType === 'discussion' ? 'active' : ''}" data-type="discussion">
                  <span>💬</span> Tópico de Discussão
                </button>
                <button class="type-chip ${this.selectedType === 'recommendation' ? 'active' : ''}" data-type="recommendation">
                  <span>💡</span> Indicação de Livro
                </button>
                <button class="type-chip ${this.selectedType === 'quote' ? 'active' : ''}" data-type="quote">
                  <span>📜</span> Citação Favorita
                </button>
              </div>

              <!-- Topic Title (if discussion) -->
              <div class="form-group ${this.selectedType === 'discussion' ? '' : 'hidden'}" id="group-topic-title">
                <label>Título do Tópico de Discussão:</label>
                <input type="text" id="comm-topic-title-input" class="form-input" placeholder="Ex: Qual o personagem mais complexo da saga?" />
              </div>

              <!-- Book Selector Dropdown with Live Preview -->
              <div class="form-group">
                <label>Livro Relacionado:</label>
                <div class="book-picker-row">
                  <select id="comm-book-select" class="form-select">
                    <option value="">Nenhum livro específico</option>
                    ${allBooks.map(b => `<option value="${b.id}" ${b.id === this.selectedBookId ? 'selected' : ''}>${b.title} (${b.author})</option>`).join('')}
                  </select>
                </div>

                <!-- Live Selected Book Preview Box -->
                <div id="composer-book-preview" class="composer-live-book-box ${this.selectedBookId ? '' : 'hidden'}">
                  <img src="${selectedBook ? selectedBook.cover : ''}" alt="" class="live-book-thumb" id="live-preview-cover" />
                  <div class="live-book-meta">
                    <span class="live-book-tag" id="live-preview-cat">${selectedBook ? selectedBook.category : ''}</span>
                    <strong class="live-book-title" id="live-preview-title">${selectedBook ? selectedBook.title : ''}</strong>
                    <span class="live-book-author" id="live-preview-author">${selectedBook ? selectedBook.author : ''}</span>
                  </div>
                </div>
              </div>

              <!-- Rating (if review) -->
              <div class="form-group ${this.selectedType === 'review' ? '' : 'hidden'}" id="group-rating-select">
                <label>Sua Nota (1 a 5 estrelas):</label>
                <select id="comm-rating-select" class="form-select">
                  <option value="5">★★★★★ 5.0 (Obra-prima / Incrível)</option>
                  <option value="4.5">★★★★½ 4.5 (Excelente leitura)</option>
                  <option value="4">★★★★☆ 4.0 (Muito bom)</option>
                  <option value="3.5">★★★½☆ 3.5 (Bom livro)</option>
                  <option value="3">★★★☆☆ 3.0 (Regular / Razoável)</option>
                </select>
              </div>

              <!-- Content Textarea -->
              <div class="form-group">
                <label>Seu Texto / Opinião:</label>
                <textarea 
                  id="comm-review-text" 
                  class="form-textarea" 
                  placeholder="Escreva suas impressões, análises sem spoilers ou reflexões sobre a leitura..."
                  rows="4"
                ></textarea>
              </div>

              <!-- Actions -->
              <div class="comm-form-actions">
                <button class="btn btn-outline" id="btn-cancel-review-form">Cancelar</button>
                <button class="btn btn-primary" id="btn-submit-review-form">
                  <span>Publicar no Feed</span>
                </button>
              </div>
            </div>

            <!-- Feed Stream List -->
            <div class="feed-cards-container">
              ${allPosts.length === 0 ? `
                <div class="empty-feed-card">
                  <div class="empty-icon">📖</div>
                  <h3>Nenhuma publicação encontrada</h3>
                  <p>Não encontramos publicações para o filtro selecionado. Que tal ser o primeiro a compartilhar?</p>
                  <button class="btn btn-primary" onclick="document.getElementById('btn-open-new-review').click()">
                    Criar primeira publicação
                  </button>
                </div>
              ` : allPosts.map(post => {
                const book = post.bookId ? store.getBook(post.bookId) : null;
                const isLiked = store.isPostLiked(post.id);
                const comments = post.comments || [];
                const isCommentsExpanded = this.expandedComments.has(post.id);

                return `
                  <div class="feed-post-card" data-id="${post.id}">
                    <!-- Post Header -->
                    <div class="feed-post-header">
                      <div class="feed-author-block">
                        <div 
                          class="feed-avatar-initials ${post.authorInitials === 'AL' ? 'mint' : (post.authorInitials === 'CB' ? 'emerald' : 'warm')}"
                          onclick="location.hash='#/profile?user=${encodeURIComponent(post.authorHandle)}'"
                          title="Ver perfil de ${post.authorName}"
                        >
                          ${post.authorInitials || post.authorName.slice(0, 2).toUpperCase()}
                        </div>
                        <div class="feed-author-meta">
                          <div class="author-row-top">
                            <span class="feed-author-name" onclick="location.hash='#/profile?user=${encodeURIComponent(post.authorHandle)}'">
                              ${post.authorName}
                            </span>
                            ${post.authorHandle === '@carolinabatimarco' || post.authorHandle === '@helenaduarte' || post.authorHandle === '@marianacosta' ? `
                              <span class="verified-icon" title="Leitor Verificado">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#1E3932"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                              </span>
                            ` : ''}
                            <span class="feed-author-handle" onclick="location.hash='#/profile?user=${encodeURIComponent(post.authorHandle)}'">${post.authorHandle}</span>
                          </div>
                          <span class="feed-author-action">${post.action || 'compartilhou na comunidade'}</span>
                        </div>
                      </div>

                      <div class="feed-post-top-right">
                        <span class="feed-post-time">${post.time || 'há 2h'}</span>
                        <button class="btn-post-dots" title="Opções" onclick="Toast.show('Link da publicação copiado! 📋', 'info')">···</button>
                      </div>
                    </div>

                    <!-- Topic Heading (if discussion) -->
                    ${post.topicTitle ? `
                      <h3 class="feed-topic-heading">${post.topicTitle}</h3>
                    ` : ''}

                    <!-- Post Body Text -->
                    <div class="feed-post-text-wrap">
                      <p class="feed-post-text">"${post.content}"</p>
                    </div>

                    <!-- Rating Stars (if review) -->
                    ${post.rating ? `
                      <div class="feed-stars-row">
                        ${BookCard.renderStars(post.rating, 14)}
                        <span class="feed-stars-score">${Number(post.rating).toFixed(1)} / 5.0</span>
                      </div>
                    ` : ''}

                    <!-- Linked Book Preview Card -->
                    ${book ? `
                      <div class="feed-book-preview" onclick="location.hash='#/book/${book.id}'" title="Ver detalhes de ${book.title}">
                        <div class="preview-cover-box">
                          <img src="${book.cover}" alt="${book.title}" class="preview-cover-thumb" />
                        </div>
                        <div class="preview-text-box">
                          <div class="preview-top-tags">
                            <span class="preview-cat-badge">${book.category}</span>
                            ${book.rating ? `<span class="preview-rating-star">★ ${book.rating.toFixed(1)}</span>` : ''}
                          </div>
                          <h4 class="preview-book-title">${book.title}</h4>
                          <span class="preview-book-author">${book.author}</span>
                          <span class="preview-details-link">Ver ficha e ler amostra &rarr;</span>
                        </div>
                      </div>
                    ` : (post.bookTitle ? `
                      <div class="feed-book-preview text-only" onclick="location.hash='#/search?q=${encodeURIComponent(post.bookTitle)}'">
                        <div class="preview-text-box">
                          <h4 class="preview-book-title">📖 ${post.bookTitle}</h4>
                          <span class="preview-book-author">${post.bookAuthor || ''}</span>
                        </div>
                      </div>
                    ` : '')}

                    <!-- Action Bar (Likes, Comments Toggle, Share) -->
                    <div class="feed-post-footer">
                      <button class="feed-action-btn like-btn ${isLiked ? 'liked' : ''}" data-id="${post.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? '#E11D48' : 'none'}" stroke="${isLiked ? '#E11D48' : 'currentColor'}" stroke-width="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="feed-count">${post.likes || 0}</span>
                        <span>${post.likes === 1 ? 'curtida' : 'curtidas'}</span>
                      </button>

                      <button class="feed-action-btn comment-btn ${isCommentsExpanded ? 'active' : ''}" data-id="${post.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span class="comments-count">${comments.length}</span>
                        <span>${comments.length === 1 ? 'comentário' : 'comentários'}</span>
                      </button>

                      <button class="feed-action-btn share-btn" data-id="${post.id}" title="Compartilhar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    <!-- Expandable Comments Section -->
                    <div class="feed-comments-section ${isCommentsExpanded ? '' : 'hidden'}" id="comments-section-${post.id}">
                      <!-- List of Comments -->
                      <div class="comments-list">
                        ${comments.length === 0 ? `
                          <div class="no-comments-yet">
                            <span>Seja o primeiro a comentar nesta publicação!</span>
                          </div>
                        ` : comments.map(c => `
                          <div class="comment-bubble-item">
                            <div 
                              class="comment-author-avatar"
                              onclick="location.hash='#/profile?user=${encodeURIComponent(c.authorHandle)}'"
                              title="${c.authorName}"
                            >
                              ${c.authorInitials || (c.authorName ? c.authorName.slice(0, 2).toUpperCase() : 'LT')}
                            </div>
                            <div class="comment-bubble-body">
                              <div class="comment-header-row">
                                <span class="comment-author-name" onclick="location.hash='#/profile?user=${encodeURIComponent(c.authorHandle)}'">${c.authorName}</span>
                                <span class="comment-time">${c.time}</span>
                              </div>
                              <p class="comment-text">${c.text}</p>
                            </div>
                          </div>
                        `).join('')}
                      </div>

                      <!-- Inline Write Comment Box -->
                      <div class="comment-input-row">
                        <div class="comment-user-avatar-mini">
                          <span>${currentUser.initials || 'HD'}</span>
                        </div>
                        <input 
                          type="text" 
                          class="comment-text-input" 
                          placeholder="Escreva uma resposta para ${post.authorName.split(' ')[0]}..." 
                          data-id="${post.id}"
                        />
                        <button class="btn-send-comment" data-id="${post.id}">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right Column: Community Sidebar Widgets -->
          <div class="community-sidebar-column">
            <!-- Widget 1: Encontrar Leitores -->
            <div class="comm-side-card">
              <div class="comm-side-header">
                <h3 class="comm-side-title">Encontrar Leitores</h3>
                <a href="#/community" class="comm-side-link" onclick="CommunityPage.activeTab='following'; CommunityPage.render();">Ver todos</a>
              </div>
              <p class="comm-side-sub">Pessoas que podem gostar das mesmas coisas que você</p>

              <div class="comm-readers-list">
                ${readers.map(r => {
                  const isFol = store.isFollowing(r.handle);
                  return `
                    <div class="comm-reader-item">
                      <div 
                        class="comm-reader-avatar ${r.initials === 'PL' ? 'blue' : (r.initials === 'JB' ? 'purple' : (r.initials === 'CB' ? 'emerald' : 'pink'))}"
                        onclick="location.hash='#/profile?user=${encodeURIComponent(r.handle)}'"
                        title="Ver perfil de ${r.name}"
                      >
                        ${r.initials}
                      </div>
                      <div class="comm-reader-info">
                        <span class="comm-reader-name" onclick="location.hash='#/profile?user=${encodeURIComponent(r.handle)}'">${r.name}</span>
                        <span class="comm-reader-handle" onclick="location.hash='#/profile?user=${encodeURIComponent(r.handle)}'">${r.handle}</span>
                        <span class="comm-reader-common">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                          </svg>
                          ${r.commonBooks}
                        </span>
                      </div>
                      <button class="btn-side-follow ${isFol ? 'following' : ''}" data-handle="${r.handle}" data-name="${r.name}">
                        ${isFol ? 'Seguindo' : 'Seguir'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Widget 2: Clubes de Leitura Ativos -->
            <div class="comm-side-card">
              <div class="comm-side-header">
                <h3 class="comm-side-title">Clubes de Leitura Ativos</h3>
                <span class="comm-side-badge">${clubs.length} ativos</span>
              </div>

              <div class="comm-clubs-list">
                ${clubs.slice(0, 3).map(club => {
                  const isMember = store.isClubMember(club.id);
                  return `
                    <div class="comm-club-box">
                      <h4 class="comm-club-name">${club.name}</h4>
                      <span class="comm-club-meta">${club.activity}</span>
                      <div class="comm-club-bottom">
                        <span class="comm-club-curr">${club.readingSpan}</span>
                        <button class="btn-side-join ${isMember ? 'joined' : ''}" data-club="${club.id}" data-name="${club.name}">
                          ${isMember ? '✓ Inscrito' : 'Entrar'}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Widget 3: Tópicos Literários em Alta -->
            <div class="comm-side-card">
              <div class="comm-side-header">
                <h3 class="comm-side-title">Tópicos em Alta</h3>
              </div>
              <div class="trending-tags-cloud">
                ${trending.map(t => `
                  <button class="trending-tag-pill" data-query="${t.tag.replace('#', '')}">
                    <span class="tag-name">${t.tag}</span>
                    <span class="tag-count">${t.count}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Widget 4: Mini Footer Links -->
            <div class="comm-mini-footer">
              <div class="mini-footer-links">
                <a href="#/">Sobre nós</a> &bull;
                <a href="#/">Diretrizes</a> &bull;
                <a href="#/">Termos</a> &bull;
                <a href="#/">Privacidade</a>
              </div>
              <span class="mini-footer-copy">&copy; 2025 Livraria Viva. Todos os direitos reservados.</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  bindEvents(container) {
    // Navigation Tabs
    container.querySelectorAll('.comm-nav-tab').forEach(tab => {
      tab.onclick = () => {
        this.activeTab = tab.getAttribute('data-tab');
        this.render();
      };
    });

    // Search Input
    const searchInput = document.getElementById('comm-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.render();
        const fresh = document.getElementById('comm-search-input');
        if (fresh) {
          fresh.focus();
          fresh.setSelectionRange(this.searchQuery.length, this.searchQuery.length);
        }
      };
    }

    const clearSearch = document.getElementById('btn-clear-comm-search');
    if (clearSearch) {
      clearSearch.onclick = () => {
        this.searchQuery = '';
        this.render();
      };
    }

    // Quick Composer Triggers
    const triggerComposer = document.getElementById('btn-trigger-composer');
    const openBtn = document.getElementById('btn-open-new-review');
    const modal = document.getElementById('new-review-modal');
    const closeBtn = document.getElementById('btn-close-review-form');
    const cancelBtn = document.getElementById('btn-cancel-review-form');
    const submitBtn = document.getElementById('btn-submit-review-form');

    const openComposer = (type = 'review') => {
      this.selectedType = type;
      if (modal) {
        modal.classList.remove('hidden');
        this.updateComposerUI(modal);
        const textarea = document.getElementById('comm-review-text');
        if (textarea) textarea.focus();
      }
    };

    if (triggerComposer) triggerComposer.onclick = () => openComposer('review');
    if (openBtn) openBtn.onclick = () => openComposer('review');

    container.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.onclick = () => {
        const type = btn.getAttribute('data-type');
        openComposer(type);
      };
    });

    if (closeBtn && modal) closeBtn.onclick = () => modal.classList.add('hidden');
    if (cancelBtn && modal) cancelBtn.onclick = () => modal.classList.add('hidden');

    // Type Chips in Composer
    container.querySelectorAll('.type-chip').forEach(chip => {
      chip.onclick = () => {
        this.selectedType = chip.getAttribute('data-type');
        this.updateComposerUI(modal);
      };
    });

    // Book Select in Composer
    const bookSelect = document.getElementById('comm-book-select');
    if (bookSelect) {
      bookSelect.onchange = (e) => {
        this.selectedBookId = e.target.value;
        const previewBox = document.getElementById('composer-book-preview');
        const book = store.getBook(this.selectedBookId);
        if (book && previewBox) {
          previewBox.classList.remove('hidden');
          document.getElementById('live-preview-cover').src = book.cover;
          document.getElementById('live-preview-cat').textContent = book.category;
          document.getElementById('live-preview-title').textContent = book.title;
          document.getElementById('live-preview-author').textContent = book.author;
        } else if (previewBox) {
          previewBox.classList.add('hidden');
        }
      };
    }

    // Submit New Post
    if (submitBtn) {
      submitBtn.onclick = () => {
        const content = document.getElementById('comm-review-text').value;
        const topicTitle = document.getElementById('comm-topic-title-input')?.value || '';
        const rating = document.getElementById('comm-rating-select')?.value || null;
        const bookId = document.getElementById('comm-book-select')?.value || null;

        const newPost = store.createCommunityPost({
          type: this.selectedType,
          content,
          bookId,
          rating: this.selectedType === 'review' ? rating : null,
          topicTitle
        });

        if (newPost) {
          modal.classList.add('hidden');
          this.render();
        }
      };
    }

    // Like Button Toggle with State & Counter
    container.querySelectorAll('.feed-action-btn.like-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const postId = btn.getAttribute('data-id');
        const isNowLiked = store.toggleLikePost(postId);
        this.render();
      };
    });

    // Comments Toggle Button
    container.querySelectorAll('.feed-action-btn.comment-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const postId = btn.getAttribute('data-id');
        if (this.expandedComments.has(postId)) {
          this.expandedComments.delete(postId);
        } else {
          this.expandedComments.add(postId);
        }
        this.render();
        const input = container.querySelector(`.comment-text-input[data-id="${postId}"]`);
        if (input && this.expandedComments.has(postId)) {
          input.focus();
        }
      };
    });

    // Share Button
    container.querySelectorAll('.feed-action-btn.share-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const postId = btn.getAttribute('data-id');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${window.location.origin}/#/community`);
        }
        Toast.show('Link da publicação copiado para a área de transferência! 🔗', 'info');
      };
    });

    // Add Comment Handlers (Send button + Enter key)
    const handleSendComment = (postId) => {
      const input = container.querySelector(`.comment-text-input[data-id="${postId}"]`);
      if (input && input.value.trim()) {
        store.addPostComment(postId, input.value);
        this.render();
      }
    };

    container.querySelectorAll('.btn-send-comment').forEach(btn => {
      btn.onclick = () => {
        const postId = btn.getAttribute('data-id');
        handleSendComment(postId);
      };
    });

    container.querySelectorAll('.comment-text-input').forEach(input => {
      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          const postId = input.getAttribute('data-id');
          handleSendComment(postId);
        }
      };
    });

    // Follow / Unfollow Readers
    container.querySelectorAll('.btn-side-follow').forEach(btn => {
      btn.onclick = () => {
        const handle = btn.getAttribute('data-handle');
        const name = btn.getAttribute('data-name');
        store.toggleFollow(handle, name);
        this.render();
      };
    });

    // Join / Leave Clubs
    container.querySelectorAll('.btn-side-join').forEach(btn => {
      btn.onclick = () => {
        const clubId = btn.getAttribute('data-club');
        const name = btn.getAttribute('data-name');
        store.toggleClub(clubId, name);
        this.render();
      };
    });

    // Trending Hashtags Filter
    container.querySelectorAll('.trending-tag-pill').forEach(pill => {
      pill.onclick = () => {
        const q = pill.getAttribute('data-query');
        this.searchQuery = q;
        this.render();
      };
    });
  },

  updateComposerUI(modal) {
    if (!modal) return;
    modal.querySelectorAll('.type-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-type') === this.selectedType);
    });

    const topicGroup = document.getElementById('group-topic-title');
    const ratingGroup = document.getElementById('group-rating-select');
    const textarea = document.getElementById('comm-review-text');

    if (topicGroup) topicGroup.classList.toggle('hidden', this.selectedType !== 'discussion');
    if (ratingGroup) ratingGroup.classList.toggle('hidden', this.selectedType !== 'review');

    if (textarea) {
      if (this.selectedType === 'review') {
        textarea.placeholder = 'O que você achou dos personagens, da escrita e do ritmo? Conte suas impressões...';
      } else if (this.selectedType === 'discussion') {
        textarea.placeholder = 'Apresente sua dúvida ou tese para debater com outros leitores...';
      } else if (this.selectedType === 'recommendation') {
        textarea.placeholder = 'Por que você recomenda este livro? Para que tipo de leitor ele é perfeito?';
      } else if (this.selectedType === 'quote') {
        textarea.placeholder = 'Digite a passagem marcante e por que ela tocou você...';
      }
    }
  }
};

window.CommunityPage = CommunityPage;
