import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  snapshot = {};

  private paramMapSubject = new ReplaySubject<ParamMap>();
  private queryParamMapSubject = new ReplaySubject<ParamMap>();

  constructor({ initialParams, initialQueryParams }: { initialParams?: Params; initialQueryParams?: Params; }) {
    if (initialParams) {
      this.setParamMap(initialParams);
    }

    if (initialQueryParams) {
      this.setQueryParamMap(initialQueryParams);
    }
  }

  readonly paramMap = this.paramMapSubject.asObservable();

  readonly queryParamMap = this.queryParamMapSubject.asObservable();

  setParamMap(params?: Params) {
    this.paramMapSubject.next(convertToParamMap(params));
  }

  setQueryParamMap(params?: Params) {
    this.queryParamMapSubject.next(convertToParamMap(params));
  }
}
