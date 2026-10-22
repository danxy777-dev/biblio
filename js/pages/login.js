/**
 * ============================================================================
 * LOGIN PAGE — Visual-only demonstration login screen
 * ============================================================================
 * NOTE: This is a DEMONSTRATION login. It does NOT protect access to data
 * or pages. No real authentication, backend, or password storage is used.
 * ============================================================================
 */

const LoginPage = {
  /** Track password visibility toggle state */
  _passwordVisible: false,

  /**
   * Show the login screen as a fullscreen overlay.
   * Hides the main app shell (sidebar, header, content).
   */
  render() {
    // Hide the main app shell
    const appEl = document.getElementById('app');
    if (appEl) appEl.style.display = 'none';

    // Hide register page if visible
    const regRoot = document.getElementById('register-page-root');
    if (regRoot) regRoot.style.display = 'none';

    // Hide welcome page if visible
    const welcomeRoot = document.getElementById('welcome-page-root');
    if (welcomeRoot) welcomeRoot.style.display = 'none';

    // Create or get the login container
    let loginRoot = document.getElementById('login-page-root');
    if (!loginRoot) {
      loginRoot = document.createElement('div');
      loginRoot.id = 'login-page-root';
      document.body.prepend(loginRoot);
    }

    this._passwordVisible = false;

    loginRoot.innerHTML = `
      <div class="login-page">
        <!-- Left side — Login Form -->
        <div class="login-form-side">
          <div class="login-form-container">
            <!-- Brand -->
            <div class="login-brand">
              <div class="login-brand-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  <line x1="8" y1="7" x2="16" y2="7"></line>
                  <line x1="8" y1="11" x2="13" y2="11"></line>
                </svg>
              </div>
              <span class="login-brand-name">Biblioteca1</span>
            </div>

            <!-- Heading -->
            <div class="login-heading">
              <h1 class="login-title">Bem-vindo de volta</h1>
              <p class="login-subtitle">Entre para explorar novos mundos, reencontrar histórias queridas e continuar sua jornada literária.</p>
            </div>

            <!-- Form -->
            <form id="login-form" class="login-form" autocomplete="off">
              <div class="login-field">
                <label for="login-email" class="login-label">E-mail</label>
                <div class="login-input-wrapper">
                  <svg class="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M22 7l-10 7L2 7"></path>
                  </svg>
                  <input type="email" id="login-email" class="login-input" placeholder="seu@email.com" autocomplete="off" />
                </div>
              </div>

              <div class="login-field">
                <label for="login-password" class="login-label">Senha</label>
                <div class="login-input-wrapper">
                  <svg class="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input type="password" id="login-password" class="login-input login-input--password" placeholder="••••••••" autocomplete="off" />
                  <button type="button" id="login-toggle-pw" class="login-toggle-pw" aria-label="Mostrar ou ocultar senha" tabindex="-1">
                    <svg id="login-pw-icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg id="login-pw-icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Options row -->
              <div class="login-options">
                <label class="login-remember">
                  <input type="checkbox" id="login-remember" />
                  <span class="login-checkbox-custom"></span>
                  <span>Lembrar de mim</span>
                </label>
                <span class="login-forgot" title="Funcionalidade demonstrativa — sem ação real">Esqueceu sua senha?</span>
              </div>

              <!-- Submit -->
              <button type="submit" id="login-submit-btn" class="login-btn-submit">
                <span>Entrar</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>

            <!-- Link to Register -->
            <p class="login-switch-auth">
              Não tem uma conta? <a href="#/cadastro" id="login-to-register">Criar conta</a>
            </p>

            <!-- Demo notice -->
            <p class="login-demo-notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Login demonstrativo — clique em <strong>Entrar</strong> para acessar.
            </p>
          </div>
        </div>

        <!-- Right side — Visual Showcase -->
        <div class="login-showcase-side">
          <div class="login-showcase-content">
            <!-- Floating decorative book elements -->
            <div class="login-showcase-decor">
              <div class="login-decor-circle login-decor-circle--1"></div>
              <div class="login-decor-circle login-decor-circle--2"></div>
              <div class="login-decor-circle login-decor-circle--3"></div>

              <!-- Stylized book stack -->
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
              <h2 class="login-showcase-title">Seu próximo capítulo<br/>começa aqui</h2>
              <p class="login-showcase-desc">Descubra, organize e mergulhe em leituras que transformam. Sua biblioteca pessoal, sempre ao alcance.</p>
            </div>

            <!-- Feature pills -->
            <div class="login-showcase-features">
              <div class="login-feature-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span>Catálogo completo</span>
              </div>
              <div class="login-feature-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>Leitor digital</span>
              </div>
              <div class="login-feature-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>Comunidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    loginRoot.style.display = 'block';

    // Bind events
    this._bindEvents();
  },

  /**
   * Remove the login screen and reveal the main app.
   */
  hide() {
    const loginRoot = document.getElementById('login-page-root');
    if (loginRoot) loginRoot.style.display = 'none';

    const appEl = document.getElementById('app');
    if (appEl) appEl.style.display = '';
  },

  /**
   * Attach form submit and password toggle handlers.
   */
  _bindEvents() {
    // Form submit — navigate to home
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleLogin();
      });
    }

    // Password visibility toggle
    const toggleBtn = document.getElementById('login-toggle-pw');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this._togglePassword());
    }

    // Switch to Register screen
    const toRegisterLink = document.getElementById('login-to-register');
    if (toRegisterLink) {
      toRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/cadastro';
      });
    }
  },

  /**
   * Demonstration login: hide the login page and go to the home route.
   */
  _handleLogin() {
    const btn = document.getElementById('login-submit-btn');
    if (btn) {
      btn.classList.add('login-btn-submit--loading');
      btn.disabled = true;
    }

    // Brief visual feedback then navigate to institutional presentation
    setTimeout(() => {
      sessionStorage.setItem('livraria-viva-logged-in', '1');
      this.hide();
      window.location.hash = '#/welcome';
    }, 450);
  },

  /**
   * Toggle password field between text and password types.
   */
  _togglePassword() {
    this._passwordVisible = !this._passwordVisible;
    const input = document.getElementById('login-password');
    const showIcon = document.getElementById('login-pw-icon-show');
    const hideIcon = document.getElementById('login-pw-icon-hide');

    if (input) {
      input.type = this._passwordVisible ? 'text' : 'password';
    }
    if (showIcon && hideIcon) {
      showIcon.style.display = this._passwordVisible ? 'none' : '';
      hideIcon.style.display = this._passwordVisible ? '' : 'none';
    }
  }
};

window.LoginPage = LoginPage;
