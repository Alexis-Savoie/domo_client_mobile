import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'https://apidomo.crabdance.com:3000';
  constructor() { }
}