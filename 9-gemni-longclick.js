function LongClick(draggable, length) {

    this.length_ = length;

    this.draggable_ = draggable;
    
    var me = this;

    google.maps.event.addListener(draggable, 'mousedown', function(e) { me.onMouseDown_(e) });

    google.maps.event.addListener(draggable, 'click', function(e) { me.onMouseUp_(e) });
    
    google.maps.event.addListener(draggable, 'dragstart', function(e) { me.onDragStart_(e) });

  }

  LongClick.prototype.onMouseUp_ = function(e) {

    var now = +new Date;
	//alert('longclick-mouseup');
    if (this.valid_ && (now - this.down_ > this.length_)) {
	
      google.maps.event.trigger(this.draggable_, 'longpress', e);
      //e.stop();
    }

  }

  LongClick.prototype.onMouseDown_ = function(e) {
	//alert('longclick-mousedown');
    this.down_ = +new Date;
	this.valid_ = true;
  }
  
  LongClick.prototype.onDragStart_ = function(e) {
	//alert('longclick-dragstart');
    this.valid_ = false;

    }
