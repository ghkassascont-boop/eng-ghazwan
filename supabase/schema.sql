-- Architecture / Civil Engineering Portfolio
-- Run this entire file in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Your Name',
  title_en text not null default 'Civil Engineer & Architect',
  title_ar text not null default 'مهندس مدني ومعماري',
  bio_en text not null default 'Architecture and engineering portfolio.',
  bio_ar text not null default 'معرض أعمال في الهندسة المدنية والعمارة.',
  email text, phone text, whatsapp text, instagram text, linkedin text,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  category_en text not null default 'Architecture',
  category_ar text not null default 'عمارة',
  summary_en text,
  summary_ar text,
  cover_image text,
  location text,
  year integer,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects(published, featured, created_at desc);
create index if not exists project_images_project_idx on public.project_images(project_id, sort_order);
create index if not exists messages_created_idx on public.messages(created_at desc);

alter table public.admin_users enable row level security;
alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.messages enable row level security;

-- Admin membership can only be checked for the signed-in user.
create policy "Admins read own membership" on public.admin_users for select to authenticated using (user_id = auth.uid());
create policy "Public can read profile" on public.profile for select to anon, authenticated using (true);
create policy "Admins manage profile" on public.profile for all to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()))
  with check (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));

create policy "Public read published projects" on public.projects for select to anon, authenticated using (published = true);
create policy "Admins read all projects" on public.projects for select to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins insert projects" on public.projects for insert to authenticated
  with check (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins update projects" on public.projects for update to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()))
  with check (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins delete projects" on public.projects for delete to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));

create policy "Public read images of published projects" on public.project_images for select to anon, authenticated
  using (exists(select 1 from public.projects p where p.id=project_id and p.published=true));
create policy "Admins manage project images" on public.project_images for all to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()))
  with check (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));

-- Public visitors can submit messages, but cannot read or edit them.
create policy "Anyone can submit contact message" on public.messages for insert to anon, authenticated with check (
  char_length(name) between 2 and 100 and char_length(email) <= 254 and char_length(message) between 10 and 5000
);
create policy "Admins read messages" on public.messages for select to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins delete messages" on public.messages for delete to authenticated
  using (exists(select 1 from public.admin_users a where a.user_id=auth.uid()));

insert into public.profile (full_name) select 'Your Name'
where not exists(select 1 from public.profile);

-- IMPORTANT: after creating your first user in Supabase Authentication,
-- insert its UUID below in SQL Editor:
-- insert into public.admin_users(user_id, role) values ('YOUR-AUTH-USER-UUID','admin');
