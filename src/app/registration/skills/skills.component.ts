import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}
  userService = inject(UserService);

  Form = new FormGroup({
    skill1: new FormControl(''),
    skill2: new FormControl(''),
    skill3: new FormControl(''),
    skill4: new FormControl(''),
    skill5: new FormControl(''),
    skill6: new FormControl(''),
    lang1: new FormControl(''),
    lang2: new FormControl(''),
    lang3: new FormControl(''),
    otherSkills: new FormControl(''),
  });

  //Receiving username from previous component
  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  onNext() {
    const userSkills = [
      { skill: this.Form.get('skill1')?.value },
      { skill: this.Form.get('skill2')?.value },
      { skill: this.Form.get('skill3')?.value },
      { skill: this.Form.get('skill4')?.value },
      { skill: this.Form.get('skill5')?.value },
      { skill: this.Form.get('skill6')?.value },
    ];

    const userLanguages = [
      { lang: this.Form.get('lang1')?.value },
      { lang: this.Form.get('lang2')?.value },
      { lang: this.Form.get('lang3')?.value },
    ];

    const otherSkills = [
      {
        otherSkills: this.Form.get('otherSkills')?.value,
      },
    ];

    //Sending data to db
    this.userService
      .updateUser(`${this.username}`, 'skills', userSkills)
      .subscribe();
    this.userService
      .updateUser(`${this.username}`, 'languages', userLanguages)
      .subscribe();
    this.userService
      .updateUser(`${this.username}`, 'otherSkills', otherSkills)
      .subscribe();

    this.route.navigate(['/http-client'], {
      queryParams: {
        username: this.username,
      },
    });
  }

  onBack() {
    this.route.navigate(['/workExperience']);
  }
}
