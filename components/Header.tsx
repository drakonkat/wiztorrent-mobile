import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IonHeader, IonToolbar } from '@ionic/react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Calculate position relative to viewport to break out of IonHeader's stacking context
      setCoords({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
      setIsOpen(true);
    }
  };

  const handleLanguageSelect = (code: Language) => {
    setLang(code);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both the button AND the dropdown
      const target = event.target as Node;
      const isButton = buttonRef.current?.contains(target);
      const isDropdown = dropdownRef.current?.contains(target);

      if (isOpen && !isButton && !isDropdown) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use capture phase to ensure we catch clicks even if propagation is stopped elsewhere
      document.addEventListener('mousedown', handleClickOutside, true);
      // Also close on scroll to avoid detached floating menus
      document.addEventListener('scroll', () => setIsOpen(false), true);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('scroll', () => setIsOpen(false), true);
    };
  }, [isOpen]);

  // The dropdown content using React Portal to escape IonHeader's overflow:hidden
  const dropdownContent = (
    <div 
      ref={dropdownRef}
      className="fixed z-[9999] bg-white dark:bg-[#292929] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[160px] animate-[fadeIn_0.2s_ease-out]"
      style={{
        top: `${coords.top}px`,
        right: `${coords.right}px`,
      }}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => handleLanguageSelect(l.code)}
          className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
            lang === l.code ? 'text-primary font-medium bg-slate-50 dark:bg-white/5' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          <span className="text-lg">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );

  return (
    <IonHeader className="shadow-none border-none">
      <IonToolbar className="--background: transparent; --border-style: none;">
        <div className="flex items-center justify-between px-2 py-1 bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
          
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
            <div className="relative">
              <button 
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
              >
                <Languages size={18} />
                <span className="text-sm font-semibold uppercase">{lang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <button 
              onClick={() => toggleTheme()}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </IonToolbar>
      
      {/* Portal Output */}
      {isOpen && createPortal(dropdownContent, document.body)}
    </IonHeader>
  );
};

export default Header;