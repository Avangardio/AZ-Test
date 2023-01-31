"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
let ApiService = class ApiService {
    constructor() {
        this.usersAvg = {};
        this.usersPosts = {};
    }
    avgNumber(data) {
        function setSign(number, sign) {
            return Math.abs(number) * (sign ? -1 : 1);
        }
        const countedAvg = data[1] && data[0] ?
            ((setSign(data[0].number, data[0].negative) + setSign(data[1].number, data[1].negative)) / data.length)
            : null;
        return {
            firstNumber: data[0] && !isNaN(data[0].number) !== null || undefined ? setSign(data[0].number, data[0].negative) : null,
            secondNumber: data[1] && !isNaN(data[1].number) !== null || undefined ? setSign(data[1].number, data[1].negative) : null,
            avg: countedAvg !== null ? +countedAvg.toFixed(data[0].float || data[1].float ? 0 : 1) : null
        };
    }
    addNumber_service(data) {
        if (isNaN(data.unit.number))
            return null;
        if (!this.usersAvg[data.userId]) {
            this.usersAvg[data.userId] = [data.unit];
            return null;
        }
        ;
        const lastNumber = this.usersAvg[data.userId].slice(-1)[0];
        this.usersAvg[data.userId].push(data.unit);
        return lastNumber;
    }
    allCalculations_service(userId) {
        if (!this.usersAvg[userId]) {
            return 0;
        }
        ;
        const calculated = [];
        for (let index = 0; index < this.usersAvg[userId].length; index += 2) {
            const [num1, num2] = [this.usersAvg[userId][index], this.usersAvg[userId][index + 1]];
            calculated
                .push(this.avgNumber([
                num1 && num1.number ? num1 : null,
                num2 && num2.number ? num2 : null,
            ]));
        }
        ;
        return calculated;
    }
    addNewPost_service(data, newUser) {
        const { author, text } = data.post;
        if (newUser) {
            this.usersPosts[data.userId] = [{ author, text }];
            return 'OK';
        }
        ;
        this.usersPosts[data.userId].push({ author, text });
        return 'OK';
    }
    getAllPosts_service(userId) {
        return this.usersPosts[userId];
    }
};
ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map