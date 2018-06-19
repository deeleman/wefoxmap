import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

import { WindowRef } from '@ngx-starter/platform';
import { WebSocketMessage } from './websocket-message.model';

@Injectable()
export class WebSocketService {
  socket: Subject<WebSocketMessage>;

  private onReadyHandlers = new Array<Function>();

  constructor(private windowRef: WindowRef) {}

  connect(webSocketUrl: string, reconnectWhenOnline: true): Subject<WebSocketMessage> {
    if (!this.socket) {
      const initializeSocket = () => {
        this.socket = this.create(webSocketUrl);
        setTimeout(() => this.onReadyHandlers.forEach(fn => fn.call(null, this.socket)), 0);
      };

      if (reconnectWhenOnline) {
        this.windowRef.getNativeWindow().addEventListener('offline', this.dispose.bind(this));
        this.windowRef.getNativeWindow().addEventListener('online', initializeSocket.bind(this));
      }

      initializeSocket();
    }

    return this.socket;
  }

  onReady(fn: Function): void {
    if (this.socket) {
      fn.call(null, this.socket);
    }
    this.onReadyHandlers.push(fn);
  }

  dispose(): void {
    if (this.socket) {
      this.socket.complete();
    }
  }

  private create(url: string): Subject<MessageEvent> {
    const webSocket = new WebSocket(url);

    const observable = Observable.create((messageEventObserver: Observer<MessageEvent>) => {
      webSocket.onmessage = messageEventObserver.next.bind(messageEventObserver);
      webSocket.onerror = messageEventObserver.error.bind(messageEventObserver);
      webSocket.onclose = messageEventObserver.complete.bind(messageEventObserver);

      return webSocket.close.bind(webSocket);
    });

    const observer = {
      next: (data: Object) => {
        if (webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(JSON.stringify(data));
        }
      },
      complete: () => {
        if (webSocket.readyState === WebSocket.OPEN) {
          webSocket.close();
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
