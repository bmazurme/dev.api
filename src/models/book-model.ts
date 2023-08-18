import {
  Schema, Document, model, Model,
} from 'mongoose';

export interface IBook extends Document {
  name: string;
  typeBook: string;
  projectId: Schema.Types.ObjectId;
}

export interface BookModel extends Model<IBook> {
  findBookById: (id: string) => Promise<IBook | undefined>;
}

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  typeBook: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    required: true,
  },
});

export default model<IBook, BookModel>('Book', BookSchema);
