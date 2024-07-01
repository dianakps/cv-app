import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent implements OnInit {
  userService = inject(UserService);
  constructor(private router: Router, private route: ActivatedRoute) {}

  username: any;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  Form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onDelete(value: {}) {
    let getValue = Object.assign(value);
    let usernameToDelete = getValue.username;
    let password = getValue.password;

    this.userService.getUser(`${this.username}`).subscribe((result) => {
      let isValid = false;
      usernameToDelete === result[0].username && password === result[0].password
        ? (isValid = true)
        : '';
      console.log(isValid);

      if (isValid) {
        this.userService.deleteUser(usernameToDelete).subscribe();
        alert('Your account has been deleted.');
        this.router.navigate(['']);
      } else {
        alert('Sorry credentials do not match. Please try again.');
      }
    });
  }

  onBack() {
    this.router.navigate(['/main-page'], {
      queryParams: {
        username: this.username,
      },
    });
  }
}
