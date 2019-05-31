/**
 * Created by mbuhler on 2018-04-06.
 */
({

    handleLoad: function (component, event, helper) {
        helper.isWaiting(component, false);
    },

    handleSubmit: function (component, event, helper) {
        var form = component.find("undeliverableReasonForm");
        var control = component.find("undeliverableReason");
        var undeliverableReason = control.get("v.value");
        if (undeliverableReason == null || undeliverableReason.trim() == '') {
            alert("Please select an Undeliverable Reason before proceeding.");
        }
        else {
            helper.isWaiting(component, true);
            form.submit();
        }
    },

    handleSuccess: function (component, event, helper) {
        helper.navigateScreen4(component);
    },

    handleError: function (component, event, helper) {
        // Work-around for hiding "Received unexpected value during emit" error,
        // which is a bug in lightning:recordEditForm
        var errorParamsRaw = event.getParams();
        var errorParamsJSON = JSON.stringify(errorParamsRaw);
        console.log(errorParamsJSON);
        if (!errorParamsJSON.includes("Received unexpected value during emit")) {
            $A.util.removeClass(component.find("messages"), "slds-hide");
        }
        // End work-around

        helper.isWaiting(component, false);
    },

    handleClickCancel : function(component, event, helper) {
        helper.isWaiting(component, true);
        helper.navigateScreen6(component);
    }

})