import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListagemEstoqueComponent } from './components/listagem-estoque/listagem-estoque.component';
import { ProdutoComponent } from './components/produto/produto.component';
//import {ValidacaoComponent} from './services/validacao.service';

const appRoutes : Routes = [
  {path: '', component:HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'listagem', component:ListagemEstoqueComponent},
  {path: 'produto', component:ProdutoComponent}
]//criando as minhas rotas.


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ListagemEstoqueComponent,
    ProdutoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  //providers: [ValidacaoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
