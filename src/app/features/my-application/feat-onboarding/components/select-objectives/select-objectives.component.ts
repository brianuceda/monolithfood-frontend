import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-select-objectives',
  templateUrl: './select-objectives.component.html',
  styleUrls: ['./select-objectives.component.scss'],
})
export class SelectObjectivesComponent {
  constructor(private dialogRef: DialogRef<SelectObjectivesComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}
