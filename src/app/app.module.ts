import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import {UsuarioRelatorioComponent} from './componente/usuario/usuario-relatorio/usuario-relatorio.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxCurrencyModule} from 'ngx-currency';
import {ChartsModule} from 'ng2-charts';
import { BarChartComponent } from './componente/bar-chart/bar-chart.component';

export const appRouters: Routes = [
  {path : 'home', component: HomeComponent, canActivate: [GuardiaoGuard]},
  {path : 'login', component: LoginComponent},
  {path : '', component: LoginComponent},
  {path : 'usuarios', component : UsuarioComponent, canActivate: [GuardiaoGuard]},
  {path : 'usuarioAdd', component : UsuarioAddComponent, canActivate: [GuardiaoGuard]},
  {path : 'usuarioAdd/:id', component : UsuarioAddComponent, canActivate: [GuardiaoGuard]},
  {path : 'relatorioUsuario', component: UsuarioRelatorioComponent, canActivate: [GuardiaoGuard]},
  {path : 'grafico', component: BarChartComponent, canActivate: [GuardiaoGuard]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioRelatorioComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
