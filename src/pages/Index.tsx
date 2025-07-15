import { useState, useMemo } from "react";
import { Languages, MapPin } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import CategoryFilter from "@/components/CategoryFilter";
import PhraseCard from "@/components/PhraseCard";
import { phrases, languages } from "@/data/phrases";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPhrases = useMemo(() => {
    return phrases.filter(phrase => 
      selectedCategory === null || phrase.category === selectedCategory
    );
  }, [selectedCategory]);

  const selectedLanguageInfo = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Languages className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Travel Phrase Translator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn essential travel phrases with audio pronunciation guides. Perfect for your next adventure!
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Translate to:</span>
          </div>
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          {selectedLanguageInfo && (
            <div className="flex items-center gap-2 text-lg">
              <span>{selectedLanguageInfo.flag}</span>
              <span className="font-medium">{selectedLanguageInfo.name}</span>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Phrases Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredPhrases.map((phrase) => (
            <PhraseCard 
              key={phrase.id} 
              phrase={phrase} 
              selectedLanguage={selectedLanguage}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Click the speaker icon to hear pronunciation • Audio powered by Web Speech API
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;