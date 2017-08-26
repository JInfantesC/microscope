if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Book. Discover meteor',
        url: 'https://book.discovermeteor.com/'
    });

    Posts.insert({
        title: 'Meteor',
        url: 'http://meteor.com'
    });

    Posts.insert({
        title: 'Reddit',
        url: 'https://reddit.com'
    });
}
