var keystone = require('keystone')
var Types = keystone.Field.Types

// Base Model for Updates and Documents (anything attached the pages from Page Model)

var PagePost = new keystone.List('PagePost', {
  map: { name: 'name' , state: 'state'},
  autokey: { path: 'slug', from: 'name', unique: true },
  defaultSort: '-publishedDate'
})

PagePost.add(
  {
    name: { type: Types.Text, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', required: true},
    author: { type: Types.Relationship, ref: 'Member', many: false},
    publishedDate: { type: Types.Datetime, dependsOn: { state: 'published' }, noedit: true },
    revisedDate: { type: Types.Datetime, dependsOn: { state: 'published' }, noedit: true },
  },
  'Content', {
    preview: {type: Types.Html, wysiwyg: true, height: 150 },
    html: { type: Types.Html, wysiwyg: true, height: 400 },
    markdown: { type: Types.Markdown },
  }
  // {
  //   tags: { type: Types.Relationship, ref: 'Tag', many: true},
  // }
)

PagePost.schema.methods.isPublished = function() {
    return this.state == 'published';
}

PagePost.schema.pre('save', function(next) {
    if (this.isModified('state') && this.isPublished() && !this.publishedDate) {
        this.publishedDate = new Date();
    }
    next();
});

PagePost.schema.pre('save', function(next) {
    if (this.isModified() && this.isPublished()) {
        this.revisedDate = new Date();
    }
    next();
});

PagePost.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
PagePost.register()


// Model for Update

var Update = new keystone.List('Update',{
  inherits: PagePost,
})

Update.add(
  'Related', {
  image: { type: Types.CloudinaryImage },
  projects: { type: Types.Relationship, ref: 'Project', many: true },
  events: { type: Types.Relationship, ref: 'Event', many: true },
  }
)

Update.register()


// Model for Document

var Document = new keystone.List('Document', {
  inherits: PagePost,
})

Document.relationship({ ref: 'Project', path: 'doc'})

Document.register()
