import { SETTINGS } from '@wefox/settings';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wefox/shared';
import { NotFoundComponent } from '@wefox/errors';
import {
  PostsListComponent,
  PostViewComponent,
  PostViewDetailComponent
} from '@wefox/posts';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  {
    path: 'view/:id',
    component: PostViewComponent,
    children: [{
      path: '',
      component: PostViewDetailComponent
    }]
  },
  { path: '**', component: NotFoundComponent },
];

const routedComponents = [
  PostsListComponent,
  PostViewComponent,
  PostViewDetailComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [...routedComponents],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { enableTracing: !SETTINGS.production })
  ],
  exports: [RouterModule, ...routedComponents]
})
export class AppRoutingModule {}
