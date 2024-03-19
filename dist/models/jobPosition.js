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
exports.JobPosition = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
//import { Opening } from "./opening";
//import { Project } from "./project";
// Asumiendo que Exclusivity y DemandCuration son enums o tipos definidos anteriormente
var Exclusivity;
(function (Exclusivity) {
    Exclusivity["Committed"] = "Committed";
    Exclusivity["NonCommitted"] = "NonCommitted";
})(Exclusivity || (Exclusivity = {}));
var DemandCuration;
(function (DemandCuration) {
    DemandCuration["Strategic"] = "Strategic";
    DemandCuration["Committed"] = "Committed";
    DemandCuration["Open"] = "Open";
})(DemandCuration || (DemandCuration = {}));
let JobPosition = class JobPosition extends sequelize_typescript_1.Model {
};
exports.JobPosition = JobPosition;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], JobPosition.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], JobPosition.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT, allowNull: false }),
    __metadata("design:type", Number)
], JobPosition.prototype, "bill_rate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], JobPosition.prototype, "posting_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], JobPosition.prototype, "division", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING), allowNull: true }),
    __metadata("design:type", Array)
], JobPosition.prototype, "skills_position", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], JobPosition.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(Exclusivity)),
        allowNull: false,
    }),
    __metadata("design:type", String)
], JobPosition.prototype, "exclusivity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(DemandCuration)),
        allowNull: false,
    }),
    __metadata("design:type", String)
], JobPosition.prototype, "demand_curation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false }),
    __metadata("design:type", Boolean)
], JobPosition.prototype, "cross_division", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], JobPosition.prototype, "image_url", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], JobPosition.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], JobPosition.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], JobPosition.prototype, "DeletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], JobPosition.prototype, "activeDB", void 0);
exports.JobPosition = JobPosition = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "job_position",
        timestamps: true,
        paranoid: true,
    })
], JobPosition);
//# sourceMappingURL=jobPosition.js.map