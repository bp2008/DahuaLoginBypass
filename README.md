# DahuaLoginBypass
Chrome extension that uses vulnerability [CVE-2021-33044](https://packetstormsecurity.com/files/164423/Dahua-Authentication-Bypass.html) to log in to Dahua IP cameras and VTH/VTO (video intercom) devices without authentication.

For other device types (NVR/DVR/XVR, etc), there exists [CVE-2021-33045](https://packetstormsecurity.com/files/164423/Dahua-Authentication-Bypass.html) which cannot be exploited with an ordinary web browser.

These vulnerabilities are likely to be fixed in firmware released after Sept 2021.

Credit for discovering the vulnerabilities: [bashis](https://github.com/mcw0)

## Installation

Download the `.zip` file from the [releases section](https://github.com/bp2008/DahuaLoginBypass/releases).

1. Extract the folder from this zip somewhere.
2. Go to chrome's extensions page ( `chrome://extensions` ).
3. Enable the **Developer mode** option at the top right.
4. Click **Load unpacked** and choose the DahuaLoginBypass folder you extracted.

## Usage Instructions

Go to the login page of a Dahua IP camera and click the extension's icon ( ![image](https://user-images.githubusercontent.com/5639911/136862312-eaa5845f-2ed7-4d3c-8575-431b2f46ef87.png) ) to the right of your address bar.  This should add a panel with a new button for you to use:

![image](https://user-images.githubusercontent.com/5639911/137221417-ef9fe775-44c1-4517-919f-902f3ba3eda1.png)

