-- Run this once in your Supabase project's SQL Editor (Supabase dashboard -> SQL Editor -> New query).
-- Creates the comments table for the blog and locks it down so anonymous
-- visitors can post/read comments and replies, but cannot edit or delete
-- anyone's comment (including their own) once posted.

create extension if not exists "pgcrypto";

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  parent_id uuid references public.comments(id) on delete cascade,
  author_name text not null default 'Anonymous',
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_post_slug_idx on public.comments (post_slug);
create index if not exists comments_parent_id_idx on public.comments (parent_id);

alter table public.comments enable row level security;

drop policy if exists "Public can read comments" on public.comments;
create policy "Public can read comments"
  on public.comments for select
  using (true);

drop policy if exists "Public can insert comments" on public.comments;
create policy "Public can insert comments"
  on public.comments for insert
  with check (
    char_length(trim(body)) > 0
    and char_length(body) <= 2000
    and char_length(author_name) <= 60
  );

-- No update/delete policies are defined on purpose: once posted, a comment
-- can only be removed by you, directly from the Supabase Table Editor.
