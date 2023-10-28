import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Mi Perfil');
    });
  }
}
