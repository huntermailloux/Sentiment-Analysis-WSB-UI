import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-anaylsis',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './anaylsis.component.html',
  styleUrl: './anaylsis.component.scss'
})
export class AnaylsisComponent implements OnInit {
  stockTicker: string | null = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.stockTicker = this.route.snapshot.paramMap.get('ticker');
  }

  backToHome() {
    this.router.navigate(['']);
  }

}
