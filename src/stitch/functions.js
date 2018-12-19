/* global context */

exports = function (arg) {
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  return { arg: arg }
}

// getBook
exports = function (bookKey) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('kindle')
    .collection('books')

  return collection.findOne({ user: context.user.id, _id: bookKey })
}

// lookupIds
exports = function (bookKey) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('kindle')
    .collection('books')

  return collection
    .findOne({ user: context.user.id, _id: bookKey }, { 'lookups._id': 1 })
    .then(result => result && result.lookups)
}

// createBook
exports = function (book) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('kindle')
    .collection('books')

  book.user = context.user.id
  return collection.insertOne(book).then(result => result.insertedId)
}

// addLookups
exports = function (bookId, lookups) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('kindle')
    .collection('books')

  return collection.updateOne(
    { user: context.user.id, _id: bookId },
    { $push: { lookups: { $each: lookups } } }
  )
}
