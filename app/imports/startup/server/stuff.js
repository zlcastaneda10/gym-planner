import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/stuff.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */

if(Meteor.isServer){
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    return Stuffs.find({});
  }
  return this.ready();
});

Meteor.publish('usersList', function publish() {
    const username = Meteor.users.findOne(this.userId).username;
    return Meteor.users.find({});
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({owner:username});
  }
  return this.ready();
});

Meteor.publish('CategoryArms', function publish() {
  if (this.userId) {
    return Stuffs.find({category:arms});
  }
  return this.ready();
});
Meteor.publish('CategoryLegs', function publish() {
  if (this.userId) {
    return Stuffs.find({category:legs});
  }
  return this.ready();
});
Meteor.publish('CategoryBack', function publish() {
  if (this.userId) {
    return Stuffs.find({category:back});
  }
  return this.ready();
});
Meteor.publish('CategoryAbs', function publish() {
  if (this.userId) {
    return Stuffs.find({category:abs});
  }
  return this.ready();
});
Meteor.publish('CategoryButtocks', function publish() {
  if (this.userId) {
    return Stuffs.find({category:buttocks});
  }
  return this.ready();
});
Meteor.publish('CategoryChest', function publish() {
  if (this.userId) {
    return Stuffs.find({category:chest});
  }
  return this.ready();
});
}
