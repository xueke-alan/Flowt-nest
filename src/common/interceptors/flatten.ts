import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FlattenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Flatten userGroups
        // 如果有参数，按参数展开，没有的化，展开全部。
        if (data.userGroups && data.userGroups.length > 0) {
          data.groupName = data.userGroups[0].groupName;
          delete data.userGroups;
        }
        // Flatten other relations if needed

        return data;
      }),
    );
  }
}
