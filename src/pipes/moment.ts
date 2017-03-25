import { Injectable, Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'moment'
})
@Injectable()
export class Moment {
  transform(value) {
    return moment(value).locale('tr').fromNow();
  }
}
