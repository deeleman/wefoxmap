import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SETTINGS } from '@wefox/settings';

@Component({
  selector: 'wfx-not-found',
  template: `
    <section clasS="error__message">
      <h2>Ups!</h2>
      <p>
        Apparently the resource you're looking for has been removed or does not exit.</p>
    </section>
    <button class="error__backlink" routerLink="/">
      Back to List
    </button>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle(SETTINGS.titles.notFound);
  }
}
