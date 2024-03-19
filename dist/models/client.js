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
exports.Client = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const project_1 = require("./project");
const employee_1 = require("./employee");
let Client = class Client extends sequelize_typescript_1.Model {
};
exports.Client = Client;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Client.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User),
    __metadata("design:type", user_1.User)
], Client.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Client.prototype, "division", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Client.prototype, "details", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Client.prototype, "high_growth", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Client.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Client.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Client.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], Client.prototype, "activeDB", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => project_1.Project),
    __metadata("design:type", Array)
], Client.prototype, "projects", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => employee_1.Employee),
    __metadata("design:type", Array)
], Client.prototype, "employees", void 0);
exports.Client = Client = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'client',
        timestamps: true,
        paranoid: true,
    })
], Client);
//# sourceMappingURL=client.js.map