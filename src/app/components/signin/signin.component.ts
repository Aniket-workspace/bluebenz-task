import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  // signinForm: FormGroup = new FormGroup({
  //   userName: new FormControl("", [Validators.required,]),
  //   pass: new FormControl("", [Validators.required]),
  // })
  username: string = '';
  password: string = '';
  role: string = ""

  changeType: boolean = false
  visible: boolean = false

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (!this.username || !this.password || !this.role) {
      alert('Please enter all details');
      return;
    }

    this.http
      .get<any[]>(`http://localhost:3000/users?username=${this.username}&password=${this.password}&role=${this.role}`)
      .subscribe((users) => {
        if (users.length > 0) {
          alert('Sign-in successful');
          localStorage.setItem("user", JSON.stringify(users));
          this.router.navigate([`/${this.role}`]);
        } else {
          alert('Invalid credentials');
        }
      });
  }


  isVisible() {
    this.visible = !this.visible
    this.changeType = !this.changeType
  }

  toSignup() {
    this.router.navigate(["/signup"])
  }
}
