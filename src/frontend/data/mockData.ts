import { VaultItem, Space, LoginData, CardData, NoteData } from '../types/vault';

export const mockSpaces: Space[] = [
  {
    id: 'personal',
    name: 'Personal',
    icon: 'user',
    color: 'from-[#F15A24] to-[#FBB03B]',
    itemCount: 5
  },
  {
    id: 'work',
    name: 'Work',
    icon: 'briefcase',
    color: 'from-[#522785] to-[#29ABE2]',
    itemCount: 3
  },
  {
    id: 'family',
    name: 'Family',
    icon: 'home',
    color: 'from-[#ED1E79] to-[#FBB03B]',
    itemCount: 2
  }
];

export const mockVaultItems: VaultItem[] = [
  {
    id: '1',
    title: 'Gmail',
    type: 'login',
    spaceId: 'personal',
    isFavorite: true,
    lastUsed: new Date('2025-07-18T10:30:00'),
    createdAt: new Date('2025-07-01T09:00:00'),
    updatedAt: new Date('2025-07-18T10:30:00'),
    data: {
      username: 'user@gmail.com',
      password: 'SecurePass123!',
      url: 'https://gmail.com',
      notes: 'Main email account'
    } as LoginData
  },
  {
    id: '2',
    title: 'GitHub',
    type: 'login',
    spaceId: 'work',
    isFavorite: true,
    lastUsed: new Date('2025-07-17T16:45:00'),
    createdAt: new Date('2025-07-02T14:20:00'),
    updatedAt: new Date('2025-07-17T16:45:00'),
    data: {
      username: 'dev_user',
      password: 'GitH@b2025Secure',
      url: 'https://github.com',
      notes: 'Development account with 2FA enabled'
    } as LoginData
  },
  {
    id: '3',
    title: 'Netflix',
    type: 'login',
    spaceId: 'family',
    isFavorite: false,
    lastUsed: new Date('2025-07-16T20:15:00'),
    createdAt: new Date('2025-07-03T11:30:00'),
    updatedAt: new Date('2025-07-16T20:15:00'),
    data: {
      username: 'family@email.com',
      password: 'NetFlix2025!',
      url: 'https://netflix.com',
      notes: 'Family premium subscription'
    } as LoginData
  },
  {
    id: '4',
    title: 'Main Credit Card',
    type: 'card',
    spaceId: 'personal',
    isFavorite: false,
    lastUsed: new Date('2025-07-15T14:22:00'),
    createdAt: new Date('2025-07-04T10:15:00'),
    updatedAt: new Date('2025-07-15T14:22:00'),
    data: {
      cardholderName: 'John Doe',
      number: '**** **** **** 1234',
      expiryMonth: '12',
      expiryYear: '2027',
      cvv: '***',
      notes: 'Primary credit card for online purchases'
    } as CardData
  },
  {
    id: '5',
    title: 'Slack Workspace',
    type: 'login',
    spaceId: 'work',
    isFavorite: false,
    lastUsed: new Date('2025-07-14T09:10:00'),
    createdAt: new Date('2025-07-05T13:45:00'),
    updatedAt: new Date('2025-07-14T09:10:00'),
    data: {
      username: 'john.doe@company.com',
      password: 'Sl@ck2025Work',
      url: 'https://company.slack.com',
      notes: 'Team communication platform'
    } as LoginData
  },
  {
    id: '6',
    title: 'API Keys & Tokens',
    type: 'note',
    spaceId: 'work',
    isFavorite: true,
    lastUsed: new Date('2025-07-13T15:30:00'),
    createdAt: new Date('2025-07-06T16:20:00'),
    updatedAt: new Date('2025-07-13T15:30:00'),
    data: {
      content: `Development API Keys:
- OpenAI: sk-proj-xxxxxxxxxxxxx
- Stripe Test: sk_test_xxxxxxxxxxxxx
- AWS Access Key: AKIA4XXXXXXXXXXXXXXX
- Firebase Config: {apiKey: "AIzaSyXXXXXXXXXX"}

Note: These are development keys only!`
    } as NoteData
  },
  {
    id: '7',
    title: 'Amazon Prime',
    type: 'login',
    spaceId: 'personal',
    isFavorite: false,
    lastUsed: new Date('2025-07-12T18:45:00'),
    createdAt: new Date('2025-07-07T12:10:00'),
    updatedAt: new Date('2025-07-12T18:45:00'),
    data: {
      username: 'prime.user@email.com',
      password: 'Am@zon2025Prime',
      url: 'https://amazon.com',
      notes: 'Prime subscription with free shipping'
    } as LoginData
  },
  {
    id: '8',
    title: 'Family Banking',
    type: 'login',
    spaceId: 'family',
    isFavorite: false,
    lastUsed: new Date('2025-07-11T11:20:00'),
    createdAt: new Date('2025-07-08T11:20:00'),
    updatedAt: new Date('2025-07-11T11:20:00'),
    data: {
      username: 'family.savings',
      password: 'B@nk1ng2025Safe',
      url: 'https://bank.com',
      notes: 'Joint savings account'
    } as LoginData
  },
  {
    id: '9',
    title: 'Social Media Notes',
    type: 'note',
    spaceId: 'personal',
    isFavorite: false,
    lastUsed: new Date('2025-07-10T13:15:00'),
    createdAt: new Date('2025-07-09T14:30:00'),
    updatedAt: new Date('2025-07-10T13:15:00'),
    data: {
      content: `Social Media Strategy:
- Post frequency: 3x per week
- Best times: 9AM, 1PM, 7PM
- Hashtags: #tech #development #coding
- Content types: tutorials, tips, behind-the-scenes

Engagement goals:
- Increase followers by 20% this quarter
- Improve engagement rate to 5%`
    } as NoteData
  },
  {
    id: '10',
    title: 'Business Credit Card',
    type: 'card',
    spaceId: 'work',
    isFavorite: false,
    lastUsed: new Date('2025-07-09T16:40:00'),
    createdAt: new Date('2025-07-10T09:25:00'),
    updatedAt: new Date('2025-07-09T16:40:00'),
    data: {
      cardholderName: 'Company LLC',
      number: '**** **** **** 5678',
      expiryMonth: '08',
      expiryYear: '2027',
      cvv: '***',
      notes: 'Business expenses and software subscriptions'
    } as CardData
  }
];

// Helper function to get items by space
export function getItemsBySpace(spaceId: string): VaultItem[] {
  return mockVaultItems.filter(item => item.spaceId === spaceId);
}

// Helper function to get favorite items
export function getFavoriteItems(): VaultItem[] {
  return mockVaultItems.filter(item => item.isFavorite);
}

// Helper function to get recently used items
export function getRecentItems(limit: number = 5): VaultItem[] {
  return [...mockVaultItems]
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
    .slice(0, limit);
} 