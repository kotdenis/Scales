import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { JournalComponent } from './components/journal/journal.component';
import { AddingComponent } from './components/adding/adding.component';


const appRoutes: Routes = [
  {path: '', component:MainmenuComponent},
  {path: 'journal', component: JournalComponent},
  {path: 'adding', component: AddingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    JournalComponent,
    AddingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule,
    NgxPaginationModule,
    ImageCropperModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
