import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedStock: string = '';
  stocks: string[] = ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META']; // Static list for now

  constructor(private router: Router) {}

  // Filtered stock list based on user input
  filteredStocks(): string[] {
    return this.stocks.filter(stock =>
      stock.toLowerCase().includes(this.selectedStock.toLowerCase())
    );
  }

  // Navigate to analysis page
  getAnalysis(): void {
    if (this.selectedStock) {
      this.router.navigate(['/analysis', this.selectedStock]);
    }
  }
}
