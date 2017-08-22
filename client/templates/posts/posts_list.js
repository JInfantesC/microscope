Template.postsList.helpers({
    posts: function() {
        //Posts is accesible by whole app becouse was declared without var in collections/posts.js
        return Posts.find();
    }
});
