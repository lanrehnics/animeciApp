import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'bsSplitter'
})
@Injectable()
export class BsSplitter {
  transform(value: string) {
    return value.split('/')[1];
  }
}
