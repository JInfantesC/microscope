/*
And since we're setting the data context at the route level, we can now safely
get rid of the posts template helper inside the posts_list.js file and just
delete the contents of that file.
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
*/
