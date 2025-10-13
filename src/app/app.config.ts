import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptor/jwt.interceptor';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([jwtInterceptor])  // ✅ add interceptor here
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideFirebaseApp(() => initializeApp({
      "projectId": "rohika-billing",
      "appId": "1:39518844813:web:4ed4c8bf81976b733aafc4",
      "storageBucket": "rohika-billing.firebasestorage.app",
      "apiKey": "AIzaSyCyPJOoOp7XDqIyEmp6W84fmx5M-8N9pFg",
      "authDomain": "rohika-billing.firebaseapp.com",
      "messagingSenderId": "39518844813",
      "measurementId": "G-1HCGGN5SZH"
    })),
    provideDatabase(() => getDatabase(undefined, "https://rohika-billing-default-rtdb.asia-southeast1.firebasedatabase.app")),
    provideFirestore(() => getFirestore())
  ]
};
