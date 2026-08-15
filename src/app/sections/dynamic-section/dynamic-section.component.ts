import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { TenantBusiness, TenantSection } from '../../core/tenant/tenant.models';
import { TenantCardComponent } from '../../shared/components/tenant-card/tenant-card.component';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, TenantCardComponent],
  template: `
    <section [id]="type" class="section" [class]="'section-' + type">
      <ng-container [ngSwitch]="type">
        <div *ngSwitchCase="'booking'" class="booking-panel">
          <div>
            <span class="section-kicker">{{ tenant.content.bookingTitle ?? 'Plan your visit' }}</span>
            <h2>{{ tenant.content.primaryCta }}</h2>
          </div>
          <div class="booking-fields">
            <span *ngFor="let field of tenant.content.bookingFields">{{ field }}</span>
          </div>
          <a class="button" [href]="bookingHref">{{ tenant.content.primaryCta }}</a>
        </div>

        <div *ngSwitchCase="'services'" class="section-inner">
          <div class="section-heading">
            <span class="section-kicker">{{ serviceKicker }}</span>
            <h2>{{ servicesTitle }}</h2>
            <p>{{ servicesIntro }}</p>
          </div>
          <div class="service-list" [class]="tenant.layout.services">
            <app-tenant-card *ngFor="let service of tenant.services" [service]="service"></app-tenant-card>
          </div>
        </div>

        <div *ngSwitchCase="'pricing'" class="section-inner pricing-focus">
          <div class="section-heading">
            <span class="section-kicker">Packages</span>
            <h2>Clear choices before you arrive</h2>
          </div>
          <div class="service-list pricing">
            <app-tenant-card *ngFor="let service of tenant.services" [service]="service"></app-tenant-card>
          </div>
        </div>

        <div *ngSwitchCase="'rooms'" class="section-inner hotel-rooms">
          <div class="section-heading">
            <span class="section-kicker">Rooms</span>
            <h2>Stay options with space to settle in</h2>
          </div>
          <div class="room-row">
            <app-tenant-card *ngFor="let service of tenant.services" [service]="service"></app-tenant-card>
          </div>
        </div>

        <div *ngSwitchCase="'amenities'" class="section-inner">
          <div class="section-heading">
            <span class="section-kicker">Amenities</span>
            <h2>Everything around the stay</h2>
          </div>
          <div class="amenity-grid">
            <span *ngFor="let amenity of tenant.content.amenities">{{ amenity }}</span>
          </div>
        </div>

        <div *ngSwitchCase="'about'" class="section-inner about-band">
          <div>
            <span class="section-kicker">About</span>
            <h2>{{ tenant.content.aboutTitle ?? tenant.businessName }}</h2>
          </div>
          <p>{{ tenant.content.about ?? tenant.description }}</p>
        </div>

        <div *ngSwitchCase="'gallery'" class="section-inner">
          <div class="section-heading">
            <span class="section-kicker">Gallery</span>
            <h2>{{ galleryTitle }}</h2>
          </div>
          <div class="gallery-grid" [class]="tenant.layout.gallery">
            <figure *ngFor="let item of tenant.content.gallery; let i = index">
              <img [src]="galleryImage(i)" [alt]="item" loading="lazy">
              <figcaption>{{ item }}</figcaption>
            </figure>
          </div>
        </div>

        <div *ngSwitchCase="'testimonials'" class="section-inner">
          <div class="section-heading">
            <span class="section-kicker">Reviews</span>
            <h2>{{ tenant.rating }} stars from {{ tenant.reviewCount }} customers</h2>
          </div>
          <div class="testimonial-grid">
            <blockquote *ngFor="let testimonial of tenant.content.testimonials">
              <p>{{ testimonial.quote }}</p>
              <cite>{{ testimonial.name }}<span *ngIf="testimonial.meta">, {{ testimonial.meta }}</span></cite>
            </blockquote>
          </div>
        </div>

        <div *ngSwitchCase="'opening-hours'" class="section-inner hours-band">
          <div>
            <span class="section-kicker">Hours</span>
            <h2>Open when customers need you</h2>
          </div>
          <dl>
            <div *ngFor="let item of tenant.openingHours">
              <dt>{{ item.day }}</dt>
              <dd>{{ item.hours }}</dd>
            </div>
          </dl>
        </div>

        <div *ngSwitchCase="'location'" class="section-inner location-band">
          <div>
            <span class="section-kicker">Location</span>
            <h2>{{ tenant.address ?? tenant.city }}</h2>
            <p>{{ tenant.content.locationNote ?? tenant.city }}</p>
          </div>
          <a class="button secondary" [href]="directionsHref" target="_blank" rel="noopener">Open directions</a>
        </div>

        <div *ngSwitchCase="'teaching-method'" class="section-inner method-grid">
          <div>
            <span class="section-kicker">Method</span>
            <h2>Concepts first, marks follow</h2>
          </div>
          <div class="step-list">
            <span>Diagnose gaps</span>
            <span>Teach with examples</span>
            <span>Practice weekly</span>
            <span>Update parents</span>
          </div>
        </div>

        <div *ngSwitchCase="'results'" class="section-inner stats-row">
          <div *ngFor="let stat of tenant.content.stats">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>

        <div *ngSwitchCase="'contact'" class="section-inner contact-band">
          <div>
            <span class="section-kicker">Contact</span>
            <h2>Talk to {{ tenant.businessName }}</h2>
            <p>{{ tenant.address }} {{ tenant.city }}</p>
          </div>
          <div class="contact-actions">
            <a *ngIf="tenant.phone" class="button" [href]="'tel:' + phoneDigits">Call</a>
            <a *ngIf="tenant.whatsapp" class="button secondary" [href]="bookingHref">WhatsApp</a>
            <a *ngIf="tenant.email" class="button secondary" [href]="'mailto:' + tenant.email">Email</a>
          </div>
        </div>

        <div *ngSwitchDefault class="section-inner">
          <h2>{{ tenant.businessName }}</h2>
          <p>{{ tenant.description }}</p>
        </div>
      </ng-container>
    </section>
  `
})
export class DynamicSectionComponent {
  @Input({ required: true }) type!: TenantSection;
  @Input({ required: true }) tenant!: TenantBusiness;

