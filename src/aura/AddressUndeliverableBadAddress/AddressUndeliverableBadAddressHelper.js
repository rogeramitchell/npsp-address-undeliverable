/**
 * Created by mbuhler on 2018-04-06.
 */
({

    navigateScreen3 : function(component, addressId) {
        var event = component.getEvent("NavigateScreen3");
        event.setParams({"addressId": addressId});
        event.fire();
    },

    startWaiting : function(component) {
        var event = component.getEvent("StartWaiting");
        event.fire();
    },

    stopWaiting : function(component) {
        var event = component.getEvent("StopWaiting");
        event.fire();
    },

    setUndeliverableAddress: function(component, addressId) {
        var action = component.get("c.setUndeliverableAddress");
        action.setParams({
            "addressId": addressId,
            "clearContactAddress" : false
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                this.navigateScreen3(component, addressId);
            }
            else {
                console.log("Failed with state: " + state);
                this.stopWaiting(component);
            }
        });
        $A.enqueueAction(action);
    }

})