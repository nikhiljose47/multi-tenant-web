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

    if (this.tenant.category === 'food') {
      return 'A taste of what’s inside';
    }

    return 'Inside the experience';
  }

  galleryImage(index: number): string {
    const item = this.tenant.content.gallery?.[index];
    if (item?.startsWith('http')) {
      return item;
    }

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
      ],
      food: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80'
      ],
      shop: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=900&q=80'
      ],
      auto: [
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80'
      ],
      service: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1581093458791-9d42e3f39938?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1581091012184-5c1a4b6e3f4b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=900&q=80'
      ],
      beauty: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1522337184243-52ba9ef8a752?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1519415510236-718bdfcd89c1?auto=format&fit=crop&w=900&q=80'
      ],
      health: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=900&q=80'
      ],
      fitness: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80'
      ],
      learn: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80'
      ],
      space: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'
      ],
      travel: [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=900&q=80'
      ],
      event: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80'
      ],
      biz: [
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
      ]
    };

    return images[category]?.[index % images[category].length] ?? this.tenant.coverImage ?? '';
  }
}
