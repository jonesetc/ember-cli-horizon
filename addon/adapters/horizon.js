import Ember from 'ember';
import Adapter from 'ember-data/adapter';

export default Adapter.extend({
    _hzService: Ember.inject.service('horizon-connection'),
    _getConnectionPromise() {
        return this.get('_hzService').connect();
    },

    defaultSerializer: 'json',

    findRecord() {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then(() => { throw 'findRecord not implemented yet'; });
    },

    findAll(store, type) {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then((hz) => {
            return new Ember.RSVP.Promise((resolve, reject) => {
                hz(type.modelName)
                    .fetch()
                    .subscribe(resolve, reject);
            });
        });
    },

    findMany() {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then(() => { throw 'findMany not implemented yet'; });
    },

    query(store, type, query) {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then((hz) => {
            return new Ember.RSVP.Promise((resolve, reject) => {
                hz(type.modelName)
                    .findAll(query)
                    .fetch()
                    .subscribe(resolve, reject);
            });
        });
    },

    queryRecord(store, type, query) {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then((hz) => {
            return new Ember.RSVP.Promise((resolve, reject) => {
                hz(type.modelName)
                    .find(query)
                    .fetch()
                    .subscribe(resolve, reject);
            });
        });
    },

    createRecord(store, type, snapshot) {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then((hz) => {
            const payload = this.serialize(snapshot);
            return new Ember.RSVP.Promise((resolve, reject) => {
                hz(type.modelName)
                    .store(payload)
                    .subscribe(resolve, reject);
            });
        });
    },

    updateRecord() {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then(() => { throw 'updateRecord not implemented yet'; });
    },

    deleteRecord(store, type, snapshot) {
        const connectionPromise = this._getConnectionPromise();

        return connectionPromise.then((hz) => {
            return new Ember.RSVP.Promise((resolve, reject) => {
                hz(type.modelName)
                    .remove(snapshot.id)
                    .subscribe(resolve, reject);
            });
        });
    },
});
