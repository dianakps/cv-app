import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { profileAnimal, profileEmoji } from './interfaces/profile';

const PROFILE_API_URL_SMILEYS =
  'https://api.api-ninjas.com/v1/emoji?group=smileys_emotion';

const PROFILE_API_URL_ANIMALS =
  'https://api.api-ninjas.com/v1/emoji?group=animals_nature';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  getEmojiImage() {
    return this.http.get<profileEmoji>(PROFILE_API_URL_SMILEYS, {
      headers: {
        'X-Api-key': 'LD5d6PdM6k3i2KnRahKqIQ==SJqVx0X2ctAUlpBJ',
        // 'Content-Type': 'application/json',
      },
    });
  }

  getAnimalImage() {
    return this.http.get<profileAnimal>(PROFILE_API_URL_ANIMALS, {
      headers: {
        'X-Api-key': 'LD5d6PdM6k3i2KnRahKqIQ==SJqVx0X2ctAUlpBJ',
      },
    });
  }
}
