-- Applied to the Peak Prep Supabase project on 2026-10-20.
create table public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  diagnostic jsonb not null default '{}'::jsonb,
  avatar jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.user_state is 'Peak Prep: each learner''s saved progress, diagnostic results and avatar.';

alter table public.user_state enable row level security;

create policy "Learners read their own state" on public.user_state
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Learners create their own state" on public.user_state
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Learners update their own state" on public.user_state
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
