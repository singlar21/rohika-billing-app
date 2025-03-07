import { Routes } from '@angular/router';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { JsonFormatterComponent } from './json-bhai/json-formatter/json-formatter.component';
import { JsonBeautifierComponent } from './json-bhai/json-beautifier/json-beautifier.component';
import { RestTemplateComponent } from './json-bhai/rest-template/rest-template.component';
import { YangValidatorComponent } from './json-bhai/yang-validator/yang-validator.component';
import { ProductsComponent } from './rohika/products/products.component';
import { RohikaUsersComponent } from './rohika/rohika-users/rohika-users.component';

export const routes: Routes = [

    { path: '', component: JsonFormatterComponent },
    // { path: 'createUser', component: CreateUsersComponent },
    // { path: 'compare', component: JsonFormatterComponent },
    // { path: 'beautifier', component: JsonBeautifierComponent },
    // { path: 'restTemplate', component: RestTemplateComponent },
    // { path: 'yangValidator', component: YangValidatorComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'users', component: RohikaUsersComponent },

];
