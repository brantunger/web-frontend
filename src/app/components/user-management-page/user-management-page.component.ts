import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {WebApiService} from "../../services/web-api.service";
import {User} from "../../models/User";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {EditUserDialogData} from "../../models/EditUserDialogData";

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<User>;
  formGroup!: FormGroup;
  filterValue = '';
  displayedColumns: string[] = ['userId', 'username', 'email', 'role', 'star'];

  constructor(private formBuilder: FormBuilder,
              private webApiService: WebApiService,
              private dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.webApiService.getAllUsers()
      .pipe(take(1))
      .subscribe({
        next: (response: User[]) => {
          this.dataSource = new MatTableDataSource(response)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: HttpErrorResponse) => console.error(error.error.error)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.filterValue = '';
    this.dataSource.filter = '';
  }

  openEditDialog(userRow: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '80vw',
      maxWidth: '545px',
      data: {
        user: userRow
      },
      disableClose: true,
      enterAnimationDuration: 400,
      exitAnimationDuration: 400
    });

    dialogRef.afterClosed()
      .subscribe((result: EditUserDialogData) => {
        if (result.action === 'save') {
          console.log(result.user);
        }
      });
  }
}
