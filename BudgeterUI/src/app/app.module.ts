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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatRadioModule} from '@angular/material/radio';
import {NavbarModule, WavesModule, ButtonsModule} from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import { AddItemsComponent } from './add-items/add-items.component';
// For MDB Angular Free

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
  },
  {
    path: 'user/:uid/settings',
    component: UserSettingsComponent
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
    AddItemsComponent,

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
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ChartsModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatRadioModule,
    NavbarModule,
    WavesModule.forRoot(), 
    ButtonsModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ScrollingModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutYouComponent]

})
export class AppModule { }
