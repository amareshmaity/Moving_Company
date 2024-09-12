import { Routes } from '@angular/router';
import { AdminSigninComponent } from './component/admin/admin-signin/admin-signin.component';
import { AdminSignupComponent } from './component/admin/admin-signup/admin-signup.component';
import { UserSigninComponent } from './component/user/user-signin/user-signin.component';
import { UserSignupComponent } from './component/user/user-signup/user-signup.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './component/user/user-dashboard/user-dashboard.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './component/home/home.component';
import { AddServiceComponent } from './component/admin/add-service/add-service.component';
import { QuickQuoteComponent } from './component/user/quick-quote/quick-quote.component';
import { ViewServicesComponent } from './component/admin/view-services/view-services.component';
import { ReqForServiceComponent } from './component/user/req-for-service/req-for-service.component';
import { ViewOrdersComponent } from './component/user/view-orders/view-orders.component';
import { ViewOrderComponent } from './component/admin/view-order/view-order.component';
import { ViewQuoteComponent } from './component/admin/view-quote/view-quote.component';
import { InquiryComponent } from './component/user/inquiry/inquiry.component';
import { ViewMessageComponent } from './component/admin/view-message/view-message.component';


export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'admin/signin',
        component: AdminSigninComponent
    },
    {
        path:'admin/signup',
        component: AdminSignupComponent
    },
    {
        path:'admin',
        canActivate: [authGuard],
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'addService', pathMatch: 'full' }, // Default route
            { path: 'dashboard', component: DashboardComponent },
            { path: 'addService', component: AddServiceComponent },
            { path: 'service', component: ViewServicesComponent },
            { path: 'viewOrder', component: ViewOrderComponent },
            { path: 'viewQuote', component: ViewQuoteComponent },
            { path: 'viewMessage', component: ViewMessageComponent },
  
        ]
    },

    {
        path:'user/signin',
        component: UserSigninComponent
    },
    {
        path:'user/signup',
        component: UserSignupComponent
    },
    {
        path:'user',
        canActivate: [authGuard],
        component: UserDashboardComponent,
        children: [
            { path: '', redirectTo: 'quickQuote', pathMatch: 'full' }, // Default route
            { path: 'dashboard', component: UserDashboardComponent },
            { path: 'service', component: ReqForServiceComponent },
            { path: 'quickQuote', component: QuickQuoteComponent },
            { path: 'viewOrders', component: ViewOrdersComponent },
            { path: 'newInquiry', component: InquiryComponent },
        ]
    },

];
