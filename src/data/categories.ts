import type { Category } from '../types'

/**
 * CATEGORIAS DO APP
 * Para mudar nome, descrição ou imagem de uma categoria, edite aqui.
 * "total" é a quantidade prevista de orações (aparece no card).
 */
export const categories: Category[] = [
  {
    id: 'oracoes-bebe',
    title: 'Orações pelo desenvolvimento e crescimento do seu bebê',
    description: 'Para colocar a vida, a saúde e o futuro do seu bebê nas mãos de Deus.',
    image: '/images/categorias/bebe.webp',
    total: 18,
    tone: ['#F8E6E2', '#EBCBC6'],
  },
  {
    id: 'quando-o-medo-aparecer',
    title: 'Orações para os medos da gravidez',
    description: 'Orações para os momentos de preocupação, insegurança e ansiedade.',
    image: '/images/categorias/medo.webp',
    total: 16,
    tone: ['#E3ECF7', '#BFD2EC'],
  },
  {
    id: 'consultas-exames-ultrassons',
    title: 'Orações para consultas, exames e ultrassons',
    description: 'Para rezar antes, durante e depois dos momentos importantes do pré-natal.',
    image: '/images/categorias/ultrassom.webp',
    total: 12,
    tone: ['#E8F1F8', '#C6DBEC'],
  },
  {
    id: 'da-manha-a-noite',
    title: 'Orações para começar e terminar o dia',
    description: 'Comece e termine cada dia da gravidez em oração.',
    image: '/images/categorias/manha-noite.webp',
    total: 15,
    tone: ['#F7EDD6', '#E8D6A9'],
  },
  {
    id: 'sob-o-manto',
    title: 'Orações para pedir força e sabedoria na missão de ser mãe',
    description: 'Para pedir a Maria força e sabedoria na missão de ser mãe.',
    image: '/images/categorias/nossa-senhora.webp',
    total: 16,
    tone: ['#C9DAF0', '#93B1DB'],
  },
  {
    id: 'coracao-da-mae',
    title: 'Orações para você, mamãe',
    description: 'Para os dias de cansaço, sensibilidade, cobrança e necessidade de acolhimento.',
    image: '/images/categorias/mae.webp',
    total: 14,
    tone: ['#F6E3E0', '#E7C2BE'],
  },
  {
    id: 'oracoes-familia',
    title: 'Orações pela sua família',
    description: 'Para rezar pelo pai, irmãos, avós e pela família que recebe esta nova vida.',
    image: '/images/categorias/familia.webp',
    total: 12,
    tone: ['#F4ECDF', '#E3D3BA'],
  },
  {
    id: 'oracoes-gratidao',
    title: 'Orações de gratidão',
    description: 'Para agradecer a Deus pelas pequenas e grandes bênçãos da gestação.',
    image: '/images/categorias/gratidao.webp',
    total: 10,
    tone: ['#F8EFD9', '#EAD8A8'],
  },
  {
    id: 'preparacao-nascimento',
    title: 'Orações para os últimos meses e preparação para o nascimento',
    description: 'Para os últimos meses, a preparação para o parto e o encontro com o bebê.',
    image: '/images/categorias/nascimento.webp',
    total: 18,
    tone: ['#DDEAF6', '#B3CCE6'],
  },
  {
    id: 'oracoes-casal',
    title: 'Orações para o Casal',
    description: 'Para rezar juntos, fortalecer o amor e se preparar como pais para a chegada do bebê.',
    image: '/images/categorias/casal.webp',
    total: 16,
    tone: ['#F6E6DF', '#E6C7BC'],
  },
]
