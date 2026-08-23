import { Component, inject, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantBusiness } from '../../../core/tenant/tenant.models';
import { TenantThemeService } from '../../../core/tenant/tenant-theme.service';
import { THEME_PRESETS, ThemeName } from '../../../core/tenant/theme-presets';
import { ARCHETYPE_TOKENS } from '../../../core/tenant/archetype-tokens';
import { ArchetypeId } from '../../../core/tenant/archetype.models';
import { CATEGORY_ARCHETYPES } from '../../../core/tenant/archetype-recommendations';
import { COMPOSITION_DISPLAY_NAME } from '../../../core/tenant/composition-tokens';
import { CompositionId } from '../../../core/tenant/composition.models';

// TEMPORARY dev tool — preview theme/font combinations live, per tenant. Safe to delete this component
// (and its one usage in site-shell.component.ts) once themes/fonts are finalized.

const FONT_OPTIONS: { label: string; value: string }[] = [
  { label: 'Poppins', value: 'Poppins, Arial, sans-serif' },
  { label: 'Quicksand', value: 'Quicksand, Arial, sans-serif' },
  { label: 'Fredoka', value: 'Fredoka, sans-serif' },
  { label: 'Nunito', value: 'Nunito, Arial, sans-serif' },
  { label: 'Playfair Display', value: '"Playfair Display", Georgia, serif' },
  { label: 'Baloo 2', value: '"Baloo 2", cursive' }
];

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <button type="button" class="ts-toggle" (click)="open = !open">🎨 Theme</button>

    <div class="ts-panel" *ngIf="open">
      <strong>Archetype</strong>
      <select [(ngModel)]="archetype" (ngModelChange)="applyArchetypePreset($event)">
        <option *ngFor="let id of archetypeIds" [value]="id">{{ ARCHETYPE_TOKENS[id].displayName }}</option>
      </select>

      <strong>Composition</strong>
      <select [(ngModel)]="composition" (ngModelChange)="applyCompositionPreset($event)">
        <option *ngFor="let id of compositionIds" [value]="id">{{ COMPOSITION_DISPLAY_NAME[id] }}</option>
      </select>

      <strong>Theme</strong>
      <div class="ts-swatches">
        <button
          type="button"
          *ngFor="let name of themeNames"
          class="ts-swatch"
          [style.background]="THEME_PRESETS[name].primary"
          [class.active]="activeTheme === name"
          [title]="name"
          (click)="applyThemePreset(name)"
        ></button>
      </div>

      <label>Heading font
        <select [(ngModel)]="heading" (ngModelChange)="applyFonts($event, body)">
          <option *ngFor="let f of fontOptions" [value]="f.value">{{ f.label }}</option>
        </select>
      </label>

      <label>Body font
        <select [(ngModel)]="body" (ngModelChange)="applyFonts(heading, $event)">
          <option *ngFor="let f of fontOptions" [value]="f.value">{{ f.label }}</option>
        </select>
      </label>

      <button type="button" class="ts-reset" (click)="reset()">Reset to tenant default</button>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 14px;
      right: 14px;
      z-index: 100;
      font-family: Arial, sans-serif;
      font-size: 13px;
    }

    .ts-toggle {
      padding: 8px 14px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 999px;
      background: #fff;
      color: #111;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .ts-panel {
      margin-top: 8px;
      display: grid;
      gap: 10px;
      padding: 14px;
      width: 220px;
      border-radius: 12px;
      background: #fff;
      color: #111;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }

    .ts-swatches {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .ts-swatch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .ts-swatch.active {
      border-color: #111;
    }

    label {
      display: grid;
      gap: 4px;
      font-weight: 600;
    }

    select {
      padding: 6px;
      border-radius: 6px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .ts-reset {
      padding: 6px 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      background: #f5f5f5;
      cursor: pointer;
    }
  `]
})
export class ThemeSwitcherComponent implements OnInit {
  @Input({ required: true }) tenant!: TenantBusiness;

  private readonly themeService = inject(TenantThemeService);

  readonly THEME_PRESETS = THEME_PRESETS;
  readonly themeNames = Object.keys(THEME_PRESETS) as ThemeName[];
  readonly fontOptions = FONT_OPTIONS;
  readonly ARCHETYPE_TOKENS = ARCHETYPE_TOKENS;
  readonly archetypeIds = Object.keys(ARCHETYPE_TOKENS) as ArchetypeId[];
  readonly COMPOSITION_DISPLAY_NAME = COMPOSITION_DISPLAY_NAME;
  readonly compositionIds = Object.keys(COMPOSITION_DISPLAY_NAME) as CompositionId[];

  open = false;
  activeTheme: ThemeName | null = null;
  heading = '';
  body = '';
  archetype: ArchetypeId = 'modern';
  composition: CompositionId = 'balanced';
  private originalLayoutStyle: ArchetypeId | undefined;
  private originalComposition: CompositionId | undefined;

  ngOnInit(): void {
    this.heading = this.tenant.theme.headingFont;
    this.body = this.tenant.theme.bodyFont;
    this.originalLayoutStyle = this.tenant.layoutStyle;
    this.originalComposition = this.tenant.composition;
    this.archetype = this.tenant.layoutStyle ?? CATEGORY_ARCHETYPES[this.tenant.category].default;
    this.composition = this.tenant.composition ?? 'balanced';
  }

  applyThemePreset(name: ThemeName): void {
    this.activeTheme = name;
    const preset = THEME_PRESETS[name];
    this.heading = preset.headingFont;
    this.body = preset.bodyFont;
    this.themeService.applyTheme(preset);
  }

  applyFonts(heading: string, body: string): void {
    this.heading = heading;
    this.body = body;
    this.activeTheme = null;
    this.themeService.setFonts(heading, body);
  }

  applyArchetypePreset(id: ArchetypeId): void {
    this.archetype = id;
    // Mutates the shared tenant object so ArchetypeLayoutComponent's heroVariant getter
    // (reading the same tenant reference) re-renders the correct hero shape on next CD tick.
    this.tenant.layoutStyle = id;
    this.themeService.applyArchetype(ARCHETYPE_TOKENS[id]);
  }

  applyCompositionPreset(id: CompositionId): void {
    this.composition = id;
    // Same mutate-the-shared-object trick as applyArchetypePreset — ArchetypeLayoutComponent's
    // orderedSections getter reads this same tenant reference and re-renders on next CD tick.
    this.tenant.composition = id;
  }

  reset(): void {
    this.activeTheme = null;
    this.heading = this.tenant.theme.headingFont;
    this.body = this.tenant.theme.bodyFont;
    this.tenant.layoutStyle = this.originalLayoutStyle;
    this.tenant.composition = this.originalComposition;
    this.archetype = this.tenant.layoutStyle ?? CATEGORY_ARCHETYPES[this.tenant.category].default;
    this.composition = this.tenant.composition ?? 'balanced';
    this.themeService.applyTenant(this.tenant);
  }
}
