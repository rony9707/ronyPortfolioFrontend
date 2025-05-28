import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseURL = 'https://rony-portfolio.vercel.app'
  private sentEmailURL = `${this.baseURL}/agnibha/sentEmail`
  
  private http = inject(HttpClient)


  //Sent resume Password in Email
  sentResumePassword(email: object) {
    return this.http.post<any>(this.sentEmailURL, email, {
    }).pipe(catchError(this.handleError))
  }


  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('An error occured', error);

    return throwError("Something went wrong.")
  }
}
