import { EventEmitter, Injectable } from '@angular/core';
import { LoadingDialogComponent } from '../app/loading-dialog/loading-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private dialogRef: MatDialogRef<LoadingDialogComponent> | null = null;
  loadingComplete: EventEmitter<void> = new EventEmitter();
  private loadingSubject = new BehaviorSubject<boolean | undefined>(true);
  loading$ = this.loadingSubject.asObservable();
  private errorSubject = new BehaviorSubject<boolean | undefined>(false);
  error$ = this.errorSubject.asObservable();
  constructor(private dialog: MatDialog) {}

  showLoading() {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoadingDialogComponent, {
        disableClose: true,
        width: '350px',
        height: '350px'
      });
      this.loadingSubject.next(true);
    }
  }

  hideLoading(isError: boolean, callback?: () => void) {
    if (this.dialogRef) {
      this.errorSubject.next(isError);
      const dialogComponent = this.dialogRef.componentInstance;
      dialogComponent.isLoading = false;
      this.loadingSubject.next(false);

      dialogComponent.animationEnd.subscribe(() => {
        if (callback) {
          callback();
        }
        this.dialogRef = null;
        this.loadingSubject.next(true);
  
        dialogComponent.animationEnd.unsubscribe()
      });
    }
  }
}
