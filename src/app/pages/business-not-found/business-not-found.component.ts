import { Component } from '@angular/core';

@Component({
  selector: 'app-business-not-found',
  standalone: true,
  imports: [],
  template: `
    <main class="not-found">
      <div class="not-found-panel">
        <span class="section-kicker">404</span>
        <h1>This business page doesn't exist.</h1>
        <p>Check that the link is correct, or register your business to get one.</p>
        <a class="button" href="https://tagmate-934.pages.dev/login">Register your business</a>
      </div>
    </main>
  `
})
export class BusinessNotFoundComponent {}
