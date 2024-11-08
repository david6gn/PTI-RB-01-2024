import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ApiService } from '../../service/api.service';
import { ToolsResponse } from '../../models/tools-response';
import { PostResponse } from '../../models/post-response';
import { SnackbarService } from '../../service/snackbar.service';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent implements OnInit {
  feedTime: string[] = ['', '', '', ''];
  feedAmount: number[] = [0, 0, 0, 0];
  aeratorTime: number[] = [0, 0];
  
  constructor(
    private apiService: ApiService, 
    private snackBar: SnackbarService,
    private authService: AuthService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.apiService.getToolsData().subscribe({
      next: (response: ToolsResponse) => {
        if(!response.error) {
          this.feedTime[0] = response.data.feeder.schedule_1.time;
          this.feedTime[1] = response.data.feeder.schedule_2.time;
          this.feedTime[2] = response.data.feeder.schedule_3.time;
          this.feedTime[3] = response.data.feeder.schedule_4.time;
          this.feedAmount[0] = response.data.feeder.schedule_1.amount;
          this.feedAmount[1] = response.data.feeder.schedule_2.amount;
          this.feedAmount[2] = response.data.feeder.schedule_3.amount;
          this.feedAmount[3] = response.data.feeder.schedule_4.amount;
          this.aeratorTime[0] = response.data.aerator.off_minutes_before;
          this.aeratorTime[1] = response.data.aerator.on_minutes_after;
        } 
      },
      error: (error) => {
        console.log(error)
      }
    })    
  }

  updateFeederSetting(): void {
    if(this.authService.getUserType() !== "admin") {
      this.snackBar.showSnackBar("Hanya admin yang dapat mengubah interval sensor!");
      return;
    }
    const data = {
      schedule_1_amount: this.feedAmount[0],
      schedule_2_amount: this.feedAmount[1],
      schedule_3_amount: this.feedAmount[2],
      schedule_4_amount: this.feedAmount[3],
      schedule_1_time: this.feedTime[0],
      schedule_2_time: this.feedTime[1],
      schedule_3_time: this.feedTime[2],
      schedule_4_time: this.feedTime[3]
    }
    this.loading.showLoading();

    this.apiService.updateFeederSetting(data).subscribe({
      next: (response: PostResponse) => {
        this.loading.hideLoading(response.error);
      },
      error: (error) => {
        this.loading.hideLoading(true, () => {
          this.snackBar.showSnackBar(error.error.message);
        });
      }
    });
  }

  updateAeratorSetting() {
    if(this.authService.getUserType() !== "admin") {
      this.snackBar.showSnackBar("Hanya admin yang dapat mengubah kontrol kincir!");
      return;
    }
    const data = {
      off_minutes_before: this.aeratorTime[0],
      on_minutes_after: this.aeratorTime[1]
    }

    this.loading.showLoading();

    this.apiService.updateAeratorSetting(data).subscribe({
      next: (response: PostResponse) => {
        this.loading.hideLoading(response.error);
      },
      error: (error) => {
        this.loading.hideLoading(true, () => {
          this.snackBar.showSnackBar(error.error.message);
        });
      }
    })
  }

  increaseFeedAmount(num: number) {
    this.feedAmount[num] = this.feedAmount[num] + 10;
  }

  decreaseFeedAmount(num: number) {
    this.feedAmount[num] = this.feedAmount[num] - 10;
  }

  increaseAeratorTime(num: number) {
    this.aeratorTime[num] = this.aeratorTime[num] + 5;
  }

  decreaseAeratorTime(num: number) {
    this.aeratorTime[num] = this.aeratorTime[num] - 5;
  }

}
