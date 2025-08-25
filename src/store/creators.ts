import { supabase } from '../client';
import type { Creator } from '../types';

const TABLE = 'creator';

// Map DB row (snake_case) → UI (camelCase)
function mapRow(row: any): Creator {
  return {
    id: String(row.id),
    name: row.name,
    url: row.url,
    description: row.description ?? '',
    imageURL: row.imageURL ?? undefined,
  };
}

function asNumericId(id: string | number) {
  return typeof id === 'string' ? Number(id) : id;
}

export async function listCreators(): Promise<Creator[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getCreator(id: string): Promise<Creator | undefined> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

export async function addCreator(input: Omit<Creator, 'id'>): Promise<Creator> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      name: input.name,
      url: input.url,
      description: input.description,
      imageURL: input.imageURL,
    })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function updateCreator(
  id: string,
  patch: Partial<Omit<Creator, 'id'>>
): Promise<Creator | undefined> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      name: patch.name,
      url: patch.url,
      description: patch.description,
      imageURL: patch.imageURL,
    })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

export async function deleteCreator(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
