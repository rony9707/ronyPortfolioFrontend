import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent {

}
