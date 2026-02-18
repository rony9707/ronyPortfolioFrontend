import { Injectable, OnDestroy, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SongService implements OnDestroy {

  public audio = new Audio();
  music_status = signal(false)
  musicUrl = signal('');
  volume = signal(50);
  private songLinks: string[] = [];
  private currentSongIndex = 0;

  //Audio Visualizer
  audioCTX = new AudioContext()
  private audioSource?: MediaElementAudioSourceNode;
  private analyser?: AnalyserNode;


  songProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  timer: BehaviorSubject<string> = new BehaviorSubject<string>('0:00');

  private timerInterval: any;

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

      // Load the song into the audio instance
      if (this.audio.src !== this.musicUrl()) {
        this.audio.src = this.musicUrl();
        this.audio.load();
        console.log("song has been loaded")
      }
    }
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
      this.audio.play().then(() => {
        this.music_status.set(musicStatus);
        this.startTimer();
        // this.playSound();
      }).catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Audio Playback Error',
          background: '#e9f7ef',
          customClass: {
            confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
            cancelButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
          },
          text: `${error.message}`,
        });
      });
    } else {
      this.audio.pause();
      this.music_status.set(musicStatus)
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
    }, 1000)
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
    this.musicUrl.set(this.songLinks[this.currentSongIndex]);
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
