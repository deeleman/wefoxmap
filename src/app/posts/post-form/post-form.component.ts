import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '@wefox/platform';

@Component({
  selector: 'wfx-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean;
  @Input() set post(value: Post) {
    if (value) {
      setTimeout(() => this.updatePostForm(value));
      this._post = value;
    }
  }
  @Output() save = new EventEmitter<Partial<Post>>();

  postForm: FormGroup;
  queryParamsSubscription: Subscription;

  private isUpdate: boolean;
  private _post: Post;

  get submitLabel(): string {
    return this.isUpdate ? 'Update Post' : 'Save New Post';
  }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { 
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image_url: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParamMap
      .subscribe(params => this.setCoordsByQueryParams(params));
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.save.next({ ...this._post, ...this.postForm.value });
    }
  }

  private updatePostForm(post: Post): void {
    this.isUpdate = true;
    const { title, content, image_url, lat, long } = post;
    this.postForm.setValue({ title, content, image_url, lat, long });
  }

  private setCoordsByQueryParams(params: ParamMap): void {
    this.postForm.controls['lat'].setValue(params.get('lat'));
    this.postForm.controls['long'].setValue(params.get('lng'));
  }
}
