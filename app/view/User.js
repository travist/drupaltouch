Ext.define('DrupalTouch.view.User', {
  extend: 'Ext.navigation.View',
  xtype: 'userpage',
  config: {
    title: 'Me',
    iconCls: 'user',
    styleHtmlContent: true,
    scrollable: true,
    navigationBar: {
      docked: 'top',
      items: [
        {
          text: 'Logout',
          iconCls: 'action',
          align: 'right',
          action: 'logout'
        }
      ]
    },
    tpl: new Ext.XTemplate(
      '<div class="user">',
        '<div class="user-picture">',
          '<img src="{picture}" width="260px">',
        '</div>',
        '<div class="user-info">',
          '<h2 class="user-name">{name}</h2>',
        '</div>',
      '</div>'
    )
  }

});