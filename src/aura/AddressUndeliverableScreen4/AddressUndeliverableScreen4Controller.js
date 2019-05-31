/**
 * Created by mbuhler on 2018-04-06.
 */
({

    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.getAccountId(component, recordId);
        helper.getOtherAddresses(component, recordId);
    },

    handleClickNew : function(component, event, helper) {
        helper.isWaiting(component, true);
        var accountId = component.get("v.accountId");
        helper.navigateScreen5(component, accountId);
    },

    handleClickCancel : function(component, event, helper) {
        helper.isWaiting(component, true);
        helper.navigateScreen6(component);
    },

    handleStartWaiting : function(component, event, helper) {
        helper.isWaiting(component, true);
    },

    handleStopWaiting : function(component, event, helper) {
        helper.isWaiting(component, false);
    }

})