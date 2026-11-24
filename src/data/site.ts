/**
 * Conteúdo do site. Os valores entre colchetes são placeholders —
 * troque pelos dados reais antes de publicar.
 */

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
  href: string;
}

const kinds: ProjectKind[] = ['site', 'lp', 'sys', 'bio'];

export const projects: Project[] = Array.from({ length: 8 }, (_, i) => ({
  name: `[PROJETO ${String(i + 1).padStart(2, '0')}]`,
  kind: kinds[i % kinds.length],
  href: '#',
}));

export interface Contact {
  label: string;
  value: string;
  href: string;
  icon: 'chat' | 'mail' | 'instagram';
}

export const contacts: Contact[] = [
  { label: 'WhatsApp', value: '[SEU WHATSAPP]', href: '#', icon: 'chat' },
  { label: 'E-mail', value: '[SEU E-MAIL]', href: '#', icon: 'mail' },
  { label: 'Instagram', value: '[SEU @]', href: '#', icon: 'instagram' },
];

/** Tempo (ms) até a abertura sair da tela. Acompanha a animação em SplashScreen.css. */
export const SPLASH_DURATION = 3500;
