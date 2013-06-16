Ext.define('DrupalTouch.view.Login', {
  extend: 'Ext.form.Panel',
  xtype: 'loginform',
  requires: [
    'Ext.field.Password',
    'Ext.form.FieldSet'
  ],
  config: {
    modal: true,
    title: 'Login',
    iconCls: 'action',
    items: [
      {
        xtype: 'fieldset',
        items: [
          {
            xtype: 'textfield',
            name: 'username',
            label: 'Username:'
          },
          {
            xtype: 'passwordfield',
            name: 'password',
            label: 'Password:'
          }
        ]
      },
      {
        xtype: 'button',
        text: 'Login',
        ui: 'action',
        margin: '10px',
        action: 'loginSubmit'
      }
    ]
  }
})