import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionModule } from './session/session.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserComponent } from './shared/components/user/user.component';
import { ComunitiesListComponent } from './comunities/components/comunitieslist/comunitieslist.component';
import { ComunitiesPageComponent } from './comunities/pages/comunities-page/comunities-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ComunitiesListComponent,
    ComunitiesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SessionModule,
    HttpClientModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
