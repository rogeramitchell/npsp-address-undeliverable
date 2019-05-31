/**
 * Created by mbuhler on 2018-04-06.
 */
({

    handleClickDefault : function(component, event, helper) {
        helper.startWaiting(component);
        var addressId = component.get("v.addressId");
        var result = confirm("Are you sure you want to make this the new default address?");
        if (result) {
            helper.setDefaultAddress(component, addressId);
        }
        else {
            helper.stopWaiting(component);
        }
    }

})