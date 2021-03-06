var setting = {
	view: {
		dblClickExpand: true,
		showLine: false
	},
	check: {
		enable: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	edit: {
		enable: true,
		editNameSelectAll: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	callback: {
		onRightClick: OnRightClick,
		beforeEditName: beforeEditName,
		beforeRename: beforeRename,
		onRename: onRename,
		onClick: zTreeOnClick
	},
	highlightCss: {"font-weight":"bold"},
	disHighlightCss: {"font-weight":"inherit"}, 
	delayTime: 500
};

var rackInfoValue = {
	value: {rackValue:{"1":{id:1,name:1,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"2":{id:2,name:2,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"3":{id:3,name:3,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"4":{id:4,name:4,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"5":{id:5,name:5,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"6":{id:6,name:6,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"7":{id:7,name:7,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"8":{id:8,name:8,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"9":{id:9,name:9,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"10":{id:10,name:10,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"11":{id:11,name:11,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"12":{id:12,name:12,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"13":{id:13,name:13,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"14":{id:14,name:14,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"15":{id:15,name:15,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"16":{id:16,name:16,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"17":{id:17,name:17,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"18":{id:18,name:18,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"19":{id:19,name:19,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"20":{id:20,name:20,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"21":{id:21,name:21,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"22":{id:22,name:22,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"23":{id:23,name:23,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"24":{id:24,name:24,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"25":{id:25,name:25,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"26":{id:26,name:26,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"27":{id:27,name:27,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"28":{id:28,name:28,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"29":{id:29,name:29,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"30":{id:30,name:30,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"31":{id:31,name:31,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"32":{id:32,name:32,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"33":{id:33,name:33,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"34":{id:34,name:34,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"35":{id:35,name:35,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"36":{id:36,name:36,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"37":{id:37,name:37,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"38":{id:38,name:38,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"39":{id:39,name:39,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"40":{id:40,name:40,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"41":{id:41,name:41,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"42":{id:42,name:42,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"43":{id:43,name:43,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"44":{id:44,name:44,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"45":{id:45,name:45,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"46":{id:46,name:46,value:{"Name":"","Model":"","SN":"","Asset ID":""}},},mergeData:{}},
	info: {"Rack Location": "","Rack Asset ID": ""},
	useinfo: "0000000000000000000000000000000000000000000000",
	name: "Rack Name",
};

var zTree, rMenu;
$(document).ready(function(){
	$("#projectName").html(config.projectName);
	$(".noty-info").html(config.noty);
	$("#modifyBtn").html(config.modifyBtn);
	$("#mergeBtn").html(config.mergeBtn);
	$("#unmergeBtn").html(config.unmergeBtn);
	$("#deveceInfo").html(config.deveceInfo);
	$(".save-info").html(config.saveRackInfo);
	$("#searchNode").html(config.search);
	initTree();
});


///// function
function initTree(){
	showMask();
	$.ajax({
		url: ajax_url.getTree,
		type: "get",
		async: true,
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$("#reTree").empty();
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				for (var i = 0; i < json.data.length; i++) {
					json.data[i].iconSkin = json.data[i].type;
				}
				$.fn.zTree.init($("#reTree"), setting, json.data);
				zTree = $.fn.zTree.getZTreeObj("reTree");
				rMenu = $("#rMenu");
				
				for (var i = 0; i < json.data.length; i++) {
					if(json.data[i].type == "file"){
						var node = zTree.getNodeByParam('id', json.data[i].id);  
		                zTree.selectNode(node);
		                zTree.setting.callback.onClick(null, zTree.setting.treeId, node);
		                break;
					}
				}
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
}

function OnRightClick(event, treeId, treeNode) {
	var type = treeNode.type || "file";
	if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
		zTree.cancelSelectedNode();
		showRMenu("root", event.clientX, event.clientY, type);
	} else if (treeNode && !treeNode.noR) {
		zTree.selectNode(treeNode);
		showRMenu("node", event.clientX, event.clientY, type);
	}
}

function beforeEditName(treeId, treeNode) {
	
}

function showMask(){
	$(".mask").removeClass("hide");
}
function hideMask(){
	$(".mask").addClass("hide");
}

function beforeRename(treeId, treeNode, newName, isCancel) {
	var zTree = $.fn.zTree.getZTreeObj("reTree");
	if (newName.length == 0) {
		zTree.cancelEditName();
		alert("节点名称不能为空.");
		return false;
	}
	var id = zTree.getSelectedNodes()[0].id;
	showMask();
	$.ajax({
		url: ajax_url.modifyTree,
		type: "post",
		async: true,
		data: {
			name: newName,
			id: id
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
	return true;
}
function onRename(e, treeId, treeNode, isCancel) {
	console.log("onRename");
}


function showRMenu(type, x, y, type) {
	$("#rMenu").removeClass("fold").removeClass("file").addClass(type)
	$("#rMenu ul").show();
	if (type=="root") {
		$("#m_del").hide();
		$("#m_check").hide();
		$("#m_unCheck").hide();
	} else {
		$("#m_del").show();
		$("#m_check").show();
		$("#m_unCheck").show();
	}
	rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

	$("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
	if (rMenu) rMenu.css({"visibility": "hidden"});
	$("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event){
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}
function addTreeNode() {
	hideRMenu();
	$(".add-node").modal("show");
}

function modifyTreeNode(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	zTree.editName(nodes[0]);
}

function zTreeOnClick(ev, id, obj, lev){
	if(obj.type == "fold"){
		$("#content").addClass("hide");
		$("#right_side").addClass("hide");
	}else if(obj.type == "file"){
		$("#content").removeClass("hide");
		$("#right_side").removeClass("hide");
	}
	if(obj.type == "fold"){
		return false;
	}
	showMask();
	$.ajax({
		url: ajax_url.getRack,
		type: "get",
		async: true,
		data: {
			id: obj.id
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				rackInfoValue.value = JSON.parse(unescape(json.data.value));
				rackInfoValue.info = JSON.parse(unescape(json.data.info));
				rackInfoValue.name = json.data.rackname;
				drawRack();
				drawRackInfo();
				drawMerge();
				$(".rack-name").html(rackInfoValue.name);
				$(".save-info").removeClass("save-rack-value").addClass("save-rack-info");
				$(".save-info").html(config.saveRackInfo);
				$(".device-id").html("（rack）");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
}

function drawRack(){
	var rackValue = rackInfoValue.value.rackValue;
	$("#rackValue").empty();
	for (var i in rackValue) {
		$("#rackValue").prepend(
					['<tr data-id="'+rackValue[i].id+'">',
			            '<td>'+rackValue[i].id+'</td>',
			            '<td>'+(rackValue[i].value.Name || "")+'</td>',  
			            '<td>'+rackValue[i].id+'</td>',
			        '</tr>'].join(""));
	}
}
function drawRackInfo(){
	var rackInfo = rackInfoValue.info;
	$(".info-detail ul").empty();
	for (var i in rackInfo) {
		$(".info-detail ul").append(
				['<li class="list-group-item">',
					'<div class="key">'+i+'</div>',
					'<div class="oper">： </div>',
					'<input type="text" class="form-control value change-'+i+'" value="'+rackInfo[i]+'" placeholder="'+i+'" title="'+rackInfo[i]+'"/>',
				'</li>'].join(""));
		
	}
}
function drawMerge(){
	var mergeData = rackInfoValue.value.mergeData;
	var useinfoArr = rackInfoValue.useinfo.split("");
	$("#rackValue").find("td").removeAttr("rowspan").removeClass("hide");
	$("#rackValue").find(".td-merge").removeClass("td-merge");
	for(var i in mergeData){
		var pos = parseInt(mergeData[i].pos);
		var len = parseInt(mergeData[i].len);
		$("#rackValue").find("tr:eq("+(46-pos+1-len)+") td:eq(1)").attr("rowspan", len).addClass("td-merge");
		$("#rackValue").find("tr:eq("+(46-pos+1)+") td:eq(1)").css({
			"vertical-align": "middle",
			"text-align": "center"
		});
		for (var l = 0; l < len-1; l++) {
			$("#rackValue").find("tr:eq("+(46-pos-l)+") td:eq(1)").addClass("hide");
			useinfoArr[46-pos-l] = 1;
		}
	}
	rackInfoValue.useinfo = useinfoArr.join("");
}

function removeTreeNode() {
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		if (nodes[0].children && nodes[0].children.length > 0) {
			var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
			if (confirm(msg)==true){
				var id = zTree.getSelectedNodes()[0].id;
				if(id == 0){
					alert("the root node can't delte!");
					return false;
				}
				showMask();
				$.ajax({
					url: ajax_url.delTree,
					type: "post",
					async: true,
					data: {
						id: id
					},
					dataType: "json",
					success: function (json) {
						hideMask();
						if (json.code != 1) {
							console.warn("Request data error: Code is " + json.code);
							$(".alert-warning").removeClass("hide");
							setTimeout('$(".alert-warning").addClass("hide");', 1000);
						} else if (json.code == 1) {
							$(".alert-success").removeClass("hide");
							setTimeout('$(".alert-success").addClass("hide");', 1000);
							zTree.removeNode(nodes[0]);
							$("#content").addClass("hide");
							$("#right_side").addClass("hide");
						}
					},
					error: function (e) {
						hideMask();
						console.error("请求出错(请检查相关网络状况.)", e);
					}
				});
			}
		} else {
			var id = zTree.getSelectedNodes()[0].id;
			showMask();
			$.ajax({
				url: ajax_url.delTree,
				type: "post",
				async: true,
				data: {
					id: id
				},
				dataType: "json",
				success: function (json) {
					hideMask();
					if (json.code != 1) {
						console.warn("Request data error: Code is " + json.code);
						$(".alert-warning").removeClass("hide");
						setTimeout('$(".alert-warning").addClass("hide");', 1000);
					} else if (json.code == 1) {
						$(".alert-success").removeClass("hide");
						setTimeout('$(".alert-success").addClass("hide");', 1000);
						zTree.removeNode(nodes[0]);
						$("#content").addClass("hide");
						$("#right_side").addClass("hide");
					}
				},
				error: function (e) {
					hideMask();
					console.error("请求出错(请检查相关网络状况.)", e);
				}
			});
		}
	}
}

function searchNodes(value){
	var allNodesObj = $("#reTree .node_name");
	allNodesObj.parents("li").addClass("hide");
	for (var i = 0; i < allNodesObj.length; i++) {
		if($(allNodesObj[i]).text().indexOf($('#in').val()) > -1){
			$(allNodesObj[i]).addClass("highlightCss");
			$(allNodesObj[i]).parents("li").removeClass("hide");
		}
	}
	
	var result = zTree.searchNodes($('#in').val());
	if(result){
		if(result.length == 0){
			$("#reTree").find(".no-data").remove();
			$("#reTree").prepend("<li class='no-data'>没有搜索到数据</li>");
		}else{
			$("#reTree").find(".no-data").remove();
		}
	}
}

function searchNodesByU(value){
	showMask();
	$.ajax({
		url: ajax_url.searchNodesByU,
		type: "post",
		async: true,
		data: {
			num: value
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$("#reTree").empty();
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				for (var i = 0; i < json.data.length; i++) {
					json.data[i].iconSkin = json.data[i].type;
				}
				$.fn.zTree.init($("#reTree"), setting, json.data);
				zTree = $.fn.zTree.getZTreeObj("reTree");
				
				for (var i = 0; i < json.data.length; i++) {
					if(json.data[i].type == "file"){
						var node = zTree.getNodeByParam('id', json.data[i].id);  
		                zTree.selectNode(node);
		                zTree.setting.callback.onClick(null, zTree.setting.treeId, node);
		                break;
					}
				}
				$("#reTree .node_name").addClass("highlightCss");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
}

function formatExportData(){
	var allData = [];
	var fileName = $(".rack-name").html();
	allData.push(["Pos", "U-Name", "Pos"]);
	
	var trObjs = $("#rackValue tr");
	for (var i = 0; i < trObjs.length; i++) {
		var tdObjs = $(trObjs[i]).find("td");
		var bodyTd = [];
		for (var j = 0; j < tdObjs.length; j++) {
			if($(tdObjs[j]).hasClass("hide")){
				bodyTd.push("合并同上");
			}else{
				bodyTd.push($(tdObjs[j]).text());
			}
		}
		allData.push(bodyTd);
	}
	
	$("#rackValue").tableExport({
		"type": "xlsx-data",
		"exportData": allData,
		"worksheetName": "Sheet1",
		"fileName": fileName
	});
}


///// Event
$(document).delegate("#right_side .rack-name", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	drawRackInfo();
	$(".save-info").removeClass("save-rack-value").addClass("save-rack-info");
	$(".save-info").html(config.saveRackInfo);
	$(".device-id").html("（rack）");
});

$(document).delegate("#rackValue tbody tr", "mousemove", function (ev) {
	var _this = this;
	var dataID = $(_this).data("id");
	var selVal = rackInfoValue.value.rackValue[dataID].value;
	$(".detail ul").empty();
	for(var i in selVal){
		$(".detail ul").append(
				['<li class="list-group-item">',
					'<div class="key">'+i+'</div>',
					'<div class="oper">： </div>',
					'<div class="value">'+selVal[i]+'</div>',
				'</li>'].join(""));
	}
	if(document.body.clientHeight - ev.clientY > 180){
		$(".detail").css("top", ev.clientY+10);
	}else{
		$(".detail").css("top", ev.clientY+10-180);
	}
	$(".detail").css("left", ev.clientX+10);
	$(".detail").removeClass("hide");
});

$(document).delegate("#rackValue tbody tr", "mouseout", function (ev) {
	$(".detail").addClass("hide");
});

$(document).delegate("#rackValue tbody tr td:nth-child(2)", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var dataID = $(_this).parent().data("id");
	$(".device-id").html("（"+dataID+"）");
	$(".info-detail").attr("data-id", dataID);
	var selVal = rackInfoValue.value.rackValue[dataID].value;
	$(".info-detail ul").empty();
	for(var i in selVal){
		$(".info-detail ul").append(
				['<li class="list-group-item">',
					'<div class="key">'+i+'</div>',
					'<div class="oper">： </div>',
					'<input type="text" class="form-control value change-'+i+'" value="'+selVal[i]+'" placeholder="'+i+'" title="'+selVal[i]+'">',
				'</li>'].join(""));
	}
	$(".save-info").removeClass("save-rack-info").addClass("save-rack-value");
	$(".save-info").html(config.saveRackValue);
});

$(document).delegate(".modify.btn", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var rackName = $(".rack-name").text();
	$(".modify-rack-name .modal-rack-name").val(rackName);
	$(".modify-rack-name").modal("show");
});

$(document).delegate(".modify-rack-name .sure", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var rackName = $(".modify-rack-name .modal-rack-name").val();
	if(!rackName){
		alert("the name is empty or the type is empty!");
		return false;
	}
	var id = zTree.getSelectedNodes()[0].id;
	showMask();
	$.ajax({
		url: ajax_url.saveRackName,
		type: "post",
		async: true,
		data: {
			id: id,
			rackname: rackName
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				$(".rack-name").html(rackName);
				$(".modify-rack-name").modal("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).delegate(".add-node .sure", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var value = $(".add-node .node-name").val();
	var type = $(".add-node .node-type").val();
	if(!value || !type){
		alert("the name is empty or the type is empty!");
		return false;
	}
	if(type != 0 && type != 1){
		alert("type is wrong,0 is for rack and 1 is for fold!");
		return false;
	}
	if(type == 1) type = "fold";
	if(type == 0) type = "file";
	var id = zTree.getSelectedNodes()[0].id;
	showMask();
	$.ajax({
		url: ajax_url.addTree,
		type: "post",
		async: true,
		data: {
			name: value,
			pid: id,
			type: type,
			rackname: value,
			info: "%7B%22Rack%20Location%22%3A%22%22%2C%22Rack%20Asset%20ID%22%3A%22%22%7D",
			value: "%7B%22rackValue%22%3A%7B%221%22%3A%7B%22id%22%3A1%2C%22name%22%3A1%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%222%22%3A%7B%22id%22%3A2%2C%22name%22%3A2%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%223%22%3A%7B%22id%22%3A3%2C%22name%22%3A3%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%224%22%3A%7B%22id%22%3A4%2C%22name%22%3A4%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%225%22%3A%7B%22id%22%3A5%2C%22name%22%3A5%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%226%22%3A%7B%22id%22%3A6%2C%22name%22%3A6%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%227%22%3A%7B%22id%22%3A7%2C%22name%22%3A7%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%228%22%3A%7B%22id%22%3A8%2C%22name%22%3A8%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%229%22%3A%7B%22id%22%3A9%2C%22name%22%3A9%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2210%22%3A%7B%22id%22%3A10%2C%22name%22%3A10%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2211%22%3A%7B%22id%22%3A11%2C%22name%22%3A11%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2212%22%3A%7B%22id%22%3A12%2C%22name%22%3A12%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2213%22%3A%7B%22id%22%3A13%2C%22name%22%3A13%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2214%22%3A%7B%22id%22%3A14%2C%22name%22%3A14%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2215%22%3A%7B%22id%22%3A15%2C%22name%22%3A15%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2216%22%3A%7B%22id%22%3A16%2C%22name%22%3A16%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2217%22%3A%7B%22id%22%3A17%2C%22name%22%3A17%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2218%22%3A%7B%22id%22%3A18%2C%22name%22%3A18%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2219%22%3A%7B%22id%22%3A19%2C%22name%22%3A19%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2220%22%3A%7B%22id%22%3A20%2C%22name%22%3A20%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2221%22%3A%7B%22id%22%3A21%2C%22name%22%3A21%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2222%22%3A%7B%22id%22%3A22%2C%22name%22%3A22%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2223%22%3A%7B%22id%22%3A23%2C%22name%22%3A23%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2224%22%3A%7B%22id%22%3A24%2C%22name%22%3A24%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2225%22%3A%7B%22id%22%3A25%2C%22name%22%3A25%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2226%22%3A%7B%22id%22%3A26%2C%22name%22%3A26%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2227%22%3A%7B%22id%22%3A27%2C%22name%22%3A27%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2228%22%3A%7B%22id%22%3A28%2C%22name%22%3A28%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2229%22%3A%7B%22id%22%3A29%2C%22name%22%3A29%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2230%22%3A%7B%22id%22%3A30%2C%22name%22%3A30%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2231%22%3A%7B%22id%22%3A31%2C%22name%22%3A31%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2232%22%3A%7B%22id%22%3A32%2C%22name%22%3A32%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2233%22%3A%7B%22id%22%3A33%2C%22name%22%3A33%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2234%22%3A%7B%22id%22%3A34%2C%22name%22%3A34%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2235%22%3A%7B%22id%22%3A35%2C%22name%22%3A35%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2236%22%3A%7B%22id%22%3A36%2C%22name%22%3A36%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2237%22%3A%7B%22id%22%3A37%2C%22name%22%3A37%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2238%22%3A%7B%22id%22%3A38%2C%22name%22%3A38%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2239%22%3A%7B%22id%22%3A39%2C%22name%22%3A39%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2240%22%3A%7B%22id%22%3A40%2C%22name%22%3A40%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2241%22%3A%7B%22id%22%3A41%2C%22name%22%3A41%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2242%22%3A%7B%22id%22%3A42%2C%22name%22%3A42%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2243%22%3A%7B%22id%22%3A43%2C%22name%22%3A43%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2244%22%3A%7B%22id%22%3A44%2C%22name%22%3A44%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2245%22%3A%7B%22id%22%3A45%2C%22name%22%3A45%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2246%22%3A%7B%22id%22%3A46%2C%22name%22%3A46%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%7D%2C%22mergeData%22%3A%7B%7D%7D",
			useinfo: "0000000000000000000000000000000000000000000000"
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				var newNode = { name: value, type: type, iconSkin: type, id: json.data.id };
				if (zTree.getSelectedNodes()[0]) {
					newNode.checked = zTree.getSelectedNodes()[0].checked;
					zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
				} else {
					zTree.addNodes(null, newNode);
				}
				$(".add-node").modal("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).delegate("#in", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	if(ev.keyCode == 13){
		searchNodes($('#in').val())
	}
});

$(document).delegate("#u_num", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	if(ev.keyCode == 13){
		searchNodesByU($('#u_num').val())
	}
});

$(document).delegate(".merge", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$(".merge-node").removeClass("hide");
});

$(document).delegate(".unmerge", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$(".unmerge-list ul").empty();
	var tdMergeObjs = $("#rackValue").find("td.td-merge");
	for (var i = 0; i < tdMergeObjs.length; i++) {
		var id = $(tdMergeObjs[i]).parents("tr").data("id");
		for (var x = 1; x <= 46; x++) {
			if($("#rackValue").find("tr:eq("+(46-parseInt(id)+x)+") td:nth-child(2)").hasClass("hide")){
				continue;
			}else{
				id = id - x + 1;
				break;
			}
		}
		$(".unmerge-list ul").append('<li class="list-group-item" data-id="'+id+'">'+id+'</li>');
	}
	$(".unmerge-list").removeClass("hide");
});

$(document).delegate(".export", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	formatExportData();
});

$(document).delegate(".info-detail li .change-Name", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$("#rackValue tr[data-id='"+dataID+"'] td:eq(1)").html(val);
	$(".detail li:eq(0) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["Name"] = $(".info-detail ul li:eq(0) .value").val();
	var useinfoArr = rackInfoValue.useinfo.split("");
	if(val){
		useinfoArr[parseInt(dataID)-1] = 1;
	}else{
		useinfoArr[parseInt(dataID)-1] = 0;
	}
	rackInfoValue.useinfo = useinfoArr.join("");
});

$(document).delegate(".info-detail li .change-Model", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$(".detail li:eq(1) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["Model"] = $(".info-detail ul li:eq(1) .value").val()
});

$(document).delegate(".info-detail li .change-SN", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$(".detail li:eq(2) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["SN"] = $(".info-detail ul li:eq(2) .value").val();
});

$(document).delegate(".info-detail li .change-Asset.ID", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$(".detail li:eq(3) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["Asset ID"] = $(".info-detail ul li:eq(3) .value").val();
});

$(document).delegate(".unmerge-list li", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	$(_this).remove();
	var dataID = $(_this).data("id");
	delete rackInfoValue.value.mergeData[dataID];
	
	var id = zTree.getSelectedNodes()[0].id;
	showMask();
	$.ajax({
		url: ajax_url.saveRackValue,
		type: "post",
		async: true,
		data: {
			id: id,
			value: escape(JSON.stringify(rackInfoValue.value))
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				drawMerge();
				$(".unmerge-list").addClass("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).delegate(".save-rack-info", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var id = zTree.getSelectedNodes()[0].id;
	rackInfoValue.info = {"Rack Location": $(".info-detail ul li:eq(0) .value").val(),"Rack Asset ID": $(".info-detail ul li:eq(1) .value").val()};
	showMask();
	$.ajax({
		url: ajax_url.saveRackInfo,
		type: "post",
		async: true,
		data: {
			id: id,
			info: escape(JSON.stringify(rackInfoValue.info)),
			useinfo: rackInfoValue.useinfo
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).delegate(".save-rack-value", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var id = zTree.getSelectedNodes()[0].id;
	var selID = $(".info-detail").data("id");
	rackInfoValue.value.rackValue[selID].value["Name"] = $(".info-detail ul li:eq(0) .value").val();
	rackInfoValue.value.rackValue[selID].value["Model"] = $(".info-detail ul li:eq(1) .value").val()
	rackInfoValue.value.rackValue[selID].value["SN"] = $(".info-detail ul li:eq(2) .value").val();
	rackInfoValue.value.rackValue[selID].value["Asset ID"] = $(".info-detail ul li:eq(3) .value").val();
	showMask();
	$.ajax({
		url: ajax_url.saveRackValue,
		type: "post",
		async: true,
		data: {
			id: id,
			value: escape(JSON.stringify(rackInfoValue.value)),
			useinfo: rackInfoValue.useinfo
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).bind('click',function(ev){
	ev.stopPropagation();
	ev.preventDefault();
	$(".unmerge-list").addClass("hide");
});

$(document).delegate(".merge-node .sure", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var pos = $(".merge-node .merge-pos").val();
	var len = $(".merge-node .merge-len").val();
	if(!pos || !len){
		alert("the pos is empty or the len is empty!");
		return false;
	}
	if(isNaN(pos) || isNaN(len)){
		alert("pos and len are both type of number!");
		return false;
	}
	pos = parseInt(pos);
	len = parseInt(len);
	
	
	if($("#rackValue").find("tr:eq("+(46-pos+1)+") td:eq(1)").hasClass("hide")){
		console.log("already merge");
		$(".merge-node").modal("hide");
		return false;
	}
	
	for (var i = len-1; i > 0 ; i--) {
		if($("#rackValue").find("tr:eq("+(46-pos-i)+") td:eq(1)").hasClass("hide")){
			console.log("already merge");
			$(".merge-node").modal("hide");
			return false;
		}else{
			break;
		}
	}
	rackInfoValue.value.mergeData[pos] = {};
	rackInfoValue.value.mergeData[pos].pos = pos;
	rackInfoValue.value.mergeData[pos].len = len;
	for (var i = 1; i < len; i++) {
		rackInfoValue.value.rackValue[pos+i].value = rackInfoValue.value.rackValue[pos].value;
	}
	var id = zTree.getSelectedNodes()[0].id;
	showMask();
	$.ajax({
		url: ajax_url.saveRackValue,
		type: "post",
		async: true,
		data: {
			id: id,
			value: escape(JSON.stringify(rackInfoValue.value))
		},
		dataType: "json",
		success: function (json) {
			hideMask();
			if (json.code != 1) {
				console.warn("Request data error: Code is " + json.code);
				$(".alert-warning").removeClass("hide");
				setTimeout('$(".alert-warning").addClass("hide");', 1000);
			} else if (json.code == 1) {
				$(".alert-success").removeClass("hide");
				setTimeout('$(".alert-success").addClass("hide");', 1000);
				drawMerge();
				$(".merge-node").modal("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
	
	return true;
	
	$("#rackValue").find("tr:eq("+(pos-1)+") td:eq(1)").attr("rowspan", len).addClass("td-merge");
	$("#rackValue").find("tr:eq("+(pos-1)+") td:eq(1)").css({
		"vertical-align": "middle",
		"text-align": "center"
	});
	for (var i = 0; i < len-1; i++) {
		$("#rackValue").find("tr:eq("+(pos+i)+") td:eq(1)").addClass("hide");
	}
	
	$(".merge-node").modal("hide");
});

$(document).delegate(".reset", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$("#u_num").val("");
	initTree();
});