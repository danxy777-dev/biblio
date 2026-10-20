/**
 * ============================================================================
 * SCANNER MODAL & CAMERA SIMULATION COMPONENT (Matches Figma Screen 3)
 * ============================================================================
 */

const ScannerModal = {
  activeStream: null,

  open(preselectedBookId = null) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-dialog scanner-modal-dialog">
        <div class="modal-header">
          <div class="modal-title-group">
            <h2 class="modal-title">Escanear Livro pela Câmera</h2>
            <p class="modal-subtitle">Aponte a câmera para a capa ou código de barras ISBN para identificação instantânea.</p>
          </div>
          <button class="modal-close-btn" id="btn-close-scanner" aria-label="Fechar">✕</button>
        </div>

        <div class="scanner-modal-body">
          <!-- Viewfinder viewport -->
          <div class="scanner-viewfinder">
            <div class="viewfinder-corners">
              <span class="corner tl"></span>
              <span class="corner tr"></span>
              <span class="corner bl"></span>
              <span class="corner br"></span>
            </div>
            
            <div class="scanner-laser-line"></div>

            <div class="viewfinder-overlay-content">
              <div class="scanner-status-pill">
                <span class="pulse-dot"></span>
                <span>Câmera ativa • Alinhe a capa ou ISBN</span>
              </div>
            </div>

            <!-- Preview video simulation -->
            <div class="viewfinder-bg-simulation" id="scanner-preview-bg">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80" alt="Camera preview" />
            </div>
          </div>

          <!-- Quick Test Targets for demonstration -->
          <div class="scanner-quick-targets">
            <span class="targets-label">Testar reconhecimento com exemplos:</span>
            <div class="target-chips">
              <button class="target-chip" data-book="hp-1">⚡ Harry Potter 1</button>
              <button class="target-chip" data-book="sapiens">🌍 Sapiens</button>
              <button class="target-chip" data-book="1984">👁️ 1984</button>
              <button class="target-chip" data-book="dom-casmurro">🏛️ Dom Casmurro</button>
              <button class="target-chip" data-book="torto-arado">🌾 Torto Arado</button>
            </div>
          </div>

          <!-- Recognition Result Card (Hidden until recognized) -->
          <div id="scanner-result-box" class="scanner-result-box hidden"></div>
        </div>
      </div>
    `;

    modalContainer.classList.add('active');
    this.bindEvents(preselectedBookId);
  },

  close() {
    if (this.activeStream) {
      try {
        this.activeStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      this.activeStream = null;
    }
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.classList.remove('active');
      modalContainer.innerHTML = '';
    }
  },

  bindEvents(preselectedBookId) {
    const closeBtn = document.getElementById('btn-close-scanner');
    const modalContainer = document.getElementById('modal-container');

    if (closeBtn) closeBtn.onclick = () => this.close();
    if (modalContainer) {
      modalContainer.onclick = (e) => {
        if (e.target === modalContainer) this.close();
      };
    }

    const chips = document.querySelectorAll('.target-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        const bookId = chip.getAttribute('data-book');
        this.simulateRecognition(bookId);
      };
    });

    if (preselectedBookId) {
      setTimeout(() => this.simulateRecognition(preselectedBookId), 800);
    } else {
      // Auto recognize Harry Potter 1 after 1.5s if opened directly
      setTimeout(() => {
        const resultBox = document.getElementById('scanner-result-box');
        if (resultBox && resultBox.classList.contains('hidden')) {
          this.simulateRecognition('hp-1');
        }
      }, 1400);
    }
  },

  simulateRecognition(bookId) {
    const book = store.getBook(bookId);
    const resultBox = document.getElementById('scanner-result-box');
    if (!book || !resultBox) return;

    resultBox.innerHTML = `
      <div class="result-success-header">
        <span class="match-badge">✓ 99.4% Reconhecido com sucesso</span>
        <span class="isbn-tag">ISBN: ${book.isbn || '978-85-325-0342-7'}</span>
      </div>

      <div class="result-book-card">
        <img src="${book.cover}" alt="${book.title}" class="result-book-cover" />
        <div class="result-book-info">
          <span class="result-cat-pill">${book.category}</span>
          <h3 class="result-title">${book.title}</h3>
          <p class="result-author">${book.author}</p>
          <div class="result-meta">
            <span>Ano: ${book.year}</span> • 
            <span>${book.pages} páginas</span> • 
            <span>${book.rating} ★ (${book.reviewsCount} avaliações)</span>
          </div>
        </div>
      </div>

      <div class="result-actions-row">
        <button class="btn btn-primary result-nav-btn" onclick="ScannerModal.close(); location.hash='#/book/${book.id}'">
          Ver detalhes e resenhas &rarr;
        </button>
        <button class="btn btn-secondary result-borrow-btn" onclick="store.borrowBook('${book.id}'); ScannerModal.close();">
          Pegar emprestado
        </button>
      </div>
    `;

    resultBox.classList.remove('hidden');
    Toast.show(`Livro "${book.title}" identificado com sucesso!`, 'success');
  }
};

window.ScannerModal = ScannerModal;
