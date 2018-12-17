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
