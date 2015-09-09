chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var QUERY_URL = "https://api.stackexchange.com/2.2/users/";
		var KEY = "ZfZ1xUSNiy6JlpzUT5*D6A(("
		var ROOT_SITES = ['mathoverflow.net', 'stackexchange.com', 'stackoverflow.com', 'stackapps.com', 'askubuntu.com', 'superuser.com', 'serverfault.com'];

		var urlParser = document.createElement('a');
		urlParser.href = window.location.origin;
		var siteName = urlParser.hostname;
		var siteNameParts = siteName.split('.');
		var siteRoot = siteNameParts[siteNameParts.length-2];
		var siteExt = siteNameParts[siteNameParts.length-1];
		var siteSub = siteNameParts.slice(0,siteNameParts.length-2).join(".");

		if (siteRoot+"."+siteExt === 'stackexchange.com') {
			siteID = siteSub;
		} else {
			siteID = siteSub+siteRoot;
		}

		if (ROOT_SITES.indexOf(siteRoot+"."+siteExt) !== -1)
		{
			$(".question .postcell .user-info .user-details").each(function () {
				var $userDetails = $(this);
				var userURL = $userDetails.find('a:first-of-type').attr('href');
				var userID = userURL.split('/')[2];

				getUserRate(userID, function (acceptRate) {
					if (acceptRate) {
						var $acceptRate = $("<p>")
							.text(acceptRate+'% accept rate')
							.css({
								color: 'hsla('+(125*acceptRate/100)+',50%,50%,1)',
								margin: 0
							})
							.appendTo($userDetails);
					}
				})
			});
		}

		function getUserRate (userID, cb) {
			$.getJSON(QUERY_URL+userID+"?site="+siteID+"&key=ZfZ1xUSNiy6JlpzUT5*D6A((", function (data) {
				if (data && data.items) {
					cb(data.items[0]['accept_rate']);
				}
			});
		}

	}
	}, 10);
});
