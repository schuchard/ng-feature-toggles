import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeatureToggleService } from 'src/app/core/feature-toggle.service';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Directive({ selector: '[appFeatureToggle]' })
export class FeatureToggleDirective implements OnInit, OnDestroy {
  subs = new Subscription();

  @Input('appFeatureToggle') featureToggle: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureToggleService: FeatureToggleService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.featureToggleService.features$
        .pipe(
          map((features: Record<string, boolean>) => features && features[this.featureToggle]),
          distinctUntilChanged()
        )
        .subscribe(feature => {
          if (feature) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
