var keystone = require('keystone');
var Types = keystone.Field.Types;

var About =  new keystone.List('About', {
  map: { name: 'name' },
  defaultSort: '-publishedDate',
  schema: { collection: 'About' },
});

About.add(
  {
  name:             { type: Types.Text },
    state:          { type: Types.Select, options: 'draft, published, archived', default: 'draft', required: true },
    publishedDate:  { type: Types.Datetime, dependsOn: { state: 'published'}, noedit: true },
  },
  'About', {
    whoWeAre:     { type: Types.Html, wysiwyg: true },
    whatWeDo:     { type: Types.Html, wysiwyg: true },
    ourBoard:     { type: Types.Html, wysiwyg: true },
    ourFaculty:   { type: Types.Html, wysiwyg: true },
    ourSponsors:  { type: Types.Html, wysiwyg: true },
    sponsorsList: { type: Types.Html, wysiwyg: true },
  },
  'Current Leaders', {
    board:    { type: Types.Relationship, ref: 'Member', many: true },
    faculty:  { type: Types.Relationship, ref: 'Member', many: true },
  },
  'Additional', {
    gallery:  { type: Types.Relationship, ref: 'Gallery' },
    codes:    { type: Types.Relationship, ref: 'Code' },
    tags:     { type: Types.Relationship, ref: 'Tag' },
  }
);

About.schema.methods.isPublished = function() {
    return this.state == 'published';
}

About.schema.pre('save', function(next) {
    if (this.isModified() && this.isPublished()) {
        this.publishedDate = new Date();
    }
    next();
});


// Force About back to 'draft' if Content is empty (excluding Our Sponsors)
About.schema.pre('save', function(next) {
    if (this.isModified() && ( this.whoWeAre ==   ''
                          ||  this.whatWeDo ==    ''
                          ||  this.ourBoard ==  ''
                          ||  this.ourFaculty == '' )) {
        this.state = 'draft';
    }
    next();
});

About.defaultColumns = 'publishedDate, state';

About.register();
