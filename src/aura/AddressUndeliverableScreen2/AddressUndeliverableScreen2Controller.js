/**
 * Created by mbuhler on 2018-04-06.
 */
({

    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.getOtherAddresses(component, recordId);
    },

    handleClickCancel : function(component, event, helper) {
        helper.isWaiting(component, true);
        helper.navigateScreen6(component);
    },

    handleClickNext : function(component, event, helper) {
        helper.isWaiting(component, true);
        helper.navigateScreen4(component);
    },

    handleStartWaiting : function(component, event, helper) {
        helper.isWaiting(component, true);
    },

    handleStopWaiting : function(component, event, helper) {
        helper.isWaiting(component, false);
    }

})