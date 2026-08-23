import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BusinessService, TenantBusiness, TenantOffer, TenantSection } from '../../core/tenant/tenant.models';
import { TenantCardComponent } from '../../shared/components/tenant-card/tenant-card.component';
import { MEDIA_PLACEHOLDER, menuItemSlug, offerPlaceholderPath, offerTypePlaceholderPath, tenantMediaPath } from '../../core/media/media-path';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CATEGORY_ARCHETYPES } from '../../core/tenant/archetype-recommendations';
import { SECTION_VARIANTS } from '../../core/tenant/section-variants';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, RouterLink, TenantCardComponent, ScrollRevealDirective],
  template: `
    <section [id]="type" class="section" [class]="'section-' + type" appScrollReveal>
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
              <img [src]="galleryImage(i)" [alt]="galleryCaption(item) ?? tenant.businessName" loading="lazy" (error)="onImgError($event)">
              <figcaption *ngIf="galleryCaption(item)">{{ galleryCaption(item) }}</figcaption>
            </figure>
          </div>
        </div>

        <div *ngSwitchCase="'testimonials'" class="section-inner">
          <div class="section-heading">
            <span class="section-kicker">Reviews</span>
            <h2>{{ tenant.rating }} stars from {{ tenant.reviewCount }} customers</h2>
          </div>
          <div class="testimonial-grid" [class]="testimonialVariant">
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
          <div class="location-actions">
            <a class="button" [routerLink]="['/', tenant.code, tenant.username, 'location']">View map</a>
            <a class="button secondary" [href]="directionsHref" target="_blank" rel="noopener">Open directions</a>
          </div>
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

        <div *ngSwitchCase="'offers'" class="section-inner">
          <div class="section-heading offers-heading">
            <div>
              <span class="section-kicker">Offers</span>
              <h2>Deals worth ordering for</h2>
            </div>
            <a class="rail-see-all" [routerLink]="['/', tenant.code, tenant.username, 'offers']">See all offers &rarr;</a>
          </div>
          <div class="offers-row" [class]="offerVariant">
            <article class="offer-card" *ngFor="let offer of tenant.content.offers; let i = index">
              <div class="offer-media">
                <img [src]="offerImage(offer, i)" [alt]="offer.title" loading="lazy" (error)="onOfferImgError($event, offer)">
                <span *ngIf="offer.tag" class="offer-tag-chip">{{ offer.tag }}</span>
                <div class="offer-pill">
                  <strong class="offer-pill-title">{{ offer.title }}</strong>
                  <span *ngIf="offer.code" class="offer-pill-code">{{ offer.code }}</span>
                </div>
              </div>
              <div class="offer-body" *ngIf="offer.description">
                <p>{{ offer.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <div *ngSwitchCase="'menu'" class="section-inner menu-section">
          <div class="section-heading">
            <span class="section-kicker">Menu</span>
            <h2>What are you craving today?</h2>
            <p *ngIf="tenant.content.orderNote">{{ tenant.content.orderNote }}</p>
          </div>

          <div class="menu-tabs" *ngIf="menuGroups.length > 1">
            <button
              type="button"
              *ngFor="let group of menuGroups"
              class="menu-tab"
              [class.active]="activeGroup === group"
              (click)="activeGroup = group"
            >{{ group }}</button>
          </div>

          <div class="menu-grid">
            <article class="menu-card" *ngFor="let item of filteredMenuItems">
              <div class="menu-card-media">
                <img [src]="menuImage(item)" [alt]="item.name" loading="lazy" (error)="onImgError($event)">
                <span *ngIf="item.veg !== undefined" class="veg-dot" [class.veg]="item.veg" [class.non-veg]="!item.veg" [attr.aria-label]="item.veg ? 'Veg' : 'Non-veg'"></span>
                <span *ngIf="item.highlight" class="tag menu-badge">{{ item.highlight }}</span>
              </div>
              <div class="menu-card-body">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <div class="card-meta">
                  <strong *ngIf="item.price">{{ item.price }}</strong>
                  <div class="qty-stepper" *ngIf="qtyFor(item) === 0; else stepper">
                    <button type="button" class="add-btn" (click)="addItem(item)">Add</button>
                  </div>
                  <ng-template #stepper>
                    <div class="qty-stepper active">
                      <button type="button" (click)="removeItem(item)" aria-label="Remove one">-</button>
                      <span>{{ qtyFor(item) }}</span>
                      <button type="button" (click)="addItem(item)" aria-label="Add one">+</button>
                    </div>
                  </ng-template>
                </div>
              </div>
            </article>
          </div>

          <div class="cart-bar" *ngIf="cartCount > 0">
            <div class="cart-summary">
              <strong>{{ cartCount }} item<span *ngIf="cartCount > 1">s</span></strong>
              <span *ngIf="cartTotal">&#8377;{{ cartTotal }}</span>
            </div>
            <a class="button" [href]="cartOrderHref" target="_blank" rel="noopener">{{ tenant.whatsapp ? 'Order on WhatsApp' : 'Checkout' }}</a>
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

  activeGroup = 'All';
  private readonly cart = new Map<string, number>();

  get archetypeId() {
    return this.tenant.layoutStyle ?? CATEGORY_ARCHETYPES[this.tenant.category].default;
  }

  get testimonialVariant() {
    return SECTION_VARIANTS[this.archetypeId].testimonials;
  }

  get offerVariant() {
    return SECTION_VARIANTS[this.archetypeId].offers;
  }

  get menuGroups(): string[] {
    const fromServices = Array.from(new Set(this.tenant.services?.map((service) => service.group).filter(Boolean) as string[]));
    const groups = this.tenant.content.menuGroups?.length ? this.tenant.content.menuGroups : fromServices;
    return groups.length > 1 ? ['All', ...groups] : groups;
  }

  get filteredMenuItems() {
    if (this.activeGroup === 'All' || !this.tenant.services?.some((service) => service.group)) {
      return this.tenant.services ?? [];
    }

    return (this.tenant.services ?? []).filter((service) => service.group === this.activeGroup);
  }

  qtyFor(item: BusinessService): number {
    return this.cart.get(item.name) ?? 0;
  }

  addItem(item: BusinessService): void {
    this.cart.set(item.name, (this.cart.get(item.name) ?? 0) + 1);
  }

  removeItem(item: BusinessService): void {
    const next = (this.cart.get(item.name) ?? 0) - 1;
    if (next <= 0) {
      this.cart.delete(item.name);
    } else {
      this.cart.set(item.name, next);
    }
  }

  get cartCount(): number {
    return Array.from(this.cart.values()).reduce((sum, qty) => sum + qty, 0);
  }

  get cartTotal(): number {
    return (this.tenant.services ?? []).reduce((sum, service) => {
      const qty = this.cart.get(service.name) ?? 0;
      const price = parseInt((service.price ?? '').replace(/[^\d]/g, ''), 10);
      return sum + (qty && !Number.isNaN(price) ? qty * price : 0);
    }, 0);
  }

  get cartOrderHref(): string {
    const lines = (this.tenant.services ?? [])
      .filter((service) => this.qtyFor(service) > 0)
      .map((service) => `${this.qtyFor(service)} x ${service.name}`);
    const message = encodeURIComponent(`Hi ${this.tenant.businessName}, I'd like to order:\n${lines.join('\n')}`);

    return this.tenant.whatsapp ? `https://wa.me/${this.tenant.whatsapp.replace(/[^\d]/g, '')}?text=${message}` : '#contact';
  }

  menuImage(item: BusinessService): string {
    if (item.image) {
      return item.image;
    }

    return tenantMediaPath(this.tenant.category, this.tenant.code, `menu/${menuItemSlug(item.name)}`);
  }

  offerImage(offer: TenantOffer, index: number): string {
    if (offer.image) {
      return offer.image;
    }

    return tenantMediaPath(this.tenant.category, this.tenant.code, `offer-${index + 1}`);
  }

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
    if (item?.startsWith('http') || item?.startsWith('/')) {
      return item;
    }

    return tenantMediaPath(this.tenant.category, this.tenant.code, `gallery-${index + 1}`);
  }

  galleryCaption(item: string): string | null {
    return item.startsWith('http') || item.startsWith('/') ? null : item;
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = MEDIA_PLACEHOLDER;
  }

  onOfferImgError(event: Event, offer: TenantOffer): void {
    const img = event.target as HTMLImageElement;
    const category = this.tenant.category ?? 'other';
    const stage = img.dataset['fallback'];

    if (!stage && offer.offerType) {
      img.dataset['fallback'] = 'type';
      img.src = offerTypePlaceholderPath(category, offer.offerType);
    } else if (stage !== 'category' && stage !== 'flat') {
      img.dataset['fallback'] = 'category';
      img.src = offerPlaceholderPath(category);
    } else {
      img.dataset['fallback'] = 'flat';
      img.src = MEDIA_PLACEHOLDER;
    }
  }
}
