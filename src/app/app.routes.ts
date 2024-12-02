import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { roleGuard } from './shared/role.guard';
import { userroleGuard } from './shared/userrole.guard';
import { signinGuard } from './shared/signin.guard';

export const routes: Routes = [
    { path: "", redirectTo: "/user", pathMatch: 'full' },
    { path: "user", component: TaskListComponent, canActivate: [userroleGuard] },
    { path: "add", component: TaskFormComponent, canActivate: [userroleGuard] },
    { path: "signin", component: SigninComponent, canActivate: [signinGuard] },
    { path: "signup", component: SignupComponent, canActivate: [signinGuard] },
    { path: "admin", component: AdminDashboardComponent, canActivate: [roleGuard] }

];
