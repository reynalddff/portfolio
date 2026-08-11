import { createClient } from 'contentful'

export const contentful = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
})

function assetUrl(asset) {
  const url = asset?.fields?.file?.url
  return url ? `https:${url}` : undefined
}

export async function fetchCaseStudy(slug) {
  const { items } = await contentful.getEntries({
    content_type: 'caseStudy',
    'fields.slug': slug,
    limit: 1,
  })
  const entry = items[0]
  if (!entry) return null

  const f = entry.fields
  return {
    title: f.title,
    slug: f.slug,
    client: f.client,
    role: f.role,
    year: f.year,
    tags: f.tags,
    summary: f.summary,
    coverImage: assetUrl(f.coverImage),
    body: f.body,
    metrics: f.metrics,
    gallery: (f.gallery || []).map(assetUrl),
  }
}
