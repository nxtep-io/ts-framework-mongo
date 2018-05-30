"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URI = require("urijs");
/**
 * Utility function to mask authentication from URLs.
 *
 * @param url The url to be masked
 *
 * @returns {string}
 */
function maskAuthUrl(url) {
    const uri = new URI(url);
    if (uri.password()) {
        uri.password(uri.password().split('').map(() => 'x').join(''));
    }
    return uri.toString();
}
exports.maskAuthUrl = maskAuthUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBRTdCOzs7Ozs7R0FNRztBQUNILHFCQUE0QixHQUFHO0lBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4QixDQUFDO0FBTkQsa0NBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVUkkgZnJvbSAndXJpanMnO1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gbWFzayBhdXRoZW50aWNhdGlvbiBmcm9tIFVSTHMuXG4gKlxuICogQHBhcmFtIHVybCBUaGUgdXJsIHRvIGJlIG1hc2tlZFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXNrQXV0aFVybCh1cmwpOiBzdHJpbmcge1xuICBjb25zdCB1cmkgPSBuZXcgVVJJKHVybCk7XG4gIGlmICh1cmkucGFzc3dvcmQoKSkge1xuICAgIHVyaS5wYXNzd29yZCh1cmkucGFzc3dvcmQoKS5zcGxpdCgnJykubWFwKCgpID0+ICd4Jykuam9pbignJykpO1xuICB9XG4gIHJldHVybiB1cmkudG9TdHJpbmcoKTtcbn1cbiJdfQ==