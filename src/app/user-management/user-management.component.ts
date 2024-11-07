import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { UserItem, UserResponse } from '../../models/user-response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  userList: UserItem[] = [];
  page = 1;
  limit = 5;
  dialogMessage: string = 'Apakah anda yakin ingin menghapus akun pengguna?';
  dialogTitle: string = 'Hapus';


  constructor(
    private apiService: ApiService, 
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService.getUserList().subscribe({
      next: (response: UserResponse) => {
        if(!response.error) {
          this.userList = response.data.users;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: this.dialogMessage,
        title: this.dialogTitle
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Item deleted');
      }
    });
  }

  navigateToAddUser() {
    this.router.navigate(['tambah'], {relativeTo: this.route});
  }
}
