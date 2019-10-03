import { Injectable } from '@angular/core';
import { WindowInterface } from './window.provider';
import { BehaviorSubject } from 'rxjs';

/**
 * JSON key/value feature toggles.
 * Start by creating a localStorage key of Features and a value of valid JSON: {"init": true}
 */

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  readonly lsKey = `Features`;

  featureMap: { [key: string]: any };
  private features = new BehaviorSubject<any>({});

  get features$() {
    return this.features.asObservable();
  }

  constructor(private window: WindowInterface) {
    this.update();
  }
  get localStorage() {
    return this.window.localStorage.getItem(this.lsKey);
  }

  contains(key: string): any {
    return this.featureMap[key];
  }

  update(changes?: { [key: string]: any }) {
    let fromLocalStorage: any;

    if (changes) {
      this.window.localStorage.setItem(this.lsKey, JSON.stringify(changes));
    }

    try {
      // shortcut for setting up initial data. Enter value {Features: true} in localStorage settings.
      if (this.localStorage === 'true') {
        this.window.localStorage.setItem(this.lsKey, JSON.stringify({ init: true }));
      }
      fromLocalStorage = JSON.parse(this.localStorage);
    } catch {
      fromLocalStorage = {
        Error: 'Invalid JSON in localStorage',
        [this.lsKey]: this.localStorage,
      };
    }

    this.featureMap = fromLocalStorage || {};
    this.features.next(this.featureMap);

    // check in browser (`javascript` might be stripped on paste)
    // javascript:alert(window.localStorage.getItem('Features'))
  }
}
