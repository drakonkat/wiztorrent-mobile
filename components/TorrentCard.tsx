import React from 'react';
import { Torrent, TorrentStatus, Language } from '../types';
import { translations } from '../translations';
import { Play, Pause, Trash2, Download, Upload, Clock, HardDrive } from 'lucide-react';

interface TorrentCardProps {
  torrent: Torrent;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  lang: Language;
}

const TorrentCard: React.FC<TorrentCardProps> = ({ torrent, onToggle, onDelete, lang }) => {
  const t = translations[lang];
  const isPaused = torrent.status === TorrentStatus.Paused || torrent.status === TorrentStatus.Error;
  const isCompleted = torrent.progress === 100;

  // Helper to translate status textual representation
  const getStatusText = (status: TorrentStatus) => {
    return t.card.status[status] || status;
  };

  // Helper to translate specific ETA states if they match our dictionary keys
  const getEtaText = (eta: string) => {
    if (eta === 'Done') return t.card.eta.done;
    if (eta === 'Paused') return t.card.eta.paused;
    if (eta === 'Unknown') return t.card.eta.unknown;
    if (eta === 'Calculating...') return t.card.eta.calculating;
    // For time strings like "15 min left", we'll just return original for this prototype
    // or you could implement a regex replacer for "left", "min", etc.
    return eta; 
  };

  // Dynamic Status Color - Optimized for Light & Dark
  const getStatusColor = (status: TorrentStatus) => {
    switch (status) {
      case TorrentStatus.Downloading: return 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10 border-cyan-200 dark:border-cyan-400/20';
      case TorrentStatus.Seeding: return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20';
      case TorrentStatus.Paused: return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20';
      case TorrentStatus.Waiting: return 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-400/10 border-slate-200 dark:border-slate-400/20';
      case TorrentStatus.Error: return 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/20';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 shadow-sm dark:shadow-none mb-4 overflow-hidden">
      
      {/* Background Progress Bar (Optional Visual Flair) */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-blue-500 transition-all duration-1000 ease-out opacity-20"
        style={{ width: `${torrent.progress}%` }}
      />

      {/* Header: Title & Status */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-4 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight truncate" title={torrent.name}>
            {torrent.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium transition-colors ${getStatusColor(torrent.status)}`}>
              {getStatusText(torrent.status)}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
               <HardDrive size={10} /> {torrent.size}
            </span>
          </div>
        </div>
        
        {/* Progress Radial or Percentage */}
        <div className="text-right shrink-0">
            <span className="text-lg font-bold font-mono text-primary dark:text-slate-200">{torrent.progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full mb-4 overflow-hidden">
        <div 
            className={`h-full rounded-full transition-all duration-700 ease-out relative ${
                isCompleted ? 'bg-emerald-500' : 'bg-primary'
            }`}
            style={{ width: `${torrent.progress}%` }}
        >
             {/* Shimmer effect */}
            {!isPaused && !isCompleted && (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
            )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
        <div className="flex items-center gap-1.5">
          <Download size={14} className="text-cyan-600 dark:text-cyan-400" />
          <span>{torrent.downloadSpeed}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Upload size={14} className="text-emerald-600 dark:text-emerald-400" />
          <span>{torrent.uploadSpeed}</span>
        </div>
        {!isCompleted && (
            <div className="flex items-center gap-1.5 col-span-2">
                <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                <span>{getEtaText(torrent.eta)}</span>
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-white/5 pt-3">
        <button 
            onClick={() => onDelete(torrent.id)}
            className="p-2 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/10 transition-colors"
            title={t.card.delete}
        >
            <Trash2 size={18} />
        </button>
        <button 
            onClick={() => onToggle(torrent.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                isPaused 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
        >
            {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            {isPaused ? t.card.resume : t.card.pause}
        </button>
      </div>
    </div>
  );
};

export default TorrentCard;