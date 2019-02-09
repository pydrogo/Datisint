Ext.define('prada.page.views.Question', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Question'],
    title: 'مدیریت Analog BOX Camera',
    forceFit: true,
    searchbar: 'prada.page.views.Question.SearchBar',
    columns: [
    {
        xtype: 'rownumberer', text: 'Row'
    }, {
        dataIndex: 'FullName',
        text: 'FullName'
    }, {
        dataIndex: 'Country',
        text: 'Country'
    }, {
        dataIndex: 'Mail',
        text: 'Mail'
    }, {
        dataIndex: 'Phone',
        text: 'Phone'
    }, {
        dataIndex: 'Company',
        text: 'Company'
    }, {
        dataIndex: 'Subject',
        text: 'Subject'
    }, {
        width: 25,
        xtype: 'deletecolumn',
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
                                url: 'QuestionAdmin/Delete/' + record.data.Id,
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
        rowBodyTpl: Ext.XTemplate('{Note}')
    }],
    model: 'prada.page.models.Question',
    readUrl: 'QuestionAdmin/AjaxRead',
    tbar: [],
    constructor: function (config) {
        //this.readUrl += config.farmStatusId;
        this.callParent(arguments);
    }
});

Ext.define('prada.page.views.Question.SearchBar', {
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
            fieldLabel: 'Subject',
            name: 'Subject'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Content',
            name: 'Note'
        }]
    }]
});
