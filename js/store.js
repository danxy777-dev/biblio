/**
 * ============================================================================
 * STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE (Community & App Store)
 * ============================================================================
 */

class AppStore {
  constructor() {
    this.storageKey = 'livraria_viva_state_v2';
    this.subscribers = [];
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.userReviews && parsed.userReviews.length > 0) {
          // Ensure new state keys exist on existing state
          if (!parsed.wantToRead) parsed.wantToRead = ['duna', 'cem-anos-solidao', 'flores-para-algernon'];
          if (!parsed.savedSearches) parsed.savedSearches = ['Harry Potter', 'Ficção Científica'];
          if (!parsed.notifications) {
            parsed.notifications = [
              {
                id: 'notif-1',
                title: 'Mariana Costa comentou na sua resenha',
                desc: '"Concordo totalmente com o que você disse sobre Hogwarts!"',
                time: 'há 10 min',
                read: false,
                link: '#/community'
              },
              {
                id: 'notif-2',
                title: 'Lembrete de Empréstimo',
                desc: 'Prazo de devolução de "Harry Potter 1" vence em 14 dias.',
                time: 'há 2 horas',
                read: false,
                link: '#/my-books'
              },
              {
                id: 'notif-3',
                title: 'Novo debate no Clube de Fantasia',
                desc: 'Arthur Lins iniciou um tópico sobre o desenvolvimento de personagens.',
                time: 'ontem',
                read: true,
                link: '#/community'
              }
            ];
          }
          if (!parsed.customLists) {
            parsed.customLists = [...APP_DATA.thematicLists];
          }
          return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse stored state, resetting to default.', e);
      }
    }

    return {
      currentUser: { ...APP_DATA.currentUser },
      favorites: ['hp-1', 'nome-do-vento', 'torto-arado'],
      wantToRead: ['duna', 'cem-anos-solidao', 'flores-para-algernon'],
      borrowedBooks: [
        {
          bookId: 'hp-1',
          borrowedAt: '2026-09-18',
          dueDate: '2026-10-02',
          format: 'Digital (E-book)',
          renewable: true
        },
        {
          bookId: '1984',
          borrowedAt: '2026-09-10',
          dueDate: '2026-09-24',
          format: 'Digital (E-book)',
          renewable: true
        }
      ],
      readingProgress: {
        '1984': { page: 148, total: 320, percent: 46, lastRead: 'Hoje, 08:30' },
        'sapiens': { page: 286, total: 454, percent: 63, lastRead: 'Ontem, 21:40' },
        'pequeno-principe': { page: 96, total: 96, percent: 100, lastRead: 'Concluído recentemente', completed: true },
        'hp-1': { page: 45, total: 320, percent: 14, lastRead: 'Há 3 dias' }
      },
      shelfFilter: 'all',
      joinedClubs: ['club-fantasia', 'club-hogwarts'],
      following: ['@carolinabatimarco', '@anasouza'],
      likedPosts: ['rev-1', 'rev-3'],
      savedSearches: ['Harry Potter', 'Ficção Científica', 'Literatura Brasileira'],
      userReviews: [...APP_DATA.communityReviews],
      customLists: [...APP_DATA.thematicLists],
      notifications: [
        {
          id: 'notif-1',
          title: 'Mariana Costa comentou na sua resenha',
          desc: '"Concordo totalmente com o que você disse sobre Hogwarts!"',
          time: 'há 10 min',
          read: false,
          link: '#/community'
        },
        {
          id: 'notif-2',
          title: 'Lembrete de Empréstimo',
          desc: 'Prazo de devolução de "Harry Potter 1" vence em 14 dias.',
          time: 'há 2 horas',
          read: false,
          link: '#/my-books'
        },
        {
          id: 'notif-3',
          title: 'Novo debate no Clube de Fantasia',
          desc: 'Arthur Lins iniciou um tópico sobre o desenvolvimento de personagens.',
          time: 'ontem',
          read: true,
          link: '#/community'
        }
      ],
      searchQuery: '',
      activeCategory: 'all'
    };
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state to localStorage', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.state);
      } catch (err) {
        console.error('Error in store subscriber:', err);
      }
    });
  }

  // State Getters
  getState() {
    return this.state;
  }

  getBook(id) {
    return APP_DATA.books.find(b => b.id === id) || null;
  }

  findBookByIsbn(isbn) {
    if (!isbn) return null;
    const cleanQuery = String(isbn).replace(/[^0-9X]/gi, '').toLowerCase();
    if (!cleanQuery) return null;

    return APP_DATA.books.find(b => {
      if (!b.isbn) return false;
      const cleanBookIsbn = String(b.isbn).replace(/[^0-9X]/gi, '').toLowerCase();
      return cleanBookIsbn === cleanQuery || cleanBookIsbn.includes(cleanQuery) || cleanQuery.includes(cleanBookIsbn);
    }) || null;
  }

  async fetchBookByIsbnOnline(isbn) {
    if (!isbn) return null;
    const cleanIsbn = String(isbn).replace(/[^0-9X]/gi, '');
    
    // Check local catalog first
    const local = this.findBookByIsbn(cleanIsbn);
    if (local) return local;

    try {
      // 1. Try Google Books API
      const gRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`);
      if (gRes.ok) {
        const gData = await gRes.json();
        if (gData.items && gData.items.length > 0) {
          const info = gData.items[0].volumeInfo;
          const newBook = {
            id: 'isbn-' + cleanIsbn,
            title: info.title || 'Livro Identificado',
            author: (info.authors && info.authors.join(', ')) || 'Autor Desconhecido',
            category: (info.categories && info.categories[0]) || 'Geral',
            categorySlug: 'geral',
            isbn: cleanIsbn.length === 13 ? `${cleanIsbn.slice(0,3)}-${cleanIsbn.slice(3,5)}-${cleanIsbn.slice(5,8)}-${cleanIsbn.slice(8,12)}-${cleanIsbn.slice(12)}` : cleanIsbn,
            publisher: info.publisher || 'Editora Nacional',
            year: info.publishedDate ? parseInt(info.publishedDate.slice(0, 4)) : 2024,
            pages: info.pageCount || 250,
            rating: info.averageRating || 4.5,
            reviewsCount: info.ratingsCount || 120,
            available: true,
            cover: (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || 
                   generateCoverSVG(info.title || 'Livro', (info.authors && info.authors[0]) || 'Autor', '', ['#142823', '#23473D', '#0C1B17'], '#75DE9C'),
            synopsis: info.description || 'Nenhuma sinopse disponível para esta edição.'
          };
          APP_DATA.books.push(newBook);
          return newBook;
        }
      }
    } catch (e) {
      console.warn('Google Books API fetch failed, trying OpenLibrary:', e);
    }

    try {
      // 2. Try OpenLibrary API
      const olRes = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${cleanIsbn}&format=json&jscmd=data`);
      if (olRes.ok) {
        const olData = await olRes.json();
        const olKey = `ISBN:${cleanIsbn}`;
        if (olData[olKey]) {
          const info = olData[olKey];
          const newBook = {
            id: 'isbn-' + cleanIsbn,
            title: info.title || 'Livro Identificado',
            author: (info.authors && info.authors.map(a => a.name).join(', ')) || 'Autor Desconhecido',
            category: (info.subjects && info.subjects[0] && info.subjects[0].name) || 'Geral',
            categorySlug: 'geral',
            isbn: cleanIsbn,
            publisher: (info.publishers && info.publishers[0] && info.publishers[0].name) || 'Editora',
            year: info.publish_date ? parseInt(info.publish_date.match(/\\d{4}/)?.[0] || '2024') : 2024,
            pages: info.number_of_pages || 250,
            rating: 4.6,
            reviewsCount: 45,
            available: true,
            cover: (info.cover && info.cover.medium) || generateCoverSVG(info.title, 'Autor', '', ['#142823', '#23473D', '#0C1B17'], '#75DE9C'),
            synopsis: (typeof info.notes === 'string' ? info.notes : '') || 'Obra identificada através da base Open Library.'
          };
          APP_DATA.books.push(newBook);
          return newBook;
        }
      }
    } catch (e) {
      console.warn('OpenLibrary fetch failed:', e);
    }

    return null;
  }

  getAllBooks() {
    return APP_DATA.books;
  }

  getUserProfile(handle) {
    if (!handle || handle === this.state.currentUser.handle) {
      const user = this.state.currentUser;
      return {
        name: user.name,
        handle: user.handle,
        verified: true,
        initials: user.initials || 'HD',
        avatar: user.avatar,
        bio: user.bio || 'Leitora assídua na Livraria Viva. Apaixonada por ficção científica, distopias e literatura mundial.',
        role: user.role || 'Leitora Nível 4',
        stats: {
          readBooks: Object.values(this.state.readingProgress).filter(p => p.completed).length + 15,
          reviews: this.state.userReviews.filter(r => r.authorHandle === user.handle).length,
          followers: '312',
          following: this.state.following.length + 40
        },
        shelfBooks: this.getShelfBooksForUser(user.handle),
        favoriteGenres: user.favoriteGenres || ['Ficção Distópica', 'Fantasia', 'Literatura Brasileira']
      };
    }

    const cleanHandle = handle.startsWith('@') ? handle : '@' + handle;
    if (APP_DATA.users[cleanHandle]) {
      const u = APP_DATA.users[cleanHandle];
      return {
        ...u,
        shelfBooks: this.getShelfBooksForUser(cleanHandle, u.shelfBooks)
      };
    }

    // Fallback profile if user not explicitly found
    return {
      name: cleanHandle.replace('@', '').replace(/\b\w/g, l => l.toUpperCase()),
      handle: cleanHandle,
      verified: false,
      initials: cleanHandle.slice(1, 3).toUpperCase(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Leitor ativo na comunidade Livraria Viva.',
      role: 'Leitor Apaixonado',
      stats: { readBooks: 14, reviews: 4, followers: 85, following: 42 },
      shelfBooks: [
        { id: 'hp-1', title: 'Harry Potter e a Pedra...', author: 'J. K. Rowling', dateOrProgress: 'Lido', ratingBadge: '★ 5.0' }
      ],
      favoriteGenres: ['Literatura', 'Ficção']
    };
  }

  getShelfBooksForUser(handle, defaultShelf = null) {
    if (handle === this.state.currentUser.handle) {
      const res = [];
      // Borrowed / In Progress
      this.state.borrowedBooks.forEach(b => {
        const book = this.getBook(b.bookId);
        const prog = this.getProgress(b.bookId);
        if (book) {
          res.push({
            id: book.id,
            title: book.title,
            author: book.author,
            dateOrProgress: prog ? `Pág. ${prog.page} de ${prog.total}` : 'Emprestado',
            tagBadge: prog && prog.completed ? 'Concluído' : 'Lendo',
            ratingBadge: `★ ${book.rating.toFixed(1)}`
          });
        }
      });
      // Favorites
      this.state.favorites.forEach(fId => {
        if (!res.some(x => x.id === fId)) {
          const book = this.getBook(fId);
          if (book) {
            res.push({
              id: book.id,
              title: book.title,
              author: book.author,
              dateOrProgress: 'Favorito da Estante',
              ratingBadge: `★ ${book.rating.toFixed(1)}`
            });
          }
        }
      });
      return res;
    }
    return defaultShelf || [];
  }

  isFavorite(bookId) {
    return (this.state.favorites || []).includes(bookId);
  }

  isWantToRead(bookId) {
    return (this.state.wantToRead || []).includes(bookId);
  }

  isBorrowed(bookId) {
    return (this.state.borrowedBooks || []).some(b => b.bookId === bookId);
  }

  isFollowing(handle) {
    return (this.state.following || []).includes(handle);
  }

  isClubMember(clubId) {
    return (this.state.joinedClubs || []).includes(clubId);
  }

  isPostLiked(postId) {
    return (this.state.likedPosts || []).includes(postId);
  }

  getProgress(bookId) {
    return this.state.readingProgress[bookId] || null;
  }

  getUnreadNotificationsCount() {
    return (this.state.notifications || []).filter(n => !n.read).length;
  }

  // Actions
  toggleFavorite(bookId) {
    if (!this.state.favorites) this.state.favorites = [];
    const isFav = this.isFavorite(bookId);
    if (isFav) {
      this.state.favorites = this.state.favorites.filter(id => id !== bookId);
      Toast.show('Livro removido dos seus Favoritos', 'info');
    } else {
      this.state.favorites.push(bookId);
      Toast.show('Livro adicionado aos seus Favoritos! ❤️', 'success');
    }
    this.save();
    return !isFav;
  }

  toggleWantToRead(bookId) {
    if (!this.state.wantToRead) this.state.wantToRead = [];
    const isWant = this.isWantToRead(bookId);
    const book = this.getBook(bookId);
    if (isWant) {
      this.state.wantToRead = this.state.wantToRead.filter(id => id !== bookId);
      Toast.show(`"${book ? book.title : 'Livro'}" removido da lista "Quero Ler".`, 'info');
    } else {
      this.state.wantToRead.push(bookId);
      Toast.show(`"${book ? book.title : 'Livro'}" adicionado à lista "Quero Ler"! 🔖`, 'success');
    }
    this.save();
    return !isWant;
  }

  borrowBook(bookId, format = 'Digital (E-book)') {
    if (this.isBorrowed(bookId)) {
      Toast.show('Você já possui este exemplar emprestado na sua estante.', 'warning');
      return false;
    }
    const book = this.getBook(bookId);
    if (!book) return false;

    this.state.borrowedBooks.push({
      bookId,
      borrowedAt: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      format,
      renewable: true
    });

    if (!this.state.readingProgress[bookId]) {
      this.state.readingProgress[bookId] = {
        page: 1,
        total: book.pages || 300,
        percent: 1,
        lastRead: 'Hoje'
      };
    }

    this.save();
    Toast.show(`Empréstimo confirmado! "${book.title}" disponível na sua estante.`, 'success');
    return true;
  }

  returnBook(bookId) {
    const book = this.getBook(bookId);
    this.state.borrowedBooks = (this.state.borrowedBooks || []).filter(b => b.bookId !== bookId);
    this.save();
    Toast.show(`Devolução de "${book ? book.title : 'Livro'}" confirmada. Exemplar liberado!`, 'info');
    return true;
  }

  updateReadingProgress(bookId, page) {
    const book = this.getBook(bookId);
    if (!book) return;
    const total = book.pages || 300;
    const clampedPage = Math.max(1, Math.min(page, total));
    const percent = Math.round((clampedPage / total) * 100);
    const completed = percent >= 100;

    this.state.readingProgress[bookId] = {
      page: clampedPage,
      total,
      percent,
      lastRead: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      completed
    };

    if (completed) {
      this.state.currentUser.readingGoal.current = Math.min(
        this.state.currentUser.readingGoal.target,
        this.state.currentUser.readingGoal.current + 1
      );
      this.state.currentUser.readingGoal.percentage = Math.round(
        (this.state.currentUser.readingGoal.current / this.state.currentUser.readingGoal.target) * 100
      );
      Toast.show(`🎉 Parabéns! Você concluiu a leitura de "${book.title}"! Meta atualizada.`, 'success');
    }

    this.save();
  }

  toggleFollow(handle, name = '') {
    if (!this.state.following) this.state.following = [];
    const following = this.isFollowing(handle);
    if (following) {
      this.state.following = this.state.following.filter(h => h !== handle);
      Toast.show(`Você deixou de seguir ${name || handle}.`, 'info');
    } else {
      this.state.following.push(handle);
      Toast.show(`Você agora está seguindo ${name || handle}! 🌿`, 'success');
    }
    this.save();
    return !following;
  }

  toggleClub(clubId, clubName = 'Clube') {
    if (!this.state.joinedClubs) this.state.joinedClubs = [];
    const joined = this.isClubMember(clubId);
    if (joined) {
      this.state.joinedClubs = this.state.joinedClubs.filter(id => id !== clubId);
      Toast.show(`Você saiu de ${clubName}.`, 'info');
    } else {
      this.state.joinedClubs.push(clubId);
      Toast.show(`Bem-vindo ao ${clubName}! 🎉`, 'success');
    }
    this.save();
    return !joined;
  }

  toggleLikePost(postId) {
    if (!this.state.likedPosts) this.state.likedPosts = [];
    const isLiked = this.state.likedPosts.includes(postId);
    const post = this.state.userReviews.find(r => r.id === postId);

    if (isLiked) {
      this.state.likedPosts = this.state.likedPosts.filter(id => id !== postId);
      if (post && post.likes > 0) post.likes--;
      Toast.show('Curtida desfeita.', 'info');
    } else {
      this.state.likedPosts.push(postId);
      if (post) post.likes = (post.likes || 0) + 1;
      Toast.show('Publicação curtida! ❤️', 'success');
    }

    this.save();
    return !isLiked;
  }

  addPostComment(postId, commentText) {
    if (!commentText || !commentText.trim()) return false;
    const post = this.state.userReviews.find(r => r.id === postId);
    if (!post) return false;

    if (!post.comments) post.comments = [];

    const newComment = {
      id: 'c-' + Date.now(),
      authorName: this.state.currentUser.name,
      authorHandle: this.state.currentUser.handle,
      authorInitials: this.state.currentUser.initials,
      authorAvatar: this.state.currentUser.avatar,
      time: 'Agora mesmo',
      text: commentText.trim()
    };

    post.comments.push(newComment);
    post.commentsCount = post.comments.length;
    this.save();
    Toast.show('Comentário enviado! 💬', 'success');
    return newComment;
  }

  createCommunityPost({ type = 'review', content, bookId = null, rating = null, topicTitle = '' }) {
    if (!content || !content.trim()) {
      Toast.show('Por favor, escreva o texto da sua publicação.', 'warning');
      return null;
    }

    let book = null;
    let bookTitle = '';
    let bookAuthor = '';

    if (bookId) {
      book = this.getBook(bookId);
      if (book) {
        bookTitle = book.title;
        bookAuthor = `${book.author} • ${book.category}`;
      }
    }

    let actionText = 'compartilhou uma publicação';
    if (type === 'review') actionText = book ? `avaliou e resenhou ${book.title}` : 'publicou uma resenha';
    else if (type === 'discussion') actionText = 'iniciou uma discussão literária';
    else if (type === 'recommendation') actionText = book ? `recomendou a leitura de ${book.title}` : 'fez uma recomendação';
    else if (type === 'quote') actionText = book ? `destacou uma citação de ${book.title}` : 'compartilhou uma citação';

    const newPost = {
      id: 'post-' + Date.now(),
      type,
      authorName: this.state.currentUser.name,
      authorHandle: this.state.currentUser.handle,
      authorInitials: this.state.currentUser.initials || 'HD',
      authorAvatar: this.state.currentUser.avatar,
      action: actionText,
      badge: 'Leitora Ativa',
      time: 'Agora mesmo',
      bookId: book ? book.id : null,
      bookTitle,
      bookAuthor,
      rating: rating ? parseFloat(rating) : null,
      topicTitle: topicTitle.trim() || null,
      content: content.trim(),
      likes: 0,
      commentsCount: 0,
      comments: []
    };

    this.state.userReviews.unshift(newPost);
    this.save();
    Toast.show('Sua publicação foi compartilhada na Comunidade! 📚✨', 'success');
    return newPost;
  }

  // Alias for BookDetail reviews
  addReview({ bookId, bookTitle, rating, content }) {
    return this.createCommunityPost({
      type: 'review',
      content,
      bookId,
      rating
    });
  }

  // Notifications
  markNotificationRead(id) {
    const notif = (this.state.notifications || []).find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.save();
    }
  }

  markAllNotificationsRead() {
    (this.state.notifications || []).forEach(n => n.read = true);
    this.save();
    Toast.show('Todas as notificações foram marcadas como lidas.', 'info');
  }

  // Saved Searches
  saveSearch(query) {
    if (!query || !query.trim()) return;
    const clean = query.trim();
    if (!this.state.savedSearches) this.state.savedSearches = [];
    if (!this.state.savedSearches.includes(clean)) {
      this.state.savedSearches.unshift(clean);
      this.save();
      Toast.show(`Busca "${clean}" salva em suas pesquisas favoritas! ⭐`, 'success');
    } else {
      Toast.show(`A busca "${clean}" já estava salva.`, 'info');
    }
  }

  removeSavedSearch(query) {
    if (!this.state.savedSearches) return;
    this.state.savedSearches = this.state.savedSearches.filter(q => q !== query);
    this.save();
    Toast.show(`Busca "${query}" removida das salvas.`, 'info');
  }

  // User Profile Customization
  updateUserProfile({ name, bio, target, favoriteGenres }) {
    if (name) this.state.currentUser.name = name.trim();
    if (bio !== undefined) this.state.currentUser.bio = bio.trim();
    if (target) {
      const targetNum = parseInt(target) || 24;
      this.state.currentUser.readingGoal.target = targetNum;
      this.state.currentUser.readingGoal.percentage = Math.round(
        (this.state.currentUser.readingGoal.current / targetNum) * 100
      );
    }
    if (favoriteGenres && Array.isArray(favoriteGenres)) {
      this.state.currentUser.favoriteGenres = favoriteGenres;
    }
    this.save();
    Toast.show('Seu perfil foi atualizado com sucesso! ✨', 'success');
  }

  // Custom Lists
  createCustomList({ title, desc, icon = '📚', iconBg = '#E8F3EE' }) {
    if (!title || !title.trim()) return null;
    if (!this.state.customLists) this.state.customLists = [];

    const newList = {
      id: 'list-' + Date.now(),
      icon,
      iconBg,
      title: title.trim(),
      count: '0 livros',
      desc: desc ? desc.trim() : 'Coleção organizada por você na sua estante.'
    };

    this.state.customLists.push(newList);
    this.save();
    Toast.show(`Lista "${title}" criada com sucesso! 📚`, 'success');
    return newList;
  }
}

// Global Store Instance
window.store = new AppStore();
