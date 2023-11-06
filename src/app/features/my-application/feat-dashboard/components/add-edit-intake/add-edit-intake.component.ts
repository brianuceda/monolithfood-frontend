import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-intake',
  templateUrl: './add-edit-intake.component.html',
  styleUrls: ['./add-edit-intake.component.scss'],
})
export class AddEditIntakeComponent {
  constructor(private dialogRef: DialogRef<AddEditIntakeComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
    // window.location.reload();
  }
}
