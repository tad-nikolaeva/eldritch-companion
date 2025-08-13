// deno-lint-ignore-file no-explicit-any
// @ts-nocheck
/* eslint-disable */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const handler = async (req: Request): Promise<Response> => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Supabase env is not configured' }), { status: 500 })
  }

  const authHeader = req.headers.get('Authorization')
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: authHeader ?? '' } },
  })

  const { data: userRes } = await supabase.auth.getUser()
  const userId = userRes.user?.id
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const [{ count: charactersCount }, { count: sessionsCount }] = await Promise.all([
    supabase.from('characters').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('sessions').select('*', { count: 'exact', head: true }).eq('keeper_id', userId),
  ])

  const body = {
    charactersCount: charactersCount ?? 0,
    sessionsCount: sessionsCount ?? 0,
    scenariosCount: 1,
    sanityLevel: 100,
  }

  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
  })
}

Deno.serve(handler)


