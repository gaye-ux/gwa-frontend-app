import { BE } from './be';
import { TicketTier, TicketPurchase } from './types';
import { mockTicketPurchases } from './data';

export interface TicketTierData {
  id: string;
  name: string;
  price: number;
  currency: string;
  benefits: string[];
  seats: number;
  available: number;
}

export interface CheckoutPayload {
  eventId: string;
  ticketTierId: string;
  quantity: number;
}

export interface PurchaseResponse {
  purchase: {
    id: string;
    userId: string;
    eventId: string;
    ticketTierId: string;
    quantity: number;
    totalPrice: number;
    status: string;
    qrCode: string;
    createdAt: string;
  };
}

// ── Fetch ticket tiers for an event ────────────────────

export async function fetchTicketTiers(eventId: string): Promise<TicketTier[]> {
  try {
    const res = await BE.get<{ ticketTiers: TicketTierData[] }>(`/tickets/tiers/${eventId}`);
    return res.ticketTiers.map((t, i) => ({
      id: t.id,
      name: t.name,
      price: `${t.currency || 'GMD'}${t.price}`,
      perks: t.benefits.join(' · '),
      available: t.available,
      total: t.seats,
      highlighted: i === 0 || t.name === 'VIP' || t.name === 'PREMIUM',
    }));
  } catch {
    // fallback: generate tiers from event endpoint
    try {
      const ev = await BE.get<{ event: any }>(`/events/${eventId}`);
      if (ev.event.ticketTiers) {
        return ev.event.ticketTiers.map((t: any, i: number) => ({
          id: t.id,
          name: t.name,
          price: `${t.currency || 'GMD'}${t.price}`,
          perks: (t.benefits || []).join(' · '),
          available: t.available,
          total: t.seats,
          highlighted: i === 0 || t.name === 'VIP' || t.name === 'PREMIUM',
        }));
      }
    } catch {}
    // ultimate fallback: mock tiers
    return [
      { id: 'vip-0', name: 'VIP', price: 'GMD2500', perks: 'Front Row · Meet & Greet · Merch Pack', available: 50, total: 50, highlighted: true },
      { id: 'prem-1', name: 'Premium', price: 'GMD1500', perks: 'Center Ring · Drinks Included', available: 120, total: 150, highlighted: false },
      { id: 'gen-2', name: 'General', price: 'GMD500', perks: 'Standard Seat', available: 300, total: 500, highlighted: false },
    ];
  }
}

// ── Purchase tickets ───────────────────────────────────

export async function purchaseTickets(payload: CheckoutPayload): Promise<PurchaseResponse> {
  const res = await BE.post<PurchaseResponse>('/tickets/purchase', payload);
  return res;
}

// ── Get my purchases ───────────────────────────────────

export async function fetchMyTickets(): Promise<TicketPurchase[]> {
  try {
    const res = await BE.get<{ purchases: any[] }>('/tickets/my');
    return res.purchases.map((p: any) => ({
      id: p.id,
      eventId: p.eventId,
      eventName: p.event?.title || 'GWA Event',
      eventDate: p.event?.date || p.createdAt,
      ticketTierId: p.ticketTierId,
      ticketName: p.ticketTier?.name || 'General',
      quantity: p.quantity,
      totalPrice: p.totalPrice,
      currency: p.ticketTier?.currency || 'GMD',
      status: p.status,
      qrCode: p.qrCode,
      purchasedAt: p.createdAt,
      venue: p.event?.venue || '',
      image: p.event?.imageUrl ? { uri: p.event.imageUrl } : require('@/assets/images/hero_fighters.png'),
    }));
  } catch {
    return mockTicketPurchases;
  }
}
