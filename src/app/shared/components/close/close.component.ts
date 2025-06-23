import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-close',
  standalone: true,
  imports: [],
  templateUrl: './close.component.html',
  styleUrl: './close.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CloseComponent {

}
