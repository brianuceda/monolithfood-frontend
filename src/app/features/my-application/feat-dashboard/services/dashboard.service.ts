import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  public startAndEndDate(
    dateControl: FormControl
  ): { startDate: Date; endDate: Date } | null {
    const date = dateControl.value;
    if (!date) {
      return null;
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    console.log('Fecha inicial:', startDate);
    console.log('Fecha final:', endDate);

    return { startDate, endDate };
  }
}
