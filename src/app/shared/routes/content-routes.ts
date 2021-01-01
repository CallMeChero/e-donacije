import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'naslovna',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('../../components/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'donacija',
    loadChildren: () => import('../../components/application-wizard/application-wizard.module').then(m => m.ApplicationWizardModule)
  },
  {
    path: 'kontakt',
    loadChildren: () => import('../../components/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'o-nama',
    loadChildren: () => import('../../components/about-us/about-us.module').then(m => m.AboutUsModule)
  }
];
