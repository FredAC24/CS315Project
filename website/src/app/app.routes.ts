import { Routes } from '@angular/router';
import { MomsComponent } from './moms/moms.component';
import { GraphsComponent } from './graphs/graphs.component';
import { DamsComponent } from './dams/dams.component';
import { GoatComponent } from './goat/goat.component';
import { TwinsComponent } from './twins/twins.component';

export const routes: Routes = [
  { path: 'moms', component: MomsComponent },
  { path: 'graphs', component: GraphsComponent},
  { path: 'dams', component: DamsComponent},
  { path: 'goat/:tag', component: GoatComponent},  
  { path: 'twins', component: TwinsComponent},
  { path: '', redirectTo: '/moms', pathMatch: 'full'}
];
