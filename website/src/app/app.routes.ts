import { Routes } from '@angular/router';
import { MomsComponent } from './moms/moms.component';
import { GraphsComponent } from './graphs/graphs.component';

export const routes: Routes = [
  { path: 'moms', component: MomsComponent },
  { path: 'graphs', component: GraphsComponent},
  { path: '', redirectTo: '/moms', pathMatch: 'full'}
];
