import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './security/auth.guard';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  { path:'' , component:AuthComponent},
  { path:'Manage',canActivate:[AuthGuard],component:UserManagerComponent},
  { path:"**",redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
