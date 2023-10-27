import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Http
import { HttpClientModule } from '@angular/common/http';
// Angular Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class AngularMaterialModule {}
