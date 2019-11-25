odoo.define('web.export_limit', function (require) {
    "use strict";

    var ListController = require('web.ListController');
    var session = require('web.session');

    ListController.include({
        _updateButtons: function (mode) {
            var self = this;
            $.when(
                session.user_has_group('base.group_user'),
                session.user_has_group('base.group_system')
            ).done(function (is_user, is_admin) {
                if (is_user && is_admin) {
                    if (self.$buttons) {
                        self.$buttons.toggleClass('o-editing', mode === 'edit');
                        const state = self.model.get(self.handle, { raw: true });
                        if (state.count) {
                            self.$('.o_list_export_xlsx').show();
                        } else {
                            self.$('.o_list_export_xlsx').hide();
                        }
                    }
                }
                else {
                    self.$('.o_list_export_xlsx').hide();
                }
            });
        }
    })
});
