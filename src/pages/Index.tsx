import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Volume2, Search, Globe } from 'lucide-react';

interface Phrase {
  id: string;
  english: string;
  translation: string;
  pronunciation: string;
  category: string;
  audioUrl?: string;
}

const LANGUAGES = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
];

const CATEGORIES = [
  'greetings',
  'transportation',
  'accommodation',
  'dining',
  'emergency',
];

const SAMPLE_PHRASES: Record<string, Phrase[]> = {
  es: [
    { id: '1', english: 'Hello', translation: 'Hola', pronunciation: 'OH-lah', category: 'greetings' },
    { id: '2', english: 'Thank you', translation: 'Gracias', pronunciation: 'GRAH-see-ahs', category: 'greetings' },
    { id: '3', english: 'Where is the bathroom?', translation: '¿Dónde está el baño?', pronunciation: 'DOHN-deh ehs-TAH ehl BAH-nyoh', category: 'emergency' },
    { id: '4', english: 'How much does this cost?', translation: '¿Cuánto cuesta esto?', pronunciation: 'KWAN-toh KWEH-stah EH-stoh', category: 'dining' },
    { id: '5', english: 'I need a taxi', translation: 'Necesito un taxi', pronunciation: 'neh-seh-SEE-toh oon TAHK-see', category: 'transportation' },
  ],
  fr: [
    { id: '1', english: 'Hello', translation: 'Bonjour', pronunciation: 'bone-ZHOOR', category: 'greetings' },
    { id: '2', english: 'Thank you', translation: 'Merci', pronunciation: 'mer-SEE', category: 'greetings' },
    { id: '3', english: 'Where is the bathroom?', translation: 'Où sont les toilettes?', pronunciation: 'oo son lay twa-LET', category: 'emergency' },
    { id: '4', english: 'How much does this cost?', translation: 'Combien ça coûte?', pronunciation: 'kom-bee-AHN sah koot', category: 'dining' },
    { id: '5', english: 'I need a taxi', translation: 'J\'ai besoin d\'un taxi', pronunciation: 'zhay buh-ZWAN duhn tahk-SEE', category: 'transportation' },
  ],
  de: [
    { id: '1', english: 'Hello', translation: 'Hallo', pronunciation: 'HAH-loh', category: 'greetings' },
    { id: '2', english: 'Thank you', translation: 'Danke', pronunciation: 'DAHN-keh', category: 'greetings' },
    { id: '3', english: 'Where is the bathroom?', translation: 'Wo ist die Toilette?', pronunciation: 'voh ist dee toy-LET-teh', category: 'emergency' },
    { id: '4', english: 'How much does this cost?', translation: 'Wie viel kostet das?', pronunciation: 'vee feel KOS-tet dahs', category: 'dining' },
    { id: '5', english: 'I need a taxi', translation: 'Ich brauche ein Taxi', pronunciation: 'ikh BROW-kheh ine TAHK-see', category: 'transportation' },
  ],
  it: [
    { id: '1', english: 'Hello', translation: 'Ciao', pronunciation: 'chah-oh', category: 'greetings' },
    { id: '2', english: 'Thank you', translation: 'Grazie', pronunciation: 'GRAHT-see-ay', category: 'greetings' },
    { id: '3', english: 'Where is the bathroom?', translation: 'Dov\'è il bagno?', pronunciation: 'doh-VEH eel BAH-nyoh', category: 'emergency' },
    { id: '4', english: 'How much does this cost?', translation: 'Quanto costa questo?', pronunciation: 'KWAN-toh KOS-tah KWEH-stoh', category: 'dining' },
    { id: '5', english: 'I need a taxi', translation: 'Ho bisogno di un taxi', pronunciation: 'oh bee-SOH-nyoh dee oon TAHK-see', category: 'transportation' },
  ],
  pt: [
    { id: '1', english: 'Hello', translation: 'Olá', pronunciation: 'oh-LAH', category: 'greetings' },
    { id: '2', english: 'Thank you', translation: 'Obrigado', pronunciation: 'oh-bree-GAH-doh', category: 'greetings' },
    { id: '3', english: 'Where is the bathroom?', translation: 'Onde fica o banheiro?', pronunciation: 'ON-deh FEE-kah oh ban-YAY-roh', category: 'emergency' },
    { id: '4', english: 'How much does this cost?', translation: 'Quanto custa isto?', pronunciation: 'KWAN-toh KOO-stah EE-stoh', category: 'dining' },
    { id: '5', english: 'I need a taxi', translation: 'Preciso de um taxi', pronunciation: 'preh-SEE-zoh dee oom TAHK-see', category: 'transportation' },
  ],
};

const PhraseCard: React.FC<{ phrase: Phrase; onFavorite: (id: string) => void; isFavorite: boolean }> = ({ phrase, onFavorite, isFavorite }) => {
  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const langVoice = voices.find(voice => voice.lang.startsWith(lang));
      if (langVoice) utterance.voice = langVoice;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-1">
              <p className="text-sm text-gray-600">{phrase.english}</p>
              <p className="text-lg font-semibold">{phrase.translation}</p>
              <p className="text-sm text-blue-600 italic">{phrase.pronunciation}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFavorite(phrase.id)}
              className={isFavorite ? 'text-red-500' : 'text-gray-400'}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {phrase.category}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => speakText(phrase.translation, 'es')}
              className="flex items-center gap-1"
            >
              <Volume2 className="h-3 w-3" />
              Listen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const currentPhrases = SAMPLE_PHRASES[selectedLanguage] || [];
  
  const filteredPhrases = currentPhrases.filter(phrase => {
    const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoritePhrases = currentPhrases.filter(phrase => favorites.has(phrase.id));

  const toggleFavorite = (phraseId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(phraseId)) {
      newFavorites.delete(phraseId);
    } else {
      newFavorites.add(phraseId);
    }
    setFavorites(newFavorites);
  };

  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Travel Translator</h1>
          </div>
          <p className="text-gray-600 text-lg">Essential phrases with pronunciation guides</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search phrases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">
              All Phrases ({filteredPhrases.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favoritePhrases.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {selectedLang && (
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedLang.flag} {selectedLang.name} Phrases
                </h2>
              </div>
            )}
            
            {filteredPhrases.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No phrases found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredPhrases.map(phrase => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.has(phrase.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favoritePhrases.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No favorite phrases yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Click the heart icon on any phrase to add it to your favorites.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {favoritePhrases.map(phrase => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    onFavorite={toggleFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-white/50 rounded-lg text-center text-sm text-gray-600">
          <p>💡 Tip: Click the "Listen" button to hear native pronunciation using your browser's text-to-speech.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;