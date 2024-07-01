import { Component, OnInit, inject, input } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'http-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css',
})
export class HttpClientComponent implements OnInit {
  userService = inject(UserService);
  profileEmoji = inject(ProfileService);
  profileAnimal = inject(ProfileService);
  listWithEmojis: any = [];
  listWithAnimals: any = [];

  characterInput = '';
  constructor(private route: Router, private router: ActivatedRoute) {
    //http request to receive emojis
    this.profileEmoji.getEmojiImage().subscribe((data) => {
      this.listWithEmojis = data;
      this.characterInput = this.listWithEmojis[0].image;
    });

    //http request to receive animals
    this.profileAnimal.getAnimalImage().subscribe((data) => {
      this.listWithAnimals = data;
    });
  }

  emojiCounter = 0;
  changeEmoji() {
    if (this.emojiCounter <= 30) {
      this.emojiCounter++;
      this.characterInput = this.listWithEmojis[this.emojiCounter].image;
    } else {
      this.emojiCounter = 0;
      this.characterInput = this.listWithEmojis[this.emojiCounter].image;
    }
  }

  animalCounter = 0;
  changeAnimal() {
    if (this.animalCounter <= 30) {
      this.characterInput = this.listWithAnimals[this.animalCounter].image;
      this.animalCounter++;
    } else {
      this.animalCounter = 0;
      this.characterInput = this.listWithAnimals[this.animalCounter].image;
    }
  }

  username: any;
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.username = params['username'];
    });
  }

  onNext() {
    this.userService
      .updateUser(
        `${this.username}`,
        'profilePicture',
        `${this.characterInput}`
      )
      .subscribe();

    this.route.navigate(['/main-page'], {
      queryParams: {
        username: this.username,
      },
    });
  }

  onBack() {
    this.route.navigate(['/skills']);
  }
}
