function buildGroupStringForItem(item) {
	var returnObject = null;
	if (item.groups != null) {
		returnObject = "";
		for (var i = 0; i < item.groups.length; i++) {
			returnObject += "<a href='?"+item.groups[i].group+"'>"+item.groups[i].group+"</a>";
			if (item.groups[i].role) {
				returnObject += " ("+item.groups[i].role+")"
			}
			if (i < item.groups.length-1) {
				returnObject += ", <br />";
			}
		}
	}
	
	return returnObject;
}
