import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn! 🐙';
  }
} 