-- DropForeignKey
ALTER TABLE "authors_songs" DROP CONSTRAINT "authors_songs_author_id_fkey";

-- DropForeignKey
ALTER TABLE "authors_songs" DROP CONSTRAINT "authors_songs_song_id_fkey";

-- DropForeignKey
ALTER TABLE "genres_songs" DROP CONSTRAINT "genres_songs_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "genres_songs" DROP CONSTRAINT "genres_songs_song_id_fkey";

-- DropForeignKey
ALTER TABLE "singers_songs" DROP CONSTRAINT "singers_songs_singer_id_fkey";

-- DropForeignKey
ALTER TABLE "singers_songs" DROP CONSTRAINT "singers_songs_song_id_fkey";

-- CreateTable
CREATE TABLE "lyrics" (
    "id" SERIAL NOT NULL,
    "song_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "translator_id" INTEGER NOT NULL,
    "default" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lyrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lyrics_translator_id_idx" ON "lyrics"("translator_id");

-- CreateIndex
CREATE INDEX "lyrics_song_id_idx" ON "lyrics"("song_id");

-- AddForeignKey
ALTER TABLE "singers_songs" ADD CONSTRAINT "singers_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "singers_songs" ADD CONSTRAINT "singers_songs_singer_id_fkey" FOREIGN KEY ("singer_id") REFERENCES "singers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authors_songs" ADD CONSTRAINT "authors_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authors_songs" ADD CONSTRAINT "authors_songs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genres_songs" ADD CONSTRAINT "genres_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genres_songs" ADD CONSTRAINT "genres_songs_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lyrics" ADD CONSTRAINT "lyrics_translator_id_fkey" FOREIGN KEY ("translator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lyrics" ADD CONSTRAINT "lyrics_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
