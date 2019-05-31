/**
 * Created by mbuhler on 2018-04-06.
 */
({

    navigateScreen4 : function(component) {
        var event = component.getEvent("NavigateScreen4");
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