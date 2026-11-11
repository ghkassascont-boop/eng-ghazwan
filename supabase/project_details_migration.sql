-- Run once in Supabase SQL Editor after the original schema and CMS migration.
alter table public.projects add column if not exists project_type text;
alter table public.projects add column if not exists area_sqm numeric(12,2);
alter table public.projects add column if not exists duration text;
alter table public.projects add column if not exists story_en text;
alter table public.projects add column if not exists story_ar text;

-- Storage bucket for project and website images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media','site-media',true,15728640,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public=true, file_size_limit=15728640,
  allowed_mime_types=array['image/jpeg','image/png','image/webp','image/avif'];

-- Recreate storage policies safely.
drop policy if exists "Public read site media" on storage.objects;
drop policy if exists "Admins upload site media" on storage.objects;
drop policy if exists "Admins update site media" on storage.objects;
drop policy if exists "Admins delete site media" on storage.objects;
create policy "Public read site media" on storage.objects for select to anon, authenticated using (bucket_id='site-media');
create policy "Admins upload site media" on storage.objects for insert to authenticated with check (bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins update site media" on storage.objects for update to authenticated using (bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid())) with check (bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins delete site media" on storage.objects for delete to authenticated using (bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
