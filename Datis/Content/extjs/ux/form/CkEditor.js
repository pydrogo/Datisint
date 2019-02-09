Ext.define('Ext.ux.CKeditor', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.ckeditor',
    value: '',
    CKConfig: {
        language: 'fa',
        baseFloatZIndex: 1000000000,
        font_names: 'فونت داتیس/BaharFont; تاهوما/Tahoma; آریال/Arial; سنس سریف/Sans-Serif',
        filebrowserBrowseUrl: 'FileManager/Default.aspx'
    },
    initComponent: function () {
        this.callParent(arguments);
        this.on('afterrender', function () {
            Ext.apply(this.CKConfig, {
                height: this.getHeight()
            });
            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editorId = this.editor.id;
            if (this.value) this.setValue(this.value);
        }, this);
    },
    onRender: function (ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments)
    },
    setValue: function (value) {
        this.callParent(arguments);
        this.value = value;
        if (this.editor) {
            this.editor.setData(value);
        }
    },

    getRawValue: function () {
        if (this.editor) {
            return this.editor.getData()
        } else {
            return ''
        }
    }
});

CKEDITOR.on('instanceReady', function (e) {
    var o = Ext.ComponentQuery.query('ckeditor[editorId="' + e.editor.id + '"]'),
        comp = o[0];
    e.editor.resize(comp.getWidth(), comp.getHeight());
    comp.on('resize', function (c, adjWidth, adjHeight) {
        c.editor.resize(adjWidth, adjHeight);
    });
});