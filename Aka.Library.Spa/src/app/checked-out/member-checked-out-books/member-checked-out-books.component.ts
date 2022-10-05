import { SelectionModel } from '@angular/cdk/collections';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SignedOutBook } from '../../shared/signed-out-book';
import { forkJoin, zip } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { BooksService } from '../../services/books.service';
import { LibrariesService } from '../../services/libraries.service';
import { MemberService } from '../../services/member.service';
import { SignedOutBookDetails } from '../../shared/signed-out-book-details';

@Component({
  selector: 'lb-member-checked-out-books',
  templateUrl: './member-checked-out-books.component.html',
  styleUrls: ['./member-checked-out-books.component.scss']
})
export class MemberCheckedOutBooksComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'initial';

  displayedColumns = ['id', 'library', 'title', 'dateCheckedOut', 'action'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibrariesService,
    private booksService: BooksService
  ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.memberService.getMemberBookHistory(this.authService.currentMember)
    .pipe(
      map((signedOutBooks: SignedOutBook []) => {
        const obss = signedOutBooks.map(signedOutBook => forkJoin([
          this.libraryService.getLibrary(signedOutBook.libraryId),
          this.booksService.getBook(signedOutBook.libraryId, signedOutBook.bookId)
        ])
              .pipe(
                map(([library, book]) => ({ ...signedOutBook, libraryName: library.name, bookName: book.title }))
              ));
        return zip(...obss);
      }),
      mergeAll()
    ).subscribe((signedOutBooksDetails: SignedOutBookDetails []) => {
        this.dataSource.data = signedOutBooksDetails;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
