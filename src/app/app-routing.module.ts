import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatListComponent } from 'src/app/componenets/cat-list/cat-list.component';
import { VotingResultComponent } from './componenets/voting-result/voting-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'catmash', pathMatch: 'full' },
  { path: 'catmash', component: CatListComponent },
  { path: 'result', component: VotingResultComponent },
  { path: '**', component: CatListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
