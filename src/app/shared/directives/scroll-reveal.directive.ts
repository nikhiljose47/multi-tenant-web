import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

/**
 * Adds an `is-revealed` class the first time the host element scrolls into view.
 * Always runs — whether it produces any visible change is gated in CSS by the
 * `[data-scroll-reveal="on"]` attribute TenantThemeService sets from the active
 * archetype's `motion.scrollReveal` token (see archetype-tokens.scss). Archetypes
 * with scrollReveal off render sections visible immediately, same as before this existed.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('is-revealed');
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
