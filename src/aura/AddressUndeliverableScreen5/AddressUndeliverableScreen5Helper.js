/**
 * Created by mbuhler on 2018-04-09.
 */
({

    closeModal: function() {
        $A.get("e.force:closeQuickAction").fire();
    },

    validateForm : function(component) {
        var street1 = component.find("street1").get("v.value");
        var street2 = component.find("street2").get("v.value");
        var city = component.find("city").get("v.value");
        var province = component.find("province").get("v.value");
        var postalCode = component.find("postalCode").get("v.value");
        var country = component.find("country").get("v.value");

        if (this.isBlank(street1) && this.isBlank(street2) && this.isBlank(city) && this.isBlank(province) && this.isBlank(postalCode) && this.isBlank(country)) {
            return false;
        }
        return true;
    },

    isBlank : function(value) {
        if (typeof value === "undefined" || value.trim() === "") {
            return true;
        }
        return false;
    },

    navigateScreen6 : function(component) {
        var event = component.getEvent("NavigateScreen6");
        event.fire();
    },

    createAddress: function(component, accountId) {
        var street1 = component.find("street1").get("v.value");
        var street2 = component.find("street2").get("v.value");
        var city = component.find("city").get("v.value");
        var province = component.find("province").get("v.value");
        var postalCode = component.find("postalCode").get("v.value");
        var country = component.find("country").get("v.value");

        var action = component.get("c.createAddress");
        action.setParams({
            "accountId": accountId,
            "street1": street1,
            "street2": street2,
            "city": city,
            "province": province,
            "postalCode": postalCode,
            "country": country
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log("Success!");
                this.navigateScreen6(component);
            }
            else {
                console.log("Failed with state: " + state);
                this.isWaiting(component, false);
            }
        });
        $A.enqueueAction(action);
    },

    isWaiting: function(component, isWaiting) {
        component.set("v.isWaiting", isWaiting);
    }

})