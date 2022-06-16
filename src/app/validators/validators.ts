import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
        const areNumbersPresent = control.value.match(/\d/g);
        if (areNumbersPresent) {
            return { forbiddenNumbers: true };
        } else if (control.value.includes(" ")) {
            return { spaces: true }
        } else if (!control.value) {
            return { empty: true }
        }

        return null; 
    };
}

export function numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const areCharacterPresent = control.value.match(/^-?(0|[1-9]\d*)?$/);
        if (areCharacterPresent) {
            return { forbiddenCharacters: true };
        }else if (!control.value) {
            return { empty: true }
        }
        return null;
    };
}

