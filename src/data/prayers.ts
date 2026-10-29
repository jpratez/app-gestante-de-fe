import type { Prayer } from '../types'
import { bebe } from './oracoes/bebe'
import { bebeComAudio } from './oracoes/bebe-audio'
import { casal } from './oracoes/casal'
import { dia } from './oracoes/dia'
import { familia } from './oracoes/familia'
import { gratidao } from './oracoes/gratidao'
import { mae } from './oracoes/mae'
import { maria } from './oracoes/maria'
import { medo } from './oracoes/medo'
import { nascimento } from './oracoes/nascimento'
import { ultrassom } from './oracoes/ultrassom'

/**
 * TODAS AS ORAÇÕES DO APP
 *
 * Para adicionar uma nova oração, copie um bloco { ... }, cole no final da lista
 * e troque os campos. Ela aparece sozinha na categoria indicada em "categoryId".
 *
 * categoryId aceitos (veja src/data/categories.ts):
 *   oracoes-bebe | quando-o-medo-aparecer | consultas-exames-ultrassons | da-manha-a-noite
 *   sob-o-manto | coracao-da-mae | oracoes-familia | oracoes-gratidao | preparacao-nascimento | oracoes-casal
 *
 * Só as 10 primeiras de "Orações pelo desenvolvimento e crescimento do seu bebê" têm áudio por enquanto.
 * Para liberar o áudio de uma oração: acrescente audio: "/audio/<id>.mp3" (ou use comAudio) e suba o MP3 em public/audio/.
 * Os textos abaixo são letras de exemplo para testar o app — substitua pelas suas.
 */
