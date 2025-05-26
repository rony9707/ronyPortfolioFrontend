import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateAge',
  standalone: true
})
export class CalculateAgePipe implements PipeTransform {

  transform(value: string | Date): number | null {
    if (!value) return null;

    const today = new Date();
    const birthDate = new Date(value);

    if (isNaN(birthDate.getTime())) return null; 

    let age = today.getFullYear() - birthDate.getFullYear();
    const currentMonth = today.getMonth();
    const birthMonth = birthDate.getMonth();
    const currentDay = today.getDate();
    const birthDay = birthDate.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }

    return age;
  }

}
