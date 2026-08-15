import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-business-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="not-found">
      <div class="not-found-panel">
        <span class="section-kicker">Business link</span>
        <h1>We couldn't find this business.</h1>
        <p>Check that the link is correct or request a new link from the business.</p>
        <a class="button" routerLink="/adq/royal-bike-wash">Open a demo business</a>
      </div>
    </main>
  `
})
export class BusinessNotFoundComponent {}
