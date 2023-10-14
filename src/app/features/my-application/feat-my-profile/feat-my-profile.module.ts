import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { FeatMyProfileRoutingModule } from './feat-my-profile-routing.module';

@NgModule({
  declarations: [MyProfileComponent],
  imports: [CommonModule, FeatMyProfileRoutingModule],
})
export class FeatMyProfileModule {}
