import { AbstractControl, ValidationErrors } from '@angular/forms';

export function documentValidator(control: AbstractControl): ValidationErrors | null {
    const document = control.value.replace(/[^\d]+/g, '');

    if (control.touched) {
      if (document) {
          if (isCNPJ(document)) {
              return validaCNPJ(document);
          } else if (isCPF(document)) {
            return validaCPF(document);
          } else {
              return { typeOfDocumentInvalid: true };
          }
      }
    }
    return null;
}

function validaCNPJ(cnpj: string): ValidationErrors | null {
  const fnCNPJ = (m: number) => m === 2 ? 9 : --m;
  const fnMod11 = (sum: number) => {
    let mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }

  if (handleDocumentCheckDigit(cnpj, 12, 5, fnCNPJ, fnMod11)) {
    return { documentInvalid: true };
  }

  if (handleDocumentCheckDigit(cnpj, 13, 6, fnCNPJ, fnMod11)) {
    return { documentInvalid: true };
  }
  return null;
}

function validaCPF(cpf: string): ValidationErrors | null {
  const fnCPF = (m: number) => --m;
  const fnMod11 = (sum: number) => {
    let mod = (sum * 10 )% 11;
    return mod >= 10 ? 0 : mod;
  }

  if (handleDocumentCheckDigit(cpf, 9, 10, fnCPF, fnMod11)) {
    return { documentInvalid: true };
  }

  if (handleDocumentCheckDigit(cpf, 10, 11, fnCPF, fnMod11)) {
    return { documentInvalid: true };
  }
  return null;
}

function accumulateValues(document: any[], multiplicador: number, fn: Function): number {
  return document.reduce((acc, curr, index) => {
    let sum = Number.parseInt(acc) + (Number.parseInt(curr) * multiplicador);
    multiplicador = fn(multiplicador, index);
    return sum
  }, 0)
}

function handleDocumentCheckDigit(document: string, finalPosition: number, multiplier: number, fnACC: Function, fnMod11: Function ): boolean {
  let sum = accumulateValues(document.substring(0, finalPosition).split(''), multiplier, fnACC);
  let result = fnMod11(sum);
  return isDigitValid(result, document, finalPosition);
}

function isCNPJ(document: string): boolean {
  return document.length === 14;
}

function isCPF(document: string): boolean {
  return document.length === 11;
}

function isDigitValid(dv: number, document: string, pos: number): boolean {
  return dv !== Number.parseInt(document.charAt(pos));
}
