create extension if not exists "pgcrypto";

-- Profiles table (optional display name)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  created_at timestamptz default timezone('utc', now())
);

-- Saved recipes
create table if not exists public.saved_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  recipe_id text not null,
  title text,
  meal_type text,
  cuisine text,
  diet text,
  servings int,
  prep_time text,
  cook_time text,
  ingredients text[],
  instructions text[],
  created_at timestamptz default timezone('utc', now()),
  unique (user_id, recipe_id)
);

-- Shopping list items
create table if not exists public.shopping_list_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  recipe_id text,
  recipe_title text,
  text text not null,
  checked boolean default false,
  created_at timestamptz default timezone('utc', now())
);

-- Enable row level security
alter table public.profiles enable row level security;
alter table public.saved_recipes enable row level security;
alter table public.shopping_list_items enable row level security;

-- Profiles policies
create policy "Profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);
create policy "Profiles are updatable by owner" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Profiles can be updated by owner" on public.profiles
  for update using (auth.uid() = id);

-- Saved recipes policies
create policy "Saved recipes selectable by owner" on public.saved_recipes
  for select using (auth.uid() = user_id);
create policy "Saved recipes insertable by owner" on public.saved_recipes
  for insert with check (auth.uid() = user_id);
create policy "Saved recipes updatable by owner" on public.saved_recipes
  for update using (auth.uid() = user_id);
create policy "Saved recipes deletable by owner" on public.saved_recipes
  for delete using (auth.uid() = user_id);

-- Shopping list policies
create policy "Shopping list selectable by owner" on public.shopping_list_items
  for select using (auth.uid() = user_id);
create policy "Shopping list insertable by owner" on public.shopping_list_items
  for insert with check (auth.uid() = user_id);
create policy "Shopping list updatable by owner" on public.shopping_list_items
  for update using (auth.uid() = user_id);
create policy "Shopping list deletable by owner" on public.shopping_list_items
  for delete using (auth.uid() = user_id);