  get phoneDigits(): string {
    return this.tenant.phone?.replace(/[^\d+]/g, '') ?? '';
  }

  get bookingHref(): string {
    return this.tenant.whatsapp ? `https://wa.me/${this.tenant.whatsapp.replace(/[^\d]/g, '')}` : '#contact';
  }

  get directionsHref(): string {
    const query = encodeURIComponent([this.tenant.businessName, this.tenant.address, this.tenant.city].filter(Boolean).join(', '));
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  get serviceKicker(): string {
    return this.tenant.category === 'home-tuition' ? 'Subjects' : this.tenant.category === 'spa' ? 'Treatments' : 'Services';
  }

  get servicesTitle(): string {
    if (this.tenant.category === 'home-tuition') {
      return 'Tuition plans by class level';
    }

    if (this.tenant.category === 'spa') {
      return 'Treatments designed around rest';
    }

    return 'Popular customer choices';
  }

  get servicesIntro(): string {
    return this.tenant.content.highlights?.join(' / ') ?? this.tenant.description ?? '';
  }

  get galleryTitle(): string {
    if (this.tenant.category === 'hotel') {
      return 'A look around the property';
    }

    if (this.tenant.category === 'bike-wash') {
      return 'Before, foam, finish';
    }

    return 'Inside the experience';
  }

  galleryImage(index: number): string {
    const category = this.tenant.category;
    const images: Record<string, string[]> = {
      'bike-wash': [
        'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80'
      ],
      hotel: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80'
      ],
      spa: [
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80'
      ],
      'home-tuition': [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80'
      ]
    };

    return images[category]?.[index % images[category].length] ?? this.tenant.coverImage ?? '';
  }
}
