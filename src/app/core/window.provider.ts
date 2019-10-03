import { Injectable } from '@angular/core';

export function getWindow() {
  return window;
}

@Injectable()
export class WindowInterface extends Window {}
