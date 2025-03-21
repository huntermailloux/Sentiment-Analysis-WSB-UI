import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

interface Word {
  text: string;
  size: number;
}

@Component({
  selector: 'app-anaylsis',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    NgxEchartsModule,
    MatSlideToggleModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts },
    },
  ],
  templateUrl: './anaylsis.component.html',
  styleUrl: './anaylsis.component.scss',
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('visible => hidden', animate('0.5s ease-out'))
    ])
  ]
})
export class AnaylsisComponent implements OnInit {
  stocks: any[] = ['AA', 'AAL', 'AAPL', 'ABBV', 'ABNB', 'ACHR', 'ACN', 'ADBE', 'ADI', 'ADM', 'ADP', 'ADSK', 'AEE', 'AEP', 'AES', 'AFL', 'AIG', 'AKAM', 'ALB', 'ALGN', 'ALLE', 'AMAT', 'AMC', 'AMCR', 'AMD', 'AME', 'AMGN', 'AMP', 'AMT', 'AMTM', 'AMZN', 'ANET', 'ANSS', 'AON', 'AOS', 'APA', 'APD', 'APH', 'APTV', 'ASTS', 'ATO', 'AVB', 'AVGO', 'AVY', 'AWK', 'AXON', 'AXP', 'AZO', 'BA', 'BABA', 'BAC', 'BALL', 'BAX', 'BBY', 'BDX', 'BEN', 'BG', 'BIIB', 'BK', 'BKNG', 'BKR', 'BLDR', 'BLK', 'BMY', 'BR', 'BSX', 'BX', 'BXP', 'CAG', 'CAH', 'CARR', 'CB', 'CBOE', 'CBRE', 'CC', 'CCI', 'CCL', 'CDNS', 'CDW', 'CE', 'CEG', 'CF', 'CFG', 'CHD', 'CHRW', 'CHTR', 'CI', 'CL', 'CLOV', 'CLX', 'CMCSA', 'CME', 'CMG', 'CMI', 'CMS', 'CNC', 'CNP', 'COF', 'COO', 'COP', 'COR', 'COST', 'CPB', 'CPRT', 'CPT', 'CRL', 'CRM', 'CRWD', 'CSCO', 'CSGP', 'CSX', 'CTAS', 'CTRA', 'CTSH', 'CTVA', 'CVS', 'CVX', 'CZR', 'DAL', 'DE', 'DECK', 'DELL', 'DFS', 'DG', 'DGX', 'DHI', 'DHR', 'DIS', 'DJT', 'DLR', 'DLTR', 'DM', 'DOC', 'DOCU', 'DOV', 'DOW', 'DPZ', 'DRI', 'DTE', 'DUK', 'DVA', 'DVN', 'DXCM', 'EA', 'EBAY', 'ECL', 'ED', 'EFX', 'EG', 'EIX', 'EL', 'ELV', 'EMN', 'EMR', 'ENPH', 'EOG', 'EPAM', 'EQIX', 'EQR', 'EQT', 'ERIE', 'ES', 'ESS', 'ETN', 'ETR', 'EU', 'EVRG', 'EW', 'EXC', 'EXPD', 'EXPE', 'EXR', 'FANG', 'FAST', 'FCX', 'FDS', 'FDX', 'FE', 'FFIV', 'FI', 'FICO', 'FIS', 'FITB', 'FMC', 'FOX', 'FOXA', 'FRT', 'FSLR', 'FTNT', 'GAP', 'GD', 'GDDY', 'GE', 'GEHC', 'GEN', 'GEV', 'GILD', 'GIS', 'GL', 'GLD', 'GLW', 'GM', 'GME', 'GNRC', 'GOOG', 'GOOGL', 'GPC', 'GPN', 'GRMN', 'GS', 'GWW', 'HAL', 'HBAN', 'HCA', 'HD', 'HES', 'HIG', 'HII', 'HLT', 'HOLX', 'HON', 'HOOD', 'HPE', 'HPQ', 'HRL', 'HSIC', 'HST', 'HSY', 'HUBB', 'HUM', 'HWM', 'IBM', 'ICE', 'IEX', 'IFF', 'INCY', 'INTC', 'INTU', 'INVH', 'IP', 'IPA', 'IPG', 'IR', 'IRM', 'ISRG', 'ITW', 'IVZ', 'IWM', 'JBHT', 'JBL', 'JCI', 'JD', 'JKHY', 'JNJ', 'JNPR', 'JPM', 'KDP', 'KEYS', 'KHC', 'KIM', 'KKR', 'KLAC', 'KMB', 'KMI', 'KMX', 'KO', 'KR', 'KVUE', 'LDOS', 'LEN', 'LH', 'LHX', 'LIN', 'LKQ', 'LLY', 'LMT', 'LNT', 'LOGC', 'LRCX', 'LULU', 'LUNR', 'LVS', 'LW', 'LYB', 'LYV', 'MAA', 'MAR', 'MAS', 'MCD', 'MCHP', 'MCK', 'MCO', 'MDLZ', 'MDT', 'MET', 'META', 'MGM', 'MHK', 'MKC', 'MKTX', 'MLM', 'MMM', 'MNST', 'MO', 'MOH', 'MOS', 'MPC', 'MPWR', 'MRK', 'MRNA', 'MS', 'MSCI', 'MSFT', 'MSI', 'MSTR', 'MTB', 'MTCH', 'MTD', 'MU', 'NCLH', 'NDAQ', 'NDSN', 'NEE', 'NEM', 'NFLX', 'NIO', 'NKE', 'NOC', 'NRG', 'NSC', 'NTAP', 'NTRS', 'NUE', 'NVDA', 'NVR', 'NWS', 'NXPI', 'NYT', 'ODFL', 'OKE', 'OKLO', 'OMC', 'ORCL', 'ORLY', 'OTIS', 'OXY', 'PANW', 'PARA', 'PAYC', 'PAYX', 'PCAR', 'PCG', 'PEG', 'PEP', 'PFE', 'PFG', 'PG', 'PGR', 'PH', 'PHM', 'PLD', 'PLTR', 'PM', 'PNC', 'PNW', 'PODD', 'POOL', 'PPG', 'PR', 'PRU', 'PSA', 'PSX', 'PTC', 'PTON', 'PWR', 'PYPL', 'QBTS', 'QCOM', 'QQQ', 'QRVO', 'RCL', 'RDDT', 'REG', 'REGN', 'RF', 'RGTI', 'RIVN', 'RJF', 'RKLB', 'RL', 'RMD', 'ROK', 'ROL', 'ROP', 'ROST', 'RR', 'RTX', 'SBAC', 'SBUX', 'SCHW', 'SHW', 'SJM', 'SLB', 'SMCI', 'SMTC', 'SNPS', 'SOFI', 'SOLV', 'SPG', 'SPGI', 'SPY', 'SQQQ', 'SRE', 'STE', 'STLD', 'STX', 'STZ', 'SW', 'SWK', 'SWKS', 'SYF', 'SYK', 'SYY', 'TAP', 'TDG', 'TDY', 'TECH', 'TEL', 'TER', 'TFC', 'TFX', 'TGT', 'TJX', 'TLT', 'TMO', 'TMUS', 'TPL', 'TPR', 'TQQQ', 'TRGP', 'TROW', 'TRV', 'TSCO', 'TSLA', 'TSM', 'TSN', 'TT', 'TTD', 'TTWO', 'TWLO', 'TXN', 'TXT', 'TYL', 'UAL', 'UBER', 'UHS', 'ULTA', 'UNH', 'UNP', 'UPS', 'URI', 'USB', 'VICI', 'VLO', 'VOO', 'VRSN', 'VRTX', 'VST', 'VTR', 'VTRS', 'VZ', 'WAB', 'WAT', 'WBA', 'WBD', 'WDC', 'WEC', 'WEN', 'WFC', 'WH', 'WM', 'WMB', 'WMT', 'WST', 'WW', 'WY', 'WYNN', 'XEL', 'XOM', 'XYL', 'YUM', 'ZBH', 'ZBRA', 'ZTS'];
  stopwords: string[] = [
    "a", "about", "above", "after", "again", "against", "all", "also", "am", "an",
    "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before",
    "being", "below", "between", "both", "but", "by", "can", "can't", "cannot",
    "com", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
    "don't", "down", "during", "each", "else", "ever", "few", "for", "from",
    "further", "get", "had", "hadn't", "has", "hasn't", "have", "haven't", "having",
    "he", "he'd", "he'll", "he's", "hence", "her", "here", "here's", "hers",
    "herself", "him", "himself", "his", "how", "how's", "however", "http", "i",
    "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's",
    "its", "itself", "just", "k", "let's", "like", "me", "more", "most", "mustn't",
    "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
    "other", "otherwise", "ought", "our", "ours", "ourselves", "out", "over",
    "own", "r", "same", "shall", "shan't", "she", "she'd", "she'll", "she's",
    "should", "shouldn't", "since", "so", "some", "such", "than", "that", "that's",
    "the", "their", "theirs", "them", "themselves", "then", "there", "there's",
    "therefore", "these", "they", "they'd", "they'll", "they're", "they've",
    "this", "those", "through", "to", "too", "under", "until", "up", "very",
    "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't",
    "what", "what's", "when", "when's", "where", "where's", "which", "while",
    "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't",
    "www", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
    "yourself", "yourselves", "s", "t", "will", "don", "should", "now",
    "stock", "trading", "account", "looking", "strategy", "market", "investing",
    "forecast", "open", "next", "much", "know", "last", "sunday", "monday",
    "tuesday", "wednesday", "thursday", "friday", "many"
  ];

