/*we create the error inside the client directory (to make the collection
client-only), with its MongoDB collection name set to null (since this
collection's data will never be saved into the server-side database):
*/
// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({
        message: message
    });
};
