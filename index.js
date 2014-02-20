var Firebase = require('client-firebase');

var DEFAULT_FIREBASE_ROOT = null;

var MultiplayerMixin = {
  componentWillMount: function() {
    this.updatingFromFirebase = false;

    var firebaseURL = null;
    if (this.getFirebaseURL) {
      firebaseURL = this.getFirebaseURL();
    } else if (DEFAULT_FIREBASE_ROOT) {
      firebaseURL = DEFAULT_FIREBASE_ROOT;
      if (firebaseURL[firebaseURL.length - 1] !== '/') {
        firebaseURL += '/';
      }
      firebaseURL += window.btoa(this._rootNodeID + ',' + this._mountDepth);
    } else {
      throw new Error('Must either call setFirebaseRoot() or provide a getFirebaseURL() method');
    }
    this.firebase = new Firebase(firebaseURL);
  },

  componentDidMount: function() {
    this.firebase.on('value', this.handleFirebaseValue);
  },

  componentWillUnmount: function() {
    this.firebase.off('value', this.handleFirebaseValue);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.updatingFromFirebase) {
      return;
    }
    var update = {};
    for (var k in this.state) {
      if (prevState[k] !== this.state[k]) {
        update[k] = this.state[k];
      }
    }
    this.firebase.update(update);
  },

  handleFirebaseDone: function() {
    this.updatingFromFirebase = false;
  },

  handleFirebaseValue: function(snapshot) {
    this.updatingFromFirebase = true;
    // TODO: can we remove this double reconcile?
    this.replaceState(snapshot.val(), this.handleFirebaseDone);
  }
};

module.exports = {
  Mixin: MultiplayerMixin,
  setFirebaseRoot: function(root) {
    DEFAULT_FIREBASE_ROOT = root;
  }
};