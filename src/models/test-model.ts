import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface ITest extends Document {
  name: string;
  typeBook: string;
  projectId: Schema.Types.ObjectId;
}

export interface TestModel extends Model<ITest> {
  findTestById: (id: string) => Promise<ITest | undefined>;
}

const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  projectId: {
    type: Types.ObjectId,
    ref: 'test',
    required: true,
  },
});

export default model<ITest, TestModel>('Test', TestSchema);
