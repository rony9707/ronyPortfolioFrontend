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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IndexComponent, AboutComponent, PortfolioComponent, ResumeComponent, ContactmeComponent, SidebarComponent, CommonModule, SkillsComponent, InterestsComponent],
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
  agnibhaData: IAgnibhaProfile | null = null;



  // Declare subscribers here
  private $scrollSub!: Subscription;


  // Inject services here
  private scrollService = inject(SectionScrollService)
  private route = inject(ActivatedRoute)


  ngOnInit(): void {
    const user: IAgnibhaProfile = this.route.snapshot.data['user'];
    this.agnibhaData = user;
    console.log('User from resolver:', user.info[9].value);
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
    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop;

    const sections = [
      { name: 'indexSection', ref: this.indexSection },
      { name: 'aboutSection', ref: this.aboutSection },
      { name: 'resumeSection', ref: this.resumeSection },
      { name: 'portfolioSection', ref: this.portfolioSection },
      { name: 'contactSection', ref: this.contactSection }
    ];

    let current = sections[0].name;
    for (let section of sections) {
      if (scrollTop >= section.ref.nativeElement.offsetTop - 10) {
        current = section.name;
      }
    }

    this.activeSection.set(current);
  }

  //If in phone mode, a button of the sidebar is clicked, it will close the sidebar
  closeSidebar(close: boolean): void {
    this.sidebarOpen.set(close)
  }

}
