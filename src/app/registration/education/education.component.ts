import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent implements OnInit {
  userService = inject(UserService);

  Form = new FormGroup({
    education1: new FormControl('', [Validators.required]),
    education1StartDate: new FormControl('', [Validators.required]),
    education1EndDate: new FormControl('', [Validators.required]),

    education2: new FormControl(''),
    education2StartDate: new FormControl(''),
    education2EndDate: new FormControl(''),

    education3: new FormControl(''),
    education3StartDate: new FormControl(''),
    education3EndDate: new FormControl(''),

    education4: new FormControl(''),
    education4StartDate: new FormControl(''),
    education4EndDate: new FormControl(''),

    education5: new FormControl(''),
    education5StartDate: new FormControl(''),
    education5EndDate: new FormControl(''),
  });

  constructor(private route: Router, private router: ActivatedRoute) {}

  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  onNext() {
    const usersData = [
      {
        education: this.Form.get('education1')?.value,
        startDate: this.Form.get('education1StartDate')?.value,
        endDate: this.Form.get('education1EndDate')?.value,
      },
      {
        education: this.Form.get('education2')?.value,
        startDate: this.Form.get('education2StartDate')?.value,
        endDate: this.Form.get('education2EndDate')?.value,
      },
      {
        education: this.Form.get('education3')?.value,
        startDate: this.Form.get('education3StartDate')?.value,
        endDate: this.Form.get('education3EndDate')?.value,
      },
      {
        education: this.Form.get('education4')?.value,
        startDate: this.Form.get('education4StartDate')?.value,
        endDate: this.Form.get('education4EndDate')?.value,
      },
      {
        education: this.Form.get('education5')?.value,
        startDate: this.Form.get('education5StartDate')?.value,
        endDate: this.Form.get('education5EndDate')?.value,
      },
    ];

    this.userService
      .updateUser(`${this.username}`, 'education', usersData)
      .subscribe();

    this.route.navigate(['/workExperience'], {
      queryParams: {
        username: this.username,
      },
    });
  }

  onBack() {
    this.route.navigate(['/personalInfo']);
  }
}
