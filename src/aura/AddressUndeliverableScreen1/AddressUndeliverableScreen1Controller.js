/**
 * Created by mbuhler on 2018-04-05.
 */
({

    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.getDefaultAddress(component, recordId);
    },

    handleClickYes : function(component, event, helper) {
        helper.isWaiting(component, true);
        var addressId = component.get("v.defaultAddress.Id");
        helper.setUndeliverableAddress(component, addressId);
    },

    handleClickNo : function(component, event, helper) {
        helper.isWaiting(component, true);
        helper.navigateScreen2(component);
    }

})