/**
 * Created by mbuhler on 2018-04-05.
 */
({

    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.navigateScreen1(component, recordId);
    },

    handleNavigateScreen1 : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.navigateScreen1(component, recordId);
    },

    handleNavigateScreen2 : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.navigateScreen2(component, recordId);
    },

    handleNavigateScreen3 : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var addressId = event.getParam("addressId");
        helper.navigateScreen3(component, recordId, addressId);
    },

    handleNavigateScreen4 : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.navigateScreen4(component, recordId);
    },

    handleNavigateScreen5 : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var accountId = event.getParam("accountId");
        helper.navigateScreen5(component, recordId, accountId);
    },

    handleNavigateScreen6 : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var message = event.getParam("message");
        helper.navigateScreen6(component, recordId, message);
    }

})