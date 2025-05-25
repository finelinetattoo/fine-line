import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  setTitle(title: string): void {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'title', content: title });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
  }

  setDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });
  }

  setCanonicalURL(url?: string): void {
    if (!this.isBrowser) return;

    const canonicalUrl = url ?? this.document.URL;
    const head = this.document.getElementsByTagName('head')[0];
    let link: HTMLLinkElement | null = this.document.querySelector(
      "link[rel='canonical']"
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);

    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
  }

  setIndexFollow(index = true): void {
    const content = index ? 'index, follow' : 'noindex, nofollow';
    this.metaService.updateTag({ name: 'robots', content });
  }

  setImage(imageUrl: string): void {
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  setTwitterCard(type: 'summary' | 'summary_large_image' = 'summary'): void {
    this.metaService.updateTag({ name: 'twitter:card', content: type });
  }

  setAllSeoTags(config: {
    title: string;
    description: string;
    url?: string;
    image?: string;
    indexFollow?: boolean;
    twitterCardType?: 'summary' | 'summary_large_image';
  }): void {
    this.setTitle(config.title);
    this.setDescription(config.description);
    this.setCanonicalURL(config.url);
    this.setIndexFollow(config.indexFollow ?? true);
    if (config.image) this.setImage(config.image);
    this.setTwitterCard(config.twitterCardType);
  }
}
