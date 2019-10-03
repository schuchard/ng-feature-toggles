import { NgModule, Optional, SkipSelf } from '@angular/core';
import { WindowInterface, getWindow } from './window.provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [{ provide: WindowInterface, useFactory: getWindow }],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
