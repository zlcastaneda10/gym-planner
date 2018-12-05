import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';
<<<<<<< HEAD

Meteor.methods({

  
});
=======
import { Accounts } from 'meteor/accounts-base';


Meteor.startup(() => {
  // code to run on server at startup
});

if(Meteor.isServer){
  Accounts.onCreateUser((options, user) =>{
    console.log(options);
    if(options.roles){
      user.roles = options.roles;
      return user;
    }
    else{
      throw new Meteor.Error("no-role","Missing role in user");
    }
  });
}
>>>>>>> 89336e0bd6862e01e1836c7cf73477bf00f8ebf5
