import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements OnInit {
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

  constructor(private router: Router, private route: ActivatedRoute) {}
  userService = inject(UserService);
  username: any;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
    });

    this.userService.getUser(`${this.username}`).subscribe((result) => {
      this.Form.patchValue({
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        username: result[0].username,
        email: result[0].email,
        personalInfo: result[0].personalInfo,
        education: this.getValue(result[0].education, 'education'),
        workExperience: this.getValue(
          result[0].workExperience,
          'workExperience'
        ),
        languages: this.getValue(result[0].languages, 'languages'),
        skills: this.getValue(result[0].skills, 'skills'),
        otherSkills: this.getValue(result[0].otherSkills, 'otherSkills'),
      });
    });
  }

  // Returns an array of the object, in order to show the values in the DOM
  getValue(obj: {}, value: String) {
    let clonedObj = Object.assign(obj);
    let toReturn = [];

    if (value === 'education') {
      for (let i = 0; i < clonedObj.length; i++) {
        toReturn[i] = [
          clonedObj[i].education,
          clonedObj[i].startDate,
          clonedObj[i].endDate,
        ];
      }
    } else if (value === 'workExperience') {
      for (let i = 0; i < clonedObj.length; i++) {
        toReturn[i] = [
          clonedObj[i].company,
          clonedObj[i].profession,
          clonedObj[i].from,
          clonedObj[i].until,
        ];
      }
    } else if (value === 'languages') {
      for (let i = 0; i < clonedObj.length; i++) {
        toReturn[i] = [clonedObj[i].lang];
      }
    } else if (value === 'skills') {
      for (let i = 0; i < clonedObj.length; i++) {
        toReturn[i] = [clonedObj[i].skill];
      }
    } else if (value === 'otherSkills') {
      for (let i = 0; i < clonedObj.length; i++) {
        toReturn[i] = [clonedObj[i].otherSkills];
      }
    }
    return toReturn;
  }

  // Updating database
  updateUser(code: String, toChange: String, newValue: String, index: Number) {
    if (code === 'fname') {
      this.userService
        .updateUser(`${this.username}`, toChange, newValue)
        .subscribe();
    } else if (code === 'lname') {
      this.userService
        .updateUser(`${this.username}`, toChange, newValue)
        .subscribe();
    } else if (code === 'email') {
      this.userService
        .updateUser(`${this.username}`, toChange, newValue)
        .subscribe();
    } else if (code === 'pInfo') {
      this.userService
        .updateUser(`${this.username}`, toChange, newValue)
        .subscribe();
    } else if (code === 'wE') {
      this.userService
        .editUser(
          `${this.username}`,
          'workExperience',
          index,
          toChange,
          newValue
        )
        .subscribe();
    } else if (code === 'ed') {
      this.userService
        .editUser(`${this.username}`, 'education', index, toChange, newValue)
        .subscribe();
    } else if (code === 'lang') {
      this.userService
        .editUser(`${this.username}`, 'languages', index, toChange, newValue)
        .subscribe();
    } else if (code === 'skills') {
      this.userService
        .editUser(`${this.username}`, 'skills', index, toChange, newValue)
        .subscribe();
    } else if (code === 'otherSkills') {
      this.userService
        .editUser(`${this.username}`, 'otherSkills', index, toChange, newValue)
        .subscribe();
    }
  }

  onSubmit() {
    let user = this.userService.getUser(`${this.username}`).subscribe();

    alert('Your profile has been updated!');
    this.router.navigate(['/main-page'], {
      queryParams: {
        username: this.username,
      },
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
