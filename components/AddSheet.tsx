import React, { useState, useEffect, useRef } from 'react';
import { X, Link, FileUp, Magnet, Plus } from 'lucide-react';
import Button from './Button';
import { Language } from '../types';
import { translations } from '../translations';

interface AddSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (magnetLink: string) => void;
  lang: Language;
}

const AddSheet: React.FC<AddSheetProps> = ({ isOpen, onClose, onAdd, lang }) => {
  const [magnetLink, setMagnetLink] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang].addSheet;
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation state
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleAdd = () => {
    if (magnetLink) {
        onAdd(magnetLink);
        setMagnetLink('');
        onClose();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAdd(`file|${file.name}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center pointer-events-none">
        {/* Backdrop */}
        <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        />

        {/* Sheet Container */}
        <div 
            className={`
                w-full sm:max-w-lg bg-surface dark:bg-[#1e1e1e] 
                rounded-t-[2rem] sm:rounded-2xl 
                p-6 pb-10 sm:pb-6
                shadow-2xl ring-1 ring-white/10
                transform transition-transform duration-300 cubic-bezier(0.2, 0.8, 0.2, 1) pointer-events-auto
                ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-10'}
            `}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-500/20 rounded-lg text-cyan-400">
                        <Plus size={20} strokeWidth={3} />
                    </div>
                    {t.title}
                </h2>
                <button 
                    onClick={onClose} 
                    className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-6">
                {/* Option A: Magnet Link */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-300 ml-1">{t.magnetLabel}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link size={18} className="text-slate-500" />
                        </div>
                        <input
                            type="text"
                            value={magnetLink}
                            onChange={(e) => setMagnetLink(e.target.value)}
                            placeholder={t.magnetPlaceholder}
                            className="block w-full pl-10 pr-3 py-3 bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            autoFocus={isOpen} // Only autofocus when open
                        />
                    </div>
                </div>

                <Button 
                    onClick={handleAdd} 
                    disabled={!magnetLink} 
                    fullWidth 
                    icon={<Magnet size={18} />}
                >
                    {t.startBtn}
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-surface dark:bg-[#1e1e1e] text-slate-500">{t.or}</span>
                    </div>
                </div>

                {/* Option B: File Picker */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept=".torrent" 
                    className="hidden" 
                />
                
                <Button 
                    variant="outline" 
                    fullWidth 
                    icon={<FileUp size={18} />}
                    onClick={handleFileClick}
                >
                    {t.fileBtn}
                </Button>
            </div>
        </div>
    </div>
  );
};

export default AddSheet;