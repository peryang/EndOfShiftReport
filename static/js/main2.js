Date.prototype.Format = function (fmt) { 
	var o = {
			"M+": this.getMonth() + 1, //month 
			"d+": this.getDate(), //date
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //min
			"s+": this.getSeconds(), //sec
			"q+": Math.floor((this.getMonth() + 3) / 3), 
			"S": this.getMilliseconds() //m-sec
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

var addEditEvent = function(tdObj){
	var index = tdObj.find("a").data("index");
	if("Qty_In_Safe" == index || "Replace" == index || "DECOM" == index || "Total" == index){
		// check
		tdObj.find("a").editable({
			type: 'text',
			pk: 1,
			name: index,
			title: 'Enter '+index,
			validate: function (value) {
				var reg = new RegExp("^[0-9]*$");
				if(!reg.test(value)){
					return 'Please enter a num';
				}
			}
		});
	}else{
		tdObj.find("a").editable({
			type: 'text',
			pk: 1,
			name: index,
			title: 'Enter '+index
		});
	}
}

var completeData = function(type){
	switch(type){
		case "PEK50":
		case "PEK7":
		case "BJS10":
			return [{
				"Badges_Types": "",
				"Total": "",
				"Qty_In_Safe": ""
			}];
			break;
		case "Hard_Drive_Replaced":
			return [{
				"Cage": "",
				"Replace": "",
				"DECOM": ""
			}];
			break;
		case "Hand_off_TT":
			return [{
				"Description": "",
				"Status": "",
				"Details": ""
			}];
			break;
		case "Cabling_Work":
			return [{
				"Description": "",
				"Update": "",
				"Comments": ""
			}];
			break;
		case "RMA_request":
			return [{
				"Description": "",
				"SN": "",
				"Bin": "",
				"Vendor": "",
				"Status": "",
				"Note": ""
			}];
			break;
	}
}

var drawTable = function(ajaxData){
	var key = "get";
	if(window.location.href.indexOf("dev") > -1){key = "get"+ajaxData.type;}
	$.ajax({
		type: "get",
		data: ajaxData,
		dataType: "json",
		url: ajax_url[key],
		success: function(msg){
			if(msg.code != 1){
				console.warn("Request data error: "+(msg.data || ("Code is "+msg.code)));
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
				return false;
			}
			$(".alert-success").removeClass("hide");
			setTimeout('$(".alert-success").addClass("hide");', 1000);
			if(msg.data == ""){
				if("PEK50" == ajaxData.type) {
					msg.data = "%7B%22PEK50%22%3A%5B%7B%22Badges_Types%22%3A%22SH%22%2C%22Total%22%3A%2210%22%2C%22Qty_In_Safe%22%3A%22%22%7D%2C%7B%22Badges_Types%22%3A%22Visitor%22%2C%22Total%22%3A%225%22%2C%22Qty_In_Safe%22%3A%22%22%7D%2C%7B%22Badges_Types%22%3A%22IFMB%22%2C%22Total%22%3A%226%22%2C%22Qty_In_Safe%22%3A%22%22%7D%5D%2C%22Hard_Drive_Replaced%22%3A%5B%7B%22Cage%22%3A%22PEK50.1-1%22%2C%22Replace%22%3A%22%22%2C%22DECOM%22%3A%22%22%7D%2C%7B%22Cage%22%3A%22GPS%22%2C%22Replace%22%3A%22%22%2C%22DECOM%22%3A%22%22%7D%5D%2C%22Hand_off_TT%22%3A%5B%7B%22Description%22%3A%22%22%2C%22Status%22%3A%22%22%2C%22Details%22%3A%22%22%7D%5D%2C%22Cabling_Work%22%3A%5B%7B%22Description%22%3A%22%22%2C%22Update%22%3A%22%22%2C%22Comments%22%3A%22%22%7D%5D%2C%22RMA_request%22%3A%5B%7B%22Description%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Bin%22%3A%22%22%2C%22Vendor%22%3A%22%22%2C%22Status%22%3A%22%22%2C%22Note%22%3A%22%22%7D%5D%2C%22Other_handoff%22%3A%22PEK50%22%7D";
				} else if("PEK7" == ajaxData.type) {
					msg.data = "%7B%22PEK7%22%3A%5B%7B%22Badges_Types%22%3A%22SH%22%2C%22Total%22%3A%2210%22%2C%22Qty_In_Safe%22%3A%22%22%7D%2C%7B%22Badges_Types%22%3A%22Visitor%22%2C%22Total%22%3A%225%22%2C%22Qty_In_Safe%22%3A%22%22%7D%2C%7B%22Badges_Types%22%3A%22IFMB%22%2C%22Total%22%3A%226%22%2C%22Qty_In_Safe%22%3A%22%22%7D%5D%2C%22BJS10%22%3A%5B%7B%22Badges_Types%22%3A%22SH%22%2C%22Total%22%3A%2210%22%2C%22Qty_In_Safe%22%3A%22%22%7D%2C%7B%22Badges_Types%22%3A%22Visitor%22%2C%22Total%22%3A%225%22%2C%22Qty_In_Safe%22%3A%22%22%7D%2C%7B%22Badges_Types%22%3A%22IFMB%22%2C%22Total%22%3A%226%22%2C%22Qty_In_Safe%22%3A%22%22%7D%5D%2C%22Hard_Drive_Replaced%22%3A%5B%7B%22Cage%22%3A%22BJS10%22%2C%22Replace%22%3A%22%22%2C%22DECOM%22%3A%22%22%7D%2C%7B%22Cage%22%3A%22PEK7%22%2C%22Replace%22%3A%22%22%2C%22DECOM%22%3A%22%22%7D%5D%2C%22Hand_off_TT%22%3A%5B%7B%22Description%22%3A%22%22%2C%22Status%22%3A%22%22%2C%22Details%22%3A%22%22%7D%5D%2C%22Cabling_Work%22%3A%5B%7B%22Description%22%3A%22%22%2C%22Update%22%3A%22%22%2C%22Comments%22%3A%22%22%7D%5D%2C%22RMA_request%22%3A%5B%7B%22Description%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Bin%22%3A%22%22%2C%22Vendor%22%3A%22%22%2C%22Status%22%3A%22%22%2C%22Note%22%3A%22%22%7D%5D%2C%22Other_handoff%22%3A%22PEK7%22%7D";
				}
			}
			$(".table tbody").empty();
			$("textarea").html("");
			var data = JSON.parse(unescape(msg.data));
			for(var i in data){
				if("Other_handoff" == i){
					$("textarea").html(data[i]);
				}
				var tbody = $("#"+i).find("tbody");
				var typeData = data[i];
				if(data[i].length == 0)
					typeData = completeData(i);
				for(var j = 0; j < typeData.length; j ++){
					var subData = typeData[j];
					var trObj = $('<tr></tr>');
					var column = 1;
					for(var k in subData){
						var tdObj = $('<td class="modify"><a href="javascript:;" data-index="'+k+'" data-type="text" data-pk="1" data-title="Enter '+k+'" class="editable editable-click">'+subData[k]+'</a></td>');
						trObj.append(tdObj);
						addEditEvent(tdObj);
						column ++;
					}
					trObj.append('<td><a href="javascript:;" data-action="add" class="column-add">Add</a><a href="javascript:;" data-action="add" class="column-del">Delete</a></td>');
					trObj.find("td").addClass("column-"+column);
					tbody.append(trObj);
				}
			}
			$('.editable').editable('toggleDisabled');
			initData = msg.data;
		},
		error: function(){
			$(".alert-warning").removeClass("hide");
			setTimeout('$(".alert-warning").addClass("hide");', 1000);
		}
	});
	
}

var initDate = function(){
	var yestDate = (new Date(new Date().getTime() - 86400000)).Format("yyyy-MM-dd");
    $(".search-date").daterangepicker({
    	"dateLimit": {
	        "days": 30
	    },
		singleDatePicker: true,
		locale: {
			"format": "YYYY-MM-DD",
			"separator": " - ",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"firstDay": 1
		},
		startDate: yestDate,
    	autoUpdateInput: false
    });
    $(".search-date").val(yestDate);
    
	$(".search-date").on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});
    
    $(".search-date").on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
		drawTable({
			date: getTimeStamp(picker.startDate.format('YYYY-MM-DD')),
			type: $(".select-src option:selected").data("value")
		});
	});
}

