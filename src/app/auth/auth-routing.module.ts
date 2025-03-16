import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutPageComponent } from "./pages/layoutPage/layout-Page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
           {path: 'login', component: LoginPageComponent},
            {path: '**', redirectTo: 'login'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthRoutingModule{}