import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Usefull Components
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
// Input Components
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// Visual Components
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    // Material: Forms
    FormsModule,
    ReactiveFormsModule,
    // Material: Usefull Components
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSortModule,
    // Material: Input Components
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    // Material: Visual Components
    MatDialogModule,
  ],
})
export class AngularMaterialModule {}
