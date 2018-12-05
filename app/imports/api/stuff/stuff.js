import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Stuffs = new Mongo.Collection('Stuffs');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StuffSchema = new SimpleSchema({
  name: String,
  repetitions: Number,
  owner: String,
  category: {
    type: String,
    allowedValues: ['Arms', 'Legs', 'Back','Abs', 'Buttocks','Chest'],
    defaultValue: 'Abs',
  },
  steps: String,
  score: Number,
  username: String,
  followers:[String]

}, { tracker: Tracker });

/** Attach this schema to the collection. */
Stuffs.attachSchema(StuffSchema);


Meteor.methods({
  'stuffs.insert'(data) {
    console.log(data)
    const {name, repetitions, category,steps} = data;
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Stuffs.insert({
      name,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      repetitions,
      category,
      steps,
      score:5,
      followers:[]
    });
  },
  "stuffs.update"(data){
    const {id, score } = data
    Stuffs.update({_id:id},{$set:{score:score}});
  },
  "stuffs.follow"(data){
    const {id, follower } = data
    Stuffs.update({_id:id},{ $push: { followers: follower }});
  },
  "stuffs.unfollow"(data){
    const {id, follower } = data
    Stuffs.update({"_id": id }, {"$pull": { "followers" : follower }});
  }
})
 

/** Make the collection and schema available to other code. */
export { Stuffs, StuffSchema };
