import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('nest:');
    return next.handle().pipe(
      catchError((error, b) => {
        console.log('error:', error);
        return throwError(() => {
          // const { message, getStatus } = new BadGatewayException();
          return {
            // code: context,
            // message,
            data: null,
          };
        });
      }),
    );
  }
}
