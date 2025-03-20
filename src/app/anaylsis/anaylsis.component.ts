import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-anaylsis',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    MatIconModule
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

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
    if (this.count == 2) {
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
          this.posts = this.sortPostsByDate(result.posts);
          this.calculateAvgs(this.posts);
        }
        this.count++;
      }
    })
  }

  sortPostsByDate(posts: any[]): any[] {
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

  backToHome() {
    this.router.navigate(['']);
  }

}
