import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const detailSchema = new Schema({
  id: { type: Number, required: true },
  also_known_as:{type:Array},
  genres:{type:Array},
  name:{type:String},
  birthday:{type:String},
  imdb_id:{type:String},
  known_for_department:{type:String},
  biography:{type:String},
  production_countries:{type:Object},
  spoken_languages: [{
    iso_639_1: { type: String },
    name: { type: String }
  }],
  production_countries: [{
    iso_3166_1: { type: String },
    name: { type: String }
  }]

});
detailSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('moviedetails', detailSchema);

