module.exports = function (migration) {
  const caseStudy = migration
    .createContentType('caseStudy')
    .name('Case Study')
    .displayField('title')

  caseStudy.createField('title').name('Title').type('Symbol').required(true)
  caseStudy.createField('slug').name('Slug').type('Symbol').required(true)
  caseStudy.createField('client').name('Client').type('Symbol')
  caseStudy.createField('role').name('Role').type('Symbol')
  caseStudy.createField('year').name('Year').type('Symbol')
  caseStudy.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' })
  caseStudy.createField('summary').name('Summary').type('Text')
  caseStudy.createField('coverImage').name('Cover Image').type('Link').linkType('Asset')
  caseStudy.createField('metrics').name('Metrics').type('Array').items({ type: 'Object' })
  caseStudy.createField('body').name('Body').type('RichText')
  caseStudy.createField('gallery').name('Gallery').type('Array').items({ type: 'Link', linkType: 'Asset' })
}
