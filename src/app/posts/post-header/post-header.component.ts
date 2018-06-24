import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '@wefox/platform';

@Component({
  selector: 'wfx-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent {
  @Input() mode: 'edit' | 'default' | 'add' = 'default';
  @Input() post: Partial<Post>;

  @Output() delete = new EventEmitter<Post>();

  onDelete(post: Post): void {
    /* tslint:disable:max-line-length */
    const doDelete = confirm(`WARNING! This will delete ${post.title} permanently.\nThis action cannot be undone. Do you want to continue?`);

    if (doDelete) {
      this.delete.next(post);
    }
  }
}
