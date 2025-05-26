import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAgnibhaProfile } from '../../../shared/interface/IAgnibhaProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class AgnibhaDataService {

  private userDataSubject = new BehaviorSubject<IAgnibhaProfile | null>(null);
  userData$ = this.userDataSubject.asObservable();

  setUserData(data: IAgnibhaProfile) {
    this.userDataSubject.next(data);
  }

  getUserData(): IAgnibhaProfile | null {
    return this.userDataSubject.value;
  }
}
