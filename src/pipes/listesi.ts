import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Listesi pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'listesi'
})
@Injectable()
export class Listesi {
  transform(value) {
    if (value == 2)
      return 'izlenmis';
    else if (value == 1)
      return 'izleniyor';
    else if (value == 6)
      return 'izlenecek';
    else if (value == 3)
      return 'beklemede';
    else if (value == 4)
      return 'birakilmis';
    else
      return 'listesiz';  
  }
}
