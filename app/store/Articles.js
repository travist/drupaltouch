Ext.define('DrupalTouch.store.Articles', {
  extend: 'Ext.data.Store',
  requires: ['DrupalTouch.proxy.Drupal'],
  config: {
    autoLoad: true,
    model: 'DrupalTouch.model.Article',
    proxy: {
      type: 'drupal',
      url: '/api/views/content.jsonp',
      reader: {
        type: 'json'
      }
    }
  }
});