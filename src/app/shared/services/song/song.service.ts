import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public audio = new Audio();
  music_status = false;
  musicUrl = '';
  volume = 50;
  private songLinks: string[] = [];
  private currentSongIndex = 0;

  songProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  timer: BehaviorSubject<string> = new BehaviorSubject<string>('0:00');

  private timerInterval: any;

  constructor() {
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress();
      this.updateTimer();
    });
    this.audio.addEventListener('ended', () => {
      this.changeSong(true); // Automatically play the next song
    });
  }

  getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  setSongs(songLinks: string[]) {
    this.songLinks = songLinks;
    if (this.songLinks.length > 0) {
      this.musicUrl = this.songLinks[this.currentSongIndex];

      // Load the song into the audio instance
      if (this.audio.src !==  this.musicUrl) {
        this.audio.src =  this.musicUrl;
        this.audio.load();
        console.log("song has been loaded")
      }
    }

  }

  toggleMusic(musicStatus: boolean) {
    this.audio.volume = this.volume / 100;
    if (musicStatus) {
      if (this.musicUrl && this.audio.src !== this.musicUrl) {
        this.audio.src = this.musicUrl;
      }
      this.audio.play().then((val) => {
        this.music_status = musicStatus
        this.startTimer();
      });
    } else {
      this.audio.pause();
      this.music_status = musicStatus
      this.stopTimer();
    }
  }

  adjustVolumeSong(volume: number) {
    this.volume = volume;
    this.audio.volume = this.volume / 100;
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
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songLinks.length;
    } else {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songLinks.length) % this.songLinks.length;
    }
    this.musicUrl = this.songLinks[this.currentSongIndex];
    this.audio.src = this.musicUrl;
    if (this.music_status) {
      this.audio.play();
    }
  }

  seekToPosition(position: number) {
    if (this.audio.duration) {
      this.audio.currentTime = (position / 100) * this.audio.duration;
    }
  }
}
