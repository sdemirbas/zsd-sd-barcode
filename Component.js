sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/eurogidaZSD_BARCOD_SCANNER/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.eurogidaZSD_BARCOD_SCANNER.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			this.getRouter().initialize();
			
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			
			//global model
			var m = new sap.ui.model.json.JSONModel();
			m.setData({
				entity: ""
			});
			this.setModel(m, "DETAIL");
			
		}
	});
});