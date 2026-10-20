/**
 * ============================================================================
 * PAGE: ESCANEAR PELA CÂMERA (Real Live Camera Feed & Book Scanner)
 * ============================================================================
 */

const ScannerPage = {
  // Camera & Stream State
  stream: null,
  videoElement: null,
  canvasElement: null,
  isCameraActive: false,
  isLoadingCamera: false,
  currentFacingMode: 'environment', // 'environment' (back camera) or 'user' (front)
  isTorchOn: false,
  hasTorch: false,
  capturedImage: null, // DataURL of captured book photo
  errorMessage: null,

  // Recognition / Selected Book
  activeRecognizedBook: null,

  render() {
    const container = document.getElementById('page-container');
    if (!container) return;

    container.innerHTML = `
      <div class="scanner-page-container">
        <div class="scanner-page-header">
          <div class="breadcrumb-trail">
            <a href="#/">Início</a>
            <span class="sep">/</span>
            <span class="current">Escanear Livro</span>
          </div>

          <div class="scanner-headline-group">
            <h1 class="page-main-title">Escanear Livro pela Câmera</h1>
            <p class="page-main-subtitle">Aponte a câmera do seu smartphone ou webcam para a capa do livro para enquadrar, capturar e catalogar a obra em tempo real.</p>
          </div>
        </div>

        <div class="scanner-main-layout">
          <!-- Left Column: Live Hardware Camera Viewfinder -->
          <div class="scanner-viewfinder-card">
            <div class="viewfinder-top-bar">
              <div class="cam-status" id="cam-status-indicator">
                <span class="pulse-green"></span>
                <span id="cam-status-text">Câmera Ao Vivo • Enquadre a Capa</span>
              </div>

              <div class="cam-tools">
                <input type="file" id="file-input-cover" accept="image/*" style="display: none;" />
                <button class="cam-tool-btn" id="btn-upload-file" title="Carregar foto da capa do livro">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </button>
                <button class="cam-tool-btn" id="btn-toggle-flash" title="Alternar Lanterna">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </button>
                <button class="cam-tool-btn" id="btn-switch-cam" title="Alternar Câmera Frontal / Traseira">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </button>
                <button class="cam-tool-btn" id="btn-toggle-power" title="Ligar / Desligar Câmera">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                </button>
              </div>
            </div>

            <!-- Viewfinder Display Area -->
            <div class="interactive-viewfinder" id="interactive-viewfinder">
              <!-- Real Video Stream -->
              <video 
                id="scanner-video" 
                class="scanner-video-feed" 
                autoplay 
                playsinline 
                muted
              ></video>

              <!-- Captured Snapshot Canvas (shown when frozen) -->
              <canvas id="scanner-canvas" class="scanner-canvas-feed hidden"></canvas>

              <!-- Shutter Flash Effect -->
              <div id="scanner-flash-fx" class="scanner-flash-overlay"></div>

              <!-- Optical Book Framing Guide & Laser Line -->
              <div class="viewfinder-frame" id="vf-frame">
                <span class="vf-corner tl" id="vfc-tl"></span>
                <span class="vf-corner tr" id="vfc-tr"></span>
                <span class="vf-corner bl" id="vfc-bl"></span>
                <span class="vf-corner br" id="vfc-br"></span>
                <div class="laser-scanner-beam" id="laser-beam"></div>
              </div>

              <!-- Live Instruction Banner -->
              <div class="viewfinder-instruction" id="vf-instruction">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span id="vf-instruction-text">Posicione a capa do livro dentro da moldura</span>
              </div>

              <!-- State Overlay (shown only when camera is stopped or on permission error) -->
              <div id="vf-state-overlay" class="viewfinder-state-overlay hidden">
                <div class="vf-state-icon" id="vf-state-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </div>
                <div class="vf-state-title" id="vf-state-title">Câmera Desligada</div>
                <div class="vf-state-desc" id="vf-state-desc">Clique no botão abaixo para ligar a câmera do seu dispositivo.</div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;" id="vf-state-actions">
                  <button class="btn-open-camera" id="btn-start-camera-overlay">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Ligar Câmera
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom Camera Controls Bar -->
            <div class="scanner-controls-bar" id="scanner-controls-bar">
              <button class="scanner-btn-secondary" id="btn-stop-camera" title="Desligar Câmera">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12"></rect></svg>
                Desligar
              </button>
              <button class="scanner-shutter-btn" id="btn-capture-photo" title="Capturar Foto da Capa do Livro">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </button>
              <button class="scanner-btn-secondary" id="btn-switch-cam-alt" title="Alternar Câmera Frontal/Traseira">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                Trocar
              </button>
            </div>

            <!-- Review Bar (Shown when photo is captured) -->
            <div class="scanner-controls-bar hidden" id="scanner-review-bar">
              <button class="scanner-btn-secondary" id="btn-retake-photo" title="Tirar outra foto do livro">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                Tirar Outra Foto
              </button>
              <button class="scanner-btn-confirm" id="btn-confirm-photo" title="Confirmar foto do livro">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Confirmar Livro
              </button>
            </div>

            <!-- Quick Book Selector from Library Catalog -->
            <div class="scanner-demo-strip">
              <span class="strip-label">Ou selecione uma obra do acervo para identificar a capa:</span>
              <div class="demo-covers-list">
                <button class="demo-btn" data-id="hp-1">⚡ Harry Potter 1</button>
                <button class="demo-btn" data-id="sapiens">🌍 Sapiens</button>
                <button class="demo-btn" data-id="1984">👁️ 1984</button>
                <button class="demo-btn" data-id="dom-casmurro">🏛️ Dom Casmurro</button>
                <button class="demo-btn" data-id="torto-arado">🌾 Torto Arado</button>
                <button class="demo-btn" data-id="duna">🪐 Duna</button>
                <button class="demo-btn" data-id="pequeno-principe">👑 Pequeno Príncipe</button>
                <button class="demo-btn" data-id="nome-do-vento">🍃 Nome do Vento</button>
              </div>
            </div>
          </div>

          <!-- Right Column: Recognition Result Card or Standby State -->
          <div class="scanner-result-side" id="scanner-result-side">
            ${this.getRightColumnHTML()}
          </div>
        </div>
      </div>
    `;

    this.videoElement = document.getElementById('scanner-video');
    this.canvasElement = document.getElementById('scanner-canvas');

    this.bindEvents();

    // Automatically start live camera feed when entering the scanner page
    this.startCamera();
  },

  getRightColumnHTML() {
    if (this.activeRecognizedBook) {
      const book = this.activeRecognizedBook;
      const displayCover = this.capturedImage || book.cover;

      return `
        <div class="result-details-card">
          <div class="result-card-badge">
            <span class="check-icon">✓</span>
            <span>Capa do Livro Reconhecida</span>
          </div>

          <div class="recognized-book-header">
            <img src="${displayCover}" alt="${book.title}" class="recognized-cover-thumb" style="object-fit: cover;" />
            <div class="recognized-text">
              <span class="recognized-cat">${book.category || 'Literatura'}</span>
              <h2 class="recognized-title">${book.title}</h2>
              <p class="recognized-author">${book.author}</p>
              <div class="recognized-rating">
                ${BookCard.renderStars(book.rating || 4.8, 14)}
                <span class="score">${(book.rating || 4.8).toFixed(1)}</span>
                <span class="count">(${book.reviewsCount || 120} avaliações)</span>
              </div>
            </div>
          </div>

          <div class="recognized-meta-grid">
            <div class="meta-cell">
              <span class="meta-label">Título</span>
              <span class="meta-value">${book.title}</span>
            </div>
            <div class="meta-cell">
              <span class="meta-label">Editora</span>
              <span class="meta-value">${book.publisher || 'Editora Nacional'}</span>
            </div>
            <div class="meta-cell">
              <span class="meta-label">Ano</span>
              <span class="meta-value">${book.year || 2021}</span>
            </div>
            <div class="meta-cell">
              <span class="meta-label">Páginas</span>
              <span class="meta-value">${book.pages || 320} págs</span>
            </div>
          </div>

          <div class="recognized-synopsis-snippet">
            <h4>Sinopse</h4>
            <p>${book.synopsis ? (book.synopsis.length > 220 ? book.synopsis.slice(0, 220) + '...' : book.synopsis) : 'Sinopse disponível no acervo da biblioteca.'}</p>
          </div>

          <div class="recognized-actions">
            <a href="#/book/${book.id}" class="btn btn-primary btn-full-width">
              <span>Ver página completa do livro</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <div class="secondary-btns-row">
              <button class="btn btn-outline" id="btn-scanner-borrow">
                Pegar emprestado
              </button>
              <button class="btn btn-outline" id="btn-scanner-reader">
                Ler amostra
              </button>
            </div>
            <button class="btn btn-ghost" id="btn-scan-another" style="margin-top: 4px; font-size: 0.8rem;">
              🔄 Escanear outro livro
            </button>
          </div>
        </div>
      `;
    }

    // Standby State (Waiting for capture)
    return `
      <div class="scanner-standby-card">
        <div class="standby-icon-circle">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        <h3 class="standby-title">Câmera Pronta</h3>
        <p class="standby-desc">
          A imagem da câmera está ao vivo no visor. Aponte para a capa do livro e clique no botão circular <b>Capturar</b> para registrar a foto e identificar a obra.
        </p>

        <div class="standby-manual-search">
          <span class="manual-search-label">Ou pesquise um livro no catálogo:</span>
          <div class="manual-search-input-group">
            <input type="text" id="input-manual-search" placeholder="Ex: Harry Potter, 1984, Sapiens..." autocomplete="off" />
            <button id="btn-submit-manual-search">Buscar</button>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const startBtnOverlay = document.getElementById('btn-start-camera-overlay');
    const powerBtn = document.getElementById('btn-toggle-power');
    const stopBtn = document.getElementById('btn-stop-camera');
    const switchBtn = document.getElementById('btn-switch-cam');
    const switchBtnAlt = document.getElementById('btn-switch-cam-alt');
    const flashBtn = document.getElementById('btn-toggle-flash');
    const uploadBtn = document.getElementById('btn-upload-file');
    const fileInput = document.getElementById('file-input-cover');

    // Capture & Review buttons
    const captureBtn = document.getElementById('btn-capture-photo');
    const retakeBtn = document.getElementById('btn-retake-photo');
    const confirmBtn = document.getElementById('btn-confirm-photo');

    if (startBtnOverlay) startBtnOverlay.onclick = () => this.startCamera();

    if (powerBtn) {
      powerBtn.onclick = () => {
        if (this.isCameraActive) {
          this.stopCamera();
        } else {
          this.startCamera();
        }
      };
    }

    if (stopBtn) stopBtn.onclick = () => this.stopCamera();
    if (switchBtn) switchBtn.onclick = () => this.switchCamera();
    if (switchBtnAlt) switchBtnAlt.onclick = () => this.switchCamera();
    if (flashBtn) flashBtn.onclick = () => this.toggleFlash();

    if (uploadBtn && fileInput) {
      uploadBtn.onclick = () => fileInput.click();
    }
    if (fileInput) {
      fileInput.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) this.handleUploadedFile(file);
      };
    }

    if (captureBtn) captureBtn.onclick = () => this.capturePhoto();
    if (retakeBtn) retakeBtn.onclick = () => this.retakePhoto();
    if (confirmBtn) confirmBtn.onclick = () => this.confirmCapture();

    this.bindResultEvents();

    // Catalog example covers selector
    document.querySelectorAll('.demo-btn').forEach(btn => {
      btn.onclick = () => {
        const bookId = btn.getAttribute('data-id');
        const book = store.getBook(bookId);
        if (book) {
          this.selectBook(book);
        }
      };
    });
  },

  bindResultEvents() {
    const borrowBtn = document.getElementById('btn-scanner-borrow');
    const readerBtn = document.getElementById('btn-scanner-reader');
    const scanAnotherBtn = document.getElementById('btn-scan-another');
    const searchInput = document.getElementById('input-manual-search');
    const searchBtn = document.getElementById('btn-submit-manual-search');

    if (borrowBtn && this.activeRecognizedBook) {
      borrowBtn.onclick = () => store.borrowBook(this.activeRecognizedBook.id);
    }
    if (readerBtn && this.activeRecognizedBook) {
      readerBtn.onclick = () => ReaderModal.open(this.activeRecognizedBook.id);
    }
    if (scanAnotherBtn) {
      scanAnotherBtn.onclick = () => {
        this.activeRecognizedBook = null;
        this.capturedImage = null;
        this.retakePhoto();
        this.updateRightColumn();
      };
    }

    if (searchBtn && searchInput) {
      const handleSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
          Toast.show('Por favor, digite o título ou autor.', 'warning');
          return;
        }
        const match = APP_DATA.books.find(b => 
          b.title.toLowerCase().includes(query) || 
          b.author.toLowerCase().includes(query)
        );
        if (match) {
          this.selectBook(match);
        } else {
          location.hash = `#/search?q=${encodeURIComponent(query)}`;
        }
      };

      searchBtn.onclick = handleSearch;
      searchInput.onkeydown = (e) => {
        if (e.key === 'Enter') handleSearch();
      };
    }
  },

  updateRightColumn() {
    const rightCol = document.getElementById('scanner-result-side');
    if (rightCol) {
      rightCol.innerHTML = this.getRightColumnHTML();
      this.bindResultEvents();
    }
  },

  // ==========================================================================
  // CAMERA HARDWARE MANAGEMENT
  // ==========================================================================

  async startCamera() {
    this.errorMessage = null;
    this.isLoadingCamera = true;

    const overlay = document.getElementById('vf-state-overlay');
    const video = document.getElementById('scanner-video');
    const statusText = document.getElementById('cam-status-text');

    if (statusText) statusText.textContent = 'Conectando à câmera...';

    // Check browser mediaDevices support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.isLoadingCamera = false;
      this.isCameraActive = false;
      this.showErrorOverlay('Seu navegador não oferece suporte à API de câmera (navigator.mediaDevices.getUserMedia) ou está em ambiente não seguro (requer HTTPS ou localhost).');
      Toast.show('Navegador sem suporte à câmera.', 'error');
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: { ideal: this.currentFacingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.stream = stream;
      this.isCameraActive = true;
      this.isLoadingCamera = false;

      // Hide overlay so live video screen is 100% visible
      if (overlay) overlay.classList.add('hidden');

      if (video) {
        video.srcObject = stream;
        video.classList.toggle('mirrored', this.currentFacingMode === 'user');
        video.setAttribute('playsinline', 'true');
        await video.play().catch(e => console.warn('Video play error:', e));

        video.onloadedmetadata = () => {
          this.checkTorchSupport();
        };
      }

      if (statusText) statusText.textContent = 'Câmera Ao Vivo • Enquadre a Capa';
      Toast.show('Câmera ao vivo ativada!', 'success');
    } catch (err) {
      console.error('Camera access error:', err);
      this.isLoadingCamera = false;
      this.isCameraActive = false;
      this.stream = null;

      let msg = 'Erro ao inicializar câmera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Permissão de acesso à câmera foi recusada. Clique no ícone de cadeado/câmera na barra do navegador e autorize.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'Nenhuma câmera ou webcam foi encontrada no seu dispositivo.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = 'A câmera já está em uso por outro aplicativo ou aba do navegador.';
      }

      this.showErrorOverlay(msg);
      Toast.show(msg, 'error');
    }
  },

  showErrorOverlay(msg) {
    const overlay = document.getElementById('vf-state-overlay');
    const title = document.getElementById('vf-state-title');
    const desc = document.getElementById('vf-state-desc');
    const statusText = document.getElementById('cam-status-text');

    if (overlay) overlay.classList.remove('hidden');
    if (title) title.textContent = 'Acesso à câmera indisponível';
    if (desc) desc.textContent = msg;
    if (statusText) statusText.textContent = 'Câmera indisponível';
  },

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        try {
          if (this.isTorchOn && track.applyConstraints) {
            track.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
          }
          track.stop();
        } catch (e) {
          console.warn('Track stop error:', e);
        }
      });
      this.stream = null;
    }

    const video = document.getElementById('scanner-video');
    if (video) {
      video.srcObject = null;
    }

    this.isCameraActive = false;
    this.isTorchOn = false;
    this.isLoadingCamera = false;

    const overlay = document.getElementById('vf-state-overlay');
    const title = document.getElementById('vf-state-title');
    const desc = document.getElementById('vf-state-desc');
    const statusText = document.getElementById('cam-status-text');

    if (overlay) overlay.classList.remove('hidden');
    if (title) title.textContent = 'Câmera Desligada';
    if (desc) desc.textContent = 'Clique no botão abaixo para ligar a câmera do seu dispositivo.';
    if (statusText) statusText.textContent = 'Câmera desligada';

    Toast.show('Câmera desligada e dispositivo liberado.', 'info');
  },

  async switchCamera() {
    if (!this.isCameraActive) return;
    this.currentFacingMode = (this.currentFacingMode === 'environment' ? 'user' : 'environment');
    Toast.show(`Alternando para câmera ${this.currentFacingMode === 'environment' ? 'traseira' : 'frontal'}...`, 'info');

    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    await this.startCamera();
  },

  checkTorchSupport() {
    this.hasTorch = false;
    if (this.stream) {
      const track = this.stream.getVideoTracks()[0];
      if (track && track.getCapabilities) {
        const capabilities = track.getCapabilities();
        this.hasTorch = Boolean(capabilities.torch);
      }
    }
  },

  async toggleFlash() {
    if (!this.stream) {
      Toast.show('Ative a câmera para utilizar a lanterna.', 'warning');
      return;
    }

    const track = this.stream.getVideoTracks()[0];
    if (!track) return;

    if (!this.hasTorch) {
      this.isTorchOn = !this.isTorchOn;
      const flashBtn = document.getElementById('btn-toggle-flash');
      if (flashBtn) flashBtn.classList.toggle('active', this.isTorchOn);
      Toast.show('Lanterna não suportada pelo hardware desta câmera.', 'info');
      return;
    }

    try {
      this.isTorchOn = !this.isTorchOn;
      await track.applyConstraints({
        advanced: [{ torch: this.isTorchOn }]
      });
      const flashBtn = document.getElementById('btn-toggle-flash');
      if (flashBtn) flashBtn.classList.toggle('active', this.isTorchOn);
      Toast.show(`Lanterna ${this.isTorchOn ? 'ligada' : 'desligada'}.`, 'info');
    } catch (err) {
      console.warn('Torch control error:', err);
      Toast.show('Não foi possível alternar a lanterna.', 'warning');
    }
  },

  // ==========================================================================
  // BOOK PHOTO CAPTURE & RECOGNITION
  // ==========================================================================

  capturePhoto() {
    const video = document.getElementById('scanner-video');
    const canvas = document.getElementById('scanner-canvas');
    const flashFx = document.getElementById('scanner-flash-fx');
    const controlsBar = document.getElementById('scanner-controls-bar');
    const reviewBar = document.getElementById('scanner-review-bar');
    const laserBeam = document.getElementById('laser-beam');
    const instruction = document.getElementById('vf-instruction-text');
    const statusText = document.getElementById('cam-status-text');

    if (!video || !canvas || video.videoWidth === 0) {
      Toast.show('Aguarde a câmera carregar a imagem...', 'warning');
      return;
    }

    // Visual shutter flash effect
    if (flashFx) {
      flashFx.classList.add('flashing');
      setTimeout(() => flashFx.classList.remove('flashing'), 180);
    }

    // Audio snap chime
    this.playShutterSound();

    // Corner pulse feedback
    const corners = document.querySelectorAll('.vf-corner');
    corners.forEach(c => c.classList.add('scanned'));
    setTimeout(() => corners.forEach(c => c.classList.remove('scanned')), 600);

    // Capture high-res frame onto canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // If front camera, mirror image for natural orientation
    if (this.currentFacingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.capturedImage = canvas.toDataURL('image/jpeg', 0.95);

    // Show captured canvas freeze-frame on top of video
    canvas.classList.remove('hidden');

    // Switch bottom buttons to review mode (Confirm / Retake)
    if (controlsBar) controlsBar.classList.add('hidden');
    if (reviewBar) reviewBar.classList.remove('hidden');
    if (laserBeam) laserBeam.classList.add('hidden');
    if (instruction) instruction.textContent = 'Capa capturada • Confirme ou tire outra foto';
    if (statusText) statusText.textContent = 'Capa capturada • Pré-visualização';

    // Auto-select Harry Potter 1 as default recognized book if none selected
    if (!this.activeRecognizedBook) {
      this.activeRecognizedBook = APP_DATA.books[0];
    }

    this.updateRightColumn();
    Toast.show('Foto do livro capturada com sucesso!', 'success');
  },

  retakePhoto() {
    const canvas = document.getElementById('scanner-canvas');
    const controlsBar = document.getElementById('scanner-controls-bar');
    const reviewBar = document.getElementById('scanner-review-bar');
    const laserBeam = document.getElementById('laser-beam');
    const instruction = document.getElementById('vf-instruction-text');
    const statusText = document.getElementById('cam-status-text');

    this.capturedImage = null;

    // Hide canvas to show live video stream again
    if (canvas) canvas.classList.add('hidden');
    if (controlsBar) controlsBar.classList.remove('hidden');
    if (reviewBar) reviewBar.classList.add('hidden');
    if (laserBeam) laserBeam.classList.remove('hidden');
    if (instruction) instruction.textContent = 'Posicione a capa do livro dentro da moldura';
    if (statusText) statusText.textContent = 'Câmera Ao Vivo • Enquadre a Capa';

    Toast.show('Câmera ao vivo pronta para nova captura.', 'info');
  },

  confirmCapture() {
    if (this.activeRecognizedBook) {
      Toast.show(`Capa confirmada para o livro "${this.activeRecognizedBook.title}"!`, 'success');
      const sideCard = document.getElementById('scanner-result-side');
      if (sideCard) sideCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      Toast.show('Captura do livro salva com sucesso!', 'success');
    }
  },

  selectBook(book) {
    this.activeRecognizedBook = book;
    this.updateRightColumn();

    // Highlight selected demo button
    document.querySelectorAll('.demo-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-id') === book.id);
    });

    Toast.show(`Capa vinculada à obra "${book.title}"!`, 'success');
  },

  handleUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.getElementById('scanner-canvas');
        const controlsBar = document.getElementById('scanner-controls-bar');
        const reviewBar = document.getElementById('scanner-review-bar');
        const laserBeam = document.getElementById('laser-beam');

        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          this.capturedImage = canvas.toDataURL('image/jpeg', 0.95);
          canvas.classList.remove('hidden');

          if (controlsBar) controlsBar.classList.add('hidden');
          if (reviewBar) reviewBar.classList.remove('hidden');
          if (laserBeam) laserBeam.classList.add('hidden');

          if (!this.activeRecognizedBook) {
            this.activeRecognizedBook = APP_DATA.books[0];
          }
          this.updateRightColumn();
          Toast.show('Foto do livro carregada com sucesso!', 'success');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  playShutterSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) {}
  }
};

window.ScannerPage = ScannerPage;
