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

export async function fetchList(contentType) {
  const { items } = await contentful.getEntries({
    content_type: contentType,
    order: contentType === 'caseStudy' ? '-fields.year' : undefined,
    select: ['fields.title', 'fields.summary', 'fields.slug', 'fields.coverImage'],
    include: 1,
  })
  return items.map(({ fields: f }) => ({
    title: f.title,
    slug: f.slug,
    summary: f.summary,
    coverImage: assetUrl(f.coverImage),
  }))
}

export async function fetchEntry(contentType, slug) {
  const { items } = await contentful.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1,
    include: 10,
  })
  const entry = items[0]
  if (!entry) return null

  const f = entry.fields
  if (contentType === 'sideProject') {
    return {
      title: f.title,
      slug: f.slug,
      tags: f.tags,
      summary: f.summary,
      coverImage: assetUrl(f.coverImage),
      body: f.body,
      link: f.link,
    }
  }
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
