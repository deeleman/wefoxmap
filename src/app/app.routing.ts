import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wefox/shared';
import { NotFoundComponent } from '@wefox/errors';
import { PostsListComponent } from '@wefox/posts';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: '**', component: NotFoundComponent },
];

const routedComponents = [
  PostsListComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [...routedComponents],
  imports: [SharedModule, RouterModule.forRoot(routes)],
  exports: [RouterModule, ...routedComponents]
})
export class AppRoutingModule {}
