/**
 * ============================================================================
 * SIDEBAR NAVIGATION COMPONENT (Matches Figma Exact Layout)
 * ============================================================================
 */

const Sidebar = {
  render(currentRoute = '/') {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const user = store.getState().currentUser;
    const goal = user.readingGoal;
    const normalizedRoute = currentRoute.split('?')[0];
    const isProfile = normalizedRoute.startsWith('/profile');

    const navItems = [
      {
        path: '/',
        label: 'Início',
        icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
      },
      {
        path: '/catalog',
        label: 'Explorar',
        icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`
      },
      {
        path: '/categories',
        label: 'Categorias',
        icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>`
      },
      {
        path: '/community',
        label: 'Comunidade',
        hasDot: true,
        icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
      },
      {
        path: '/my-books',
        label: 'Meus livros',
        icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`
      }
    ];

    const navHTML = navItems.map(item => {
      let isActive = false;
      if (item.path === '/' && (normalizedRoute === '/' || normalizedRoute === '')) {
        isActive = true;
      } else if (item.path === '/catalog' && (normalizedRoute === '/catalog' || normalizedRoute.startsWith('/search'))) {
        isActive = true;
      } else if (item.path !== '/' && normalizedRoute.startsWith(item.path)) {
        isActive = true;
      }

      return `
        <a href="#${item.path}" class="nav-item ${isActive ? 'active' : ''}" data-nav="${item.path}">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
          ${item.hasDot && isActive ? '<span class="nav-active-dot"></span>' : ''}
        </a>
      `;
    }).join('');

    const footerCardHTML = isProfile ? `
      <div class="sidebar-user-online-card" onclick="location.hash='#/profile'">
        <img src="${user.avatar}" class="online-avatar" alt="${user.name}" />
        <div class="online-info">
          <span class="online-name">Você</span>
          <span class="online-status"><span class="online-dot"></span> Online agora</span>
        </div>
        <button class="online-more-btn" title="Configurações">⚙</button>
      </div>
    ` : `
      <div class="reading-goal-sidebar-card" onclick="location.hash='#/my-books'" title="Ver detalhes da Meta">
        <div class="r-goal-head">
          <span class="r-goal-title">META DE LEITURA</span>
          <span class="r-goal-year">${goal.year}</span>
        </div>
        <div class="r-goal-count">${goal.current} de ${goal.target} livros lidos</div>
        <div class="r-goal-bar">
          <div class="r-goal-fill" style="width: ${goal.percentage}%"></div>
        </div>
        <div class="r-goal-footer">
          <span class="r-goal-pct">${goal.percentage}% atingido</span>
          <span class="r-goal-link">Ver detalhes &rarr;</span>
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="sidebar-top">
        <a href="#/" class="sidebar-brand-logo">
          <div class="brand-emblem-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              <path d="M12 6v12"></path>
              <path d="M12 6l4 2v6l-4 2l-4-2v-6l4-2z"></path>
            </svg>
          </div>
          <div class="brand-text-group">
            <span class="brand-name">Livraria Viva</span>
            <span class="brand-sub">MAIS QUE LIVROS, CONEXÕES</span>
          </div>
        </a>
      </div>

      <nav class="sidebar-nav">
        ${navHTML}
      </nav>

      <div class="sidebar-bottom-wrap">
        ${footerCardHTML}
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) {
      backdrop.onclick = () => {
        document.querySelector('.sidebar').classList.remove('open');
        backdrop.classList.remove('active');
      };
    }
  }
};

window.Sidebar = Sidebar;

