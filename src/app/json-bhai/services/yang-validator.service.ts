import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YangValidatorService {
  validate(yangCode: string): string[] {
    const errors: string[] = [];
    
    // Check for missing 'module' or 'submodule'
    if (!yangCode.match(/\b(module|submodule)\s+\w+/)) {
      errors.push("Error: Missing 'module' or 'submodule' declaration.");
    }

    // Check for incorrect bracket usage
    const openBraces = (yangCode.match(/{/g) || []).length;
    const closeBraces = (yangCode.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`Error: Mismatched { and } brackets.`);
    }

    // Check for missing semicolons in statements
    const lines = yangCode.split('\n');
    lines.forEach((line, index) => {
      if (line.trim().match(/^\w+\s+\w+$/) && !line.includes('{')) {
        errors.push(`Warning: Missing semicolon on line ${index + 1}.`);
      }
    });

    return errors;
  }
}
