import type { StaticImageData } from 'next/image';
import a10Img from '@/assets/images/projects/artur-a10.jpg';
import fantaImg from '@/assets/images/projects/fanta.jpg';
import comprovedImg from '@/assets/images/projects/comproved.jpg';
import karolineImg from '@/assets/images/projects/karoline-herminio.jpg';
import petDevImg from '@/assets/images/projects/pet-dev.jpg';

/** Conteúdo do site: textos, projetos e contatos. */

/** Mostra a animação de abertura (logo sendo desenhado) ao carregar a página. */
export const SHOW_SPLASH = true;

export const navLinks = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
] as const;

export const heroServices = [
  'Sites',
  'Landing pages',
  'Sistemas web',
  'Link bios',
  'Manutenção',
  'E o que você precisar',
];

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  { title: 'Link bios', description: 'Seus contatos e redes em um só link.' },
  { title: 'Landing pages', description: 'Uma oferta, uma página, mais contatos.' },
  { title: 'Sites', description: 'Presença profissional que passa confiança.' },
  { title: 'Sistemas web', description: 'Ferramentas para organizar sua rotina.' },
  { title: 'Manutenção', description: 'Seu site atual, atualizado e mais rápido.' },
  { title: 'Tem outra ideia?', description: 'Me conta. Dá para criar.' },
];

export const reasons = [
  'Seu cliente procura na internet primeiro',
  'Quem não é visto, não é lembrado',
  'Seu negócio aberto 24 horas por dia',
  'Ser encontrado gera confiança',
];

export type ProjectKind = 'site' | 'lp' | 'sys' | 'bio';

export const projectKindLabel: Record<ProjectKind, string> = {
  site: 'Site',
  lp: 'Landing page',
  sys: 'Sistema web',
  bio: 'Link bio',
};

export interface Project {
  name: string;
  kind: ProjectKind;
  /** Site no ar — o card abre esse link em uma nova aba. */
  href: string;
  /** Print da tela inicial. Sem print, o card mostra um wireframe do tipo do projeto. */
  image?: StaticImageData;
}

export const projects: Project[] = [
  {
    name: 'Karoline Herminio Fisioterapia',
    kind: 'site',
    href: 'https://karoline-herminio-fisioterapia.vercel.app/',
    image: karolineImg,
  },
  {
    name: 'Fanta',
    kind: 'lp',
    href: 'https://site-fanta-blond.vercel.app/',
    image: fantaImg,
  },
  {
    name: 'Artur A10',
    kind: 'site',
    href: 'https://a10-craque.vercel.app/',
    image: a10Img,
  },
  {
    name: 'Pet Dev',
    kind: 'site',
    href: 'https://pet-dev-three.vercel.app/',
    image: petDevImg,
  },
  {
    name: 'Comproved',
    kind: 'sys',
    href: 'https://www.comproved.com.br/',
    image: comprovedImg,
  },
];

export interface Contact {
  label: string;
  value: string;
  href: string;
  icon: 'chat' | 'mail' | 'instagram';
}

const WHATSAPP_NUMBER = '5588994947226';

/** Abre a conversa no WhatsApp, opcionalmente com uma mensagem já escrita. */
export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const WHATSAPP_URL = whatsappLink('Olá, Wesley! Vim pelo seu portfólio.');
export const QUOTE_URL = whatsappLink('Olá, Wesley! Vim pelo seu portfólio e quero pedir um orçamento.');

export const contacts: Contact[] = [
  { label: 'WhatsApp', value: '(88) 9.9494-7226', href: WHATSAPP_URL, icon: 'chat' },
  { label: 'E-mail', value: 'wesleyfilho.dev@gmail.com', href: 'mailto:wesleyfilho.dev@gmail.com', icon: 'mail' },
  { label: 'Instagram', value: '@euwesleyfilho.dev', href: 'https://www.instagram.com/euwesleyfilho.dev/', icon: 'instagram' },
];

/** Tempo (ms) até a abertura sair da tela. Acompanha a animação em SplashScreen.css. */
export const SPLASH_DURATION = 3500;
