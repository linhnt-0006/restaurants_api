import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { Category } from "../schemas/restaurant.schema"

export class CreateRestaurantDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter correct email address" })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber("VN")
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: "Please enter correct category" })
  readonly category: Category;

  @IsEmpty({ message: "You cannot provide user ID." })
  readonly user: User;
}