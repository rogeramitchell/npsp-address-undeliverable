/**
 * Created by mbuhler on 2018-04-09.
 */
({

    handleClickCancel : function(component, event, helper) {
        helper.isWaiting(component, true);
        helper.navigateScreen6(component);
    },

    handleClickCreate : function(component, event, helper) {
        helper.isWaiting(component, true);
        if (helper.validateForm(component)) {
            component.set("v.hasError", false);
            var accountId = component.get("v.accountId");
            helper.createAddress(component, accountId);
        }
        else {
            component.set("v.hasError", true);
            helper.isWaiting(component, false);
        }
    }

})