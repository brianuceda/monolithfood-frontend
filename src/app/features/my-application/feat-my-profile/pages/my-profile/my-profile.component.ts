import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  ResponseType = ResponseType;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Mi Perfil');
    });
  }

  openCustomSnackbar(msg: string, type: ResponseType): void {
    this.globalService.openCustomSnackbar(msg, type);
  }
}
