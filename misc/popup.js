////function SelectText(node)
////{
////	node = document.getElementById(node);

////	if (document.body.createTextRange)
////	{
////		const range = document.body.createTextRange();
////		range.moveToElementText(node);
////		range.select();
////	}
////	else if (window.getSelection)
////	{
////		const selection = window.getSelection();
////		const range = document.createRange();
////		range.selectNodeContents(node);
////		selection.removeAllRanges();
////		selection.addRange(range);
////	}
////	else
////	{
////		console.warn("Could not select text in node: Unsupported browser.");
////	}
////}
////function CopyToClipboard(str)
////{
////	const el = document.createElement('textarea');
////	el.value = str;
////	document.body.appendChild(el);
////	el.select();
////	document.execCommand('copy');
////	document.body.removeChild(el);
////}

////// Perform setup activities

////var ele_getLink = document.getElementById("getLink");
////var ele_myLink = document.getElementById("myLink");
////var ele_copied = document.getElementById("copied");
////var ele_copyAutomatically = document.getElementById("copyAutomatically");

////ele_copyAutomatically.addEventListener("change", function (e)
////{
////	chrome.storage.sync.set({ copyAutomatically: e.target.checked });
////});
////chrome.storage.sync.get(['copyAutomatically'], function (result)
////{
////	ele_copyAutomatically.checked = result.copyAutomatically;
////});

////chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs)
////{
////	var url = tabs[0].url;
////	var m = url.match(/\/(?:dp|gp\/product)\/([^\/?#]+)/i);
////	if (!m)
////	{
////		console.log("Unexpected product URL format", url);
////		ele_myLink.innerText = "URL not recognized as an Amazon product.";
////		ele_getLink.style.display = "none";
////		return;
////	}
////	var asin = m[1];
////	var link = "http://amzn.com/dp/" + asin;
////	var doCopy = function ()
////	{
////		CopyToClipboard(link);
////		ele_copied.style.display = "inline";
////	};
////	ele_getLink.addEventListener("click", doCopy);

////	ele_myLink.innerText = link;
////	SelectText("myLink");

////	chrome.storage.sync.get(['copyAutomatically'], function (result)
////	{
////		if (result.copyAutomatically)
////			doCopy();
////	});
////});

function loginBypass()
{
	console.log("[B] I'm running at " + location.href);
}


chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) =>
{
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: loginBypass,
	});
});
