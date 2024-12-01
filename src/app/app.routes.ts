import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: "", redirectTo: "/user", pathMatch: 'full' },
    { path: "user", component: TaskListComponent },
    { path: "add", component: TaskFormComponent },
    { path: "signin", component: SigninComponent },
    { path: "signup", component: SignupComponent },
    { path: "admin", component: AdminDashboardComponent }

];
