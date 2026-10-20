/**
 * ============================================================================
 * TOAST NOTIFICATIONS COMPONENT
 * ============================================================================
 */

const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 3500) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `
      <div class="toast-icon" style="
        width: 22px; 
        height: 22px; 
        border-radius: 50%; 
        background: rgba(255,255,255,0.2); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 12px; 
        font-weight: bold;
        flex-shrink: 0;
      ">${icon}</div>
      <div class="toast-msg" style="flex: 1; line-height: 1.35;">${message}</div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
};

window.Toast = Toast;
