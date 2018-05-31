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
        this.logger = this.options.logger;
        if (this.logger) {
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
    /**
     * Gets or registers a moongoose model instance by its name or definition.
     *
     * @param {string} name The model name
     *
     * @returns {any}
     */
    model(name) {
        if (typeof name === 'string') {
            return this.mongoose.model(name);
        }
        if (name.Schema) {
            if (this.logger) {
                this.logger.silly(`Registering model in database: ${name.modelName}`);
            }
            return this.mongoose.model(name.modelName, name.Schema);
        }
        // Schema is not defined, there's nothing left to do
        const n = name.modelName ? name.modelName : (name.name ? name.name : name);
        throw new MongoDatabaseError_1.default(`Cannot register the model "${n}": Schema is not defined. ` +
            `Make sure you have decorated the class with @Model(name, schema) or set the static Schema property.`);
    }
}
MongoDatabase.RECONNECT_INTERVAL = 1000;
MongoDatabase.MAX_RECONNECT_RETRIES = 10;
exports.default = MongoDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uZ29EYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9Nb25nb0RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFFdkQsaUNBQXFDO0FBQ3JDLGtFQUEyRDtBQVUzRDtJQU9FOzs7O09BSUc7SUFDSCxZQUFtQixVQUFnQyxFQUFFO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxtQkFBUSxpQkFDOUMsYUFBYSxFQUFFLElBQUksRUFDbkIsY0FBYyxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsRUFDbkQsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLGtCQUFrQixJQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFDNUIsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTzs7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGtCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUYsQ0FBQztZQUVELElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLElBQUksNEJBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFLEVBQUUsR0FBRyxFQUFFLGtCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUcsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxVQUFVOztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUNBQXFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRyxDQUFDO1lBQ0QsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDSSxPQUFPO1FBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBc0IsSUFBc0I7UUFDdEQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFRLENBQUM7UUFDMUMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDeEUsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQVEsQ0FBQztRQUNqRSxDQUFDO1FBRUQsb0RBQW9EO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0UsTUFBTSxJQUFJLDRCQUFrQixDQUFDLDhCQUE4QixDQUFDLDRCQUE0QjtZQUN0RixxR0FBcUcsQ0FBQyxDQUFDO0lBQzNHLENBQUM7O0FBeEZhLGdDQUFrQixHQUFHLElBQUksQ0FBQztBQUMxQixtQ0FBcUIsR0FBRyxFQUFFLENBQUM7QUFMM0MsZ0NBNkZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29vc2UsIENvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgRGF0YWJhc2UsIExvZ2dlciwgRGF0YWJhc2VPcHRpb25zIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgbWFza0F1dGhVcmwgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IE1vbmdvRGF0YWJhc2VFcnJvciBmcm9tICcuL2Jhc2UvTW9uZ29EYXRhYmFzZUVycm9yJztcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9iYXNlL0Jhc2VNb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9uZ29EYXRhYmFzZU9wdGlvbnMgZXh0ZW5kcyBEYXRhYmFzZU9wdGlvbnMge1xuICB1cmw/OiBzdHJpbmc7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbiAgbW9uZ29vc2U/OiBNb25nb29zZTtcbiAgbW9uZ29vc2VPcHRzPzogQ29ubmVjdGlvbk9wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmdvRGF0YWJhc2UgaW1wbGVtZW50cyBEYXRhYmFzZSB7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcbiAgcHJvdGVjdGVkIG1vbmdvb3NlOiBNb25nb29zZTtcblxuICBwdWJsaWMgc3RhdGljIFJFQ09OTkVDVF9JTlRFUlZBTCA9IDEwMDA7XG4gIHB1YmxpYyBzdGF0aWMgTUFYX1JFQ09OTkVDVF9SRVRSSUVTID0gMTA7XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBNb25nbyBEYXRhYmFzZSwgdXNpbmcgTW9uZ29vc2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZGF0YWJhc2Ugb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IE1vbmdvRGF0YWJhc2VPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMub3B0aW9ucy5sb2dnZXI7XG5cbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEluaXRpYWxpemluZyBtb25nb2RiIGRhdGFiYXNlYCwgeyB1cmw6IG1hc2tBdXRoVXJsKG9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG4gICAgdGhpcy5tb25nb29zZSA9IG9wdGlvbnMubW9uZ29vc2UgfHwgbmV3IE1vbmdvb3NlKHtcbiAgICAgIGF1dG9SZWNvbm5lY3Q6IHRydWUsXG4gICAgICByZWNvbm5lY3RUcmllczogTW9uZ29EYXRhYmFzZS5NQVhfUkVDT05ORUNUX1JFVFJJRVMsXG4gICAgICByZWNvbm5lY3RJbnRlcnZhbDogTW9uZ29EYXRhYmFzZS5SRUNPTk5FQ1RfSU5URVJWQUwsXG4gICAgICAuLi50aGlzLm9wdGlvbnMubW9uZ29vc2VPcHRzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRvIHRoZSByZW1vdGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTxNb25nb0RhdGFiYXNlT3B0aW9ucz4ge1xuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYENvbm5lY3RpbmcgdG8gbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybCh0aGlzLm9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5tb25nb29zZS5jb25uZWN0KHRoaXMub3B0aW9ucy51cmwsIHsgcHJvbWlzZUxpYnJhcnk6IGdsb2JhbC5Qcm9taXNlIH0pO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IE1vbmdvRGF0YWJhc2VFcnJvcihleGNlcHRpb24ubWVzc2FnZSwgZXhjZXB0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIG1vbmdvZGIgZGF0YWJhc2VgLCB7IHVybDogbWFza0F1dGhVcmwodGhpcy5vcHRpb25zLnVybCkgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShgRGlzY29ubmVjdGluZyBmcm9tIG1vbmdvZGIgZGF0YWJhc2VgLCB7IHVybDogbWFza0F1dGhVcmwodGhpcy5vcHRpb25zLnVybCkgfSk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMubW9uZ29vc2UuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZGF0YWJhc2UgaXMgY29ubmVjdGVkIGFuZCByZWFkeSBmb3IgdHJhbnNhY3Rpb25zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBpc1JlYWR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMubW9uZ29vc2UuY29ubmVjdGlvbi5yZWFkeVN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgb3IgcmVnaXN0ZXJzIGEgbW9vbmdvb3NlIG1vZGVsIGluc3RhbmNlIGJ5IGl0cyBuYW1lIG9yIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBtb2RlbCBuYW1lXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9XG4gICAqL1xuICBwdWJsaWMgbW9kZWw8VCBleHRlbmRzIEJhc2VNb2RlbD4obmFtZTogc3RyaW5nIHwgVCB8IGFueSk6IEJhc2VNb2RlbCB7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMubW9uZ29vc2UubW9kZWwobmFtZSkgYXMgYW55O1xuICAgIH0gXG4gICAgaWYgKG5hbWUuU2NoZW1hKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYFJlZ2lzdGVyaW5nIG1vZGVsIGluIGRhdGFiYXNlOiAke25hbWUubW9kZWxOYW1lfWApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubW9uZ29vc2UubW9kZWwobmFtZS5tb2RlbE5hbWUsIG5hbWUuU2NoZW1hKSBhcyBhbnk7XG4gICAgfVxuXG4gICAgLy8gU2NoZW1hIGlzIG5vdCBkZWZpbmVkLCB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkb1xuICAgIGNvbnN0IG4gPSBuYW1lLm1vZGVsTmFtZSA/IG5hbWUubW9kZWxOYW1lIDogKG5hbWUubmFtZSA/IG5hbWUubmFtZSA6IG5hbWUpO1xuICAgIHRocm93IG5ldyBNb25nb0RhdGFiYXNlRXJyb3IoYENhbm5vdCByZWdpc3RlciB0aGUgbW9kZWwgXCIke259XCI6IFNjaGVtYSBpcyBub3QgZGVmaW5lZC4gYCArXG4gICAgICBgTWFrZSBzdXJlIHlvdSBoYXZlIGRlY29yYXRlZCB0aGUgY2xhc3Mgd2l0aCBATW9kZWwobmFtZSwgc2NoZW1hKSBvciBzZXQgdGhlIHN0YXRpYyBTY2hlbWEgcHJvcGVydHkuYCk7XG4gIH1cbn0iXX0=