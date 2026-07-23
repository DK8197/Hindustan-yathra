export interface User {
  id: string;
  mobile: string; // +91XXXXXXXXXX
  name?: string;
  email?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  tourSlug: string;
  travelDate: string;
  travellers: number;
  status: 'enquiry' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  travelDate?: string;
  travellers?: number;
  message?: string;
  source: 'contact_form' | 'tour_enquiry' | 'whatsapp';
  createdAt: string;
  handled: boolean;
}

// JWT payload shape signed by /api/auth/verify-otp
export interface JwtPayload {
  sub: string; // user id
  mobile: string;
  role: 'customer' | 'admin';
  iat: number;
  exp: number;
}
