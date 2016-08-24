var keystone = require('keystone');
var Types = keystone.Field.Types;

// BASE PAGE MODEL (for Project and Event)

var Page = new keystone.List('Page',{
  map: { name: 'name' , status: 'status'},
  autokey: { path: 'slug', from: 'name', unique: true },
  schema: { collection: 'Page' }
});

Page.add(
  {
    name:   {type: Types.Text, required: true },
    state:  { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  },
  'Description', {
    preview:  { type: Types.Textarea, noedit: true},
    full:    { type: Types.Textarea, required: true, height: 600, default: 'There is no description yet! :)'},
  },
  'Galleries', {
    main: {type: Types.Relationship, ref: 'Gallery', many: false },
    subs: {type: Types.Relationship, ref: 'Gallery', many: true },
  },
  'Team or Hosts', {
    members:  {type: Types.Relationship, ref: 'Member', many: true },
  },
  // 'Related' , {
  //   codes:    {type: Types.Relationship, ref: 'Code', many: true },
  //   tags:     { type: Types.Relationship, ref: 'Tag', many: true }
  // },
  'Meta', {
    createdAt:  { type: Types.Datetime, noedit: true },
    createdBy:  { type: Types.Relationship, ref: 'Member', many: false, noedit: true },
  }
)

//TODO add pre save hook for display Primary. On save, primary get's placed in Auxillary

Page.schema.methods.isEmpty = function(display) {
  return this.display == ''
}

// Page.schema.pre('save',  function(next) {
//     if (this.main && !this.subs ) {
//       this.subs.append(this.main)
//     }
//     next();
// });

Page.schema.pre('save', function(next) {
  if (this.createdAt == null && this.isModified){
    this.createdAt = new Date();
  }
  next();
})


// Previews first sentence
Page.schema.pre('save', function(next) {
  if (this.full != '' && this.isModified()){
    var brief = this.full.toString().split('.')
    console.log(this.full.toString())
    console.log(brief)
    this.preview = brief[0] + '...';
  }
  next();
})

Page.register();


// ADD PROJECT MODEL

var Project = new keystone.List('Project', {
  inherits: Page,
  defaultSort: '-status',
  schema: { collection: 'Project' }
})

Project.add({
  status:    {type: Types.Select, options: 'active, idle, complete', required: true, default: 'active'},
  document:  {type: Types.Relationship, ref: 'Document', many: false },
})

Project.relationship({ ref: 'Update', path: 'projects' });
Project.defaultColumns = 'name, status|20%, state|20%, createdAt|20%';
Project.register();


// ADD EVENT MODEL

var Event = new keystone.List("Event",{
  inherits: Page,
  defaultSort: '-timeAndDate',
  schema: { collection: 'Event' }});

Event.add({
  timeAndDate: { type: Types.Datetime, default: Date.now, required: true },
  location:    { type: Types.Location, defaults: { country: 'United States' } },
});

Event.relationship({ ref: 'Update', path: 'events' });
Event.defaultColumns = 'name, timeAndDate|20%, state|20%';
Event.register();
