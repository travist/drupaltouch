Ext.define('DrupalTouch.controller.System', {
  extend: 'Ext.app.Controller',

  /**
   * A request to Drupal to include the token within the headers.
   */
  request: function(options) {

    // Get the token.
    this.getToken(function(token) {

      // Add the token to the request headers.
      options.headers = {'X-CSRF-Token': token};

      // Make an Ajax request.
      Ext.Ajax.request(options);
    });
  },

  /**
   * Returns a token.
   *
   * @param {function} callback
   *   Called when the token is retrieved.
   */
  getToken: function(callback) {
    var self = this;
    Ext.Ajax.request({
      url: '/services/session/token',
      method: 'GET',
      success: function(response) {
        callback(response.responseText);
      }
    });
  }
});