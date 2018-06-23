import { Component, OnInit, Input } from '@angular/core';

import { Post } from '@wefox/platform';

@Component({
  selector: 'wfx-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent {
  @Input() mode: 'edit' | 'default' | 'add' = 'default';
  @Input() post: Partial<Post>;
}
