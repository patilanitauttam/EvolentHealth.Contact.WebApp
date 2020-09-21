import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListingComponent } from './modules/contacts/contact-listing/contact-listing.component';


const routes: Routes = [
  {
    path: 'contact-listing',
    component: ContactListingComponent
  },
  {
    path: '',
    redirectTo: '/contact-listing',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    loadChildren: './modules/contacts/contact.module#ContactModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
