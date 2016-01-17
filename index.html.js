var dataDirectory = "../mentemedia-data/";
jQuery.ajaxSetup({ cache: false });

function bodyDidLoad() {
	var myURL = document.URL;
	var myIndex = myURL.indexOf("?");
	if (myIndex > 0) {
		var mySubstring = myURL.substring(myIndex+1);
	} else {
		var mySubstring = '00_MAIN_PAGE';
	}
	loadItem(mySubstring);
	
	$.get("getManifest.php", function(manifest) {
		for (var i = 0; i < manifest.length; i++) {
			$('#manualInput').append(
				'<option value="'+manifest[i]+'">'+manifest[i]+'</option>'
			)
		}
	});
	$('#manualInput').select2({
		placeholder: "identifier",
		allowClear: true
	});
	$('#manualInput').select2("open");
	$('#manualInput').select2("close");
	// $("#manualInput").focus();
}

function loadItem(itemIdentifier) {
	$.get(dataDirectory+"redirects.json", function(redirectsMap) {
		document.title = itemIdentifier;
		for (var i = 0; i < redirectsMap.length; i++) {
			if (redirectsMap[i].from == itemIdentifier) {
				itemIdentifier = redirectsMap[i].to;
				document.title = redirectsMap[i].to + " (" + redirectsMap[i].from + ")";
			}
		}
		// page
		
		$("#pageOutput").load(dataDirectory+"items/"+itemIdentifier+".html");
		
		// structured data
		$.get(
			dataDirectory+"items/"+itemIdentifier+".json",
			function(ajaxResponse) {
				var showInfobox = false;
				if (ajaxResponse.person != null) {
					makePersonInfo(ajaxResponse);
					showInfobox = true;
				}
				if (ajaxResponse.film != null) {
					makeFilmInfo(ajaxResponse);
					showInfobox = true;
				}
				if (ajaxResponse.unswSubject != null) {
					makeUnswSubjectInfo(ajaxResponse);
					showInfobox = true;
				}
				if (ajaxResponse.place != null) {
					makePlaceInfo(ajaxResponse);
					showInfobox = true;
				}
				if (showInfobox) {
					$("#infoboxCol").addClass("col-md-4");
					$("#pageCol").addClass("col-md-8");
				} else {
					$("#infoboxCol").remove();
					$("#pageCol").addClass("col-md-12");
				}
			}
		)
		.fail(function() {
			$("#infoboxCol").remove();
			$("#pageCol").addClass("col-md-12");
		});
	});
}
function processManualInput() {
	var enteredInput = $("#manualInput").val();
	document.location = "?"+enteredInput;
}

function findItemsInGroup(groupName, callbackFunction) {
	$.get("getManifest.php", function(manifest) {
		for (var i = 0; i < manifest.length; i++) {
			$.get(dataDirectory+"items/"+manifest[i]+".json",
				function(itemData) {
					if (itemData.groups != null) {
						for (var j = 0; j < itemData.groups.length; j++) {
							if (itemData.groups[j].group == groupName) {
                                callbackFunction(itemData,itemData.groups[j]);
							}
						}
					}
				}
			);
		}
	});
}

function findAllPeopleItems(callbackFunction) {
	var itemsRemaining;
	$.get("getManifest.php", function(manifest) {
		for (var i = 0; i < manifest.length; i++) {
			$.get(dataDirectory+"items/"+manifest[i]+".json",
				function(itemData) {
					if (itemData.person != null) {
						callbackFunction(itemData);
					}
				}
			);
		}
	});
}
