import React, { useState, useRef } from 'react';
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

const APP_MODE: 'web' | 'app' = (process.env.REACT_APP_MODE as 'web' | 'app') || 'web';

const AddSheet: React.FC<AddSheetProps> = ({ isOpen, onClose, onAdd, lang }) => {
  const [magnetLink, setMagnetLink] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang].addSheet;

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      setMagnetLink('');
    }, 300);
  };

  const handleAdd = () => {
    if (magnetLink) {
        onAdd(magnetLink);
        handleClose();
    }
  };

  const handleFileClick = () => {
    if (APP_MODE === 'app') {
      console.log('Invoking Native File Picker Bridge...');
      alert("App Mode: Triggering Native File Picker Bridge");
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAdd(`file|${file.name}`);
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Sheet Content */}
      <div 
        className={`
            relative w-full max-w-lg bg-surface border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl ring-1 ring-white/10
            transform transition-transform duration-300 ease-out
            ${isClosing ? 'translate-y-full sm:scale-95 sm:opacity-0' : 'translate-y-0 sm:scale-100 sm:opacity-100'}
        `}
      >
        {/* Handle for mobile */}
        <div className="w-12 h-1.5 bg-slate-600 rounded-full mx-auto mb-6 sm:hidden" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-1.5 bg-cyan-500/20 rounded-lg text-cyan-400">
                <Plus size={20} strokeWidth={3} />
            </div>
            {t.title}
          </h2>
          <button onClick={handleClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
            {/* Option A: Magnet Link */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 ml-1">{t.magnetLabel}</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link size={18} className="text-slate-500" />
                    </div>
                    <input
                        type="text"
                        value={magnetLink}
                        onChange={(e) => setMagnetLink(e.target.value)}
                        placeholder={t.magnetPlaceholder}
                        className="block w-full pl-10 pr-3 py-3 bg-background border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        autoFocus
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
                    <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-surface text-slate-500">{t.or}</span>
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
        
        <div className="h-4 sm:hidden"></div>
      </div>
    </div>
  );
};

export default AddSheet;