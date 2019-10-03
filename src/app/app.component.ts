import { Component } from '@angular/core';
import { FeatureToggleService } from './core/feature-toggle.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-feature-toggles';
  showRocket$ = this.toggles.features$.pipe(map(f => f.rocket));

  constructor(public toggles: FeatureToggleService) {}
}
