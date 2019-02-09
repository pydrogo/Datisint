Ext.define('prada.page.views.ContactManager', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.ContactManager'],
    title: 'مدیریت پیام ها',
    forceFit: true,
    searchbar: 'prada.page.views.ContactManager.SearchBar',
    columns: [
    {
        text: 'ردیف',
        xtype: 'rownumberer'
    }, {
        dataIndex: 'Name',
        text: 'نام'
    },
    {
        dataIndex: 'Email',
        text: 'ایمیل'
    },
    //{
    //    dataIndex: 'CreateDate',
    //    text: 'تاریخ ثبت',
    //    renderer: hussein.renderer.dateRenderer
    //}, {
    //    dataIndex: 'CreateName',
    //    text: 'ثبت کننده'
    //}, {
    //    dataIndex: 'LastModifiedDate',
    //    text: 'تاریخ آخرین ویرایش',
    //    renderer: hussein.renderer.dateRenderer
    //}, {
    //    dataIndex: 'LastModefiedName',
    //    text: 'آخرین ویرایش کننده'
        //},
        {
            xtype: 'deletecolumn',
            text: 'حذف',
            handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
                Ext.Msg.show({
                    title: 'حذف رکورد',
                    msg: 'آیا از حذف ردیف مورد نظر اطمینان دارید؟ در صورت حذف امکان دسترسی به این ردیف دیگر وجود نخواهد داشت.',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (col, grid, record) {
                        return function (btn) {
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    method: 'delete',
                                    url: 'ContactManagerAdmin/Delete/' + record.data.Id,
                                    success: function (response, eOpts) {
                                        grid.getStore().remove(record);
                                        jump('حذف', 'رکورد مورد نظر حذف گردید');
                                    }
                                });
                            }
                        };
                    }(this, grid, record)
                });
            }
        }],
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: Ext.XTemplate('{Message}')
    }],

    model: 'prada.page.models.ContactManager',
    readUrl: 'ContactManagerAdmin/AjaxRead',
    constructor: function (config) {
        //this.readUrl += config.farmStatusId;
        this.callParent(arguments);
    }
});


Ext.define('prada.page.views.ContactManager.SearchBar', {
    extend: 'Ext.form.Panel',
    height: 50,
    layout: {
        type: 'table',
        columns: 2,
        tableAttrs: { style: { width: '100%' } },
        tdAttrs: { style: { width: '43%', verticalAlign: 'middle' } }
    },
    items: [{
        layout: 'column',
        xtype: 'fieldset',
        defaults: {
            columnWidth: 0.33,
            labelWidth: 70,
            padding: 3
        },
        colspan: 2,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'نام',
            name: 'Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'موضوع',
            name: 'Subject'
        }, {
            xtype: 'textfield',
            fieldLabel: 'ایمیل',
            name: 'Email'
        }
        , {
            xtype: 'textfield',
            fieldLabel: 'پیام',
            name: 'Message'
        }]
    }]
});
