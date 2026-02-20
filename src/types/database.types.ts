/**
 * Database type definitions for Supabase.
 *
 * These types mirror the Supabase schema so the frontend gets
 * full TypeScript autocompletion and type safety for all DB operations.
 *
 * In the future, generate these automatically with:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/types/database.types.ts
 */

export type UserRole = "designer" | "merchant" | "admin";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          // role is intentionally omitted — users cannot change their own role
          updated_at?: string;
        };
      };

      // ── Future tables (not yet created in DB) ──
      // Uncomment these when the corresponding SQL migrations are run

      /*
      products: {
        Row: {
          id: string;
          merchant_id: string;
          design_id: string | null;
          title: string;
          description: string | null;
          base_price: number;
          selling_price: number;
          currency: string;
          category: string;
          sizes: string[];
          colors: string[];
          image_urls: string[];
          is_published: boolean;
          stock_quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          merchant_id: string;
          title: string;
          description?: string | null;
          base_price: number;
          selling_price: number;
          currency?: string;
          category?: string;
          sizes?: string[];
          colors?: string[];
          image_urls?: string[];
          is_published?: boolean;
          stock_quantity?: number;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "merchant_id" | "created_at">>;
      };

      orders: {
        Row: {
          id: string;
          buyer_id: string;
          status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
          total_amount: number;
          currency: string;
          shipping_address: Record<string, unknown> | null;
          items: Record<string, unknown>[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          buyer_id: string;
          total_amount: number;
          currency?: string;
          shipping_address?: Record<string, unknown>;
          items: Record<string, unknown>[];
        };
        Update: Partial<Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "buyer_id" | "created_at">>;
      };

      payments: {
        Row: {
          id: string;
          order_id: string;
          payer_id: string;
          provider: "paystack" | "flutterwave" | "stripe" | "manual";
          provider_ref: string | null;
          amount: number;
          currency: string;
          status: "pending" | "success" | "failed" | "refunded";
          metadata: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          order_id: string;
          payer_id: string;
          provider?: string;
          amount: number;
          currency?: string;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["payments"]["Row"], "id" | "order_id" | "payer_id" | "created_at">>;
      };

      analytics_events: {
        Row: {
          id: string;
          user_id: string | null;
          event_type: string;
          event_data: Record<string, unknown>;
          page_url: string | null;
          referrer: string | null;
          user_agent: string | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          user_id?: string | null;
          event_type: string;
          event_data?: Record<string, unknown>;
          page_url?: string | null;
          referrer?: string | null;
        };
        Update: never; // analytics events are immutable
      };
      */
    };
    Enums: {
      user_role: UserRole;
    };
  };
}
