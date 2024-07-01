import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  constructor(private router: Router) {}
  userService = inject(UserService);

  userCredentails = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    let user: String;
    let found: Boolean = false;
    this.userService.getUsers().subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].username === this.userCredentails.get('username')?.value
        ) {
          user = result[i].username;
          if (
            result[i].password === this.userCredentails.get('password')?.value
          ) {
            found = true;
            this.router.navigate(['/main-page'], {
              queryParams: {
                username: this.userCredentails.get('username')?.value,
              },
            });
            return;
          }
        }
        if (i == result.length - 1 && found == false) {
          alert('Incorrect credentials, please try again.');
        }
      }
    });
  }

  returnToWelcomePage() {
    this.router.navigate(['']);
  }
}
