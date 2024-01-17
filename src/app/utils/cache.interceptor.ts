import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

const responseCache = new Map<string, HttpResponse<any>>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // we use a custom header to specify which requests to cache for simplicity
  // in prod, we would need to use a more robust solution
  if (req.headers.get('x-cacheable') === 'true') {
    const url = req.urlWithParams;
    const cachedResponse = responseCache.get(url);
    // Return cached response if available
    if (cachedResponse) {
      return of(cachedResponse.clone()); // Clone to prevent side effects
    }

    // remove the custom header
    const modifiedReq = req.clone({
      headers: req.headers.delete('x-cacheable'),
    });
    return next(modifiedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          responseCache.set(url, event.clone());
        }
      })
    );
  }
  // else not required, since we return in the condition

  return next(req);
};
