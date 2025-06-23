import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pause',
  standalone: true,
  imports: [],
  templateUrl: './pause.component.html',
  styleUrl: './pause.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PauseComponent {

}
