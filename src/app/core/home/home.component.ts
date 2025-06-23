import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { IndexComponent } from "../../feature/index/index.component";
import { AboutComponent } from "../../feature/about/about.component";
import { PortfolioComponent } from "../../feature/portfolio/portfolio.component";
import { ResumeComponent } from "../../feature/resume/resume.component";
import { ContactmeComponent } from "../../feature/contactme/contactme.component";
import { SidebarComponent } from "../../feature/sidebar/sidebar.component";
import { SectionScrollService } from '../services/sectionScroll/section-scroll.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IAgnibhaProfile } from '../../shared/interface/IAgnibhaProfile.interface';
import { SkillsComponent } from "../../feature/skills/skills.component";
import { InterestsComponent } from "../../feature/interests/interests.component";
import { SongService } from '../../shared/services/song/song.service';
import { CloseComponent } from '../../shared/components/close/close.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IndexComponent,
    AboutComponent,
    PortfolioComponent,
    ResumeComponent,
    ContactmeComponent,
    SidebarComponent,
    CommonModule,
    SkillsComponent,
    InterestsComponent,
    CloseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //FUNCTIONALITY of this component
  //   1. Which section to navigate coming from "Navigation Button Component"
  //   2. Highlight the button of the sction section
  //

  // Declare properties here
  activeSection = signal<string>('indexSection');
  sidebarOpen = signal(false);
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('indexSection') indexSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('resumeSection') resumeSection!: ElementRef;
  @ViewChild('portfolioSection') portfolioSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  agnibhaData = signal<IAgnibhaProfile | null>(null)
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;


  // Declare subscribers here
  private $scrollSub!: Subscription;


  // Inject services here
  private scrollService = inject(SectionScrollService)
  private route = inject(ActivatedRoute)
  public songService = inject(SongService)


  ngOnInit(): void {
    const user: IAgnibhaProfile = this.route.snapshot.data['user'];
    this.agnibhaData.set(user);
  }


  ngAfterViewInit(): void {
    this.$scrollSub = this.scrollService.section$.subscribe(sectionName => {
      //which section to navigate coming from "Navigation Button Component"
      this.scrollToSection(sectionName);
    });

    //Highlight the button of the section which is visible
    setTimeout(() => this.onScroll(), 0);
  }

  ngOnDestroy(): void {
    if (this.$scrollSub) this.$scrollSub.unsubscribe();
  }

  //which section to navigate coming from "Navigation Button Component"--1
  scrollToSection(sectionName: string): void {
    const sectionMap: { [key: string]: ElementRef } = {
      indexSection: this.indexSection,
      aboutSection: this.aboutSection,
      resumeSection: this.resumeSection,
      portfolioSection: this.portfolioSection,
      contactSection: this.contactSection
    };

    const targetRef = sectionMap[sectionName];
    if (targetRef) {
      this.scrollTo(targetRef.nativeElement);
    }
  }

  //which section to navigate coming from "Navigation Button Component"--2
  scrollTo(target: HTMLElement): void {
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }


  //Highlight the button of the section which is visible--1
  onScroll(): void {
    const container = this.scrollContainer?.nativeElement;
    const scrollTop = container?.scrollTop;

    const sections = [
      { name: 'indexSection', ref: this.indexSection },
      { name: 'aboutSection', ref: this.aboutSection },
      { name: 'resumeSection', ref: this.resumeSection },
      { name: 'portfolioSection', ref: this.portfolioSection },
      { name: 'contactSection', ref: this.contactSection }
    ];

    let current = sections[0].name;
    for (let section of sections) {
      if (scrollTop >= section?.ref?.nativeElement.offsetTop - 10) {
        current = section.name;
      }
    }

    this.activeSection.set(current);
  }

  //If in phone mode, a button of the sidebar is clicked, it will close the sidebar
  closeSidebar(close: boolean): void {
    this.sidebarOpen.set(close)
  }


  audio1() {
    if (!this.canvas) return;

    const canvasEl = this.canvas.nativeElement;

    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight


    let ctx = this.canvas.nativeElement.getContext('2d')
    if (!ctx) {
      console.error('Canvas 2D context is not available.');
      return;
    }

    const analyser = this.songService.getAnalyserNode();

    analyser.fftSize = 64;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barbWidth = ((canvasEl.width / 2) / bufferLength);

    const drawVisualizer = (
      ctx: CanvasRenderingContext2D,
      canvasEl: HTMLCanvasElement,
      dataArray: Uint8Array,
      bufferLength: number,
      barWidth: number
    ) => {
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 3;
        ctx.fillStyle = '#22C55E';
        ctx.fillRect(canvasEl.width / 2 - x, canvasEl.height - barHeight, barWidth, barHeight);
        x += barWidth;
      }
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 3;
        ctx.fillStyle = '#22C55E';
        ctx.fillRect(x, canvasEl.height - barHeight, barWidth, barHeight);
        x += barWidth;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      analyser.getByteFrequencyData(dataArray);
      drawVisualizer(ctx, canvasEl, dataArray, bufferLength, barbWidth);
      requestAnimationFrame(animate);
    };

    animate()
  }

  music_play_status($event: boolean) {
    if ($event) {
      setTimeout(() => this.audio1(), 100);
    }
  }

}
