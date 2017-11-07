import { BeatAnalyzerService } from './beat-analyzer.service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colorIndex = 0;
  colors = ['red', 'pink', 'orange', 'green', 'blue', 'purple'];

  constructor(private beatAnalyzer: BeatAnalyzerService) {
    this.beatAnalyzer.init();
    this.beatAnalyzer.beat$
      .filter(val => val > 0.05)
      .bufferTime(100)
      .filter(val => val.length > 0)
      .subscribe(val => {
        this.colorIndex++;
      });
  }

  get beat$() {
    return this.beatAnalyzer.beat$;
  }

  get color() {
    return this.colors[this.colorIndex % this.colors.length];
  }
}
