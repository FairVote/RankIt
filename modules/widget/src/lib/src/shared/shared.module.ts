import { MdButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const MATERIAL_COMPONENTS = [ MdButtonModule ];

@NgModule({
  imports: [ CommonModule, ...MATERIAL_COMPONENTS ],
  exports: [ CommonModule, ...MATERIAL_COMPONENTS ]
})
export class SharedModule {}
