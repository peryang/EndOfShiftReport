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
	value: {
		rackValue: {},
		addsvrData: {},
		pduValue: {
			left: [],
			right: []
		}
	},
	//value: {rackValue:{"1":{id:1,name:1,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"2":{id:2,name:2,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"3":{id:3,name:3,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"4":{id:4,name:4,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"5":{id:5,name:5,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"6":{id:6,name:6,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"7":{id:7,name:7,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"8":{id:8,name:8,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"9":{id:9,name:9,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"10":{id:10,name:10,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"11":{id:11,name:11,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"12":{id:12,name:12,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"13":{id:13,name:13,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"14":{id:14,name:14,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"15":{id:15,name:15,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"16":{id:16,name:16,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"17":{id:17,name:17,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"18":{id:18,name:18,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"19":{id:19,name:19,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"20":{id:20,name:20,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"21":{id:21,name:21,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"22":{id:22,name:22,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"23":{id:23,name:23,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"24":{id:24,name:24,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"25":{id:25,name:25,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"26":{id:26,name:26,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"27":{id:27,name:27,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"28":{id:28,name:28,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"29":{id:29,name:29,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"30":{id:30,name:30,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"31":{id:31,name:31,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"32":{id:32,name:32,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"33":{id:33,name:33,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"34":{id:34,name:34,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"35":{id:35,name:35,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"36":{id:36,name:36,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"37":{id:37,name:37,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"38":{id:38,name:38,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"39":{id:39,name:39,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"40":{id:40,name:40,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"41":{id:41,name:41,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"42":{id:42,name:42,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"43":{id:43,name:43,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"44":{id:44,name:44,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"45":{id:45,name:45,value:{"Name":"","Model":"","SN":"","Asset ID":""}},"46":{id:46,name:46,value:{"Name":"","Model":"","SN":"","Asset ID":""}},},addsvrData:{}},
	//info: {"Rack Location": "","Rack Asset ID": ""},
	useinfo: "0000000000000000000000000000000000000000000000",
	//name: "Rack Name",
};

var zTree, rMenu;
$(document).ready(function(){
	$("#projectName").html(config.projectName);
	$(".noty-info").html(config.noty);
	$("#modifyBtn").html(config.modifyBtn);
	$("#addsvrBtn").html(config.addsvrBtn);
	$("#deveceInfo").html(config.deveceInfo);
	$(".save-info").html(config.saveRackInfo);
	$("#searchNode").html(config.search);
	initTree();
});


