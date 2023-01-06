import { Model, model, Schema } from "mongoose";

export default function createModel<T, TModel = Model<T>>(
    modelName: string,
    schema: Schema<T>
): TModel {
    let createdModel: TModel;
    //if (process.env.NODE_ENV === "development") {
        //if (!global[modelName]) {
            createdModel = model<T, TModel>(modelName, schema);
         //   global[modelName] = createdModel;
       // }
        //createdModel = global[modelName];

    //} else {
        createdModel = model<T, TModel>(modelName, schema, "users");
    //}
    return createdModel;
}
