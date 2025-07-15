import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Phrase } from "@/data/phrases";

interface PhraseCardProps {
  phrase: Phrase;
  selectedLanguage: string;
}

const PhraseCard = ({ phrase, selectedLanguage }: PhraseCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const translation = phrase.translations[selectedLanguage];
  
  const playAudio = () => {
    if ('speechSynthesis' in window && translation) {
      setIsPlaying(true);
      
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(translation.text);
      
      // Set language for more accurate pronunciation
      const languageMap: { [key: string]: string } = {
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'ja': 'ja-JP'
      };
      
      utterance.lang = languageMap[selectedLanguage] || 'en-US';
      utterance.rate = 0.8; // Slower rate for learning
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  if (!translation) {
    return null;
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{phrase.category}</p>
            <p className="font-medium text-foreground">{phrase.english}</p>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg font-semibold text-primary mb-1">
                  {translation.text}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  /{translation.pronunciation}/
                </p>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={isPlaying ? stopAudio : playAudio}
                disabled={!('speechSynthesis' in window)}
                className="ml-3"
              >
                {isPlaying ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhraseCard;