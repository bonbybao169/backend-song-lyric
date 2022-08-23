-- CreateTable
CREATE TABLE "singers_songs" (
    "id" SERIAL NOT NULL,
    "singer_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "singers_songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "singers_songs_song_id_idx" ON "singers_songs"("song_id");

-- CreateIndex
CREATE INDEX "singers_songs_singer_id_idx" ON "singers_songs"("singer_id");

-- AddForeignKey
ALTER TABLE "singers_songs" ADD CONSTRAINT "singers_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "singers_songs" ADD CONSTRAINT "singers_songs_singer_id_fkey" FOREIGN KEY ("singer_id") REFERENCES "singers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
