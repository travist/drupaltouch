Ext.define('DrupalTouch.view.article.ArticleForm', {
  extend: 'Ext.form.Panel',
  xtype: 'articleform',
  requires: [
    'DrupalTouch.ux.DrupalFile'
  ],
  config: {
    title: 'New Article',
    items: [
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'start'
        },
        items: [
          {
            xtype: 'fieldset',
            items: [
              {
                itemId: 'loadedImage',
                xtype: 'img',
                cls: 'imageupload'
              },
              {
                itemId: 'fileBtn',
                xtype: 'drupalfile',
                iconCls: 'action',
                iconMask: true,
                browse: {
                  text: '',
                  cls: Ext.baseCSSPrefix + 'fileup',
                  ui: 'filebrowse'
                },
                autoUpload: true,
                url: '/api/file/create_raw.json',
                name: 'files[field_image_und_0]'
              }
            ]
          },
          {
            xtype: 'fieldset',
            flex: 1,
            items: [
              {
                xtype: 'textfield',
                name: 'title',
                label: 'Title:'
              },
              {
                xtype: 'textareafield',
                name: 'description',
                label: 'Description:',
                cls: 'articledesc',
                flex: 1
              }
            ]
          },
        ]
      },
      {
        xtype: 'button',
        text: 'Save',
        ui: 'action',
        margin: '10px',
        action: 'articleSave'
      }
    ]
  }
});