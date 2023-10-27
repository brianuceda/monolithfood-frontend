import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Planes de Suscripción');
    });
  }
}
