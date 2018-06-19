import { Directive, HostListener } from '@angular/core';
import { WindowRef } from '@ngx-starter/platform';

@Directive({
  selector: '[ngxScrollupOnTap]'
})
export class ScrollUpOnTapDirective {

  constructor(private windowRef: WindowRef) { }

  @HostListener('click')
  onTap(): void {
    this.windowRef.getNativeWindow().scrollTo(0, 0);
  }
}
