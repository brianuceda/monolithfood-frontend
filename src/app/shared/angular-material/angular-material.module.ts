import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Http
import { HttpClientModule } from '@angular/common/http';
// Material: Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Material: Input Components
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
// Material: Usefull Components
import { MatButtonModule } from '@angular/material/button';
// Material: Visual Components
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    HttpClientModule,
    // Material: Forms
    FormsModule,
    ReactiveFormsModule,
    // Material: Input Components
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    // Material: Usefull Components
    MatIconModule,
    MatButtonModule,
    // Material: Visual Components
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class AngularMaterialModule {}
