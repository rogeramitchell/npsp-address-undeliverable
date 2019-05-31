/**
 * Created by mbuhler on 2018-04-06.
 */
({

    closeModal: function() {
        $A.get("e.force:closeQuickAction").fire();
    },

    navigateScreen6 : function(component) {
        var event = component.getEvent("NavigateScreen6");
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

    setDefaultAddress: function(component, addressId) {
        var action = component.get("c.setDefaultAddress");
        action.setParams({
            "addressId": addressId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                this.navigateScreen6(component);
            }
            else {
                console.log("Failed with state: " + state);
                this.stopWaiting(component);
            }
        });
        $A.enqueueAction(action);
    }

})