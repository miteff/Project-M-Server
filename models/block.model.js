import mongoose from 'mongose'

const blockSchema = new mongoose.Schema({
    content: String
});

module.exports = mongoose.model('Block', blockSchema);