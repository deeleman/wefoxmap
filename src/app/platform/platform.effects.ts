import { Injectable } from '@angular/core';

import { PostEffects } from './post';

@Injectable()
export class PlatformEffects {
  static rootEffects(): Array<any> {
    return [
      PostEffects
    ];
  }
}
