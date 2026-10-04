// Converte o nome de um país no emoji da bandeira.
// Se o país não estiver no mapa, devolve um globo como padrão.
const flags: Record<string, string> = {
  Brasil: '🇧🇷',
  Moçambique: '🇲🇿',
  Camboja: '🇰🇭',
  Indonésia: '🇮🇩',
  Angola: '🇦🇴',
  Índia: '🇮🇳',
  Japão: '🇯🇵',
  Quênia: '🇰🇪',
  Peru: '🇵🇪',
  Tailândia: '🇹🇭',
  Filipinas: '🇵🇭',
};

export function getCountryFlag(country: string): string {
  return flags[country] ?? '🌍';
}