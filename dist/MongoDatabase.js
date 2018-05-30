"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const util_1 = require("./util");
const MongoDatabaseError_1 = require("./base/MongoDatabaseError");
class MongoDatabase {
    /**
     * Instantiates a new Mongo Database, using Mongoose.
     *
     * @param options The database options
     */
    constructor(options = {}) {
        this.options = options;
        if (options.logger) {
            this.logger = options.logger;
            this.logger.info(`Initializing mongodb database`, { url: util_1.maskAuthUrl(options.url) });
        }
        this.mongoose = options.mongoose || new mongoose_1.Mongoose(Object.assign({ autoReconnect: true, reconnectTries: MongoDatabase.MAX_RECONNECT_RETRIES, reconnectInterval: MongoDatabase.RECONNECT_INTERVAL }, this.options.mongooseOpts));
    }
    /**
     * Connects to the remote database.
     *
     * @returns {Promise<void>}
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logger) {
                this.logger.silly(`Connecting to mongodb database`, { url: util_1.maskAuthUrl(this.options.url) });
            }
            try {
                yield this.mongoose.connect(this.options.url, { promiseLibrary: global.Promise });
            }
            catch (exception) {
                throw new MongoDatabaseError_1.default(exception.message, exception);
            }
            if (this.logger) {
                this.logger.silly(`Successfully connected to mongodb database`, { url: util_1.maskAuthUrl(this.options.url) });
            }
            return this.options;
        });
    }
    /**
     * Disconnects the database.
     *
     * @returns {Promise<void>}
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logger) {
                this.logger.silly(`Disconnecting from mongodb database`, { url: util_1.maskAuthUrl(this.options.url) });
            }
            yield this.mongoose.disconnect();
        });
    }
    /**
     * Checks if the database is connected and ready for transactions.
     *
     * @returns {boolean}
     */
    isReady() {
        return !!this.mongoose.connection.readyState;
    }
}
MongoDatabase.RECONNECT_INTERVAL = 1000;
MongoDatabase.MAX_RECONNECT_RETRIES = 10;
exports.default = MongoDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uZ29EYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9Nb25nb0RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFFdkQsaUNBQXFDO0FBQ3JDLGtFQUEyRDtBQVEzRDtJQU9FOzs7O09BSUc7SUFDSCxZQUFtQixVQUFnQyxFQUFFO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLG1CQUFRLGlCQUM5QyxhQUFhLEVBQUUsSUFBSSxFQUNuQixjQUFjLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixFQUNuRCxpQkFBaUIsRUFBRSxhQUFhLENBQUMsa0JBQWtCLElBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxPQUFPOztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RixDQUFDO1lBRUQsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sSUFBSSw0QkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFVBQVU7O1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25HLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLE9BQU87UUFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUMvQyxDQUFDOztBQS9EYSxnQ0FBa0IsR0FBRyxJQUFJLENBQUM7QUFDMUIsbUNBQXFCLEdBQUcsRUFBRSxDQUFDO0FBTDNDLGdDQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvb3NlLCBDb25uZWN0aW9uT3B0aW9ucyB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IERhdGFiYXNlLCBMb2dnZXIsIERhdGFiYXNlT3B0aW9ucyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IG1hc2tBdXRoVXJsIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBNb25nb0RhdGFiYXNlRXJyb3IgZnJvbSAnLi9iYXNlL01vbmdvRGF0YWJhc2VFcnJvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9uZ29EYXRhYmFzZU9wdGlvbnMgZXh0ZW5kcyBEYXRhYmFzZU9wdGlvbnMge1xuICB1cmw/OiBzdHJpbmc7XG4gIG1vbmdvb3NlPzogTW9uZ29vc2U7XG4gIG1vbmdvb3NlT3B0cz86IENvbm5lY3Rpb25PcHRpb25zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25nb0RhdGFiYXNlIGltcGxlbWVudHMgRGF0YWJhc2Uge1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG4gIHByb3RlY3RlZCBtb25nb29zZTogTW9uZ29vc2U7XG5cbiAgcHVibGljIHN0YXRpYyBSRUNPTk5FQ1RfSU5URVJWQUwgPSAxMDAwO1xuICBwdWJsaWMgc3RhdGljIE1BWF9SRUNPTk5FQ1RfUkVUUklFUyA9IDEwO1xuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZXMgYSBuZXcgTW9uZ28gRGF0YWJhc2UsIHVzaW5nIE1vbmdvb3NlLlxuICAgKiBcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGRhdGFiYXNlIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBNb25nb0RhdGFiYXNlT3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgSW5pdGlhbGl6aW5nIG1vbmdvZGIgZGF0YWJhc2VgLCB7IHVybDogbWFza0F1dGhVcmwob3B0aW9ucy51cmwpIH0pO1xuICAgIH1cbiAgICB0aGlzLm1vbmdvb3NlID0gb3B0aW9ucy5tb25nb29zZSB8fCBuZXcgTW9uZ29vc2Uoe1xuICAgICAgYXV0b1JlY29ubmVjdDogdHJ1ZSxcbiAgICAgIHJlY29ubmVjdFRyaWVzOiBNb25nb0RhdGFiYXNlLk1BWF9SRUNPTk5FQ1RfUkVUUklFUyxcbiAgICAgIHJlY29ubmVjdEludGVydmFsOiBNb25nb0RhdGFiYXNlLlJFQ09OTkVDVF9JTlRFUlZBTCxcbiAgICAgIC4uLnRoaXMub3B0aW9ucy5tb25nb29zZU9wdHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdHMgdG8gdGhlIHJlbW90ZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPE1vbmdvRGF0YWJhc2VPcHRpb25zPiB7XG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShgQ29ubmVjdGluZyB0byBtb25nb2RiIGRhdGFiYXNlYCwgeyB1cmw6IG1hc2tBdXRoVXJsKHRoaXMub3B0aW9ucy51cmwpIH0pO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLm1vbmdvb3NlLmNvbm5lY3QodGhpcy5vcHRpb25zLnVybCwgeyBwcm9taXNlTGlicmFyeTogZ2xvYmFsLlByb21pc2UgfSk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgTW9uZ29EYXRhYmFzZUVycm9yKGV4Y2VwdGlvbi5tZXNzYWdlLCBleGNlcHRpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYFN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybCh0aGlzLm9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBEaXNjb25uZWN0aW5nIGZyb20gbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybCh0aGlzLm9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5tb25nb29zZS5kaXNjb25uZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBkYXRhYmFzZSBpcyBjb25uZWN0ZWQgYW5kIHJlYWR5IGZvciB0cmFuc2FjdGlvbnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIGlzUmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5tb25nb29zZS5jb25uZWN0aW9uLnJlYWR5U3RhdGU7XG4gIH1cbn0iXX0=