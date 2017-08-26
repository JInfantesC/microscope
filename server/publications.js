Meteor.publish("posts", function(argument) {
    return Posts.find();
});
