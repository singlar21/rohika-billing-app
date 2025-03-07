import { Component } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rest-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rest-template.component.html',
  styleUrl: './rest-template.component.less'
})
export class RestTemplateComponent {
  url = '';
  method = 'GET';
  headers: { key: string; value: string }[] = [{ key: '', value: '' }];
  params: { key: string; value: string }[] = [{ key: '', value: '' }];
  requestBody = '';
  response = '';

  constructor(private apiService: RestApiService) {}

  addHeader() {
    this.headers.push({ key: '', value: '' });
  }

  addParam() {
    this.params.push({ key: '', value: '' });
  }

  sendRequest() {
    const headersObj = this.headers.reduce((acc, h) => (h.key ? { ...acc, [h.key]: h.value } : acc), {});
    const paramsObj = this.params.reduce((acc, p) => (p.key ? { ...acc, [p.key]: p.value } : acc), {});
    const body = this.requestBody ? JSON.parse(this.requestBody) : null;

    this.apiService.sendRequest(this.url, this.method, headersObj, paramsObj, body).subscribe(
      (res:any) => {
        this.response = JSON.stringify(res, null, 2);
      },
      (err:any) => {
        this.response = `${JSON.stringify(err.error, null, 2)}`;
      }
    );
  }
}
