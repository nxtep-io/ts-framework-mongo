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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uZ29EYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9Nb25nb0RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFFdkQsaUNBQXFDO0FBQ3JDLGtFQUEyRDtBQVMzRDtJQU9FOzs7O09BSUc7SUFDSCxZQUFtQixVQUFnQyxFQUFFO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLG1CQUFRLGlCQUM5QyxhQUFhLEVBQUUsSUFBSSxFQUNuQixjQUFjLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixFQUNuRCxpQkFBaUIsRUFBRSxhQUFhLENBQUMsa0JBQWtCLElBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxPQUFPOztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RixDQUFDO1lBRUQsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sSUFBSSw0QkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFVBQVU7O1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25HLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLE9BQU87UUFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFzQixJQUFzQjtRQUN0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVEsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RSxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBUSxDQUFDO1FBQ2pFLENBQUM7UUFFRCxvREFBb0Q7UUFDcEQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRSxNQUFNLElBQUksNEJBQWtCLENBQUMsOEJBQThCLENBQUMsNEJBQTRCO1lBQ3RGLHFHQUFxRyxDQUFDLENBQUM7SUFDM0csQ0FBQzs7QUF2RmEsZ0NBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQzFCLG1DQUFxQixHQUFHLEVBQUUsQ0FBQztBQUwzQyxnQ0E0RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nb29zZSwgQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBEYXRhYmFzZSwgTG9nZ2VyLCBEYXRhYmFzZU9wdGlvbnMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBtYXNrQXV0aFVybCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgTW9uZ29EYXRhYmFzZUVycm9yIGZyb20gJy4vYmFzZS9Nb25nb0RhdGFiYXNlRXJyb3InO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL2Jhc2UvQmFzZU1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBNb25nb0RhdGFiYXNlT3B0aW9ucyBleHRlbmRzIERhdGFiYXNlT3B0aW9ucyB7XG4gIHVybD86IHN0cmluZztcbiAgbW9uZ29vc2U/OiBNb25nb29zZTtcbiAgbW9uZ29vc2VPcHRzPzogQ29ubmVjdGlvbk9wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmdvRGF0YWJhc2UgaW1wbGVtZW50cyBEYXRhYmFzZSB7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcbiAgcHJvdGVjdGVkIG1vbmdvb3NlOiBNb25nb29zZTtcblxuICBwdWJsaWMgc3RhdGljIFJFQ09OTkVDVF9JTlRFUlZBTCA9IDEwMDA7XG4gIHB1YmxpYyBzdGF0aWMgTUFYX1JFQ09OTkVDVF9SRVRSSUVTID0gMTA7XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBNb25nbyBEYXRhYmFzZSwgdXNpbmcgTW9uZ29vc2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZGF0YWJhc2Ugb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IE1vbmdvRGF0YWJhc2VPcHRpb25zID0ge30pIHtcbiAgICBpZiAob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGBJbml0aWFsaXppbmcgbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybChvcHRpb25zLnVybCkgfSk7XG4gICAgfVxuICAgIHRoaXMubW9uZ29vc2UgPSBvcHRpb25zLm1vbmdvb3NlIHx8IG5ldyBNb25nb29zZSh7XG4gICAgICBhdXRvUmVjb25uZWN0OiB0cnVlLFxuICAgICAgcmVjb25uZWN0VHJpZXM6IE1vbmdvRGF0YWJhc2UuTUFYX1JFQ09OTkVDVF9SRVRSSUVTLFxuICAgICAgcmVjb25uZWN0SW50ZXJ2YWw6IE1vbmdvRGF0YWJhc2UuUkVDT05ORUNUX0lOVEVSVkFMLFxuICAgICAgLi4udGhpcy5vcHRpb25zLm1vbmdvb3NlT3B0cyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgcmVtb3RlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8TW9uZ29EYXRhYmFzZU9wdGlvbnM+IHtcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBDb25uZWN0aW5nIHRvIG1vbmdvZGIgZGF0YWJhc2VgLCB7IHVybDogbWFza0F1dGhVcmwodGhpcy5vcHRpb25zLnVybCkgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMubW9uZ29vc2UuY29ubmVjdCh0aGlzLm9wdGlvbnMudXJsLCB7IHByb21pc2VMaWJyYXJ5OiBnbG9iYWwuUHJvbWlzZSB9KTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBNb25nb0RhdGFiYXNlRXJyb3IoZXhjZXB0aW9uLm1lc3NhZ2UsIGV4Y2VwdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShgU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBtb25nb2RiIGRhdGFiYXNlYCwgeyB1cmw6IG1hc2tBdXRoVXJsKHRoaXMub3B0aW9ucy51cmwpIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkaXNjb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYERpc2Nvbm5lY3RpbmcgZnJvbSBtb25nb2RiIGRhdGFiYXNlYCwgeyB1cmw6IG1hc2tBdXRoVXJsKHRoaXMub3B0aW9ucy51cmwpIH0pO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLm1vbmdvb3NlLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGRhdGFiYXNlIGlzIGNvbm5lY3RlZCBhbmQgcmVhZHkgZm9yIHRyYW5zYWN0aW9ucy5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgaXNSZWFkeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLm1vbmdvb3NlLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHJlZ2lzdGVycyBhIG1vb25nb29zZSBtb2RlbCBpbnN0YW5jZSBieSBpdHMgbmFtZSBvciBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbW9kZWwgbmFtZVxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fVxuICAgKi9cbiAgcHVibGljIG1vZGVsPFQgZXh0ZW5kcyBCYXNlTW9kZWw+KG5hbWU6IHN0cmluZyB8IFQgfCBhbnkpOiBCYXNlTW9kZWwge1xuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vbmdvb3NlLm1vZGVsKG5hbWUpIGFzIGFueTtcbiAgICB9IFxuICAgIGlmIChuYW1lLlNjaGVtYSkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBSZWdpc3RlcmluZyBtb2RlbCBpbiBkYXRhYmFzZTogJHtuYW1lLm1vZGVsTmFtZX1gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm1vbmdvb3NlLm1vZGVsKG5hbWUubW9kZWxOYW1lLCBuYW1lLlNjaGVtYSkgYXMgYW55O1xuICAgIH1cblxuICAgIC8vIFNjaGVtYSBpcyBub3QgZGVmaW5lZCwgdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG9cbiAgICBjb25zdCBuID0gbmFtZS5tb2RlbE5hbWUgPyBuYW1lLm1vZGVsTmFtZSA6IChuYW1lLm5hbWUgPyBuYW1lLm5hbWUgOiBuYW1lKTtcbiAgICB0aHJvdyBuZXcgTW9uZ29EYXRhYmFzZUVycm9yKGBDYW5ub3QgcmVnaXN0ZXIgdGhlIG1vZGVsIFwiJHtufVwiOiBTY2hlbWEgaXMgbm90IGRlZmluZWQuIGAgK1xuICAgICAgYE1ha2Ugc3VyZSB5b3UgaGF2ZSBkZWNvcmF0ZWQgdGhlIGNsYXNzIHdpdGggQE1vZGVsKG5hbWUsIHNjaGVtYSkgb3Igc2V0IHRoZSBzdGF0aWMgU2NoZW1hIHByb3BlcnR5LmApO1xuICB9XG59Il19