import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = ""
  username: string = '';
  password: string = '';
  role: string = ""


  changeType: boolean = false
  visible: boolean = false

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (!this.username || !this.password || !this.name || !this.role) {
      alert('Please enter all setails');
      return;
    }
    const newUser = { name: this.name, username: this.username, password: this.password, role: this.role };
    this.http.post('http://localhost:3000/users', newUser).subscribe({
      next: (response) => {
        alert('User created successfully');
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        alert('Error creating user');
      }
    });

  }

  isVisible() {
    this.visible = !this.visible
    this.changeType = !this.changeType
  }

  toSignin() {
    this.router.navigate(["/signin"])
  }
}
