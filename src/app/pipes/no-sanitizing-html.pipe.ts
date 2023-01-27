import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'keepHtml', pure: false})
export class NoSanitizingHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content: string | undefined): SafeHtml {
    content = content === undefined ? '' : content;
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
