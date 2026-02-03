export enum TorrentStatus {
  Downloading = 'Downloading',
  Seeding = 'Seeding',
  Paused = 'Paused',
  Waiting = 'Waiting for peers',
  Error = 'Error'
}

export interface Torrent {
  id: string;
  name: string;
  status: TorrentStatus;
  progress: number; // 0 to 100
  downloadSpeed: string; // e.g., "2.5 MB/s"
  uploadSpeed: string; // e.g., "50 KB/s"
  eta: string; // e.g., "15 min left"
  size: string; // e.g., "4.2 GB"
  peers: number;
  seeds: number;
}

export type Language = 'en' | 'it' | 'ru';