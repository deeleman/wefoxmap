import { SETTINGS } from '@wefox/settings';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wefox/shared';
import { NotFoundComponent } from '@wefox/errors';
import {
  PostAddComponent,
  PostHeaderComponent,
  PostsListComponent,
  PostViewComponent,
  PostViewDetailComponent,
  PostViewEditComponent,
} from '@wefox/posts';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  {
    path: 'view/:id',
    component: PostViewComponent,
    children: [{
      path: '',
      component: PostViewDetailComponent
    }, {
      path: 'edit',
      component: PostViewEditComponent
    }]
  },
  { path: 'new', component: PostAddComponent },
  { path: '**', component: NotFoundComponent },
];

const routedComponents = [
  PostAddComponent,
  PostHeaderComponent,
  PostsListComponent,
  PostViewComponent,
  PostViewDetailComponent,
  PostViewEditComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [...routedComponents],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { enableTracing: false /*!SETTINGS.production*/ })
  ],
  exports: [RouterModule, ...routedComponents]
})
export class AppRoutingModule {}
