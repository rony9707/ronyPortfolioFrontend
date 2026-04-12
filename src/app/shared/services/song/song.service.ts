import { Injectable, OnDestroy, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert2';
import { lyrics as lyrics0 } from '../../../../../public/assets/lyrics/0';
import { lyrics as lyrics1 } from '../../../../../public/assets/lyrics/1';
import { lyrics as lyrics2 } from '../../../../../public/assets/lyrics/2';
import { lyrics as lyrics3 } from '../../../../../public/assets/lyrics/3';
import { lyrics as lyrics4 } from '../../../../../public/assets/lyrics/4';

@Injectable({
  providedIn: 'root',
})
export class SongService implements OnDestroy {
  public audio = new Audio();
  music_status = signal(false);
  musicUrl = signal('');
  volume = signal(50);
  private songLinks: string[] = [];
  private currentSongIndex = 0;

  //Audio Visualizer
  audioCTX = new AudioContext();
  private audioSource?: MediaElementAudioSourceNode;
  private analyser?: AnalyserNode;

  songProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  timer: BehaviorSubject<string> = new BehaviorSubject<string>('0:00');

  private timerInterval: any;

  currentLyric: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private parsedLyrics: { time: number; text: string }[] = [];

  private allLyrics = [lyrics0, lyrics1, lyrics2, lyrics3, lyrics4];

  constructor() {
    this.audio.crossOrigin = 'anonymous';

    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('ended', this.onEnded);
  }

  ngOnDestroy() {
    this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
    this.audio.removeEventListener('ended', this.onEnded);
  }

  private onTimeUpdate = () => {
    this.updateProgress();
    this.updateTimer();
    this.updateLyrics();
  };

  private onEnded = () => {
    this.changeSong(true);
  };

  getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  setSongs(songLinks: string[]) {
    this.songLinks = songLinks;

    if (this.songLinks.length > 0) {
      this.musicUrl.set(this.songLinks[this.currentSongIndex]);

      this.loadLyrics(this.currentSongIndex);

      if (this.audio.src !== this.musicUrl()) {
        this.audio.src = this.musicUrl();
        this.audio.load();
      }
    }
  }

  parseLyrics(lyricsText: string): { time: number; text: string }[] {
    return lyricsText
      .split('\n')
      .map((line) => {
        const match = line.match(/\[(\d+):(\d+\.\d+)](.*)/);

        if (match) {
          const minutes = parseInt(match[1], 10);
          const seconds = parseFloat(match[2]);
          const text = match[3].trim();

          return {
            time: minutes * 60 + seconds,
            text,
          };
        }

        return null;
      })
      .filter(Boolean) as { time: number; text: string }[];
  }

  private updateLyrics() {
    const currentTime = this.audio.currentTime;

    const lyric = this.parsedLyrics
      .slice()
      .reverse()
      .find((l) => currentTime >= l.time);

    if (lyric) {
      this.currentLyric.next(lyric.text);
    }
  }

  private loadLyrics(index: number) {
    const lyricsText = this.allLyrics[index];
    this.parsedLyrics = this.parseLyrics(lyricsText);
  }

  getAnalyserNode(): AnalyserNode {
    if (!this.analyser) {
      this.audioSource = this.audioCTX.createMediaElementSource(this.audio);
      this.analyser = this.audioCTX.createAnalyser();
      this.audioSource.connect(this.analyser);
      this.analyser.connect(this.audioCTX.destination);
    }

    if (this.audioCTX.state === 'suspended') {
      this.audioCTX.resume();
    }

    return this.analyser;
  }

  toggleMusic(musicStatus: boolean) {
    this.audio.volume = this.volume() / 100;
    if (musicStatus) {
      if (this.musicUrl && this.audio.src !== this.musicUrl()) {
        this.audio.src = this.musicUrl();
      }
      this.audio
        .play()
        .then(() => {
          this.music_status.set(musicStatus);
          this.startTimer();
          // this.playSound();
        })
        .catch((error) => {
          swal.fire({
            icon: 'error',
            title: 'Audio Playback Error',
            background: '#e9f7ef',
            customClass: {
              confirmButton:
                'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
              cancelButton:
                'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
            },
            text: `${error.message}`,
          });
        });
    } else {
      this.audio.pause();
      this.music_status.set(musicStatus);
      this.stopTimer();
    }
  }

  adjustVolumeSong(volume: number) {
    this.volume.set(volume);
    this.audio.volume = this.volume() / 100;
  }

  playSound() {
    const oscillator = this.audioCTX.createOscillator();
    oscillator.connect(this.audioCTX.destination);
    oscillator.type = 'sine'; //sine, square, triangle, sine
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 1000);
  }

  updateProgress() {
    if (this.audio && this.audio.duration) {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      const progress = (currentTime / duration) * 100;
      this.songProgress.next(isNaN(progress) ? 0 : progress);
    }
  }

  updateTimer() {
    if (this.audio && this.audio.currentTime) {
      const currentTime = this.audio.currentTime;
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      this.timer.next(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  changeSong(next: boolean) {
    if (next) {
      this.currentSongIndex =
        (this.currentSongIndex + 1) % this.songLinks.length;
    } else {
      this.currentSongIndex =
        (this.currentSongIndex - 1 + this.songLinks.length) %
        this.songLinks.length;
    }

    this.currentLyric.next('');
    this.musicUrl.set(this.songLinks[this.currentSongIndex]);

    this.loadLyrics(this.currentSongIndex);

    this.audio.src = this.musicUrl();

    if (this.music_status()) {
      this.audio.play();
    }
  }

  seekToPosition(position: number) {
    if (this.audio.duration) {
      this.audio.currentTime = (position / 100) * this.audio.duration;
    }
  }
}
