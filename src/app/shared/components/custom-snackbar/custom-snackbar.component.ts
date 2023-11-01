import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { GlobalService } from '../../services/global.service';
import { snackBarAnimation } from './custom-snackbar.animations';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
  animations: [snackBarAnimation],
})
export class CustomSnackbarComponent implements OnInit {
  snackbarRef?: MatSnackBarRef<CustomSnackbarComponent>;

  constructor(
    private globalService: GlobalService,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeCustomSnackbar(): void {
    this.globalService.closeCustomSnackbar();
  }
}
