Meteor.publish("posts", function(argument) {
    return Posts.find();
});
Meteor.publish('comments', function() {
    return Comments.find();
});
