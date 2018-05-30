"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./common"));
var mongoose_1 = require("mongoose");
exports.BaseSchema = mongoose_1.Schema;
var BaseModel_1 = require("./base/BaseModel");
exports.BaseModel = BaseModel_1.default;
var MongoDatabaseError_1 = require("./base/MongoDatabaseError");
exports.MongoDatabaseError = MongoDatabaseError_1.default;
var MongoDatabase_1 = require("./MongoDatabase");
exports.MongoDatabase = MongoDatabase_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4QkFBeUI7QUFDekIscUNBQWdEO0FBQXZDLGdDQUFBLE1BQU0sQ0FBYztBQUM3Qiw4Q0FBd0Q7QUFBL0MsZ0NBQUEsT0FBTyxDQUFhO0FBQzdCLGdFQUEwRTtBQUFqRSxrREFBQSxPQUFPLENBQXNCO0FBQ3RDLGlEQUEyRDtBQUFsRCx3Q0FBQSxPQUFPLENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9jb21tb24nO1xuZXhwb3J0IHsgU2NoZW1hIGFzIEJhc2VTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJhc2VNb2RlbCB9IGZyb20gJy4vYmFzZS9CYXNlTW9kZWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNb25nb0RhdGFiYXNlRXJyb3IgfSBmcm9tICcuL2Jhc2UvTW9uZ29EYXRhYmFzZUVycm9yJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9uZ29EYXRhYmFzZSB9IGZyb20gJy4vTW9uZ29EYXRhYmFzZSc7Il19