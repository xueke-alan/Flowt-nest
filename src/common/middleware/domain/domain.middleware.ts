import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DomainMiddleware implements NestMiddleware {
  private readonly allowedDomains = ['127.0.0.1', '192.168.31.21','localhost','www.flowt.work']; // 允许的域名列表,应该只能用于flowt.site

  use(req: Request, res: Response, next: NextFunction) {
    const { host } = req.headers;
    console.log(host);

    if (!this.isDomainAllowed(host)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '拒绝提供服务',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }

  private isDomainAllowed(host: string): boolean {
    const domain = host.split(':')[0]; // 去除端口号
    return this.allowedDomains.includes(domain);
  }
}
