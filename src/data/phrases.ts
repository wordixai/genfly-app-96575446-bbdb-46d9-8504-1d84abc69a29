export interface Phrase {
  id: string;
  category: string;
  english: string;
  translations: {
    [language: string]: {
      text: string;
      pronunciation: string;
    };
  };
}

export const languages = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' }
];

export const phrases: Phrase[] = [
  {
    id: '1',
    category: 'Greetings',
    english: 'Hello',
    translations: {
      es: { text: 'Hola', pronunciation: 'OH-lah' },
      fr: { text: 'Bonjour', pronunciation: 'bon-ZHOOR' },
      de: { text: 'Hallo', pronunciation: 'HAH-loh' },
      it: { text: 'Ciao', pronunciation: 'CHOW' },
      ja: { text: 'こんにちは', pronunciation: 'kon-ni-chi-wa' }
    }
  },
  {
    id: '2',
    category: 'Greetings',
    english: 'Thank you',
    translations: {
      es: { text: 'Gracias', pronunciation: 'GRAH-see-ahs' },
      fr: { text: 'Merci', pronunciation: 'mer-SEE' },
      de: { text: 'Danke', pronunciation: 'DAHN-keh' },
      it: { text: 'Grazie', pronunciation: 'GRAH-tsee-eh' },
      ja: { text: 'ありがとう', pronunciation: 'a-ri-ga-to' }
    }
  },
  {
    id: '3',
    category: 'Basic Needs',
    english: 'Where is the bathroom?',
    translations: {
      es: { text: '¿Dónde está el baño?', pronunciation: 'DON-deh ehs-TAH el BAH-nyoh' },
      fr: { text: 'Où sont les toilettes?', pronunciation: 'OO sohn leh twah-LET' },
      de: { text: 'Wo ist die Toilette?', pronunciation: 'voh isht dee toy-LET-teh' },
      it: { text: 'Dov\'è il bagno?', pronunciation: 'doh-VEH eel BAH-nyoh' },
      ja: { text: 'トイレはどこですか？', pronunciation: 'toi-re wa do-ko de-su ka' }
    }
  },
  {
    id: '4',
    category: 'Food & Drink',
    english: 'I would like water',
    translations: {
      es: { text: 'Me gustaría agua', pronunciation: 'meh goos-tah-REE-ah AH-gwah' },
      fr: { text: 'Je voudrais de l\'eau', pronunciation: 'zhuh voo-DREH duh LOH' },
      de: { text: 'Ich hätte gerne Wasser', pronunciation: 'ikh HET-teh GER-neh VAH-ser' },
      it: { text: 'Vorrei dell\'acqua', pronunciation: 'vor-REH dell AH-kwah' },
      ja: { text: '水をお願いします', pronunciation: 'mi-zu wo o-ne-gai shi-ma-su' }
    }
  },
  {
    id: '5',
    category: 'Directions',
    english: 'How do I get to...?',
    translations: {
      es: { text: '¿Cómo llego a...?', pronunciation: 'KOH-moh YEH-goh ah' },
      fr: { text: 'Comment aller à...?', pronunciation: 'koh-mahn tah-LAY ah' },
      de: { text: 'Wie komme ich zu...?', pronunciation: 'vee KOH-meh ikh tsoo' },
      it: { text: 'Come arrivo a...?', pronunciation: 'KOH-meh ah-REE-voh ah' },
      ja: { text: '...への行き方は？', pronunciation: '...eh no i-ki-ka-ta wa' }
    }
  }
];

export const categories = [...new Set(phrases.map(phrase => phrase.category))];