import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BASE_URL = 'https://mahimsky.online'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Static pages
    const staticUrls: SitemapUrl[] = [
      { loc: `${BASE_URL}/`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '1.0' },
      { loc: `${BASE_URL}/experiments`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' },
      { loc: `${BASE_URL}/earn`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' },
      { loc: `${BASE_URL}/investments`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '0.7' },
      { loc: `${BASE_URL}/owner`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.6' },
    ]

    // Fetch earn posts with slugs
    const { data: earnPosts, error: earnError } = await supabase
      .from('earn')
      .select('slug, updated_at, created_at')
      .not('slug', 'is', null)

    if (earnError) {
      console.error('Error fetching earn posts:', earnError)
    }

    // Fetch experiment posts with slugs
    const { data: experimentPosts, error: expError } = await supabase
      .from('experiments')
      .select('slug, updated_at, created_at')
      .not('slug', 'is', null)

    if (expError) {
      console.error('Error fetching experiment posts:', expError)
    }

    // Add dynamic earn URLs
    const earnUrls: SitemapUrl[] = (earnPosts || []).map((post) => ({
      loc: `${BASE_URL}/earn/${post.slug}`,
      lastmod: (post.updated_at || post.created_at || new Date().toISOString()).split('T')[0],
      changefreq: 'weekly',
      priority: '0.7',
    }))

    // Add dynamic experiment URLs
    const experimentUrls: SitemapUrl[] = (experimentPosts || []).map((post) => ({
      loc: `${BASE_URL}/experiments/${post.slug}`,
      lastmod: (post.updated_at || post.created_at || new Date().toISOString()).split('T')[0],
      changefreq: 'weekly',
      priority: '0.7',
    }))

    // Combine all URLs
    const allUrls = [...staticUrls, ...earnUrls, ...experimentUrls]

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Sitemap generation error:', error)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})