///// function
function initTree(){
	showMask();
	$.ajax({
		url: ajax_url.get_rack_nodes,
		type: "post",
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
						$("#right_side").removeClass("hide");
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
	var type = zTree.getSelectedNodes()[0].type
	
	var modify_node = "";
	if(type == "fold") modify_node = ajax_url.set_idc_prop;
	if(type == "file") modify_node = ajax_url.set_rack_prop;
	
	var postData = {
		name: newName,
		id: id
		// "asset_id":"",
		// "name":"rack",
		// "useinfo":"",
	};
	
	showMask();
	$.ajax({
		url: modify_node,
		type: "post",
		async: true,
		data: postData,
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
		url: ajax_url.get_rack_dev,
		type: "post",
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
				//rackInfoValue.value = JSON.parse(unescape(json.data.value));
				//rackInfoValue.info = JSON.parse(unescape(json.data.info));
				//rackInfoValue.name = json.data.rackname;
				
				rackInfoValue.value.addsvrData = {};
				rackInfoValue.value.pduData = {};
				rackInfoValue.value.pduValue.left = [];
				rackInfoValue.value.pduValue.right = [];
				for (var i = 0; i < json.data.nodes.length; i++) {
					if(json.data.nodes[i].id.indexOf("svr") > -1){
						var tpmAddsvr = json.data.nodes[i].rack_use.split(",");
						rackInfoValue.value.addsvrData[tpmAddsvr[0]] = {
							pos: tpmAddsvr[0],
							len: tpmAddsvr[1]
						};
						rackInfoValue.value.rackValue[parseInt(tpmAddsvr[0])+parseInt(tpmAddsvr[1])-1] = {
							id: json.data.nodes[i].id,
							name: json.data.nodes[i].name || "",
							value:{
								"asset_id": json.data.nodes[i].asset_id || "",
								"model": json.data.nodes[i].model || "",
								"name": json.data.nodes[i].name || "",
								"sn": json.data.nodes[i].sn || "",
								"pdu_use": json.data.nodes[i].pdu_use || ""
							}
						};
						rackInfoValue.value.pduData[parseInt(tpmAddsvr[0])+parseInt(tpmAddsvr[1])-1] = json.data.nodes[i].pdu_use || "";
					}
					if(json.data.nodes[i].id.indexOf("pdu") > -1){
						rackInfoValue.value.pduValue[json.data.nodes[i].pos].push(json.data.nodes[i]);
					}
				}
				drawRack();
				drawPdu();
				drawAddsvr();
				rackInfoValue.info = json.data.info;
				drawRackInfo();
				setPduStatus();
				$(".rack-name").html(rackInfoValue.name);
				$(".save-info").removeClass("save-rack-value").addClass("save-rack-info");
				$(".save-info").html(config.saveRackInfo);
				$(".device-id").html("（rack）");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
			JSON.parse(e.responseText)
		}
	});
}

function drawRack(){
	var rackValue = rackInfoValue.value.rackValue;
	$("#rackValue").empty();
	//for (var i in rackValue) {
	for(var i = 1; i <= 46; i ++){
		$("#rackValue").prepend(
					['<tr data-id="'+i+'">',
			            '<td>'+i+'</td>',
			            '<td class=""><div class="svr"></div><div class="status"></div></td>',
			            '<td>'+i+'</td>',
			        '</tr>'].join(""));
	}
	for (var i in rackValue) {
		$("#rackValue").find("tr[data-id="+(i)+"] td:eq(1) .svr").html(rackValue[i].name);
	}
}
function drawRackInfo(){
	var rackInfo = rackInfoValue.info;
	$(".info-detail ul").empty();
	for (var i in rackInfo) {
		if(i == "asset_id" || i == "name"){
			var obj = $(['<li class="list-group-item">',
							'<div class="key">'+i+'</div>',
							'<div class="oper">： </div>',
							'<input type="text" class="form-control value change-'+i+'" value="'+rackInfo[i]+'" placeholder="'+i+'" title="'+rackInfo[i]+'"/>',
						'</li>'].join(""));
			if(i == "asset_id") obj.find("input").attr("disabled", true);
			$(".info-detail ul").append(obj);
		}
	}
}
function drawAddsvr(){
	var addsvrData = rackInfoValue.value.addsvrData;
	var useinfoArr = rackInfoValue.useinfo.split("");
	$("#rackValue").find("td").removeAttr("rowspan").removeClass("hide");
	$("#rackValue").find(".td-addsvr").removeClass("td-addsvr");
	
	for(var i in addsvrData){
		var pos = parseInt(addsvrData[i].pos);
		var len = parseInt(addsvrData[i].len);
		/*$("#rackValue").find("tr:eq("+(46-pos+1-len)+") td:eq(1)").attr("rowspan", len).addClass("td-addsvr");
		$("#rackValue").find("tr:eq("+(46-pos+1)+") td:eq(1)").css({
			"vertical-align": "middle",
			"text-align": "center"
		});
		for (var l = 0; l < len-1; l++) {
			$("#rackValue").find("tr:eq("+(46-pos-l)+") td:eq(1)").addClass("hide");
			useinfoArr[46-pos-l] = 1;
		}*/
		$("#rackValue").find("tr[data-id="+(pos+len-1)+"]").addClass("used");
		$("#rackValue").find("tr[data-id="+(pos+len-1)+"] td:eq(1)").addClass("used");
		$("#rackValue").find("tr[data-id="+(pos+len-1)+"] td:eq(1)").attr("rowspan", len).addClass("td-addsvr");
		$("#rackValue").find("tr[data-id="+(pos+len-1)+"] td:eq(1)").css({
			"vertical-align": "middle",
			"text-align": "center"
		});
		for (var l = 1; l < len; l++) {
			$("#rackValue").find("tr[data-id="+(pos+l-1)+"] td:eq(1)").addClass("hide");
			useinfoArr[pos+l] = 1;
		}
	}
	rackInfoValue.useinfo = useinfoArr.join("");
}

function drawPdu() {
	$(".pdu-c-left").empty();
	$(".pdu-c-right").empty();
	var pduValue = rackInfoValue.value.pduValue;
	for(var pduPos in pduValue){
		for (var i = 0; i < pduValue[pduPos].length; i++) {
			$(".pdu-c-" + pduPos).append(getPduByNum(pduValue[pduPos][i].pin_num, pduValue[pduPos][i].id));
		}
		$(".pdu-c-" + pduPos).append('<div class="add-pdu">Add PDU</div>');
	}
}

function getPduByNum(num, id){
	var result = ['<div class="pdu modal-'+num+'" id="', id, '">',
		'<div class="pdu-del-c clearfix">',
			'<div class="pdu-del">x</div>',
		'</div>'].join("");
	for (var i = 1; i <= num/2; i++) {
		result += ['<div class="pdu-detail-c clearfix">',
			'<div class="pdu-detail" data-index="', i, '"></div>',
			'<div class="pdu-detail" data-index="', i*2, '"></div>',
		'</div>'].join("");
	}
	
	result += ('<div class="pdu-id">'+id+'</div></div>');
	return result;
}

function setPduStatus() {
	$(".pdu-detail").removeClass("active").removeAttr("data-rack");
	for(var pdu in rackInfoValue.value.pduData){
		if(!rackInfoValue.value.pduData[pdu]) continue;
		var pduUsed = rackInfoValue.value.pduData[pdu].split(",");
		for (var i = 0; i < pduUsed.length; i++) {
			var pduPos = pduUsed[i].split("-");
			$("#" + pduPos[0]).find(".pdu-detail:eq("+(parseInt(pduPos[1])-1)+")").addClass("active");
			$("#" + pduPos[0]).find(".pdu-detail:eq("+(parseInt(pduPos[1])-1)+")").attr("data-rack", pdu);
		}
	}
}

function removeTreeNode() {
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		var id = zTree.getSelectedNodes()[0].id;
		var type = zTree.getSelectedNodes()[0].type;
		
		var remove_node = "";
		if(type == "fold") remove_node = ajax_url.del_idc_node;
		if(type == "file") remove_node = ajax_url.del_rack_node;
		
		var msg = "删除选中节点及其该节点的子节点。\n\n请确认！";
		if (confirm(msg)==true){
			if(id == 0){
				alert("the root node can't delte!");
				return false;
			}
			showMask();
			$.ajax({
				url: remove_node,
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
	allNodesObj.removeClass("highlightCss")
	allNodesObj.parents("li").addClass("hide");
	for (var i = 0; i < allNodesObj.length; i++) {
		if($(allNodesObj[i]).text().indexOf($('#in').val()) > -1){
			$(allNodesObj[i]).addClass("highlightCss");
			$(allNodesObj[i]).parents("li").removeClass("hide");
			$($(allNodesObj[i]).parents("li")[0]).find("li").removeClass("hide");
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
	var id = zTree.getSelectedNodes()[0].id;
	var type = zTree.getSelectedNodes()[0].type;
	if(type == "file"){
		return false;
	}
	showMask();
	$.ajax({
		url: ajax_url.search_rack_by_u,
		type: "post",
		async: true,
		data: {
			id: id,
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
// 点击rackname展示rack信息
$(document).delegate("#right_side .rack-name", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	drawRackInfo();
	$(".info-detail").removeClass("hide");
	$(".save-info").removeClass("hide");
	$(".info-detail .add-pdu-pos").addClass("hide");
	$(".info-detail .del-svr").addClass("hide");
	$(".save-info").removeClass("save-rack-value").addClass("save-rack-info");
	$(".save-info").html(config.saveRackInfo);
	$(".device-id").html("（rack）");
});

$(document).delegate(".pdu-c-left .add-pdu", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$.ajax({
		url: ajax_url.get_pdu_nodes,
		type: "post",
		async: true,
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
				
				for (var i = 0; i < json.data.length; i++) {
					var pin_num = json.data[i].pin_num;
					$(".add-pdu-modal .pdu-type").append('<option value="'+pin_num+'">'+pin_num+'</option>');
				}
				
				$(".add-pdu-modal").attr("data-type", "left");
				$(".add-pdu-modal").modal("show");
				$(".info-detail").addClass("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).delegate(".pdu-c-right .add-pdu", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$.ajax({
		url: ajax_url.get_pdu_nodes,
		type: "post",
		async: true,
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
				
				for (var i = 0; i < json.data.length; i++) {
					var pin_num = json.data[i].pin_num;
					$(".add-pdu-modal .pdu-type").append('<option value="'+pin_num+'">'+pin_num+'</option>');
				}
				
				$(".add-pdu-modal").attr("data-type", "right");
				$(".add-pdu-modal").modal("show");
				$(".info-detail").addClass("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

// rack hover
$(document).delegate("#rackValue tbody tr.used", "mousemove", function (ev) {
	var _this = this;
	var dataID = $(_this).data("id");
	var selVal = rackInfoValue.value.rackValue[dataID].value;
	$(".detail ul").empty();
	for(var i in selVal){
		if(i == "asset_id" || i == "model" || i == "name" || i == "sn" || i == "pdu_use"){
			var obj = $(['<li class="list-group-item">',
							'<div class="key">'+i+'</div>',
							'<div class="oper">： </div>',
							'<div class="value">'+selVal[i]+'</div>',
						'</li>'].join(""));
			if(i == "asset_id") obj.find("input").attr("disabled", true);
			$(".detail ul").append(obj);
		}
	}
	if(document.body.clientHeight - ev.clientY > 180){
		$(".detail").css("top", ev.clientY+10);
	}else{
		$(".detail").css("top", ev.clientY+10-180);
	}
	$(".detail").css("left", ev.clientX+10);
	$(".detail").removeClass("hide");
});

// rack hover
$(document).delegate("#rackValue tbody tr", "mouseout", function (ev) {
	$(".detail").addClass("hide");
});

// rack hover
$(document).delegate(".pdu .pdu-detail-c .pdu-detail.active", "mousemove", function (ev) {
	var _this = this;
	var dataID = $(_this).data("rack");
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

$(document).delegate(".pdu .pdu-detail-c .pdu-detail", "mouseout", function (ev) {
	$(".detail").addClass("hide");
});


$(document).delegate("#rackValue tbody tr td:nth-child(2)", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	if($(_this).hasClass("used")){
		$(".info-detail").removeClass("hide");
		$(".info-detail .add-pdu-pos").addClass("hide");
		$(".info-detail .del-svr").addClass("hide");
		$(".save-info").removeClass("hide");
		var dataID = $(_this).parent().data("id");
		var rowspan = $(_this).attr("rowspan");
		$(".device-id").html("（"+(dataID-rowspan+1)+"）");
		$(".info-detail").attr("data-id", dataID);
		var selVal = rackInfoValue.value.rackValue[dataID].value;
		$(".info-detail ul").empty();
		for(var i in selVal){
			if(i == "asset_id" || i == "model" || i == "name" || i == "sn"){
				var obj = $(['<li class="list-group-item">',
								'<div class="key">'+i+'</div>',
								'<div class="oper">： </div>',
								'<input type="text" class="form-control value change-'+i+'" value="'+selVal[i]+'" placeholder="'+i+'" title="'+selVal[i]+'">',
							'</li>'].join(""));
				if(i == "asset_id") obj.find("input").attr("disabled", true);
				$(".info-detail ul").append(obj);
			}
			if("pdu_use" == i){
				var pduUsed = rackInfoValue.value.pduData[dataID].split(",");
				for (var pu = 0; pu < pduUsed.length; pu++) {
					var tmpObj = $(['<li class="input-group pdu-pos-info">',
										'<span class="input-group-addon svr-label">pdu:</span>',
										'<select class="form-control pdu-info"></select>',
										'<span class="input-group-addon svr-label">pos:</span>',
										'<select class="form-control pdu-pos"></select>',
									'</li>'].join(""));
					$(".info-detail ul").append(tmpObj);
					tmpObj.find(".pdu-info option").remove();
					tmpObj.find(".pdu-pos option").remove();
					tmpObj.find(".pdu-info").append('<option data-num="" value="">select pdu</option>');
					tmpObj.find(".pdu-pos").append('<option data-num="" value="">select pdu pos</option>');
					var pduValue = rackInfoValue.value.pduValue;
					for(var pduPos in pduValue){
						for (var j = 0; j < pduValue[pduPos].length; j++) {
							tmpObj.find(".pdu-info").append('<option data-num="'+pduValue[pduPos][j].pin_num+'" value="'+pduValue[pduPos][j].id+'">'+pduValue[pduPos][j].id+'</option>');
						}
					}
					var pduPos = pduUsed[pu].split("-");
					tmpObj.find(".pdu-info option[value='"+pduPos[0]+"']").attr("selected", true)
					var pin_num = tmpObj.find(".pdu-info option:selected").data("num") || tmpObj.find(".pdu-info option:eq(1)").data("num");
					for (var n = 1; n <= pin_num; n++) {
						if(tmpObj.find(".pdu-pos option[value='"+n+"']").length <= 0){
							tmpObj.find(".pdu-pos").append('<option value="'+n+'">'+n+'</option>');
						}
					}
					tmpObj.find(".pdu-pos option[value='"+pduPos[1]+"']").attr("selected", true)
				}
			}
		}
		$(".info-detail .add-pdu-pos").remove();
		$(".info-detail").append('<button type="button" class="add-pdu-pos btn btn-default">Add Pdu Pos Info</button>');
		
		$(".info-detail .del-svr").remove();
		$(".info-detail").append('<button type="button" class="del-svr btn btn-default">Del Svr</button>');
		$(".save-info").removeClass("save-rack-info").addClass("save-rack-value");
		$(".save-info").html(config.saveRackValue);
	}else{
		$(".info-detail").addClass("hide");
		$(".save-info").addClass("hide");
	}
});

$(document).delegate(".modify.btn", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var rackName = $(".rack-name").text();
	$(".modify-rack-name .modal-rack-name").val(rackName);
	$(".modify-rack-name").modal("show");
});

$(document).delegate(".del-svr", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var dataID = $(_this).parent().attr("data-id");
	var id = rackInfoValue.value.rackValue[dataID].id;
	
	$.ajax({
		url: ajax_url.del_svr_node,
		type: "post",
		async: true,
		data: {
			"id": id
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
				$("#rackValue").find("tr[data-id="+(dataID)+"]").removeClass("used");
				$("#rackValue").find("tr[data-id="+(dataID)+"] td:eq(1)").removeClass("used").removeClass("td-addsvr").removeAttr("style").removeAttr("rowspan").html("");
				for (var i = 0; i < dataID && !$("#rackValue").find("tr[data-id="+(dataID-i)+"]").hasClass("used"); i++) {
					$("#rackValue").find("tr[data-id="+(dataID-i)+"] td:eq(1)").removeClass("hide");
				}
				$(".info-detail").addClass("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});

$(document).delegate(".add-pdu-modal .sure", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var type = $(".add-pdu-modal .pdu-type option:selected").val()
	var pos = $(".add-pdu-modal").attr("data-type");
	var id = zTree.getSelectedNodes()[0].id;
	showMask();
	$.ajax({
		url: ajax_url.add_pdu_node,
		type: "post",
		async: true,
		data: {
			"pId": id,
			"pin_num": type,
			"pos": pos
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
				rackInfoValue.value.pduValue[pos].push(json.data);
				drawPdu();
				$(".add-pdu-modal").modal("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
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
		url: ajax_url.set_rack_prop,
		type: "post",
		async: true,
		data: {
			id: id,
			name: rackName
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
	var asset_id = $(".add-node .node-asset-id").val();
	
	var type = $(".add-node .node-type option:selected").val()
	if(!value || !type || !asset_id){
		alert("the name is empty or the type is empty or the asset id is empty!");
		return false;
	}
	var add_node_url = "";
	if(type == "fold") add_node_url = ajax_url.add_idc_node;
	if(type == "file") add_node_url = ajax_url.add_rack_node;
	
	/*postData = {
			name: value,
			pid: id,
			rackname: value,
			info: "%7B%22Rack%20Location%22%3A%22%22%2C%22Rack%20Asset%20ID%22%3A%22%22%7D",
			value: "%7B%22rackValue%22%3A%7B%221%22%3A%7B%22id%22%3A1%2C%22name%22%3A1%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%222%22%3A%7B%22id%22%3A2%2C%22name%22%3A2%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%223%22%3A%7B%22id%22%3A3%2C%22name%22%3A3%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%224%22%3A%7B%22id%22%3A4%2C%22name%22%3A4%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%225%22%3A%7B%22id%22%3A5%2C%22name%22%3A5%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%226%22%3A%7B%22id%22%3A6%2C%22name%22%3A6%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%227%22%3A%7B%22id%22%3A7%2C%22name%22%3A7%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%228%22%3A%7B%22id%22%3A8%2C%22name%22%3A8%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%229%22%3A%7B%22id%22%3A9%2C%22name%22%3A9%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2210%22%3A%7B%22id%22%3A10%2C%22name%22%3A10%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2211%22%3A%7B%22id%22%3A11%2C%22name%22%3A11%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2212%22%3A%7B%22id%22%3A12%2C%22name%22%3A12%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2213%22%3A%7B%22id%22%3A13%2C%22name%22%3A13%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2214%22%3A%7B%22id%22%3A14%2C%22name%22%3A14%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2215%22%3A%7B%22id%22%3A15%2C%22name%22%3A15%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2216%22%3A%7B%22id%22%3A16%2C%22name%22%3A16%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2217%22%3A%7B%22id%22%3A17%2C%22name%22%3A17%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2218%22%3A%7B%22id%22%3A18%2C%22name%22%3A18%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2219%22%3A%7B%22id%22%3A19%2C%22name%22%3A19%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2220%22%3A%7B%22id%22%3A20%2C%22name%22%3A20%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2221%22%3A%7B%22id%22%3A21%2C%22name%22%3A21%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2222%22%3A%7B%22id%22%3A22%2C%22name%22%3A22%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2223%22%3A%7B%22id%22%3A23%2C%22name%22%3A23%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2224%22%3A%7B%22id%22%3A24%2C%22name%22%3A24%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2225%22%3A%7B%22id%22%3A25%2C%22name%22%3A25%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2226%22%3A%7B%22id%22%3A26%2C%22name%22%3A26%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2227%22%3A%7B%22id%22%3A27%2C%22name%22%3A27%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2228%22%3A%7B%22id%22%3A28%2C%22name%22%3A28%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2229%22%3A%7B%22id%22%3A29%2C%22name%22%3A29%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2230%22%3A%7B%22id%22%3A30%2C%22name%22%3A30%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2231%22%3A%7B%22id%22%3A31%2C%22name%22%3A31%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2232%22%3A%7B%22id%22%3A32%2C%22name%22%3A32%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2233%22%3A%7B%22id%22%3A33%2C%22name%22%3A33%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2234%22%3A%7B%22id%22%3A34%2C%22name%22%3A34%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2235%22%3A%7B%22id%22%3A35%2C%22name%22%3A35%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2236%22%3A%7B%22id%22%3A36%2C%22name%22%3A36%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2237%22%3A%7B%22id%22%3A37%2C%22name%22%3A37%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2238%22%3A%7B%22id%22%3A38%2C%22name%22%3A38%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2239%22%3A%7B%22id%22%3A39%2C%22name%22%3A39%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2240%22%3A%7B%22id%22%3A40%2C%22name%22%3A40%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2241%22%3A%7B%22id%22%3A41%2C%22name%22%3A41%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2242%22%3A%7B%22id%22%3A42%2C%22name%22%3A42%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2243%22%3A%7B%22id%22%3A43%2C%22name%22%3A43%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2244%22%3A%7B%22id%22%3A44%2C%22name%22%3A44%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2245%22%3A%7B%22id%22%3A45%2C%22name%22%3A45%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%2C%2246%22%3A%7B%22id%22%3A46%2C%22name%22%3A46%2C%22value%22%3A%7B%22Name%22%3A%22%22%2C%22Model%22%3A%22%22%2C%22SN%22%3A%22%22%2C%22Asset%20ID%22%3A%22%22%7D%7D%7D%2C%22addsvrData%22%3A%7B%7D%7D",
			useinfo: "0000000000000000000000000000000000000000000000"
		}
	*/
	var id = zTree.getSelectedNodes()[0].id;
	var postData = {};
	postData = {
		pId: id,
		name: value,
		asset_id: asset_id
	}
	showMask();
	$.ajax({
		url: add_node_url,
		type: "post",
		async: true,
		data: postData,
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

$(document).delegate(".info-detail .add-pdu-pos", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var tmpObj = $(['<div class="input-group pdu-pos-info">',
					'<span class="input-group-addon svr-label">pdu:</span>',
					'<select class="form-control pdu-info"></select>',
					'<span class="input-group-addon svr-label">pos:</span>',
					'<select class="form-control pdu-pos"></select>',
				'</div>'].join(""));
	$(_this).prevAll("ul.list-group").append(tmpObj);
	tmpObj.find(".pdu-info option").remove();
	tmpObj.find(".pdu-pos option").remove();
	tmpObj.find(".pdu-info").append('<option data-num="" value="">select pdu</option>');
	tmpObj.find(".pdu-pos").append('<option data-num="" value="">select pdu pos</option>');
	var pduValue = rackInfoValue.value.pduValue;
	for(var pduPos in pduValue){
		for (var i = 0; i < pduValue[pduPos].length; i++) {
			tmpObj.find(".pdu-info").append('<option data-num="'+pduValue[pduPos][i].pin_num+'" value="'+pduValue[pduPos][i].id+'">'+pduValue[pduPos][i].id+'</option>');
		}
	}
	var pin_num = tmpObj.find(".pdu-info option:eq(1)").data("num");
	for (var n = 1; n <= pin_num; n++) {
		if(tmpObj.find(".pdu-pos option[value='"+n+"']").length <= 0){
			tmpObj.find(".pdu-pos").append('<option value="'+n+'">'+n+'</option>');
		}
	}
});

$(document).delegate(".add-svr .add-pdu-pos", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var tmpObj = $(['<div class="input-group pdu-pos-info">',
					'<span class="input-group-addon svr-label">pdu:</span>',
					'<select class="form-control pdu-info"></select>',
					'<span class="input-group-addon svr-label">pos:</span>',
					'<select class="form-control pdu-pos"></select>',
				'</div>',
				'<br />'].join(""));
	$(_this).before(tmpObj);
	tmpObj.find(".pdu-info option").remove();
	tmpObj.find(".pdu-pos option").remove();
	tmpObj.find(".pdu-info").append('<option data-num="" value="">select pdu</option>');
	tmpObj.find(".pdu-pos").append('<option data-num="" value="">select pdu pos</option>');
	var pduValue = rackInfoValue.value.pduValue;
	for(var pduPos in pduValue){
		for (var i = 0; i < pduValue[pduPos].length; i++) {
			tmpObj.find(".pdu-info").append('<option data-num="'+pduValue[pduPos][i].pin_num+'" value="'+pduValue[pduPos][i].id+'">'+pduValue[pduPos][i].id+'</option>');
		}
	}
	var pin_num = tmpObj.find(".pdu-info option:eq(1)").data("num");
	for (var n = 1; n <= pin_num; n++) {
		if(tmpObj.find(".pdu-pos option[value='"+n+"']").length <= 0){
			tmpObj.find(".pdu-pos").append('<option value="'+n+'">'+n+'</option>');
		}
	}
});

$(document).delegate(".pdu-info", "change", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var pin_num = $(_this).find("option:selected").data("num");
	$(_this).nextAll(".pdu-pos").find("option").remove();
	$(_this).nextAll(".pdu-pos").append('<option value="">select pdu pos</option>');
	for (var n = 1; n <= pin_num; n++) {
		if($(_this).nextAll(".pdu-pos").find("option[value='"+n+"']").length <= 0){
			$(_this).nextAll(".pdu-pos").append('<option value="'+n+'">'+n+'</option>');
		}
	}
});

$(document).delegate(".info-detail .pdu-pos", "change", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var dataID = $($(_this).parents(".info-detail")[0]).data("id");
	var svr_pdu_use = "";
	var pdu_pos_info_obj = $(".info-detail .pdu-pos-info");
	for (var i = 0; i < pdu_pos_info_obj.length; i++) {
		var pdu_id = $(pdu_pos_info_obj[i]).find(".pdu-info option:selected").val();
		var pdu_pos = $(pdu_pos_info_obj[i]).find(".pdu-pos option:selected").val();
		if(pdu_id && pdu_pos && pdu_id != "selected" && pdu_pos != "selected"){
			if(svr_pdu_use.indexOf(pdu_id+"-"+pdu_pos+",") == -1){
				svr_pdu_use += (pdu_id+"-"+pdu_pos+ ",");
			}
		}
	}
	svr_pdu_use = svr_pdu_use.substr(0, svr_pdu_use.length-1);
	rackInfoValue.value.pduData[dataID] = svr_pdu_use;
	rackInfoValue.value.rackValue[dataID].value.pdu_use = svr_pdu_use;
	setPduStatus();
});

$(document).delegate("#addsvrBtn", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$(".add-svr .pdu-info option").remove();
	$(".add-svr .pdu-pos option").remove();
	$(".add-svr .pdu-info").append('<option data-num="" value="">select pdu</option>');
	$(".add-svr .pdu-pos").append('<option data-num="" value="">select pdu pos</option>');
	var pduValue = rackInfoValue.value.pduValue;
	for(var pduPos in pduValue){
		for (var i = 0; i < pduValue[pduPos].length; i++) {
			$(".add-svr .pdu-info").append('<option data-num="'+pduValue[pduPos][i].pin_num+'" value="'+pduValue[pduPos][i].id+'">'+pduValue[pduPos][i].id+'</option>');
		}
	}
	var pin_num = $(".add-svr .pdu-info option:eq(1)").data("num");
	for (var n = 1; n <= pin_num; n++) {
		if($(".add-svr .pdu-pos option[value='"+n+"']").length <= 0){
			$(".add-svr .pdu-pos").append('<option value="'+n+'">'+n+'</option>');
		}
	}
	$(".add-svr").modal("show");
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

$(document).delegate(".addsvr", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$(".add-svr").removeClass("hide");
});

/*
$(document).delegate(".unaddsvr", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$(".unaddsvr-list ul").empty();
	var tdAddsvrObjs = $("#rackValue").find("td.td-addsvr");
	for (var i = 0; i < tdAddsvrObjs.length; i++) {
		var id = $(tdAddsvrObjs[i]).parents("tr").data("id");
		for (var x = 1; x <= 46; x++) {
			if($("#rackValue").find("tr:eq("+(46-parseInt(id)+x)+") td:nth-child(2)").hasClass("hide")){
				continue;
			}else{
				id = id - x + 1;
				break;
			}
		}
		$(".unaddsvr-list ul").append('<li class="list-group-item" data-id="'+id+'">'+id+'</li>');
	}
	$(".unaddsvr-list").removeClass("hide");
});
*/

$(document).delegate(".export", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	formatExportData();
});

$(document).delegate(".info-detail li .change-model", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$(".detail li:eq(1) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["model"] = $(".info-detail ul li:eq(1) .value").val()
});


$(document).delegate(".info-detail li .change-name", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$("#rackValue tr[data-id='"+dataID+"'] td:eq(1)").html(val);
	$(".detail li:eq(2) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["name"] = $(".info-detail ul li:eq(2) .value").val();
	var useinfoArr = rackInfoValue.useinfo.split("");
	if(val){
		useinfoArr[parseInt(dataID)-1] = 1;
	}else{
		useinfoArr[parseInt(dataID)-1] = 0;
	}
	rackInfoValue.useinfo = useinfoArr.join("");
});

$(document).delegate(".info-detail li .change-sn", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$(".detail li:eq(3) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["sn"] = $(".info-detail ul li:eq(3) .value").val();
});
/*
$(document).delegate(".info-detail li .change-Asset.ID", "keyup", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var val = $(_this).val().trim();
	var dataID = $(_this).parents(".info-detail").attr("data-id");
	$(".detail li:eq(3) .value").html(val);
	rackInfoValue.value.rackValue[dataID].value["Asset ID"] = $(".info-detail ul li:eq(3) .value").val();
});*/

/*
$(document).delegate(".unaddsvr-list li", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	$(_this).remove();
	var dataID = $(_this).data("id");
	delete rackInfoValue.value.addsvrData[dataID];
	
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
				drawAddsvr();
				$(".unaddsvr-list").addClass("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
});
*/

$(document).delegate(".save-rack-info", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var id = zTree.getSelectedNodes()[0].id;
	rackInfoValue.info = {"Rack Location": $(".info-detail ul li:eq(0) .value").val(),"Rack Asset ID": $(".info-detail ul li:eq(1) .value").val()};
	var name = $(".info-detail ul li:eq(1) .value").val();
	showMask();
	// 设置rack属性
	// TODO  设置svr属性,添加pdu占用信息  todo pdu占用信息咋给
	// hover pdu
	// modify rack Name
	// export
	// import
	// pdu_use 界面化
	$.ajax({
		url: ajax_url.set_rack_prop,
		type: "post",
		async: true,
		data: {
			id: id,
			name: name
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

$(document).delegate(".pdu-del", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var pdu_id = $(_this).parents("pdu").attr("id");
	
	showMask();
	$.ajax({
		url: ajax_url.del_pdu_node,
		type: "post",
		async: true,
		data: {
			"id": pdu_id
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
				$("#"+pdu_id).remove();
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
	var selID = $(".info-detail").data("id");
	var id = rackInfoValue.value.rackValue[selID].id;
	//rackInfoValue.value.rackValue[selID].value["Name"] = $(".info-detail ul li:eq(0) .value").val();
	//rackInfoValue.value.rackValue[selID].value["Model"] = $(".info-detail ul li:eq(1) .value").val()
	//rackInfoValue.value.rackValue[selID].value["SN"] = $(".info-detail ul li:eq(2) .value").val();
	//rackInfoValue.value.rackValue[selID].value["Asset ID"] = $(".info-detail ul li:eq(3) .value").val();
	
	var asset_id = $(".info-detail ul li:eq(0) .value").val();
	var svr_model = $(".info-detail ul li:eq(1) .value").val();
	var svr_name = $(".info-detail ul li:eq(2) .value").val();
	var svr_sn = $(".info-detail ul li:eq(3) .value").val();
	
	var svr_pdu_use = "";
	var pdu_pos_info_obj = $(".info-detail .pdu-pos-info");
	for (var i = 0; i < pdu_pos_info_obj.length; i++) {
		var pdu_id = $(pdu_pos_info_obj[i]).find(".pdu-info option:selected").val();
		var pdu_pos = $(pdu_pos_info_obj[i]).find(".pdu-pos option:selected").val();
		if(pdu_id && pdu_pos && pdu_id != "selected" && pdu_pos != "selected"){
			if(svr_pdu_use.indexOf(pdu_id+"-"+pdu_pos+",") == -1){
				svr_pdu_use += (pdu_id+"-"+pdu_pos+ ",");
			}
		}
	}
	svr_pdu_use = svr_pdu_use.substr(0, svr_pdu_use.length-1);
	
	showMask();
	$.ajax({
		url: ajax_url.set_svr_prop,
		type: "post",
		async: true,
		data: {
			"id": id,
			"mn": svr_model,
			"name": svr_name,
			"sn": svr_sn,
			"pdu_use": svr_pdu_use
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

/*$(document).bind('click',function(ev){
	ev.stopPropagation();
	ev.preventDefault();
	$(".unaddsvr-list").addClass("hide");
});*/

$(document).delegate(".import-db-modal .sure", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	showMask();
	$.ajaxFileUpload({
	    url: ajax_url.import_db, //用于文件上传的服务器端请求地址
	    secureuri: false, //是否需要安全协议，一般设置为false
	    fileElementId: 'inputfile', //文件上传域的ID
	    dataType: 'json', //返回值类型 一般设置为json
	    success: function (data, status) {
	        hideMask();
	    },
	    error: function (e) {
	        hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
	    }
	});
});

$(document).delegate(".add-svr .sure", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var _this = this;
	var id = zTree.getSelectedNodes()[0].id;
	var pos = $(".add-svr .addsvr-pos").val();
	var len = $(".add-svr .addsvr-len option:selected").val();
	var svr_asset_id = $(".add-svr .svr-asset-id").val();
	var svr_name = $(".add-svr .svr-name").val();
	var svr_model = $(".add-svr .svr-model").val();
	var svr_sn = $(".add-svr .svr-sn").val();
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
		console.log("already addsvr");
		$(".add-svr").modal("hide");
		return false;
	}
	
	for (var i = len-1; i > 0 ; i--) {
		if($("#rackValue").find("tr:eq("+(46-pos-i)+") td:eq(1)").hasClass("hide")){
			console.log("already addsvr");
			$(".add-svr").modal("hide");
			return false;
		}else{
			break;
		}
	}
	/*for (var i = 1; i < len; i++) {
		rackInfoValue.value.rackValue[pos+i].value = rackInfoValue.value.rackValue[pos].value;
	}*/
	
	var postData = {
		"pId": id,
		"asset_id": svr_asset_id,
		"name": svr_name,
		"model": svr_model,
		"mn":"xxx",
		"sn": svr_sn,
		"rack_use": pos+","+len
	};
	
	var svr_pdu_use = "";
	for (var i = 0; i < $(".add-svr .pdu-pos-info").length; i++) {
		var pdu_id = $($(".add-svr .pdu-pos-info")[i]).find(".add-svr .pdu-info option:selected").val()
		var pdu_pos = $($(".add-svr .pdu-pos-info")[i]).find(".add-svr .pdu-pos option:selected").val()
		if(pdu_id && pdu_pos && pdu_id != "selected" && pdu_pos != "selected"){
			if(svr_pdu_use.indexOf(pdu_id+"-"+pdu_pos+",") == -1){
				svr_pdu_use += (pdu_id+"-"+pdu_pos+ ",");
			}
		}
	}
	svr_pdu_use = svr_pdu_use.substr(0, svr_pdu_use.length-1);
	
	if(svr_pdu_use) postData.pdu_use = svr_pdu_use;
	
	showMask();
	$.ajax({
		url: ajax_url.add_svr_node,
		type: "post",
		async: true,
		data: postData,
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
				rackInfoValue.value.addsvrData[pos] = {};
				rackInfoValue.value.addsvrData[pos].pos = pos;
				rackInfoValue.value.addsvrData[pos].len = len;
				
				rackInfoValue.value.rackValue[pos+len-1] = {
					id: json.data.id,
					name: svr_name,
					value: {
						"asset_id": svr_asset_id,
						"model": svr_model,
						"name": svr_name,
						"sn": svr_sn
					}
				}
				drawRack();
				drawAddsvr();
				$(".add-svr").modal("hide");
			}
		},
		error: function (e) {
			hideMask();
			console.error("请求出错(请检查相关网络状况.)", e);
		}
	});
	
	return true;
	
	$("#rackValue").find("tr:eq("+(pos-1)+") td:eq(1)").attr("rowspan", len).addClass("td-addsvr");
	$("#rackValue").find("tr:eq("+(pos-1)+") td:eq(1)").css({
		"vertical-align": "middle",
		"text-align": "center"
	});
	for (var i = 0; i < len-1; i++) {
		$("#rackValue").find("tr:eq("+(pos+i)+") td:eq(1)").addClass("hide");
	}
	
	$(".add-svr").modal("hide");
});

$(document).delegate(".reset", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$("#u_num").val("");
	initTree();
});

$(document).delegate("#exportDbBtn", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	showMask();
	$.ajax({
		url: ajax_url.export_db,
		type: "post",
		async: true,
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

$(document).delegate("#importDbBtn", "click", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	$(".import-db-modal").modal("show");
});