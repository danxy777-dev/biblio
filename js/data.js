/**
 * ============================================================================
 * DATASTORE & MOCK DATABASE (Exact Figma Prototype Specification)
 * ============================================================================
 */

// Helper to generate elegant realistic SVG covers matching the Figma prints
function generateCoverSVG(title, author, subtitle, bgGradient, accentColor, type = 'fantasy') {
  const safeTitle = title.replace(/"/g, '&quot;');
  const safeAuthor = author.replace(/"/g, '&quot;');
  const safeSub = (subtitle || '').replace(/"/g, '&quot;');
  
  let emblemSVG = '';
  if (type === 'wizard' || title.includes('Harry Potter')) {
    emblemSVG = `
      <g transform="translate(150, 210)" opacity="0.95">
        <circle r="56" fill="rgba(0,0,0,0.3)" stroke="url(#gold)" stroke-width="2"/>
        <!-- Hogwarts Castle Silhouette -->
        <path d="M-30,30 L-30,-5 L-25,-15 L-20,-5 L-20,30 L-10,30 L-10,-25 L-5,-35 L0,-25 L0,30 L10,30 L10,-15 L15,-25 L20,-15 L20,30 L30,30 Z" fill="url(#gold)"/>
        <!-- Flying Train / Hogwarts Express steam -->
        <path d="M-40,15 Q0,-5 40,20" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-dasharray="4,4"/>
        <polygon points="0,-45 4,-35 14,-35 6,-28 9,-18 0,-24 -9,-18 -6,-28 -14,-35 -4,-35" fill="${accentColor}"/>
      </g>
    `;
  } else if (title === '1984') {
    emblemSVG = `
      <g transform="translate(150, 215)">
        <circle r="52" fill="none" stroke="${accentColor}" stroke-width="2"/>
        <!-- Big Brother Eye Silhouette -->
        <path d="M-38,0 Q0,-28 38,0 Q0,28 -38,0 Z" fill="rgba(0,0,0,0.4)" stroke="${accentColor}" stroke-width="2"/>
        <circle r="14" fill="${accentColor}"/>
        <circle r="6" fill="#1E293B"/>
        <text x="0" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="900" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">WAR IS PEACE</text>
      </g>
    `;
  } else if (title.includes('Sapiens')) {
    emblemSVG = `
      <g transform="translate(150, 215)">
        <circle r="54" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <!-- Evolution Human Silhouette / DNA Tree -->
        <path d="M0,-35 C-20,-10 -15,15 0,35 C15,15 20,-10 0,-35 Z" fill="url(#gold)" opacity="0.85"/>
        <circle cx="0" cy="-22" r="8" fill="${accentColor}"/>
        <circle cx="-12" cy="0" r="6" fill="${accentColor}"/>
        <circle cx="12" cy="0" r="6" fill="${accentColor}"/>
        <circle cx="0" cy="18" r="7" fill="${accentColor}"/>
      </g>
    `;
  } else if (title.includes('Pequeno')) {
    emblemSVG = `
      <g transform="translate(150, 215)">
        <circle r="52" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <!-- Little Prince & Asteroid B612 -->
        <circle cx="0" cy="18" r="28" fill="rgba(255,255,255,0.15)" stroke="${accentColor}" stroke-width="1.5"/>
        <!-- Prince Silhouette -->
        <path d="M-4,-15 L4,-15 L6,2 L-6,2 Z" fill="${accentColor}"/>
        <circle cx="0" cy="-20" r="6" fill="${accentColor}"/>
        <!-- Scarf Flying -->
        <path d="M3,-16 Q18,-18 24,-12" stroke="#FDE047" stroke-width="3" fill="none"/>
        <!-- Stars -->
        <polygon points="-22,-24 -20,-18 -14,-18 -19,-14 -17,-8 -22,-12 -27,-8 -25,-14 -30,-18 -24,-18" fill="#FDE047" transform="scale(0.6) translate(-10,-10)"/>
        <polygon points="26,-28 28,-22 34,-22 29,-18 31,-12 26,-16 21,-12 23,-18 18,-22 24,-22" fill="#FDE047" transform="scale(0.5) translate(20,-20)"/>
      </g>
    `;
  } else if (title.includes('Vento')) {
    emblemSVG = `
      <g transform="translate(150, 215)">
        <circle r="54" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <!-- Lute & Wind swirls -->
        <path d="M-20,20 Q0,-20 20,-30 Q10,10 -20,20 Z" fill="url(#gold)"/>
        <circle cx="-12" cy="12" r="14" fill="${accentColor}"/>
        <line x1="-12" y1="12" x2="16" y2="-22" stroke="#142823" stroke-width="3"/>
      </g>
    `;
  } else if (title.includes('Duna')) {
    emblemSVG = `
      <g transform="translate(150, 215)">
        <circle r="54" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <!-- Desert Dunes & Twin Moons -->
        <circle cx="-12" cy="-22" r="10" fill="#FEF08A"/>
        <circle cx="16" cy="-26" r="6" fill="#FDE047"/>
        <path d="M-40,15 Q-15,-5 10,18 Q25,5 40,25 L-40,25 Z" fill="url(#gold)"/>
      </g>
    `;
  } else if (title.includes('Torto Arado')) {
    emblemSVG = `
      <g transform="translate(150, 215)">
        <circle r="54" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <!-- Knife & Roots/Soil -->
        <path d="M0,-30 L6,5 L-6,5 Z" fill="${accentColor}"/>
        <rect x="-3" y="5" width="6" height="18" fill="#FFFFFF"/>
        <path d="M-25,28 Q0,18 25,28" stroke="url(#gold)" stroke-width="3" fill="none"/>
      </g>
    `;
  } else {
    emblemSVG = `
      <g transform="translate(150, 215)" opacity="0.95">
        <circle r="52" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <circle r="44" fill="rgba(0,0,0,0.25)"/>
        <path d="M-22,-10 C-10,-18 0,-12 0,16 C0,-12 10,-18 22,-10 L22,26 C10,18 0,22 0,22 C0,22 -10,18 -22,26 Z" fill="url(#gold)"/>
        <polygon points="0,-32 4,-20 16,-20 6,-12 10,0 0,-8 -10,0 -6,-12 -16,-20 -4,-20" fill="${accentColor}" transform="scale(0.5) translate(0, -60)"/>
      </g>
    `;
  }
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 440" width="300" height="440">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}" />
        <stop offset="50%" stop-color="${bgGradient[1]}" />
        <stop offset="100%" stop-color="${bgGradient[2]}" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFE29F" />
        <stop offset="50%" stop-color="${accentColor}" />
        <stop offset="100%" stop-color="#C5832B" />
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.35"/>
      </filter>
    </defs>
    <!-- Background Frame -->
    <rect width="300" height="440" rx="10" fill="url(#grad)"/>
    
    <!-- Spine Line Effect -->
    <rect x="0" y="0" width="22" height="440" fill="rgba(0,0,0,0.25)"/>
    <line x1="22" y1="0" x2="22" y2="440" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    
    <!-- Decorative Ornaments -->
    <rect x="36" y="24" width="238" height="392" rx="6" fill="none" stroke="${accentColor}" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="6,3"/>
    <rect x="42" y="30" width="226" height="380" rx="4" fill="none" stroke="${accentColor}" stroke-width="0.8" stroke-opacity="0.3"/>
    
    <!-- Center Emblem / Artwork -->
    ${emblemSVG}
    
    <!-- Author Name -->
    <text x="150" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="${accentColor}" text-anchor="middle" text-transform="uppercase">${safeAuthor}</text>
    
    <!-- Title Text -->
    <text x="150" y="108" font-family="'Playfair Display', Georgia, serif" font-size="20" font-weight="bold" fill="#FFFFFF" text-anchor="middle" width="220">
      ${safeTitle.length > 22 ? safeTitle.slice(0, 22) + '...' : safeTitle}
    </text>
    <text x="150" y="130" font-family="'Playfair Display', Georgia, serif" font-size="12" font-style="italic" fill="${accentColor}" text-anchor="middle">
      ${safeSub}
    </text>
    
    <!-- Bottom Publisher Badge -->
    <text x="150" y="392" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="bold" letter-spacing="2" fill="rgba(255,255,255,0.7)" text-anchor="middle" text-transform="uppercase">LIVRARIA VIVA • EDIÇÃO ESPECIAL</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const APP_DATA = {
  currentUser: {
    name: 'Helena Duarte',
    role: 'Leitora Nível 4',
    handle: '@helenaduarte',
    initials: 'HD',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readingGoal: {
      current: 16,
      target: 24,
      percentage: 66,
      year: 2025
    }
  },

  featuredReaderProfile: {
    name: 'Carolina Batimarco',
    verified: true,
    handle: '@carolinabatimarco',
    initials: 'CB',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bio: 'Amante de livros, boas conversas e grandes histórias. 🍃 Lendo atualmente: O Nome do Vento de Patrick Rothfuss.',
    stats: {
      readBooks: 42,
      reviews: 12,
      followers: '1.2k',
      following: 234
    },
    currentReading: {
      bookId: 'nome-do-vento',
      title: 'O Nome do Vento',
      author: 'Patrick Rothfuss',
      progressPage: 340,
      totalPages: 656
    }
  },

  categories: [
    { id: 'romance', name: 'Romance', count: '2.341 livros', icon: '❤️', iconBg: '#FEE2E2', popular: true },
    { id: 'ficcao', name: 'Ficção', count: '1.706 livros', icon: '📖', iconBg: '#E0F2FE', popular: true },
    { id: 'fantasia', name: 'Fantasia', count: '1.515 livros', icon: '🪄', iconBg: '#E8F3EE', popular: true },
    { id: 'misterio', name: 'Mistério', count: '982 livros', icon: '👁️', iconBg: '#F3E8FF', popular: true },
    { id: 'suspense', name: 'Suspense', count: '875 livros', icon: '⏳', iconBg: '#FEF3C7', popular: true },
    { id: 'terror', name: 'Terror', count: '643 livros', icon: '🌙', iconBg: '#F1F5F9', popular: true },
    { id: 'aventura', name: 'Aventura', count: '1.206 livros', icon: '🧭', iconBg: '#FFEDD5', popular: true },
    { id: 'biografia', name: 'Biografia', count: '742 livros', icon: '👤', iconBg: '#E0E7FF', popular: true },
    { id: 'historia', name: 'História', count: '611 livros', icon: '🏛️', iconBg: '#F5F5F4', popular: false },
    { id: 'filosofia', name: 'Filosofia', count: '538 livros', icon: '💭', iconBg: '#ECFDF5', popular: true },
    { id: 'religiao', name: 'Religião', count: '476 livros', icon: '🕊️', iconBg: '#F0FDF4', popular: false },
    { id: 'ciencia', name: 'Ciência', count: '392 livros', icon: '🔬', iconBg: '#E0F2FE', popular: false },
    { id: 'tecnologia', name: 'Tecnologia', count: '358 livros', icon: '💻', iconBg: '#F1F5F9', popular: false },
    { id: 'educacao', name: 'Educação', count: '261 livros', icon: '🎓', iconBg: '#FEF3C7', popular: false },
    { id: 'literatura-br', name: 'Literatura Brasileira', count: '284 livros', icon: '🇧🇷', iconBg: '#DCFCE7', popular: true },
    { id: 'literatura-est', name: 'Literatura Estrangeira', count: '312 livros', icon: '🌍', iconBg: '#E0F2FE', popular: false },
    { id: 'infantil', name: 'Infantil', count: '1.217 livros', icon: '🧸', iconBg: '#FFEDD5', popular: false },
    { id: 'juvenil', name: 'Juvenil', count: '876 livros', icon: '🎮', iconBg: '#F3E8FF', popular: false },
    { id: 'poesia', name: 'Poesia', count: '431 livros', icon: '🪶', iconBg: '#E8F3EE', popular: false },
    { id: 'quadrinhos', name: 'Quadrinhos', count: '396 livros', icon: '🎨', iconBg: '#FEF9C3', popular: false },
    { id: 'desenvolvimento', name: 'Desenvolvimento Pessoal', count: '520 livros', icon: '🌱', iconBg: '#ECFDF5', popular: false },
    { id: 'negocios', name: 'Negócios', count: '284 livros', icon: '📈', iconBg: '#E0F2FE', popular: false },
    { id: 'culinaria', name: 'Culinária', count: '198 livros', icon: '🍳', iconBg: '#FFEDD5', popular: false }
  ],

  curatedCollections: [
    {
      id: 'grandes-amores',
      tag: 'ROMANCE • SÉCULO XIX',
      badge: '6 obras essenciais',
      title: 'Grandes amores da prosa universal',
      desc: 'De Jane Austen a Machado de Assis, as narrativas que definiram a sensibilidade das gerações.',
      image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'fronteiras-cosmos',
      tag: 'CIÊNCIA • FILOSOFIA',
      badge: '8 títulos',
      title: 'Fronteiras da Consciência e Cosmos',
      desc: 'Explorações lúcidas sobre a física quântica, astrobiologia e os mistérios da percepção humana.',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'vozes-brasil',
      tag: 'LITERATURA BRASILEIRA',
      badge: '12 livros',
      title: 'Vozes Contemporâneas do Brasil',
      desc: 'A nova safra de autores nacionais reescrevendo histórias urbanas, identidades e memórias.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80'
    }
  ],

  books: [
    {
      id: 'hp-1',
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J. K. Rowling',
      translator: 'Lia Wyler',
      category: 'Fantasia',
      categorySub: 'Fantasia Juvenil',
      categorySlug: 'fantasia',
      volume: 'Volume 1',
      edition: 'Edição Colecionador 20 anos',
      isbn: '978-85-325-0342-7',
      publisher: 'Rocco',
      year: 2017,
      pages: 320,
      language: 'Português',
      format: 'Capa comum / E-book / Audiobook',
      rating: 4.8,
      reviewsCount: 12480,
      readersCount: '34.2k',
      available: true,
      badge: '#1 no Clube',
      cover: generateCoverSVG('Harry Potter', 'J. K. Rowling', 'e a Pedra Filosofal', ['#0D281E', '#164E3D', '#0A1E17'], '#F4BB90', 'wizard'),
      synopsis: `Harry Potter é um garoto órfão de 10 anos que vive infeliz com seus tios desagradáveis, os Dursley. No seu aniversário de 11 anos, ele descobre que não é um garoto comum: é um bruxo e foi aceito na prestigiada Escola de Magia e Bruxaria de Hogwarts. Conduzido por Rúbeo Hagrid ao fantástico Beco Diagonal e embarcando na Plataforma 9 ¾ no Expresso de Hogwarts, Harry ingressa em um universo onde feitiços, vassouras voadoras e criaturas míticas são reais. Ao lado de seus leais amigos Rony Weasley e Hermione Granger, ele desvenda o segredo de um artefato lendário escondido no castelo: a lendária Pedra Filosofal.`,
      quote: {
        text: 'Não vale a pena viver sonhando e se esquecer de viver, lembre-se.',
        author: 'Alvo Dumbledore, Capítulo 12'
      },
      chapters: [
        { number: 1, title: 'O Menino que Sobreviveu', pages: '1-18' },
        { number: 2, title: 'O Vidro que Sumiu', pages: '19-35' },
        { number: 3, title: 'As Cartas de Ninguém', pages: '36-54' },
        { number: 4, title: 'O Guardião das Chaves', pages: '55-73' },
        { number: 5, title: 'O Beco Diagonal', pages: '74-102' }
      ]
    },
    {
      id: 'hp-2',
      title: 'Harry Potter e a Câmara Secreta',
      author: 'J. K. Rowling',
      category: 'Fantasia',
      categorySub: 'Fantasia Juvenil',
      categorySlug: 'fantasia',
      volume: 'Livro 2',
      isbn: '978-85-325-0343-4',
      publisher: 'Rocco',
      year: 2017,
      pages: 288,
      rating: 4.7,
      reviewsCount: 9200,
      available: true,
      cover: generateCoverSVG('Harry Potter', 'J. K. Rowling', 'e a Câmara Secreta', ['#0F242F', '#1C4A5E', '#0B1B24'], '#8CE8FF', 'wizard')
    },
    {
      id: 'hp-3',
      title: 'Harry Potter e o Prisioneiro de Azkaban',
      author: 'J. K. Rowling',
      category: 'Fantasia',
      categorySub: 'Fantasia Juvenil',
      categorySlug: 'fantasia',
      volume: 'Livro 3',
      isbn: '978-85-325-0344-1',
      publisher: 'Rocco',
      year: 2017,
      pages: 348,
      rating: 4.9,
      reviewsCount: 15300,
      available: true,
      cover: generateCoverSVG('Harry Potter', 'J. K. Rowling', 'e o Prisioneiro de Azkaban', ['#1F1A3A', '#3C336D', '#15112A'], '#D4BBFF', 'wizard')
    },
    {
      id: 'hp-4',
      title: 'Harry Potter e o Cálice de Fogo',
      author: 'J. K. Rowling',
      category: 'Fantasia',
      categorySub: 'Fantasia Juvenil',
      categorySlug: 'fantasia',
      volume: 'Livro 4',
      isbn: '978-85-325-0345-8',
      publisher: 'Rocco',
      year: 2017,
      pages: 536,
      rating: 4.8,
      reviewsCount: 11200,
      available: true,
      cover: generateCoverSVG('Harry Potter', 'J. K. Rowling', 'e o Cálice de Fogo', ['#2C1210', '#592520', '#1C0A09'], '#FFB088', 'wizard')
    },
    {
      id: 'hp-5',
      title: 'Harry Potter e a Ordem da Fênix',
      author: 'J. K. Rowling',
      category: 'Fantasia',
      categorySub: 'Fantasia Juvenil',
      categorySlug: 'fantasia',
      volume: 'Livro 5',
      isbn: '978-85-325-0346-5',
      publisher: 'Rocco',
      year: 2018,
      pages: 704,
      rating: 4.8,
      reviewsCount: 10400,
      available: true,
      cover: generateCoverSVG('Harry Potter', 'J. K. Rowling', 'e a Ordem da Fênix', ['#3A1C0A', '#6D3815', '#241106'], '#FFA94D', 'wizard')
    },
    {
      id: 'hp-6',
      title: 'Harry Potter e o Enigma do Príncipe',
      author: 'J. K. Rowling',
      category: 'Fantasia',
      categorySub: 'Fantasia Juvenil',
      categorySlug: 'fantasia',
      volume: 'Livro 6',
      isbn: '978-85-325-0347-2',
      publisher: 'Rocco',
      year: 2018,
      pages: 472,
      rating: 4.8,
      reviewsCount: 11100,
      readersActive: '1.4k leitores ativos',
      available: true,
      cover: generateCoverSVG('Harry Potter', 'J. K. Rowling', 'e o Enigma do Príncipe', ['#11291F', '#24523F', '#091A13'], '#9AE6B4', 'wizard')
    },
    {
      id: '1984',
      title: '1984',
      author: 'George Orwell',
      category: 'Ficção Distópica',
      categoryBadge: 'FICÇÃO DISTÓPICA',
      categorySlug: 'ficcao',
      isbn: '978-85-359-1484-9',
      publisher: 'Companhia das Letras',
      year: 2021,
      pages: 320,
      rating: 4.9,
      reviewsCount: 18400,
      available: true,
      inProgress: { page: 144, total: 320, percent: 45, lastRead: '10/06/2025' },
      cover: generateCoverSVG('1984', 'George Orwell', 'Companhia das Letras', ['#1E293B', '#334155', '#0F172A'], '#F87171'),
      synopsis: 'Publicado originalmente em 1949, 1984 é um dos romances mais influentes do século XX. George Orwell concebeu uma sociedade totalitária sob a vigilância constante do Grande Irmão (Big Brother).'
    },
    {
      id: 'sapiens',
      title: 'Sapiens: Uma Breve História da Humanidade',
      author: 'Yuval Noah Harari',
      category: 'Não-Ficção • História',
      categoryBadge: 'NÃO-FICÇÃO • HISTÓRIA',
      categorySlug: 'historia',
      isbn: '978-85-254-3218-6',
      publisher: 'L&PM Editores',
      year: 2020,
      pages: 454,
      rating: 4.8,
      reviewsCount: 22100,
      available: true,
      inProgress: { page: 280, total: 454, percent: 62, lastRead: '09/05/2025' },
      cover: generateCoverSVG('Sapiens', 'Yuval Noah Harari', 'Uma Breve História', ['#4A3728', '#73573F', '#2A1F16'], '#FBBF24'),
      synopsis: 'Uma das obras de não-ficção mais lidas do mundo, Yuval Noah Harari traça a história da humanidade desde o surgimento do Homo sapiens na África até as grandes revoluções da história.'
    },
    {
      id: 'pequeno-principe',
      title: 'O Pequeno Príncipe',
      author: 'Antoine de Saint-Exupéry',
      category: 'Clássico • Filosofia',
      categoryBadge: 'CLÁSSICO • FILOSOFIA',
      categorySlug: 'infantil',
      isbn: '978-85-950-8151-2',
      publisher: 'Ed. HarperCollins',
      year: 2018,
      pages: 96,
      rating: 5.0,
      reviewsCount: 31000,
      available: true,
      inProgress: { page: 73, total: 96, percent: 76, lastRead: '05/05/2025' },
      cover: generateCoverSVG('O Pequeno Príncipe', 'Saint-Exupéry', 'Ed. HarperCollins', ['#1E3A8A', '#2563EB', '#172554'], '#93C5FD'),
      synopsis: 'O clássico atemporal de Antoine de Saint-Exupéry sobre um piloto perdido no deserto do Saara que conhece um jovem príncipe vindo de um pequeno asteroide distante.'
    },
    {
      id: 'nome-do-vento',
      title: 'O Nome do Vento',
      author: 'Patrick Rothfuss',
      category: 'Fantasia',
      categorySlug: 'fantasia',
      isbn: '978-85-992-9649-3',
      publisher: 'Arqueiro',
      year: 2019,
      pages: 656,
      rating: 4.9,
      reviewsCount: 890,
      available: true,
      badge: 'Lendo',
      progressPage: 'Pág. 340 de 656',
      cover: generateCoverSVG('O Nome do Vento', 'Patrick Rothfuss', 'A Crônica do Matador', ['#142823', '#23473D', '#0C1B17'], '#F4BB90'),
      synopsis: 'A fascinante história de Kvothe, desde a infância numa trupe de artistas itinerantes até os desafios na lendária Universidade de magia e seu status como lenda viva.'
    },
    {
      id: 'dom-casmurro',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      category: 'Clássico Brasileiro',
      categorySlug: 'literatura-br',
      isbn: '978-85-690-2051-6',
      publisher: 'Antofágica',
      year: 2021,
      pages: 256,
      rating: 4.7,
      reviewsCount: 2400,
      available: true,
      badge: 'Clássico',
      readDate: 'Lido em Nov 2023',
      cover: generateCoverSVG('Dom Casmurro', 'Machado de Assis', 'Capitu e Bentinho', ['#3B271A', '#5E3E2A', '#24160E'], '#D97706'),
      synopsis: 'Uma das obras-primas da literatura brasileira. Bentinho narra sua história de amor com Capitu, com seus olhos de ressaca, e suas crescentes dúvidas e ciúmes.'
    },
    {
      id: 'duna',
      title: 'Duna',
      author: 'Frank Herbert',
      category: 'Ficção Científica',
      categorySlug: 'ficcao',
      isbn: '978-85-765-7313-5',
      publisher: 'Aleph',
      year: 2021,
      pages: 680,
      rating: 4.5,
      reviewsCount: 3100,
      available: true,
      readDate: 'Lido em Dez 2023',
      cover: generateCoverSVG('Duna', 'Frank Herbert', 'As Crônicas de Arrakis', ['#451A03', '#78350F', '#291002'], '#FCD34D'),
      synopsis: 'No planeta desértico Arrakis, a única fonte da substância mais valiosa do universo (a especiaria mélânge), o jovem Paul Atreides enfrenta intrigas políticas e descobre seu destino.'
    },
    {
      id: 'cem-anos-solidao',
      title: 'Cem Anos de Solidão',
      author: 'Gabriel García Márquez',
      category: 'Realismo Mágico',
      categorySlug: 'ficcao',
      isbn: '978-85-010-1207-4',
      publisher: 'Record',
      year: 2019,
      pages: 448,
      rating: 5.0,
      reviewsCount: 1900,
      available: true,
      readDate: 'Lido em Nov 2023',
      cover: generateCoverSVG('Cem Anos de Solidão', 'G. García Márquez', 'Macondo', ['#164E63', '#0E7490', '#083344'], '#67E8F9'),
      synopsis: 'A saga épica e mágica das gerações da família Buendía na aldeia imaginária de Macondo, obra máxima do realismo mágico de Gabriel García Márquez.'
    },
    {
      id: 'torto-arado',
      title: 'Torto Arado',
      author: 'Itamar Vieira Junior',
      category: 'Literatura Brasileira',
      categorySlug: 'literatura-br',
      isbn: '978-65-803-0931-3',
      publisher: 'Todavia',
      year: 2019,
      pages: 264,
      rating: 5.0,
      reviewsCount: 1500,
      available: true,
      badge: 'Premiado',
      readDate: 'Lido em Out 2023',
      cover: generateCoverSVG('Torto Arado', 'Itamar Vieira Junior', 'Prêmio Jabuti', ['#451A03', '#6B2D0B', '#270E02'], '#FB923C'),
      synopsis: 'No sertão da Bahia, as irmãs Bibiana e Belonísia encontram uma misteriosa faca sob a cama da avó. Uma narrativa arrebatadora sobre terra, ancestralidade e resistência.'
    },
    {
      id: 'flores-para-algernon',
      title: 'Flores para Algernon',
      author: 'Daniel Keyes',
      category: 'Ficção Científica',
      categorySlug: 'ficcao',
      isbn: '978-85-765-7422-4',
      publisher: 'Aleph',
      year: 2018,
      pages: 288,
      rating: 4.8,
      reviewsCount: 4200,
      available: true,
      inProgress: { page: 120, total: 288, percent: 42, lastRead: '15/04/2025' },
      cover: generateCoverSVG('Flores para Algernon', 'Daniel Keyes', 'Edição Especial', ['#2B1B3D', '#482D64', '#1B0F28'], '#D8B4FE'),
      synopsis: 'Charlie Gordon, um homem com deficiência intelectual, passa por um experimento científico inovador que expande sua mente, refletindo sobre inteligência e empatia humana.'
    }
  ],

  readingHistory: [
    {
      id: 'hist-1',
      title: 'Harry Potter e a Pedra Filosofal',
      subtitle: 'Leitura concluída • 02/05/2025',
      percentage: '100%',
      status: 'completed'
    },
    {
      id: 'hist-2',
      title: 'Torto Arado',
      subtitle: 'Leitura concluída • 21/01/2025',
      percentage: '100%',
      status: 'completed'
    },
    {
      id: 'hist-3',
      title: 'Flores para Algernon',
      subtitle: 'Página 120 lida • 15/04/2025',
      percentage: '42%',
      status: 'in-progress'
    }
  ],

  users: {
    '@carolinabatimarco': {
      name: 'Carolina Batimarco',
      handle: '@carolinabatimarco',
      verified: true,
      initials: 'CB',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      bio: 'Amante de livros, boas conversas e grandes histórias. 🍃 Lendo atualmente: O Nome do Vento de Patrick Rothfuss.',
      role: 'Leitora Curadora • Nível 5',
      stats: { readBooks: 42, reviews: 12, followers: '1.2k', following: 234 },
      shelfBooks: [
        { id: 'hp-1', title: 'Harry Potter e a Pedra...', author: 'J. K. Rowling', dateOrProgress: 'Lido em Jan 2024', ratingBadge: '★ 5.0' },
        { id: 'nome-do-vento', title: 'O Nome do Vento', author: 'Patrick Rothfuss', dateOrProgress: 'Pág. 340 de 656', tagBadge: 'Lendo' },
        { id: 'duna', title: 'Duna', author: 'Frank Herbert', dateOrProgress: 'Lido em Dez 2023', ratingBadge: '★ 4.5' },
        { id: 'cem-anos-solidao', title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', dateOrProgress: 'Lido em Nov 2023', ratingBadge: '★ 5.0' },
        { id: 'torto-arado', title: 'Torto Arado', author: 'Itamar Vieira Junior', dateOrProgress: 'Lido em Out 2023', ratingBadge: '★ 5.0' }
      ],
      favoriteGenres: ['Fantasia Épica', 'Ficção Científica', 'Literatura Brasileira', 'Realismo Mágico', 'Romance Histórico']
    },
    '@marianacosta': {
      name: 'Mariana Costa',
      handle: '@marianacosta',
      verified: true,
      initials: 'MC',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      bio: 'Fascinada por sagas mágicas e clássicos atemporais. Moderadora do Clube de Fantasia. ☕📖',
      role: 'Membro Curador • Nível 4',
      stats: { readBooks: 38, reviews: 19, followers: '890', following: 142 },
      shelfBooks: [
        { id: 'hp-1', title: 'Harry Potter e a Pedra...', author: 'J. K. Rowling', dateOrProgress: 'Lido em Jun 2025', ratingBadge: '★ 5.0' },
        { id: 'pequeno-principe', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', dateOrProgress: 'Lido em Mai 2025', ratingBadge: '★ 4.8' },
        { id: 'hp-6', title: 'Harry Potter e o Enigma...', author: 'J. K. Rowling', dateOrProgress: 'Lido em Mar 2025', ratingBadge: '★ 4.9' }
      ],
      favoriteGenres: ['Fantasia', 'Ficção Juvenil', 'Clássicos']
    },
    '@arthurlins': {
      name: 'Arthur Lins',
      handle: '@arthurlins',
      verified: false,
      initials: 'AL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      bio: 'Leitor voraz de ficção científica, distopias e literatura moderna. Organizador do Clube Noturno.',
      role: 'Leitor Nível 3',
      stats: { readBooks: 29, reviews: 14, followers: '620', following: 180 },
      shelfBooks: [
        { id: '1984', title: '1984', author: 'George Orwell', dateOrProgress: 'Lido em 2025', ratingBadge: '★ 5.0' },
        { id: 'duna', title: 'Duna', author: 'Frank Herbert', dateOrProgress: 'Lido em 2025', ratingBadge: '★ 4.8' },
        { id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari', dateOrProgress: 'Lido em 2024', ratingBadge: '★ 4.7' }
      ],
      favoriteGenres: ['Ficção Distópica', 'Ficção Científica', 'Filosofia']
    },
    '@anasouza': {
      name: 'Ana Souza',
      handle: '@anasouza',
      verified: false,
      initials: 'AS',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      bio: 'Apaixonada pela riqueza da literatura brasileira e narrativas regionais. 🇧🇷✨',
      role: 'Leitora Nível 4',
      stats: { readBooks: 31, reviews: 16, followers: '450', following: 95 },
      shelfBooks: [
        { id: 'torto-arado', title: 'Torto Arado', author: 'Itamar Vieira Junior', dateOrProgress: 'Lido em 2025', ratingBadge: '★ 5.0' },
        { id: 'dom-casmurro', title: 'Dom Casmurro', author: 'Machado de Assis', dateOrProgress: 'Lido em 2025', ratingBadge: '★ 4.9' }
      ],
      favoriteGenres: ['Literatura Brasileira', 'Romance Histórico', 'Poesia']
    },
    '@pedrolima': {
      name: 'Pedro Lima',
      handle: '@pedrolima',
      verified: false,
      initials: 'PL',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      bio: 'Explorando o cosmos e a história humana através das páginas dos livros.',
      role: 'Leitor Nível 3',
      stats: { readBooks: 26, reviews: 8, followers: '340', following: 110 },
      shelfBooks: [
        { id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari', dateOrProgress: 'Lido em 2025', ratingBadge: '★ 4.8' },
        { id: 'duna', title: 'Duna', author: 'Frank Herbert', dateOrProgress: 'Lendo', tagBadge: 'Lendo' }
      ],
      favoriteGenres: ['História', 'Não-Ficção', 'Ficção Científica']
    },
    '@jujubooks': {
      name: 'Juju Books',
      handle: '@jujubooks',
      verified: false,
      initials: 'JB',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      bio: 'Sempre com um marcador de página na mão e uma nova leitura em andamento! 🌸',
      role: 'Leitora Nível 2',
      stats: { readBooks: 22, reviews: 11, followers: '510', following: 260 },
      shelfBooks: [
        { id: 'pequeno-principe', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', dateOrProgress: 'Lido em 2025', ratingBadge: '★ 5.0' },
        { id: 'hp-1', title: 'Harry Potter e a Pedra...', author: 'J. K. Rowling', dateOrProgress: 'Lido em 2024', ratingBadge: '★ 4.8' }
      ],
      favoriteGenres: ['Infantojuvenil', 'Fantasia', 'Romance']
    },
    '@helenaduarte': {
      name: 'Helena Duarte',
      handle: '@helenaduarte',
      verified: true,
      initials: 'HD',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Leitora assídua na Livraria Viva. Apaixonada por ficção científica, distopias e literatura mundial.',
      role: 'Leitora Nível 4',
      stats: { readBooks: 16, reviews: 7, followers: '280', following: 64 },
      shelfBooks: [
        { id: '1984', title: '1984', author: 'George Orwell', dateOrProgress: 'Pág. 144 de 320', tagBadge: 'Lendo' },
        { id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari', dateOrProgress: 'Pág. 280 de 454', tagBadge: 'Lendo' },
        { id: 'pequeno-principe', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', dateOrProgress: 'Pág. 75 de 96', tagBadge: 'Lendo' }
      ],
      favoriteGenres: ['Ficção Distópica', 'História', 'Fantasia']
    }
  },

  communityReviews: [
    {
      id: 'rev-1',
      type: 'review',
      authorName: 'Mariana Costa',
      authorHandle: '@marianacosta',
      authorInitials: 'MC',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      action: 'leu Harry Potter e a Pedra Filosofal',
      badge: 'Leu em 3 dias • Membro Curador',
      time: 'há 2h',
      bookId: 'hp-1',
      bookTitle: 'Harry Potter e a Pedra Filosofal',
      bookAuthor: 'J. K. Rowling • Fantasia',
      rating: 5.0,
      content: 'Recomendo muito esse livro! A ambientação de Hogwarts no outono e o banquete de Natal trazem uma nostalgia aconchegante única. É impossível não querer morar nesse castelo e passar as tardes lendo na sala comunal da Grifinória.',
      likes: 142,
      commentsCount: 2,
      comments: [
        {
          id: 'c1-1',
          authorName: 'Arthur Lins',
          authorHandle: '@arthurlins',
          authorInitials: 'AL',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
          time: 'há 1h',
          text: 'Concordo totalmente! A cada releitura a gente descobre um detalhe novo na narrativa da Lia Wyler.'
        },
        {
          id: 'c1-2',
          authorName: 'Carolina Batimarco',
          authorHandle: '@carolinabatimarco',
          authorInitials: 'CB',
          authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
          time: 'há 30min',
          text: 'Essa edição de 20 anos ficou impecável na estante. Marcou a infância de muita gente!'
        }
      ]
    },
    {
      id: 'rev-2',
      type: 'discussion',
      authorName: 'Arthur Lins',
      authorHandle: '@arthurlins',
      authorInitials: 'AL',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      action: 'iniciou um tópico em Clube dos Apaixonados por Fantasia',
      badge: 'Clube Leitores Noturnos',
      time: 'há 4h',
      topicTitle: 'Dúvidas sobre a saga de Harry Potter...',
      bookId: 'hp-6',
      bookTitle: 'Harry Potter e o Enigma do Príncipe',
      bookAuthor: 'J. K. Rowling • Fantasia Juvenil',
      bookBadge: '1.4k leitores ativos',
      rating: 4.5,
      content: 'Uma das melhores portas de entrada para o hábito da leitura! Alguém aqui relendo a série este ano? Qual livro vocês acham que tem o desenvolvimento de personagens mais maduro: O Cálice de Fogo ou O Enigma do Príncipe?',
      likes: 56,
      commentsCount: 1,
      comments: [
        {
          id: 'c2-1',
          authorName: 'Pedro Lima',
          authorHandle: '@pedrolima',
          authorInitials: 'PL',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
          time: 'há 2h',
          text: 'Para mim, O Enigma do Príncipe é o ápice da maturidade e da construção psicológica do trio.'
        }
      ]
    },
    {
      id: 'rev-3',
      type: 'recommendation',
      authorName: 'Ana Souza',
      authorHandle: '@anasouza',
      authorInitials: 'AS',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      action: 'recomendou uma obra da Literatura Brasileira',
      badge: 'Curadora Nacional',
      time: 'ontem',
      bookId: 'torto-arado',
      bookTitle: 'Torto Arado',
      bookAuthor: 'Itamar Vieira Junior • Literatura Brasileira',
      rating: 5.0,
      content: 'Se você busca uma história emocionante sobre ancestralidade, força feminina e a terra no sertão baiano, precisa ler Torto Arado. É uma obra-prima contemporânea que toca a alma.',
      likes: 89,
      commentsCount: 1,
      comments: [
        {
          id: 'c3-1',
          authorName: 'Helena Duarte',
          authorHandle: '@helenaduarte',
          authorInitials: 'HD',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          time: 'ontem',
          text: 'Acabei de adicionar à minha lista de leitura por causa da sua recomendação, Ana!'
        }
      ]
    },
    {
      id: 'rev-4',
      type: 'quote',
      authorName: 'Carolina Batimarco',
      authorHandle: '@carolinabatimarco',
      authorInitials: 'CB',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      action: 'destacou uma passagem inesquecível',
      badge: 'Leitora Curadora',
      time: 'ontem',
      bookId: 'nome-do-vento',
      bookTitle: 'O Nome do Vento',
      bookAuthor: 'Patrick Rothfuss • Fantasia Épica',
      content: 'A escrita poética de Rothfuss sobre o silêncio de três partes na Estalagem Marco do Percurso continua sendo uma das aberturas mais atmosféricas de toda a fantasia moderna.',
      likes: 118,
      commentsCount: 0,
      comments: []
    }
  ],

  trendingTopics: [
    { tag: '#HarryPotter', count: '1.4k discussões' },
    { tag: '#FiccaoCientifica', count: '920 posts' },
    { tag: '#LiteraturaBrasileira', count: '840 posts' },
    { tag: '#TortoArado', count: '670 posts' },
    { tag: '#ClubeDeLeitura', count: '1.2k membros' }
  ],

  clubs: [
    {
      id: 'club-fantasia',
      name: 'Clube dos Apaixonados por Fantasia',
      members: '2.4k membros',
      activity: '2.4k membros • 14 discussões hoje',
      currentBook: 'Duna',
      readingSpan: 'Livro atual: Duna',
      activeMembersSample: ['CL', 'AB', 'RF', '+120']
    },
    {
      id: 'club-machado',
      name: 'Clube Machado de Assis',
      members: '1.8k membros',
      activity: '1.8k membros • Clássicos Nacionais',
      currentBook: 'Dom Casmurro',
      readingSpan: 'Livro atual: Dom Casmurro'
    },
    {
      id: 'club-scifi',
      name: 'Clube de Ficção Científica',
      members: '1.1k membros',
      activity: '1.1k membros • Ficção Científica',
      currentBook: 'Duna',
      readingSpan: 'Livro: Duna'
    },
    {
      id: 'club-hogwarts',
      name: 'Maratona Hogwarts',
      members: '2.840 leitores no grupo',
      activity: 'Capítulo 11 a 17 • Esta semana',
      currentBook: 'Harry Potter e a Pedra Filosofal',
      readingSpan: 'Capítulo 11 a 17 • Esta semana'
    }
  ],

  readersToFollow: [
    {
      name: 'Carolina Batimarco',
      handle: '@carolinabatimarco',
      initials: 'CB',
      commonBooks: '14 livros em comum',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Ana Souza',
      handle: '@anasouza',
      initials: 'AS',
      commonBooks: '10 livros em comum',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Pedro Lima',
      handle: '@pedrolima',
      initials: 'PL',
      commonBooks: '12 livros em comum',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Juju Books',
      handle: '@jujubooks',
      initials: 'JB',
      commonBooks: '8 livros em comum',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    }
  ],

  thematicLists: [
    {
      id: 'ferias',
      icon: '☀️',
      iconBg: '#FEF3C7',
      title: 'Livros para as férias',
      count: '12 livros',
      desc: 'Leituras leves, romances costeiros e ficção...'
    },
    {
      id: 'classicos',
      icon: '📚',
      iconBg: '#E8F3EE',
      title: 'Clássicos fundamentais',
      count: '8 livros',
      desc: 'Machado de Assis, Dostoiévski, Austen e...'
    },
    {
      id: '2026-2027',
      icon: '📅',
      iconBg: '#F3E8FF',
      title: 'Quero ler em 2026/2027',
      count: '25 livros',
      desc: 'Recomendações salvas de clubes da Livraria'
    },
    {
      id: 'favoritos-vida',
      icon: '💖',
      iconBg: '#FCE7F3',
      title: 'Favoritos da Vida',
      count: '6 livros',
      desc: 'Histórias que transformaram meu modo de...'
    }
  ]
};

window.APP_DATA = APP_DATA;



