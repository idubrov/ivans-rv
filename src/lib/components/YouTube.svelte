<script lang="ts">
	export let width = '720';
	export let height = '540';
	export let video: string;
	export let title: string;
</script>

<iframe
	credentialless
	allowfullscreen
	referrerpolicy="no-referrer"
	sandbox="allow-scripts allow-same-origin"
	allow="accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; browsing-topics 'none'; camera 'none'; display-capture 'none'; domain-agent 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport ''; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; usb 'none'; window-management 'none'; xr-spatial-tracking 'none'",
	csp="sandbox allow-scripts allow-same-origin;"
	{width}
	{height}
	{title}
	src="https://www.youtube-nocookie.com/embed/{video}"
	frameborder="0"
	loading="lazy"
></iframe>