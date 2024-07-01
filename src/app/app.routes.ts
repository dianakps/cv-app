import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { IntroductionComponent } from './registration/introduction/introduction.component';
import { PersonalInfoComponent } from './registration/personal-info/personal-info.component';
import { EducationComponent } from './registration/education/education.component';
import { WorkExperienceComponent } from './registration/work-experience/work-experience.component';
import { SkillsComponent } from './registration/skills/skills.component';
import { HttpClientComponent } from './registration/http-client/http-client.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Option1Component } from './resumes/option1/option1.component';
import { ViewComponent } from './navbar/view/view.component';
import { UpdateComponent } from './navbar/update/update.component';
import { Option2Component } from './resumes/option2/option2.component';
import { Option3Component } from './resumes/option3/option3.component';
import { DeleteComponent } from './navbar/delete/delete.component';

export const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  { path: `introduction`, component: IntroductionComponent },
  { path: 'personalInfo', component: PersonalInfoComponent },
  { path: 'education', component: EducationComponent },
  { path: 'workExperience', component: WorkExperienceComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'http-client', component: HttpClientComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'view', component: ViewComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'option1', component: Option1Component },
  { path: 'option2', component: Option2Component },
  { path: 'option3', component: Option3Component },
];
