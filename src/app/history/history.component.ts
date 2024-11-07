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
  currentPage: number = 1;
  limit: number = 6;
  historyData: HistoryItem[] = [];
  totalItem: number = 0;
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getHistoryList()
  }

  navigateToDetailHistory(history: HistoryItem) {
    const date = history.date
    this.router.navigate(['detail'], { state: { history: history },queryParams: { date }, relativeTo: this.route });
  }

  getHistoryList() {
    const queryParams = {
      page: this.currentPage-1
    }
    this.apiService.getHistoryList(queryParams).subscribe({
      next: (response: HistoryResponse) => {
        if (this.totalItem === 0) {
          this.totalItem = (response.total_pages * response.data.histories.length) + 1;
        }
        this.historyData = response.data.histories;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getHistoryList();
  }
}
