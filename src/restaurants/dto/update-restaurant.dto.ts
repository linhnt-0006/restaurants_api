import { IsEmail, IsEmpty, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { Category } from "../schemas/restaurant.schema"

export class UpdateRestaurantDto {

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEmail({}, { message: "Please enter correct email address" })
  @IsOptional()
  readonly email: string;

  @IsPhoneNumber("VN")
  @IsOptional()
  readonly phoneNo: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, { message: "Please enter correct category" })
  @IsOptional()
  readonly category: Category;

  @IsEmpty({ message: "You cannot provide user ID." })
  readonly user: User;
}