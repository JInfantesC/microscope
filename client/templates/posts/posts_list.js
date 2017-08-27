Template.postsList.helpers({
    posts: function() {
        //Posts is accesible by whole app becouse was declared without var in collections/posts.js
        return Posts.find({}, {
            sort: { //Ordered with submit date descending order (-1)
                submitted: -1
            }
        });
    }
});
