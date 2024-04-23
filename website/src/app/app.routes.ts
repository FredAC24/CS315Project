import { Routes } from '@angular/router';
import { MomsComponent } from './moms/moms.component';
import { GraphsComponent } from './graphs/graphs.component';
import { DamsComponent } from './dams/dams.component';

export const routes: Routes = [
  { path: 'moms', component: MomsComponent },
  { path: 'graphs', component: GraphsComponent},
  { path: 'dams', component: DamsComponent},
  { path: '', redirectTo: '/moms', pathMatch: 'full'}
];
