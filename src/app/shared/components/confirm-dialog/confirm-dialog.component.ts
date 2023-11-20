import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  title: string;
  msg: string;
  object: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogo: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  close(): void {
    this.dialogo.close(false);
  }

  confirm(): void {
    this.dialogo.close(true);
  }
}
