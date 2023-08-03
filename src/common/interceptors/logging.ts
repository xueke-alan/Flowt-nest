import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');
    const request = context.switchToHttp().getRequest();
    // console.log('Origin', request.headers.origin);
    // console.log('Host:', request.host);
    // console.log('Domain:', request.headers.host);
    // console.log('Method:', request.method);
    // console.log('URL:', request.url);
    // console.log('Params:', request.params);
    // console.log('Body:', request.body);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
