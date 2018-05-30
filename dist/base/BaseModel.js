"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class BaseModel extends mongoose_1.Model {
    /**
     * Cleans the mongoose document for a JSON output, such as in RESTful APIs.
     */
    toJSON() {
        const json = super.toObject();
        if (json._id) {
            json.id = json._id;
            delete json._id;
        }
        if (json.hasOwnProperty('__v')) {
            delete json.__v;
        }
        return json;
    }
}
exports.default = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Jhc2UvQmFzZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWlDO0FBRWpDLGVBQXdDLFNBQVEsZ0JBQUs7SUFFbkQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBaEJELDRCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG5cbiAgLyoqXG4gICAqIENsZWFucyB0aGUgbW9uZ29vc2UgZG9jdW1lbnQgZm9yIGEgSlNPTiBvdXRwdXQsIHN1Y2ggYXMgaW4gUkVTVGZ1bCBBUElzLlxuICAgKi9cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IGpzb24gPSBzdXBlci50b09iamVjdCgpO1xuICAgIGlmIChqc29uLl9pZCkge1xuICAgICAganNvbi5pZCA9IGpzb24uX2lkO1xuICAgICAgZGVsZXRlIGpzb24uX2lkO1xuICAgIH1cbiAgICBpZiAoanNvbi5oYXNPd25Qcm9wZXJ0eSgnX192JykpIHtcbiAgICAgIGRlbGV0ZSBqc29uLl9fdjtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn0iXX0=