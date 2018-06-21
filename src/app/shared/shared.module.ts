import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from './directives';
import { SHARED_PIPES } from './pipes';

const sharedModules = [
  CommonModule,
  FormsModule, ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    SHARED_DIRECTIVES,
    SHARED_PIPES,
    SHARED_COMPONENTS
  ],
  imports: sharedModules,
  exports: sharedModules,
})
export class SharedModule { }
