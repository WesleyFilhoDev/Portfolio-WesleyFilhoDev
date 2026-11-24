# Wesley Filho Dev · Portfólio

Site pessoal (one-page) feito em **Next.js 16 (App Router) + TypeScript**, implementando o design
"Portfólio · Home" da marca Wesley Filho Dev.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Estrutura

```
src/
  app/
    layout.tsx        # fonte Manrope (next/font), metadados
    page.tsx          # monta a página
    tokens.css        # tokens do design system (cores, espaçamentos, raios)
    globals.css       # base + peças compartilhadas (eyebrow, títulos de seção)
    icon.svg          # favicon com o monograma WF
  assets/images/      # fotos da hero e do "Sobre"
  assets/images/projects/  # prints da tela inicial de cada projeto
  components/
    brand/            # Mark, Logo, Button — portados do design system wfdev
    layout/           # SplashScreen, NavBar, Footer
    sections/         # Hero, Services (trilha), About, Projects (esteira), Contact
    icons.tsx
  data/site.ts        # todo o conteúdo editável (textos, projetos, contatos)
  hooks/useInView.ts  # dispara as animações quando a seção entra na tela
```

## Conteúdo

Contatos (WhatsApp, e-mail e Instagram) ficam em `contacts` em `src/data/site.ts`. Os botões
"Falar no WhatsApp" e "Pedir orçamento" (seção Contato) abrem o WhatsApp com uma mensagem já escrita.

## Projetos

Cada projeto em `projects` (`src/data/site.ts`) tem nome, tipo, link do site no ar e o print da tela
inicial (1440×900) em `src/assets/images/projects/`. O card abre o site em uma nova aba. Um projeto
sem `image` mostra um wireframe do tipo dele (site, landing page, sistema ou link bio).

Para desligar a animação de abertura, use `SHOW_SPLASH = false` em `src/data/site.ts`.
