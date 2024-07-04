import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export function dateFormatZero(i: number): string {
  return i < 10 ? `0${i}` : `${i}`;
}

@Injectable({
  providedIn: 'root'
})
export class DateAdapterService extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value && typeof value === 'string') {
      const date = value.split(this.DELIMITER);
      return {
        year : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        day : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + dateFormatZero(date.month) + this.DELIMITER + dateFormatZero(date.day) : null;
  }
}
