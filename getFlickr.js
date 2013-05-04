// Here's my data model
var ViewModel = function(first) {
	var self = this;
	this.navBar = ko.observableArray([ { text: first, parent: self } ] );
    this.search = ko.observable(first);
    this.title = ko.observable( '' );
    this.shownImg = ko.observable('');
    this.cats = [];
    this.catIndex = ko.observable(0); 
    this.search.subscribe( function(v){ 
    									if ( self.navBar().filter( function(i) { return i.text == v } ).length == 0 )
    										self.navBar.push({ parent: self, text: v } );
    									self.cats = [];
    									self.getJSON();	
    								  } );
 
    this.update = function (v)
    	{
    	this.search( v.text )	
    	}.bind(this)

    this.getJSON = function getJSON()
    	{
    		if ( this.cats.length && this.catIndex() != this.cats.length - 1 )
				{
				this.catIndex( this.catIndex() + 1 );	
				this.title( this.cats[ this.catIndex() ].title );
				this.shownImg( this.cats[ this.catIndex() ].media.m );
				}
    		else
    			{ 
    			$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+this.search() + "&tagmode=any&format=json&jsoncallback=?", function(data) { 
	    		   	// alert(data)
	    		   	this.cats = data.items;
	    		   	if ( data.items && data.items[0] )
    		   			{
		   					this.title( data.items[0].title );
			    			this.shownImg( data.items[0].media.m );
    		   			}
		   			else
	   					{
   							this.title('No results!');
   							this.shownImg('fail');
	   					}
   					this.catIndex(0);
					}.bind(this));
    			}
    	}.bind(this);
};
 
ko.applyBindings(new ViewModel('')); // This makes Knockout get to work