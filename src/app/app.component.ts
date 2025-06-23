import { Component, inject, signal } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //Declare Variables here--------------------------------
  showloader = signal(false)
  private routerSubscription?: Subscription
  title = 'ronyPortfolio';
  private router = inject(Router)

  ngOnInit(): void {

    //For Showing Loader 
    this.routerSubscription = this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showloader.set(true)
      }

      if (routerEvent instanceof NavigationEnd) {
        this.showloader.set(false)
      }
    })
  }


  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe()
    }
  }
}
