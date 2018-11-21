(function(){
	if (document.location.pathname == '/rebooking/mobile/auth') return false;

	var useGTMProxy = true;

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

	function cookie(name) {return(document.cookie.match('(^|; )'+name+'=([^;]*)')||0)[2];}

	useGTMProxy = cookie('gtm_noproxy')=='1' ? false : useGTMProxy;
	function callGTM(id, proxy) {
		var f = document.getElementsByTagName('script')[0];
		var j = document.createElement('script');
		j.defer = true;
		j.src =  proxy ? '//pulse.flixbus.com/static/'+id+'.js' : '//www.googletagmanager.com/gtm.js?id=GTM-'+id;
		f.parentNode.insertBefore(j,f);
	}
        callGTM('QFH9M', useGTMProxy); // Google Analytics Container
        callGTM('W6FDFB', useGTMProxy); // WebTrekk Container
})();
