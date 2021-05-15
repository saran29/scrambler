import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ScramblePipe } from './pipe/scramble-pipe.pipe';
import { SentenceComponent } from './components/sentence/sentence.component';
import { InfoComponent } from './components/info/info.component';
import { ScoreComponent } from './components/score/score.component';
import { BoardComponent } from './components/board/board.component';
import { SplitStringPipe } from './pipe/split-string.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScramblePipe,
    SentenceComponent,
    InfoComponent,
    ScoreComponent,
    BoardComponent,
    SplitStringPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [ScramblePipe, SplitStringPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
