// user.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IAgnibhaProfile } from '../interface/IAgnibhaProfile.interface';
import { AgnibhaDataService } from '../../core/services/agnibhaData/agnibha-data.service';


export const userResolver: ResolveFn<IAgnibhaProfile> = () => {
  const http = inject(HttpClient);
  const userService = inject(AgnibhaDataService);

  const cachedData = userService.getUserData();
  if (cachedData) {
    return Promise.resolve(cachedData); // no need to hit API
  }

  return http.get<IAgnibhaProfile>('https://rony-portfolio.vercel.app/agnibha/getProfile', {
    withCredentials: true
  }).pipe(
    tap((data) => userService.setUserData(data))
  );
};
