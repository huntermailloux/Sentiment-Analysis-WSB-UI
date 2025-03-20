import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';


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
    FormsModule
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
  
  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
    if (this.count == 6) {
      this.loading = false;
    }
  }

  posts: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private service: StockService) {}

  ngOnInit() {

    this.stockTicker = this.route.snapshot.paramMap.get('ticker');
    this.service.getStock(this.stockTicker).subscribe({
      next: (result) => {
        if (result && result.posts) {
          this.posts = this.sortPostsByNewest(result.posts);
          this.calculateAvgs(this.posts);
          this.getSentimentDays(this.posts);
          this.generateSentOverTime(this.posts);
          this.generateSentimentDistribution(this.posts);
          this.generatePostVolumeChart(this.posts);
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

  backToHome() {
    this.router.navigate(['']);
  }

}
