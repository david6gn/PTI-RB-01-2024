import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoryItem, HistoryResponse } from '../../models/history-response';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getHistoryList()
  }

  navigateToDetailHistory(history: HistoryItem) {
    const date = history['date:']
    this.router.navigate(['detail'], { state: { history: history },queryParams: { date }, relativeTo: this.route });
  }

  getHistoryList() {
    const queryParams = {
      page: this.page
    }
    this.apiService.getHistoryList(queryParams).subscribe({
      next: (response: HistoryResponse) => {
        this.historyData = response.data.histories;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
