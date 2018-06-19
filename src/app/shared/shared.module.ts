import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { APP_DIRECTIVES } from './directives';
import { APP_PIPES } from './pipes';

const sharedModules = [
  CommonModule,
  FormsModule, ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    APP_DIRECTIVES,
    APP_PIPES
  ],
  imports: sharedModules,
  exports: sharedModules,
})
export class SharedModule { }
