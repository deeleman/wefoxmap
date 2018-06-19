import { Directive, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { WindowRef } from '@ngx-starter/platform';

@Directive({
  selector: '[ngxEnterViewport], [ngxBeforeEnterViewport], [ngxAfterEnterViewport]'
})
export class EnterViewportDirective implements OnInit {
  @Output() afterEnterViewport = new EventEmitter<UIEvent>();
  @Output() enterViewport = new EventEmitter<UIEvent>();
  @Output() beforeEnterViewport = new EventEmitter<UIEvent>();

  private beforeEnterViewportCompleted: boolean;
  private enterViewPortCompleted: boolean;
  private afterEnterViewportCompleted: boolean;

  constructor(private elementRef: ElementRef, private windowRef: WindowRef) { }

  ngOnInit() {
    setTimeout(this.onScroll.bind(this, this.elementRef.nativeElement), 0);
  }

  @HostListener('window:resize')
  onResize() {
    this.onScroll(this.elementRef.nativeElement);
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(target: any): void {
    const clientHeight = this.windowRef.getNativeWindow().document.documentElement.clientHeight;
    const elementHeight = this.elementRef.nativeElement.getBoundingClientRect().height;
    const elementOffsetTop = this.elementRef.nativeElement.getBoundingClientRect().top;

    // Checks if element has entered the viewport at full and is fully visible
    if (elementOffsetTop <= (clientHeight - elementHeight) && !this.afterEnterViewportCompleted) {
      this.afterEnterViewport.next(target);
      this.afterEnterViewportCompleted = true;

    // Checks if element has just entered the viewport although not fully visible yet
    } else if (elementOffsetTop <= clientHeight && !this.enterViewPortCompleted) {
      this.enterViewport.next(target);
      this.enterViewPortCompleted = true;

    // Checks if element is right outside the viewport boundaries
    } else if (
      (elementOffsetTop - elementHeight) <= clientHeight && !this.beforeEnterViewportCompleted) {
      this.beforeEnterViewport.next(target);
      this.beforeEnterViewportCompleted = true;

    // Resets completed event properties when scrolling beacon is outside the viewport again
    } else {
      this.beforeEnterViewportCompleted = false;
      this.enterViewPortCompleted = false;
      this.afterEnterViewportCompleted = false;
    }
  }
}
