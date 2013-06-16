Ext.define('DrupalTouch.ux.DrupalFile', {
  extend: 'Ext.ux.Fileup',
  xtype: 'drupalfile',
  requires: [
    'Ext.ux.Fileup'
  ],
  file: null,
  onButtonTap: function() {
    if (this.currentState == 'ready') {
      this.changeState('uploading');
      this.fireEvent('uploadstart', file);
      var file = this.fileElement.dom.files[0];
      this.doUpload(file);
      this.doLoad(file);
    }
  },
  signRequest: function(http, callback) {
    Ext.Ajax.request({
      url: '/services/session/token',
      method: 'GET',
      success: function(response) {
        http.setRequestHeader("X-CSRF-Token", response.responseText);
        callback(http);
      }
    });
  },
  decodeResponse: function(response) {
    if (response.responseText) {

      // Get the drupal file from the response text.
      this.file = Ext.JSON.decode(response.responseText);
      return {success: true, file: this.file};
    }
    else {
      return {
        success: false,
        message: 'File upload failed'
      }
    }
  }
});