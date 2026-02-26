-- ============================================================
-- Kyrant Wears 2.0 — Future Tables (SCAFFOLDED — DO NOT USE YET)
-- ============================================================
-- These are schema-only definitions for future features.
-- They are NOT active. Run them when the corresponding
-- backend features are ready to be implemented.
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- PRODUCTS table
-- Stores products listed by merchants using designer artwork
-- ──────────────────────────────────────────────────────────────
/*
CREATE TABLE IF NOT EXISTS public.products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  design_id       UUID,  -- FK to a future designs table
  title           TEXT NOT NULL,
  description     TEXT,
  base_price      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  selling_price   NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency        TEXT NOT NULL DEFAULT 'NGN',
  category        TEXT NOT NULL DEFAULT 'general',
  sizes           TEXT[] DEFAULT '{}',
  colors          TEXT[] DEFAULT '{}',
  image_urls      TEXT[] DEFAULT '{}',
  is_published    BOOLEAN NOT NULL DEFAULT false,
  stock_quantity  INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Merchants can CRUD their own products
CREATE POLICY "Merchants manage own products"
  ON public.products FOR ALL
  USING (auth.uid() = merchant_id)
  WITH CHECK (auth.uid() = merchant_id);

-- Anyone authenticated can read published products
CREATE POLICY "Authenticated users read published products"
  ON public.products FOR SELECT
  USING (is_published = true);
*/

-- ──────────────────────────────────────────────────────────────
-- ORDERS table
-- Tracks customer purchases
-- ──────────────────────────────────────────────────────────────
/*
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount    NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency        TEXT NOT NULL DEFAULT 'NGN',
  shipping_address JSONB,
  items           JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Buyers can read their own orders
CREATE POLICY "Buyers read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = buyer_id);

-- Admins can read all orders (uses SECURITY DEFINER helper)
CREATE POLICY "Admins read all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin());
*/

-- ──────────────────────────────────────────────────────────────
-- PAYMENTS table
-- Records payment transactions for orders
-- ──────────────────────────────────────────────────────────────
/*
CREATE TABLE IF NOT EXISTS public.payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  payer_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  provider        TEXT NOT NULL DEFAULT 'paystack'
                  CHECK (provider IN ('paystack', 'flutterwave', 'stripe', 'manual')),
  provider_ref    TEXT,
  amount          NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency        TEXT NOT NULL DEFAULT 'NGN',
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own payments
CREATE POLICY "Users read own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = payer_id);

-- Admins can read all payments (uses SECURITY DEFINER helper)
CREATE POLICY "Admins read all payments"
  ON public.payments FOR SELECT
  USING (public.is_admin());
*/

-- ──────────────────────────────────────────────────────────────
-- ANALYTICS_EVENTS table
-- Captures user activity for dashboards and insights
-- ──────────────────────────────────────────────────────────────
/*
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type      TEXT NOT NULL,
  event_data      JSONB DEFAULT '{}',
  page_url        TEXT,
  referrer        TEXT,
  user_agent      TEXT,
  ip_address      INET,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Only admins can read analytics (uses SECURITY DEFINER helper)
CREATE POLICY "Admins read analytics"
  ON public.analytics_events FOR SELECT
  USING (public.is_admin());

-- Authenticated users can insert their own events
CREATE POLICY "Users insert own events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);
*/
