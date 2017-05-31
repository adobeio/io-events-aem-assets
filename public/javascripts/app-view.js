
$(function() {
	'use strict';
	
	var currentUri = null;
	var socketUrl = window.location.protocol + '//' + window.location.host;
	
	var socket = io.connect(socketUrl);
	
	socket.on('connection', function (data) {
		$('#log-list').append('<li class="list-group-item">Connected to server</li>');
		console.log(data);
	});
	
	
	var init = function(e) {			
		if(currentUri) {
			socket.removeAllListeners(currentUri);
		}
		var uri = $.urlParam('webhookUri');
		var currentUri = 'webhookEvent:' + uri;
		var webhookUrl = socketUrl + '/webhook/' + uri
		$('#log-list').prepend($('<li></li>').attr('class', 'list-group-item').html('Connected to: <a target="_blank" href="' + webhookUrl + '">' + webhookUrl + '</a>'));
		socket.on(currentUri , function(data) {
			addLog(data);
			console.log(currentUri, data);
		});
	};
	
	
	function listen(uri) {
		
	}
	
	window.toggleListItem = function(item) {
		$(item).find('.list-group-item-body').toggle();
	}
	
	function addLog(log) {
		$('#logItemTemplate').tmpl(log).prependTo('#log-list')			
	}
	
	
	if($.urlParam('webhookUri') && $.urlParam('webhookUri').length){
		init();
	}
	
	
});

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}