  stockTicker: string | null = '';
  loading: boolean = true;
  private _count: number = 0;

  avgSentString: string = '';
  avgSentNumber: any;
  avgConfidence: any;

  mostPosDate: string = '';
  mostNeutDate: string = '';
  mostNegDate: string = '';
  posDatePosts: number = 0;
  neutDatePosts: number = 0;
  negDatePosts: number = 0;

  sentChartOptions: any;
  sentDistributionOptions: any;
  postVolumeOptions: any;
  isMonthlyView: boolean = true;

  filteredPosts = new MatTableDataSource<any>([]);  // Filtered table data
  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  filterSentiment: string = '';
  displayedColumns: string[] = ['date', 'sentiment', 'confidence', 'originalPost'];

  wordData: { [key: string]: any[] } = { positive: [], neutral: [], negative: [] };
  
  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
    if (this.count == 8) {
      this.loading = false;
    }
  }

  posts: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private service: StockService) {}

  ngOnInit() {

    this.dateRangeForm.valueChanges.subscribe(() => {
      this.filterTable();
    });

    this.stockTicker = this.route.snapshot.paramMap.get('ticker');
    this.service.getStock(this.stockTicker).subscribe({
      next: (result) => {
        if (result && result.posts.length > 0) {
          this.posts = this.sortPostsByNewest(result.posts);
          this.calculateAvgs(this.posts);
          this.getSentimentDays(this.posts);
          this.generateSentOverTime(this.posts);
          this.generateSentimentDistribution(this.posts);
          this.generatePostVolumeChart(this.posts);
          this.generateWordClouds(this.posts);
          this.loadTable(this.posts);
        }
        else {
          this.backToHome();
        }
        this.count++;
      }
    })
  }

  sortPostsByNewest(posts: any[]): any[] {
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  sortPostsByOldest(posts: any[]): any[] {
    return posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  calculateAvgs(posts: any) {
    var totalSent = 0;
    var totalConfidence = 0;
    var mixed: boolean = false;

    for (let post of posts) {
      totalSent += post.sentiment;
      if (!mixed && post.sentiment != 0) mixed = true;
      if (post.confidence) totalConfidence += post.confidence;
    }
    var length = posts.length
    var avgSent = (totalSent / length);
    var avgConf = (totalConfidence / length) * 100;

    if (avgSent >= -1 && avgSent <= -0.9) {
      this.avgSentString = "Overwhelmingly Negative"
    }
    else if (avgSent > -0.9 && avgSent <= -0.7) {
      this.avgSentString = "Very Negative"
    }
    else if (avgSent > -0.7 && avgSent <= -0.3) {
      this.avgSentString = "Negative"
    }
    else if (avgSent > -0.3 && avgSent < -0.1) {
      this.avgSentString = "Mostly Negative"
    }
    else if (avgSent >= -0.1 && avgSent <= -0.05) {
      this.avgSentString = "Slightly Negative"
    }
    else if (avgSent > -0.05 && avgSent < 0.05) {
      if (mixed) {this.avgSentString = "Mixed";}
      else this.avgSentString = "Neutral";

    }
    else if (avgSent >= 0.05 && avgSent <= 0.1) {
      this.avgSentString = "Slightly Positive"
    }
    else if (avgSent > 0.1 && avgSent <= 0.3) {
      this.avgSentString = "Mostly Positive"
    }
    else if (avgSent > 0.3 && avgSent <= 0.7) {
      this.avgSentString = "Positive"
    }
    else if (avgSent > 0.7 && avgSent <= 0.9) {
      this.avgSentString = "Very Positive"
    }
    else if (avgSent > 0.9 && avgSent <= 1) {
      this.avgSentString = "Overwhelmingly Positive"
    }
    this.avgSentNumber = Math.round(avgSent * 1000) / 1000;
    this.avgConfidence = (Math.round(avgConf * 100) / 100);
    this.count++;
  }

  getSentimentDays(data: any) {
    const sentimentCounts: Record<string, { positive: number; neutral: number; negative: number }> = {};
  
    for (const post of data) {
      if (!sentimentCounts[post.date]) {
        sentimentCounts[post.date] = { positive: 0, neutral: 0, negative: 0 };
      }
      if (post.sentiment === 1) {
        sentimentCounts[post.date].positive++;
      } else if (post.sentiment === 0) {
        sentimentCounts[post.date].neutral++;
      } else if (post.sentiment === -1) {
        sentimentCounts[post.date].negative++;
      }
    }
  
    let mostPositiveDate = "No data available";
    let mostNeutralDate = "No data available";
    let mostNegativeDate = "No data available";
    let maxPositive = 0, maxNeutral = 0, maxNegative = 0;
  
    for (const [date, counts] of Object.entries(sentimentCounts)) {
      if (counts.positive > maxPositive) {
        maxPositive = counts.positive;
        mostPositiveDate = date;
      }
      if (counts.neutral > maxNeutral) {
        maxNeutral = counts.neutral;
        mostNeutralDate = date;
      }
      if (counts.negative > maxNegative) {
        maxNegative = counts.negative;
        mostNegativeDate = date;
      }
    }
    this.mostNegDate = mostNegativeDate;
    this.mostNeutDate = mostNeutralDate;
    this.mostPosDate = mostPositiveDate;

    if (mostPositiveDate != "No data available") this.posDatePosts = sentimentCounts[mostPositiveDate].positive;
    if (mostNeutralDate != "No data available") this.neutDatePosts = sentimentCounts[mostNeutralDate].neutral;
    if (mostNegativeDate != "No data available") this.negDatePosts = sentimentCounts[mostNegativeDate].negative;

    this.count++;
  }

  toggleTimeView() {
    this.generateSentOverTime(this.posts);
  }

  generateSentOverTime(posts: any) {
    posts = this.sortPostsByOldest(posts);
    const counts: Record<string, { count: number; sentiment: number }> = {};
    const postCounts: number[] = [];
    let dates: string[] = [];
    let sentimentAvgs: number[] = [];
  
    for (const post of posts) {
      let dateKey = this.isMonthlyView
        ? this.formatMonthYear(post.date)  // Format month as "Month Year"
        : post.date; // Keep daily format (YYYY-MM-DD)
  
      if (!counts[dateKey]) {
        counts[dateKey] = { count: 0, sentiment: 0 };
      }
      counts[dateKey].count++;
      counts[dateKey].sentiment += post.sentiment;
    }
  
    for (const [date, count] of Object.entries(counts)) {
      dates.push(date);
      sentimentAvgs.push(Math.round((count.sentiment / count.count) * 100) / 100);
      postCounts.push(count.count);
    }
  
    this.sentChartOptions = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let sentiment = params[0].value;  // First series (sentiment)
          let index = params[0].dataIndex;  // Get index to match post count
          let postCount = postCounts[index]; // Get corresponding post count
  
          return `${params[0].axisValue}<br/>
                  Avg Sentiment: ${sentiment}<br/>
                  Posts: ${postCount}`;
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { color: '#fff' },
      },
      yAxis: [
        {
          type: 'value',
          min: -1,
          max: 1,
          axisLabel: { color: '#fff' },
        },
        {
          type: 'value',
          axisLabel: { color: '#fff' }, // Secondary Y-axis for post count
        }
      ],
      series: [
        {
          name: 'Avg Sentiment',
          data: sentimentAvgs,
          type: 'line',
          smooth: true,
          lineStyle: { color: '#4caf50' },
          yAxisIndex: 0,
        },
      ],
      dataZoom: [
        {
          type: 'inside',
        },
        {
          type: 'slider',
        }
      ]
    };
    this.count++;
  }
  
  // Convert "YYYY-MM-DD" to "Month Year"
  formatMonthYear(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  


  generateSentimentDistribution(posts: any) {
    let sentimentCounts = { positive: 0, neutral: 0, negative: 0 };
  
    for (const post of posts) {
      if (post.sentiment > 0) {
        sentimentCounts.positive++;
      } else if (post.sentiment === 0) {
        sentimentCounts.neutral++;
      } else if (post.sentiment < 0) {
        sentimentCounts.negative++;
      }
    }

    this.sentDistributionOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#fff' }
      },
      color: ['#40ba32', '#707070', '#f22222'],
      series: [
        {
          name: 'Sentiment Distribution',
          type: 'pie',
          radius: '50%',
          data: [
            { value: sentimentCounts.positive, name: 'Positive' },
            { value: sentimentCounts.neutral, name: 'Neutral' },
            { value: sentimentCounts.negative, name: 'Negative' }
          ],
          label: {
            color: '#fff',
            formatter: '{b}: {d}%'
          }
        }
      ]
    };
    this.count++;
  }

  generatePostVolumeChart(posts: any) {
    const counts: Record<string, number> = {};
  
    // Process posts to count occurrences per month
    for (const post of posts) {
      const date = new Date(post.date);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
  
      if (!counts[monthYear]) {
        counts[monthYear] = 0;
      }
      counts[monthYear]++;
    }
  
    // Sort months chronologically
    const sortedMonths = Object.keys(counts).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );
  
    const postCounts = sortedMonths.map(month => counts[month]);
  
    // Configure ECharts options
    this.postVolumeOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: sortedMonths,
        axisLabel: { color: '#fff' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' }
      },
      series: [
        {
          name: 'Posts',
          type: 'bar',
          data: postCounts,
          itemStyle: {
            color: '#4caf50'
          }
        }
      ]
    };
  
    this.count++;
  }

  generateWordClouds(posts: any) {
    const stocksLower = this.stocks?.map(stock => stock.toLowerCase()) || [];
    let wordCount: { [key: string]: { [word: string]: number } } = {
      positive: {}, neutral: {}, negative: {}
    };

    posts.forEach((post: { sentiment: any; preprocessedPost: string; }) => {
      let sentiment = post.sentiment;
      let words = post.preprocessedPost.split(/\s+/); // Basic tokenization by space

      let sentimentKey = sentiment === 1 ? 'positive' : sentiment === 0 ? 'neutral' : 'negative';

      words.forEach(word => {
        word = word.toLowerCase().replace(/[^a-z0-9]/g, ''); // Normalize words (remove punctuation)

        if (/\d/.test(word)) {
          return; // Skip words containing numbers
        }

        if (stocksLower.includes(word)) {
          return; // Skip words found in this.stocks
        }

        if (this.stopwords.includes(word)) {
          return;
        }

        if (word.length > 2) { // Filter out very short words
          if (!wordCount[sentimentKey][word]) {
            wordCount[sentimentKey][word] = 0;
          }
          wordCount[sentimentKey][word]++;
        }
      });
    });

    // Convert word frequency to array format for D3 with improved scaling
    ['positive', 'neutral', 'negative'].forEach(sentimentKey => {
      let sortedWords = Object.entries(wordCount[sentimentKey])
        .sort((a, b) => b[1] - a[1]) // Sort by frequency (descending)
        .slice(0, 1500); // Take top 100 words

      let maxFreq = sortedWords.length ? sortedWords[0][1] : 1; // Max word frequency
      let minFreq = sortedWords.length ? sortedWords[sortedWords.length - 1][1] : 1; // Min word frequency

      this.wordData[sentimentKey] = sortedWords.map(([word, freq]) => {
        // Exponential scaling for better contrast
        let scaledSize = 10 + (Math.pow(freq / maxFreq, 0.5) * 50); // Root scaling for balanced effect

        return { text: word, size: scaledSize, frequency: freq };
      });

      this.createWordCloud(`wordCloud${sentimentKey.charAt(0).toUpperCase() + sentimentKey.slice(1)}`, this.wordData[sentimentKey]);
    });
    this.count++;
  }

  createWordCloud(elementId: string, words: any[]) {
    const width = 550, height = 350;
    
    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))  // Random rotation
      .fontSize(d => d.size ?? 10)
      .on('end', draw);

      let tooltip = d3.select("body") // Create tooltip div
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "#fff")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("font-size", "14px")
      .style("top", "-9999px")
      .style("left", "-9999px")

    layout.start();

    function draw(words: any[]) {
      d3.select(`#${elementId}`).html(''); // Clear previous cloud
      d3.select("body").selectAll("div.tooltip").remove();
      const svg = d3.select(`#${elementId}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      svg.selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text)
        .on("mouseover", function (event, d) {
          tooltip.style("visibility", "visible")
            .text(`${d.text}: ${d.frequency} times`);
            d3.select(this).style("cursor", "pointer");
        })
        .on("mousemove", function (event) {
          tooltip.style("top", `${event.pageY - 20}px`)
            .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
          tooltip.style("visibility", "hidden")
                 .style("top", "-9999px")  // Move it off-screen
                 .style("left", "-9999px"); // Move it off-screen
        });
    }
  }

  hasWords(sentiment: string): boolean {
    return (this.wordData[sentiment] ?? []).length > 0;
  }

  loadTable(posts: any) {
    this.sortPostsByNewest(posts);
    this.filteredPosts.data = posts;
    this.count++;
  }

  filterTable() {
    const startDate = this.dateRangeForm.value.start;
    const endDate = this.dateRangeForm.value.end;

    this.filteredPosts.data = this.posts.filter(post => {
      const postDate = new Date(post.date);

      const matchesStartDate = !startDate || postDate >= startDate;
      const matchesEndDate = !endDate || postDate <= endDate;
      const matchesSentiment = this.filterSentiment === '' || post.sentiment.toString() === this.filterSentiment;

      return matchesStartDate && matchesEndDate && matchesSentiment;
    });
  }

  resetFilters() {
    this.dateRangeForm.reset(); // Reset date range
    this.filterSentiment = ''; // Reset sentiment filter
    this.filterTable(); // Refresh table
  }

  backToHome() {
    this.router.navigate(['']);
  }

}
