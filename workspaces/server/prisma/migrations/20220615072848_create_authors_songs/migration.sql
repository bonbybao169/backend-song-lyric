-- CreateTable
CREATE TABLE "authors_songs" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "authors_songs_song_id_idx" ON "authors_songs"("song_id");

-- CreateIndex
CREATE INDEX "authors_songs_author_id_idx" ON "authors_songs"("author_id");

-- AddForeignKey
ALTER TABLE "authors_songs" ADD CONSTRAINT "authors_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authors_songs" ADD CONSTRAINT "authors_songs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
