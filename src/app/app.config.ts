import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' })), provideFirebaseApp(() => initializeApp({ "projectId": "rohika-billing", "appId": "1:39518844813:web:4ed4c8bf81976b733aafc4", "storageBucket": "rohika-billing.firebasestorage.app", "apiKey": "AIzaSyCyPJOoOp7XDqIyEmp6W84fmx5M-8N9pFg", "authDomain": "rohika-billing.firebaseapp.com", "messagingSenderId": "39518844813", "measurementId": "G-1HCGGN5SZH" })), 
    provideDatabase(() => getDatabase(undefined, "https://rohika-billing-default-rtdb.asia-southeast1.firebasedatabase.app")),
    provideFirestore(() => getFirestore())
  ]
};
