import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { UserItem, UserResponse } from '../../models/user-response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse } from '../../models/post-response';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';
import { AuthService } from '../../service/auth.service';

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
    private route: ActivatedRoute,
    private snackBar: SnackbarService,
    private loading: LoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getUserList().subscribe({
      next: (response: UserResponse) => {
        if(!response.error) {
          this.userList = response.data.users;
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  openDialog(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: this.dialogMessage,
        title: this.dialogTitle
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: string) {
    const sessionId = this.authService.getUserId();
    this.loading.showLoading()
    this.apiService.deleteUser(userId).subscribe({
      next: (response: PostResponse) => {
        if(!response.error) {
          this.loading.hideLoading(response.error, () => {
            this.snackBar.showSnackBar(response.message);
            if(sessionId === userId) {
              this.authService.logout();
            } else {
              this.getUserList();
            }
          })
        } else {
          this.loading.hideLoading(response.error, () => {
            this.snackBar.showSnackBar(response.message);
          })
        }
      },
      error: (error) => {
        this.loading.hideLoading(true, () => {
          this.snackBar.showSnackBar(error.error.message);
        })
      }
    })
  }

  navigateToAddUser() {
    this.router.navigate(['tambah'], {relativeTo: this.route});
  }

  navigateToEditUser(userId: string) {
    this.router.navigate(['ubah'], {relativeTo: this.route, queryParams: {userId}});
  }
}
