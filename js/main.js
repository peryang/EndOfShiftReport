Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

var addEditEvent = function(tdObj){
	var index = tdObj.find("a").data("index");
	if("Qty_In_Safe" == index || "Replace" == index || "DECOM" == index || "Total" == index){
		// 做数值校验
		tdObj.find("a").editable({
			type: 'text',
			pk: 1,
			name: index,
			title: 'Enter '+index,
			validate: function (value) {
				var reg = new RegExp("^[0-9]*$");
				if(!reg.test(value)){
					return '请输入数字类型';
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

var drawTable = function(ajaxData){
	var key = "get";
	if(window.location.href.indexOf("dev") > -1){key = "get"+ajaxData.type;}
	$.ajax({
		type: "get",
		data: ajaxData,
		url: ajax_url[key],
		success: function(json){
			$(".table tbody").empty();
			$("textarea").html("");
			for(var i in json){
				if("Other_handoff" == i){
					$("textarea").html(json[i]);
				}
				var tbody = $("#"+i).find("tbody");
				for(var j = 0; j < json[i].length; j ++){
					var subData = json[i][j];
					var trObj = $('<tr></tr>');
					var column = 1;
					for(var k in subData){
						var tdObj = $('<td class="modify"><a href="javascript:;" data-index="'+k+'" data-type="text" data-pk="1" data-title="Enter '+k+'" class="editable editable-click">'+subData[k]+'</a></td>');
						trObj.append(tdObj);
						addEditEvent(tdObj);
						column ++;
					}
					trObj.append('<td><a href="javascript:;" data-action="add" class="column-add">增加</a><a href="javascript:;" data-action="add" class="column-del">删除</a></td>');
					trObj.find("td").addClass("column-"+column);
					tbody.append(trObj);
				}
			}
			$('.editable').editable('toggleDisabled');
		},
		error: function(){
			
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
			"applyLabel": "确定",
			"cancelLabel": "取消",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"daysOfWeek": ["日","一","二","三","四","五","六"],
			"monthNames": ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
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
			date: picker.startDate.format('YYYY-MM-DD'),
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
				json[$(tdSonAObj[k]).data("index")] = $(tdSonAObj[k]).html();
			}
			result[id].push(json);
		}
	}
	result.Other_handoff = document.getElementById('Other_handoff').value;
	return {
		data: JSON.stringify(result)
	};
}

var updateDB = function(){
	var postData = getPostData();
	$.ajax({
		type: "post",
		data: postData,
		url: ajax_url.post,
		success: function(data){
			$(".alert-success").removeClass("hide");
			setTimeout('$(".alert-success").addClass("hide");', 1000);
		},
		error: function(){
			
		}
	});
}

$(function(){
	initDate();
	drawTable({
		date: (new Date(new Date().getTime() - 86400000)).Format("yyyy-MM-dd"),
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
		updateDB();
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
		tdObj.find('.editable').editable('toggleDisabled');
	});
	// action del
	$(document).delegate(".main .column-del", "click", function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _this = this;
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
			date: $(".search-date").val(),
			type: srcType
		});
	});
});