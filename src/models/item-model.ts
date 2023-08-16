import {
  Schema, Document, model, Model,
} from 'mongoose';

export interface IItem extends Document {
  blockId: Schema.Types.ObjectId;
  result: number;
}

export interface ItemModel extends Model<IItem> {
  findBlockById: (id: string) => Promise<IItem | undefined>;
}

const ItemSchema = new Schema({
  blockId: {
    type: Schema.Types.ObjectId,
    ref: 'block',
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
});

export default model<IItem, ItemModel>('Item', ItemSchema);
