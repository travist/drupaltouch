Ext.define('DrupalTouch.controller.File', {
  extend: 'Ext.app.Controller',
  requires: [
    'Ext.device.Notification',
    'Ext.Img'
  ],
  file: null,
  image: '',
  config: {
    refs: {
      'fileBtn': 'fileupload',
      'loadedImage': '#loadedImage'
    },
    control: {
      fileBtn: {
        loadsuccess: 'onFileLoadSuccess',
        success: 'onFileUploadSuccess',
        failure: 'onFileUploadFailure'
      }
    }
  },
  onFileLoadSuccess: function(dataurl, e) {
    this.image = new Image();
    this.image.src = dataurl;
  },
  onFileUploadSuccess: function(response) {
    this.file = response.file[0];
    if (this.image) {
      this.getLoadedImage().setSrc(this.image.src);
    }
  },
  onFileUploadFailure: function(message) {
    Ext.device.Notification.show({
      title: 'Uploading error',
      message: message,
      buttons: Ext.MessageBox.OK,
      callback: Ext.emptyFn
    });
  }
});