import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Restaurant } from 'src/restaurants/schemas/restaurant.schema';
import { Meal } from './schemas/meal.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name)
    private mealModel: mongoose.Model<Meal>,
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  async create(meal: Meal, user: User): Promise<Meal> {
    const data = Object.assign(meal, { user: user._id });
    const restaurant = await this.restaurantModel.findById(meal.restaurant);

    if (!restaurant) {
      throw new NotFoundException("Restaurant not found with this ID");
    }

    if (!restaurant.user.toString() !== user._id.toString()) {
      throw new ForbiddenException("You cannot add meal to this restaurant.")
    }

    const mealCreated = await this.mealModel.create(data);
    console.log(restaurant._id);
    restaurant.menu.push(mealCreated._id);
    await restaurant.save();

    return mealCreated;
  }
}
