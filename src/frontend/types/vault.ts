export interface VaultItem {
  id: string;
  title: string;
  type: 'login' | 'card' | 'note' | 'identity';
  spaceId: string;
  isFavorite: boolean;
  lastUsed: Date;
  createdAt: Date;
  updatedAt: Date;
  data: LoginData | CardData | NoteData | IdentityData;
}

export interface LoginData {
  username: string;
  password: string;
  url: string;
  notes?: string;
  customFields?: CustomField[];
}

export interface CardData {
  cardholderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  notes?: string;
}

export interface NoteData {
  content: string;
}

export interface IdentityData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'password' | 'email' | 'url';
}

export interface Space {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
} 