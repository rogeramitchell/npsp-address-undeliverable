/**
 * Created by mbuhler on 2018-04-05.
 */
({

    navigateScreen1 : function(component, recordId) {
        $A.createComponent(
            "c:AddressUndeliverableScreen1",
            {
                "recordId": recordId
            },
            function(newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    navigateScreen2 : function(component, recordId) {
        $A.createComponent(
            "c:AddressUndeliverableScreen2",
            {
                "recordId": recordId
            },
            function(newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    navigateScreen3 : function(component, recordId, addressId) {
        $A.createComponent(
            "c:AddressUndeliverableScreen3",
            {
                "recordId": recordId,
                "addressId": addressId
            },
            function(newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    navigateScreen4 : function(component, recordId, addressId) {
        $A.createComponent(
            "c:AddressUndeliverableScreen4",
            {
                "recordId": recordId
            },
            function(newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    navigateScreen5 : function(component, recordId, accountId) {
        $A.createComponent(
            "c:AddressUndeliverableScreen5",
            {
                "recordId": recordId,
                "accountId" : accountId
            },
            function(newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    navigateScreen6 : function(component, recordId, message) {
        $A.createComponent(
            "c:AddressUndeliverableScreen6",
            {
                "recordId": recordId,
                "message": message
            },
            function(newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    }

})