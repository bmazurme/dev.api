import {
  Schema, Document, model, Model,
} from 'mongoose';

export interface IBlock extends Document {
  bookId: Schema.Types.ObjectId;
  block: number;
  index: number;
  name: string;
}

export interface BlockModel extends Model<IBlock> {
  findBlockById: (id: string) => Promise<IBlock | undefined>;
}

const BlockSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  blockId: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

export default model<IBlock, BlockModel>('Block', BlockSchema);
