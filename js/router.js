/**
 * ============================================================================
 * CLIENT-SIDE HASH ROUTER
 * ============================================================================
 */

const Router = {
  routes: {},

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = rawHash.split('?');
    
    // Stop camera streams if active when navigating away from scanner
    if (window.ScannerPage && typeof window.ScannerPage.stopCamera === 'function') {
      window.ScannerPage.stopCamera();
    }
    if (window.ScannerModal && typeof window.ScannerModal.close === 'function') {
      window.ScannerModal.close();
    }

    // Close mobile drawer if open
    document.body.classList.remove('sidebar-open');

    // Parse URL search parameters if any
    const params = new URLSearchParams(queryPart || '');

    // Update Sidebar active state
    Sidebar.render(pathPart);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Route Matching
    if (pathPart.startsWith('/book/')) {
      const bookId = pathPart.replace('/book/', '');
      BookDetailPage.render(bookId);
      return;
    }

    if (pathPart === '/search') {
      const query = params.get('q') || '';
      SearchPage.render(query);
      return;
    }

    switch (pathPart) {
      case '/':
      case '':
        HomePage.render();
        break;

      case '/catalog':
        SearchPage.render(params.get('q') || '');
        break;

      case '/scanner':
        ScannerPage.render();
        break;

      case '/categories':
        CategoriesPage.render();
        break;

      case '/profile':
        ProfilePage.render(params.get('user') || store.getState().currentUser.handle);
        break;

      case '/community':
        CommunityPage.render();
        break;

      case '/my-books':
        MyBooksPage.render();
        break;

      default:
        HomePage.render();
        break;
    }
  }
};

window.Router = Router;
