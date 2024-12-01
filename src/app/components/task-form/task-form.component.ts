import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/tasks';

  taskTitle = '';
  users: any

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const auth = localStorage.getItem("user");
    if (auth === null) {
      this.router.navigate(["/signin"])
    } else {
      this.users = JSON.parse(auth!)[0]
    }
  }

  addTask(): void {
    if (this.taskTitle.trim()) {
      const newTask: Task = { title: this.taskTitle, userid: this.users.id, completed: false };
      this.http.post<Task>(this.apiUrl, newTask).subscribe(() => {
        this.taskTitle = '';
        this.router.navigate([""])
      });
    }
  }

  cancle() {
    this.router.navigate([""])
  }
}
