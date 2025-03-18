import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = "https://www.api.wsb-analysis.ca/api/";

  constructor(private http: HttpClient) { }

  getStock(stock: any) {
    let url = this.baseUrl + 'ticker/' +  stock;
    return this.http.get<any>(url);
  }

  getAllStocks() {
    let url = this.baseUrl + 'allPosts';
    return this.http.get<any>(url);
  }
}
