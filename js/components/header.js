/**
 * ============================================================================
 * HEADER COMPONENT (Search Bar, Camera Scanner, Notifications, Profile Pill)
 * ============================================================================
 */

const Header = {
  render() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const user = store.getState().currentUser;
    const currentHash = window.location.hash.slice(1) || '/';
    const isCommunity = currentHash.startsWith('/community');
    const placeholderText = isCommunity 
      ? 'Pesquise por título, autor, resenha ou leitor...' 
      : 'Pesquise por título, autor, ISBN ou assunto...';
    
    const unreadCount = store.getUnreadNotificationsCount();
    const notifications = store.getState().notifications || [];

    container.innerHTML = `
      <div class="header-left">
        <button class="mobile-nav-toggle" id="btn-mobile-menu" aria-label="Abrir Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div class="search-bar-wrapper">
          <span class="search-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input 
            type="text" 
            id="global-search-input" 
            class="search-input" 
            placeholder="${placeholderText}" 
            autocomplete="off"
          />
          <button class="header-scan-btn" id="header-btn-scanner" title="Escanear pela câmera">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span>Escanear</span>
          </button>

          <!-- Live Search Suggestions Dropdown -->
          <div id="search-suggestions" class="search-dropdown"></div>
        </div>
      </div>

      <div class="header-right">
        <!-- Notifications Button & Interactive Panel -->
        <div class="notif-wrapper" style="position: relative;">
          <button class="icon-button" id="btn-notifications" title="Notificações" aria-label="Notificações">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
          </button>

          <!-- Notifications Dropdown Dialog -->
          <div id="notifications-dropdown" class="notifications-dropdown hidden">
            <div class="notif-dropdown-header">
              <div class="notif-header-title">
                <h3>Notificações</h3>
                ${unreadCount > 0 ? `<span class="notif-count-pill">${unreadCount} nova${unreadCount > 1 ? 's' : ''}</span>` : ''}
              </div>
              ${unreadCount > 0 ? `
                <button class="notif-mark-all-btn" id="btn-mark-all-read">Marcar todas como lidas</button>
              ` : ''}
            </div>

            <div class="notif-list-container">
              ${notifications.length === 0 ? `
                <div class="notif-empty-box">
                  <span>🔔 Nenhuma notificação recente.</span>
                </div>
              ` : notifications.map(n => `
                <div class="notif-item-row ${n.read ? 'read' : 'unread'}" data-id="${n.id}" data-link="${n.link}">
                  <div class="notif-item-dot"></div>
                  <div class="notif-item-content">
                    <h4 class="notif-item-title">${n.title}</h4>
                    <p class="notif-item-desc">${n.desc}</p>
                    <span class="notif-item-time">${n.time}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <button class="icon-button" id="btn-messages" title="Comunidade e Discussões" aria-label="Mensagens">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <div class="user-profile-btn" id="header-user-profile" onclick="location.hash='#/profile'" title="Ver Perfil do Leitor">
          <div class="user-info">
            <span class="user-name">${user.name}</span>
            <span class="user-role">${user.role}</span>
          </div>
          <div class="user-avatar-badge">${user.initials || 'HD'}</div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const input = document.getElementById('global-search-input');
    const suggestionsBox = document.getElementById('search-suggestions');
    const scannerBtn = document.getElementById('header-btn-scanner');
    const mobileBtn = document.getElementById('btn-mobile-menu');
    const notifBtn = document.getElementById('btn-notifications');
    const notifDropdown = document.getElementById('notifications-dropdown');
    const markAllBtn = document.getElementById('btn-mark-all-read');
    const msgBtn = document.getElementById('btn-messages');

    if (mobileBtn) {
      mobileBtn.onclick = () => {
        document.querySelector('.sidebar').classList.toggle('open');
        document.getElementById('sidebar-backdrop').classList.toggle('active');
      };
    }

    if (scannerBtn) {
      scannerBtn.onclick = () => {
        location.hash = '#/scanner';
      };
    }

    if (notifBtn && notifDropdown) {
      notifBtn.onclick = (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
      };
    }

    if (markAllBtn) {
      markAllBtn.onclick = (e) => {
        e.stopPropagation();
        store.markAllNotificationsRead();
        Header.render();
      };
    }

    // Individual notification row click
    if (notifDropdown) {
      notifDropdown.querySelectorAll('.notif-item-row').forEach(row => {
        row.onclick = () => {
          const id = row.getAttribute('data-id');
          const link = row.getAttribute('data-link');
          store.markNotificationRead(id);
          notifDropdown.classList.add('hidden');
          Header.render();
          if (link) {
            location.hash = link;
          }
        };
      });
    }

    // Close notifications on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.notif-wrapper')) {
        const dd = document.getElementById('notifications-dropdown');
        if (dd) dd.classList.add('hidden');
      }
    });

    if (msgBtn) {
      msgBtn.onclick = () => {
        location.hash = '#/community';
      };
    }

    if (input && suggestionsBox) {
      input.oninput = (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          suggestionsBox.classList.remove('show');
          suggestionsBox.innerHTML = '';
          return;
        }

        const matches = APP_DATA.books.filter(b => 
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          (b.isbn && b.isbn.includes(query))
        ).slice(0, 5);

        if (matches.length === 0) {
          suggestionsBox.innerHTML = `
            <div class="search-suggestion-item" style="cursor: default; opacity: 0.7;">
              <span>Nenhum livro encontrado para "<b>${query}</b>"</span>
            </div>
          `;
        } else {
          suggestionsBox.innerHTML = `
            <div class="search-dropdown-group-title">Livros encontrados</div>
          ` + matches.map(b => `
            <div class="search-suggestion-item" data-id="${b.id}">
              <img src="${b.cover}" class="search-suggestion-cover" alt="" />
              <div class="search-suggestion-info">
                <span class="search-suggestion-title">${b.title}</span>
                <span class="search-suggestion-author">${b.author} • <small style="color: var(--color-primary); font-weight: 600;">${b.category}</small></span>
              </div>
            </div>
          `).join('') + `
            <div class="search-suggestion-item" style="border-top: 1px solid var(--color-border); justify-content: center; font-weight: 600; color: var(--color-primary);" data-search="${query}">
              Ver todos os resultados para "${query}" &rarr;
            </div>
          `;
        }

        suggestionsBox.classList.add('show');

        // Bind clicks on suggestions
        suggestionsBox.querySelectorAll('.search-suggestion-item[data-id]').forEach(item => {
          item.onclick = () => {
            const id = item.getAttribute('data-id');
            suggestionsBox.classList.remove('show');
            input.value = '';
            location.hash = `#/book/${id}`;
          };
        });

        const footer = suggestionsBox.querySelector('.search-suggestion-item[data-search]');
        if (footer) {
          footer.onclick = () => {
            suggestionsBox.classList.remove('show');
            location.hash = `#/search?q=${encodeURIComponent(query)}`;
          };
        }
      };

      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          const query = input.value.trim();
          if (query) {
            suggestionsBox.classList.remove('show');
            location.hash = `#/search?q=${encodeURIComponent(query)}`;
          }
        }
      };

      // Close suggestions on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar-wrapper')) {
          suggestionsBox.classList.remove('show');
        }
      });
    }
  }
};

window.Header = Header;

