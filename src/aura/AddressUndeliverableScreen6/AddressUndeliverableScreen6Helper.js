/**
 * Created by mbuhler on 2018-04-09.
 */
({

    closeModal: function() {
        $A.get("e.force:closeQuickAction").fire();
    },

    refreshView: function() {
        $A.get("e.force:refreshView").fire();
    }

})