import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionScrollService {

  private sectionSubject = new Subject<string>();
  section$ = this.sectionSubject.asObservable();

  scrollToSection(section: string) {
    this.sectionSubject.next(section);
  }
}
