/**
 * ============================================================================
 * MAIN APPLICATION BOOTSTRAP
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌿 Livraria Viva App Initializing...');

  // Initialize Toast Notifications
  Toast.init();

  // Initialize Shell Components
  Header.render();
  Sidebar.render('/');

  // Initialize Router
  Router.init();

  // Subscribe to Store updates to refresh Sidebar and Active Views
  store.subscribe((state) => {
    const currentHash = window.location.hash.slice(1) || '/';
    Sidebar.render(currentHash);
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Press '/' when not typing in an input to focus the search bar
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }

    // Press 'Escape' to close any open modal
    if (e.key === 'Escape') {
      ScannerModal.close();
      ReaderModal.close();
      document.body.classList.remove('sidebar-open');
    }
  });

  console.log('✨ Livraria Viva is fully loaded and ready.');
});
