import { Injectable } from '@angular/core';

@Injectable()
export abstract class WindowRef {
  abstract getNativeWindow(): Window;
}

