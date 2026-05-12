import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Brand {
    
    @Prop({
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        required: true
    })
    name!: string;

    @Prop({
        lowercase: true,
        trim: true,
        required: false
    })
    description?: string;

    @Prop({
        index: true,
        default: true,
        required: true
    })
    isActive!: boolean;
}

export const brandSchema = SchemaFactory.createForClass(Brand);