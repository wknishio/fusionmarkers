/**
 * Context Menu for google maps
 */

	// Use the correct document accordingly with window argument (sandbox)
	//var document = window.document,

		// shorthand some stuff
		//$ = jQuery,
		g = google.maps;
	/**
	@constructor
	*/
	function MapContextMenu(opts)
	{
		// A way to access 'this' object from inside functions
		var self = this;

		if ( opts.map !== undefined )
		{
			// Put the map onto the object
			this.theMap = opts.map;
			opts.map.addMenu(self);

			// Keep track of where you clicked, for the callback functions.
			this.clickedLatLng = null;

			// Create the context menu element
			this.theMenu = $(document.createElement('div'))
				.attr('class', 'contextMenu')

				// .. disable the browser context menu on our context menu
				.bind('contextmenu', function() { return false; })

				// .. append a ul list element
				//.append($(document.createElement('ul')))

				// .. then append it to the map object
				.appendTo(this.theMap.getDiv());

			// Display and position the menu
			$.each('rightclick longpress'.split(' '), function(i,name)
			{
				g.event.addListener(self.theMap, name, function(e)
				{
					if (!e.latLng)
					{
						return;
					}
					// Shorthand some stuff
					var mapDiv = $(self.theMap.getDiv()),
					menu = self.theMenu,
					x = e['pixel']['x'],
					y = e['pixel']['y'];

					// Hide the context menu if its open
					//menu.hide();
					
					self.theMap.hideAllMenus();
	
					// Save the clicked location
					self.clickedLatLng = e.latLng;
	
					// Adjust the menu if clicked to close to the edge of the map
					if ( x > mapDiv.width() - menu.width() )
						x -= menu.width();
	
					if ( y > mapDiv.height() - menu.height() )
						y -= menu.height();
	
					// Set the location and fade in the context menu
					menu.css({ top: y, left: x }).fadeIn(200);
				});
			});

			// Hide context menu on several events
			$.each('click dragstart zoom_changed maptypeid_changed center_changed'.split(' '), function(i,name){
				g.event.addListener(self.theMap, name, function(){ self.theMenu.hide(); });
			});
		}
	}

	MapContextMenu.prototype.addItem = function(name, loc, title, icon, callback)
	{
		// If no loc was provided
		if ( typeof loc === 'function')
		{
			callback = loc;
			loc = undefined;
		}

		// A way to access 'this' object from inside functions
		var self = this,

			// The name turned into camelCase for use in the li id, and anchor href
			idName = name.toCamel(),

			// The li element
			item = $(document.createElement('div'))
				.attr('id', idName)
				.attr('title', title)
				.html(name)
				.attr('class', 'item ' + icon)
				.hover(function() {
				$(this).toggleClass('hover');
				
			})
			// Set the click event
			.click(function(){

				// fade out the menu
				self.theMenu.hide();

				// call the callback function - 'this' would refer back to the jQuery object of the item element
				callback(self.theMap, self.clickedLatLng);

				// make sure the click doesnt take us anywhere
				return false;
			});
		// If `loc` is a number put it at that location
		if ( typeof loc === 'number' && loc < this.theMenu.find('div').length)
			this.theMenu.find('div').eq(loc).before(item);

		// .. else appened it to the end of the menu
		else
			this.theMenu.append(item);

		// Return the whole list item
		return item;
	};

	MapContextMenu.prototype.remove = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			item.remove();

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			this.theMenu.find('div').eq(item).remove()

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			this.theMenu.find('#'+item.toCamel()).remove()
		}
	};
	
	MapContextMenu.prototype.item = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			return item;

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			return this.theMenu.find('div').eq(item);

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			return this.theMenu.find('#'+item.toCamel());
		}
	}
	
	MapContextMenu.prototype.hide = function()
	{
		var self = this;
		self.theMenu.hide();
	}

	// Expose this to the global object
	window['MapContextMenu'] = MapContextMenu;
	

	String.prototype.toCamel = function() {
		return this.toLowerCase().replace(/(\s)([a-z])/gi, function(match, group1, group2){
			return group2.toUpperCase().replace(group1,'');
		});
	}
	/**
	@constructor
	*/
	function MapMarkerContextMenu(map, overlayview)
	{
		// A way to access 'this' object from inside functions
		var self = this;
		
		// Put the map onto the object
		this.theMap = map;
		map.addMenu(self);
		this.theControl = null;
		this.theOverlayview = overlayview;
		// Keep track of where you clicked, for the callback functions.
		this.clickedLatLng = null;

		// Create the context menu element
		this.theMenu = $(document.createElement('div'))
			.attr('class', 'contextMenu')

			// .. disable the browser context menu on our context menu
			.bind('contextmenu', function() { return false; })

			// .. append a ul list element
			//.append($(document.createElement('ul')))

			// .. then append it to the map object
			.appendTo(this.theMap.getDiv());

		

		// Hide context menu on several events
		$.each('click dragstart zoom_changed maptypeid_changed center_changed'.split(' '), function(i,name){
			g.event.addListener(self.theMap, name, function()
			{
				self.theControl = null;
				self.theMenu.hide();
			});
		});
	}
	
	MapMarkerContextMenu.prototype.getCurrentControl = function()
	{
		return this.theControl;
	}
	
	MapMarkerContextMenu.prototype.addControl = function(control)
	{
		//alert('addControlMap!');
		var self = this;
		this.theControl = control;
		
		// Display and position the menu
		$.each('rightclick longpress'.split(' '), function(i,name)
		{
			g.event.addListener(control, name, function(e)
			{
				if (!e.latLng)
				{
					return;
				}
				self.theMap.hideAllMenus();
				
			    self.theControl = control;
				/*var scale = Math.pow(2, map.getZoom());
					var nw = new google.maps.LatLng(
						map.getBounds().getNorthEast().lat(),
						map.getBounds().getSouthWest().lng()
					);
					var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
					var worldCoordinate = map.getProjection().fromLatLngToPoint(control.getPosition());
					var pixelOffset = new google.maps.Point(
						Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
						Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
					);
					var mapDiv = $(self.theMap.getDiv()),
						menu = self.theMenu,
						x = pixelOffset.x,
						y = pixelOffset.y;*/
				var mapDiv = $(self.theMap.getDiv());
				var menu = self.theMenu;
				
				var point = self.theOverlayview.getProjection().fromLatLngToContainerPixel(e.latLng);
				var x = point.x;
				var y = point.y;
				
				//alert("e.x: " + e.x);
				//alert("e.y: " + e.y);
				//alert("e.latLng.lat(): " + e.latLng.lat());
				//alert("e.latLng.lng(): " + e.latLng.lng());
				// Hide the context menu if its open
				//menu.hide();
				
				// Save the clicked location
				self.clickedLatLng = e.latLng;

				// Adjust the menu if clicked to close to the edge of the map
				if ( x > mapDiv.width() - menu.width() )
					x -= menu.width();

				if ( y > mapDiv.height() - menu.height() )
					y -= menu.height();

				// Set the location and fade in the context menu
				menu.css({ top: y, left: x }).fadeIn(200);
			});
		});
		
		$.each('click dragstart dragend'.split(' '), function(i,name){
			g.event.addListener(self.theControl, name, function(){
			self.theControl = null;
			self.theMenu.hide(); });
		});
		
		self.theControl = null;
	}

	MapMarkerContextMenu.prototype.addItem = function(name, loc, title, icon, callback)
	{
		// If no loc was provided
		if ( typeof loc === 'function')
		{
			callback = loc;
			loc = undefined;
		}

		// A way to access 'this' object from inside functions
		var self = this,

			// The name turned into camelCase for use in the li id, and anchor href
			idName = name.toCamel(),

			// The li element
			item = $(document.createElement('div'))
				.attr('id', idName)
				.attr('title', title)
				.html(name)
				.attr('class', 'item ' + icon)
				.hover(function() {
				$(this).toggleClass('hover');
				
			})
			.click(function(){

				// fade out the menu
				self.theMenu.hide();

				// call the callback function - 'this' would refer back to the jQuery object of the item element
				callback(self.theMap, self.theControl, self.clickedLatLng);

				// make sure the click doesnt take us anywhere
				return false;
			});
			//item.addClass('contextMenuItem.icon.' + icon);

		// If `loc` is a number put it at that location
		if ( typeof loc === 'number' && loc < this.theMenu.find('div').length)
			this.theMenu.find('div').eq(loc).before(item);

		// .. else appened it to the end of the menu
		else
			this.theMenu.append(item);

		// Return the whole list item
		return item;
	};

	MapMarkerContextMenu.prototype.remove = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			item.remove();

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			this.theMenu.find('div').eq(item).remove()

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			this.theMenu.find('#'+item.toCamel()).remove()
		}
	};
	
	MapMarkerContextMenu.prototype.item = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			return item;

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			return this.theMenu.find('div').eq(item);

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			return this.theMenu.find('#'+item.toCamel());
		}
	}
	
	MapMarkerContextMenu.prototype.hide = function()
	{
		var self = this;
		self.theControl = null;
		self.theMenu.hide();
	}

	// Expose this to the global object
	window.MapMarkerContextMenu = MapMarkerContextMenu;
	/**
	@constructor
	*/
	//TODO: PanoramaContextMenu
	
	function PanoramaMarkerContextMenu(panorama, div)
	{
		// A way to access 'this' object from inside functions
		var self = this;

		// Put the map onto the object
		this.theControl = null;
		this.thePanorama = panorama;
		panorama.addMenu(self);
		this.theDiv = div;

		// Keep track of where you clicked, for the callback functions.
		this.clickedLatLng = null;

		// Create the context menu element
		this.theMenu = $(document.createElement('div'))
			.attr('class', 'contextMenu')

			// .. disable the browser context menu on our context menu
			.bind('contextmenu', function() { return false; })

			// .. append a ul list element
			//.append($(document.createElement('ul')))

			// .. then append it to the map object
			.appendTo(this.theDiv);

		// Display and position the menu
		

		// Hide context menu on several events
		$.each('click pov_changed position_changed visible_changed'.split(' '), function(i,name){
			g.event.addListener(self.thePanorama, name, function()
			{
				self.theControl = null;
				self.theMenu.hide();
			});
		});
	}
	
	PanoramaMarkerContextMenu.prototype.getCurrentControl = function()
	{
		return this.theControl;
	}
	
	PanoramaMarkerContextMenu.prototype.addControl = function(control)
	{
		//alert('addControlPanorama!');
		var self = this;
		this.theControl = control;
		
		$.each('rightclick longpress'.split(' '), function(i,name)
		{
			g.event.addListener(control, name, function(e)
			{
				if (!e.latLng)
				{
					return;
				}
				self.thePanorama.hideAllMenus();
				
				self.theControl = control;
				var mapDiv = $(self.theDiv),
					menu = self.theMenu,
					x = e['pixel']['x']
					y = e['pixel']['y'];
				// Hide the context menu if its open
				//menu.hide();

				// Save the clicked location
				
				self.clickedLatLng = e.latLng;

				// Adjust the menu if clicked to close to the edge of the map
				if ( x > mapDiv.width() - menu.width() )
					x -= menu.width();

				if ( y > mapDiv.height() - menu.height() )
					y -= menu.height();

				// Set the location and fade in the context menu
				menu.css({ top: y, left: x }).fadeIn(200);
			});
		});
		
		$.each('click dragstart dragend'.split(' '), function(i,name){
			g.event.addListener(self.theControl, name, function()
			{
				self.theControl = null;
				self.theMenu.hide();
			});
		});
		
		self.theControl = null;
	}
	
	PanoramaMarkerContextMenu.prototype.addItem = function(name, loc, title, icon, callback)
	{
		// If no loc was provided
		if ( typeof loc === 'function')
		{
			callback = loc;
			loc = undefined;
		}

		// A way to access 'this' object from inside functions
		var self = this,

			// The name turned into camelCase for use in the li id, and anchor href
			idName = name.toCamel(),

			// The li element
			item = $(document.createElement('div'))
			    .attr('id', idName)
				.attr('title', title)
				.html(name)
				.attr('class', 'item ' + icon)
				.hover(function() {
				$(this).toggleClass('hover');
				
			})
			.click(function(){

				// fade out the menu
				self.theMenu.hide();

				// call the callback function - 'this' would refer back to the jQuery object of the item element
				callback(self.thePanorama, self.theControl, self.clickedLatLng);

				// make sure the click doesnt take us anywhere
				return false;
			});
			//item.addClass('contextMenuItem.icon.' + icon);
		// If `loc` is a number put it at that location
		if ( typeof loc === 'number' && loc < this.theMenu.find('div').length)
			this.theMenu.find('div').eq(loc).before(item);

		// .. else appened it to the end of the menu
		else
			this.theMenu.append(item);

		// Return the whole list item
		return item;
	};

	PanoramaMarkerContextMenu.prototype.remove = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			item.remove();

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			this.theMenu.find('div').eq(item).remove()

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			this.theMenu.find('#'+item.toCamel()).remove()
		}
	};
	
	PanoramaMarkerContextMenu.prototype.item = function(item)
	{
		// No need to search for name if its a jquery object
		if ( item instanceof $ )
			return item;

		// Find all the elements and remove the one at the specified index
		else if ( typeof item === 'number' )
			return this.theMenu.find('div').eq(item);

		// Find all the items by the id name and remove them
		else if ( typeof item === 'string' )
		{
			// Find and remove the element
			return this.theMenu.find('#'+item.toCamel());
		}
	}
	
	PanoramaMarkerContextMenu.prototype.hide = function()
	{
		var self = this;
		self.theControl = null;
		self.theMenu.hide();
	}

	// Expose this to the global object
	window.PanoramaMarkerContextMenu = PanoramaMarkerContextMenu;
	
