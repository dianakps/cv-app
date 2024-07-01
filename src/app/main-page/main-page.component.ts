import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option1Component } from '../resumes/option1/option1.component';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [Option1Component],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}

  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  navigateToOptions(value: String) {
    if (value === 'view') {
      this.route.navigate(['/view'], {
        queryParams: {
          username: this.username,
        },
      });
    } else if (value === 'update') {
      this.route.navigate(['/update'], {
        queryParams: {
          username: this.username,
        },
      });
    } else if (value === 'delete') {
      this.route.navigate(['/delete'], {
        queryParams: {
          username: this.username,
        },
      });
    }
  }

  navigateToResume(value: String) {
    if (value === 'option1') {
      this.route.navigate(['/option1'], {
        queryParams: {
          username: this.username,
        },
      });
    } else if (value === 'option2') {
      this.route.navigate(['/option2'], {
        queryParams: {
          username: this.username,
        },
      });
    } else if (value === 'option3') {
      this.route.navigate(['/option3'], {
        queryParams: {
          username: this.username,
        },
      });
    }
  }

  // hamburgermenu functionality
  // hMenu = document.getElementById('hamburger-menu');

  hideHamMenu() {
    console.log('clicked');
    let span1 = document.getElementById('span1');
    let span2 = document.getElementById('span2');
    let span3 = document.getElementById('span3');
    let navbar = document.getElementById('top');

    span1?.classList.toggle('moved');
    span2?.classList.toggle('moved');
    span3?.classList.toggle('moved');

    navbar?.classList.toggle('hidden');
  }
}
