import Database from 'better-sqlite3'
import path from 'path'

const vocab = path.join(__dirname, 'vocab.db')

export function books () {
  const db = new Database(vocab, {
    fileMustExist: true
  })
  return db
    .prepare(
      `
      SELECT
      id as _id, lang, title, authors
      FROM
      BOOK_INFO
      `
    )
    .all()
}

export function vocabs (bookKey) {
  const db = new Database(vocab, {
    fileMustExist: true
  })
  return db
    .prepare(
      `
      SELECT
      LOOKUPS.usage,
      LOOKUPS.id AS _id, WORDS.word, WORDS.stem, LOOKUPS.pos, LOOKUPS.timestamp
      FROM
      LOOKUPS
      JOIN WORDS
      ON LOOKUPS.word_key = WORDS.id
      WHERE
      book_key IS '${bookKey}'
      `
    )
    .all()
}
