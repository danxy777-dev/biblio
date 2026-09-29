/**
 * ============================================================================
 * E-BOOK READER MODAL (Interactive Reading Experience with Real Book Excerpts)
 * ============================================================================
 */

const ReaderModal = {
  currentBook: null,
  currentChapterIndex: 0,
  fontSize: 18,
  fontFamily: 'serif', // 'serif' | 'sans'
  theme: 'theme-warm', // 'theme-light' | 'theme-warm' | 'theme-dark'

  // Authentic Literary Excerpts for Library Catalog
  bookChapters: {
    'hp-1': [
      {
        title: 'Capítulo 1: O Menino que Sobreviveu',
        readingTime: '4 min de leitura',
        content: `O Sr. e a Sra. Dursley, do número 4 da Rua dos Alfeneiros, tinham orgulho de dizer que eram perfeitamente normais, muito obrigado. Eram as últimas pessoas no mundo que se esperaria envolver em qualquer coisa estranha ou misteriosa, porque simplesmente não acreditavam em tais bobagens.

O Sr. Dursley era diretor de uma firma chamada Grunnings, que fabricava brocas. Era um homem corpulento e rechonchudo, quase sem pescoço, embora tivesse um bigode muito avantajado. A Sra. Dursley era loura e magra, com o dobro do pescoço comum, o que lhe era extraordinariamente útil para espionar os vizinhos sobre as cercas dos jardins.

Os Dursley tinham um filhinho chamado Duda, e na opinião deles não havia garoto melhor em nenhum lugar da Terra. Eles tinham tudo o que queriam, mas guardavam também um segredo sombrio, e o maior receio deles era que alguém o descobrisse. Achavam que não suportariam se alguém soubesse dos Potter.

A Sra. Potter era irmã da Sra. Dursley, mas as duas não se viam havia muitos anos; na verdade, a Sra. Dursley fingia que não tinha irmã, porque esta e o marido imprestável eram o mais indursleyano possível. Os Dursley estremeciam só de pensar no que diriam os vizinhos se os Potter aparecessem na rua.`
      },
      {
        title: 'Capítulo 2: O Vidro que Sumiu',
        readingTime: '5 min de leitura',
        content: `Quase dez anos haviam se passado desde o dia em que os Dursley acordaram e encontraram seu sobrinho na soleira da porta, mas a Rua dos Alfeneiros não havia mudado quase nada. O sol nascia nos mesmos jardins bem cuidados e iluminava o número 4 de latão na porta da frente.

Apenas as fotografias sobre a lareira mostravam o quanto o tempo correra. Onde antes havia fotos de um bebê rechonchudo como uma bola de praia, agora havia retratos de um garoto grande e loiro andando de bicicleta nova, jogando videogame ou sendo mimado pela mãe.

Não havia nenhum sinal visível de que outro garoto morava na casa. No entanto, Harry Potter ainda estava lá, dormindo no momento no armário escuro e empoeirado sob a escada.

— Acorde! Levante-se! Agora mesmo! — gritou a tia Petúnia batendo na porta de madeira com força. Harry acordou assustado com uma aranha caindo sobre sua testa.`
      },
      {
        title: 'Capítulo 3: As Cartas de Ninguém',
        readingTime: '6 min de leitura',
        content: `A fuga da jiboia-brasileira no zoológico rendera a Harry seu mais longo castigo. Quando finalmente teve permissão para sair do armário sob a escada, as férias de verão já haviam começado e Duda já quebrara sua filmadora nova, seu aeromodelo e batera com a bicicleta na pobre D. Figg.

Harry estava radiante por ter terminado o ano letivo. Mas numa manhã ensolarada de julho, algo inacreditável aconteceu quando o correio chegou.

Havia uma carta para Harry. Um envelope grosso e pesado de pergaminho amarelado, com tinta verde-esmeralda e um selo de cera púrpura com um brasão: um leão, uma águia, um texugo e uma serpente circundando uma grande letra H.

O endereço não deixava dúvidas:
Sr. H. Potter
O Armário sob a Escada
Rua dos Alfeneiros, 4
Little Whinging, Surrey.`
      }
    ],

    'dom-casmurro': [
      {
        title: 'Capítulo 1: Do Título',
        readingTime: '3 min de leitura',
        content: `Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao pé de mim, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus, porém o caso é que me fatigavam.

Fechei os olhos e fingi dormir. Não pude contudo; o rapaz continuou a recitar, e eu a cochilar de verdade. Quando acordei, estávamos na estação, e o poeta olhava-me desapontado.

No dia seguinte entrou a dizer aos vizinhos que eu era um casmurro. O título pegou. Não me zanguei. Os amigos que me restam são de data recente; todos os antigos foram estudar a geologia dos campos santos. Quanto à minha vida, é o que vão ler.`
      },
      {
        title: 'Capítulo 2: Do Primeiro Encontro e de Capitu',
        readingTime: '4 min de leitura',
        content: `Ia a entrar na sala de visitas, quando ouvi proferir o meu nome e escondi-me atrás da porta. A casa era a da Rua de Matacavalos, o mês novembro, o ano é que é um tanto remoto, mas eu não hei de trocar as datas da minha vida só para agradar aos que não amam histórias velhas; o ano era 1857.

— D. Glória, a senhora persiste na ideia de meter o Bentinho no seminário? — perguntava José Dias.

Minha mãe respondeu com a voz mansa que era promessa feita a Deus. José Dias insistiu que os tempos eram outros e que eu andava muito apegado à filha do Pádua.

Capitu! Chamava-se Capitolina, mas todos a chamavam Capitu. Éramos vizinhos de muro baixo. Ela tinha quatorze anos, eu quinze; tínhamos crescido juntos, brincando nos quintais arborizados da velha cidade do Rio de Janeiro.`
      },
      {
        title: 'Capítulo 3: Olhos de Ressaca',
        readingTime: '5 min de leitura',
        content: `Capitu era Capitu, isto é, uma criatura muito particular, mais mulher do que eu era homem. Olhos de ressaca? Vá, de ressaca. É o que me dá ideia daquela feição nova. Traziam não sei que fluido misterioso e enérgico, uma força que arrastava para dentro, como a vaga que se retira da praia nos dias de grande marulho.

Para não ser arrastado, agarrei-me às outras partes vizinhas, às orelhas, aos braços, aos cabelos espalhados pelos ombros; mas tão depressa buscava as pupilas, a onda que saía delas vinha crescendo, cava e escura, ameaçando engolir-me.

Ficamos em silêncio defronte um do outro, com as mãos entrelaçadas sobre o muro de pedras cobertas de musgo. O coração batia-me com tanta violência que parecia querer saltar do peito.`
      }
    ],

    '1984': [
      {
        title: 'Parte 1 — Capítulo 1: O Grande Irmão',
        readingTime: '5 min de leitura',
        content: `Era um dia frio e luminoso de abril, e os relógios batiam treze horas. Winston Smith, de queixo enfiado no peito no esforço de esquivar-se ao vento desagradável, passou correndo pelas portas de vidro das Mansões Victory, embora não com rapidez suficiente para impedir que uma lufada de poeira arenosa entrasse com ele.

O vestíbulo cheirava a repolho cozido e a capachos velhos. Numa das extremidades, um pôster colorido, grande demais para o ambiente interno, fora pregado à parede. Representava apenas um rosto enorme, de mais de um metro de largura: o rosto de um homem de cerca de quarenta e cinco anos, de bigode preto espesso e traços rudes e bonitos.

Winston dirigiu-se às escadas. Era inútil tentar o elevador. Mesmo nos melhores momentos, raramente funcionava, e no momento a corrente elétrica era cortada durante o dia pelo Ministério da Paz.

Em cada patamar, defronte ao poço do elevador, o cartaz com o rosto enorme fitava a pessoa da parede. O GRANDE IRMÃO ESTÁ DE OLHO EM VOCÊ, dizia a legenda, enquanto os olhos escuros pareciam perfurar os seus.`
      },
      {
        title: 'Parte 1 — Capítulo 2: O Diário Proibido',
        readingTime: '4 min de leitura',
        content: `No quarto de Winston, uma voz metálica e suave lia uma série de números sobre a produção de ferro-gusa. A voz vinha de uma placa retangular de metal espelhado que formava parte da superfície da parede da direita. A teletela recebia e transmitia simultaneamente.

Qualquer som que Winston fizesse, acima de um sussurro muito baixo, seria captado por ela; além disso, enquanto permanecesse no campo de visão comandado pela placa de metal, ele podia ser visto tanto quanto ouvido.

Winston sentou-se na pequena alcova que ficava estrategicamente fora do alcance visual da teletela. Abriu a gaveta, tirou o caderno de capa de couro e páginas amareladas que comprara clandestinamente numa loja de antiguidades e uma caneta de aparo.

Escrever um diário não era explicitamente ilegal (nada era ilegal, uma vez que já não havia leis), mas, se fosse descoberto, era razoavelmente certo que seria punido com a morte ou com vinte e cinco anos num campo de trabalhos forçados.`
      }
    ],

    'torto-arado': [
      {
        title: 'Fio de Corte — Capítulo 1: O Segredo da Mala',
        readingTime: '4 min de leitura',
        content: `Foi numa tarde de sol escaldante na fazenda Água Negra que encontramos a mala velha sob a cama de nossa avó Donana. Uma mala de couro ressecado pelo tempo, com fivelas de metal oxidado que guardavam pertences dos tempos de antes.

Minha irmã Bibiana e eu éramos meninas curiosas. Donana havia saído para colher ervas no terreiro e a casa de taipa descansava num silêncio quebrado apenas pelo vento seco que sacudia a copa das jaqueiras.

Puxamos a mala com cuidado. Entre panos rendados e orações impressas em papel frágil, encontramos uma faca de prata. A lâmina brilhava como um raio aprisionado no escuro.

Não sabíamos que aquele objeto cortaria a nossa infância ao meio. Colocamos a faca na boca para sentir o gosto do metal misterioso. O sangue jorrou quente e rubro, manchando o chão de terra batida para sempre.`
      },
      {
        title: 'Fio de Corte — Capítulo 2: A Voz e o Silêncio',
        readingTime: '5 min de leitura',
        content: `Depois daquele dia, a voz de uma de nós se calou no mundo dos homens, mas passou a ecoar mais forte dentro da terra. Aprendemos a falar com os olhos, com os gestos e com a respiração.

Água Negra era uma fazenda imensa nos confins da Chapada Diamantina. Nossos pais e avós trabalhavam na terra dos senhores sem receber salário: trabalhavam pelo direito de erguer uma casa de barro sem telhas e de plantar uma roça de mandioca que nunca era inteiramente nossa.

Severo, nosso primo, dizia que a terra pertencia a quem nela derramava o suor e o sangue. Nós éramos os verdadeiros herdeiros dos rios, das matas e dos encantados dos Jarês que desciam nos terreiros nas noites de lua cheia para curar nossas dores.`
      }
    ],

    'sapiens': [
      {
        title: 'Capítulo 1: Um Animal de Nenhuma Importância',
        readingTime: '5 min de leitura',
        content: `Cerca de 13,5 bilhões de anos atrás, a matéria, a energia, o tempo e o espaço surgiram no que é conhecido como Big Bang. O relato dessas características fundamentais do nosso universo é a física.

Cerca de 3,8 bilhões de anos atrás, num planeta chamado Terra, certas moléculas se combinaram para formar estruturas particularmente grandes e complexas chamadas organismos. O relato dos organismos é a biologia.

O que é crucial notar é que, durante a maior parte da história humana, os membros do gênero Homo não desempenharam nenhum papel de destaque no ecossistema planetário. Éramos animais insignificantes, cujo impacto sobre o meio ambiente não era maior do que o de gorilas, vaga-lumes ou águas-vivas.

Três grandes revoluções moldaram o curso da história: a Revolução Cognitiva (há cerca de 70 mil anos), a Revolução Agrícola (há cerca de 12 mil anos) e a Revolução Científica (há apenas 500 anos).`
      },
      {
        title: 'Capítulo 12: A Lei Unificadora do Dinheiro',
        readingTime: '4 min de leitura',
        content: `O dinheiro é o mais universal e eficiente sistema de confiança mútua jamais inventado pela humanidade.

Ao contrário de religiões que exigem conversão moral ou crença em divindades invisíveis, o dinheiro opera mesmo entre pessoas que não confiam umas nas outras ou que professam crenças políticas diametralmente opostas.

Quando um comerciante muçulmano vende especiarias para um cavaleiro cristão ou um banqueiro judeu, todos eles concordam no valor intrínseco de uma moeda de ouro. O dinheiro é a única confiança construída pelo homem que une a totalidade do globo sem disparar um único canhão.`
      }
    ],

    'pequeno-principe': [
      {
        title: 'Capítulo 1: A Jiboia que Engoliu um Elefante',
        readingTime: '3 min de leitura',
        content: `Certa vez, quando eu tinha seis anos, vi num livro sobre a floresta virgem, chamado Histórias Vividas, uma imponente gravura. Representava uma serpente jiboia engolindo uma fera.

O livro dizia: "As jiboias engolem a presa inteira, sem mastigar. Depois não conseguem se mover e dormem durante os seis meses da digestão."

Refleti muito sobre as aventuras da selva e, por minha vez, consegui desenhar com um lápis de cor o meu primeiro desenho. Meu desenho número 1. Mostrei minha obra-prima às pessoas grandes e perguntei se o meu desenho lhes causava medo.

Elas me responderam: "Por que um chapéu causaria medo?"
Meu desenho não representava um chapéu. Representava uma jiboia digerindo um elefante.`
      },
      {
        title: 'Capítulo 21: A Raposa e o Segredo do Coração',
        readingTime: '4 min de leitura',
        content: `Foi então que apareceu a raposa.

— Bom dia — disse a raposa.
— Bom dia — respondeu polidamente o pequeno príncipe, que olhou em volta mas não viu nada.
— Estou aqui — disse a voz —, debaixo da macieira...
— Quem é você? — perguntou o principezinho. — Você é bem bonita...
— Sou uma raposa.
— Venha brincar comigo — propôs o pequeno príncipe. — Estou tão triste...
— Eu não posso brincar com você — disse a raposa. — Não fui cativada.
— O que significa "cativar"?
— É uma coisa muito esquecida — disse a raposa. — Significa "criar laços". Se você me cativa, nós teremos necessidade um do outro. Você será para mim único no mundo. Eu serei para você única no mundo...

Eis o meu segredo. É muito simples: só se vê bem com o coração. O essencial é invisível aos olhos.`
      }
    ],

    'nome-do-vento': [
      {
        title: 'Prólogo: O Silêncio de Três Partes',
        readingTime: '3 min de leitura',
        content: `Anoitecia de novo. A hospedaria Marco do Caminho jazia em silêncio, e era um silêncio de três partes.

A parte mais óbvia era uma quietude oca e ressonante, feita das coisas que faltavam. Se houvesse vento, ele sussurraria por entre as árvores, faria ranger a placa da hospedaria em seus ganchos e empurraria o silêncio rua abaixo como folhas caídas de outono. Mas não havia vento.

A segunda parte era um silêncio menor, que se aninhava dentro do primeiro. Era feito das conversas abafadas de alguns homens sentados em mesas de carvalho, evitando encarar as sombras compridas que se estendiam pelas paredes de pedra.

A terceira parte do silêncio não era fácil de notar. Se você escutasse por uma hora, talvez começasse a senti-la no piso de madeira encerada, no pesado balcão de mogno polido e nas mãos do homem de cabelos ruivos como chama que limpava um copo com um pano de linho. O homem se chamava Kote. Mas um dia ele já fora chamado de Kvothe.`
      },
      {
        title: 'Capítulo 1: Um Lugar para Demônios',
        readingTime: '5 min de leitura',
        content: `Era a primeira verdadeira noite de outono. As folhas das árvores ao redor da hospedaria começavam a mudar de cor, tingindo-se de cobre e dourado na luz do entardecer.

Um velho carroceiro chamado Cob contava uma história ao redor da lareira sobre Taborlin, o Grande. Dizia que Taborlin fora aprisionado no alto de uma torre de pedra sem portas nem janelas, mas que conhecia o Nome de todas as coisas.

— Taborlin olhou para a parede de pedra — narrava Cob com os olhos arregalados — e disse: "Pedra, quebre!" E a pedra quebrou como vidro, abrindo um vão para o céu da noite!

A porta da hospedaria se abriu com um estrondo gélido, trazendo a escuridão da estrada e notícias de criaturas de patas afiadas que rondavam os bosques.`
      }
    ],

    'duna': [
      {
        title: 'Livro 1: Arrakis — O Começo',
        readingTime: '5 min de leitura',
        content: `Um começo é um tempo de delicadeza suprema ao cuidar para que os equilíbrios fiquem corretos. Isso sabe toda irmã da Bene Gesserit. Para começar o estudo da vida de Muad'Dib, cuide primeiro de situá-lo em sua própria época: nascido no 57º ano do Imperador Padishah, Shaddam IV.

E cuide de situá-lo em seu próprio planeta: o mundo de Arrakis, também conhecido como Duna.

Uma semana antes da partida da Casa Atreides de Caladan para Arrakis, uma velha senhora de xale preto e olhos inquisidores visitou o jovem Paul no castelo ancestral. Era a Reverenda Madre Gaius Helen Mohiam.

— O que você sabe sobre a Gom Jabbar, Paul? — perguntou ela, segurando uma pequena caixa preta de metal e uma agulha envenenada que brilhava na penumbra do quarto.`
      }
    ],

    'rev-bichos': [
      {
        title: 'Capítulo 1: O Sonho do Velho Major',
        readingTime: '4 min de leitura',
        content: `O Sr. Jones, da Granja do Solar, trancara os galinheiros para a noite, mas estava bêbado demais para se lembrar de fechar as portinholas. Com o facho de luz de sua lanterna oscilando de um lado para outro, cambaleou pelo pátio, tirou as botas na cozinha e foi para a cama, onde a Sra. Jones já roncava.

Tão logo a luz do quarto se apagou, houve um grande alvoroço em todos os estábulos e galpões da granja. Correra a notícia de que o Velho Major, o respeitado porco premiado da raça Berkshire, tivera um sonho estranho na noite anterior e desejava transmiti-lo aos outros animais.

— Camaradas — começou o Major com voz profunda —, qual é a natureza de nossa vida? Sejamos francos: nossa vida é miserável, laboriosa e curta. O Homem é o único ser que consome sem produzir. Ele não dá leite, não põe ovos, é fraco demais para puxar o arado. E, no entanto, é o senhor de todos os animais!

Todos os animais escutavam num silêncio solene, enquanto as primeiras notas do hino "Bichos da Inglaterra" ecoavam na escuridão.`
      }
    ],

    'bras-cubas': [
      {
        title: 'Ao Leitor & Óbito do Autor',
        readingTime: '3 min de leitura',
        content: `Que Stendhal haja confessado que escreveu um dos seus livros para cem leitores, coisa é que admira e consterna. O que não admira, nem provavelmente consternará, é se este outro livro não tiver os cem leitores de Stendhal, nem cinquenta, nem vinte, e quando muito, dez.

Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte. Suposto o uso vulgar seja começar pelo nascimento, duas considerações me levaram a adotar diferente método: a primeira é que eu não sou propriamente um autor defunto, mas um defunto autor, para quem a campa foi outro berço.

Moi-me a ideia de que a vida é um contraste perene de esperanças vãs e desenganos certos, e expirei numa sexta-feira de agosto, às duas horas da tarde, na minha bela chácara do Catumbi.`
      }
    ]
  },

  open(bookId) {
    const st = window.store || (typeof store !== 'undefined' ? store : null);
    const appData = window.APP_DATA || (typeof APP_DATA !== 'undefined' ? APP_DATA : null);
    const book = (st ? st.getBook(bookId) : null) || (appData && appData.books ? appData.books.find(b => b.id === bookId) || appData.books[0] : null);
    if (!book) return;

    this.currentBook = book;
    this.currentChapterIndex = 0;

    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    this.renderModal(modalContainer);
    modalContainer.classList.add('active');

    // Register active reading session
    if (st) {
      const currentProg = st.getProgress(book.id) || { page: 1, total: book.pages || 320, percent: 1 };
      st.updateReadingProgress(book.id, currentProg.page);
    }
  },

  getChaptersForCurrentBook() {
    if (this.bookChapters[this.currentBook.id]) {
      return this.bookChapters[this.currentBook.id];
    }

    // Dynamic high quality fallback chapters for any other book
    return [
      {
        title: 'Capítulo 1: A Abertura da Jornada',
        readingTime: '4 min de leitura',
        content: `Você está iniciando a leitura digital de "${this.currentBook.title}", uma das obras mais conceituadas da categoria de ${this.currentBook.category}.

${this.currentBook.synopsis || 'Uma narrativa arrebatadora que transporta o leitor por reflexões profundas sobre as escolhas humanas, o destino e as conexões que definem nossas vidas.'}

As páginas desta edição especial contam com diagramação confortável, notas de rodapé integradas e sincronização de progresso diretamente na sua estante da Livraria Viva.`
      },
      {
        title: 'Capítulo 2: O Desenvolvimento da Trama',
        readingTime: '5 min de leitura',
        content: `À medida que os personagens avançam pelos dilemas centrais da história, novas camadas de complexidade se revelam. O autor ${this.currentBook.author} constrói diálogos incisivos e descrições ricas que prendem a atenção do leitor do primeiro ao último parágrafo.

"Não vale a pena viver sonhando e se esquecer de viver." Cada passagem desta obra foi pensada para provocar reflexões marcantes sobre nosso tempo e nossas aspirações.`
      },
      {
        title: 'Capítulo 3: O Clímax Literário',
        readingTime: '6 min de leitura',
        content: `No auge da narrativa, todas as linhas de tensão convergem para um desfecho memorável. Os arcos dramáticos se fecham com elegância e profundidade artística.

Continue explorando as edições completas e participe dos debates no fórum da Comunidade da Livraria Viva para compartilhar suas impressões e resenhas com outros leitores!`
      }
    ];
  },

  renderModal(container) {
    const book = this.currentBook;
    const chapters = this.getChaptersForCurrentBook();
    const activeChapter = chapters[this.currentChapterIndex] || chapters[0];
    const totalChapters = chapters.length;
    const calculatedPage = Math.max(1, Math.round(((this.currentChapterIndex + 1) / totalChapters) * (book.pages || 300)));
    const percent = Math.round(((this.currentChapterIndex + 1) / totalChapters) * 100);

    const isFav = store.isFavorite(book.id);

    container.innerHTML = `
      <div class="reader-modal-dialog ${this.theme}">
        <!-- Top Reader Toolbar -->
        <div class="reader-toolbar">
          <div class="reader-book-meta">
            <button class="reader-back-btn" id="reader-btn-close" title="Fechar leitor e voltar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Voltar</span>
            </button>
            <div class="reader-headings">
              <h3 class="reader-title">${book.title}</h3>
              <span class="reader-author">${book.author} • ${book.category}</span>
            </div>
          </div>

          <div class="reader-controls">
            <!-- Chapter Selector Dropdown -->
            <select id="reader-select-chapter" class="reader-chapter-dropdown" title="Selecionar capítulo">
              ${chapters.map((c, i) => `
                <option value="${i}" ${this.currentChapterIndex === i ? 'selected' : ''}>${c.title}</option>
              `).join('')}
            </select>

            <!-- Theme Switcher -->
            <div class="theme-picker" title="Tema de Leitura">
              <button class="theme-btn light ${this.theme === 'theme-light' ? 'active' : ''}" data-theme="theme-light" title="Modo Claro">A</button>
              <button class="theme-btn warm ${this.theme === 'theme-warm' ? 'active' : ''}" data-theme="theme-warm" title="Modo Sépia / Pergaminho">A</button>
              <button class="theme-btn dark ${this.theme === 'theme-dark' ? 'active' : ''}" data-theme="theme-dark" title="Modo Noturno">A</button>
            </div>

            <!-- Font Resizer -->
            <div class="font-controls" title="Ajuste de Tipografia">
              <button class="font-btn" id="font-decrease" title="Diminuir fonte">A-</button>
              <button class="font-btn" id="font-increase" title="Aumentar fonte">A+</button>
            </div>

            <!-- Bookmark / Favorite Heart -->
            <button class="reader-bookmark-btn ${isFav ? 'active' : ''}" id="reader-btn-fav" title="${isFav ? 'Favoritado' : 'Favoritar livro'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Reader Text Area -->
        <div class="reader-body">
          <div class="reader-text-container ${this.fontFamily === 'sans' ? 'font-sans' : ''}" style="font-size: ${this.fontSize}px;">
            <h2 class="reader-chapter-title">${activeChapter.title}</h2>
            <div class="reader-reading-time-pill">
              <span>⏱️ ${activeChapter.readingTime || '4 min de leitura'}</span>
              <span>•</span>
              <span>Capítulo ${this.currentChapterIndex + 1} de ${totalChapters}</span>
            </div>

            <div class="reader-paragraphs">
              ${activeChapter.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
            </div>

            <!-- End of chapter prompt -->
            <div class="reader-end-chapter-box">
              <p style="margin: 0; font-size: 0.9rem; opacity: 0.85;">Fim do ${activeChapter.title}</p>
              ${this.currentChapterIndex < totalChapters - 1 ? `
                <button class="reader-end-chapter-btn" id="btn-reader-next-chap-bottom">
                  <span>Avançar para o próximo capítulo &rarr;</span>
                </button>
              ` : `
                <button class="reader-end-chapter-btn" id="btn-reader-finish-book" style="background: #059669;">
                  <span>🎉 Concluir leitura do livro</span>
                </button>
              `}
            </div>
          </div>
        </div>

        <!-- Reader Bottom Toolbar -->
        <div class="reader-footer">
          <button class="reader-page-nav-btn" id="btn-prev-page" ${this.currentChapterIndex <= 0 ? 'disabled' : ''}>
            <span>&larr;</span> Capítulo anterior
          </button>
          
          <div class="reader-progress-tracker">
            <span class="reader-page-indicator">Capítulo ${this.currentChapterIndex + 1} de ${totalChapters} (Pág. ${calculatedPage} de ${book.pages || 300})</span>
            <div class="reader-progress-track">
              <div class="reader-progress-fill" style="width: ${percent}%"></div>
            </div>
            <span class="reader-percent-label">${percent}% da obra lida • Sincronizado com a sua estante</span>
          </div>

          <button class="reader-page-nav-btn" id="btn-next-page" ${this.currentChapterIndex >= totalChapters - 1 ? 'disabled' : ''}>
            Próximo capítulo <span>&rarr;</span>
          </button>
        </div>
      </div>
    `;

    this.bindEvents(container, chapters);
  },

  close() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.classList.remove('active');
      modalContainer.innerHTML = '';
    }
  },

  bindEvents(container, chapters) {
    const closeBtn = document.getElementById('reader-btn-close');
    if (closeBtn) closeBtn.onclick = () => this.close();

    // Chapter dropdown
    const chapterSelect = document.getElementById('reader-select-chapter');
    if (chapterSelect) {
      chapterSelect.onchange = (e) => {
        this.currentChapterIndex = parseInt(e.target.value) || 0;
        this.saveAndRerender(container);
      };
    }

    // Theme selector buttons
    container.querySelectorAll('.theme-btn').forEach(btn => {
      btn.onclick = () => {
        this.theme = btn.getAttribute('data-theme');
        const dialog = container.querySelector('.reader-modal-dialog');
        if (dialog) {
          dialog.className = `reader-modal-dialog ${this.theme}`;
        }
        container.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    });

    // Font size controls
    const incBtn = document.getElementById('font-increase');
    const decBtn = document.getElementById('font-decrease');
    const textContainer = container.querySelector('.reader-text-container');

    if (incBtn && textContainer) {
      incBtn.onclick = () => {
        if (this.fontSize < 28) {
          this.fontSize += 2;
          textContainer.style.fontSize = `${this.fontSize}px`;
        }
      };
    }
    if (decBtn && textContainer) {
      decBtn.onclick = () => {
        if (this.fontSize > 14) {
          this.fontSize -= 2;
          textContainer.style.fontSize = `${this.fontSize}px`;
        }
      };
    }

    // Favorite heart toggle
    const favBtn = document.getElementById('reader-btn-fav');
    if (favBtn) {
      favBtn.onclick = () => {
        const isFav = store.toggleFavorite(this.currentBook.id);
        favBtn.classList.toggle('active', isFav);
        const svg = favBtn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
      };
    }

    // Prev / Next Chapter buttons
    const prevBtn = document.getElementById('btn-prev-page');
    const nextBtn = document.getElementById('btn-next-page');
    const bottomNextBtn = document.getElementById('btn-reader-next-chap-bottom');
    const finishBtn = document.getElementById('btn-reader-finish-book');

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.currentChapterIndex > 0) {
          this.currentChapterIndex--;
          this.saveAndRerender(container);
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.currentChapterIndex < chapters.length - 1) {
          this.currentChapterIndex++;
          this.saveAndRerender(container);
        }
      };
    }

    if (bottomNextBtn) {
      bottomNextBtn.onclick = () => {
        if (this.currentChapterIndex < chapters.length - 1) {
          this.currentChapterIndex++;
          this.saveAndRerender(container);
        }
      };
    }

    if (finishBtn) {
      finishBtn.onclick = () => {
        store.updateReadingProgress(this.currentBook.id, this.currentBook.pages || 300);
        Toast.show(`🎉 Parabéns! Você concluiu "${this.currentBook.title}"! Meta atualizada.`, 'success');
        this.close();
      };
    }

    // Keyboard Arrow navigation inside reader
    const keyHandler = (e) => {
      const modal = document.getElementById('modal-container');
      if (!modal || !modal.classList.contains('active')) {
        document.removeEventListener('keydown', keyHandler);
        return;
      }
      if (e.key === 'ArrowRight' && this.currentChapterIndex < chapters.length - 1) {
        this.currentChapterIndex++;
        this.saveAndRerender(container);
      } else if (e.key === 'ArrowLeft' && this.currentChapterIndex > 0) {
        this.currentChapterIndex--;
        this.saveAndRerender(container);
      }
    };
    document.addEventListener('keydown', keyHandler);
  },

  saveAndRerender(container) {
    const chapters = this.getChaptersForCurrentBook();
    const calculatedPage = Math.max(1, Math.round(((this.currentChapterIndex + 1) / chapters.length) * (this.currentBook.pages || 300)));
    store.updateReadingProgress(this.currentBook.id, calculatedPage);
    this.renderModal(container);
    
    // Smooth scroll reading area back to top
    const readerBody = container.querySelector('.reader-body');
    if (readerBody) {
      readerBody.scrollTop = 0;
    }
  }
};

window.ReaderModal = ReaderModal;
