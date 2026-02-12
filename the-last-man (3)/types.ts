export interface DevotionalContent {
  date: string;
  title: string;
  scripture: string;
  body: string;
  confession: string;
  sourceUrls?: string[];
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
}

export enum SocialPlatform {
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  WhatsApp = 'WhatsApp',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Email = 'Email'
}

export interface UserShareData {
  image: File | null;
  message: string;
}