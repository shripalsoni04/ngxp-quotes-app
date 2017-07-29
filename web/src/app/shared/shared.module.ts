import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdlModule } from '@angular-mdl/core';

@NgModule({
  exports: [ CommonModule, MdlModule ]
})
export class SharedModule { }
