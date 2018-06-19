import { Directive, Renderer2, ElementRef, OnInit, Input, HostBinding } from '@angular/core';
import { WindowRef } from '@ngx-starter/platform';

export interface ScrollWatchConfig {
  offsetTop?: number;
  offsetBottom?: number;
  offsetTopVH?: number;
  offsetBottomVH?: number;
}

@Directive({
  selector: '[ngxScrollWatch]'
})
export class ScrollWatchDirective implements OnInit {
  @Input()
  set scrollWatch(scrollWatchConfig: ScrollWatchConfig) {
    this.scrollOffsetTop = scrollWatchConfig.offsetTop || 0;
    this.scrollOffsetBottom = scrollWatchConfig.offsetBottom || 0;

    if (scrollWatchConfig.offsetTopVH && scrollWatchConfig.offsetTopVH > 0) {
      this.scrollOffsetTop = this.windowRef.getNativeWindow().innerHeight * scrollWatchConfig.offsetTopVH;
    }

    if (scrollWatchConfig.offsetBottomVH && scrollWatchConfig.offsetBottomVH > 0) {
      this.scrollOffsetBottom = this.windowRef.getNativeWindow().innerHeight * scrollWatchConfig.offsetBottomVH;
    }
  }

  private scrollOffsetTop = 0;
  private scrollOffsetBottom = 0;
  private delta = 0;
  private lastScrollingCheck = 0;

  @HostBinding('class.is-scrolling')
  private isScrolling: boolean;
  @HostBinding('class.is-scrolling-up')
  private isScrollingUp: boolean;
  @HostBinding('class.is-scrolling-down')
  private isScrollingDown: boolean;
  @HostBinding('class.is-inside-top-offset')
  private isWithinTopOffset = true;
  @HostBinding('class.is-inside-bottom-offset')
  private isWithinBottomOffset: boolean;

  constructor(
    private windowRef: WindowRef,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer2.listen('window', 'scroll', this.updateScrollDirection.bind(this));
  }

  ngOnInit() {
    this.delta = this.elementRef.nativeElement.offsetHeight;
    this.lastScrollingCheck = this.delta;
  }

  updateScrollDirection(): void {
    if (this.windowRef.getNativeWindow().scrollY > (this.delta + this.scrollOffsetTop)) {
      this.isScrollingDown = (this.windowRef.getNativeWindow().scrollY > this.lastScrollingCheck);
      this.isScrollingUp = !this.isScrollingDown;
      this.isScrolling = this.isScrollingDown || this.isScrollingUp;
    } else {
      this.isScrollingUp = false;
      this.isScrollingDown = false;
    }

    this.checkOffsetUponScrolling();
    this.lastScrollingCheck = this.windowRef.getNativeWindow().scrollY;
  }

  checkOffsetUponScrolling(): void {
    this.isWithinTopOffset = this.windowRef.getNativeWindow().scrollY <= this.scrollOffsetTop;

    const documentHeight = this.windowRef.getNativeWindow().document.documentElement.scrollHeight;
    const currentWaypoint = this.windowRef.getNativeWindow().scrollY +
      this.windowRef.getNativeWindow().innerHeight + this.scrollOffsetBottom;
    this.isWithinBottomOffset = documentHeight <= currentWaypoint;
  }
}
