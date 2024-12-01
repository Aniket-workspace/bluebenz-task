import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/tasks';

  editingTask: Task | null = null;

  name: string = ""
  userId: number = 0

  tasks: Task[] = [];


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const auth = localStorage.getItem("user");
    if (auth === null) {
      this.router.navigate(["/signin"])

    } else if (JSON.parse(auth)[0].role === "user") {
      this.router.navigate(["/user"])
      this.name = JSON.parse(auth)[0].name
      this.userId = JSON.parse(auth)[0].id
      this.loadTasks();

    }

  }

  add() {
    this.router.navigate(["/add"])
  }

  loadTasks(): void {

    this.http.get<Task[]>(`${this.apiUrl}?userid=${this.userId}`).subscribe((data) => (this.tasks = data ?? []));

  }



  startEditing(task: Task): void {
    this.editingTask = { ...task };
  }

  cancelEditing(): void {
    this.editingTask = null;
  }

  saveTask(): void {
    if (this.editingTask) {
      this.http.put<Task>(`${this.apiUrl}/${this.editingTask.id}`, this.editingTask).subscribe(() => {
        this.editingTask = null;
        this.loadTasks();
      });
    }
  }

  markAsCompleted(task: Task): void {
    task.completed = true;
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).subscribe(() => this.loadTasks());
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.http.delete<void>(`${this.apiUrl}/${task.id!}`).subscribe(() => this.loadTasks());
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/signin"])
  }
}
