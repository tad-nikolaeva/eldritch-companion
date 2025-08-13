-- Profiles table mapped to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username varchar(50) not null,
  first_name varchar(100),
  last_name varchar(100),
  avatar text,
  role varchar(20) not null default 'user',
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.profiles enable row level security;

create policy "Enable read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Enable update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Characters
create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name varchar(100) not null,
  occupation varchar(100),
  age int,
  description text,
  backstory text,
  strength int default 0,
  constitution int default 0,
  power int default 0,
  dexterity int default 0,
  appearance int default 0,
  size int default 0,
  intelligence int default 0,
  education int default 0,
  hit_points int default 0,
  sanity int default 0,
  magic_points int default 0,
  luck int default 0,
  skills jsonb default '[]'::jsonb,
  equipment jsonb default '[]'::jsonb,
  notes text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.characters enable row level security;

create policy "Characters are visible to owners" on public.characters
  for select using (user_id = auth.uid());

create policy "Owners can insert characters" on public.characters
  for insert with check (user_id = auth.uid());

create policy "Owners can update characters" on public.characters
  for update using (user_id = auth.uid());

create policy "Owners can delete characters" on public.characters
  for delete using (user_id = auth.uid());

-- Sessions
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  keeper_id uuid not null references public.profiles(id) on delete cascade,
  title varchar(200) not null,
  description text,
  scenario varchar(200),
  participants jsonb default '[]'::jsonb,
  current_scene text,
  notes text,
  handouts jsonb default '[]'::jsonb,
  status varchar(20) not null default 'planning',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.sessions enable row level security;

create policy "Sessions visible to keeper" on public.sessions
  for select using (keeper_id = auth.uid());

create policy "Keeper can insert sessions" on public.sessions
  for insert with check (keeper_id = auth.uid());

create policy "Keeper can update sessions" on public.sessions
  for update using (keeper_id = auth.uid());

create policy "Keeper can delete sessions" on public.sessions
  for delete using (keeper_id = auth.uid());


