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
exports.Project = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const client_1 = require("./client");
const user_1 = require("./user");
const jobPosition_1 = require("./jobPosition");
let Project = class Project extends sequelize_typescript_1.Model {
};
exports.Project = Project;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Project.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), defaultValue: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "revenue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Project.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Project.prototype, "posting_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Project.prototype, "exp_closure_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Project.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Project.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], Project.prototype, "activeDB", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Project.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User),
    __metadata("design:type", user_1.User)
], Project.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => client_1.Client),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Project.prototype, "client_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => client_1.Client),
    __metadata("design:type", client_1.Client)
], Project.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => jobPosition_1.JobPosition),
    __metadata("design:type", Array)
], Project.prototype, "job_positions", void 0);
exports.Project = Project = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "project",
        timestamps: true,
        paranoid: true,
    })
], Project);
//# sourceMappingURL=project.js.map