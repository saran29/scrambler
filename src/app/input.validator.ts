import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function match(char: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value?.toLowerCase() === char.toLowerCase()
      ? null
      : { wrongInput: control.value };
}
