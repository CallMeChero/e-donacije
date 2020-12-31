import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from "./shared/routes/content-routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'naslovna',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: '**',
    redirectTo: 'naslovna'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
