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
  stocks: any[] = ['AA', 'AAL', 'AAPL', 'ABBV', 'ABNB', 'ACHR', 'ACN', 'ADBE', 'ADI', 'ADM', 'ADP', 'ADSK', 'AEE', 'AEP', 'AES', 'AFL', 'AIG', 'AKAM', 'ALB', 'ALGN', 'ALLE', 'AM', 'AMAT', 'AMC', 'AMCR', 'AMD', 'AME', 'AMGN', 'AMP', 'AMT', 'AMTM', 'AMZN', 'ANET', 'ANSS', 'AON', 'AOS', 'APA', 'APD', 'APH', 'APTV', 'ASTS', 'ATO', 'AVB', 'AVGO', 'AVY', 'AWK', 'AXON', 'AXP', 'AZO', 'BA', 'BABA', 'BAC', 'BALL', 'BAX', 'BBY', 'BDX', 'BEN', 'BG', 'BIIB', 'BK', 'BKNG', 'BKR', 'BLDR', 'BLK', 'BMY', 'BR', 'BSX', 'BX', 'BXP', 'CAG', 'CAH', 'CARR', 'CB', 'CBOE', 'CBRE', 'CC', 'CCI', 'CCL', 'CDNS', 'CDW', 'CE', 'CEG', 'CF', 'CFG', 'CHD', 'CHRW', 'CHTR', 'CI', 'CL', 'CLOV', 'CLX', 'CMCSA', 'CME', 'CMG', 'CMI', 'CMS', 'CNC', 'CNP', 'COF', 'COO', 'COP', 'COR', 'COST', 'CPB', 'CPRT', 'CPT', 'CRL', 'CRM', 'CRWD', 'CSCO', 'CSGP', 'CSX', 'CTAS', 'CTRA', 'CTSH', 'CTVA', 'CVS', 'CVX', 'CZR', 'DAL', 'DE', 'DECK', 'DELL', 'DFS', 'DG', 'DGX', 'DHI', 'DHR', 'DIS', 'DJT', 'DLR', 'DLTR', 'DM', 'DOC', 'DOCU', 'DOV', 'DOW', 'DPZ', 'DRI', 'DTE', 'DUK', 'DVA', 'DVN', 'DXCM', 'EA', 'EBAY', 'ECL', 'ED', 'EFX', 'EG', 'EIX', 'EL', 'ELV', 'EMN', 'EMR', 'ENPH', 'EOG', 'EPAM', 'EQIX', 'EQR', 'EQT', 'ERIE', 'ES', 'ESS', 'ETN', 'ETR', 'EU', 'EVRG', 'EW', 'EXC', 'EXPD', 'EXPE', 'EXR', 'FANG', 'FAST', 'FCX', 'FDS', 'FDX', 'FE', 'FFIV', 'FI', 'FICO', 'FIS', 'FITB', 'FMC', 'FOX', 'FOXA', 'FRT', 'FSLR', 'FTNT', 'GAP', 'GD', 'GDDY', 'GE', 'GEHC', 'GEN', 'GEV', 'GILD', 'GIS', 'GL', 'GLD', 'GLW', 'GM', 'GME', 'GNRC', 'GOOG', 'GOOGL', 'GPC', 'GPN', 'GRMN', 'GS', 'GWW', 'HAL', 'HBAN', 'HCA', 'HD', 'HES', 'HIG', 'HII', 'HLT', 'HOLX', 'HON', 'HOOD', 'HPE', 'HPQ', 'HRL', 'HSIC', 'HST', 'HSY', 'HUBB', 'HUM', 'HWM', 'IBM', 'ICE', 'IEX', 'IFF', 'INCY', 'INTC', 'INTU', 'INVH', 'IP', 'IPA', 'IPG', 'IR', 'IRM', 'ISRG', 'ITW', 'IVZ', 'IWM', 'JBHT', 'JBL', 'JCI', 'JD', 'JKHY', 'JNJ', 'JNPR', 'JPM', 'KDP', 'KEYS', 'KHC', 'KIM', 'KKR', 'KLAC', 'KMB', 'KMI', 'KMX', 'KO', 'KR', 'KVUE', 'LDOS', 'LEN', 'LH', 'LHX', 'LIN', 'LKQ', 'LLY', 'LMT', 'LNT', 'LOGC', 'LRCX', 'LULU', 'LUNR', 'LVS', 'LW', 'LYB', 'LYV', 'MAA', 'MAR', 'MAS', 'MCD', 'MCHP', 'MCK', 'MCO', 'MDLZ', 'MDT', 'MET', 'META', 'MGM', 'MHK', 'MKC', 'MKTX', 'MLM', 'MMM', 'MNST', 'MO', 'MOH', 'MOS', 'MPC', 'MPWR', 'MRK', 'MRNA', 'MS', 'MSCI', 'MSFT', 'MSI', 'MSTR', 'MTB', 'MTCH', 'MTD', 'MU', 'NCLH', 'NDAQ', 'NDSN', 'NEE', 'NEM', 'NFLX', 'NIO', 'NKE', 'NOC', 'NRG', 'NSC', 'NTAP', 'NTRS', 'NUE', 'NVDA', 'NVR', 'NWS', 'NXPI', 'NYT', 'ODFL', 'OKE', 'OKLO', 'OMC', 'ORCL', 'ORLY', 'OTIS', 'OXY', 'PANW', 'PARA', 'PAYC', 'PAYX', 'PCAR', 'PCG', 'PEG', 'PEP', 'PFE', 'PFG', 'PG', 'PGR', 'PH', 'PHM', 'PLD', 'PLTR', 'PM', 'PNC', 'PNW', 'PODD', 'POOL', 'PPG', 'PR', 'PRU', 'PSA', 'PSX', 'PTC', 'PTON', 'PWR', 'PYPL', 'QBTS', 'QCOM', 'QQQ', 'QRVO', 'RCL', 'RDDT', 'REG', 'REGN', 'RF', 'RGTI', 'RIVN', 'RJF', 'RKLB', 'RL', 'RMD', 'ROK', 'ROL', 'ROP', 'ROST', 'RR', 'RTX', 'SBAC', 'SBUX', 'SCHW', 'SHW', 'SJM', 'SLB', 'SMCI', 'SMTC', 'SNPS', 'SOFI', 'SOLV', 'SPG', 'SPGI', 'SPY', 'SQQQ', 'SRE', 'STE', 'STLD', 'STX', 'STZ', 'SW', 'SWK', 'SWKS', 'SYF', 'SYK', 'SYY', 'TAP', 'TDG', 'TDY', 'TECH', 'TEL', 'TER', 'TFC', 'TFX', 'TGT', 'TJX', 'TLT', 'TMO', 'TMUS', 'TPL', 'TPR', 'TQQQ', 'TRGP', 'TROW', 'TRV', 'TSCO', 'TSLA', 'TSM', 'TSN', 'TT', 'TTD', 'TTWO', 'TWLO', 'TXN', 'TXT', 'TYL', 'UAL', 'UBER', 'UHS', 'ULTA', 'UNH', 'UNP', 'UPS', 'URI', 'USB', 'VICI', 'VLO', 'VOO', 'VRSN', 'VRTX', 'VST', 'VTR', 'VTRS', 'VZ', 'WAB', 'WAT', 'WBA', 'WBD', 'WDC', 'WEC', 'WEN', 'WFC', 'WH', 'WM', 'WMB', 'WMT', 'WST', 'WW', 'WY', 'WYNN', 'XEL', 'XOM', 'XYL', 'YUM', 'ZBH', 'ZBRA', 'ZTS'];
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
