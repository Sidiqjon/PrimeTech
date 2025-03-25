import { PartialType } from '@nestjs/swagger';
import { CreateSiteMetadataDto } from './create-sitemetadata.dto';

export class UpdateSitemetadataDto extends PartialType(CreateSiteMetadataDto) {}
