import { Language, TorrentStatus } from './types';

export const translations = {
  en: {
    title: 'WizTorrent',
    emptyState: 'No active downloads',
    emptyStateSub: 'Tap + to start downloading',
    addSheet: {
      title: 'Add New Torrent',
      magnetLabel: 'Paste Magnet Link',
      magnetPlaceholder: 'magnet:?xt=urn:btih:...',
      startBtn: 'Start Download',
      or: 'Or import file',
      fileBtn: 'Open .torrent File'
    },
    card: {
      resume: 'Resume',
      pause: 'Pause',
      delete: 'Delete',
      status: {
        [TorrentStatus.Downloading]: 'Downloading',
        [TorrentStatus.Seeding]: 'Seeding',
        [TorrentStatus.Paused]: 'Paused',
        [TorrentStatus.Waiting]: 'Waiting for peers',
        [TorrentStatus.Error]: 'Error',
      },
      eta: {
        done: 'Done',
        paused: 'Paused',
        unknown: 'Unknown',
        calculating: 'Calculating...'
      }
    },
    deleteModal: {
      title: 'Delete Torrent?',
      messageStart: 'Are you sure you want to remove',
      messageEnd: 'This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Delete'
    }
  },
  it: {
    title: 'WizTorrent',
    emptyState: 'Nessun download attivo',
    emptyStateSub: 'Tocca + per iniziare a scaricare',
    addSheet: {
      title: 'Aggiungi Torrent',
      magnetLabel: 'Incolla Magnet Link',
      magnetPlaceholder: 'magnet:?xt=urn:btih:...',
      startBtn: 'Avvia Download',
      or: 'O importa file',
      fileBtn: 'Apri file .torrent'
    },
    card: {
      resume: 'Riprendi',
      pause: 'Pausa',
      delete: 'Elimina',
      status: {
        [TorrentStatus.Downloading]: 'In download',
        [TorrentStatus.Seeding]: 'In seed',
        [TorrentStatus.Paused]: 'In pausa',
        [TorrentStatus.Waiting]: 'In attesa di peer',
        [TorrentStatus.Error]: 'Errore',
      },
      eta: {
        done: 'Completato',
        paused: 'In pausa',
        unknown: 'Sconosciuto',
        calculating: 'Calcolo...'
      }
    },
    deleteModal: {
      title: 'Elimina Torrent?',
      messageStart: 'Sei sicuro di voler rimuovere',
      messageEnd: 'Questa azione non può essere annullata.',
      cancel: 'Annulla',
      confirm: 'Elimina'
    }
  },
  ru: {
    title: 'WizTorrent',
    emptyState: 'Нет активных загрузок',
    emptyStateSub: 'Нажмите +, чтобы начать загрузку',
    addSheet: {
      title: 'Добавить торрент',
      magnetLabel: 'Вставьте Magnet-ссылку',
      magnetPlaceholder: 'magnet:?xt=urn:btih:...',
      startBtn: 'Начать загрузку',
      or: 'Или импорт файла',
      fileBtn: 'Открыть .torrent файл'
    },
    card: {
      resume: 'Продолжить',
      pause: 'Пауза',
      delete: 'Удалить',
      status: {
        [TorrentStatus.Downloading]: 'Скачивание',
        [TorrentStatus.Seeding]: 'Раздача',
        [TorrentStatus.Paused]: 'Пауза',
        [TorrentStatus.Waiting]: 'Ожидание пиров',
        [TorrentStatus.Error]: 'Ошибка',
      },
      eta: {
        done: 'Готово',
        paused: 'Пауза',
        unknown: 'Неизвестно',
        calculating: 'Вычисление...'
      }
    },
    deleteModal: {
      title: 'Удалить торрент?',
      messageStart: 'Вы уверены, что хотите удалить',
      messageEnd: 'Это действие нельзя отменить.',
      cancel: 'Отмена',
      confirm: 'Удалить'
    }
  }
};