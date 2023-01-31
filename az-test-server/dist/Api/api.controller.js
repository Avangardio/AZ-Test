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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const crypto_1 = require("crypto");
const NumberJoi_1 = require("../Pipes/Jois/NumberJoi");
const joiValidationPipe_1 = require("../Pipes/joiValidationPipe");
const PostsJoi_1 = require("../Pipes/Jois/PostsJoi");
let ApiController = class ApiController {
    constructor(appService) {
        this.appService = appService;
    }
    login_controller(request, response) {
        if (!request.cookies.account) {
            const uuid = (0, crypto_1.randomUUID)();
            response.cookie('account', uuid, {
                expires: new Date(Date.now() + (150 * 24 * 60 * 60 * 1000)),
                httpOnly: true,
                path: '/'
            });
            const newPostBody = { author: 'Я - новый автор', text: 'Текст, текст и еще раз текст...' };
            this.appService.addNewPost_service({ userId: uuid, post: newPostBody }, true);
        }
        ;
        response.status(200).send('OK');
    }
    addNumber_controller(body, request, response) {
        this.appService.addNumber_service({ userId: request.body.account, unit: body });
        response.redirect(`/api/allCalculations?user=${request.body.account}`);
    }
    allCalculations_controller(request, query) {
        return this.appService.allCalculations_service(query.user || request.body.account);
    }
    addNewPost_controller(body, request) {
        return this.appService.addNewPost_service({ userId: request.body.account, post: body.post }, false);
    }
    ;
    getAllPosts_controller(request) {
        return this.appService.getAllPosts_service(request.body.account);
    }
};
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "login_controller", null);
__decorate([
    (0, common_1.Post)('addNumber'),
    __param(0, (0, common_1.Body)(new joiValidationPipe_1.JoiValidationPipe(NumberJoi_1.addNumberScheme))),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "addNumber_controller", null);
__decorate([
    (0, common_1.Get)('allCalculations'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ApiController.prototype, "allCalculations_controller", null);
__decorate([
    (0, common_1.Post)('addNewPost'),
    __param(0, (0, common_1.Body)(new joiValidationPipe_1.JoiValidationPipe(PostsJoi_1.PostScheme))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], ApiController.prototype, "addNewPost_controller", null);
__decorate([
    (0, common_1.Get)('getAllPosts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], ApiController.prototype, "getAllPosts_controller", null);
ApiController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map