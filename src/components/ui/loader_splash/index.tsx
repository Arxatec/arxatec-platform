import { useState, useEffect } from "react";

const phrases = [
  "cargando la aplicación...",
  "cargando los casos...",
  "cargando usuarios...",
  "preparando todo para ti...",
];

export const LoaderSplash = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const fullPhrase = phrases[currentPhrase];

        if (isTyping) {
          if (characterIndex < fullPhrase.length) {
            setDisplayedText(fullPhrase.substring(0, characterIndex + 1));
            setCharacterIndex(characterIndex + 1);
          } else {
            setTimeout(() => setIsTyping(false), 2000);
          }
        } else {
          if (characterIndex > 0) {
            setDisplayedText(fullPhrase.substring(0, characterIndex - 1));
            setCharacterIndex(characterIndex - 1);
          } else {
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
            setIsTyping(true);
          }
        }
      },
      isTyping ? 100 : 50
    );

    return () => clearInterval(interval);
  }, [currentPhrase, characterIndex, isTyping, phrases]);

  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-24" />
        <p className="text-foreground text-base font-serif font-medium h-6">
          Estamos {displayedText}
          <span className="animate-pulse text-secondary-foreground">|</span>
        </p>
      </div>
    </div>
  );
};
