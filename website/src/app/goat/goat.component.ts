import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../_services/query.service';
import { Goat } from '../_models/goat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goat.component.html',
  styleUrl: './goat.component.scss',

})
export class GoatComponent {
  constructor(private route: ActivatedRoute, private queryService: QueryService) { }

  goat: Goat;

  ngOnInit() {
    const tag = this.route.snapshot.paramMap.get('tag');
    if (tag) {
      this.queryService.get_goat_by_tag(tag).subscribe(goat => {
        this.setGoat(goat[0]);
      });
    }
  }

  setGoat(goat: any) {
    for (const key in goat) {
      if (goat[key] === null || goat[key] === "") {
        goat[key] = 'N/A';
      }
    }

    this.goat = goat;
  }

  getFormattedDate(date: string) { // formats the date to be more readable
    if (date === 'N/A') {
      return 'N/A';
    }
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}
