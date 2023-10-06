import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatListComponent } from './componenets/cat-list/cat-list.component';
import { VoteComponent } from './componenets/cat-list/vote/vote.component';
import { VotingResultComponent } from './componenets/voting-result/voting-result.component';
import { HeaderComponent } from './componenets/layout/header/header.component';
import { FooterComponent } from './componenets/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CatListComponent,
    VoteComponent,
    VotingResultComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
