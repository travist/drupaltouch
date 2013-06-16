Ext.define('DrupalTouch.view.article.ArticleList', {
  extend: 'Ext.List',
  xtype: 'articlelist',
  requires: ['DrupalTouch.store.Articles'],
  config: {
    cls: 'articlelist',
    itemTpl: new Ext.XTemplate(
      '<div class="result-item">',
        '<div class="result-item-img">',
          '<img src="{thumbnail}" width="80px">',
        '</div>',
        '<div class="result-item-info">',
          '<h2 class="result-item-title">{title}</h2>',
          '<p class="result-item-desc">{description:ellipsis(120,true)}</p>',
        '</div>',
      '</div>'
    ),
    store: 'Articles',
    onItemDisclosure: true
  }
});