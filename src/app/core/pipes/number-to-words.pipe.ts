import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords',
  standalone:true
})
export class NumberToWordsPipe implements PipeTransform {

  private belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  private tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  private convertToWords(num: number): string {
    if (num === 0) return "Zero";

    if (num < 20) return this.belowTwenty[num];

    if (num < 100) return this.tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + this.belowTwenty[num % 10] : "");

    if (num < 1000) return this.belowTwenty[Math.floor(num / 100)] + " Hundred" + 
      (num % 100 !== 0 ? " " + this.convertToWords(num % 100) : "");

    if (num < 100000) return this.convertToWords(Math.floor(num / 1000)) + " Thousand" + 
      (num % 1000 !== 0 ? " " + this.convertToWords(num % 1000) : "");

    if (num < 10000000) return this.convertToWords(Math.floor(num / 100000)) + " Lakh" + 
      (num % 100000 !== 0 ? " " + this.convertToWords(num % 100000) : "");

    return this.convertToWords(Math.floor(num / 10000000)) + " Crore" + 
      (num % 10000000 !== 0 ? " " + this.convertToWords(num % 10000000) : "");
  }

  transform(value: number): string {
    return this.convertToWords(value);
  }
}
