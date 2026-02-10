import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Venue } from "@/data/types";

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: async (): Promise<Venue[]> => {
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .gte("rating", 4.5)
        .order("is_premium", { ascending: false })
        .order("rating", { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as Venue[];
    },
  });
}

export function useVenue(id: string | undefined) {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: async (): Promise<Venue | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as Venue | null;
    },
    enabled: !!id,
  });
}
