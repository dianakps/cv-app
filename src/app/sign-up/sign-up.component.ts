import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/services/interfaces/user';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {
  constructor(private route: Router) {}
  userService = inject(UserService);

  // Profile creation and validation
  profileForm: FormGroup = new FormGroup(
    {
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    },
    this.passwordConfirmValidator
  );

  passwordConfirmValidator(form: AbstractControl) {
    if (form.get('password')?.value !== form.get('password2')?.value) {
      form.get('password2')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return {};
    }
  }

  onSubmit() {
    this.userService.getUsers().subscribe((result) => {
      let isFound = false;
      for (let i = 0; i < result.length; i++) {
        if (result[i].username === this.profileForm.get('username')?.value) {
          alert(
            `Someone already is using username @${
              this.profileForm.get('username')?.value
            }, please try another`
          );
          isFound = true;
          return;
        }
      }
      if (!isFound) {
        if (this.profileForm.valid) {
          alert(
            `Thank you @${
              this.profileForm.get('username')?.value
            }, your registration has been completed successfully`
          );
        }

        // Passing username to next component
        this.route.navigate(['/introduction'], {
          queryParams: {
            username: this.profileForm.get('username')?.value,
          },
        });

        // Sending data to database
        const model: User = this.profileForm.value as User;
        let usersUsername = this.userService.addUser(model).subscribe();
      }
    });
  }

  // Navigate to previous page
  returnToWelcomePage() {
    this.route.navigate(['']);
  }
}
