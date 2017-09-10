import {
    ReactiveVar
}
from 'meteor/reactive-var'

Template.time.helpers({
    currentTime: function() {
        return Chronos.moment().format('DD MMM  HH:mm:ss');
    }
});
