# NOTES

Notification.wav from Envato Elements

## Send Location Feature:

AddLocation Pin, upper right next to add Photo, opens location preview with pin user can drag and place. User hits SEND button lower right and location snapshot is sent as message just image is. Use Mapbox: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

Save Mapbox canvas as image: https://stackoverflow.com/questions/42483449/mapbox-gl-js-export-map-to-png-or-pdf

Get Mapbox Image with pin https://docs.mapbox.com/api/maps/static-images/#overlay-options

BUG: Doesn't send map image as message, fails in Chat.js (see comments)

## Listen to Audio Feature:

BUG: Doesn't render audio play button, only loading spinner, on actual mobile devices and emulators. (Works fine on Chrome DevTools > Mobile view). See AudioPlayer.js component
