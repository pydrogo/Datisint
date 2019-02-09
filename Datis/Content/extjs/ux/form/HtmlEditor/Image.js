/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 * <p>A plugin that creates an image button in the HtmlEditor toolbar for inserting an image. The method to select an image must be defined by overriding the selectImage method. Supports resizing of the image after insertion.</p>
 * <p>The selectImage implementation must call insertImage after the user has selected an image, passing it a simple image object like the one below.</p>
 * <pre>
 *      var img = {
 *         Width: 100,
 *         Height: 100,
 *         ID: 123,
 *         Title: 'My Image'
 *      };
 * </pre>
 */

Ext.define('Ext.ux.form.HtmlEditor.Image', {
    extent: 'Ext.util.Observable',
    langTitle: 'قرار دادن تصویر',
    urlSizeVars: ['width', 'height'],
    basePath: 'ShowFiles/Image',
    init: function (cmp) {
        this.cmp = cmp;
        this.cmp.on({
            render: { fn: 'onRender', scope: this },
            initialize: { fn: 'onInit', scope: this, options: { delay: 100, single: true } }
        });
    },
    onEditorMouseUp: function (e) {
        Ext.get(e.getTarget()).select('img').each(function (el) {
            var w = el.getAttribute('width'), h = el.getAttribute('height'), src = el.getAttribute('src') + ' ';
            src = src.replace(new RegExp(this.urlSizeVars[0] + '=[0-9]{1,5}([&| ])'), this.urlSizeVars[0] + '=' + w + '$1');
            src = src.replace(new RegExp(this.urlSizeVars[1] + '=[0-9]{1,5}([&| ])'), this.urlSizeVars[1] + '=' + h + '$1');
            el.set({ src: src.replace(/\s+$/, "") });
        }, this);

    },
    onInit: function () {
        Ext.EventManager.on(this.cmp.getDoc(), {
            'mouseup': this.onEditorMouseUp,
            buffer: 100,
            scope: this
        });
    },
    onRender: function () {
        var btn = this.cmp.getToolbar().add({
            iconCls: 'icon-Image',
            handler: this.selectImage,
            scope: this,
            tooltip: {
                title: this.langTitle
            },
            overflowText: this.langTitle
        });
    },
    selectImage: function () {
        var me = this;
        me.cmp.focus();
        Ext.create('Ext.window.Window', {
            title: 'انتخاب تصویر',
            height: 300,
            width: 400,
            layout: 'fit',
            items: [{
                xtype: 'form',
                layout: 'column',
                defaults: { style: { right: 0, left: 'auto' }, columnWidth: 1 },
                items: [{  
                    xtype: 'textfield',
                    fieldLabel: 'آدرس فایل را وارد کنید',
                    labelAlign: 'top',
                    allowBlank: false,
                    afterLabelTextTpl: hussein.util.Util.required,
                    name: 'Address',
                    columnWidth:1
                }, {
                    xtype: 'textfield',
                    name: 'Name',
                    allowBlank: false,
                    afterLabelTextTpl: hussein.util.Util.required,
                    fieldLabel: 'عنوان'
                }, {
                    xtype: 'numberfield',
                    name: 'Width',
                    allowBlank: false,
                    afterLabelTextTpl: hussein.util.Util.required,
                    fieldLabel: 'عرض'
                }, {
                    xtype: 'numberfield',
                    name: 'Height',
                    allowBlank: false,
                    afterLabelTextTpl: hussein.util.Util.required,
                    fieldLabel: 'ارتفاع'
                }]
            }],
            tbar: [{
                text: 'انتخاب',
                handler: function () {
                    var form = this.up('window').down('form').getForm();
                    
                    if (this.up('window').down('form').isValid()) {
                        me.insertImage(form.getValues());
                        this.up('window').close();
                    }
                    else {
                        alert('فیلدهای اجباری را پر کنید.');
                    }
                }
            }]
        }).show();
    },
    insertImage: function (img) {
        this.cmp.insertAtCursor('<img style="width:' + img.Width + 'px; height:' + img.Height + 'px" src="' + this.basePath + '?' + this.urlSizeVars[0] + '=' + img.Width + '&' + this.urlSizeVars[1] + '=' + img.Height + '&id=' + img.ID + '" title="' + img.Name + '" alt="' + img.Name + '">');
    }
});