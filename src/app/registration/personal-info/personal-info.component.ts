import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}
  userService = inject(UserService);

  //Receiving the username from previous component
  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  Form: FormGroup = new FormGroup({
    text: new FormControl(),
  });

  // Passes the data to db
  onNext() {
    this.userService
      .updateUser(
        `${this.username}`,
        'personalInfo',
        this.Form.get('text')?.value
      )
      .subscribe();

    // Passes username to next component
    this.route.navigate(['/education'], {
      queryParams: {
        username: this.username,
      },
    });
  }

  onBack() {
    this.route.navigate(['/introduction']);
  }
}
