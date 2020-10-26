import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpenseComponent } from './expense/expense.component';
import { SavingsComponent } from './savings/savings.component';
import { FinancialGoalsComponent } from './financial-goals/financial-goals.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutYouComponent } from './about-you/about-you.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatSliderModule } from '@angular/material/slider';
const routes: Routes = [
  {
    path: '',
    component:LoginComponent 
  },
  {
    path: 'register',
    component:RegisterComponent 
  },
  {
    path: 'user/:uid',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserSettingsComponent,
    UserProfileComponent,
    AboutUsComponent,
    DashboardComponent,
    BudgetComponent,
    ExpenseComponent,
    SavingsComponent,
    FinancialGoalsComponent,
    FooterComponent,
    HeaderComponent,
    AboutYouComponent,
  ],
  imports: [
    // AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
