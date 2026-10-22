/**
 * ============================================================================
 * WELCOME PAGE — Institutional presentation screen for Biblioteca Viva
 * ============================================================================
 * Displayed immediately after demonstrative login and before accessing
 * the main library catalogue.
 * ============================================================================
 */

const WelcomePage = {
  /**
   * Render the institutional presentation screen.
   * Hides the main app shell and any auth screens.
   */
  render() {
    // Hide main app shell
    const appEl = document.getElementById('app');
    if (appEl) appEl.style.display = 'none';

    // Hide login and register overlays if present
    const loginRoot = document.getElementById('login-page-root');
    if (loginRoot) loginRoot.style.display = 'none';

    const regRoot = document.getElementById('register-page-root');
    if (regRoot) regRoot.style.display = 'none';

    // Create or get welcome container
    let welcomeRoot = document.getElementById('welcome-page-root');
    if (!welcomeRoot) {
      welcomeRoot = document.createElement('div');
      welcomeRoot.id = 'welcome-page-root';
      document.body.prepend(welcomeRoot);
    }

    welcomeRoot.innerHTML = `
      <div class="login-page welcome-page">
        <!-- Left Side — Institutional Presentation -->
        <div class="login-form-side welcome-form-side">
          <div class="welcome-container">
            <!-- Brand -->
            <div class="login-brand welcome-brand">
              <div class="login-brand-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  <line x1="8" y1="7" x2="16" y2="7"></line>
                  <line x1="8" y1="11" x2="13" y2="11"></line>
                </svg>
              </div>
              <span class="login-brand-name">Biblioteca Viva</span>
            </div>

            <!-- Badge -->
            <div class="welcome-badge-wrapper">
              <span class="welcome-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Espaço Cultural & Literário
              </span>
            </div>

            <!-- Heading -->
            <div class="welcome-heading">
              <h1 class="welcome-title">Bem-vindo à Biblioteca Viva</h1>
              <p class="welcome-text">
                A Biblioteca Viva é um espaço dedicado ao conhecimento, à leitura e à descoberta. Mais do que reunir livros, queremos aproximar pessoas de novas ideias, incentivar a curiosidade e tornar o acesso à leitura uma experiência simples, agradável e inspiradora.
              </p>
            </div>

            <!-- Highlight Quote Card -->
            <div class="welcome-quote-card">
              <div class="welcome-quote-mark" aria-hidden="true">“</div>
              <blockquote class="welcome-quote-text">
                Cada página é uma nova descoberta. Cada leitura, uma nova possibilidade.
              </blockquote>
            </div>

            <!-- Pillars / Real Project Features -->
            <div class="welcome-pillars">
              <div class="welcome-pillar-item">
                <div class="welcome-pillar-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <div class="welcome-pillar-content">
                  <strong class="welcome-pillar-title">Acervo Curado</strong>
                  <span class="welcome-pillar-desc">Obras selecionadas de ficção, ciências, arte e história.</span>
                </div>
              </div>

              <div class="welcome-pillar-item">
                <div class="welcome-pillar-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div class="welcome-pillar-content">
                  <strong class="welcome-pillar-title">Metas & Leitor Digital</strong>
                  <span class="welcome-pillar-desc">Acompanhe seu ritmo de leitura e explore trechos no navegador.</span>
                </div>
              </div>

              <div class="welcome-pillar-item">
                <div class="welcome-pillar-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div class="welcome-pillar-content">
                  <strong class="welcome-pillar-title">Comunidade Ativa</strong>
                  <span class="welcome-pillar-desc">Debates literários, resenhas compartilhadas e clubes de leitura.</span>
                </div>
              </div>
            </div>

            <!-- Primary Action -->
            <div class="welcome-actions">
              <button 
                type="button" 
                id="welcome-btn-continue" 
                class="login-btn-submit welcome-btn-main" 
                aria-label="Explorar biblioteca e acessar página inicial"
              >
                <span>Explorar biblioteca</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side — Visual Showcase -->
        <div class="login-showcase-side welcome-showcase-side">
          <div class="login-showcase-content">
            <!-- Floating decorative circles -->
            <div class="login-showcase-decor">
              <div class="login-decor-circle login-decor-circle--1"></div>
              <div class="login-decor-circle login-decor-circle--2"></div>
              <div class="login-decor-circle login-decor-circle--3"></div>

              <!-- Stylized layered book stack -->
              <div class="login-book-stack">
                <div class="login-book login-book--1">
                  <span class="login-book-spine"></span>
                  <span class="login-book-title">Ficção</span>
                </div>
                <div class="login-book login-book--2">
                  <span class="login-book-spine"></span>
                  <span class="login-book-title">Poesia</span>
                </div>
                <div class="login-book login-book--3">
                  <span class="login-book-spine"></span>
                  <span class="login-book-title">Ciência</span>
                </div>
                <div class="login-book login-book--4">
                  <span class="login-book-spine"></span>
                  <span class="login-book-title">História</span>
                </div>
                <div class="login-book login-book--5">
                  <span class="login-book-spine"></span>
                  <span class="login-book-title">Arte</span>
                </div>
              </div>
            </div>

            <!-- Showcase text -->
            <div class="login-showcase-text">
              <h2 class="login-showcase-title">O conhecimento transforma</h2>
              <p class="login-showcase-desc">
                Um convite para explorar novos horizontes, mergulhar em narrativas envolventes e cultivar o amor pelos livros todos os dias.
              </p>
            </div>

            <!-- Feature pills -->
            <div class="login-showcase-features">
              <div class="login-feature-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>Acesso Livre</span>
              </div>
              <div class="login-feature-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Experiência Acolhedora</span>
              </div>
              <div class="login-feature-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>Sua Biblioteca</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    welcomeRoot.style.display = 'block';

    this._bindEvents();
  },

  /**
   * Hide the welcome screen and reveal the main app.
   */
  hide() {
    const welcomeRoot = document.getElementById('welcome-page-root');
    if (welcomeRoot) welcomeRoot.style.display = 'none';

    const appEl = document.getElementById('app');
    if (appEl) appEl.style.display = '';
  },

  /**
   * Bind click and keyboard events to navigate to home.
   */
  _bindEvents() {
    const continueBtn = document.getElementById('welcome-btn-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => this._proceedToApp());
      // Focus button automatically for quick keyboard interaction
      setTimeout(() => continueBtn.focus(), 150);
    }

    // Keyboard support: Enter key proceeds to app
    const keyHandler = (e) => {
      const welcomeRoot = document.getElementById('welcome-page-root');
      if (welcomeRoot && welcomeRoot.style.display !== 'none') {
        if (e.key === 'Enter') {
          e.preventDefault();
          this._proceedToApp();
        }
      }
    };

    // Remove any previous listener before adding
    document.removeEventListener('keydown', this._keyHandlerRef);
    this._keyHandlerRef = keyHandler;
    document.addEventListener('keydown', this._keyHandlerRef);
  },

  /**
   * Proceed to the main application home page.
   */
  _proceedToApp() {
    const btn = document.getElementById('welcome-btn-continue');
    if (btn) {
      btn.classList.add('login-btn-submit--loading');
      btn.disabled = true;
    }

    setTimeout(() => {
      this.hide();
      window.location.hash = '#/';
      // Ensure router renders the home view and shell is active
      if (window.Router && typeof window.Router.handleRoute === 'function') {
        window.Router.handleRoute();
      }
    }, 300);
  }
};

window.WelcomePage = WelcomePage;
