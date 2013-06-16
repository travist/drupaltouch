Ext.define('DrupalTouch.proxy.Drupal', {
  extend: 'Ext.data.proxy.JsonP',
  alias: 'proxy.drupal',
  getParams: function(operation) {
    return {
      page: operation.getPage() - 1,
      limit: operation.getLimit()
    };
  }
});