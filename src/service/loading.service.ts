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

  constructor(private dialog: MatDialog) {}

  showLoading() {
    console.log("masuk show loading")
    if (!this.dialogRef) {
      console.log("masuk if showloading")
      this.dialogRef = this.dialog.open(LoadingDialogComponent, {
        disableClose: true,
      });
      this.loadingSubject.next(true);
    }
  }

  hideLoading(callback?: () => void) {
    console.log("masuk hide loading")
    if (this.dialogRef) {
      console.log("masuk if hide loading")
      const dialogComponent = this.dialogRef.componentInstance;
      dialogComponent.isLoading = false;
      this.loadingSubject.next(false);

      dialogComponent.animationEnd.subscribe(() => {
        if (callback) {
          callback();
        }
        this.dialogRef = null;
        if (this.loadingSubject.closed) {
          console.log("Subject sudah tertutup, tidak bisa mengirim nilai.");
        } else {
          this.loadingSubject.next(true);
        }
        dialogComponent.animationEnd.unsubscribe()
      });
    }
  }
}
