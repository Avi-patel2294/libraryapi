import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckedOutBooksComponent } from './checked-out-books/checked-out-books.component';
import { LibraryMatModule } from '../library-mat.module';
import { CheckedOutRoutingModule } from './checked-out-routing.module';
import { MemberCheckedOutBooksComponent } from './member-checked-out-books/member-checked-out-books.component';

@NgModule({
  declarations: [
    CheckedOutBooksComponent,
    MemberCheckedOutBooksComponent
  ],
  exports:[CheckedOutBooksComponent, MemberCheckedOutBooksComponent],
  imports: [
    CommonModule,
    CheckedOutRoutingModule,
    LibraryMatModule
  ]
})
export class CheckedOutModule { }
