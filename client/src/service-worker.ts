const publicVapidKey = 'BAd0c0EeMbkgtRugho8aC6nWZH7Bv4dcOCTnKedaEuuzj9ex7M_YoD4_V7Om3lVSXHikceudmqCruGvUq6H77xI';

export async function register() : Promise<any> {
    console.log('Registering service worker');
    const registration = await navigator.serviceWorker.
        register('/notif-sw.js', { scope: '/' });
    console.log('Registered service worker');

    console.log('Registering push');
    const subscription = await registration.pushManager.
        subscribe({
            userVisibleOnly: true,
            // The `urlBase64ToUint8Array()` function is the same as in
            // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
    console.log('Registered push');

    console.log('Sending push');
    await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Sent push');
}

function urlBase64ToUint8Array(base64String: string) {
    const padding = ('=' as any).repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}