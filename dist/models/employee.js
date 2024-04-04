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
exports.Employee = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const opening_1 = require("./opening");
const employeeOpening_1 = require("./employeeOpening");
const enums_1 = require("./enums");
const candidate_1 = require("./candidate");
const bench_1 = require("./bench");
const billing_1 = require("./billing");
let Employee = class Employee extends sequelize_typescript_1.Model {
};
exports.Employee = Employee;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => candidate_1.Candidate),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Employee.prototype, "candidateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => candidate_1.Candidate),
    __metadata("design:type", candidate_1.Candidate)
], Employee.prototype, "candidateInformation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(enums_1.EmployeeStatus))),
    __metadata("design:type", String)
], Employee.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Employee.prototype, "reason_current_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Employee.prototype, "status_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Employee.prototype, "salary", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Employee.prototype, "job_title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Employee.prototype, "job_grade", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Employee.prototype, "joining_date", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Employee.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Employee.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Employee.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], Employee.prototype, "activeDB", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => opening_1.Opening, () => employeeOpening_1.EmployeeOpening),
    __metadata("design:type", Array)
], Employee.prototype, "openings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => bench_1.Bench),
    __metadata("design:type", bench_1.Bench)
], Employee.prototype, "benchInformation", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => billing_1.Billing),
    __metadata("design:type", billing_1.Billing)
], Employee.prototype, "billingInformation", void 0);
exports.Employee = Employee = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'employee',
        timestamps: true,
        paranoid: true,
    })
], Employee);
//# sourceMappingURL=employee.js.map