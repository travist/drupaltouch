Ext.define('DrupalTouch.controller.User', {
  extend: 'Ext.app.Controller',

  system: null,

  /** Adding the requirements. */
  requires: [
    'DrupalTouch.model.User'
  ],

  /** The configuration for the user controller. */
  config: {
    refs: {
      mainPage: 'mainpage',
      userPage: 'userpage',
      loginForm: 'loginform',
      loginButton: 'button[action=login]',
      logoutButton: 'button[action=logout]'
    },
    control: {
      'button[action=login]': {
        tap: 'showLogin'
      },
      'button[action=loginSubmit]': {
        tap: 'onLogin'
      },
      'button[action=logout]': {
        tap: 'logout'
      }
    }
  },

  /** The current user. */
  currentUser: null,

  /** Initialize the user controller. */
  init: function() {
    var self = this;
    this.system = this.getController('DrupalTouch.controller.System');
    this.system.request({
      url: '/api/system/connect.json',
      method: 'POST',
      success: function(response) {
        response = JSON.parse(response.responseText);
        self.setCurrentUser(response.user);
      }
    });
  },
  /**
   * Show the login page.
   */
  showLogin: function() {
    var mainPage = this.getMainPage();
    var items = mainPage.getItems();
    var loginFound = false;
    items.each(function(item) {
      if (item.getItemId().search(/loginform/) !== -1) {
        loginFound = true;
        return false;
      }
    });
    if (!loginFound) {
      var loginPage = Ext.create('DrupalTouch.view.Login');
      mainPage.add(loginPage);
      mainPage.setActiveItem(loginPage);
    }
    else {
      mainPage.setActiveItem(this.getLoginForm());
    }
  },

  /**
   * Called when they press the submit button for login.
   */
  onLogin: function() {

    // Get the form values.
    var values = this.getLoginForm().getValues();

    // Log into Drupal.
    this.login(values.username, values.password);
  },
  /**
   * Log into the Drupal site.
   *
   * @param {string} username
   *   The username for login.
   * @param {string} password
   *   The users password.
   */
  login: function(username, password) {
    var self = this;
    if (username && password) {
      this.system.request({
        url: '/api/user/login.json',
        method: 'POST',
        params: {
          name: username,
          pass: password
        },
        success: function(response) {
          response = JSON.parse(response.responseText);
          self.setCurrentUser(response.user);
        }
      });
    }
    else {
      Ext.Msg.alert('', 'Username and Password required');
    }
  },

  /**
   * Log out of the Drupal site.
   */
  logout: function() {
    var self = this;
    this.system.request({
      url: '/api/user/logout.json',
      method: 'POST',
      success: function(response) {
        self.setCurrentUser(null);
      }
    });
  },
  /**
   * Sets the current user.
   */
  setCurrentUser: function(user) {
    var self = this;

    // If the picture is a number, then get it...
    if (user && Number(user.picture)) {
      Ext.Ajax.request({
        url: '/api/file/' + user.picture + '.json',
        method: 'GET',
        success: function(response) {
          var picture = Ext.JSON.decode(response.responseText);
          user.picture = picture.uri_full;
          self.setCurrentUser(user);
        }
      });
    }
    else {

      // Set the current user.
      this.currentUser = Ext.create('DrupalTouch.model.User', user);

      // Add some UI based on the user logging in.
      var mainPage = this.getMainPage();
      if (this.currentUser.isLoggedIn()) {
        mainPage.add(Ext.create('DrupalTouch.view.User', {
          data: this.currentUser.data
        }));
        mainPage.remove(this.getLoginForm());
      }
      else {
        mainPage.add(Ext.create('DrupalTouch.view.Login'));
        mainPage.remove(this.getUserPage());
      }

      // Let anyone else know about this event.
      this.getApplication().fireEvent('setUser', this.currentUser);
    }
  }
});