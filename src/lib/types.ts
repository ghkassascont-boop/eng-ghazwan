export type Project = {
  id: string; slug: string; title_en: string; title_ar: string;
  category_en: string; category_ar: string; summary_en: string | null; summary_ar: string | null;
  cover_image: string | null; location: string | null; year: number | null;
  project_type?: string | null; area_sqm?: number | null; duration?: string | null; story_en?: string | null; story_ar?: string | null;
  featured: boolean; published: boolean; created_at: string;
};
export type Profile = {
  id: string; full_name: string; title_en: string; title_ar: string;
  bio_en: string; bio_ar: string; email: string | null; phone: string | null;
  whatsapp: string | null; instagram: string | null; linkedin: string | null;
};