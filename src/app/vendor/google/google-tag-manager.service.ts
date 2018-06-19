import { Injectable } from '@angular/core';
import { WindowRef } from '@ngx-starter/platform';

@Injectable()
export class GoogleTagManagerService {
  private googleTagManagerId;
  private globalCustomEventId;

  constructor(private windowRef: WindowRef) { }

  private get dataLayer(): any {
    return this.windowRef.getNativeWindow()['dataLayer'] || [];
  }

  bootstrap(googleTagManagerId: any, customEventName: string): void {
    const document = this.windowRef.getNativeWindow().document;
    this.googleTagManagerId = googleTagManagerId;
    this.globalCustomEventId = customEventName;

    this.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const topScriptTag = document.getElementsByTagName('script')[0];
    const gtmScriptTag = document.createElement('script');

    gtmScriptTag.async = true;
    gtmScriptTag.src = `https://www.googletagmanager.com/gtm.js?id=${googleTagManagerId}`;
    topScriptTag.parentNode.insertBefore(gtmScriptTag, topScriptTag);
  }

  trackEvent(category: string, action?: string | number, label?: string | number): void {
    if (typeof this.dataLayer !== 'undefined' && this.dataLayer) {
      const eventObject = Object.assign({}, {
        event: this.globalCustomEventId,
        category: category || 'interaction',
        action,
        label
      });

      this.dataLayer.push(eventObject);
    }
  }
}
