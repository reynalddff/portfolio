// Drop this into /studio/schemaTypes/caseStudy.js once the Studio project is scaffolded,
// then register it in schemaTypes/index.js and this folder can be deleted.
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() },
    { name: 'client', title: 'Client', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'summary', title: 'Summary', type: 'text', description: 'Shown on the homepage card and as the case-study intro.' },
    { name: 'coverImage', title: 'Cover image', type: 'image' },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Value', type: 'string' },
        ],
      }],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    },
    { name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image' }] },
  ],
}
