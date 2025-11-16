import { PartialType } from '@nestjs/mapped-types'; 
import { CreateGroupedProductDto } from './create-grouped-product.dto';

export class UpdateGroupedProductDto extends PartialType(CreateGroupedProductDto) {}