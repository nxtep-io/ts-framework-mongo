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
                yield this.mongoose.connect(this.options.url, Object.assign({ promiseLibrary: global.Promise }, this.options.connectionOpts));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uZ29EYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9Nb25nb0RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFFdkQsaUNBQXFDO0FBQ3JDLGtFQUEyRDtBQVczRDtJQU9FOzs7O09BSUc7SUFDSCxZQUFtQixVQUFnQyxFQUFFO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxtQkFBUSxpQkFDOUMsYUFBYSxFQUFFLElBQUksRUFDbkIsY0FBYyxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsRUFDbkQsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLGtCQUFrQixJQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFDNUIsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTzs7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGtCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUYsQ0FBQztZQUVELElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxrQkFDMUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUM5QixDQUFDO1lBQ0wsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sSUFBSSw0QkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFVBQVU7O1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25HLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLE9BQU87UUFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFzQixJQUFzQjtRQUN0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVEsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RSxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBUSxDQUFDO1FBQ2pFLENBQUM7UUFFRCxvREFBb0Q7UUFDcEQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRSxNQUFNLElBQUksNEJBQWtCLENBQUMsOEJBQThCLENBQUMsNEJBQTRCO1lBQ3RGLHFHQUFxRyxDQUFDLENBQUM7SUFDM0csQ0FBQzs7QUEzRmEsZ0NBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQzFCLG1DQUFxQixHQUFHLEVBQUUsQ0FBQztBQUwzQyxnQ0FnR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nb29zZSwgQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBEYXRhYmFzZSwgTG9nZ2VyLCBEYXRhYmFzZU9wdGlvbnMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBtYXNrQXV0aFVybCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgTW9uZ29EYXRhYmFzZUVycm9yIGZyb20gJy4vYmFzZS9Nb25nb0RhdGFiYXNlRXJyb3InO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL2Jhc2UvQmFzZU1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBNb25nb0RhdGFiYXNlT3B0aW9ucyBleHRlbmRzIERhdGFiYXNlT3B0aW9ucyB7XG4gIHVybD86IHN0cmluZztcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICBtb25nb29zZT86IE1vbmdvb3NlO1xuICBtb25nb29zZU9wdHM/OiBhbnk7XG4gIGNvbm5lY3Rpb25PcHRzPzogQ29ubmVjdGlvbk9wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmdvRGF0YWJhc2UgaW1wbGVtZW50cyBEYXRhYmFzZSB7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcbiAgcHJvdGVjdGVkIG1vbmdvb3NlOiBNb25nb29zZTtcblxuICBwdWJsaWMgc3RhdGljIFJFQ09OTkVDVF9JTlRFUlZBTCA9IDEwMDA7XG4gIHB1YmxpYyBzdGF0aWMgTUFYX1JFQ09OTkVDVF9SRVRSSUVTID0gMTA7XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBNb25nbyBEYXRhYmFzZSwgdXNpbmcgTW9uZ29vc2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZGF0YWJhc2Ugb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IE1vbmdvRGF0YWJhc2VPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMub3B0aW9ucy5sb2dnZXI7XG5cbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEluaXRpYWxpemluZyBtb25nb2RiIGRhdGFiYXNlYCwgeyB1cmw6IG1hc2tBdXRoVXJsKG9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG4gICAgdGhpcy5tb25nb29zZSA9IG9wdGlvbnMubW9uZ29vc2UgfHwgbmV3IE1vbmdvb3NlKHtcbiAgICAgIGF1dG9SZWNvbm5lY3Q6IHRydWUsXG4gICAgICByZWNvbm5lY3RUcmllczogTW9uZ29EYXRhYmFzZS5NQVhfUkVDT05ORUNUX1JFVFJJRVMsXG4gICAgICByZWNvbm5lY3RJbnRlcnZhbDogTW9uZ29EYXRhYmFzZS5SRUNPTk5FQ1RfSU5URVJWQUwsXG4gICAgICAuLi50aGlzLm9wdGlvbnMubW9uZ29vc2VPcHRzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRvIHRoZSByZW1vdGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTxNb25nb0RhdGFiYXNlT3B0aW9ucz4ge1xuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYENvbm5lY3RpbmcgdG8gbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybCh0aGlzLm9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5tb25nb29zZS5jb25uZWN0KHRoaXMub3B0aW9ucy51cmwsIHsgXG4gICAgICAgIHByb21pc2VMaWJyYXJ5OiBnbG9iYWwuUHJvbWlzZSxcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLmNvbm5lY3Rpb25PcHRzLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgTW9uZ29EYXRhYmFzZUVycm9yKGV4Y2VwdGlvbi5tZXNzYWdlLCBleGNlcHRpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYFN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybCh0aGlzLm9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBEaXNjb25uZWN0aW5nIGZyb20gbW9uZ29kYiBkYXRhYmFzZWAsIHsgdXJsOiBtYXNrQXV0aFVybCh0aGlzLm9wdGlvbnMudXJsKSB9KTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5tb25nb29zZS5kaXNjb25uZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBkYXRhYmFzZSBpcyBjb25uZWN0ZWQgYW5kIHJlYWR5IGZvciB0cmFuc2FjdGlvbnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIGlzUmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5tb25nb29zZS5jb25uZWN0aW9uLnJlYWR5U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBvciByZWdpc3RlcnMgYSBtb29uZ29vc2UgbW9kZWwgaW5zdGFuY2UgYnkgaXRzIG5hbWUgb3IgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG1vZGVsIG5hbWVcbiAgICpcbiAgICogQHJldHVybnMge2FueX1cbiAgICovXG4gIHB1YmxpYyBtb2RlbDxUIGV4dGVuZHMgQmFzZU1vZGVsPihuYW1lOiBzdHJpbmcgfCBUIHwgYW55KTogQmFzZU1vZGVsIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb25nb29zZS5tb2RlbChuYW1lKSBhcyBhbnk7XG4gICAgfSBcbiAgICBpZiAobmFtZS5TY2hlbWEpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5zaWxseShgUmVnaXN0ZXJpbmcgbW9kZWwgaW4gZGF0YWJhc2U6ICR7bmFtZS5tb2RlbE5hbWV9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5tb25nb29zZS5tb2RlbChuYW1lLm1vZGVsTmFtZSwgbmFtZS5TY2hlbWEpIGFzIGFueTtcbiAgICB9XG5cbiAgICAvLyBTY2hlbWEgaXMgbm90IGRlZmluZWQsIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIGRvXG4gICAgY29uc3QgbiA9IG5hbWUubW9kZWxOYW1lID8gbmFtZS5tb2RlbE5hbWUgOiAobmFtZS5uYW1lID8gbmFtZS5uYW1lIDogbmFtZSk7XG4gICAgdGhyb3cgbmV3IE1vbmdvRGF0YWJhc2VFcnJvcihgQ2Fubm90IHJlZ2lzdGVyIHRoZSBtb2RlbCBcIiR7bn1cIjogU2NoZW1hIGlzIG5vdCBkZWZpbmVkLiBgICtcbiAgICAgIGBNYWtlIHN1cmUgeW91IGhhdmUgZGVjb3JhdGVkIHRoZSBjbGFzcyB3aXRoIEBNb2RlbChuYW1lLCBzY2hlbWEpIG9yIHNldCB0aGUgc3RhdGljIFNjaGVtYSBwcm9wZXJ0eS5gKTtcbiAgfVxufSJdfQ==