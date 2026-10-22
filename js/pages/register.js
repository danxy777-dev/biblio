/**
 * ============================================================================
 * REGISTER PAGE — Visual-only demonstration registration screen (Biblioteca1)
 * ============================================================================
 * NOTE: This is a DEMONSTRATION registration screen. It does NOT create real
 * accounts, save passwords, or connect to external databases or APIs.
 * ============================================================================
 */

const RegisterPage = {
  /** Track password visibility toggles */
  _passwordVisible: false,
  _confirmPasswordVisible: false,

  /**
   * Show the registration screen as a fullscreen view.
   * Hides the main app shell and the login container if open.
   */
  render() {
    // Hide the main app shell
    const appEl = document.getElementById('app');
    if (appEl) appEl.style.display = 'none';

    // Hide login page if visible
    const loginRoot = document.getElementById('login-page-root');
    if (loginRoot) loginRoot.style.display = 'none';

    // Hide welcome page if visible
    const welcomeRoot = document.getElementById('welcome-page-root');
    if (welcomeRoot) welcomeRoot.style.display = 'none';

    // Create or get the register container
    let regRoot = document.getElementById('register-page-root');
    if (!regRoot) {
      regRoot = document.createElement('div');
      regRoot.id = 'register-page-root';
      document.body.prepend(regRoot);
    }

    this._passwordVisible = false;
    this._confirmPasswordVisible = false;

    regRoot.innerHTML = `
      <div class="login-page register-page">
        <!-- Left side — Register Form -->
        <div class="login-form-side">
          <div class="login-form-container" id="register-container">
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
              <h1 class="login-title">Crie sua conta</h1>
              <p class="login-subtitle">Sua próxima jornada de leitura começa aqui.</p>
            </div>

            <!-- Form -->
            <form id="register-form" class="login-form" autocomplete="off" novalidate>
              <!-- Nome Completo -->
              <div class="login-field">
                <label for="register-name" class="login-label">Nome completo</label>
                <div class="login-input-wrapper">
                  <svg class="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input 
                    type="text" 
                    id="register-name" 
                    class="login-input" 
                    placeholder="Ex: Maria Fernandes" 
                    autocomplete="name" 
                  />
                </div>
                <div id="register-name-error" class="login-field-error" style="display:none;"></div>
              </div>

              <!-- E-mail -->
              <div class="login-field">
                <label for="register-email" class="login-label">E-mail</label>
                <div class="login-input-wrapper">
                  <svg class="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M22 7l-10 7L2 7"></path>
                  </svg>
                  <input 
                    type="email" 
                    id="register-email" 
                    class="login-input" 
                    placeholder="seu@email.com" 
                    autocomplete="email" 
                  />
                </div>
                <div id="register-email-error" class="login-field-error" style="display:none;"></div>
              </div>

              <!-- Senha -->
              <div class="login-field">
                <label for="register-password" class="login-label">Senha</label>
                <div class="login-input-wrapper">
                  <svg class="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input 
                    type="password" 
                    id="register-password" 
                    class="login-input login-input--password" 
                    placeholder="Mínimo de 6 caracteres" 
                    autocomplete="new-password" 
                  />
                  <button 
                    type="button" 
                    id="register-toggle-pw" 
                    class="login-toggle-pw" 
                    aria-label="Mostrar ou ocultar senha" 
                    tabindex="-1"
                  >
                    <svg id="register-pw-icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg id="register-pw-icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>
                    </svg>
                  </button>
                </div>
                <div id="register-password-error" class="login-field-error" style="display:none;"></div>
              </div>

              <!-- Confirmar Senha -->
              <div class="login-field">
                <label for="register-confirm-password" class="login-label">Confirmar senha</label>
                <div class="login-input-wrapper">
                  <svg class="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input 
                    type="password" 
                    id="register-confirm-password" 
                    class="login-input login-input--password" 
                    placeholder="Repita sua senha" 
                    autocomplete="new-password" 
                  />
                  <button 
                    type="button" 
                    id="register-toggle-confirm-pw" 
                    class="login-toggle-pw" 
                    aria-label="Mostrar ou ocultar confirmação de senha" 
                    tabindex="-1"
                  >
                    <svg id="register-confirm-pw-icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg id="register-confirm-pw-icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>
                    </svg>
                  </button>
                </div>
                <div id="register-confirm-password-error" class="login-field-error" style="display:none;"></div>
              </div>

              <!-- Termos de uso -->
              <div class="register-terms-field">
                <label class="login-remember register-terms-label">
                  <input type="checkbox" id="register-terms" />
                  <span class="login-checkbox-custom"></span>
                  <span class="register-terms-text">
                    Li e concordo com os <a href="#" id="register-terms-link">Termos de Uso</a> e Políticas da Biblioteca1
                  </span>
                </label>
                <div id="register-terms-error" class="login-field-error" style="display:none;"></div>
              </div>

              <!-- Botão principal: Criar conta -->
              <button type="submit" id="register-submit-btn" class="login-btn-submit">
                <span>Criar conta</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>

            <!-- Link inferior: Já tem uma conta? Entrar -->
            <p class="login-switch-auth">
              Já tem uma conta? <a href="#/login" id="register-to-login">Entrar</a>
            </p>

            <!-- Demo notice -->
            <p class="login-demo-notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Cadastro demonstrativo — nenhuma conta real ou credencial será salva.
            </p>
          </div>
        </div>

        <!-- Right side — Visual Showcase -->
        <div class="login-showcase-side">
          <div class="login-showcase-content">
            <!-- Floating decorative circles -->
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
              <h2 class="login-showcase-title">Um universo de histórias<br/>espera por você.</h2>
              <p class="login-showcase-desc">Organize suas leituras, descubra novos livros e continue explorando o conhecimento, uma página de cada vez.</p>
            </div>

            <!-- Feature pills -->
            <div class="login-showcase-features">
              <div class="login-feature-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>Estante personalizada</span>
              </div>
              <div class="login-feature-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Metas de leitura</span>
              </div>
              <div class="login-feature-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Comunidade de leitores</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    regRoot.style.display = 'block';

    // Bind all events
    this._bindEvents();
  },

  /**
   * Hide the registration screen.
   */
  hide() {
    const regRoot = document.getElementById('register-page-root');
    if (regRoot) regRoot.style.display = 'none';

    const appEl = document.getElementById('app');
    if (appEl) appEl.style.display = '';
  },

  /**
   * Attach listeners for submission, validation, toggles, terms modal and navigation.
   */
  _bindEvents() {
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleSubmit();
      });
    }

    // Password visibility toggles
    const togglePw = document.getElementById('register-toggle-pw');
    if (togglePw) {
      togglePw.addEventListener('click', () => this._togglePassword('main'));
    }

    const toggleConfirmPw = document.getElementById('register-toggle-confirm-pw');
    if (toggleConfirmPw) {
      toggleConfirmPw.addEventListener('click', () => this._togglePassword('confirm'));
    }

    // Real-time clearance of field errors on input
    const inputs = [
      { id: 'register-name', errId: 'register-name-error' },
      { id: 'register-email', errId: 'register-email-error' },
      { id: 'register-password', errId: 'register-password-error' },
      { id: 'register-confirm-password', errId: 'register-confirm-password-error' }
    ];

    inputs.forEach(({ id, errId }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          this._clearFieldError(id, errId);
        });
      }
    });

    const termsEl = document.getElementById('register-terms');
    if (termsEl) {
      termsEl.addEventListener('change', () => {
        this._clearFieldError('register-terms', 'register-terms-error');
      });
    }

    // Terms of Use Modal
    const termsLink = document.getElementById('register-terms-link');
    if (termsLink) {
      termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this._openTermsModal();
      });
    }

    // Navigation link to Login
    const toLoginLink = document.getElementById('register-to-login');
    if (toLoginLink) {
      toLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/login';
      });
    }
  },

  /**
   * Toggle visibility of password fields
   */
  _togglePassword(target) {
    if (target === 'main') {
      this._passwordVisible = !this._passwordVisible;
      const input = document.getElementById('register-password');
      const showIcon = document.getElementById('register-pw-icon-show');
      const hideIcon = document.getElementById('register-pw-icon-hide');
      if (input) input.type = this._passwordVisible ? 'text' : 'password';
      if (showIcon && hideIcon) {
        showIcon.style.display = this._passwordVisible ? 'none' : '';
        hideIcon.style.display = this._passwordVisible ? '' : 'none';
      }
    } else if (target === 'confirm') {
      this._confirmPasswordVisible = !this._confirmPasswordVisible;
      const input = document.getElementById('register-confirm-password');
      const showIcon = document.getElementById('register-confirm-pw-icon-show');
      const hideIcon = document.getElementById('register-confirm-pw-icon-hide');
      if (input) input.type = this._confirmPasswordVisible ? 'text' : 'password';
      if (showIcon && hideIcon) {
        showIcon.style.display = this._confirmPasswordVisible ? 'none' : '';
        hideIcon.style.display = this._confirmPasswordVisible ? '' : 'none';
      }
    }
  },

  /**
   * Validate form fields and display contextual error messages.
   * Returns true if valid, false if invalid.
   */
  _validateForm() {
    let isValid = true;
    let firstInvalidInput = null;

    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const pwInput = document.getElementById('register-password');
    const confirmPwInput = document.getElementById('register-confirm-password');
    const termsInput = document.getElementById('register-terms');

    // 1. Full name validation
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      this._setFieldError('register-name', 'register-name-error', 'Por favor, informe seu nome completo.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else if (nameVal.length < 2) {
      this._setFieldError('register-name', 'register-name-error', 'O nome deve ter pelo menos 2 caracteres.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else {
      this._clearFieldError('register-name', 'register-name-error');
    }

    // 2. Email validation
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      this._setFieldError('register-email', 'register-email-error', 'Por favor, informe seu e-mail.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else if (!emailRegex.test(emailVal)) {
      this._setFieldError('register-email', 'register-email-error', 'Por favor, insira um e-mail válido (ex: nome@dominio.com).');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      this._clearFieldError('register-email', 'register-email-error');
    }

    // 3. Password validation
    const pwVal = pwInput ? pwInput.value : '';
    if (!pwVal) {
      this._setFieldError('register-password', 'register-password-error', 'Por favor, crie uma senha.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = pwInput;
    } else if (pwVal.length < 6) {
      this._setFieldError('register-password', 'register-password-error', 'A senha deve ter no mínimo 6 caracteres.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = pwInput;
    } else {
      this._clearFieldError('register-password', 'register-password-error');
    }

    // 4. Confirm password validation
    const confirmPwVal = confirmPwInput ? confirmPwInput.value : '';
    if (!confirmPwVal) {
      this._setFieldError('register-confirm-password', 'register-confirm-password-error', 'Por favor, confirme sua senha.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = confirmPwInput;
    } else if (confirmPwVal !== pwVal) {
      this._setFieldError('register-confirm-password', 'register-confirm-password-error', 'As senhas não coincidem. Verifique a digitação.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = confirmPwInput;
    } else {
      this._clearFieldError('register-confirm-password', 'register-confirm-password-error');
    }

    // 5. Terms of use checkbox
    if (termsInput && !termsInput.checked) {
      this._setFieldError('register-terms', 'register-terms-error', 'É necessário aceitar os termos de uso para continuar.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = termsInput;
    } else {
      this._clearFieldError('register-terms', 'register-terms-error');
    }

    if (firstInvalidInput && typeof firstInvalidInput.focus === 'function') {
      firstInvalidInput.focus();
    }

    return isValid;
  },

  _setFieldError(inputId, errorId, message) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (inputEl && inputEl.type !== 'checkbox') {
      inputEl.classList.add('has-error');
    }
    if (errorEl) {
      errorEl.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>${message}</span>
      `;
      errorEl.style.display = 'flex';
    }
  },

  _clearFieldError(inputId, errorId) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (inputEl) {
      inputEl.classList.remove('has-error');
    }
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.innerHTML = '';
    }
  },

  /**
   * Handle form submission — validate and display demonstration feedback
   */
  _handleSubmit() {
    if (!this._validateForm()) {
      return;
    }

    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const submitBtn = document.getElementById('register-submit-btn');

    const cleanName = nameInput ? nameInput.value.trim() : 'Leitor';
    const cleanEmail = emailInput ? emailInput.value.trim() : '';

    // Show loading indicator briefly
    if (submitBtn) {
      submitBtn.classList.add('login-btn-submit--loading');
      submitBtn.disabled = true;
    }

    // Do NOT store passwords or personal data
    setTimeout(() => {
      this._showDemoFeedback(cleanName, cleanEmail);
      if (window.Toast && typeof window.Toast.show === 'function') {
        window.Toast.show('Demonstração concluída! Nenhuma conta real foi criada.', 'info', 4000);
      }
    }, 450);
  },

  /**
   * Display clear visual demonstration feedback informing that no real account was created
   */
  _showDemoFeedback(name, email) {
    const container = document.getElementById('register-container');
    if (!container) return;

    // Sanitize user inputs for safe display
    const safeName = name.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
    const safeEmail = email.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);

    container.innerHTML = `
      <div class="register-demo-feedback">
        <div class="register-feedback-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h2 class="register-feedback-title">Demonstração concluída</h2>
        
        <p class="register-feedback-message">
          Olá, <strong>${safeName}</strong>! Todos os campos do formulário foram validados com êxito. 
          Como esta é uma <strong>demonstração exclusivamente visual da Biblioteca1</strong>, 
          nenhuma conta real foi criada e nenhuma senha ou dado pessoal foi armazenado.
        </p>

        <div class="register-feedback-details">
          <div class="register-feedback-row">
            <span class="feedback-row-label">Nome:</span>
            <span class="feedback-row-val">${safeName}</span>
          </div>
          <div class="register-feedback-row">
            <span class="feedback-row-label">E-mail:</span>
            <span class="feedback-row-val">${safeEmail}</span>
          </div>
          <div class="register-feedback-row">
            <span class="feedback-row-label">Status:</span>
            <span class="feedback-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Validação OK (Simulação)
            </span>
          </div>
        </div>

        <div class="register-feedback-actions">
          <button type="button" class="login-btn-submit" id="feedback-btn-login">
            <span>Ir para o Login</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <button type="button" class="register-btn-secondary" id="feedback-btn-retry">
            Testar novo preenchimento
          </button>
        </div>
      </div>
    `;

    const btnLogin = document.getElementById('feedback-btn-login');
    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        window.location.hash = '#/login';
      });
    }

    const btnRetry = document.getElementById('feedback-btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        this.render();
      });
    }
  },

  /**
   * Open Terms of Use explanation modal
   */
  _openTermsModal() {
    const modalHost = document.getElementById('modal-container');
    if (!modalHost) return;

    modalHost.innerHTML = `
      <div class="terms-modal-card">
        <div class="terms-modal-header">
          <h3 class="terms-modal-title">Termos de Uso e Demonstração</h3>
          <button class="terms-modal-close" id="terms-close-btn" aria-label="Fechar">&times;</button>
        </div>
        <div class="terms-modal-body">
          <h4>1. Ambiente Demonstrativo</h4>
          <p>O <strong>Biblioteca1</strong> é um espaço interativo de catalogação e leitura digital desenvolvido para demonstração de interface e usabilidade.</p>
          
          <h4>2. Privacidade e Proteção de Dados</h4>
          <p>Nenhum dado pessoal, e-mail ou senha preenchido nas telas de cadastro e login é transmitido para servidores remotos, gravado em banco de dados ou compartilhado com terceiros.</p>

          <h4>3. Funcionalidades Simuladas</h4>
          <p>As rotinas de autenticação, empréstimos, resenhas e listas são simuladas de forma local e ilustrativa para enriquecer a experiência do leitor.</p>
        </div>
        <div class="terms-modal-footer">
          <button type="button" class="login-btn-submit" id="terms-confirm-btn" style="width: auto; padding: 10px 24px; margin-top: 0;">
            <span>Entendi</span>
          </button>
        </div>
      </div>
    `;

    modalHost.classList.add('active');

    const closeModal = () => {
      modalHost.classList.remove('active');
      modalHost.innerHTML = '';
    };

    const closeBtn = document.getElementById('terms-close-btn');
    if (closeBtn) closeBtn.onclick = closeModal;

    const confirmBtn = document.getElementById('terms-confirm-btn');
    if (confirmBtn) confirmBtn.onclick = closeModal;

    modalHost.onclick = (e) => {
      if (e.target === modalHost) closeModal();
    };
  }
};

window.RegisterPage = RegisterPage;
