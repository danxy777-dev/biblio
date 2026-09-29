/**
 * ============================================================================
 * PAGE: MEUS LIVROS (Print 1 - Exact Layout & Content)
 * ============================================================================
 */

const MyBooksPage = {
  activeShelfTab: 'reading', // 'reading', 'want-to-read', 'completed', 'favorites', 'downloaded'

  render() {
    const container = document.getElementById('page-container');
    if (!container) return;

    const state = store.getState();
    const allBooks = store.getAllBooks();
    const readingMap = state.readingProgress || {};
    const borrowedList = state.borrowedBooks || [];
    const favoritesList = state.favorites || [];
    const wantList = state.wantToRead || [];
    const customLists = state.customLists || APP_DATA.thematicLists;

    // 1. Reading (in progress, percent < 100)
    const readingBooks = allBooks.filter(b => {
      const prog = readingMap[b.id];
      return prog && !prog.completed && prog.percent < 100;
    });

    // 2. Want to Read
    const wantToReadBooks = allBooks.filter(b => wantList.includes(b.id));

    // 3. Completed
    const completedBooks = allBooks.filter(b => {
      const prog = readingMap[b.id];
      return prog && (prog.completed || prog.percent >= 100);
    });

    // 4. Favorites
    const favoriteBooks = allBooks.filter(b => favoritesList.includes(b.id));

    // 5. Downloaded / Borrowed
    const borrowedBooks = borrowedList.map(item => {
      const book = store.getBook(item.bookId);
      return book ? { ...book, loanInfo: item } : null;
    }).filter(Boolean);

    // Active Tab count and list determination
    let currentTabList = [];
    let currentTabTitle = '';
    let emptyMessage = '';

    if (this.activeShelfTab === 'reading') {
      currentTabList = readingBooks;
      currentTabTitle = 'Em andamento';
      emptyMessage = 'Você não possui leituras ativas no momento. Que tal escolher uma obra no catálogo?';
    } else if (this.activeShelfTab === 'want-to-read') {
      currentTabList = wantToReadBooks;
      currentTabTitle = 'Quero Ler';
      emptyMessage = 'Nenhum livro marcado como "Quero Ler". Clique em "Quero ler" na página de qualquer livro para organizar sua lista de desejos.';
    } else if (this.activeShelfTab === 'completed') {
      currentTabList = completedBooks;
      currentTabTitle = 'Leituras Concluídas';
      emptyMessage = 'Nenhum livro concluído ainda. Ao terminar suas leituras, elas ficarão salvas no seu histórico de conquistas!';
    } else if (this.activeShelfTab === 'favorites') {
      currentTabList = favoriteBooks;
      currentTabTitle = 'Livros Favoritos';
      emptyMessage = 'Você ainda não favoritou nenhum livro. Clique no coração em qualquer card para guardar seus títulos preferidos.';
    } else if (this.activeShelfTab === 'downloaded') {
      currentTabList = borrowedBooks;
      currentTabTitle = 'Empréstimos Ativos';
      emptyMessage = 'Você não possui nenhum empréstimo ativo no momento. Todo o acervo digital está livre para retirada!';
    }

    const historyItems = APP_DATA.readingHistory || [];

    container.innerHTML = `
      <div class="my-books-screen">
        <!-- Top Header & Action Controls -->
        <div class="my-books-top-header">
          <div class="my-books-title-group">
            <h1 class="my-books-main-heading">Meus Livros</h1>
            <p class="my-books-sub-heading">Acompanhe suas leituras atuais, organize listas e explore seu progresso literário na biblioteca.</p>
          </div>

          <div class="my-books-top-buttons">
            <button class="btn-shelf-action" id="btn-shelf-explore" onclick="location.hash='#/catalog'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Explorar Acervo</span>
            </button>
            <button class="btn-shelf-action" id="btn-shelf-scan" onclick="location.hash='#/scanner'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span>Escanear pela Câmera</span>
            </button>
          </div>
        </div>

        <!-- Filter Tabs / Pills Row with Dynamic Counters -->
        <div class="my-books-pills-row">
          <button class="shelf-pill-btn ${this.activeShelfTab === 'reading' ? 'active' : ''}" data-tab="reading">
            Lendo (${readingBooks.length})
          </button>
          <button class="shelf-pill-btn ${this.activeShelfTab === 'want-to-read' ? 'active' : ''}" data-tab="want-to-read">
            Quero ler (${wantToReadBooks.length})
          </button>
          <button class="shelf-pill-btn ${this.activeShelfTab === 'completed' ? 'active' : ''}" data-tab="completed">
            Concluídos (${completedBooks.length})
          </button>
          <button class="shelf-pill-btn ${this.activeShelfTab === 'favorites' ? 'active' : ''}" data-tab="favorites">
            Favoritos (${favoriteBooks.length})
          </button>
          <button class="shelf-pill-btn ${this.activeShelfTab === 'downloaded' ? 'active' : ''}" data-tab="downloaded">
            Emprestados (${borrowedBooks.length})
          </button>
        </div>

        <!-- Section: Active Shelf Tab Cards List -->
        <section class="in-progress-section">
          <div class="in-progress-header">
            <h2 class="in-progress-title">${currentTabTitle}</h2>
            <span class="in-progress-count">${currentTabList.length} título${currentTabList.length === 1 ? '' : 's'}</span>
          </div>

          <div class="in-progress-cards-list">
            ${currentTabList.length === 0 ? `
              <div class="empty-shelf-box" style="padding: 40px 24px; text-align: center; background: #FAF9F5; border-radius: 16px; border: 1px dashed var(--color-border);">
                <div style="font-size: 32px; margin-bottom: 12px;">📚</div>
                <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-dark); margin-bottom: 8px;">Lista Vazia</h3>
                <p style="color: var(--color-text-secondary); max-width: 480px; margin: 0 auto 20px;">${emptyMessage}</p>
                <button class="btn btn-primary" onclick="location.hash='#/catalog'">Explorar Catálogo de Livros</button>
              </div>
            ` : currentTabList.map(book => {
              const prog = store.getProgress(book.id) || { page: 1, total: book.pages || 300, percent: 1, lastRead: 'Recentemente' };
              const isFav = store.isFavorite(book.id);

              return `
                <div class="in-progress-card-row" data-id="${book.id}">
                  <div class="ip-cover-wrap" onclick="location.hash='#/book/${book.id}'" style="cursor: pointer;">
                    <img src="${book.cover}" alt="${book.title}" class="ip-cover-img" />
                  </div>

                  <div class="ip-info-col">
                    <span class="ip-category-tag">${book.category.toUpperCase()}</span>
                    <h3 class="ip-book-title" onclick="location.hash='#/book/${book.id}'">${book.title}</h3>
                    <p class="ip-book-author">${book.author} • ${book.publisher || 'Editora'} (${book.pages || 300} págs)</p>
                    
                    ${book.loanInfo ? `
                      <div class="ip-loan-meta" style="font-size: 0.82rem; color: var(--color-primary); margin-top: 4px; font-weight: 600;">
                        <span>📅 Devolução até: ${book.loanInfo.dueDate} • Formato: ${book.loanInfo.format}</span>
                      </div>
                    ` : ''}

                    <div class="ip-last-read">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Última sessão: ${prog.lastRead || 'Hoje'}</span>
                    </div>
                  </div>

                  <div class="ip-progress-col">
                    <div class="ip-prog-labels">
                      <span class="ip-prog-text">Progresso</span>
                      <span class="ip-prog-pct">${prog.percent}%</span>
                    </div>
                    <div class="ip-prog-bar">
                      <div class="ip-prog-fill" style="width: ${prog.percent}%;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
                      <span class="ip-prog-pages">Página ${prog.page} de ${prog.total}</span>
                      <button class="btn-quick-prog-update" data-id="${book.id}" data-page="${prog.page}" data-total="${prog.total}" title="Atualizar página atual" style="background: none; border: none; font-size: 0.8rem; color: var(--color-primary); cursor: pointer; text-decoration: underline;">
                        Editar pág.
                      </button>
                    </div>
                  </div>

                  <div class="ip-actions-col">
                    <button class="btn-ip-continue" onclick="ReaderModal.open('${book.id}')">
                      Ler agora
                    </button>
                    ${book.loanInfo ? `
                      <button class="btn-shelf-return" data-id="${book.id}" style="padding: 8px 12px; font-size: 0.8rem; border-radius: 8px; border: 1px solid var(--color-border); background: #FFFFFF; cursor: pointer; color: #DC2626;">
                        Devolver
                      </button>
                    ` : ''}
                    <button class="favorite-heart-btn ${isFav ? 'active' : ''}" data-id="${book.id}" title="Favoritar">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- Bottom Layout: Minhas Listas (Left) + Histórico Recente (Right) -->
        <div class="my-books-bottom-grid">
          <!-- Left: Minhas Listas -->
          <div class="my-lists-column">
            <div class="my-lists-header">
              <div class="my-lists-titles">
                <h2 class="my-lists-heading">Minhas Listas</h2>
                <p class="my-lists-sub">Coleções temáticas e pastas personalizadas organizadas por você</p>
              </div>
              <button class="btn-create-list-pill" id="btn-create-list">
                <span>+ Criar lista</span>
              </button>
            </div>

            <div class="thematic-lists-2x2-grid">
              ${customLists.map(item => `
                <div class="thematic-card-2x2" onclick="location.hash='#/catalog'">
                  <div class="thematic-top-row">
                    <div class="thematic-icon-box" style="background: ${item.iconBg || '#FAF9F5'};">
                      <span>${item.icon}</span>
                    </div>
                    <span class="thematic-count-tag">${item.count}</span>
                  </div>
                  <h3 class="thematic-title">${item.title}</h3>
                  <p class="thematic-desc">${item.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: Histórico Recente Card -->
          <div class="recent-history-column">
            <div class="recent-history-card">
              <div class="recent-history-head">
                <h3 class="recent-head-title">Histórico de Sessões</h3>
                <a href="#/catalog" class="recent-head-link">Ver tudo</a>
              </div>

              <div class="recent-history-items-list" id="history-items-container">
                ${historyItems.map(item => `
                  <div class="recent-item-row" onclick="location.hash='#/catalog'">
                    <div class="recent-item-text">
                      <h4 class="recent-item-title">${item.title}</h4>
                      <span class="recent-item-sub">${item.subtitle}</span>
                    </div>
                    <span class="recent-badge-pct">${item.percentage}</span>
                  </div>
                `).join('')}
              </div>

              <button class="btn-clear-history" id="btn-clear-history">
                Limpar histórico de sessões
              </button>
            </div>
          </div>
        </div>

        <!-- Global Site Footer -->
        <footer class="app-global-footer">
          <div class="footer-left">
            <span>&copy; 2026 Livraria Viva. Todos os direitos reservados. Conectando pessoas através da literatura.</span>
          </div>
          <div class="footer-right">
            <a href="#/" class="footer-link">Termos de Uso</a>
            <a href="#/" class="footer-link">Privacidade</a>
            <a href="#/" class="footer-link">Central de Ajuda</a>
          </div>
        </footer>
      </div>
    `;

    BookCard.bindCardEvents(container);
    this.bindEvents(container);
  },

  bindEvents(container) {
    container.querySelectorAll('.shelf-pill-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeShelfTab = btn.getAttribute('data-tab');
        this.render();
      };
    });

    // Inline page progress updater
    container.querySelectorAll('.btn-quick-prog-update').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const bookId = btn.getAttribute('data-id');
        const currentPage = parseInt(btn.getAttribute('data-page')) || 1;
        const total = parseInt(btn.getAttribute('data-total')) || 300;

        const newPageStr = prompt(`Em qual página você está atualmente? (1 a ${total})`, currentPage);
        if (newPageStr !== null) {
          const newPage = parseInt(newPageStr);
          if (!isNaN(newPage) && newPage >= 1) {
            store.updateReadingProgress(bookId, newPage);
            this.render();
          }
        }
      };
    });

    // Book return buttons
    container.querySelectorAll('.btn-shelf-return').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const bookId = btn.getAttribute('data-id');
        store.returnBook(bookId);
        this.render();
      };
    });

    const createListBtn = document.getElementById('btn-create-list');
    if (createListBtn) {
      createListBtn.onclick = () => {
        const listName = prompt('Digite o título da sua nova lista temática:');
        if (listName && listName.trim()) {
          store.createCustomList({
            title: listName.trim(),
            desc: 'Coleção personalizada criada na sua estante.',
            icon: '📌'
          });
          this.render();
        }
      };
    }

    const clearHistoryBtn = document.getElementById('btn-clear-history');
    if (clearHistoryBtn) {
      clearHistoryBtn.onclick = () => {
        const histContainer = document.getElementById('history-items-container');
        if (histContainer) {
          histContainer.innerHTML = '<div style="padding: 16px 0; color: #94A3B8; font-style: italic;">Histórico de sessões de leitura limpo.</div>';
        }
        Toast.show('Histórico de sessões de leitura limpo com sucesso.', 'info');
      };
    }
  }
};

window.MyBooksPage = MyBooksPage;

