import { makeAutoObservable } from 'mobx';
import { Torrent, TorrentStatus, Language } from './types';

class TorrentStore {
  // --- Observables ---
  torrents: Torrent[] = [
    {
      id: '1',
      name: 'Ubuntu 22.04.3 LTS Desktop (64-bit)',
      status: TorrentStatus.Downloading,
      progress: 45,
      downloadSpeed: '2.5 MB/s',
      uploadSpeed: '50 KB/s',
      eta: '15 min left',
      size: '4.7 GB',
      peers: 24,
      seeds: 150
    },
    {
      id: '2',
      name: 'Big Buck Bunny 4K (Ultra HD)',
      status: TorrentStatus.Seeding,
      progress: 100,
      downloadSpeed: '0 B/s',
      uploadSpeed: '1.2 MB/s',
      eta: 'Done',
      size: '620 MB',
      peers: 5,
      seeds: 42
    },
    {
      id: '3',
      name: 'Backup_Photos_2023.zip',
      status: TorrentStatus.Paused,
      progress: 12,
      downloadSpeed: '0 B/s',
      uploadSpeed: '0 B/s',
      eta: 'Paused',
      size: '12 GB',
      peers: 0,
      seeds: 0
    },
    {
      id: '4',
      name: 'Indie_Game_Dev_Assets_Pack_v2',
      status: TorrentStatus.Waiting,
      progress: 0,
      downloadSpeed: '0 B/s',
      uploadSpeed: '0 B/s',
      eta: 'Unknown',
      size: '850 MB',
      peers: 1,
      seeds: 2
    }
  ];

  isDark: boolean = true;
  lang: Language = 'en';
  isAddSheetOpen: boolean = false;
  torrentToDelete: string | null = null;
  
  private simulationInterval: any = null;

  constructor() {
    makeAutoObservable(this);
    
    // Check initial theme from DOM or local storage logic if implemented
    if (typeof document !== 'undefined') {
        this.isDark = document.documentElement.classList.contains('dark');
    }

    this.startSimulation();
  }

  // --- Actions: Theme & UI ---

  toggleTheme = () => {
    this.isDark = !this.isDark;
  };

  setLanguage = (lang: Language) => {
    this.lang = lang;
  };

  setAddSheetOpen = (isOpen: boolean) => {
    this.isAddSheetOpen = isOpen;
  };

  promptDelete = (id: string) => {
    this.torrentToDelete = id;
  };

  cancelDelete = () => {
    this.torrentToDelete = null;
  };

  // --- Actions: Torrent Logic ---

  addTorrent = (input: string) => {
    let name = `Download ${this.torrents.length + 1}`;
    
    if (input.startsWith('file|')) {
      name = input.split('|')[1];
    } else if (input.includes('xt=urn:btih:')) {
      name = `Magnet Link ${this.torrents.length + 1}`;
    }

    const newTorrent: Torrent = {
      id: Date.now().toString(),
      name: name,
      status: TorrentStatus.Downloading,
      progress: 0,
      downloadSpeed: '1.5 MB/s',
      uploadSpeed: '10 KB/s',
      eta: 'Calculating...',
      size: 'Unknown',
      peers: 0,
      seeds: 0
    };

    // MobX arrays are observable, standard push/unshift works and triggers React
    this.torrents.unshift(newTorrent);
  };

  confirmDelete = () => {
    if (this.torrentToDelete) {
      this.torrents = this.torrents.filter(t => t.id !== this.torrentToDelete);
      this.torrentToDelete = null;
    }
  };

  togglePause = (id: string) => {
    const torrent = this.torrents.find(t => t.id === id);
    if (!torrent) return;

    if (torrent.status === TorrentStatus.Paused) {
      // Resume logic
      const isComplete = torrent.progress === 100;
      torrent.status = isComplete ? TorrentStatus.Seeding : TorrentStatus.Downloading;
      torrent.downloadSpeed = isComplete ? '0 B/s' : '2.1 MB/s';
      torrent.eta = isComplete ? 'Done' : 'Calculating...';
    } else {
      // Pause logic
      torrent.status = TorrentStatus.Paused;
      torrent.downloadSpeed = '0 B/s';
      torrent.uploadSpeed = '0 B/s';
      torrent.eta = 'Paused';
    }
  };

  // --- Simulation Logic ---

  startSimulation() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
    
    this.simulationInterval = setInterval(() => {
      this.updateProgress();
    }, 2000);
  }

  updateProgress = () => {
    this.torrents.forEach(t => {
      if (t.status === TorrentStatus.Downloading && t.progress < 100) {
        const newProgress = Math.min(t.progress + 1, 100);
        t.progress = newProgress;
        
        if (newProgress === 100) {
          t.status = TorrentStatus.Seeding;
          t.downloadSpeed = '0 B/s';
          t.eta = 'Done';
        }
      }
    });
  };

  // --- Computed Helpers ---
  
  get torrentToDeleteName() {
    if (!this.torrentToDelete) return '';
    return this.torrents.find(t => t.id === this.torrentToDelete)?.name || 'Unknown Torrent';
  }
}

export const torrentStore = new TorrentStore();