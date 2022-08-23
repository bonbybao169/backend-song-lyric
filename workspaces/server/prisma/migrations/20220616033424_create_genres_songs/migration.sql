-- CreateTable
CREATE TABLE "genres_songs" (
    "id" SERIAL NOT NULL,
    "song_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "genres_songs_song_id_idx" ON "genres_songs"("song_id");

-- CreateIndex
CREATE INDEX "genres_songs_genre_id_idx" ON "genres_songs"("genre_id");

-- AddForeignKey
ALTER TABLE "genres_songs" ADD CONSTRAINT "genres_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genres_songs" ADD CONSTRAINT "genres_songs_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
