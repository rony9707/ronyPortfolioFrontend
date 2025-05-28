import { Component, inject, Input, } from '@angular/core';
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";

import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import swal from 'sweetalert2';
import { MetricTemplateComponent } from '../about/metric-template/metric-template.component';
import { SongService } from '../../shared/services/song/song.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [SectionTitleComponent, IntersectionObserverDirective,CommonModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css',
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

  @Input()
  songList?: string[] = [];
  songProgress: number = 0;
  currentSongIndex: number = 0;

  private updateSubscription: Subscription | undefined;
  private progressSubscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.songList) {
      this.songService.setSongs(this.songList);
    }
    this.progressSubscription = this.songService.songProgress.subscribe(progress => {
      this.songProgress = progress;
    });



  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  playSongs(songStatus: boolean) {
    this.songService.toggleMusic(songStatus);
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
    //const { offsetWidth, offsetLeft } = progressElement;
    //const clickX = event.pageX - offsetLeft;
    const seekPosition = (event.offsetX / progressElement.offsetWidth) * 100;

    if (!isNaN(seekPosition)) { // Check if the click event originated from the progress bar
      this.songProgress = seekPosition;

      this.songService.seekToPosition(seekPosition);;
    }
  }
}
