import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedStock: string = '';
  stocks: string[] = ['GME', 'AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META']; // Static list for now
  stockString = new FormControl('');
  filteredOptions: Observable<string[]> = new Observable();

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredOptions = this.stockString.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stocks.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Filtered stock list based on user input
  filteredStocks(): string[] {
    return this.stocks.filter(stock =>
      stock.toLowerCase().includes(this.selectedStock.toLowerCase())
    );
  }

  // Navigate to analysis page
  getAnalysis(): void {
    if (this.selectedStock) {
      this.router.navigate([this.selectedStock]);
    }
  }
}
