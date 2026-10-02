# App Gestante de Fé — guia para quem não é programador

## 1. Imagem da capa
Coloque em `public/images/` com o nome exato: `capa-sob-o-manto-de-maria.jpg`

## 2. Imagens das categorias
Pasta `public/images/categorias/`. Nomes: `bebe.jpg`, `medo.webp`, `ultrassom.webp`, `manha-noite.webp`,
`nossa-senhora.jpg`, `mae.jpg`, `familia.jpg`, `gratidao.jpg`, `nascimento.webp`.
(Capas individuais das orações, opcionais: `public/images/musicas/`.)

## 3. Arquivos MP3
Pasta `public/audio/`. O nome do arquivo deve ser igual ao campo `audio` da oração
(ex.: `/audio/maria-cuida-do-meu-bebe.mp3` → arquivo `public/audio/maria-cuida-do-meu-bebe.mp3`).

## 4–7. Nomes, novas músicas, letras e categoria das orações
Tudo no arquivo `src/data/prayers.ts`:
- Mudar nome: edite `title`.
- Adicionar música: copie um bloco `{ ... }`, cole no fim da lista e troque os campos.
  Ela aparece sozinha na categoria certa.
- Letra: campo `lyrics`. Use `[Verso]`, `[Refrão]`, `[Ponte]` em linhas separadas e linha em branco entre estrofes.
- Categoria: campo `categoryId` (ids em `src/data/categories.ts`).

Categorias (nome, descrição, imagem, quantidade prevista): `src/data/categories.ts`.

## 8. Cores
Arquivo `src/index.css`, bloco do topo (`:root`). Troque os números.

## 9. Textos da home
- Capa (título, subtítulo, frase): `src/components/HeroCover.tsx`
- "Que oração você precisa hoje?" e "Escolha um momento…": `src/pages/Home.tsx`
- Rodapé: `src/components/Footer.tsx`

## 10. Rodar no computador
Instale o Node.js (nodejs.org), abra o Terminal na pasta do projeto e rode:
```
npm install
npm run dev
```
Abra o endereço mostrado (http://localhost:5173).

## 11. Gerar o build
```
npm run build
```
Cria a pasta `dist/` pronta para publicar.

## 12. Publicar
- **Netlify:** app.netlify.com → "Add new site" → "Deploy manually" → arraste a pasta `dist`.
  (Ou conecte o repositório: build `npm run build`, pasta `dist`.)
- **Vercel:** importe o projeto; ele detecta o Vite sozinho. Ou rode `npx vercel` na pasta.
- **Cloudflare Pages:** build `npm run build`, pasta `dist`.

Favoritos e "Continue sua oração" ficam só no aparelho de cada pessoa (localStorage). Não há banco de dados nem login.
