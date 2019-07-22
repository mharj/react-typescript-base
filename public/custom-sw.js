self.addEventListener('push', (event) => {
	var data = event.data.json();
	var options = {
		body: data.body,
		icon: data.icon,
		badge: data.badge,
	};
	console.log('push message:',data);
	event.waitUntil(self.registration.showNotification(data.title, options));
});
