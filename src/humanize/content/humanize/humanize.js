//humanize
Ext.namespace ('humanize');
//if(!humanize)humanize = {};

(function(moment){
	"use strict";
	var humanize = {};
	
	//apply moment overrides
	var moment = moment;
	moment.calendar.lastYear = ' MMMM DD [at] LT';
	moment.calendar.sameElse=' MMMM DD[,] YYYY'; 
	moment.fn.calendar=function () {
		var diff = this.diff(moment().sod(),'days', true),
			calendar = this.lang().calendar,
			allElse = calendar.sameElse,
			format = diff < -355 ? allElse :
			diff < -6 ? calendar.lastYear :
			diff < -1 ? calendar.lastWeek :
			diff < 0 ? calendar.lastDay :
			diff < 1 ? calendar.sameDay :
			diff < 2 ? calendar.nextDay :
			diff < 7 ? calendar.nextWeek : allElse;
		return this.format(typeof format === 'function' ? format.apply(this) : format);
	};
	

	/*
	 * Returns a human readable string for the relative time of now to the inputted date.
	 * 
	 *  Example:
	 *  timeago( tomorrow());
	 *  returns in one day
	 */
	humanize.timeAgo = function (date) {
		return moment(date).fromNow();
	};

	/*
	 * Returns an int casted from a string. Returns 0 if number cannot be parsed.
	 * 
	 *  Example:
	 *  stringToInt ("2") 
	 *  returns 2
	 */
	humanize.calendarTimeAgo = function (date) {
		return moment(date).calendar();
	};

	humanize.duration = function (milliseconds) {
		return moment.humanizeDuration(milliseconds);
	};

	humanize.usMoney = function (decimal) {
		return Ext.util.Format.usMoney(decimal);
	};

	humanize.fileSize = function (bytes) {
		return Ext.util.Format.fileSize(bytes);
	};

	humanize.ellipsis = function (text,number) {
		return Ext.util.Format.ellipsis(text,number);
	};

	humanize.getPicklistLabel = function(picklistName,value){
		var picklistStoreKey = "xcp.picklist." + picklistName;
		var store = Ext.data.StoreManager.lookup(picklistStoreKey);
		var label= '';
		if (store) {
			var index = store.find("value", value, 0, false, true, true);
			if (index !== -1) {
				var record = store.getAt(index);
				label = record.get("label");
			}
			else{
			console.log("Value not found",value,picklistName,index);
		}
		}else{
			console.log("Picklist not found",picklistName);
		}
		return label;
	};

	humanize.toStars =function(rating,maxRating,iconPath){
		var max = maxRating ? maxRating : 10;
		var path = iconPath ? iconPath : 'Artifacts/Resources/humanize';
		var starCnt = rating === 0 ? 0 : Math.ceil((rating/max) * 10);
		return '<img src="' + path + '/stars' + starCnt + '.png" height="16px" width="85px" />';
	};
	
	humanize.stringToBool= function(text){
		if(text === ''){
			return '';
		}
		return (text === 'true') ? true :false;
	};

	humanize.intToString= function(number){
		return number.toString();
	};

	/************************************
			Exposing Humanize
		************************************/

		var hasModule = (typeof module !== 'undefined' && module.exports);
		// CommonJS module is defined
		if (hasModule) {
			module.exports = humanize;
		} /*global ender:false */
		if (typeof ender === 'undefined') {
			window.humanize = humanize;
		} /*global define:false */
		if (typeof define === "function" && define.amd) {
			define("humanize", ["moment"], function() {
				return humanize;
			});
		}


}(moment));







