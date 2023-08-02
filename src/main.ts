import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor)
  app.useGlobalInterceptors(new LoggingInterceptor)
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(3000);
  console.log('http://localhost:3000/');
}
bootstrap();
