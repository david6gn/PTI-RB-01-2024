import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../service/loading.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-dialog',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, LottieComponent],
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.css'
})
export class LoadingDialogComponent implements OnInit, OnDestroy {
  private animationItem: AnimationItem | undefined;
  options: AnimationOptions = {
    path: 'success.json',
    loop: false,
    autoplay: true
  };

  isLoading: boolean = true;
  private loadingSubscription?: Subscription;
  @Output() animationEnd = new EventEmitter<void>(); 

  constructor(private loadingService: LoadingService, public dialogRef: MatDialogRef<LoadingDialogComponent>, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this. loadingSubscription = this.loadingService.loading$.subscribe(isLoading => {
      if (!isLoading && isLoading !== undefined) {
        this.isLoading = isLoading;
        this.ref.detectChanges();
      };
    });
  }


  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(1);
    this.animationItem = animationItem;
    this.animationItem?.addEventListener('enterFrame', () => {
      const progress = (this.animationItem!.currentFrame / this.animationItem!.totalFrames) * 100;
      if (progress >= 80) {
        this.animationEnd.emit();
        this.dialogRef.close();
        this.animationItem!.destroy()
        this.animationItem = undefined;
        this.loadingSubscription?.unsubscribe()
      }
    });
  }

  ngOnDestroy(): void {
    this.animationItem?.destroy()
  }

  // startAnimation() {
  //   if (this.animationItem === undefined) {
  //     console.log("animation item undefined");
  //   } else {
  //     console.log("masuk animation started");
  //   }
   
  //   this.animationItem?.goToAndStop(0, true);
  //   this.animationItem?.play();
  // }
}
