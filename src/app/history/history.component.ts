import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoryData, HistoryItem, HistoryResponse, LogItem } from '../../models/history-response';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  page: number = 0;
  limit: number = 6;
  historyData: HistoryItem[] = [];
  
  constructor(private snackBar: MatSnackBar, private apiService: ApiService){}

  ngOnInit(): void {
    this.getHistoryList()
  }

  navigateToDetailHistory(history: HistoryItem) {
    this.snackBar.open(history['date:'], undefined, {duration: 1000});
  }

  getHistoryList() {
    const queryParams = {
      page: this.page
    }
    this.apiService.getHistoryList(queryParams).subscribe({
      next: (response: HistoryResponse) => {
        this.historyData = response.data.histories;
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
