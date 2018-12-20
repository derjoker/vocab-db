import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const vocabs = []
// Mac
vocabs.push('/Volumes/Kindle/system/vocabulary/vocab.db')
// Default (Sample)
vocabs.push(path.join(__dirname, 'vocab.db'))

function getVocab () {
  for (let vocab of vocabs) {
    if (fs.existsSync(vocab)) return vocab
  }
}

const vocab = getVocab()

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

export function lookups (bookKey) {
  const db = new Database(vocab, {
    fileMustExist: true
  })
  return db
    .prepare(
      `
      SELECT
      LOOKUPS.id AS _id, LOOKUPS.usage,
      WORDS.word, WORDS.stem, LOOKUPS.pos, LOOKUPS.timestamp
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
