import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome-page',
  standalone: true,
  imports: [RouterModule, SignUpComponent, LoginComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class WelcomePageComponent {
  constructor(private router: Router) {}
  hideContainer = false;

  navigateToLogin() {
    this.router.navigate(['/login']);
    this.hideContainer = true;
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
    this.hideContainer = true;
  }
}
