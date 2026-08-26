module.exports = function (migration) {
  const sideProject = migration
    .createContentType('sideProject')
    .name('Side Project')
    .displayField('title')

  sideProject.createField('title').name('Title').type('Symbol').required(true)
  sideProject.createField('slug').name('Slug').type('Symbol').required(true)
  sideProject.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' })
  sideProject.createField('summary').name('Summary').type('Text')
  sideProject.createField('coverImage').name('Cover Image').type('Link').linkType('Asset')
  sideProject.createField('body').name('Body').type('RichText')
  sideProject.createField('link').name('Link').type('Symbol')
}