export const prayers: Prayer[] = [
  /* ───────────── ORAÇÕES PELO DESENVOLVIMENTO E CRESCIMENTO DO SEU BEBÊ (10 com áudio) ───────────── */
  ...bebeComAudio,

  {
    id: 'quando-eu-estiver-com-medo',
    title: 'Quando Eu Estiver com Medo',
    categoryId: 'quando-o-medo-aparecer',
    duration: '4:02',
    cover: '/images/musicas/quando-eu-estiver-com-medo.jpg',
    tags: ['medo', 'insegurança', 'paz'],
    lyrics: `
[Verso]
Quando o medo bater à minha porta,
eu me lembro de Quem me guarda.
Não estou sozinha nesta estrada,
Maria caminha ao meu lado.

[Refrão]
Não temas, não temas,
Deus está contigo.
Respira fundo, entrega a Ele
tudo o que te faz tremer.

[Verso]
Se o coração disparar,
se a noite parecer longa,
Jesus, acalma a tempestade
e diz de novo: "Paz."

[Refrão]
Não temas, não temas,
Deus está contigo.
Respira fundo, entrega a Ele
tudo o que te faz tremer.
`,
  },
  {
    id: 'quando-minha-cabeca-nao-conseguir-parar',
    title: 'Quando Minha Cabeça Não Conseguir Parar',
    categoryId: 'quando-o-medo-aparecer',
    duration: '3:58',
    cover: '/images/musicas/quando-minha-cabeca-nao-conseguir-parar.jpg',
    tags: ['dormir', 'pensamentos', 'noite', 'insônia'],
    lyrics: `
[Verso]
São tantos pensamentos, Senhor,
vão e vêm sem me deixar descansar.
Coloco-os todos aos Teus pés,
um a um, devagar.

[Refrão]
Aquieta a minha mente, Senhor,
deixa o silêncio falar.
Em Ti eu repouso, em Ti eu respiro,
em Ti posso dormir em paz.

[Verso]
Maria, que guardava tudo no coração,
ensina-me a guardar sem me perder.
O que eu não puder resolver hoje,
Deus já está resolvendo por mim.

[Refrão]
Aquieta a minha mente, Senhor,
deixa o silêncio falar.
Em Ti eu repouso, em Ti eu respiro,
em Ti posso dormir em paz.
`,
  },
  {
    id: 'quando-eu-estiver-ansiosa',
    title: 'Quando Eu Estiver Ansiosa',
    categoryId: 'quando-o-medo-aparecer',
    duration: '3:44',
    cover: '/images/musicas/quando-eu-estiver-ansiosa.jpg',
    tags: ['ansiedade', 'preocupação', 'calma'],
    lyrics: `
[Verso]
A ansiedade me aperta o peito,
quer que eu viva o amanhã hoje.
Mas Tu me pedes só este dia,
só este passo, só este instante.

[Refrão]
Entrego a Ti, Senhor,
o que eu não posso controlar.
Dá-me a calma de quem confia,
dá-me a paz de quem Te espera.

[Ponte]
Maria, Mãe da esperança,
segura a minha mão.

[Refrão]
Entrego a Ti, Senhor,
o que eu não posso controlar.
Dá-me a calma de quem confia,
dá-me a paz de quem Te espera.
`,
  },
  {
    id: 'quando-eu-tiver-medo-do-futuro',
    title: 'Quando Eu Tiver Medo do Futuro',
    categoryId: 'quando-o-medo-aparecer',
    duration: '4:10',
    cover: '/images/musicas/quando-eu-tiver-medo-do-futuro.jpg',
    tags: ['futuro', 'medo', 'confiança'],
    lyrics: `
[Verso]
O futuro é um caminho que não conheço,
mas Quem o preparou, eu conheço.
Tu vais adiante de nós, Senhor,
abrindo estrada onde eu não vejo.

[Refrão]
Eu confio no amanhã
porque Tu já estás lá.
Meu bebê, minha família, meus dias,
tudo repousa em Tuas mãos.

[Verso]
Maria, Mãe do "sim" sem garantias,
ensina-me a dar um passo de cada vez.
Quando eu não entender o caminho,
que eu ainda assim possa confiar.

[Refrão]
Eu confio no amanhã
porque Tu já estás lá.
Meu bebê, minha família, meus dias,
tudo repousa em Tuas mãos.
`,
  },

  /* ───────────── CONSULTAS, EXAMES E ULTRASSONS ───────────── */
  {
    id: 'antes-do-meu-ultrassom',
    title: 'Antes do Meu Ultrassom',
    categoryId: 'consultas-exames-ultrassons',
    duration: '3:36',
    cover: '/images/musicas/antes-do-meu-ultrassom.jpg',
    tags: ['ultrassom', 'exame', 'imagem'],
    lyrics: `
[Verso]
Daqui a pouco vou ver o meu bebê,
e o coração já quer sorrir e tremer.
Senhor, abençoa este momento,
abençoa quem vai me atender.

[Refrão]
Que eu veja com os olhos da fé
a vida que Tu criaste.
Seja qual for a notícia,
fica comigo, Senhor.

[Verso]
Maria, vem comigo à sala de exame,
segura a minha mão no escuro.
Que o meu bebê esteja em paz
e eu também esteja em Ti.

[Refrão]
Que eu veja com os olhos da fé
a vida que Tu criaste.
Seja qual for a notícia,
fica comigo, Senhor.
`,
  },
  {
    id: 'antes-da-consulta',
    title: 'Antes da Consulta',
    categoryId: 'consultas-exames-ultrassons',
    duration: '3:20',
    cover: '/images/musicas/antes-da-consulta.jpg',
    tags: ['consulta', 'pré-natal', 'médico'],
    lyrics: `
[Verso]
Vou à consulta, Senhor,
levando perguntas e esperanças.
Guia as palavras do médico,
guia as minhas, guia a minha escuta.

[Refrão]
Que eu escute com calma,
que eu entenda com paz.
Sê Tu a luz neste encontro,
sê Tu o cuidado em cada decisão.

[Verso]
Maria, Mãe atenta e serena,
acompanha o meu pré-natal.
Que tudo contribua para o bem
da mãe e do bebê que carrego.

[Refrão]
Que eu escute com calma,
que eu entenda com paz.
Sê Tu a luz neste encontro,
sê Tu o cuidado em cada decisão.
`,
  },
  {
    id: 'no-caminho-para-o-medico',
    title: 'No Caminho para o Médico',
    categoryId: 'consultas-exames-ultrassons',
    duration: '3:15',
    cover: '/images/musicas/no-caminho-para-o-medico.jpg',
    tags: ['caminho', 'médico', 'trânsito', 'espera'],
    lyrics: `
[Verso]
Entre ruas e semáforos,
a minha alma reza baixinho.
Cada passo até o consultório
é um passo dentro da Tua providência.

[Refrão]
Vai comigo, Maria,
neste caminho até a consulta.
Leva o meu medo para o céu
e traz de volta a confiança.

[Verso]
Se eu me atrasar, Senhor,
que eu não perca a paz.
Se eu chegar com o coração apertado,
que eu saia com ele em festa.

[Refrão]
Vai comigo, Maria,
neste caminho até a consulta.
Leva o meu medo para o céu
e traz de volta a confiança.
`,
  },
  {
    id: 'enquanto-espero-o-resultado',
    title: 'Enquanto Espero o Resultado',
    categoryId: 'consultas-exames-ultrassons',
    duration: '3:50',
    cover: '/images/musicas/enquanto-espero-o-resultado.jpg',
    tags: ['resultado', 'espera', 'exame', 'ansiedade'],
    lyrics: `
[Verso]
A espera é longa, Senhor,
e o relógio parece não andar.
Mas Tu és o Deus que espera comigo,
que não me deixa só.

[Refrão]
Enquanto espero, eu rezo.
Enquanto rezo, eu descanso.
O resultado está nas Tuas mãos,
e as Tuas mãos são boas.

[Ponte]
Dá-me força para receber
qualquer notícia com fé.

[Refrão]
Enquanto espero, eu rezo.
Enquanto rezo, eu descanso.
O resultado está nas Tuas mãos,
e as Tuas mãos são boas.
`,
  },

  /* ───────────── SOB O MANTO DE NOSSA SENHORA ───────────── */
  {
    id: 'sob-o-teu-manto-maria',
    title: 'Sob o Teu Manto, Maria',
    categoryId: 'sob-o-manto',
    duration: '4:20',
    cover: '/images/musicas/sob-o-teu-manto-maria.jpg',
    tags: ['manto', 'Maria', 'proteção', 'Nossa Senhora'],
    lyrics: `
[Verso]
Sob o teu manto, Maria,
eu me escondo com o meu bebê.
Tua sombra é morada de paz,
teu colo é abrigo de fé.

[Refrão]
Sob o teu manto, Maria,
nada me falta, nada me assusta.
Cobre-nos com a tua ternura,
leva-nos sempre a Jesus.

[Verso]
Mãe de quem espera, Mãe de quem gera,
tu sabes o que sinto no coração.
Abraça esta mãe e esta criança,
guarda-nos até o dia do parto.

[Refrão]
Sob o teu manto, Maria,
nada me falta, nada me assusta.
Cobre-nos com a tua ternura,
leva-nos sempre a Jesus.
`,
  },
  {
    id: 'maria-fica-comigo',
    title: 'Maria, Fica Comigo',
    categoryId: 'sob-o-manto',
    duration: '3:52',
    cover: '/images/musicas/maria-fica-comigo.jpg',
    tags: ['Maria', 'companhia', 'solidão'],
    lyrics: `
[Verso]
Há dias em que eu só quero ficar,
sem pressa, sem palavras, sem respostas.
Maria, fica comigo,
basta a tua presença.

[Refrão]
Fica comigo, Maria,
como ficaste junto da cruz.
Fica comigo, Maria,
como ficaste em Nazaré.

[Verso]
Mãe que conhece a espera,
Mãe que sabe o que é carregar a vida,
senta-te ao meu lado
e reza comigo em silêncio.

[Refrão]
Fica comigo, Maria,
como ficaste junto da cruz.
Fica comigo, Maria,
como ficaste em Nazaré.
`,
  },
  {
    id: 'nossa-senhora-intercede-pelo-meu-bebe',
    title: 'Nossa Senhora, Intercede pelo Meu Bebê',
    categoryId: 'sob-o-manto',
    duration: '4:08',
    cover: '/images/musicas/nossa-senhora-intercede-pelo-meu-bebe.jpg',
    tags: ['intercessão', 'Nossa Senhora', 'bebê'],
    lyrics: `
[Verso]
Nossa Senhora, tu que intercedeste em Caná,
intercede agora por quem ainda não nasceu.
Apresenta ao teu Filho o meu pedido,
o pedido simples de uma mãe.

[Refrão]
Intercede, Maria, pelo meu bebê,
leva a Jesus o que eu não sei dizer.
Que Ele o abençoe, que Ele o proteja,
que Ele o chame pelo nome.

[Verso]
Tu conheces a oração que não tem palavras,
o suspiro que só o céu escuta.
Apresenta esta vida pequenina
ao Deus que a sonhou primeiro.

[Refrão]
Intercede, Maria, pelo meu bebê,
leva a Jesus o que eu não sei dizer.
Que Ele o abençoe, que Ele o proteja,
que Ele o chame pelo nome.
`,
  },
  {
    id: 'maria-ensina-me-a-confiar',
    title: 'Maria, Ensina-me a Confiar',
    categoryId: 'sob-o-manto',
    duration: '4:00',
    cover: '/images/musicas/maria-ensina-me-a-confiar.jpg',
    tags: ['confiança', 'entrega', 'Maria'],
    lyrics: `
[Verso]
Tu disseste "sim" sem ver o fim,
e o céu desceu sobre a tua casa.
Ensina-me, Maria, esse "sim"
que se faz de entrega e de coragem.

[Refrão]
Maria, ensina-me a confiar,
mesmo quando eu não entender.
Que eu diga com o teu coração:
"Faça-se em mim, Senhor."

[Verso]
Confiar não é não sentir medo,
é caminhar com ele de mãos dadas com Deus.
Dá-me a tua fé simples e firme,
de quem sabe em Quem acreditou.

[Refrão]
Maria, ensina-me a confiar,
mesmo quando eu não entender.
Que eu diga com o teu coração:
"Faça-se em mim, Senhor."
`,
  },

  /* ───────────── MAIS ORAÇÕES (uma pasta por categoria: src/data/oracoes/) ───────────── */
  ...bebe,
  ...medo,
  ...ultrassom,
  ...dia,
  ...maria,
  ...mae,
  ...familia,
  ...gratidao,
  ...nascimento,
  ...casal,
]
