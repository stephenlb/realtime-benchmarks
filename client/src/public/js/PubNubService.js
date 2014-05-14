// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// PubNub Global RTN (Real Time Network) - Realtime IoT/Mobile/Web
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// 
// Phil Leggetter Super Benchmark Test of Excellence and Awesome
// 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function PubNubService() {
    BenchmarkService.apply( this, arguments );

    // This is PubNub so Let's get Started with Initialization
    var self    = this;
    self.name   = 'PubNub';
    self.pubnub = PUBNUB({
        publish_key   : 'pub-a1c89fc1-c4a0-4ac9-a784-d42824e1c0eb',
        subscribe_key : 'sub-be77f868-1ee3-11e2-b53c-85075d7b5343'
    });

    // Start Connection
    self.pubnub.subscribe({
        channel    : self._channelName,
        message    : function(msg) { self._onMessage(msg) },
        connect    : function()    { self._onReady() },
        disconnect : function()    { self._log("Connection Done.") },
        reconnect  : function()    { self._log("And we're Back!") }
    });
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Inherit BenchmarkService's Methods
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PubNubService.prototype = new BenchmarkService;

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Send Message
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PubNubService.prototype.send = function( data ) {
    this.pubnub.publish({
        channel : this._channelName,
        message : data
    });
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Disconnect
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PubNubService.prototype.disconnect = function( data ) {
    this.pubnub.unsubscribe({ channel : this._channelName });
};
