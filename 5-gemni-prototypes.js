google.maps.Map.prototype.addMenu = function(menu)
{
	if (!this.allMenus)
	{
		this.allMenus = new Array();
	}
	this.allMenus.push(menu);
}

google.maps.Map.prototype.hideAllMenus = function()
{
	for (var i = 0;i < this.allMenus.length;i++)
	{
		this.allMenus[i].hide();
	}
}

google.maps.StreetViewPanorama.prototype.addMenu = function(menu)
{
	if (!this.allMenus)
	{
		this.allMenus = new Array();
	}
	this.allMenus.push(menu);
}

google.maps.StreetViewPanorama.prototype.hideAllMenus = function()
{
	for (var i = 0;i < this.allMenus.length;i++)
	{
		this.allMenus[i].hide();
	}
}

google.maps.StreetViewPanorama.prototype.getMouseOverMarker = function()
{
	return this.mouseOverMarker;
}

google.maps.StreetViewPanorama.prototype.setMouseOverMarker = function(mouseOverMarker)
{
	this.mouseOverMarker = mouseOverMarker;
}

google.maps.Marker.prototype.setUnsaved = function(unsaved)
{
	this.unsaved = unsaved;
	if (this.brother)
	{
		this.brother.unsaved = unsaved;
	}
}

google.maps.Marker.prototype.getUnsaved = function()
{
	return this.unsaved;
}

google.maps.Marker.prototype.getClusterable = function()
{
	if (this.getDraggable())
	{
		return false;
	}	
	if (this.unsaved)
	{
		return false;
	}
	if (this.dragging)
	{
		return false;
	}
	if (this.getInfoState() || this.getBrother().getInfoState())
	{
		return false;
	}
	return true;
}

google.maps.Marker.prototype.setDragging = function(dragging)
{
	this.dragging = dragging;
	if (this.brother)
	{
		this.brother.dragging = dragging;
	}
}

google.maps.Marker.prototype.getDragging = function()
{
	return this.dragging;
}

google.maps.Marker.prototype.setRowID = function(rowid)
{
	this.rowid = rowid;
	this.brother.rowid = rowid;
}

google.maps.Marker.prototype.getRowID = function()
{
	return this.rowid;
}

google.maps.Marker.prototype.setBrother = function(other)
{
	this.brother = other;
	other.brother = this;
}

google.maps.Marker.prototype.getBrother = function()
{
	return this.brother;
}

google.maps.Marker.prototype.setInfoState = function(state)
{
	this.infoState = state;
}

google.maps.Marker.prototype.getInfoState = function()
{
	return this.infoState;
}

google.maps.Marker.prototype.setInfoWindow = function(window)
{
	this.infoWindow = window;
	if (this.brother)
	{
		this.brother.infoWindow = window;
	}
}

google.maps.Marker.prototype.getInfoWindow = function()
{
	return this.infoWindow;
}

google.maps.Marker.prototype.setEditorWindow = function(window)
{
	this.editorWindow = window;
	this.brother.editorWindow = window;
}

google.maps.Marker.prototype.getEditorWindow = function()
{
	return this.editorWindow;
}

google.maps.InfoWindow.prototype.setDateValue = function(dateValue)
{
	this.dateValue = dateValue;
}

google.maps.InfoWindow.prototype.getDateValue = function()
{
	return this.dateValue;
}

google.maps.InfoWindow.prototype.setAddressValue = function(addressValue)
{
	this.addressValue = addressValue;
}

google.maps.InfoWindow.prototype.getAddressValue = function()
{
	return this.addressValue;
}

google.maps.InfoWindow.prototype.setCommentsValue = function(commentsValue)
{
	this.commentsValue = commentsValue;
}

google.maps.InfoWindow.prototype.getCommentsValue = function()
{
	return this.commentsValue;
}

google.maps.InfoWindow.prototype.setTitleValue = function(titleValue)
{
	this.titleValue = titleValue;
}

google.maps.InfoWindow.prototype.getTitleValue = function()
{
	return this.titleValue;
}

google.maps.InfoWindow.prototype.setWindowState = function(windowState)
{
	this.windowState = windowState;
}

google.maps.InfoWindow.prototype.getWindowState = function()
{
	return this.windowState;
}

google.maps.InfoWindow.prototype.getRowID = function()
{
	return this.rowID;
}

google.maps.InfoWindow.prototype.setRowID = function(rowID)
{
	this.rowID = rowID;
}

InfoBubble.prototype.setDateValue = function(dateValue)
{
	this.dateValue = dateValue;
}

InfoBubble.prototype.getDateValue = function()
{
	return this.dateValue;
}

InfoBubble.prototype.setAddressValue = function(addressValue)
{
	this.addressValue = addressValue;
}

InfoBubble.prototype.getAddressValue = function()
{
	return this.addressValue;
}

InfoBubble.prototype.setCommentsValue = function(commentsValue)
{
	this.commentsValue = commentsValue;
}

InfoBubble.prototype.getCommentsValue = function()
{
	return this.commentsValue;
}

InfoBubble.prototype.setTitleValue = function(titleValue)
{
	this.titleValue = titleValue;
}

InfoBubble.prototype.getTitleValue = function()
{
	return this.titleValue;
}

InfoBubble.prototype.setWindowState = function(windowState)
{
	this.windowState = windowState;
}

InfoBubble.prototype.getWindowState = function()
{
	return this.windowState;
}

InfoBubble.prototype.getRowID = function()
{
	return this.rowID;
}

InfoBubble.prototype.setRowID = function(rowID)
{
	this.rowID = rowID;
}



google.maps.Marker.prototype.setFull = function(full)
{
	this.full = full;
}

google.maps.Marker.prototype.getFull = function()
{
	return this.full;
}

google.maps.Marker.prototype.alternateFull = function()
{
	if (this.full == null || this.full == false)
	{
		this.full = true;
	}
	else
	{
		this.full = false;
	}
}

google.maps.StreetViewPanorama.prototype.setDiv = function(div)
{
	this.currentDiv = div;
}

google.maps.StreetViewPanorama.prototype.getDiv = function()
{
	return this.currentDiv;
}
