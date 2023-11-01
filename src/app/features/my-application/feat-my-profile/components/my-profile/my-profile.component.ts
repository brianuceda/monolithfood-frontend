import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  constructor(
    private globalService: GlobalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Mi Perfil');
    });
  }

  openCustomSnackbar(msg: string, type: string): void {
    this.globalService.openCustomSnackbar(msg, type);
  }
}
