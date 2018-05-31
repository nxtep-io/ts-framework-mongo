"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./common"));
__export(require("./decorators"));
var mongoose_1 = require("mongoose");
exports.BaseSchema = mongoose_1.Schema;
var BaseModel_1 = require("./base/BaseModel");
exports.BaseModel = BaseModel_1.default;
var MongoDatabaseError_1 = require("./base/MongoDatabaseError");
exports.MongoDatabaseError = MongoDatabaseError_1.default;
var MongoDatabase_1 = require("./MongoDatabase");
exports.MongoDatabase = MongoDatabase_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4QkFBeUI7QUFDekIsa0NBQTZCO0FBQzdCLHFDQUFnRDtBQUF2QyxnQ0FBQSxNQUFNLENBQWM7QUFDN0IsOENBQXdEO0FBQS9DLGdDQUFBLE9BQU8sQ0FBYTtBQUM3QixnRUFBMEU7QUFBakUsa0RBQUEsT0FBTyxDQUFzQjtBQUN0QyxpREFBaUY7QUFBeEUsd0NBQUEsT0FBTyxDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vZGVjb3JhdG9ycyc7XG5leHBvcnQgeyBTY2hlbWEgYXMgQmFzZVNjaGVtYSB9IGZyb20gJ21vbmdvb3NlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQmFzZU1vZGVsIH0gZnJvbSAnLi9iYXNlL0Jhc2VNb2RlbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1vbmdvRGF0YWJhc2VFcnJvciB9IGZyb20gJy4vYmFzZS9Nb25nb0RhdGFiYXNlRXJyb3InO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNb25nb0RhdGFiYXNlLCBNb25nb0RhdGFiYXNlT3B0aW9ucyB9IGZyb20gJy4vTW9uZ29EYXRhYmFzZSc7Il19