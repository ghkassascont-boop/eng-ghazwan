-- Harmony Decor CMS migration (safe to run repeatedly)
create table if not exists public.site_content (
  id text primary key default 'global',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.site_content(id, content) values ('global', '{}'::jsonb)
on conflict (id) do nothing;
alter table public.site_content enable row level security;
drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content" on public.site_content for select to anon, authenticated using (true);
drop policy if exists "Admins manage site content" on public.site_content;
create policy "Admins manage site content" on public.site_content for all to authenticated
using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()))
with check (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));

-- Public image bucket for website media. Admin writes are restricted to admin_users.
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public=true, file_size_limit=10485760, allowed_mime_types=array['image/jpeg','image/png','image/webp','image/avif'];
drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media" on storage.objects for select to anon, authenticated using (bucket_id='site-media');
drop policy if exists "Admins upload site media" on storage.objects;
create policy "Admins upload site media" on storage.objects for insert to authenticated with check (
 bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid())
);
drop policy if exists "Admins update site media" on storage.objects;
create policy "Admins update site media" on storage.objects for update to authenticated using (
 bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid())
) with check (bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
drop policy if exists "Admins delete site media" on storage.objects;
create policy "Admins delete site media" on storage.objects for delete to authenticated using (
 bucket_id='site-media' and exists(select 1 from public.admin_users a where a.user_id=auth.uid())
);
