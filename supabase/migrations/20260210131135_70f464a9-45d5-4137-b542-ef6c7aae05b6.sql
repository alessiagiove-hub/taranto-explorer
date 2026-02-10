
-- Create venues table
CREATE TABLE public.venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Eat', 'Drink', 'Beach', 'Experiences', 'Shopping', 'Services')),
  description TEXT NOT NULL,
  description_it TEXT NOT NULL DEFAULT '',
  rating FLOAT NOT NULL DEFAULT 0,
  price_level TEXT NOT NULL CHECK (price_level IN ('€', '€€', '€€€')),
  image_url TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  google_maps_link TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  zone TEXT NOT NULL CHECK (zone IN ('Taranto Centro', 'Città Vecchia', 'Pulsano/Litoranea', 'San Vito')),
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_hero BOOLEAN NOT NULL DEFAULT false,
  special_offer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read, no auth needed for a tourist app)
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- Public read access (tourist app, no login required)
CREATE POLICY "Venues are publicly readable"
  ON public.venues FOR SELECT
  USING (true);
