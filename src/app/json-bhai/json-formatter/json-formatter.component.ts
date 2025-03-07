import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sampleJsonInput1, sampleJsonInput2 } from './sample-json';

@Component({
  selector: 'app-json-formatter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './json-formatter.component.html',
  styleUrl: './json-formatter.component.less'
})
export class JsonFormatterComponent {
  jsonInput1: string = '';
  jsonInput2: string = '';
  comparisonResult: string = '';
  highlightedJson1: SafeHtml = '';
  highlightedJson2: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  addSample() {
    this.jsonInput1 = JSON.stringify(sampleJsonInput1, null, 4);
    this.jsonInput2 = JSON.stringify(sampleJsonInput2, null, 4);
  }

  beautifyJson() {
    try {
      this.jsonInput1 = JSON.stringify(JSON.parse(this.jsonInput1), null, 4);
    } catch (e) {
      this.jsonInput1 = 'Invalid JSON';
    }

    try {
      this.jsonInput2 = JSON.stringify(JSON.parse(this.jsonInput2), null, 4);
    } catch (e) {
      this.jsonInput2 = 'Invalid JSON';
    }
  }

  compareJson() {
    this.beautifyJson();
    try {
      const obj1 = JSON.parse(this.jsonInput1);
      const obj2 = JSON.parse(this.jsonInput2);
      this.comparisonResult = this.findDifferences(obj1, obj2);

      // Highlight and format JSON properly
      this.highlightedJson1 = this.sanitizer.bypassSecurityTrustHtml(
        this.formatJsonWithDiffs(this.jsonInput1, obj1, obj2)
      );
      this.highlightedJson2 = this.sanitizer.bypassSecurityTrustHtml(
        this.formatJsonWithDiffs(this.jsonInput2, obj2, obj1)
      );
    } catch (e) {
      this.comparisonResult = 'Invalid JSON input';
    }
  }

  findDifferences(obj1: any, obj2: any): string {
    const differences: string[] = [];

    function compareKeys(o1: any, o2: any, path: string = '') {
      for (const key in o1) {
        const fullPath = path ? `${path}.${key}` : key;
        if (!(key in o2)) {
          differences.push(`❌ Missing in JSON 2: ${fullPath}`);
        } else if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
          compareKeys(o1[key], o2[key], fullPath);
        } else if (o1[key] !== o2[key]) {
          differences.push(`🔄 Value mismatch: ${fullPath} (JSON 1: ${o1[key]}, JSON 2: ${o2[key]})`);
        }
      }

      for (const key in o2) {
        if (!(key in o1)) {
          const fullPath = path ? `${path}.${key}` : key;
          differences.push(`➕ Extra in JSON 2: ${fullPath}`);
        }
      }
    }

    compareKeys(obj1, obj2);
    return differences.length ? differences.join('\n') : '✅ JSONs are identical';
  }

  formatJsonWithDiffs(jsonString: string, obj1: any, obj2: any): string {
    let formattedJson = jsonString;

    function wrapDiff(value: string, color: string) {
      return `<span style="background-color: ${color}; padding: 2px; border-radius: 3px;">${value}</span>`;
    }

    function markDifferences(o1: any, o2: any, path: string = '') {
      for (const key in o1) {
        const fullPath = path ? `${path}.${key}` : key;
        if (!(key in o2)) {
          formattedJson = formattedJson.replace(
            new RegExp(`"${key}":\\s*[^,}\\n]*`, 'g'),
            match => wrapDiff(match, '#f8d7da') // Red for missing keys
          );
        } else if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
          markDifferences(o1[key], o2[key], fullPath);
        } else if (o1[key] !== o2[key]) {
          formattedJson = formattedJson.replace(
            new RegExp(`"${key}":\\s*[^,}\\n]*`, 'g'),
            match => wrapDiff(match, '#fff3cd') // Yellow for value mismatches
          );
        }
      }

      for (const key in o2) {
        if (!(key in o1)) {
          formattedJson = formattedJson.replace(
            new RegExp(`"${key}":\\s*[^,}\\n]*`, 'g'),
            match => wrapDiff(match, '#d4edda') // Green for extra keys in JSON 2
          );
        }
      }
    }

    markDifferences(obj1, obj2);
    
    // Convert newlines to <br> and preserve spaces
    return `<pre>${formattedJson.replace(/\n/g, '<br>')}</pre>`;
  }

  copyToClipboardOutput1() {
    navigator.clipboard.writeText(this.jsonInput1).then(() => alert('Copied!'));
  }

  copyToClipboardOutput2() {
    navigator.clipboard.writeText(this.jsonInput2).then(() => alert('Copied!'));
  }

  clearAll() {
    this.jsonInput1 = '';
    this.jsonInput2= '';
    this.comparisonResult= '';
    this.highlightedJson1= '';
    this.highlightedJson2= '';
  }

}
