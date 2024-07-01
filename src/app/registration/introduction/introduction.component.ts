import { Component, OnInit, inject } from '@angular/core';
import { SignUpComponent } from '../../sign-up/sign-up.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'introduction',
  standalone: true,
  imports: [SignUpComponent],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent implements OnInit {
  data: any;
  constructor(private route: Router, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.data = params['username'];
    });
  }

  moveToPersonalInfo() {
    this.route.navigate(['/personalInfo'], {
      queryParams: {
        username: this.data,
      },
    });
  }
}
