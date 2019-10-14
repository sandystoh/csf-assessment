import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { ConfirmComponent } from './components/confirm.component';

const ROUTES: Routes = [
  { path: 'confirm', component: ConfirmComponent},
  { path: 'add', component: FormComponent},
  { path: '', component: FormComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0]})], // [x, y]
  exports: [RouterModule]
})
export class AppRoutingModule { }
