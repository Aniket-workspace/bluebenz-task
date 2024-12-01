import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  apiUrl: string = 'http://localhost:3000';
  users: any;
  selectedUserId: string = '';
  selectedUserName: string = '';
  selectedUserTasks: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const auth = localStorage.getItem("user");
    if (auth === null) {
      this.router.navigate(["/signin"])

    } else if (JSON.parse(auth)[0].role === "admin") {
      this.router.navigate(["/admin"])
      this.fetchUsers();

    }
  }

  fetchUsers(): void {
    this.http.get(`${this.apiUrl}/users?role=user`).subscribe((data) => {
      this.users = data;
    });
  }

  fetchUserTasks(userId: string, userName: string): void {
    this.selectedUserId = userId;
    this.selectedUserName = userName
    this.http.get(`${this.apiUrl}/tasks?userid=${userId}`).subscribe((data) => {
      this.selectedUserTasks = data;
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.apiUrl}/users/${userId}`).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.http.delete(`${this.apiUrl}/tasks/${taskId}`).subscribe(() => {
        this.fetchUserTasks(this.selectedUserId, this.selectedUserName);
      });
    }
  }

  updateTaskStatus(taskId: string, completed: boolean): void {
    const task = this.selectedUserTasks.find((t: any) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, completed: !completed };
      this.http.put(`${this.apiUrl}/tasks/${taskId}`, updatedTask).subscribe((updated) => {

        const index = this.selectedUserTasks.findIndex((t: any) => t.id === taskId);
        if (index !== -1) {
          this.selectedUserTasks[index] = updated;
        }
      });
    }
  }


  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/signin"])
  }

}
