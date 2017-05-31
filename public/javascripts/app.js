$(function() {
	'use strict';
	
	var currentUri = null;
	var socketUrl = window.location.protocol + '//' + window.location.host;
	var socket;
    
    /* please update this to your own slack webhook incoming url
    and the appropriate slack channel */
    var slackWebhook = "https://hooks.slack.com/services/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";
    var slackChannel = "general";
	
	$('#connectForm').submit(function(e) {
		e.preventDefault();
		if(currentUri) {
			socket.removeAllListeners(currentUri);
		}	
		socket = io.connect(socketUrl);		
		socket.on('connection', function (data) {
			$('#log-list').append('<li class="list-group-item">Connected to server</li>');
			console.log(data);
		});
		
		var uri = $('#webhookUri').val().trim();				
		
		var currentUri = uri === '*' ? 'webhookEvent:all' : 'webhookEvent:' + uri;				
		
		var webhookUrl = socketUrl + '/webhook/' + uri
		$('#log-list').prepend($('<li></li>').attr('class', 'list-group-item').html('Connected to: <a target="_blank" href="' + webhookUrl + '">' + webhookUrl + '</a>'));
		
		socket.on(currentUri , function(event, data) {
			addLog(event);
			console.log(currentUri, event, data);
            
            postToSlack(event.body.asset);
		});
				
	});
	
	
	function listen(uri) {
		
	}
	
	window.toggleListItem = function(item) {
		$(item).next('.list-group-item-body').toggle();
	}
	
	function addLog(log) {
		$('#logItemTemplate').tmpl(log).prependTo('#log-list')			
	}
    
    /*
	 * post message to Slack
	 */
    function postToSlack(asset){
		// format payload for slack
		var message = formatForSlack(asset, slackChannel);

		$.ajax({
			url: slackWebhook,
			type: 'POST',
			processData: true,
			data : message ,
            // result will show on console
			success : function(data) {
				console.log("SUCCESS: " + data);
			},
			error: function(data){
				console.log("ERROR: " + data);
			}
		});
	}
    
    /*
	 * format message for slack
	 */
	function formatForSlack(asset, chan){

		var url = asset.url;
		var filename = url.substr(url.lastIndexOf('/') + 1);
		var path = url.replace( new RegExp(filename), '' );

        // formatting the url, filename and path
		filename = decodeURIComponent(filename);
		url = url.replace("/content/dam/","/assetdetails.html/content/dam/");
		path = path.replace("/content/dam/","/assets.html/content/dam/");

		var importantPath = "important";
        
        var attachments_color_green = "#008000";
        var attachments_color_red = "#FF0000";
        var attachments_text = filename + " has been " + asset.type + " by " + asset.user_id +". \nSee asset: <" + url + ">";
        
        var payload = {
				"channel":chan,
				"username":"incoming-webhook",
				"mrkdwn": true,
				"attachments": [
					{
						"text": attachments_text,
						"fallback": "You are unable to see the asset at the moment",
						"color": attachments_color_green,
						"attachment_type": "default"
					}
				]
			};
        
        // set color to red for delete events
		if (!(asset.type == "created" || asset.type == "modified")) {
            payload.attachments[0].color = attachments_color_red;
            // special format for files deleted from the importantPath
			if (asset.pathname.includes(importantPath)) {
                payload.attachments[0].text = ":exclamation::exclamation:" + "file removed from the /important directory\n" + filename + " has been " + asset.type + " by " + asset.user_id + ". \nGo to directory: <" + path + ">";
			} else {
                payload.attachments[0].text = filename + " has been " + asset.type +  " by " + asset.user_id + ". \nGo to directory: <" + path + ">";
			}
		}
        
		// return json string of payload
		return JSON.stringify(payload)
	}
	
});