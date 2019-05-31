/**
 * Created by mbuhler on 2018-04-06.
 */
({

    getOtherAddresses: function(component, recordId) {
        var action = component.get("c.getOtherAddresses");
        action.setParams({
            "recordId": recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                var returnValue = response.getReturnValue();
                if (returnValue != null) {
                    component.set("v.addresses", returnValue);
                    component.set("v.hasAddresses", true);
                }
                else {
                    component.set("v.noAddresses", true);
                }
                this.isWaiting(component, false);
            }
            else {
                console.log("Failed with state: " + state);
                this.isWaiting(component, false);
            }
        });
        $A.enqueueAction(action);
    },

    getAccountId: function(component, recordId) {
        var action = component.get("c.getAccountId");
        action.setParams({
            "recordId": recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                var returnValue = response.getReturnValue();
                component.set("v.accountId", returnValue);
            }
            else {
                console.log("Failed with state: " + state);
                this.isWaiting(component, false);
            }
        });
        $A.enqueueAction(action);
    },

    navigateScreen5 : function(component, accountId) {
        var event = component.getEvent("NavigateScreen5");
        event.setParams({"accountId" : accountId});
        event.fire();
    },

    navigateScreen6 : function(component) {
        var event = component.getEvent("NavigateScreen6");
        event.fire();
    },

    isWaiting: function(component, isWaiting) {
        component.set("v.isWaiting", isWaiting);
    }

})