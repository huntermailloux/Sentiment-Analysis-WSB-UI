import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = "https://sentiment-analysis-wsb-api.vercel.app/";

  constructor(private http: HttpClient) { }

  getStock(stock: any) {
    let url = this.baseUrl + stock;
    return this.http.get<any>(url);
  }

  getAllStocks() {
    let url = this.baseUrl;
    return this.http.get<any>(url);
  }
}
