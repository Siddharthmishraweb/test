"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    reviews: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Review'
        }],
    averageRating: {
        type: Number,
        default: 0
    }
});
movieSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reviews = yield mongoose_1.default.model('Review').find({ movieId: this._id });
            let sumOfRatings = 0;
            reviews.forEach((review) => {
                sumOfRatings += review.rating;
            });
            const averageRating = sumOfRatings / reviews.length;
            this.averageRating = averageRating;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const Movie = mongoose_1.default.model('Movie', movieSchema);
exports.default = Movie;
//# sourceMappingURL=Movie.js.map