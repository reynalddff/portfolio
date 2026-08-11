import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const CASE_STUDY_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  client,
  role,
  year,
  tags,
  summary,
  "coverImage": coverImage.asset->url,
  body,
  metrics,
  "gallery": gallery[].asset->url
}`

export function fetchCaseStudy(slug) {
  return sanity.fetch(CASE_STUDY_QUERY, { slug })
}
