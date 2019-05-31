/**
 * Created by mbuhler on 2018-04-05.
 */
({

    navigateScreen2 : function(component) {
        var event = component.getEvent("NavigateScreen2");
        event.fire();
    },

    navigateScreen3 : function(component, addressId) {
        var event = component.getEvent("NavigateScreen3");
        event.setParams({"addressId": addressId});
        event.fire();
    },

    getDefaultAddress: function(component, recordId) {
        var action = component.get("c.getDefaultAddress");
        action.setParams({
            "recordId": recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                var returnValue = response.getReturnValue();
                component.set("v.defaultAddress", returnValue);
                this.isWaiting(component, false);
            }
            else {
                console.log("Failed with state: " + state);
                this.isWaiting(component, false);
            }
        });
        $A.enqueueAction(action);
    },

    setUndeliverableAddress: function(component, addressId) {
        var action = component.get("c.setUndeliverableAddress");
        action.setParams({
            "addressId": addressId,
            "clearContactAddress" : true
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                this.navigateScreen3(component, addressId);
            }
            else {
                this.isWaiting(component, false);
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },

    isWaiting: function(component, isWaiting) {
        component.set("v.isWaiting", isWaiting);
    }

})