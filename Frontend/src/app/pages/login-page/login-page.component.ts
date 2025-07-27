import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router , private userService : UserService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // login() {
  //   if (this.loginForm.valid) {
  //     const username = this.loginForm.value.username;
  //     localStorage.setItem('username', username); // Simple way to store temporarily
  //     this.router.navigate(['/home']);
  //   }
  // }
  login() {
    debugger
    const { username, password } = this.loginForm.value;
  
    this.userService.login(username, password).subscribe({
      next: (res:any) => {
        alert(res.message);
        // You can set a simple flag like localStorage.setItem('loggedIn', 'true')
        this.router.navigate(['/home']);
      },
      error: (err:any) => {
        alert('Login failed');
      }
    });
  }
  

  clear() {
    this.loginForm.reset();
  }
}
