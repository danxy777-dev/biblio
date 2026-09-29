/**
 * ============================================================================
 * PAGE: PERFIL DO LEITOR (Dynamic Profile for Any Community User)
 * ============================================================================
 */

const ProfilePage = {
  activeProfileTab: 'shelf', // 'shelf', 'reviews', 'clubs'

  render(userHandle = null) {
    const container = document.getElementById('page-container');
    if (!container) return;

    const currentUser = store.getState().currentUser;
    const targetHandle = userHandle || currentUser.handle;
    const profile = store.getUserProfile(targetHandle);
    const isFollowing = store.isFollowing(profile.handle);
    const isSelf = profile.handle === currentUser.handle;

    // Get books for this user shelf
    const shelfBooks = (profile.shelfBooks || []).map(item => {
      const bookData = store.getBook(item.id);
      return {
        ...item,
        cover: bookData ? bookData.cover : (APP_DATA.books[0]?.cover || '')
      };
    });

    // Get reviews / posts authored by this user
    const userPosts = (store.getState().userReviews || []).filter(p => p.authorHandle === profile.handle);

    // Reading goal info
    const goal = isSelf ? currentUser.readingGoal : { current: 18, target: 24, percentage: 75, year: 2025 };

    container.innerHTML = `
      <div class="profile-screen">
        <!-- Breadcrumb Bar with Back Navigation -->
        <div class="profile-breadcrumb-bar">
          <div class="profile-breadcrumbs">
            <a href="#/">Início</a>
            <span class="p-sep">/</span>
            <a href="#/community">Comunidade</a>
            <span class="p-sep">/</span>
            <span class="p-curr">${profile.name}</span>
          </div>

          <div class="profile-top-actions">
            <button class="p-back-btn" onclick="location.hash='#/community'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Voltar para Comunidade</span>
            </button>
            <button class="p-icon-btn" title="Compartilhar Perfil" id="btn-share-profile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Reader Profile Card -->
        <div class="reader-profile-card">
          <div class="reader-card-top-row">
            <div class="reader-avatar-container">
              <img src="${profile.avatar}" alt="${profile.name}" class="reader-photo-lg" />
              <span class="reader-online-dot"></span>
            </div>

            <div class="reader-info-container">
              <div class="reader-name-buttons-row">
                <div class="reader-names-group">
                  <div class="reader-name-verified">
                    <h1 class="reader-full-name">${profile.name}</h1>
                    ${profile.verified ? `
                      <span class="verified-check-badge" title="Leitor Verificado">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#1E3932">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </span>
                    ` : ''}
                  </div>
                  <span class="reader-handle-text">${profile.handle} • ${profile.role || 'Leitor Apaixonado'}</span>
                </div>

                ${!isSelf ? `
                  <div class="reader-action-buttons">
                    <button class="btn-profile-follow ${isFollowing ? 'following' : ''}" id="btn-toggle-follow-profile">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                      <span>${isFollowing ? '✓ Seguindo' : 'Seguir'}</span>
                    </button>

                    <button class="btn-profile-msg" id="btn-msg-profile">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>Mensagem</span>
                    </button>
                  </div>
                ` : `
                  <div class="reader-action-buttons">
                    <button class="btn-profile-edit" id="btn-open-edit-profile">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      <span>Editar Perfil</span>
                    </button>
                  </div>
                `}
              </div>

              <p class="reader-bio-paragraph">${profile.bio}</p>

              <!-- 4-Item Stats Quad -->
              <div class="reader-stats-quad">
                <div class="r-stat-cell">
                  <span class="r-stat-number">${profile.stats.readBooks}</span>
                  <span class="r-stat-tag">Livros lidos</span>
                </div>
                <div class="r-stat-cell">
                  <span class="r-stat-number">${profile.stats.reviews}</span>
                  <span class="r-stat-tag">Resenhas</span>
                </div>
                <div class="r-stat-cell">
                  <span class="r-stat-number">${profile.stats.followers}</span>
                  <span class="r-stat-tag">Seguidores</span>
                </div>
                <div class="r-stat-cell">
                  <span class="r-stat-number">${profile.stats.following}</span>
                  <span class="r-stat-tag">Seguindo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Livros lidos & Estante recente -->
        <section class="reader-shelf-section">
          <div class="reader-shelf-header">
            <div class="shelf-title-wrap">
              <span class="shelf-book-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </span>
              <h2 class="reader-shelf-title">Estante & Leituras de ${profile.name.split(' ')[0]}</h2>
              <span class="shelf-total-badge">${shelfBooks.length} obras</span>
            </div>
            <a href="#/catalog" class="shelf-view-all">Explorar acervo completo &rarr;</a>
          </div>

          <div class="reader-books-5col-grid">
            ${shelfBooks.length === 0 ? `
              <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: #94A3B8; background: #FAF9F5; border-radius: 12px;">
                Nenhum livro catalogado na estante no momento.
              </div>
            ` : shelfBooks.map(b => `
              <div class="shelf-book-mini-card" onclick="location.hash='#/book/${b.id}'">
                <div class="mini-cover-frame">
                  <img src="${b.cover}" alt="${b.title}" class="mini-cover-img" />
                  ${b.tagBadge ? `<span class="cover-tag-reading">${b.tagBadge}</span>` : ''}
                  ${b.ratingBadge ? `<span class="cover-rating-pill">${b.ratingBadge}</span>` : ''}
                </div>
                <h4 class="mini-book-title">${b.title}</h4>
                <span class="mini-book-author">${b.author}</span>
                <span class="mini-book-date">${b.dateOrProgress}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Bottom Grid: Resenhas e Publicações (Left) + Clubes & Metas (Right) -->
        <div class="profile-bottom-layout">
          <!-- Left: Resenhas recentes -->
          <div class="profile-reviews-col">
            <div class="reviews-col-header">
              <div class="rev-header-left">
                <span class="rev-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </span>
                <h2 class="reviews-col-title">Publicações & Resenhas no Feed</h2>
              </div>
              <span class="rev-count-badge">${userPosts.length} registradas</span>
            </div>

            <div class="profile-reviews-feed">
              ${userPosts.length === 0 ? `
                <div class="profile-review-box">
                  <p class="rev-item-body" style="color: #94A3B8; font-style: italic;">
                    Este leitor ainda não publicou resenhas no feed público.
                  </p>
                </div>
              ` : userPosts.map(post => {
                const book = post.bookId ? store.getBook(post.bookId) : null;
                return `
                  <div class="profile-review-box">
                    <div class="rev-item-top">
                      <img src="${profile.avatar}" alt="" class="rev-item-avatar" />
                      <div class="rev-item-meta">
                        <h4 class="rev-item-book" onclick="${book ? `location.hash='#/book/${book.id}'` : ''}">
                          ${post.bookTitle || post.topicTitle || 'Publicação Literária'}
                        </h4>
                        ${post.rating ? `
                          <div class="rev-stars-row">
                            ${BookCard.renderStars(post.rating, 13)}
                            <span class="rev-stars-text">${post.rating.toFixed(1)} / 5.0</span>
                          </div>
                        ` : ''}
                      </div>
                      <span class="rev-item-date">${post.time || 'recente'}</span>
                    </div>
                    <p class="rev-item-body">
                      "${post.content}"
                    </p>
                    <div class="rev-item-footer">
                      <span class="rev-publisher-tag">${post.bookAuthor || 'Livraria Viva'}</span>
                      <div class="rev-social-stats">
                        <span>❤️ ${post.likes || 0} curtidas</span>
                        <span>💬 ${(post.comments || []).length} comentários</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Clubes de Leitura & Gêneros Favoritos & Meta -->
          <div class="profile-side-col">
            <!-- Widget 1: Meta de Leitura -->
            <div class="p-side-widget-card">
              <div class="p-widget-title-row">
                <span class="p-widget-icon">🎯</span>
                <h3 class="p-widget-title">Meta de Leitura (${goal.year || 2025})</h3>
              </div>
              <div style="margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px; font-weight: 600;">
                  <span>${goal.current} de ${goal.target} livros</span>
                  <span style="color: var(--color-primary);">${goal.percentage}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: var(--color-border); border-radius: 4px; overflow: hidden;">
                  <div style="width: ${goal.percentage}%; height: 100%; background: var(--color-primary); border-radius: 4px;"></div>
                </div>
              </div>
            </div>

            <!-- Widget 2: Clubes de Leitura -->
            <div class="p-side-widget-card">
              <div class="p-widget-title-row">
                <span class="p-widget-icon">👥</span>
                <h3 class="p-widget-title">Clubes de Leitura</h3>
              </div>

              <div class="p-clubs-list">
                <div class="p-club-card-item" onclick="location.hash='#/community'">
                  <div class="p-club-icon-wrap green">🪄</div>
                  <div class="p-club-info-wrap">
                    <h4 class="p-club-title">Clube dos Apaixonados por Fantasia</h4>
                    <span class="p-club-meta">2.4k membros &bull; Livro: O Nome do Vento</span>
                  </div>
                </div>

                <div class="p-club-card-item" onclick="location.hash='#/community'">
                  <div class="p-club-icon-wrap gold">🏛️</div>
                  <div class="p-club-info-wrap">
                    <h4 class="p-club-title">Clube Machado de Assis</h4>
                    <span class="p-club-meta">1.8k membros &bull; Livro: Dom Casmurro</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Widget 3: Gêneros Favoritos -->
            <div class="p-side-widget-card">
              <div class="p-widget-title-row">
                <span class="p-widget-icon">🏷️</span>
                <h3 class="p-widget-title">Gêneros Favoritos</h3>
              </div>

              <div class="p-genres-pill-cloud">
                ${(profile.favoriteGenres || ['Fantasia', 'Ficção', 'Literatura Brasileira']).map(g => `
                  <button class="genre-tag-pill" onclick="location.hash='#/search?q=${encodeURIComponent(g)}'">${g}</button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal Dialog (for current user) -->
      ${isSelf ? `
        <div id="modal-edit-profile" class="edit-profile-modal-overlay hidden">
          <div class="edit-profile-dialog">
            <div class="edit-profile-head">
              <h3>Editar Perfil do Leitor</h3>
              <button class="edit-profile-close" id="btn-close-edit-modal">&times;</button>
            </div>
            <div class="edit-profile-body">
              <div class="form-group">
                <label>Nome Completo:</label>
                <input type="text" id="edit-user-name" class="form-input" value="${currentUser.name}" />
              </div>
              <div class="form-group">
                <label>Biografia / Sobre você:</label>
                <textarea id="edit-user-bio" class="form-textarea" rows="3">${currentUser.bio || ''}</textarea>
              </div>
              <div class="form-group">
                <label>Meta Anual de Livros (${currentUser.readingGoal.year}):</label>
                <input type="number" id="edit-user-target" class="form-input" value="${currentUser.readingGoal.target}" min="1" max="100" />
              </div>
            </div>
            <div class="edit-profile-footer">
              <button class="btn btn-outline" id="btn-cancel-edit-profile">Cancelar</button>
              <button class="btn btn-primary" id="btn-save-edit-profile">Salvar Alterações</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;

    this.bindEvents(container, profile, isSelf);
  },

  bindEvents(container, profile, isSelf) {
    const followBtn = document.getElementById('btn-toggle-follow-profile');
    const msgBtn = document.getElementById('btn-msg-profile');
    const shareBtn = document.getElementById('btn-share-profile');

    if (shareBtn) {
      shareBtn.onclick = () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
        Toast.show(`Link do perfil de ${profile.name} copiado! 🔗`, 'info');
      };
    }

    if (followBtn) {
      followBtn.onclick = () => {
        const following = store.toggleFollow(profile.handle, profile.name);
        followBtn.classList.toggle('following', following);
        followBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
          <span>${following ? '✓ Seguindo' : 'Seguir'}</span>
        `;
      };
    }

    if (msgBtn) {
      msgBtn.onclick = () => {
        const message = prompt(`Envie uma mensagem direta para ${profile.name}:`);
        if (message && message.trim()) {
          Toast.show(`Mensagem enviada para ${profile.name}! 💬`, 'success');
        }
      };
    }

    // Edit Profile Modal Handling
    if (isSelf) {
      const openEditBtn = document.getElementById('btn-open-edit-profile');
      const modal = document.getElementById('modal-edit-profile');
      const closeEditBtn = document.getElementById('btn-close-edit-modal');
      const cancelEditBtn = document.getElementById('btn-cancel-edit-profile');
      const saveEditBtn = document.getElementById('btn-save-edit-profile');

      if (openEditBtn && modal) {
        openEditBtn.onclick = () => modal.classList.remove('hidden');
      }
      if (closeEditBtn && modal) {
        closeEditBtn.onclick = () => modal.classList.add('hidden');
      }
      if (cancelEditBtn && modal) {
        cancelEditBtn.onclick = () => modal.classList.add('hidden');
      }
      if (saveEditBtn && modal) {
        saveEditBtn.onclick = () => {
          const name = document.getElementById('edit-user-name').value;
          const bio = document.getElementById('edit-user-bio').value;
          const target = document.getElementById('edit-user-target').value;

          store.updateUserProfile({ name, bio, target });
          modal.classList.add('hidden');
          Header.render();
          Sidebar.render('/profile');
          this.render();
        };
      }
    }
  }
};

window.ProfilePage = ProfilePage;
