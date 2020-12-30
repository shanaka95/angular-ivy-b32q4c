import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {appInitializer} from './initializers/app.initializer';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter,
    allowedDomains: ['localhost:4200', 'app.eggion.com'],
    disallowedRoutes: ['http://example.com/examplebadroute/'],
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [
    AuthService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
