import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    MatIconModule,
    MatIconButton,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1},
    {text: 'Two', cols: 1, rows: 2},
    {text: 'Three', cols: 1, rows: 1},
    {text: 'Four', cols: 2, rows: 1}
  ];

  elements: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ]);
  elementColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteFood: ['',],
    dateOfBirth: ['']
  });

  private liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);
  private dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  announceSortChange(sortState: Sort): void {
    if(sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this.liveAnnouncer.announce('Sorting cleared')
    }
  }

  ngAfterViewInit(): void {
    if(this.sort) {
      this.elements.sort = this.sort;
    }
    if(this.paginator) {
      this.elements.paginator = this.paginator;
    }
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: `, result);
      this.openSnackBar('Dialog closed', 'Close');
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}
