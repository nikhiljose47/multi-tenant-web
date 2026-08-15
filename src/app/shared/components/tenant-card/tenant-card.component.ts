import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { BusinessService } from '../../../core/tenant/tenant.models';

@Component({
  selector: 'app-tenant-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <article class="tenant-card">
      <span *ngIf="service.highlight" class="tag">{{ service.highlight }}</span>
      <h3>{{ service.name }}</h3>
      <p>{{ service.description }}</p>
      <div class="card-meta">
        <strong *ngIf="service.price">{{ service.price }}</strong>
        <span *ngIf="service.duration">{{ service.duration }}</span>
      </div>
    </article>
  `
})
export class TenantCardComponent {
  @Input({ required: true }) service!: BusinessService;
}
