import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  implements OnInit, OnDestroy{
  //Declare Variables here--------------------------------
  showloader = signal(false);
  private routerSubscription?: Subscription;
  private router = inject(Router);
  private meta = inject(Meta);

  ngOnInit(): void {
    //For Showing Loader
    this.routerSubscription = this.router.events.subscribe(
      (routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          this.showloader.set(true);
        }

        if (routerEvent instanceof NavigationEnd) {
          this.showloader.set(false);
        }
      },
    );

    this.meta.addTags([
      {
        name: 'keywords',
        content: 'Agnibha Chowdhury, Angular Developer, Web Developer, Portfolio, India',
      },
      { name: 'author', content: 'Agnibha Chowdhury' },
    ]);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
