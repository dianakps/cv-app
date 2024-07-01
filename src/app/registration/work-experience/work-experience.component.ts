import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css',
})
export class WorkExperienceComponent implements OnInit {
  Form = new FormGroup({
    profession1: new FormControl('', Validators.required),
    company1: new FormControl('', Validators.required),
    from1: new FormControl('', Validators.required),
    until1: new FormControl('', Validators.required),

    profession2: new FormControl(''),
    company2: new FormControl(''),
    from2: new FormControl(''),
    until2: new FormControl(''),

    profession3: new FormControl(''),
    company3: new FormControl(''),
    from3: new FormControl(''),
    until3: new FormControl(''),

    profession4: new FormControl(''),
    company4: new FormControl(''),
    from4: new FormControl(''),
    until4: new FormControl(''),

    profession5: new FormControl(''),
    company5: new FormControl(''),
    from5: new FormControl(''),
    until5: new FormControl(''),
  });

  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  userService = inject(UserService);
  constructor(private route: Router, private router: ActivatedRoute) {}

  onNext() {
    const usersData = [
      {
        profession: this.Form.get('profession1')?.value,
        company: this.Form.get('company1')?.value,
        from: this.Form.get('from1')?.value,
        until: this.Form.get('until1')?.value,
      },
      {
        profession: this.Form.get('profession2')?.value,
        company: this.Form.get('company2')?.value,
        from: this.Form.get('from2')?.value,
        until: this.Form.get('until2')?.value,
      },
      {
        profession: this.Form.get('profession3')?.value,
        company: this.Form.get('company3')?.value,
        from: this.Form.get('from3')?.value,
        until: this.Form.get('until3')?.value,
      },
      {
        profession: this.Form.get('profession4')?.value,
        company: this.Form.get('company4')?.value,
        from: this.Form.get('from4')?.value,
        until: this.Form.get('until4')?.value,
      },
      {
        profession: this.Form.get('profession5')?.value,
        company: this.Form.get('company5')?.value,
        from: this.Form.get('from5')?.value,
        until: this.Form.get('until5')?.value,
      },
    ];

    this.userService
      .updateUser(`${this.username}`, 'workExperience', usersData)
      .subscribe();

    this.route.navigate(['/skills'], {
      queryParams: {
        username: this.username,
      },
    });
  }

  onBack() {
    this.route.navigate(['/education'], {
      queryParams: {
        username: this.username,
      },
    });
  }
}
