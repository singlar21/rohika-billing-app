import { Component } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { sampleJsonInput1 } from '../json-formatter/sample-json';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-beautifier',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './json-beautifier.component.html',
  styleUrl: './json-beautifier.component.less'
})
export class JsonBeautifierComponent {
 jsonInput1: string = '';
  comparisonResult: string = '';
  highlightedJson1: SafeHtml = '';

  constructor() {}

  addSample() {
    this.jsonInput1 = JSON.stringify(sampleJsonInput1, null, 4);
  }

  beautifyJson() {
    try {
      this.highlightedJson1 = JSON.stringify(JSON.parse(this.jsonInput1), null, 4);
    } catch (e) {
      this.jsonInput1 = 'Invalid JSON';
    }
  }

  copyToClipboardOutput1() {
    navigator.clipboard.writeText(this.jsonInput1).then(() => alert('Copied!'));
  }

  clearAll() {
    this.jsonInput1 = '';
    this.comparisonResult= '';
    this.highlightedJson1= '';
  }

  copyToClipboardOutput2() {
    navigator.clipboard.writeText(this.highlightedJson1+'').then(() => alert('Copied!'));
  }

  validate() {
    const result = this._validateJson(this.jsonInput1);
    this.highlightedJson1 = result.valid
      ? 'Valid JSON ✅'
      : `Invalid JSON ❌: ${result.error}`;
  }
  
  private _validateJson(jsonString: string): { valid: boolean; error?: string } {
    try {
      JSON.parse(jsonString);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }

  minifyJson() {
    try {
      const parsedJson = JSON.parse(this.jsonInput1); // Parse JSON to ensure it's valid
      this.highlightedJson1 = JSON.stringify(parsedJson); // Minify JSON by removing spaces & line breaks
    } catch (error) {
      this.highlightedJson1 = "Invalid JSON"; // Handle errors gracefully
    }
  }  

}
