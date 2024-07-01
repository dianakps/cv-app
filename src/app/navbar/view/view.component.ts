import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'view',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}
  userService = inject(UserService);

  Form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    personalInfo: new FormControl(''),
    education: new FormControl([]),
    workExperience: new FormControl([]),
    languages: new FormControl(['']),
    skills: new FormControl([]),
    otherSkills: new FormControl([]),
  });

  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });

    this.userService.getUser(`${this.username}`).subscribe((result) => {
      this.Form.patchValue({
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        username: result[0].username,
        email: result[0].email,
        personalInfo: result[0].personalInfo,
        education: this.getValue(result[0].education),
        workExperience: this.getValue(result[0].workExperience),
        languages: this.getValue(result[0].languages),
        skills: this.getValue(result[0].skills),
        otherSkills: this.getValue(result[0].otherSkills),
      });
    });
  }

  getValue(obj: {}) {
    let clonedArr = Object.assign(obj);
    let toReturn = [];

    for (let i = 0; i < clonedArr.length; i++) {
      toReturn[i] = clonedArr[i];
    }
    return toReturn;
  }

  onBack() {
    this.route.navigate(['/main-page'], {
      queryParams: {
        username: this.username,
      },
    });
  }
}
