import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Button from './Button';
import { Language } from '../types';
import { translations } from '../translations';

interface DeleteModalProps {
  isOpen: boolean;
  torrentName: string;
  onClose: () => void;
  onConfirm: () => void;
  lang: Language;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, torrentName, onClose, onConfirm, lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[lang].deleteModal;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => onClose()}
      />

      {/* Modal Card */}
      <div 
        className={`
          relative w-full max-w-sm bg-surface dark:bg-[#1e1e1e] border border-white/10 rounded-3xl p-6 shadow-2xl ring-1 ring-white/5
          transform transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}
        `}
      >
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon with Glow */}
          <div className="relative mb-5 group">
             <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-all duration-500"></div>
             <div className="relative w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 text-red-500">
                <Trash2 size={32} />
             </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            {t.title}
          </h3>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {t.messageStart} <br/>
            <span className="text-slate-700 dark:text-slate-200 font-medium bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded break-all">
              "{torrentName}"
            </span>? 
            <br />{t.messageEnd}
          </p>

          <div className="flex gap-3 w-full">
            <Button 
              variant="secondary" 
              fullWidth 
              onClick={() => onClose()}
            >
              {t.cancel}
            </Button>
            <Button 
              variant="danger" 
              fullWidth 
              onClick={() => onConfirm()}
              className="bg-red-500 hover:bg-red-600 !text-white shadow-lg shadow-red-500/20 border-0"
            >
              {t.confirm}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;