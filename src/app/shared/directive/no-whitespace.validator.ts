import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    if (control.value != null && control.value !== undefined && control.value.length > 0) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isvalid = !isWhitespace;

      if (!isvalid) {
        return { whitespace: true };
      } else {
        return null;
      }
    }
  };
}
