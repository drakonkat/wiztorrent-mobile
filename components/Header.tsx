import React, { useState, useRef, useEffect } from 'react';
import { Zap, Moon, Sun, Languages, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, lang, setLang, title }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-5 bg-background/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-primary to-blue-400 p-2 rounded-lg shadow-lg shadow-primary/20">
            <Zap size={20} className="text-white" fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-primary dark:from-white dark:to-slate-400">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        
        {/* Language Picker */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
          >
            <Languages size={18} />
            <span className="text-sm font-semibold uppercase">{lang}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isLangMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#292929] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                    lang === l.code ? 'text-primary font-medium bg-slate-50 dark:bg-white/5' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;