var getPostData = function(){
	var tables = $(".table-container.show table");
	var result = {};
	for (var i = 0; i < tables.length; i++) {
		var id = $(tables[i]).attr("id");
		result[id] = [];
		var trObjs = $(tables[i]).find("tbody tr")
		for (var j = 0; j < trObjs.length; j++) {
			var tdSonAObj = $(trObjs[j]).find("td.modify a");
			var json = {};
			for(var k = 0; k < tdSonAObj.length; k ++){
				var tdHtml = $(tdSonAObj[k]).html();
				if(tdHtml == "Empty"){
					tdHtml = "";
				}
				json[$(tdSonAObj[k]).data("index")] = tdHtml;
			}
			result[id].push(json);
		}
	}
	result.Other_handoff = document.getElementById('Other_handoff').value;
	return {
		type: $(".select-src option:selected").data("value"),
		date: getTimeStamp(),
		data: escape(JSON.stringify(result))
	};
}

var updateDB = function(postData){
	$.ajax({
		type: "post",
		data: postData,
		dataType: "json",
		url: ajax_url.post,
		success: function(msg){
			if(msg.code != 1){
				console.warn("Request data error: "+(msg.data || ("Code is "+msg.code)));
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
				return false;
			}
			$(".alert-success").removeClass("hide");
			setTimeout('$(".alert-success").addClass("hide");', 1000);
		},
		error: function(){
			$(".alert-warning").removeClass("hide");
			setTimeout('$(".alert-warning").addClass("hide");', 1000);
		}
	});
}

