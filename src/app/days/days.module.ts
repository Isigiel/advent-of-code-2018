import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day06Component } from './day06/day06.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '06' },
  { path: '06', component: Day06Component }
];

const materialComponents = [MatInputModule, MatButtonModule];

@NgModule({
  declarations: [Day06Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule,
    materialComponents
  ]
})
export class DaysModule {}
