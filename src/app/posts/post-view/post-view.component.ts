import { Component } from '@angular/core';

@Component({
  selector: 'wfx-post-view',
  styles: [`
    .post-view {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  template: `
  <section class="post-view wfx-bg--grey-light wfx-animation--slide-in">
    <router-outlet></router-outlet>
  </section>
  `
})
export class PostViewComponent { }
