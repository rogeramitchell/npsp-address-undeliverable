/**
 * Created by mbuhler on 2018-04-06.
 */
({

    handleClickUndeliverable : function(component, event, helper) {
        helper.startWaiting(component);
        var addressId = component.get("v.addressId");
        helper.setUndeliverableAddress(component, addressId);
    }

})