var getTimeStamp = function(dateStr){
	if(!dateStr){
		return new Date($(".search-date").val()).getTime();
	} else {
		return new Date(dateStr).getTime();
	}
}

var initData = "";

$(function(){
	initDate();
	drawTable({
		date: getTimeStamp((new Date(new Date().getTime() - 86400000)).Format("yyyy-MM-dd")),
		type: "PEK50"
	});
	//enable / disable
	$('#enable').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		$('.editable').editable('toggleDisabled');
	});
	// submit
	$('#submit').click(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		$('#submit').addClass("hide");
		$(".column-add").addClass("hide");
		$(".column-del").addClass("hide");
		if($(".editable-empty").length > 0){
			$("#enable").click();
		}
		$("#enable").addClass("hide");
		html2canvas(document.getElementById("main"), {
			onrendered: function(canvas) {
				$("#enable").removeClass("hide");
				$('#submit').removeClass("hide");
				$(".column-add").removeClass("hide");
				$(".column-del").removeClass("hide");
				var image64 = canvas.toDataURL("image/png");
				var postData = getPostData();
				if(initData != postData.data){
					postData.notifyimg = image64;
					updateDB(postData);
				}else{
					alert("The page has not changed, no need to submit!");
				}
			}
		});
		
		
	});
	// action add
	$(document).delegate(".main .column-add", "click", function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _this = this;
		var pTr = $(_this).parents("tr");
		var newTr = pTr.clone().addClass("new-row");
		newTr.find("td.modify a").html("");
		pTr.after(newTr);
		var tdObj = newTr.find("td.modify");
		for (var i = 0; i < tdObj.length; i++) {
			addEditEvent($(tdObj[i]));
		}
		if($(".editable-disabled").length > 0)
			tdObj.find('.editable').editable('toggleDisabled');
	});
	// action del
	$(document).delegate(".main .column-del", "click", function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _this = this;
		if($(_this).parents("tbody").children().length == 1){
			$(_this).parents("tr").find(".column-add").click();
		}
		$(_this).parents("tr").remove();
	});
	// select src
	$(document).delegate(".main .select-src", "change", function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _this = this;
		var srcType = $(_this).find("option:selected").data("value");
		$(".PEK").addClass("hide");
		$(".PEK").removeClass("show");
		$("."+srcType).removeClass("hide");
		$("."+srcType).addClass("show");
		drawTable({
			date: getTimeStamp(),
			type: srcType
		});
	});
	$(document).delegate("#Other_handoff", "keyup", function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _this = this;
		$(_this).addClass("editable-unsaved");
	});
});