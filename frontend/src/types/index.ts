export type UserRole = 'USER' | 'RESTAURANT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
}

export interface FoodListing {
  id: string;
  restaurantId: string;
  restaurantName: string;
  foodItem: string;
  quantity: string;
  description?: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  location: string;
  status: 'AVAILABLE' | 'RESERVED' | 'COMPLETED';
  createdAt: string;
}

export interface FoodRequest {
  id: string;
  userId: string;
  userName: string;
  listingId: string;
  foodItem: string;
  quantity: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  requestedAt: string;
  pickupTime?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
}
