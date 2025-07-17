import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, input, Input, Output, signal, ViewChild, } from '@angular/core';
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";

import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import swal from 'sweetalert2';
import { MetricTemplateComponent } from '../about/metric-template/metric-template.component';
import { SongService } from '../../shared/services/song/song.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NextComponent } from "../../shared/components/next/next.component";
import { PauseComponent } from "../../shared/components/pause/pause.component";
@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [SectionTitleComponent, IntersectionObserverDirective, CommonModule, NextComponent, PauseComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestsComponent {


  interests = [
    {
      name: "Anime & TV shows",
      logo: "assets/SVG/svg_interest/tvshow.svg"
    },
    {
      name: "Football",
      logo: "assets/SVG/svg_interest/football.svg"
    },
    {
      name: "Music",
      logo: "assets/SVG/svg_interest/play.svg"
    },
    {
      name: "Coding",
      logo: "assets/SVG/svg_interest/coding.svg"
    },
    {
      name: "PC Games",
      logo: "assets/SVG/svg_interest/games.svg"
    },
    {
      name: "Cats",
      logo: "assets/SVG/svg_interest/cat.svg"
    },
    {
      name: "Food",
      logo: "assets/SVG/svg_interest/food.svg"
    },
    {
      name: "Traveling",
      logo: "assets/SVG/svg_interest/travelling.svg"
    }
  ];


  public songService = inject(SongService)

  songList = input<string[]>([])
  songProgress = signal<number>(0)
  @Output() music_play_status = new EventEmitter<boolean>();

  private progressSubscription: Subscription | undefined;

  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;


  ngOnInit(): void {
    if (this.songList()) {
      this.songService.setSongs(this.songList());
    }
    this.progressSubscription = this.songService.songProgress.subscribe(progress => {
      this.songProgress.set(progress);
    });
  }

  ngAfterViewInit(): void {
    if (!this.canvas || !this.container) return;

    const canvasEl = this.canvas.nativeElement;
    const containerEl = this.container.nativeElement;

    // Set canvas size to match the container's size
    canvasEl.width = containerEl.clientWidth;
    canvasEl.height = containerEl.clientHeight;
  }


  ngOnDestroy(): void {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  playSongs(songStatus: boolean) {
    this.songService.toggleMusic(songStatus);
    this.music_play_status.emit(songStatus)
  }

  logRangeValue(event: any) {
    this.updateVolume(event.target.value);
  }

  updateVolume(volume: number) {
    this.songService.adjustVolumeSong(volume);
  }

  stopClickPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  nextSong() {
    this.songService.changeSong(true);
  }

  seekToPosition(event: MouseEvent) {
    const progressElement = event.target as HTMLElement;
    const seekPosition = (event.offsetX / progressElement.offsetWidth) * 100;

    if (!isNaN(seekPosition)) { // Check if the click event originated from the progress bar
      this.songProgress.set(seekPosition);

      this.songService.seekToPosition(seekPosition);;
    }
  }
}
