/**
* This file was auto-generated by SAP Web IDE build and includes all
* the source files required by SAPUI5 runtime for performance optimization.
* PLEASE DO NOT EDIT THIS FILE!! Changes will be overwritten the next time the build is run.
*/
jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "com/eurogidaZSD_BARCOD_SCANNER/Component-preload",
	"modules": {
		"com/eurogidaZSD_BARCOD_SCANNER/view/Master.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\r\n\tcontrollerName=\"com.eurogidaZSD_BARCOD_SCANNER.controller.Master\" xmlns:html=\"http://www.w3.org/1999/xhtml\">\r\n\t<App>\r\n\t\t<pages>\r\n\t\t\t<Page title=\"Sipariş Belgeleri\">\r\n\t\t\t\t<subHeader>\r\n\t\t\t\t\t<Bar>\r\n\t\t\t\t\t\t<contentLeft>\r\n\t\t\t\t\t\t\t<SearchField placeholder=\"Ara\" showSearchButton=\"true\" width=\"100%\" search=\"onSearch\"/>\r\n\t\t\t\t\t\t</contentLeft>\r\n\t\t\t\t\t</Bar>\r\n\t\t\t\t</subHeader>\r\n\t\t\t\t<content>\r\n\t\t\t\t\t<List items=\"{ServisOdata>/HeaderSet}\" id=\"idList\">\r\n\t\t\t\t\t\t<ObjectListItem title=\"{ServisOdata>NameKunwe}\"  press=\"onListItemPress\" type=\"Navigation\" \r\n\t\t\t\t\t\t\tnumber=\"{ServisOdata>Netwr}\"\r\n\t\t\t\t\t\t\tnumberUnit=\"{ServisOdata>Waerk}\">\r\n\t\t\t\t\t\t\t<ObjectAttribute text=\"Belge : {ServisOdata>Vbeln}\"/>\r\n\t\t\t\t\t\t\t<ObjectAttribute text=\"{ServisOdata>Kunnr} - {ServisOdata>NameKunnr}\"/>\r\n\t\t\t\t\t\t</ObjectListItem>\r\n\t\t\t\t\t</List>\r\n\t\t\t\t</content>\r\n\t\t\t\t<footer>\r\n\t\t\t\t\t<Bar>\r\n\t\t\t\t\t\t<contentRight></contentRight>\r\n\t\t\t\t\t</Bar>\r\n\t\t\t\t</footer>\r\n\t\t\t</Page>\r\n\t\t</pages>\r\n\t</App>\r\n</mvc:View>",
		"com/eurogidaZSD_BARCOD_SCANNER/controller/Detail.controller.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\",\r\n\t\"sap/ndc/BarcodeScanner\",\r\n\t\"sap/m/MessageToast\",\r\n\t\"sap/m/MessageBox\",\r\n\t\"com/eurogidaZSD_BARCOD_SCANNER/model/formatter\"\r\n], function(Controller, BarcodeScanner, MessageToast, MessageBox, formatter) {\r\n\t\"use strict\";\r\n\r\n\tvar oRouter;\r\n\tvar that;\r\n\treturn Controller.extend(\"com.eurogidaZSD_BARCOD_SCANNER.controller.Detail\", {\r\n\r\n\t\tformatter: formatter,\r\n\r\n\t\tonInit: function() {\r\n\r\n\t\t\t/*\t\t\tsap.ui.getCore().getEventBus().subscribe(\"com.eurogidaZSD_BARCOD_SCANNER\", \"PDFLoaded\", this._pastelPdfLoaded, this);\r\n\t\t\t */\r\n\t\t\toRouter = sap.ui.core.UIComponent.getRouterFor(this);\r\n\t\t\tvar oTarget = oRouter.getTarget(\"Detail\");\r\n\t\t\tthat = this;\r\n\t\t\toTarget.attachDisplay(this.onDisplay);\r\n\t\t},\r\n\r\n\t\tonDisplay: function() {\r\n\t\t\tif (that.getOwnerComponent().getModel(\"DETAIL\") !== undefined) {\r\n\t\t\t\tthat.getView().byId(\"idPdfPanel\").setVisible(false);\r\n\t\t\t\tvar m = new sap.ui.model.json.JSONModel();\r\n\t\t\t\tm.setData(that.getOwnerComponent().getModel(\"DETAIL\").getData().entity);\r\n\t\t\t\tthat.getView().setModel(m, \"DETAIL\");\r\n\t\t\t\tthat.filterItems();\r\n\r\n\t\t\t}\r\n\r\n\t\t},\r\n\r\n\t\tfilterItems: function() {\r\n\t\t\tvar aFilter = [];\r\n\r\n\t\t\tvar v = this.getOwnerComponent().getModel(\"DETAIL\").getData().entity.Vbeln;\r\n\t\t\taFilter.push(new sap.ui.model.Filter(\"Vbeln\", sap.ui.model.FilterOperator.EQ, v));\r\n\r\n\t\t\tvar oModel = this.getOwnerComponent().getModel(\"ServisOdata\");\r\n\r\n\t\t\toModel.read(\"/ItemSet\", {\r\n\t\t\t\tfilters: aFilter,\r\n\t\t\t\tsuccess: function(oData) {\r\n\r\n\t\t\t\t\tvar m = new sap.ui.model.json.JSONModel();\r\n\t\t\t\t\tm.setData({\r\n\t\t\t\t\t\tList: oData.results\r\n\t\t\t\t\t});\r\n\r\n\t\t\t\t\tthat.items = oData.results;\r\n\t\t\t\t\tthat.getView().setModel(m, \"ITEMS\");\r\n\t\t\t\t\tthat.showTeslimatOlusturButton(oData.results);\r\n\r\n\t\t\t\t},\r\n\t\t\t\terror: function(error) {\r\n\t\t\t\t\tconsole.log(error);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t},\r\n\r\n\t\tshowTeslimatOlusturButton: function(arr) {\r\n\t\t\tthis.getView().byId(\"idTeslimatOlusturButton\").setVisible(true);\r\n\r\n\t\t\tfor (var i = 0; i < arr.length; i++) {\r\n\t\t\t\tif (arr[i].Status === \"INPROCESS\" && arr[i].Pstyv !== \"ZUST\") {\r\n\t\t\t\t\tthis.getView().byId(\"idTeslimatOlusturButton\").setVisible(false);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t},\r\n\r\n\t\tonPress: function(oEvent) {\r\n\t\t\tvar m = oEvent.getSource().getParent().oBindingContexts.ITEMS.oModel;\r\n\t\t\tvar p = oEvent.getSource().getParent().oBindingContexts.ITEMS.sPath;\r\n\t\t\tvar vbeln = m.getProperty(p).Vbeln;\r\n\t\t\tvar posnr = m.getProperty(p).Posnr;\r\n\r\n\t\t\tsap.ndc.BarcodeScanner.scan(\r\n\t\t\t\tfunction(mResult) {\r\n\t\t\t\t\t// alert(\"We got a bar code\\n\" +\r\n\t\t\t\t\t// \t\"Result: \" + mResult.text + \"\\n\" +\r\n\t\t\t\t\t// \t\"Format: \" + mResult.format + \"\\n\" +\r\n\t\t\t\t\t// \t\"Cancelled: \" + mResult.cancelled);\r\n\t\t\t\t\tif (mResult.text !== \"\" && !mResult.cancelled) {\r\n\t\t\t\t\t\tthat.saveBarcode(vbeln, posnr, mResult.text);\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t},\r\n\t\t\t\tfunction(Error) {\r\n\t\t\t\t\talert(\"Scanning failed: \" + Error);\r\n\t\t\t\t}\r\n\t\t\t);\r\n\t\t},\r\n\r\n\t\tonOpenBarcodInput: function(oEvent) {\r\n\r\n\t\t\tvar m = oEvent.getSource().getParent().oBindingContexts.ITEMS.oModel;\r\n\t\t\tvar p = oEvent.getSource().getParent().oBindingContexts.ITEMS.sPath;\r\n\t\t\tthis.vbeln = m.getProperty(p).Vbeln;\r\n\t\t\tthis.posnr = m.getProperty(p).Posnr;\r\n\r\n\t\t\tif (!this.barcodInputFragment) {\r\n\t\t\t\tthis.barcodInputFragment = new sap.ui.xmlfragment(\"com.eurogidaZSD_BARCOD_SCANNER.view.BarcodInput\", this);\r\n\t\t\t}\r\n\r\n\t\t\tthis.barcodInputFragment.open();\r\n\t\t},\r\n\r\n\t\tonCloseBarcodInputFragment: function(oEvent) {\r\n\t\t\tthis.barcodInputFragment.close();\r\n\t\t\tthis.barcodInputFragment.destroy();\r\n\t\t\tthis.barcodInputFragment = undefined;\r\n\t\t},\r\n\r\n\t\tonSaveBarcodInput: function(oEvent) {\r\n\t\t\tvar barcod = sap.ui.getCore().byId(\"idBarcodInput\").getValue();\r\n\t\t\tif (barcod === \"\") {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.saveBarcode(this.vbeln, this.posnr, barcod);\r\n\t\t\tthis.barcodInputFragment.close();\r\n\t\t\tsap.ui.getCore().byId(\"idBarcodInput\").setValue(\"\");\r\n\t\t\tthis.vbeln = undefined;\r\n\t\t\tthis.posnr = undefined;\r\n\t\t},\r\n\r\n\t\tsaveBarcode: function(v, p, b) {\r\n\t\r\n\t\t\tvar oModel = new sap.ui.model.odata.v2.ODataModel(\"/sap/opu/odata/sap/ZSD_BARCOD_SCANNER_V2_SRV/\");\r\n\t\t\t\r\n\t\t\tvar oURLParameters = {\r\n\t\t\t\tBARKOD: b,\r\n\t\t\t\tI_VBELN: v,\r\n\t\t\t\tPOSNR: p\r\n\t\t\t};\r\n\r\n\t\t\toModel.callFunction(\"/BarcodCheck\", {\r\n\t\t\t\tmethod: \"POST\",\r\n\t\t\t\turlParameters: oURLParameters,\r\n\t\t\t\tsuccess: jQuery.proxy(this.successActivateFn, this),\r\n\t\t\t\terror: jQuery.proxy(this.fnErrorFunction, this)\r\n\t\t\t});\r\n\t\t},\r\n\r\n\t\tsuccessActivateFn: function(data) {\r\n\t\t\tif (this.goMaster === \"X\" && data.Type !== \"X\") {\r\n\r\n\t\t\t\tvar oModel = this.getOwnerComponent().getModel(\"ServisOdata\");\r\n\t\t\t\toModel.refresh();\r\n\r\n\t\t\t\tsap.m.MessageBox.success(\r\n\t\t\t\t\tdata.Message, {\r\n\t\t\t\t\t\ticon: sap.m.MessageBox.Icon.SUCCESS,\r\n\t\t\t\t\t\tactions: [sap.m.MessageBox.Action.OK],\r\n\t\t\t\t\t\tonClose: function(oAction) {\r\n\t\t\t\t\t\t\tif (oAction === sap.m.MessageBox.Action.OK) {\r\n\t\t\t\t\t\t\t\tthat.goMaster = \"\";\r\n\t\t\t\t\t\t\t\toRouter.getTargets().display(\"Master\");\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t);\r\n\r\n\t\t\t} else if (data.Type !== \"X\") {\r\n\t\t\t\tMessageBox.success(data.Message);\r\n\t\t\t} else {\r\n\t\t\t\tMessageBox.warning(data.Message);\r\n\t\t\t}\r\n\r\n\t\t\tthis.filterItems();\r\n\t\t},\r\n\r\n\t\tfnErrorFunction: function(E) {\r\n\t\t\tsap.ui.core.BusyIndicator.hide();\r\n\t\t\tif (E.responseText) {\r\n\t\t\t\ttry {\r\n\t\t\t\t\tvar o = jQuery.parseJSON(E.responseText);\r\n\t\t\t\t\tif (o.error && o.error.message && o.error.message.value) {\r\n\t\t\t\t\t\tMessageBox.warning(o.error.message.value);\r\n\t\t\t\t\t}\r\n\t\t\t\t} catch (e) {\r\n\t\t\t\t\tMessageBox.warning(o.error.message.value);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t},\r\n\r\n\t\t//ust kalem anonım barcod kaydetme\r\n\t\tsaveUstItemBarcod: function() {\r\n\t\t\tvar chekcUstKale = false;\r\n\t\t\tfor (var i = 0; i < that.items.length; i++) {\r\n\t\t\t\tif (that.items[i].Pstyv === \"ZUST\") {\r\n\t\t\t\t\tchekcUstKale = true;\r\n\t\t\t\t\tthis._saveBarcod(that.items[i].Vbeln, that.items[i].Posnr, \"ZUST\");\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tif (!chekcUstKale) {\r\n\t\t\t\tthis._TeslimatOlustur();\r\n\t\t\t}\r\n\t\t},\r\n\r\n\t\t_saveBarcod: function(vbeln, posnr, barcod) {\r\n\t\t\t//sadece üst kalem için barcod kaydetme\r\n\t\t\tvar oModel = new sap.ui.model.odata.v2.ODataModel(\"/sap/opu/odata/sap/ZSD_BARCOD_SCANNER_V2_SRV/\");\r\n\r\n\t\t\tvar oURLParameters = {\r\n\t\t\t\tBARKOD: barcod,\r\n\t\t\t\tI_VBELN: vbeln,\r\n\t\t\t\tPOSNR: posnr\r\n\t\t\t};\r\n\r\n\t\t\toModel.callFunction(\"/BarcodCheck\", {\r\n\t\t\t\tmethod: \"POST\",\r\n\t\t\t\turlParameters: oURLParameters,\r\n\t\t\t\tsuccess: jQuery.proxy(this.successActivateFn2, this),\r\n\t\t\t\terror: jQuery.proxy(this.fnErrorFunction, this)\r\n\t\t\t});\r\n\t\t},\r\n\r\n\t\tsuccessActivateFn2: function() {\r\n\t\t\tthis._TeslimatOlustur();\r\n\t\t},\r\n\t\t//ust kalem anonım barcod kaydetme son\r\n\r\n\t\tonTeslimatOlustur: function() {\r\n\t\t\tsap.m.MessageBox.show(\r\n\t\t\t\t\"İşleme devam edilsin mi ? \", {\r\n\t\t\t\t\ticon: sap.m.MessageBox.Icon.INFORMATION,\r\n\t\t\t\t\tactions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],\r\n\t\t\t\t\tonClose: function(oAction) {\r\n\t\t\t\t\t\tif (oAction === sap.m.MessageBox.Action.YES) {\r\n\t\t\t\t\t\t\tthat.saveUstItemBarcod();\r\n\t\t\t\t\t\t\t//that._TeslimatOlustur();\r\n\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t//işlemi iptal et.\r\n\t\t\t\t\t\t\treturn;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t);\r\n\t\t},\r\n\r\n\t\t_TeslimatOlustur: function() {\r\n\t\t\tthis.goMaster = \"X\";\r\n\t\t\tvar oModel = new sap.ui.model.odata.v2.ODataModel(\"/sap/opu/odata/sap/ZSD_BARCOD_SCANNER_V2_SRV/\");\r\n\t\t\tvar v = that.getOwnerComponent().getModel(\"DETAIL\").getData().entity.Vbeln;\r\n\r\n\t\t\tvar oURLParameters = {\r\n\t\t\t\tI_VBELN: v\r\n\t\t\t};\r\n\r\n\t\t\toModel.callFunction(\"/TeslimatOlustur\", {\r\n\t\t\t\tmethod: \"POST\",\r\n\t\t\t\turlParameters: oURLParameters,\r\n\t\t\t\tsuccess: jQuery.proxy(this.successActivateFn, this),\r\n\t\t\t\terror: jQuery.proxy(this.fnErrorFunction, this)\r\n\t\t\t});\r\n\t\t},\r\n\r\n\t\tgetPdf: function() {\r\n\t\t\t// var v = that.getOwnerComponent().getModel(\"DETAIL\").getData().entity.Vbeln;\r\n\t\t\t// var sUrl = \"/sap/opu/odata/sap/ZSD_BARCOD_SCANNER_V2_SRV/PdfSet('\" + v + \"')\";\r\n\r\n\t\t\t// let oLoadEvent = \"sap.ui.getCore().getEventBus().publish('com.eurogidaZSD_BARCOD_SCANNER', 'PDFLoaded')\";\r\n\t\t\t// let sSource = \"<iframe name='pastelLabelPdf' src='\" + jQuery.sap.encodeHTML(sUrl + \"/$value\") + \"' onLoad='\" + jQuery.sap.encodeHTML(\r\n\t\t\t// \toLoadEvent) + \"' width='100%' height='500px' type='application/pdf'/>\";\r\n\r\n\t\t\t//this.getView().byId(\"idIFrame\").setContent(sSource);\r\n\r\n\t\t\tvar v = that.getOwnerComponent().getModel(\"DETAIL\").getData().entity.Vbeln;\r\n\t\t\tvar sUrl = \"/sap/opu/odata/sap/ZSD_BARCOD_SCANNER_V2_SRV/PdfSet('\" + v + \"')/$value\";\r\n\t\t\tthis.getView().byId(\"pdfViewer\").setSource(sUrl);\r\n\r\n\t\t},\r\n\r\n\t\tonPrint: function() {\r\n\t\t\tthat.getView().byId(\"idPdfPanel\").setVisible(true);\r\n\t\t\tthis.getPdf();\r\n\t\t\t// var headContents = $(\"head\").html();\r\n\t\t\t// var he = '<html><head><title>Form</title>' + headContents + '</head><body>';\r\n\r\n\t\t\t// var bodyContent = $(\".printArea\").html();\r\n\t\t\t// var co = \"<div style='width:220mm' class='formpage'>\" + bodyContent + \"</div>\";\r\n\t\t\t// var clo = \"</body></html>\";\r\n\t\t\t// var htmlpage = he + co + clo;\r\n\r\n\t\t\t// cordova.plugins.printer.print(htmlpage, {\r\n\t\t\t// \tduplex: 'long'\r\n\t\t\t// }, function(res) {\r\n\t\t\t// \talert(\"yes\");\r\n\t\t\t// });\r\n\r\n\t\t\t/*var v = that.getOwnerComponent().getModel(\"DETAIL\").getData().entity.Vbeln;\r\n\t\t\tvar sUrl = \"/sap/opu/odata/sap/ZSD_BARCOD_SCANNER_V2_SRV/PdfSet('\" + v + \"')/$value\";\r\n\t\t\tprintJS(sUrl);*/\r\n\r\n\t\t\t/*\tlet oPastelLabelFrame = window.frames.pastelLabelPdf;\r\n\r\n\t\t\t\ttry {\r\n\t\t\t\t\toPastelLabelFrame.focus();\r\n\t\t\t\t\toPastelLabelFrame.print();\r\n\t\t\t\t\toPastelLabelFrame.close();\r\n\t\t\t\t} catch (e) {\r\n\t\t\t\t\tMessageToast.show(this.getResourceBundle().getText(\"autoPrintNotSupported\"));\r\n\t\t\t\t}*/\r\n\t\t},\r\n\r\n\t\t_pastelPdfLoaded: function() {\r\n\t\t\t/*\tlet oPastelLabelFrame = window.frames.pastelLabelPdf;\r\n\r\n\t\t\t\ttry {\r\n\t\t\t\t\toPastelLabelFrame.focus();\r\n\t\t\t\t\toPastelLabelFrame.print();\r\n\t\t\t\t\toPastelLabelFrame.close();\r\n\t\t\t\t} catch (e) {\r\n\t\t\t\t\tMessageToast.show(this.getResourceBundle().getText(\"autoPrintNotSupported\"));\r\n\t\t\t\t}*/\r\n\t\t},\r\n\r\n\t\t/*\t\tonExit: function() {\r\n\t\t\t\t\tsap.ui.getCore().getEventBus().unsubscribe(\"com.eurogidaZSD_BARCOD_SCANNER\", \"PDFLoaded\", this._pastelPdfLoaded);\r\n\t\t\t\t},*/\r\n\r\n\t\tonBackToMaster: function() {\r\n\t\t\toRouter.getTargets().display(\"Master\");\r\n\t\t}\r\n\r\n\t});\r\n\r\n});",
		"com/eurogidaZSD_BARCOD_SCANNER/controller/Master.controller.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\"\r\n], function(Controller) {\r\n\t\"use strict\";\r\n\r\n\tvar oRouter;\r\n\r\n\treturn Controller.extend(\"com.eurogidaZSD_BARCOD_SCANNER.controller.Master\", {\r\n\r\n\t\tonInit: function() {\r\n\r\n\t\t\toRouter = sap.ui.core.UIComponent.getRouterFor(this);\r\n\t\t\toRouter.getTargets().display(\"Detail\");\r\n\t\t\tvar oTarget = oRouter.getTarget(\"Master\");\r\n\t\t\toTarget.attachDisplay(this.onDisplay);\r\n\r\n\t\t},\r\n\r\n\t\tonDisplay: function() {\r\n\r\n\t\t},\r\n\r\n\t\tonListItemPress: function(e) {\r\n\t\t\tvar p = e.getSource().getBindingContextPath();\r\n\t\t\tvar m = e.getSource().oBindingContexts.ServisOdata.oModel;\r\n\r\n\t\t\tthis.getOwnerComponent().getModel(\"DETAIL\").setData({\r\n\t\t\t\tentity: m.getProperty(p)\r\n\t\t\t});\r\n\r\n\t\t\toRouter.getTargets().display(\"Detail\");\r\n\t\t},\r\n\r\n\t\tonSearch: function(e) {\r\n\t\t\tvar sQuery = e.getParameter(\"query\");\r\n\t\t\tvar aFilter = [];\r\n\t\t\tif (sQuery) {\r\n\t\t\t\taFilter.push(new sap.ui.model.Filter(\"Vbeln\", sap.ui.model.FilterOperator.EQ, sQuery));\r\n\t\t\t}\r\n\t\t\tvar oList = this.getView().byId(\"idList\");\r\n\t\t\tvar oBinding = oList.getBinding(\"items\");\r\n\t\t\toBinding.filter(aFilter);\r\n\t\t}\r\n\r\n\t});\r\n\r\n});",
		"com/eurogidaZSD_BARCOD_SCANNER/Component.js": "sap.ui.define([\r\n\t\"sap/ui/core/UIComponent\",\r\n\t\"sap/ui/Device\",\r\n\t\"com/eurogidaZSD_BARCOD_SCANNER/model/models\"\r\n], function(UIComponent, Device, models) {\r\n\t\"use strict\";\r\n\r\n\treturn UIComponent.extend(\"com.eurogidaZSD_BARCOD_SCANNER.Component\", {\r\n\r\n\t\tmetadata: {\r\n\t\t\tmanifest: \"json\"\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.\r\n\t\t * @public\r\n\t\t * @override\r\n\t\t */\r\n\t\tinit: function() {\r\n\t\t\t// call the base component's init function\r\n\t\t\tUIComponent.prototype.init.apply(this, arguments);\r\n\t\t\t\r\n\t\t\tthis.getRouter().initialize();\r\n\t\t\t\r\n\t\t\t// set the device model\r\n\t\t\tthis.setModel(models.createDeviceModel(), \"device\");\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t//global model\r\n\t\t\tvar m = new sap.ui.model.json.JSONModel();\r\n\t\t\tm.setData({\r\n\t\t\t\tentity: \"\"\r\n\t\t\t});\r\n\t\t\tthis.setModel(m, \"DETAIL\");\r\n\t\t\t\r\n\t\t}\r\n\t});\r\n});",
		"com/eurogidaZSD_BARCOD_SCANNER/view/BarcodInput.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" xmlns:core=\"sap.ui.core\" xmlns:tb=\"sap.ui.table\">\r\n\t<Dialog title=\"Barcod\" afterClose=\"onAfterClose\">\r\n\t\t<content>\r\n\t\t\t<Panel>\r\n\t\t\t\t<Input id=\"idBarcodInput\" submit=\"onSaveBarcodInput\" ></Input>\r\n\t\t\t</Panel>\r\n\t\t</content>\r\n\t\t<beginButton>\r\n\t\t\t<Button text=\"Kaydet\" icon=\"sap-icon://save\" press=\"onSaveBarcodInput\"></Button>\r\n\t\t</beginButton>\r\n\t\t<endButton>\r\n\t\t\t<Button text=\"Kapat\" press=\"onCloseBarcodInputFragment\"></Button>\r\n\t\t</endButton>\r\n\t</Dialog>\r\n</core:FragmentDefinition>",
		"com/eurogidaZSD_BARCOD_SCANNER/view/Detail.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" xmlns:f=\"sap.ui.layout.form\"\r\n\tcontrollerName=\"com.eurogidaZSD_BARCOD_SCANNER.controller.Detail\" xmlns:html=\"http://www.w3.org/1999/xhtml\">\r\n\t<App>\r\n\t\t<pages>\r\n\t\t\t<Page title=\"{DETAIL>/Vbeln} - Sipariş Detayı\" navButtonPress=\"onBackToMaster\" showNavButton=\"true\">\r\n\t\t\t\t<content>\r\n\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\r\n\t\t\t\t\t\t<f:Form editable=\"false\">\r\n\t\t\t\t\t\t\t<f:title>\r\n\t\t\t\t\t\t\t\t<core:Title text=\"Genel Bilgiler\"/>\r\n\t\t\t\t\t\t\t</f:title>\r\n\t\t\t\t\t\t\t<f:layout>\r\n\t\t\t\t\t\t\t\t<f:ResponsiveGridLayout labelSpanXL=\"3\" labelSpanL=\"3\" labelSpanM=\"3\" labelSpanS=\"12\" adjustLabelSpan=\"false\" emptySpanXL=\"4\" emptySpanL=\"4\"\r\n\t\t\t\t\t\t\t\t\temptySpanM=\"4\" emptySpanS=\"0\" columnsXL=\"1\" columnsL=\"1\" columnsM=\"1\" singleContainerFullSize=\"false\"/>\r\n\t\t\t\t\t\t\t</f:layout>\r\n\t\t\t\t\t\t\t<f:formContainers>\r\n\t\t\t\t\t\t\t\t<f:FormContainer>\r\n\t\t\t\t\t\t\t\t\t<f:formElements>\r\n\t\t\t\t\t\t\t\t\t\t<f:FormElement label=\"{i18n>Vbeln}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<f:fields>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<Text text=\"{DETAIL>/Vbeln}\"/>\r\n\t\t\t\t\t\t\t\t\t\t\t</f:fields>\r\n\t\t\t\t\t\t\t\t\t\t</f:FormElement>\r\n\t\t\t\t\t\t\t\t\t\t<f:FormElement label=\"{i18n>Kunwe}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<f:fields>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<Text text=\"{DETAIL>/Kunwe} - {DETAIL>/NameKunwe}\"/>\r\n\t\t\t\t\t\t\t\t\t\t\t</f:fields>\r\n\t\t\t\t\t\t\t\t\t\t</f:FormElement>\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Kunnr}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Kunnr} - {DETAIL>/NameKunnr}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Erdat}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{path:'DETAIL>/Erdat', type: 'sap.ui.model.type.DateTime'}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Ernam}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Ernam}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<f:FormElement label=\"{i18n>Audat}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<f:fields>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<Text text=\"{path:'DETAIL>/Audat', type: 'sap.ui.model.type.DateTime'}\"/>\r\n\t\t\t\t\t\t\t\t\t\t\t</f:fields>\r\n\t\t\t\t\t\t\t\t\t\t</f:FormElement>\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Auart}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Auart}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<f:FormElement label=\"{i18n>Netwr}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<f:fields>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<Text text=\"{DETAIL>/Netwr} {DETAIL>/Waerk}\"/>\r\n\t\t\t\t\t\t\t\t\t\t\t</f:fields>\r\n\t\t\t\t\t\t\t\t\t\t</f:FormElement>\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Vkorg}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Vkorg}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Vtweg}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Vtweg}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Spart}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Spart}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Vkgrp}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Vkgrp}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<f:FormElement label=\"{i18n>Vkbur}\">-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t<f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t\t<Text text=\"{DETAIL>/Vkbur}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--\t</f:fields>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--</f:FormElement>-->\r\n\t\t\t\t\t\t\t\t\t\t<f:FormElement label=\"{i18n>Vdatu}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<f:fields>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<Text text=\"{path:'DETAIL>/Vdatu', type: 'sap.ui.model.type.DateTime'}\"/>\r\n\t\t\t\t\t\t\t\t\t\t\t</f:fields>\r\n\t\t\t\t\t\t\t\t\t\t</f:FormElement>\r\n\t\t\t\t\t\t\t\t\t</f:formElements>\r\n\t\t\t\t\t\t\t\t</f:FormContainer>\r\n\t\t\t\t\t\t\t</f:formContainers>\r\n\t\t\t\t\t\t</f:Form>\r\n\t\t\t\t\t</VBox>\r\n\t\t\t\t\t<Panel>\r\n\t\t\t\t\t\t<Table id=\"idItems\" inset=\"false\" items=\"{ITEMS>/List}\" width=\"100%\">\r\n\t\t\t\t\t\t\t<columns>\r\n\t\t\t\t\t\t\t\t<Column width=\"2em\" hAlign=\"Center\" vAlign=\"Middle\"></Column>\r\n\t\t\t\t\t\t\t\t<Column width=\"2em\" hAlign=\"Center\" vAlign=\"Middle\"></Column>\r\n\t\t\t\t\t\t\t\t<Column width=\"2em\" hAlign=\"Left\" vAlign=\"Middle\">\r\n\t\t\t\t\t\t\t\t\t<Text text=\"{i18n>Posnr}\"/>\r\n\t\t\t\t\t\t\t\t</Column>\r\n\t\t\t\t\t\t\t\t<Column width=\"6em\" hAlign=\"Left\" vAlign=\"Middle\">\r\n\t\t\t\t\t\t\t\t\t<Text text=\"{i18n>Matnr}\"/>\r\n\t\t\t\t\t\t\t\t</Column>\r\n\t\t\t\t\t\t\t\t<Column width=\"9em\" hAlign=\"Left\" vAlign=\"Middle\">\r\n\t\t\t\t\t\t\t\t\t<Text text=\"{i18n>Arktx}\"/>\r\n\t\t\t\t\t\t\t\t</Column>\r\n\t\t\t\t\t\t\t\t<!--<Column width=\"5em\" minScreenWidth=\"desktop\" demandPopin=\"true\" hAlign=\"Left\" vAlign=\"Middle\">-->\r\n\t\t\t\t\t\t\t\t<!--\t<Text text=\"{i18n>Matkl}\"/>-->\r\n\t\t\t\t\t\t\t\t<!--</Column>-->\r\n\t\t\t\t\t\t\t\t<!--<Column width=\"5em\" minScreenWidth=\"desktop\" demandPopin=\"true\" hAlign=\"Left\" vAlign=\"Middle\">-->\r\n\t\t\t\t\t\t\t\t<!--\t<Text text=\"{i18n>Charg}\"/>-->\r\n\t\t\t\t\t\t\t\t<!--</Column>-->\r\n\t\t\t\t\t\t\t\t<!--<Column width=\"5em\" minScreenWidth=\"desktop\" demandPopin=\"true\" hAlign=\"Left\" vAlign=\"Middle\">-->\r\n\t\t\t\t\t\t\t\t<!--\t<Text text=\"{i18n>Netwr}\"/>-->\r\n\t\t\t\t\t\t\t\t<!--</Column>-->\r\n\t\t\t\t\t\t\t\t<!--<Column width=\"5em\" minScreenWidth=\"desktop\" demandPopin=\"true\" hAlign=\"Left\" vAlign=\"Middle\">-->\r\n\t\t\t\t\t\t\t\t<!--\t<Text text=\"{i18n>Vstel}\"/>-->\r\n\t\t\t\t\t\t\t\t<!--</Column>-->\r\n\t\t\t\t\t\t\t\t<Column width=\"5em\" hAlign=\"Left\" vAlign=\"Middle\">\r\n\t\t\t\t\t\t\t\t\t<Text text=\"{i18n>Kwmeng}\"/>\r\n\t\t\t\t\t\t\t\t</Column>\r\n\t\t\t\t\t\t\t\t<Column width=\"5em\" hAlign=\"Left\" vAlign=\"Middle\">\r\n\t\t\t\t\t\t\t\t\t<Text text=\"{i18n>Scanned}\"/>\r\n\t\t\t\t\t\t\t\t</Column>\r\n\t\t\t\t\t\t\t</columns>\r\n\t\t\t\t\t\t\t<items>\r\n\t\t\t\t\t\t\t\t<ColumnListItem>\r\n\t\t\t\t\t\t\t\t\t<cells>\r\n\t\t\t\t\t\t\t\t\t\t<Button press=\"onPress\" icon=\"sap-icon://bar-code\" type=\"Transparent\"\r\n\t\t\t\t\t\t\t\t\t\t\tvisible=\"{ parts: [ {path: 'ITEMS>Status'}, {path: 'ITEMS>Pstyv'} ], formatter: '.formatter.visiblity' }\"/>\r\n\t\t\t\t\t\t\t\t\t\t<Button press=\"onOpenBarcodInput\" icon=\"sap-icon://edit\" type=\"Transparent\"\r\n\t\t\t\t\t\t\t\t\t\t\tvisible=\"{ parts: [ {path: 'ITEMS>Status'}, {path: 'ITEMS>Pstyv'} ], formatter: '.formatter.visiblity' }\"></Button>\r\n\t\t\t\t\t\t\t\t\t\t<Text text=\"{ITEMS>Posnr}\"/>\r\n\t\t\t\t\t\t\t\t\t\t<Text text=\"{ITEMS>Matwa}\"/>\r\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus text=\"{ITEMS>Arktx}\" state=\"None\"/>\r\n\t\t\t\t\t\t\t\t\t\t<!--<ObjectStatus text=\"{ITEMS>Matkl}\" state=\"Warning\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<Text text=\"{ITEMS>Charg}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<ObjectNumber number=\"{ITEMS>Netwr}\" unit=\"{ITEMS>Waerk}\" state=\"Success\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<!--<Text text=\"{ITEMS>Vstel}\"/>-->\r\n\t\t\t\t\t\t\t\t\t\t<Text text=\"{ITEMS>Kwmeng} {ITEMS>Meins}\"/>\r\n\t\t\t\t\t\t\t\t\t\t<Text text=\"{ITEMS>Scanned}\"/>\r\n\t\t\t\t\t\t\t\t\t</cells>\r\n\t\t\t\t\t\t\t\t</ColumnListItem>\r\n\t\t\t\t\t\t\t</items>\r\n\t\t\t\t\t\t</Table>\r\n\t\t\t\t\t</Panel>\r\n\t\t\t\t\t<!--<Panel expandable=\"true\" expanded=\"false\" headerText=\"Etiket\">\r\n\t\t\t\t\t\t<core:HTML id=\"idIFrame\"></core:HTML>\r\n\t\t\t\t\t</Panel>-->\r\n\t\t\t\t\t<Panel id=\"idPdfPanel\" height=\"100%\">\r\n\t\t\t\t\t\t<PDFViewer id=\"pdfViewer\" source=\"{/Source}\" title=\"Etiket\" height=\"100%\">\r\n\t\t\t\t\t\t\t<layoutData>\r\n\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\"/>\r\n\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t</PDFViewer>\r\n\t\t\t\t\t</Panel>\r\n\t\t\t\t</content>\r\n\t\t\t\t<footer>\r\n\t\t\t\t\t<Bar>\r\n\t\t\t\t\t\t<contentRight>\r\n\t\t\t\t\t\t\t<Button id=\"idPrint\" press=\"onPrint\" text=\"Etiket\" type=\"Emphasized\" icon=\"sap-icon://display\"/>\r\n\t\t\t\t\t\t\t<Button id=\"idTeslimatOlusturButton\" press=\"onTeslimatOlustur\" text=\"Teslimat Oluştur\" type=\"Emphasized\" visible=\"false\"/>\r\n\t\t\t\t\t\t</contentRight>\r\n\t\t\t\t\t</Bar>\r\n\t\t\t\t</footer>\r\n\t\t\t</Page>\r\n\t\t</pages>\r\n\t</App>\r\n</mvc:View>",
		"com/eurogidaZSD_BARCOD_SCANNER/controller/Main.controller.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\"\r\n], function(Controller) {\r\n\t\"use strict\";\r\n\r\n\treturn Controller.extend(\"com.eurogidaZSD_BARCOD_SCANNER.controller.Main\", {\r\n\r\n\t});\r\n});",
		"com/eurogidaZSD_BARCOD_SCANNER/model/models.js": "sap.ui.define([\r\n\t\"sap/ui/model/json/JSONModel\",\r\n\t\"sap/ui/Device\"\r\n], function(JSONModel, Device) {\r\n\t\"use strict\";\r\n\r\n\treturn {\r\n\r\n\t\tcreateDeviceModel: function() {\r\n\t\t\tvar oModel = new JSONModel(Device);\r\n\t\t\toModel.setDefaultBindingMode(\"OneWay\");\r\n\t\t\treturn oModel;\r\n\t\t}\r\n\r\n\t};\r\n});",
		"com/eurogidaZSD_BARCOD_SCANNER/view/pdf.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" xmlns:core=\"sap.ui.core\">\r\n\t<Dialog title=\"\">\r\n\t\t<content>\r\n\t\t\t<core:HTML id=\"idIFrame\"></core:HTML>\r\n\t\t</content>\r\n\t\t<beginButton>\r\n\t\t\t<Button text=\"Yazdır\" press=\"onPrintPdf\"/>\r\n\t\t</beginButton>\r\n\t\t<endButton>\r\n\t\t\t<Button text=\"Kapat\" press=\"onClosePdf\"/>\r\n\t\t</endButton>\r\n\t</Dialog>\r\n</core:FragmentDefinition>",
		"com/eurogidaZSD_BARCOD_SCANNER/view/Main.view.xml": "<mvc:View controllerName=\"com.eurogidaZSD_BARCOD_SCANNER.controller.Main\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\" displayBlock=\"true\" xmlns=\"sap.m\">\r\n\t<SplitApp id=\"mainApp\" />\r\n</mvc:View>",
		"com/eurogidaZSD_BARCOD_SCANNER/model/formatter.js": "sap.ui.define([\r\n\t\"sap/ui/model/json/JSONModel\",\r\n\t\"sap/ui/Device\",\r\n\t\"sap/m/MessageBox\"\r\n], function(JSONModel, Device, MessageBox, NumberFormat) {\r\n\t\"use strict\";\r\n\r\n\treturn {\r\n\t\t//skarakas\r\n\t\tvisiblity: function(status,Pstyv) {\r\n\t\t\t\r\n\t\t\tif(Pstyv === \"ZUST\"){\r\n\t\t\t\treturn false;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tif (status === \"COMPLETED\") {\r\n\t\t\t\treturn false;\r\n\t\t\t} else {\r\n\t\t\t\treturn true;\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n});"
	}
});