import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-information',
  templateUrl: './set-information.component.html',
  styleUrls: ['./set-information.component.scss'],
})
export class SetInformationComponent {
  constructor(public dialogRef: MatDialogRef<SetInformationComponent>) {}
}
