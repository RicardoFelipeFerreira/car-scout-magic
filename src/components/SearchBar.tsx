import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getSuggestions } from "@/data/vehicles";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  variant?: "hero" | "compact";
}

export const SearchBar = ({ variant = "hero" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof getSuggestions>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const results = getSuggestions(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (brandName: string, model: string) => {
    const searchTerm = `${brandName} ${model}`;
    setQuery(searchTerm);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const isHero = variant === "hero";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${isHero ? "h-5 w-5" : "h-4 w-4"}`} />
            <Input
              type="text"
              placeholder="Busque por carros, motos, caminhões..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`${isHero ? "h-14 pl-12 pr-4 text-base" : "h-11 pl-10 pr-4"} bg-background/50 border-border focus:bg-background`}
            />
          </div>
          <Button type="submit" size={isHero ? "lg" : "default"} className={isHero ? "h-14 px-8" : ""}>
            Buscar
          </Button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.brand.name, suggestion.model)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
            >
              <img
                src={suggestion.brand.logo}
                alt={suggestion.brand.name}
                className="h-8 w-8 object-contain bg-white rounded p-1"
              />
              <span className="text-sm font-medium">
                {suggestion.brand.name} {suggestion.model}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
