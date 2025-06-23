import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-next',
  standalone: true,
  imports: [],
  templateUrl: './next.component.html',
  styleUrl: './next.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NextComponent {

}
