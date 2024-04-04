"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opening = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const employee_1 = require("./employee");
const employeeOpening_1 = require("./employeeOpening");
const jobPosition_1 = require("./jobPosition");
const enums_1 = require("./enums");
let Opening = class Opening extends sequelize_typescript_1.Model {
};
exports.Opening = Opening;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(enums_1.Status))),
    __metadata("design:type", String)
], Opening.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Opening.prototype, "status_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Opening.prototype, "reason_current_status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => jobPosition_1.JobPosition),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Opening.prototype, "owner_jobPosition_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => jobPosition_1.JobPosition),
    __metadata("design:type", jobPosition_1.JobPosition)
], Opening.prototype, "owner_jobPosition", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Opening.prototype, "open_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Opening.prototype, "close_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Opening.prototype, "close_reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Opening.prototype, "hours_required", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Opening.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Opening.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Opening.prototype, "DeletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], Opening.prototype, "activeDB", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => employee_1.Employee, () => employeeOpening_1.EmployeeOpening),
    __metadata("design:type", Array)
], Opening.prototype, "employees", void 0);
exports.Opening = Opening = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "opening",
        timestamps: true,
        paranoid: true,
    })
], Opening);
//# sourceMappingURL=opening.js.map